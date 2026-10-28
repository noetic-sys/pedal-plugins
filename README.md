# Pedal plugins for coding agents

Build CLAP/AU/VST3 effects and synths that your agent can hear and rewire —
live, while they run in your DAW.

```
you   → "make the delay darker and give me a feedback knob"
agent → graph_set_param → bind_macro → validate → apply_to_live → render_test_signal
DAW   → the plugin changes under your fingers, audibly, without a reload
```

One plugin, three clients. [`plugins/pedal/`](plugins/pedal) holds the
skills, rule set, and command set; each client gets its own manifest and its own
marketplace file at the repo root.

| Client | Marketplace | Manifest |
| --- | --- | --- |
| Claude Code | [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json) | [`plugins/pedal/.claude-plugin/plugin.json`](plugins/pedal/.claude-plugin/plugin.json) |
| Cursor | [`.cursor-plugin/marketplace.json`](.cursor-plugin/marketplace.json) | [`plugins/pedal/.cursor-plugin/plugin.json`](plugins/pedal/.cursor-plugin/plugin.json) |
| Codex | [`.agents/plugins/marketplace.json`](.agents/plugins/marketplace.json) | [`plugins/pedal/.codex-plugin/plugin.json`](plugins/pedal/.codex-plugin/plugin.json) |

> **Source-available, not open source.** This repo is published so the agent
> marketplaces can fetch and install these plugins. You may install and use
> them; you may not modify or redistribute them. See [LICENSE.txt](LICENSE.txt).
> It contains no DSP source — Pedal itself is licensed separately under its
> own EULA.

## Prerequisite

The `pedal-mcp` companion has to be on disk. Installing
[Pedal](https://pedl.studio) puts it at `~/.pedal/bin/pedal-mcp` — on every
platform, from every installer. Pedal installs entirely into your home
directory (no admin password), and everything it owns lives under `~/.pedal`:
the companion, licenses, listen credentials, presets, references, diagnostics,
and logs. Uninstalling is that one folder plus the standard plug-in directories.

Because there is exactly one location, each client just names it with its own
home variable — `${HOME}` for Claude Code, `${userHome}` for Cursor. Codex gets
a one-line `sh -c` wrapper instead, since it documents no such variable and will
not expand `~` on its own; on Windows, point its `command` at the `.exe`
directly.

## Install

### Claude Code

```
/plugin marketplace add noetic-sys/pedal-plugins
/plugin install pedal@pedal
```

### Cursor

```
/plugin marketplace add noetic-sys/pedal-plugins
/plugin install pedal@pedal
```

Or install just the MCP server with a one-click link:

```
cursor://anysphere.cursor-deeplink/mcp/install?name=pedal&config=eyJjb21tYW5kIjoiJHt1c2VySG9tZX0vLnBlZGFsL2Jpbi9wZWRhbC1tY3AifQ==
```

Regenerate that link from `mcp.cursor.json` with `node scripts/deeplink.mjs` —
never hand-edit it.

### Codex

```sh
codex plugin marketplace add noetic-sys/pedal-plugins
codex plugin add pedal@pedal
```

For a repo-scoped install, the marketplace file is read from
`$REPO_ROOT/.agents/plugins/marketplace.json`; the personal equivalent is
`~/.agents/plugins/marketplace.json`.

The Pedal companion can also register itself with any of these clients directly,
no plugin involved — `pedal-mcp register --client
<claude-code|claude-desktop|cursor|codex>`. The plugins exist so one install
brings the server, the skill, and the guardrails together.

## What ships

**Skill** — `pedal-authoring`: the node-graph model and the authoring loop.

```
sync_live → graph_inspect → graph_* edits → list_tunable_args → bind_macro
         → set_faceplate → validate_spec → compile_check → apply_to_live
         → render_test_signal / render_test_notes → save_preset
```

Plus the guardrails that matter in practice: `get_workflow` first, one stable
`spec_id` per session, `graph_set_output` is required, bind at least one macro or
the pedal renders faceless, `apply_to_live` saves nothing, and "validates and
doesn't clip" is not "sounds good."

**Commands** — `/pedal-status`, `/pedal-build <description>`,
`/pedal-audition [intent]`.

**Rule** — the same non-negotiables, always-available for Cursor.

## Development

```sh
node scripts/validate.mjs    # all three clients
node scripts/deeplink.mjs    # regenerate the Cursor install link
```

`scripts/validate.mjs` encodes what each client enforces at load time — Codex's
`marketplace.rs`/`manifest.rs` rules (`"./"`-prefixed paths, `source.source`
must be `local`, policy enums, skill-name and description limits), Cursor's
manifest and frontmatter structure (rules need `description`; commands need
`name` *and* `description`), and Claude's marketplace/plugin pair. CI also runs
`claude plugin validate`, which is the authority for the Claude side.

The skill's guidance is derived from the `get_workflow` tool in the Pedal repo
(`crates/pedal-mcp-bridge/src/workflow.rs`), which is the version-matched source
of truth the agent reads at runtime. The skill front-loads the model and
explicitly tells it to call `get_workflow` first, so the live text always wins
and drift degrades gracefully. When `workflow.rs` changes materially, update
`plugins/pedal/skills/pedal-authoring/SKILL.md`.

## License

Copyright (c) 2026 Noetic Systems, LLC. All rights reserved.

Source-available, not open source: you may install and use these plugins
unmodified, and the agent marketplaces may distribute them unmodified to do
that. Modification, derivative works, and redistribution are not permitted.
See [LICENSE.txt](LICENSE.txt).

Using Pedal itself additionally requires a Pedal license under its EULA.
