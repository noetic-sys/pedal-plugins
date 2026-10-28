---
name: pedal-phrase-performance
description: Recreate a producer's phrase with correct notes, timing, articulation, velocity, retrigger behavior, glide, and human feel. Use for leads, riffs, basslines, stabs, and melodic parts where performance is part of the sound.
---

# Phrase performance

Use this when the user gives a piano roll, MIDI, a hummed phrase, or a recorded part and expects the Pedal patch to play the same musical idea. The goal is not a generic preset audition. The goal is a comparable performance through the candidate graph.

## Establish the phrase contract

Before editing DSP, record:

- note names or MIDI pitches, including octave;
- entrance time for every note in milliseconds or beats;
- duration and release overlap;
- velocity or accent differences;
- tempo and meter when known;
- which notes are legato, retriggered, bent, or vibrato-bearing;
- which reference was used for A/B, named rather than copied.

If a screenshot or recording leaves a note uncertain, mark it and test the plausible readings. Do not silently quantize an expressive entrance or invent a note to make the pattern tidy.

## Render the right tests

Use `mcp__pedal__render_test_notes` with `stimulus.kind: "clip"` for the actual phrase. Keep the same stimulus across iterations. Set realistic velocities and `release_ms` so tails are audible. Render a held `single_note` only as a secondary envelope diagnostic.

Use three tests when behavior is unclear:

1. A held note long enough to hear the complete envelope and movement.
2. The exact reference phrase with timing and note lengths.
3. A lightly humanized variant with only evidence-based velocity or duration changes.

If the renderer caps duration, fit the first complete phrase inside the cap and compare it to an excerpt of the same length. Do not include notes beyond the cap and call it a full-phrase test.

## Choose synth behavior deliberately

- Use retriggered phase when every note has a repeated attack, as with picked guitar or a percussive stab.
- Use continuous phase or mono legato when the reference connects notes without a new attack.
- Set glide only when pitch travel is audible. Glide can make a clean phrase feel late and soft.
- Shape articulation with attack, decay, sustain, and release before using a filter sweep to fake a new note.
- Preserve velocity differences when they carry groove. Flattening all velocities destroys the performance.
- Add vibrato or pitch drift only on sustained notes where the reference supports it.

## Diagnose failures

- **Wrong entrance:** check note timing, attack, phase mode, and stale-voice behavior.
- **Robotic groove:** compare velocities, rests, note lengths, and quantization before changing the oscillator.
- **Notes blur:** shorten release or competing reverb, or correct overlapping MIDI durations.
- **Every note sounds newly plucked:** test legato/continuous phase and verify the phrase is actually connected.
- **Pitch feels late or smeared:** remove glide and inspect attack/release before changing tuning.
- **Timbre is close but the part is lifeless:** add only evidence-based velocity, timing, or sustained-note movement.

## A/B procedure

1. Render the fixed phrase through the candidate spec.
2. Call `mcp__pedal__listen_audio` with original and candidate files together. Name the note sequence and state what to ignore.
3. Ask separately about onset alignment, accents, overlap, release, groove, and timbre.
4. Change the smallest MIDI or synth setting that tests the diagnosis.
5. Re-render the identical phrase and keep the better candidate.

## Completion standard

Do not call the performance correct because one note sounds good or the graph compiles. The phrase must preserve notes, timing, rests, articulation, and role while the held-note diagnostic confirms a usable envelope. Record transcription uncertainty in the handoff.

## Related skills

- "More human" as an adjective, before it becomes a MIDI edit:
  `pedal-producer-language`.
- The user has *not* given you a phrase and you need one before rendering:
  `pedal-audition-stimulus`. That skill owns eliciting the stimulus; this one owns
  recreating a phrase you were given.
- Timbre wrong rather than performance wrong: `pedal-tone-shaping`.
- Sustained-note vibrato and drift depths: `pedal-musical-motion`.
- Release and tail lengths that mask the next note's attack: `masking.md` under
  `pedal-context-translation`.
- `render_test_notes`, stimulus kinds, and clip duration caps: `pedal-authoring`.
