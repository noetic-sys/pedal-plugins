---
name: pedal-tone-shaping
description: Shape body, width, harmonic interest, attack, sustain, spectral placement, and space without making a patch muddy, harsh, fuzzy, or generic.
---

# Tone shaping

Use this when feedback says thin, fat, bright, bitey, pure, plucky, fuzzy, cheap, wide, or washed out.

## Model the sound as separate jobs

Body is controlled low-mid energy and played-fundamental strength. Width is restrained unison or stereo spread that must survive mono. Harmonic interest comes from source richness or moderate saturation. Attack, sustain, and release come from envelope and dynamics. Space comes from room, plate, delay, or early reflections.

Establish one convincing core voice before adding layers. A second oscillator can make a candidate fuller while moving it away from a focused guitar or lead. Add a shelf, octave/triangle layer, or unison only when the reference A/B earns it.

## Use evidence before EQ

For the symptom-to-band table, the register anchors that keep you from mistaking
"no body" for "no bass", and why 2–5 kHz is the harshness band, read
`references/spectral-map.md`. For what centroid, rolloff and crest factor license you
to conclude — and where each one lies — read `references/measurement.md`.

Level-match candidate and reference. Compare centroid, rolloff, crest factor, and a spectrogram, then listen. Locate the offending band in Hz and distinguish onset energy from the settled tail.

If formant or filter motion lands as a whistle, lower the base cutoff or endpoint, reduce resonance/Q, reduce modulation depth or slow the motion, and only then try a narrow bell cut. A broad low-pass can remove useful body while leaving a narrow peak.

## Attack/body/space diagnostics

Judge the first 50 ms, held middle, and release separately.

- Too plucky or pure: lengthen attack slightly, soften the transient, then add restrained body or saturation.
- Too soft or blurred: restore transient or velocity before adding treble; reduce reverb if attack is masked.
- Too fuzzy: reduce drive and compressor ratio. A lower crest factor often means excess processing, not better sustain.
- Too short: increase sustain/release modestly and check phrase overlap.
- Too dry: use a short, low-mix room or plate.
- Too washed out: shorten time and mix before changing the source.
- Too thin: test body EQ or a richer source before adding another oscillator.

Change one tonal axis at a time: source, envelope, nonlinear stage, spectral placement, motion, then space. Render the same held note and phrase after each meaningful group. Ask the listen tool whether the change moved toward the target and revert a change that improves one metric while damaging the role.

A good result sounds larger because body, harmonics, movement, and space agree. It does not simply sound louder, brighter, or more compressed.

## Tool sequence

1. Render the candidate against the loaded reference.
2. Use listen_audio for the perceptual diagnosis.
3. Use analyze_reference or a spectrogram when the suspected band or envelope is uncertain.
4. Change one axis, then render the identical held note and phrase.
5. Keep the candidate only when both the sound and musical role improve.

## Keep a decision log

For every tonal pass, record the hypothesis, changed nodes and parameters, render path, listen score or description, and decision. A useful record says “lowered settled formant endpoint because the late 1.5 kHz peak read as acid squelch,” not “made it darker.” This prevents oscillating between contradictory edits.

## Do not confuse causes

A narrow resonant peak is not the same as overall brightness. A missing low-mid fundamental is not the same as low volume. A fuzzy sustain is not the same as a short release. A long wet tail is not the same as sustain. Test the cause that best matches the symptom before adding another processor.

## Related skills

- The adjective that sent you here, and keeping the producer's word as the acceptance
  criterion: `pedal-producer-language`.
- Making sure the render can even show the symptom — note length, tempo, register:
  `pedal-audition-stimulus`. A short note hides every tail problem.
- If the patch is tonally right but static or boring: `pedal-musical-motion`.
- If the patch is tonally correct and still uninteresting, the problem is the
  construction, not the balance: `pedal-novel-construction`.
- Before committing: `pedal-context-translation` for mono, low level, and the mix.
- Exposing the winning tonal axis as a knob: `pedal-producer-controls`.
- Comparing more than two tonal candidates: `pedal-branching-and-ab`.
- Graph mechanics, op vocabulary, and the render tools: `pedal-authoring`.
