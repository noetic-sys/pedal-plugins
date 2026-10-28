---
name: pedal-simplify-graph
description: Once a patch sounds right, audit the graph for nodes that earn nothing, structure that hides intent, and CPU spent on the inaudible — then remove or reshape them while proving the sound did not change. Use after the sound-design candidate is chosen, before or alongside graph finishing, and whenever the user asks to clean up, tidy, or simplify a working pedal or synth.
disable-model-invocation: true
---

# Simplify a working graph

Use after the sound is chosen and before handoff. The premise is the same as a code
tidy pass: **improve the graph while the output stays audibly identical.**

## Fewer nodes is not the goal

The goal is a graph where every node earns its place and a reader can see why. A pass
that removes six nodes and thins the character has failed, even though the graph is
smaller. Some of the best outcomes here *add* something — a rack, a name, a published
port — because legibility is part of the job.

Never open with a node count. The measure is what improved and that the sound held.

## Establish the two things you cannot proceed without

**1. A locked stimulus.** Every judgment in this pass is a before/after comparison, so
the stimulus must be fixed first and reused unchanged throughout: same notes,
velocities, durations, `release_ms`, octave. Establish it with
`pedal-audition-stimulus` if it is not already set.

**2. A reference render of the current sound.** Render the locked stimulus through the
patch as it stands and keep the path. This is the thing every later render is compared
against — the audio equivalent of a passing test suite. Without it you cannot tell a
successful simplification from a quiet regression.

Then `sync_live` and `graph_inspect` for the real current graph. Do not audit a spec you
remember building; audit the one that is live.

## Preflight: is there anything to do

Skip the pass, and say so in one line, when the graph is already minimal — a handful of
nodes, named, with no dead wires and no CPU pressure. A user-named scope ("clean up the
filter section") is authoritative and runs regardless of size.

## The three audit passes

Read the rubrics in `references/audit-passes.md` and work them **one at a time, in this
order**. Do not run them as parallel subagents: there is a single live instance and a
single mutable `spec_id`, so concurrent auditors would collide on the same graph and on
the same live plugin. The dimensions are independent; the state is not.

1. **Dead weight** — nodes that change nothing, wires that go nowhere, stages that
   cancel out, parameters sitting at a no-op value.
2. **Legibility** — racks, names, semantic grouping, published ports, a faceplate that
   matches what the graph actually does.
3. **Cost** — per-voice work that belongs on master, voice count, unison, oversampling,
   and anything expensive that is inaudible.

Collect findings across all three before editing, so you are not re-rendering after
every micro-change.

## Bypass before you delete

For each candidate removal:

1. `graph_set_enabled` to **disable** the node. Do not remove it yet — disabling is
   reversible and keeps the wiring intact.
2. Render the locked stimulus.
3. **Level-match** against the reference render, then compare. Removing a gain-bearing
   node changes level, and an unmatched comparison will read that as a tonal change.
   Method: `level-matching.md` under `pedal-context-translation`.
4. Ask `listen_audio` with both clips labeled whether there is **any** audible
   difference — not which is better. You are looking for a null result.
5. No audible difference → the node earned nothing on this stimulus. Proceed to the
   worst-case checks below before removing it.
6. Any audible difference → it was doing something. Re-enable it and move on. "I cannot
   hear what it does" is not "it does nothing."

## A null result on one stimulus is not a null result

This is where a simplification pass causes damage. A node can be inaudible on the test
stimulus and load-bearing somewhere else. Before removing anything, check it where it
would actually matter:

- **Both ends of the register.** Re-render an octave down and an octave up. A high-pass,
  a body shelf or a key-tracked filter may only act at one end.
- **The extremes of every macro range.** A limiter or gain stage may be inaudible at the
  authored center and essential at maximum drive. `pedal-producer-controls` requires
  minimum, center and maximum all be usable; the same three points gate a removal.
- **Hard playing.** Maximum velocity, dense chords, full polyphony. Protective stages
  only act when something is loud.
- **Mono, and low level.** A width or phase stage can look inaudible in stereo at volume.
  See `masking.md` under `pedal-context-translation`.
- **The rest state.** Render `idle`. A node holding DC or damping self-oscillation shows
  up with nothing played and nowhere else.

A removal that passes the typical case and was never checked at the extremes is not
verified. Say so rather than implying it is.

## Never simplify away a protective stage

Some nodes are inaudible **by design** — that is their job, and their silence is success,
not redundancy. `references/load-bearing-nodes.md` has the catalog. The short form:

- a DC blocker,
- an output limiter or safety ceiling,
- a subsonic high-pass,
- gain staging that sets a non-linear stage's working point,
- anti-aliasing or oversampling around a non-linearity,
- a range cap keeping a resonant filter below self-oscillation.

Removing one because it is inaudible on a mid-register test note is the audio equivalent
of deleting input validation because the tests pass. A graph without them is not
simpler, it is unfinished. If a finding proposes removing one, skip the finding.

## Apply, then verify

After the edits: `validate_spec`, then `compile_check`, fix anything blocking, then
render the locked stimulus one final time and compare to the original reference,
level-matched. Then `apply_to_live` and check `read_diagnostics` for CPU, xruns, peak and
voices — a structural change can move CPU in either direction.

If the final comparison is not a null result, you have changed the sound. Find which
edit did it and revert that one; do not accept a drift because each step seemed small.
Drift accumulates precisely because every individual step passed.

Hand off through `pedal-graph-finishing`, which owns the provenance record.

## Summarize by dimension

Report what was applied per pass, what was deliberately skipped, and the verification
result. For example:

> Applied 7 — dead weight 3 (bypassed bell at unity, dead macro wire, duplicate
> high-pass), legibility 3 (two semantic racks, renamed modules, published Bite),
> cost 1 (reverb moved to master). Skipped 2: the dcblock and the output limiter are
> protective. Validate and compile clean; null A/B against the reference render held at
> matched loudness, checked an octave either side and at both macro extremes. CPU 6.1%
> from 9.4%, no xruns.

State which checks you ran and which you did not. Do not headline a node count, and do
not describe the sound as "unchanged" unless you rendered the comparison that shows it.

## Related skills

- The rubrics for the three passes: `references/audit-passes.md`. Nodes whose silence is
  the point: `references/load-bearing-nodes.md`.
- Fixing the stimulus before any before/after: `pedal-audition-stimulus`.
- Matching level so a null test means something:
  `level-matching.md` under `pedal-context-translation`.
- Validation order, warnings as audio risks, and the handoff record:
  `pedal-graph-finishing`. This skill is the pass that runs just before it.
- Restoring a known-good version if a removal turns out to matter:
  `pedal-branching-and-ab`.
- Keeping one deliberate novel mechanism rather than trimming it as an oddity:
  `pedal-novel-construction`.
- `graph_set_enabled`, `graph_remove_node`, `graph_create_rack`, `graph_unwrap_rack`,
  `graph_publish_port`, `unbind_macro`, `read_diagnostics`: `pedal-authoring`.
