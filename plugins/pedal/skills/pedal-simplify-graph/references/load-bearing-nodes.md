# Nodes whose silence is the point

These are inaudible **by design**. A quiet DC blocker is a DC blocker doing its job, not
a redundant node. Removing one because it fails a null test on a mid-register test note
is the audio equivalent of deleting input validation because the tests pass — the code
that dropped it is not simpler, it is unfinished.

If an audit finding proposes removing one of these, skip the finding.

## The catalog

**DC blocker.** Removes a constant offset that a non-linearity, an asymmetric waveshaper
or a modulated path can introduce. A DC offset is usually *inaudible on its own* while
eating headroom, biasing every downstream stage, and thumping on note transitions. It is
audible only as a problem later, somewhere else. Pedal's own exemplars terminate in
`dcblock_hz → limiter` for this reason.

**Output limiter or safety ceiling.** Catches the peak that only happens at maximum drive,
full polyphony, or the resonant corner of a swept filter. Silent in every normal render.
Its absence surfaces as clipping in the user's DAW, after handoff.

**Subsonic high-pass.** Removes content below the played register that wastes headroom and
can pump a downstream compressor. Inaudible by definition — it removes what you cannot
hear — which is exactly why it reads as removable. See the register anchors in
`spectral-map.md` under `pedal-tone-shaping`.

**Gain staging into a non-linearity.** A gain node before a saturator or clipper is not
"a volume node"; it sets the working point, and the character of the distortion depends on
it. Removing it changes the drive's texture even though the node itself sounds like
nothing. Removing it and compensating downstream is not equivalent.

**Anti-aliasing / oversampling around a non-linearity.** Aliasing folds high harmonics
back down as inharmonic content. On a low, quiet test note there may be nothing to fold,
so the null test passes; play high and hard and the patch turns to grit. Check at the top
of the register and at maximum drive before you believe a null result here.

**Range caps below self-oscillation.** A resonance or Q ceiling that keeps a filter from
screaming. It does nothing until something modulates the filter to its limit — then it is
the only thing preventing the failure. `pedal-graph-finishing` treats an uncapped high-Q
range as an audio risk in its own right.

**Envelope or smoothing on a modulated parameter.** A smoother exists to stop zipper
noise and clicks on fast parameter movement. Static renders never exercise it. Move the
control quickly, as `pedal-producer-controls` requires, before judging it.

**Stages that only act at an extreme.** Anything protective is by definition idle in the
typical case: a gate on a noisy source, a de-esser on a bright layer, a compressor
catching only the hardest hits. Test at the extreme, not the middle.

## The general rule

Ask **what this node prevents**, not what it does. If the answer is a failure that
appears at an extreme of register, level, velocity, polyphony, or modulation, then the
node is protective and the null test must be run at that extreme before it means
anything.

A node that does nothing in the typical case and everything in the worst case is not dead
weight. It is the reason the worst case is not a bug report.
