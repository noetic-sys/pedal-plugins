#!/usr/bin/env node
/** Print the Cursor one-click MCP install link, generated from mcp.cursor.json. */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(resolve(root, "plugins/pedal/mcp.cursor.json"), "utf8")).mcpServers.pedal;
const blob = Buffer.from(JSON.stringify(cfg)).toString("base64");
console.log(`cursor://anysphere.cursor-deeplink/mcp/install?name=pedal&config=${blob}`);
