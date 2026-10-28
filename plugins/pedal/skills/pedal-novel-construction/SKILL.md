---
name: pedal-novel-construction
description: Invent a graph construction that does not already exist, instead of rebuilding the standard patch. Use when the user asks for something cool, novel, weird, unique, surprising, or "not like everything else", when they reject a candidate as boring, generic, bland, safe, or stock, or whenever a brief has no obvious precedent. Supplies a generator — re-pair a detector with an unusual target, move a box to an unusual position, or derive a new detector — not an instruction to be creative.
---

# Novel construction

Use this when the brief wants a sound that does not already exist, or when a producer
calls a working patch boring.

## Why the default wins unprompted

You can wire any signal into any parameter inlet. The reachable space of graphs is
enormous. Yet left alone you will build saw → filter → reverb, because the common
construction is also the *most likely* construction, and likely is what you reach for
without a reason not to.

"Be creative" does not fix this. It produces the same patch with a stranger name.
What fixes it is a **generator**: a procedure that hands you candidates you would not
have proposed, so that you are choosing between real alternatives instead of ranking
variations on one. You cannot reach a different part of the space by choosing more
carefully inside the familiar part — you have to go look.

## Step 0: name the default, then widen

Before anything else, write down the patch you were about to build. Nodes, order,
effects. Be specific and honest.

Naming it does two things. It becomes the **baseline** you will A/B against, and it
stops being invisible — an unnamed default gets built by reflex, while a named one has
to earn the slot.

Then, for each job the patch needs, spend a moment on what *else* could do that job:

| Job | The reflex | Also does this job |
| --- | --- | --- |
| Space | Reverb | Short multi-tap delay; modulated comb; tail-only width; a single early-reflection burst |
| Body | Low shelf, or a second oscillator | Mild saturation adding harmonics at the played fundamental; a band-limited parallel layer; a longer low-mid envelope |
| Width | Unison detune, or stereo delay | Band-split width with mono lows; mid/side balance; width on the tail only |
| Interest | Drive, or an LFO on cutoff | A derived detector driving anything; a position change; a modulator modulating a modulator |
| Movement | LFO → filter cutoff | Envelope → a parameter nobody automates; playing dynamics → timbre; velocity → envelope shape |

The reflex column is not wrong, and often it is exactly right. The point is that it
should win on merit rather than by arriving first. **Survey before you commit, and give
at least one unfamiliar option a real hearing.**

If the conventional move still wins the A/B, ship it and say so. A brief that genuinely
wants a clean saw through a low-pass is not improved by machinery.

## Discovery before invention

The generator runs on the *actual* vocabulary, not a remembered one. Before inventing:

1. `list_dsp_ops`, then `describe_dsp_op` on anything unfamiliar. Read the ops you have
   never used. Your bias is toward the six ops you always use.
2. `list_node_ops` for leaf ops and **their inlets**. Note which inlets are param
   inlets, because that list is the entire set of things you are able to modulate.
3. `list_tunable_args { spec_id }` on a built graph for `min`, `max`, `kind`,
   `bindable` on every argument.

**The set of param inlets is the invention space.** Most are never modulated by
anything. Write out the ones nobody would normally automate — delay time, drive
amount, resonance, an envelope's own attack time, an LFO's rate, unison spread — and
treat that as your shortlist of targets.

Then read exemplars (`list_exemplars`, `open_exemplar`) for the *opposite* reason
`pedal-authoring` gives: not to match their structure, but to know exactly what the
conventional answer looks like so you can leave it. If your candidate is structurally
an exemplar with different numbers, it is the baseline wearing a hat.

## The three engines

Work through at least two before settling. They open different kinds of space, and the
value is in having genuinely different options on the table — the engine that feels
least natural for the brief is usually the one carrying the option you have not
considered.

### 1. Re-pair a detector with a target

Every conventional dynamics box is a **hardcoded pairing** of something that senses and
something that moves. A compressor is *level sensed → gain moved, inversely*. That
pairing is a historical accident of analog hardware, not a law.

Break the pairing:

- level → **width**: the part spreads as it decays, so it blooms into the gaps. (This
  is real: mid/side compression is understood as dynamic width control — compress the
  mid and loud material widens the image, compress the side and it narrows.)
- level → **delay feedback**: the repeats grow only in the spaces between notes.
- level → **drive**, positively: quiet playing is clean, hard playing bites. Inverting
  the normal compressor relationship gives an *expander* of texture rather than level.
- level → **filter resonance** rather than cutoff: hard notes ring instead of opening.
- transient → **reverb send**: only picked attacks get the room; sustained notes stay dry.
- band level → **detune amount**: the stack spreads only when the part is bright.
- pitch → **body gain**: low notes get weight, high notes stay thin, automatically.
- note velocity → **envelope attack time**: soft notes swell, hard notes snap. Velocity
  normally goes to gain, and almost never to the envelope's own shape.

The move is mechanical: pick a detector, pick a target from your param-inlet shortlist,
pick a sign, and ask what it would sound like. The full matrix and the transfer shapes
are in `references/routing-matrix.md`.

### 2. Move the box

Same components, different position. Position is a design axis and you almost always
leave it at the default.

- **Into the feedback loop.** Pedal supports one feedback loop, and what you put inside
  it changes character completely. A pitch shifter *after* a reverb is a pitch-shifted
  reverb; the same shifter *inside* the reverb's feedback path is shimmer — each pass
  transposes again and the harmony ascends forever. A filter in the loop is a
  resonator. Ask of every box: what if this were inside the loop?
- **Reverse the order.** Distortion after the reverb saturates the tail instead of the
  note — dirty room, clean attack. Filter before drive is a tone stack; after, a cab.
- **Split by band, process differently.** Not multiband compression for control, but
  band-split for *character*: clean lows, destroyed highs; wide highs, mono lows (which
  is also the mono-safe way to get width).
- **Split by time.** Route the attack and the tail down different paths and process them
  independently. The attack path stays dry, focused, centered; the tail path gets the
  space, width, and pitch movement. This is the single most reliable way to sound
  expensive, because it breaks the tradeoff between clarity and size.
- **Feed a parameter from the wet signal.** The effect's own output drives one of its
  inputs. Self-referential, alive, easy to make unstable — cap the range.

### 3. Derive a new detector

You are not limited to the detectors that exist. **Combine two primitives and the
difference is a new sense.**

A transient shaper works this way: two envelope followers, one fast, one slow, and the
*difference between them* is the control signal. That difference senses
transient-ness independently of how loud the signal is — something no single envelope
follower can do. Two boring parts, subtracted, yield a detector that is not on anyone's
parts list.

Generalize it:

- fast envelope − slow envelope = **transient-ness**, level-independent.
- band level − full level = **brightness-ness**, level-independent.
- current level − long average = **is this louder than usual for this part**.
- envelope of the dry − envelope of the wet = **how much is the effect contributing**.

Then feed the derived detector somewhere from engine 1. "Brightness-ness → width" is a
patch that gets wider the brighter you play. Nobody builds that, and it is three nodes.

## The musical story gate

Every candidate must survive one sentence a producer would actually say, in terms of
playing and hearing, with no node names:

> "It gets wider as it fades, so held notes bloom into the gaps."

> "Hard picking makes it bite; soft picking stays clean — the pedal follows your hand."

If the sentence needs graph vocabulary, the invention has no perceptual identity and
you have built novelty theatre. Discard it. A construction nobody can *hear* as a
behavior is a complicated way to make a normal sound.

The sentence is also the acceptance criterion. `pedal-producer-language` holds the same
line: the producer's words decide, not the cleverness of the mechanism.

## One invention per patch

An invention is legible only against an otherwise ordinary patch. Two novel mechanisms
in one graph mask each other, and neither is attributable when the producer says it is
weird.

So: **one novel construction, conventional everywhere else.** This also respects
`pedal-authoring`'s warning not to soup everything, and keeps the CPU budget for the
mechanism that matters. If you have three good candidates, make three branches
(`pedal-branching-and-ab`), not one patch.

## Build and prove

1. Build the baseline from step 0. Render it. This is the thing to beat.
2. Build the invention as one change against that baseline.
3. Render the **identical** stimulus — same notes, velocities, duration, release.
4. Level-match, then A/B. An invention that is merely louder or brighter always wins
   unmatched. Method: `level-matching.md` under `pedal-context-translation`.
5. Ask `listen_audio` whether the *story sentence* is audible, naming both clips. Do not
   ask which is better; ask whether the behavior you designed is perceptible.
6. Check mono and low level before celebrating. Dynamic width is the most exciting
   result in engine 1 and the most likely to collapse — see `masking.md` under
   `pedal-context-translation`.

An invention that fails the A/B is a real result. Say so, keep the branch record, and
run the generator again — do not quietly ship the baseline and call it the invention.

## How invention actually fails

- **Novelty theatre.** Structurally exotic, perceptually identical to the baseline. The
  story gate catches this. Most rejected candidates die here.
- **Unplayable.** Interesting on a held note, unusable in a phrase. Test the real
  phrase (`pedal-phrase-performance`); parameter movement that tracks the envelope
  behaves completely differently across a riff than on one long note.
- **Mono suicide.** The width trick vanishes or eats the fundamental on fold-down.
- **Unstable.** Feedback and self-modulating parameters run away. Cap ranges below
  self-oscillation; `pedal-graph-finishing` treats an uncapped high-Q range as an audio
  risk, and that goes double when something is modulating it.
- **Unpredictable under the hand.** A control whose effect reverses across its range is
  not expressive, it is broken. `pedal-producer-controls` requires minimum, center and
  maximum all be usable.
- **Too expensive.** Per-voice exotica multiplies with voice count. Check
  `read_diagnostics` after applying.

## Related skills

- Worked constructions with detector, target, story, risk and precedent:
  `references/invention-catalog.md`. The full generator matrix and transfer shapes:
  `references/routing-matrix.md`.
- Running candidates as branches on one axis: `pedal-branching-and-ab`.
- Keeping the mechanism through a later cleanup pass — an invention often looks like
  an oddity: `pedal-simplify-graph`.
- The story sentence as acceptance criterion: `pedal-producer-language`.
- Judging whether the mechanism is audible: `pedal-tone-shaping` for tonal axes,
  `pedal-musical-motion` for movement — including why an endpoint matters more than a
  rate, which applies to every derived-detector target.
- Surviving mono, low level, and the mix: `pedal-context-translation`.
- Exposing the invention as one knob a producer can play: `pedal-producer-controls`.
- Graph mechanics that make all of this possible — summing audio inlets, param-inlet
  modulation, the feedback loop, `set_mod_amount`, racks: `pedal-authoring`.
