---
name: pedal-authoring
description: Author, edit, and audition Pedal CLAP/AU/VST3 plugins over MCP — the node-graph model, the sync_live → graph_* → bind_macro → validate → apply_to_live loop, exemplars, samples, and audio proof. Use whenever the user asks to build, change, debug, or audition a pedal, effect, synth patch, or preset, or when any pedal MCP tool (sync_live, graph_add_node, apply_to_live, render_test_signal, listen_audio) is in play.
---

# Authoring Pedal plugins over MCP

Pedal is a CLAP/AU/VST3 plugin whose DSP is a **node graph** you edit live over
MCP. You never hand-write a full `PedalSpec`; you mutate a server-held spec by
`spec_id`.

## Always start here

1. `get_workflow` — the authoritative, version-matched authoring guide from the
   running plugin. It is the source of truth; this skill is the map, not the
   territory. Read it before your first edit in a session.
2. `list_instances` — the live plugins you can target. `family` is `effect` (audio
   host) or `synth` (instrument). Pass `instance` to any tool to target one
   explicitly; omit it for the most recently used instance.
3. `sync_live` — registers the loaded pedal and returns a `spec_id`. That id is
   **stable for the whole session** — reuse it on every subsequent call. Do not
   look for a `new_spec_id`; every edit mutates in place.

If `pedal_status` is the only tool you can see, no instance is reachable: ask the
user to load a Pedal plugin in their DAW with MCP authoring enabled, then retry.

## The authoring loop

```
sync_live → graph_inspect → graph_* edits → list_tunable_args → bind_macro
         → set_faceplate → validate_spec → compile_check → apply_to_live
         → render_test_signal / render_test_notes → save_preset
```

**Inspect** — `graph_inspect { spec_id }` for nodes/edges/output, `list_node_ops`
for leaf ops and their inlets, `list_dsp_ops` / `describe_dsp_op` for the op
vocabulary.

**Build** — `graph_add_node`, `graph_connect { from, to, inlet }`,
`graph_set_param`, `graph_disconnect`, `graph_remove_node`, `graph_swap_op`,
`graph_set_output` (required — mark the final node).

- Wire a node's output into an `audio` inlet for **series**.
- An `audio` inlet **sums** its sources — wire two nodes into one to **mix**
  (dry/wet, parallel, stacked oscillators).
- Wire a node back into an upstream `audio` inlet for a **feedback** loop (one
  supported: delay feedback, comb, Karplus).
- Wire a source/LFO into a **param inlet** (`cutoff_hz`, `gain`, `freq_hz`, …)
  for audio-rate modulation. An `lfo` emits a normalized 0..1 shape — depth is
  the connect `amount` (a signed fraction of the target's range around its base
  value), retunable later with `set_mod_amount`. An `adsr` is different: it maps
  into its own `low`/`high` range, so a filter envelope sets low/high in Hz.

Every edit returns `diagnostics` (errors + warnings with typed fix hints). Fix
anything blocking and retry the **same** `spec_id`.

**Rack by default** — racks exist for human legibility. Once a chain grows past a
handful of nodes, group it: `graph_create_rack { nodes:[…], name }`, then
`graph_publish_port { rack_id, port, targets:[{node,arg}] }` to expose one inner
param as a single outer control. Prefer several small **semantic** racks (Source /
Voicing / Dynamics — one function per box) over one god rack. **Name every rack**
— duplicate control names are a hard validation error. Sources (oscillator,
sampler) and modulators (lfo, envelope) are *not* rack members; they stay at the
head / in the modulators section.

**Controls** — `list_tunable_args { spec_id }` finds bindable args (each carries
`dsp_node`, `arg`, `min`, `max`, `kind`, `bindable`). `bind_macro` adds knobs;
`unbind_macro` frees a slot. `set_faceplate` themes the panel. A graph with zero
bound macros is audible but renders **faceless** — `apply_to_live` reports
`bound_controls` and a `ui_warning` when it is 0. Bind at least one knob.

**Ship** — `validate_spec` then `compile_check`, fix errors, re-validate, then
`apply_to_live { spec_id }` (compiles and hot-swaps into the running plugin —
audible immediately). `save_preset { name }` writes the live session to the user
preset library; `apply_to_live` alone does **not** save a file.

## Start from an exemplar

Prefer `list_exemplars` / `open_exemplar` for a role-matching patch over inventing
from a blank shell. `get_exemplar` when you only need to inspect structure. If the
user named an instrument, genre, artist, or sound, find the matching exemplar and
match its **structure** — a plain saw→filter reads boring.

## Samples

`import_sample { path }` takes an absolute path. Browse the user's own libraries
before synthesizing a source: `~/Splice/sounds`, `~/Music/Ableton`,
`~/Music/Audio Music Apps`, Serum/Vital `Tables`/`Samples` folders. Prefer paths
under `~` — some system locations (e.g. `/Library/Audio`) return a sandbox error;
ask the user to copy those somewhere readable. Using the user's own licensed files
to build their own instrument is fine. Do **not** bake a third-party sample into a
preset the user intends to redistribute — flag that question to them.

## Sound check before you call it done

- "Validates / doesn't clip" is not "sounds good." The default failure is **thin**:
  no audible body, or a static, boring timbre.
- **Body**: name the node carrying the fundamental at the played octave and confirm
  it survives the filter. An octave-down sub is not body (subsonic below ~80 Hz).
- "thin" / "cheap" / "boring" → audit body, motion, and source. Do not just add
  drive, unison, sub, or gain.
- Match effort to the role: a bass is not a pad. Don't soup everything.

## Prove it with audio

Close every audio-shaped task with a render: `render_test_signal` (effects) or
`render_test_notes` (synths). Use `"format": "flac"` by default and cite the
absolute `audio_path` from the response. Never ship a DSP change with only a
spectrogram or a summary.

When a task is about how something *sounds* against a named target, use
`listen_audio` — render WAVs (`"format": "wav"`), then:

```json
{ "query": "Does the sample match the reference's dark tape delay?",
  "clips": [{ "path": "/tmp/reference.wav", "label": "reference" },
            { "path": "/tmp/sample.wav",    "label": "sample" }] }
```

Labels tell the model which clip is which. It returns freeform
`{ answer, model, backend }` — put PASS/FAIL instructions in the `query` if you
want them; the tool imposes no schema. It needs `PEDAL_LISTEN_API_KEY` or
`api_key` in `~/.pedal/listen.toml` and only appears in the tool list when
configured. `compare_to_reference` gives numeric scores without listening.

Reference workflow: `load_reference` / `list_references` / `analyze_reference` /
`compare_to_reference` / `delete_reference` for iterating toward a user's target
sound. `read_diagnostics` reports the instance's CPU, xruns, peak, and voices;
`read_audio_output` taps the live output.

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Only `pedal_status` is listed | No live instance | Load a Pedal plugin with MCP authoring enabled |
| `unknown tool "…"` | Tool is family-gated or retired | `list_instances`, check `family`; re-read `get_workflow` |
| `…applies to synth instances only` | Wrong target | Pass the right `instance` id |
| Tools missing after install | Companion not found | Confirm `/usr/local/bin/pedal-mcp` or `~/.pedal/bin/pedal-mcp` exists, or set `PEDAL_MCP_BIN` |
| `listen_audio` absent | No credentials | `pedal-mcp listen-config status`, then `pedal-mcp listen-config set --url … --listen-api-key …` |
