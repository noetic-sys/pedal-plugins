# Pedal

Build CLAP/AU/VST3 effects and synths that your agent can hear and rewire —
live, while they run in your DAW.

```
you   → "make the delay darker and give me a feedback knob"
agent → graph_set_param → bind_macro → validate → apply_to_live → render_test_signal
DAW   → the plugin changes under your fingers, audibly, without a reload
```

One plugin directory, three packagings. The manifests differ; the skills, rules,
commands, and assets are shared.

| File | Client |
| --- | --- |
| `.claude-plugin/plugin.json` + `mcp.claude.json` | Claude Code |
| `.cursor-plugin/plugin.json` + `mcp.cursor.json` | Cursor |
| `.codex-plugin/plugin.json` + `mcp.codex.json` | Codex |
| `skills/`, `rules/`, `commands/`, `assets/` | all three |

## Requires

The `pedal-mcp` companion on disk. Installing [Pedal](https://pedl.studio) puts
it at `~/.pedal/bin/pedal-mcp` on every platform — one location, so each
`mcp.*.json` just names it with that client's home variable (`${HOME}` for
Claude, `${userHome}` for Cursor; Codex gets a one-line `sh -c` wrapper because
it documents no variable and will not expand `~` itself).

## Commands

- `/pedal-status` — live instances, available tools, CPU/xruns/peak
- `/pedal-build <description>` — exemplar → graph → knobs → validate → apply → rendered proof
- `/pedal-audition [intent]` — render the live patch and critique it honestly

See the repository [README](../../README.md) for install instructions.
