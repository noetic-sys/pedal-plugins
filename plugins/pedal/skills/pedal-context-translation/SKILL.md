---
name: pedal-context-translation
description: Make a Pedal sound survive solo, arrangement context, mono, low-volume playback, headphones, and speakers without masking or excessive level.
---

# Context and translation

Use this before committing a production sound or when a patch works solo but disappears or becomes harsh in the track.

## Establish the role

Identify whether the sound carries a hook, anchors low end, punctuates rhythm, fills a transition, supplies texture, or sits behind a vocal. Note the competing parts and target register. A lead and bass should not be optimized with the same body or transient rules.

Keep a solo diagnostic and a context diagnostic. Solo reveals source, envelope, distortion, movement, and tail. Context reveals masking, role, headroom, and whether the part earns its level.

## Test set

Level-match every view before judging it: method, tolerance, and why the louder clip
always wins are in `references/level-matching.md`. When a part is audible soloed and
gone in the loop, `references/masking.md` has the three mechanisms (critical-band,
tail-over-next-note, and mono comb filtering) and which fix each one needs.

Use the same phrase in these views: solo, the backing loop at matched loudness, mono/center summed, and low-volume playback. Check headphones and speakers when available. Ask the listen tool to judge role, masking, attack, sustained body, tail length, and harshness while ignoring mastering loudness.

## Correct in order

Fix source, register, phrase, or envelope if identity is wrong. Fix spectral placement and competing tails if the part is masked. Fix stereo width and effect depth if mono or low level exposes a problem. Fix gain and headroom last.

Prefer complementary moves: shorten a competing tail, move a body layer by octave, narrow an effect return, reduce a resonant peak, or carve a small band. Do not automatically add volume, treble, or a high-pass.

The part is ready when it remains identifiable soloed, occupies its intended role in the loop, survives mono and low level, and does not need unnatural loudness. Save both solo and context diagnostics.

## Context evidence

When the full song is unavailable, make the smallest useful context loop from the supplied audio. Preserve the target entrance and enough backing before and after it to hear masking. Label the loop's role and do not ask the listen tool to judge a solo candidate against a full master as if they were the same source.

Use the following failure map:

- audible solo, missing in loop: masking, register, tail, or insufficient focused midrange;
- audible in loop, harsh at low level: narrow upper-mid resonance or excessive transient;
- wide solo, weak in mono: phase or unison width problem;
- correct tone, clipped in context: gain staging or compressor makeup problem;
- correct notes, wrong role: phrase articulation or arrangement conflict.

## Acceptance check

The final note should remain identifiable when the backing is present without becoming louder than the reference role. Write down which view found the last problem and which edit fixed it.

## Related skills

- Fixing the band once masking has located it: `pedal-tone-shaping`.
- Choosing a stimulus and context loop that can show the problem:
  `pedal-audition-stimulus`.
- Fixing a tail that masks the next note: `pedal-musical-motion` for release and
  effect times, `pedal-phrase-performance` for overlapping MIDI durations.
- Keeping the mono center intact across a macro's range: `pedal-producer-controls`.
- Recording both solo and context diagnostics in the handoff: `pedal-graph-finishing`.
- `load_reference`, `analyze_reference`, `compare_to_reference`: `pedal-authoring`.
