---
name: pedal-status
description: Show which Pedal instances are live, which tools are available, and whether the companion is wired up.
---

Report the current Pedal MCP state, then stop. Do not edit anything.

1. Call `list_instances`. For each instance report its `id`, `name`, `family`
   (effect or synth), and `summary`, and mark which one is active.
2. If only `pedal_status` is available, say plainly that no instance is reachable
   and tell the user to load a Pedal plugin in their DAW with MCP authoring
   enabled.
3. Note whether `listen_audio` appears in the tool list. If it does not, say it is
   unconfigured and that `pedal-mcp listen-config status` will confirm.
4. For the active instance, call `read_diagnostics` and report CPU, xruns, peak,
   and voice count.

Keep it to a short status block — no recommendations unless something is broken.
