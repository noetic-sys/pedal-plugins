---
name: pedal-build
description: Build a new Pedal patch from a description, end to end — exemplar, graph, knobs, validation, hot-swap, and rendered audio proof.
---

Build a Pedal patch for: $ARGUMENTS

Follow the `pedal-authoring` skill. In order:

1. `get_workflow`, then `list_instances` and `sync_live` to get the session
   `spec_id`. Reuse that id for every edit.
2. `list_exemplars` and pick the closest role match; `open_exemplar` it rather
   than starting from a blank shell. Only invent from scratch if nothing fits.
3. Edit the node graph with the `graph_*` tools. Group chains into named semantic
   racks as they grow; publish ports for controls that drive several targets.
4. `list_tunable_args`, then `bind_macro` for the hero controls (at least one, or
   the pedal renders faceless). `set_faceplate` to theme it.
5. `validate_spec` and `compile_check`; fix every error and re-validate.
6. `apply_to_live` and confirm `bound_controls` is non-zero.
7. Render proof: `render_test_signal` for an effect, `render_test_notes` for a
   synth, `"format": "flac"`. Cite the absolute `audio_path`.
8. Run the sound check from the skill (body, character, role) before reporting
   done. If the user named a target sound and `listen_audio` is available, use it
   to compare against a reference.

Ask before `save_preset` — applying live and writing to the user's preset library
are different commitments.
