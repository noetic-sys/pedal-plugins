# The routing matrix

The generator, in full. Read this when you need candidates rather than a critique of
candidates.

The whole matrix rests on one fact from `pedal-authoring`: **any signal wired into a
param inlet modulates that parameter at audio rate.** A conventional effect is one
fixed cell in the grid below, frozen into a box decades ago. The grid has hundreds of
cells. Almost all are empty.

## Column 1: detectors — things that sense

Primitive, built from one node:

| Detector | Senses | Normally drives |
| --- | --- | --- |
| Envelope follower, full band | Loudness | Gain (compressor) |
| Envelope follower, post-filter | Loudness in one band | Band gain (de-esser) |
| ADSR on note-on | Time since the note started | Amplitude, filter cutoff |
| Note velocity | How hard it was played | Amplitude |
| Note pitch / key tracking | Which note | Filter cutoff (key tracking) |
| LFO | Nothing — it is blind | Anything, usually cutoff |
| Wet-path level | How much effect is present | Nothing. Almost never used. |
| Feedback-path level | Loop energy | Nothing. Almost never used. |

**Derived** — two primitives combined, giving a sense no single node has. This is the
richest and least explored column:

| Derived detector | Construction | Senses |
| --- | --- | --- |
| Transient-ness | fast envelope − slow envelope | Attack shape, independent of level |
| Brightness-ness | band envelope − full envelope | Spectral tilt, independent of level |
| Unusualness | short average − long average | Louder than normal *for this part* |
| Effect contribution | wet envelope − dry envelope | How much the effect is doing |
| Density | onset rate over a window | Playing fast or sparse |

The level-independence is the prize. A plain envelope follower conflates "hard attack"
with "loud", so its output means two things at once and behaves inconsistently across a
phrase. A difference detector separates them. This is how a transient shaper works, and
why it acts on material where a threshold-based compressor does not.

## Column 2: targets — things that can move

The authoritative list is whatever `list_node_ops` reports as param inlets. Below is
what to look for, sorted by how rarely anyone modulates it. **The bottom of this table
is where the inventions are.**

| Target | Modulated by | Novelty |
| --- | --- | --- |
| Amplitude / gain | Everything | None |
| Filter cutoff | LFO, envelope | None |
| Pitch | LFO (vibrato) | None |
| Pan | LFO (auto-pan) | Low |
| Effect mix / send | Occasionally an envelope | Low |
| Filter resonance / Q | Rarely | **High** |
| Drive / saturation amount | Rarely | **High** |
| Stereo width / spread | Almost never | **High** |
| Delay time | Almost never (and it pitches) | **High** |
| Delay feedback | Almost never | **High** |
| Reverb size / decay | Almost never | **High** |
| Unison detune amount | Almost never | **High** |
| Wavetable position | LFO sometimes | Medium |
| An envelope's own attack / release time | Essentially never | **Highest** |
| An LFO's own rate or depth | Essentially never | **Highest** |
| Oscillator mix / layer balance | Essentially never | **Highest** |

The last three are second-order: something modulating a modulator. They produce
behavior that feels alive rather than cyclical, because the movement itself changes.

## Column 3: transfer — the shape between them

Detector and target are only two thirds. The relationship is the third, and flipping it
is free novelty on a pairing you have already built.

- **Positive.** More detector, more target. Louder → brighter.
- **Inverse.** More detector, less target. This is what a compressor is. Every positive
  pairing has an inverse worth hearing, and the inverse is usually the more interesting
  one because it is the direction physical instruments do *not* go.
- **Thresholded.** Nothing until a point, then act. Gate-like, rhythmic.
- **Curved.** Effect concentrated at one end. Subtle in normal playing, dramatic at the
  extreme — the shape most gestures actually want.
- **Asymmetric in time.** Fast one way, slow the other. Fast attack / slow release is
  the whole character of an optical compressor; applied to *width* or *drive* it is
  something nobody has heard.
- **Lagged.** Deliberately behind. Movement that trails the playing feels like an
  instrument responding rather than a circuit reacting.

Asymmetric timing is underrated. Most exotic pairings sound gimmicky because they are
instantaneous. The same pairing with a 200 ms release feels intentional. If a candidate
is nearly good, adjust the transfer before abandoning the pairing.

## Column 4: position — where the box sits

Same components, different topology. Ask all five of these about every graph:

1. **What if this were inside the feedback loop?** Pedal supports one. A pitch shifter
   after a reverb is a pitch-shifted reverb; inside its feedback path it is shimmer,
   because every pass transposes again. A filter inside becomes a resonator. This single
   question has the highest yield in the whole matrix.
2. **What if the order reversed?** Drive → reverb is a dirty sound in a clean room.
   Reverb → drive is a clean sound in a dirty room. Completely different, equally easy.
3. **What if bands went different ways?** Split, process differently, recombine. Clean
   lows and destroyed highs. Wide highs and mono lows — the mono-safe route to width.
4. **What if attack and tail went different ways?** Split by time, not frequency. Dry
   focused centered attack, wide spacious pitch-shifted tail. Breaks the clarity-versus-
   size tradeoff, which is why it reads as expensive.
5. **What if the output fed the input?** A parameter driven by the signal downstream of
   itself. Alive, and unstable — cap the range.

## Working the matrix

1. Enumerate real param inlets (`list_dsp_ops`, `describe_dsp_op`, `list_node_ops`).
2. Take the job the patch needs, name the reflex move for it, and list two other
   things that could do the same job.
3. Pick three cells: one re-paired detector/target, one position change, one derived
   detector.
4. For each, write the story sentence *before* building. If you cannot, skip the cell —
   this costs seconds and saves a build.
5. Build the survivors as branches on one axis (`pedal-branching-and-ab`).
6. Level-matched A/B against the baseline. Check mono and the real phrase.

Expect roughly one in three cells to be worth building and one in three of those to
beat the baseline. That yield is normal. It is also far better than the yield from
choosing carefully inside the default.
