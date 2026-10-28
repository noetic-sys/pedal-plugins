#!/usr/bin/env node
/**
 * Validate the three client packagings of the `pedal` plugin.
 *
 * The rules encoded here mirror what each client enforces at load time:
 *   Codex   — codex-rs/core/src/plugins/{marketplace,manifest}.rs
 *   Cursor  — .cursor-plugin/{marketplace,plugin}.json structure + frontmatter
 *   Claude  — .claude-plugin/{marketplace,plugin}.json  (`claude plugin validate`
 *             is the authority; CI runs it too, this is the fast local pass)
 *
 * Run: node scripts/validate.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const PLUGIN = "pedal";
const PLUGIN_DIR = resolve(root, "plugins", PLUGIN);

function loadJSON(path, context) {
  if (!existsSync(path)) return fail(`${context}: missing ${path.replace(root + "/", "")}`), null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    return fail(`${context}: invalid JSON — ${e.message}`), null;
  }
}

/** Codex requires manifest paths to be relative and "./"-prefixed, with no "..". */
function isDotSlashRelative(p) {
  if (typeof p !== "string" || !p.startsWith("./")) return false;
  const segs = p.slice(2).replace(/\/+$/, "").split("/");
  return segs.length > 0 && segs.every((s) => s.length > 0 && s !== ".." && s !== ".");
}

function checkRefs(manifest, label, fields, { dotSlash }) {
  for (const field of fields) {
    const value = manifest[field];
    if (value === undefined || value === null) continue;
    const paths = typeof value === "string" ? [value] : Array.isArray(value) ? value : [];
    for (const p of paths) {
      if (typeof p !== "string" || /^https?:\/\//.test(p)) continue;
      if (dotSlash && !isDotSlashRelative(p)) {
        fail(`${label}: "${field}" must be a "./"-prefixed relative path — got "${p}"`);
        continue;
      }
      if (!existsSync(resolve(PLUGIN_DIR, p.replace(/^\.\//, "")))) {
        fail(`${label}: "${field}" references missing path "${p}"`);
      }
    }
  }
}

function frontmatter(file) {
  const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) return null;
  const fields = {};
  for (const line of text.slice(4, end).split("\n")) {
    const i = line.indexOf(":");
    if (i === -1 || !line.trim() || line.trim().startsWith("#")) continue;
    fields[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return fields;
}

/** Skill rules are the strictest of the three (Codex enforces them). */
function checkSkills() {
  const dir = resolve(PLUGIN_DIR, "skills");
  if (!existsSync(dir)) return fail("skills/ directory is missing");
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = resolve(dir, entry.name, "SKILL.md");
    const label = `skill "${entry.name}"`;
    if (!existsSync(file)) { fail(`${label}: missing SKILL.md`); continue; }
    const fm = frontmatter(file);
    if (!fm) { fail(`${label}: SKILL.md has missing or unclosed YAML frontmatter`); continue; }

    const name = (fm.name || "").trim();
    if (!name) fail(`${label}: missing "name" in frontmatter`);
    else {
      if (!/^[a-z0-9-]+$/.test(name)) fail(`${label}: name "${name}" must be hyphen-case`);
      else if (name.startsWith("-") || name.endsWith("-") || name.includes("--"))
        fail(`${label}: name "${name}" cannot start/end with "-" or contain "--"`);
      if (name.length > 64) fail(`${label}: name exceeds 64 characters`);
      if (name !== entry.name) fail(`${label}: frontmatter name "${name}" must match its directory`);
    }

    const desc = (fm.description || "").trim();
    if (!desc) fail(`${label}: missing "description" in frontmatter`);
    else {
      if (/[<>]/.test(desc)) fail(`${label}: description cannot contain angle brackets`);
      if (desc.length > 1024) fail(`${label}: description exceeds 1024 characters`);
    }
  }
}

/** Cursor validates rules (description) and commands (name + description). */
function checkFrontmatterDir(sub, required) {
  const dir = resolve(PLUGIN_DIR, sub);
  if (!existsSync(dir)) return;
  for (const f of readdirSync(dir)) {
    if (!/\.(md|mdc|markdown)$/i.test(f)) continue;
    const fm = frontmatter(resolve(dir, f));
    if (!fm) { fail(`${sub}/${f}: missing YAML frontmatter`); continue; }
    for (const key of required) {
      if (!fm[key]) fail(`${sub}/${f}: missing "${key}" in frontmatter`);
    }
  }
}

function checkMcp(file) {
  const cfg = loadJSON(resolve(PLUGIN_DIR, file), file);
  if (!cfg) return;
  const server = cfg.mcpServers?.[PLUGIN];
  if (!server) fail(`${file}: no "mcpServers.${PLUGIN}" entry`);
  else if (!server.command && !server.url) fail(`${file}: server needs a "command" or a "url"`);
}

// ---- Codex: .agents/plugins/marketplace.json + plugins/*/.codex-plugin/plugin.json ----
function validateCodex() {
  const mk = loadJSON(resolve(root, ".agents/plugins/marketplace.json"), "Codex marketplace");
  if (!mk) return;
  if (!mk.name) fail("Codex marketplace: missing `name`");
  const entry = (mk.plugins || []).find((p) => p.name === PLUGIN);
  if (!entry) return fail(`Codex marketplace: no plugin entry named "${PLUGIN}"`);

  if (entry.source?.source !== "local")
    fail(`Codex marketplace: source.source must be "local", got "${entry.source?.source}"`);
  if (!isDotSlashRelative(entry.source?.path))
    fail(`Codex marketplace: source.path must be "./"-prefixed — got "${entry.source?.path}"`);

  const install = ["NOT_AVAILABLE", "AVAILABLE", "INSTALLED_BY_DEFAULT"];
  const auth = ["ON_INSTALL", "ON_USE"];
  if (entry.policy?.installation && !install.includes(entry.policy.installation))
    fail(`Codex marketplace: invalid policy.installation "${entry.policy.installation}"`);
  if (entry.policy?.authentication && !auth.includes(entry.policy.authentication))
    fail(`Codex marketplace: invalid policy.authentication "${entry.policy.authentication}"`);

  const m = loadJSON(resolve(PLUGIN_DIR, ".codex-plugin/plugin.json"), "Codex plugin manifest");
  if (!m) return;
  if (m.name !== entry.name)
    fail(`Codex: plugin.json name "${m.name}" must match marketplace name "${entry.name}"`);
  checkRefs(m, "Codex plugin", ["skills", "mcpServers", "apps"], { dotSlash: true });

  const i = m.interface;
  if (!i) return warn("Codex plugin: no `interface` — the directory listing will be sparse");
  checkRefs(i, "Codex interface", ["composerIcon", "logo"], { dotSlash: true });
  for (const [n, s] of (i.screenshots || []).entries()) {
    if (!isDotSlashRelative(s)) fail(`Codex interface: screenshots[${n}] must be "./"-prefixed`);
    else if (!existsSync(resolve(PLUGIN_DIR, s.slice(2))))
      fail(`Codex interface: screenshots[${n}] references missing path "${s}"`);
  }
  const prompts = Array.isArray(i.defaultPrompt) ? i.defaultPrompt
    : typeof i.defaultPrompt === "string" ? [i.defaultPrompt] : [];
  if (prompts.length > 3) warn(`Codex interface: defaultPrompt has ${prompts.length} entries, max 3`);
  prompts.forEach((p, n) => {
    const len = p.split(/\s+/).join(" ").trim().length;
    if (len > 128) warn(`Codex interface: defaultPrompt[${n}] is ${len} chars, max 128`);
  });
}

// ---- Cursor: .cursor-plugin/marketplace.json + plugins/*/.cursor-plugin/plugin.json ----
function validateCursor() {
  const mk = loadJSON(resolve(root, ".cursor-plugin/marketplace.json"), "Cursor marketplace");
  if (!mk) return;
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(mk.name || ""))
    fail("Cursor marketplace: `name` must be lowercase kebab-case");
  if (!mk.owner?.name) fail("Cursor marketplace: `owner.name` is required");
  const entry = (mk.plugins || []).find((p) => p.name === PLUGIN);
  if (!entry) return fail(`Cursor marketplace: no plugin entry named "${PLUGIN}"`);

  const m = loadJSON(resolve(PLUGIN_DIR, ".cursor-plugin/plugin.json"), "Cursor plugin manifest");
  if (!m) return;
  if (!/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(m.name || ""))
    fail("Cursor: plugin.json `name` must be lowercase alphanumerics, hyphens, periods");
  if (m.name !== entry.name)
    fail(`Cursor: plugin.json name "${m.name}" must match marketplace name "${entry.name}"`);
  checkRefs(m, "Cursor plugin", ["logo", "rules", "skills", "agents", "commands", "hooks", "mcpServers"], { dotSlash: false });
}

// ---- Claude Code: .claude-plugin/marketplace.json + plugins/*/.claude-plugin/plugin.json ----
function validateClaude() {
  const mk = loadJSON(resolve(root, ".claude-plugin/marketplace.json"), "Claude marketplace");
  if (!mk) return;
  if (!mk.name) fail("Claude marketplace: missing `name`");
  if (!mk.owner?.name) fail("Claude marketplace: `owner.name` is required");
  const entry = (mk.plugins || []).find((p) => p.name === PLUGIN);
  if (!entry) return fail(`Claude marketplace: no plugin entry named "${PLUGIN}"`);
  if (typeof entry.source !== "string" || !entry.source.startsWith("./"))
    fail('Claude marketplace: `source` must be a relative path starting with "./"');
  if (!existsSync(resolve(root, entry.source)))
    fail(`Claude marketplace: source directory missing — ${entry.source}`);

  const m = loadJSON(resolve(PLUGIN_DIR, ".claude-plugin/plugin.json"), "Claude plugin manifest");
  if (!m) return;
  if (m.name !== entry.name)
    fail(`Claude: plugin.json name "${m.name}" must match marketplace name "${entry.name}"`);
  checkRefs(m, "Claude plugin", ["skills", "commands", "agents", "hooks", "mcpServers"], { dotSlash: false });
}

// ---- shared components ----
if (!existsSync(PLUGIN_DIR) || !statSync(PLUGIN_DIR).isDirectory())
  fail(`plugins/${PLUGIN}/ is missing`);
else {
  checkSkills();
  checkFrontmatterDir("rules", ["description"]);
  checkFrontmatterDir("commands", ["name", "description"]);
  for (const f of ["mcp.claude.json", "mcp.cursor.json", "mcp.codex.json"]) checkMcp(f);
  validateCodex();
  validateCursor();
  validateClaude();
}

if (warnings.length) console.log("Warnings:\n" + warnings.map((w) => `- ${w}`).join("\n") + "\n");
if (errors.length) {
  console.error("Validation failed:\n" + errors.map((e) => `- ${e}`).join("\n"));
  process.exit(1);
}
console.log(`Validation passed for all three clients${warnings.length ? ` (${warnings.length} warning(s))` : ""}.`);
