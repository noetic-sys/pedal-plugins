# The three audit passes

Work these one at a time, in order, collecting findings before you edit. Every removal
goes through the bypass-and-null-test procedure in the skill — these rubrics say what to
*look for*, never what is safe to delete on sight.

---

## Pass 1 — Dead weight

Nodes and wires that change nothing. The most common yield, and the easiest to get wrong,
because "I cannot hear it" and "it does nothing" are different claims.

Look for:

- **Parameters at a no-op value.** A bell or shelf at 0 dB gain. A filter at the top or
  bottom of its range, passing everything. A mix at 0%. A drive at unity. These are
  usually leftovers from an abandoned experiment.
- **Stages that cancel.** A gain-up followed by a gain-down. A high-pass under a
  low-pass that is already narrower. Two nodes whose net effect is identity.
- **Duplicated jobs.** Two filters in series doing one filter's work, two saturators
  where one was retuned and the other forgotten, a body shelf plus an oscillator layer
  both added for "thin" where only one survived the A/B.
- **Disabled nodes.** Anything already bypassed during exploration and never removed.
  These are free to delete — confirm nothing routes through them.
- **Dead macro wires.** A bound control whose target no longer exists or no longer moves
  anything. `pedal-graph-finishing` already treats these as audio risks; here they are
  also noise in the faceplate. `unbind_macro` frees the slot.
- **Published ports nobody uses.** A rack port exposed and never bound or automated.
- **Orphaned modulators.** An LFO or envelope whose destination was rewired away. Check
  the actual wire, not the presence of the node — `pedal-musical-motion` warns that a
  knob can move while the target stays untouched.
- **Layers buried under the mix.** A second oscillator or parallel path 30 dB down. It
  costs voices and contributes nothing. Verify by bypassing, not by reading the number.

Do not flag: anything in `load-bearing-nodes.md`; a node whose value looks neutral but
whose *range* is what a macro sweeps; a deliberate novel mechanism from
`pedal-novel-construction`, which will often look like an oddity precisely because it is
one.

---

## Pass 2 — Legibility

The graph works; can a human see why. This pass frequently *adds* nodes or structure,
and it is the one most often skipped.

Look for:

- **A flat chain past a handful of nodes.** `pedal-authoring` says rack by default. Group
  into small **semantic** racks — Source, Voicing, Dynamics, Space — one function per
  box, rather than one god rack.
- **Racks that are not semantic.** A rack holding a filter, an LFO and a reverb is a bag,
  not a module. Split it, or unwrap it and regroup.
- **Sources and modulators inside racks.** Oscillators, samplers, LFOs and envelopes are
  not rack members; they belong at the head or in the modulators section.
- **Default or mechanical names.** "New Pedal", "gain_db 2", untitled racks. Every rack
  and module should say what it is *for*. Duplicate control names are a hard validation
  error, so naming is not only cosmetic.
- **Inner params that should be one outer control.** `graph_publish_port` collapses a
  relationship a producer thinks of as one move. Three knobs a user always turns together
  should be one.
- **A faceplate that misdescribes the graph.** Labels naming technical parameters instead
  of musical actions, two controls producing the same gesture, or a control whose name no
  longer matches what it moves. `pedal-producer-controls` holds the full checklist.
- **A patch title that says nothing.** "New Synth" survives into the preset library and
  the handoff.

The test: could another producer open this graph and find the stage responsible for a
complaint without auditioning node by node?

---

## Pass 3 — Cost

CPU and voice budget spent on the inaudible. Check `read_diagnostics` for the real
numbers before and after — do not estimate.

Look for:

- **Per-voice global effects.** Reverb and delay inside the voice multiply tails and CPU
  with every note held. Move shared space to master. This is both a cost fix and a
  masking fix, since stacked tails are what smear the next note.
- **Oversampling where nothing aliases.** Justified around a hard non-linearity; wasted
  on a linear stage. Removing it around a saturator is *not* a cost saving — see
  `load-bearing-nodes.md`.
- **Unison and voice count beyond what is audible.** Eight voices of detune where three
  carry the same width. Halve it and run the null test; width is usually the limit, not
  the count.
- **Redundant filtering.** Several filters where one with the right slope does the job.
- **Modulation nobody hears.** An audio-rate modulator on a parameter whose movement is
  inaudible at the depth set. Either raise the depth so it earns the cost, or remove it.
- **Expensive ops on inaudible paths.** Anything costly on a layer that is buried, muted,
  or outside the audible band.
- **High-Q filters near self-oscillation.** A cost risk and a stability risk together.
  Cap the range rather than removing the filter.

Report CPU before and after alongside xruns, peak and voices. A structural change can
raise CPU as easily as lower it — a rack reorganization that duplicates a stage is a
regression even though the graph reads better.
