---
name: pedal-musical-motion
description: Design audible timbral and pitch movement that evolves naturally, stays in the intended register, and remains musical in the phrase.
---

# Musical motion

Use this for wavetable position, formant/filter motion, vibrato, drift, or evolving sustained sounds.

## Separate motion types

Timbre motion uses LFO or envelope into wavetable position, filter cutoff, or formant frequency. Pitch motion is shallow vibrato or drift in a small cents-equivalent range. Amplitude motion belongs to envelope and compression. Do not use amplitude movement to hide missing timbral evolution.

Stabilize the static source first. If the patch is wrong without movement, modulation makes diagnosis harder.

## Define and test the trajectory

For measured vibrato rates and depths, the rate bands, tempo-division collisions, and
the fix order for a screechy endpoint, read `references/modulation-rates.md`.

Write down the starting value, rate, amount, and expected end value. For a lead, start with a slow envelope or LFO and a small amount. The final settled value often matters more than the initial sweep. Use 3–7 Hz for subtle vibrato, not for broad formant travel.

Render a held note long enough to hear onset, midpoint, endpoint, and release. Then render the exact phrase. Short retriggers hide endpoint behavior and can make a bad movement look harmless.

If motion is inaudible, increase depth slightly before changing rate. If it is too fast, reduce rate first. If it is high, bitey, or screechy, lower the destination/end value, then resonance/Q. If pitch sounds seasick, reduce pitch depth and keep pitch modulation separate from timbre motion.

Ask 'listen_audio' to judge onset, midpoint, endpoint, and whether the movement stays in the target register. Keep the same held note and phrase stimulus for each iteration.

## Motion worksheet

For each moving parameter, write:

- base value;
- modulation source and rate;
- signed amount;
- start and endpoint;
- the register where the movement should be heard;
- the point where it must stop evolving.

This makes “slower and lower” an executable edit rather than a vague intention.

## Compare motion without masking

Use a held note with the same pitch and level for every candidate. If the reference has a phrase, render the phrase after the held-note test. Do not compare a moving candidate to a static reference at different note lengths. A longer candidate will sound more animated simply because it has more time to evolve.

If the modulation is routed through a macro, inspect the actual graph wire. A knob can move while the target parameter remains untouched. Validate the route and remove dead bindings before drawing conclusions from the audition.

## Related skills

- Stabilize the static source first with `pedal-tone-shaping`; modulation on a wrong
  source only makes diagnosis harder.
- Held notes long enough to reach an endpoint, and a `release_ms` that does not
  truncate the tail: `pedal-audition-stimulus`.
- Movement must survive the real phrase, not just a held note:
  `pedal-phrase-performance`.
- Movement that reads as musical soloed can flap in a mix:
  `pedal-context-translation`.
- Putting the motion under a knob: `pedal-producer-controls`.
- If movement is present and still reads as generic, modulate something nobody
  modulates — resonance, width, drive, or an envelope's own times:
  `pedal-novel-construction`.
- Modulation routing, `lfo` vs `adsr` depth semantics, and `set_mod_amount`:
  `pedal-authoring`.
