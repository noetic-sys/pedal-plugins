---
name: pedal-audition
description: Render and critique the live Pedal patch — audio proof plus an honest read on body, character, and whether it matches the intent.
---

Audition the live Pedal patch. Intent to judge against: $ARGUMENTS
(If that is empty, judge against the patch's own name and structure.)

1. `sync_live` and `graph_inspect` to see what is actually loaded.
2. Render with `render_test_signal` (effect) or `render_test_notes` (synth) using
   `"format": "flac"`. Cite the absolute `audio_path`.
3. `read_diagnostics` for CPU, xruns, and peak. Flag clipping or xruns.
4. Critique honestly against the sound check in the `pedal-authoring` skill:
   - **Body** — name the node carrying the fundamental at the played octave and
     say whether it survives the filter.
   - **Character** — is the timbre static or does it move? Does it read as the
     named target, or as a generic saw→filter?
   - **Role fit** — is the effort matched to the job?
5. If a reference is loaded (`list_references`), run `compare_to_reference`, and
   `listen_audio` on reference-vs-render when it is available.

End with a short list of the specific changes you would make, ranked. Do not apply
them unless asked.
