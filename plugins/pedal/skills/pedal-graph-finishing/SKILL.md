---
name: pedal-graph-finishing
description: Finish a Pedal patch with safe graph architecture, validation, live verification, CPU checks, and reproducible preset provenance.
disable-model-invocation: true
---

# Graph finishing

Use this after the sound-design candidate is chosen and before calling the work complete.

## Start from real live state

Call 'sync_live', then inspect the stable graph. Keep the candidate spec id visible. Do not assume a prior draft, render, or faceplate is still live.

## Validate in order

After graph or parameter edits, run 'validate_spec', fix errors, run 'compile_check', inspect warnings, render a final held note and exact phrase, compare with 'listen_audio', apply only the selected spec, verify 'apply_to_live' success and title, and save with 'save_preset'.

Compilation proves the graph is legal. It does not prove the patch sounds right.

## Treat warnings as audio risks

Move shared reverb and delay to master when possible because per-voice global effects multiply tails and CPU. Cap high-Q filter ranges below self-oscillation unless intentional. Remove or rebind dead macro wires. Name new modules and preserve a useful title. Keep voice count, unison, oversampling, and nonlinear stages within real-time budget. Inspect live diagnostics after applying.

## Provenance and completion

Save the phrase stimulus, candidate render path, final listen result, spec id, and preset path in the handoff. Identify the reference by name only — never copy a reference excerpt into the handoff, the preset, or anything that leaves the user's machine. State why any remaining warning is intentional. If render and live playback differ, investigate the runtime graph before claiming success.

The final artifact must validate, compile, sound right in the fixed A/B phrase, apply successfully, save under a known name, and remain healthy during playback.

## Evidence to retain

Keep the exact phrase stimulus, best candidate render, final listen response, validation and compile responses, live diagnostics, and saved preset path. These artifacts let another agent resume without guessing which render was actually heard.

## Failure recovery

If validation fails, stop editing tone and fix topology or argument ranges first. If compilation fails after a graph edit, inspect the last wire or node change before touching unrelated parameters. If live playback differs from offline render, compare the applied spec and runtime diagnostics. If a saved preset does not sound like the candidate, reload the preset and re-run the exact phrase rather than relying on the save response.

A warning can remain only when it is understood, intentional, and documented. “The graph compiled” is never sufficient evidence for a producer-facing handoff.

## Related skills

- Restoring a named branch instead of reconstructing it: `pedal-branching-and-ab`.
- Trimming nodes that earn nothing and grouping what is left, before this handoff:
  `pedal-simplify-graph`.
- The faceplate review checklist before handoff: `pedal-producer-controls`.
- The solo and context diagnostics this handoff must retain:
  `pedal-context-translation`.
- Per-voice reverb and delay tails as both a CPU and a masking risk:
  `masking.md` under `pedal-context-translation`.
- Stability and CPU limits on a modulated or self-referential construction:
  `pedal-novel-construction`.
- `validate_spec`, `compile_check`, `apply_to_live`, `save_preset`, `read_diagnostics`,
  and the troubleshooting table: `pedal-authoring`.
