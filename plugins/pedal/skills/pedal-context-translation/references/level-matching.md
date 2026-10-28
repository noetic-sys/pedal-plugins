# Level-matched comparison

Read this before any A/B you intend to draw a conclusion from, and whenever a
candidate "sounds better" but you cannot say which axis improved.

## The louder one wins

In an unmatched by-ear A/B, the louder clip is preferred — nearly always, and the
listener does not experience it as a level preference. It presents as better body,
better bite, more depth.

The mechanism is the equal-loudness contours: hearing sensitivity varies with frequency *and* level, and low and high frequencies
fall off faster than mids as level drops. Raise the level and both ends come up. So a
level increase mimics exactly the improvement a producer asks for when they say
"fatter", "bigger", or "more open".

**Every request in `pedal-producer-language` that separates "bigger" from "louder"
depends on this file.** Without level-matching you cannot honour that distinction —
you will confirm every hypothesis you test.

## Match before you judge

1. Render both clips with identical stimulus — same notes, velocities, duration and
   release (`pedal-branching-and-ab` and `pedal-phrase-performance` hold the same line).
2. Measure integrated loudness (LUFS) on both.
3. Apply a static gain to the quieter one so integrated loudness matches. **A static
   gain only.** Never a limiter, normalizer or compressor — those change the thing
   under test.
4. Confirm true peak stays under about **-1 dBTP** so the gain did not introduce
   clipping.
5. Tell `listen_audio` the clips are level-matched, and to ignore residual loudness.

**Tolerance.** Broadcast delivery works to ±1 LU, but that is a delivery tolerance,
not a comparison one. For A/B, get within **0.1–0.5 LU**. Around 1 LU the
difference starts to carry preference on its own.

**Why integrated, not peak.** Peak-normalizing matches nothing perceptual — a
compressed candidate and an open reference can share a peak while differing by
several LU. Integrated loudness gates out near-silent passages, so a phrase with
rests measures like what you actually hear.

## Level-matching is not the whole check

Matched loudness answers "which is better at the same level". It does not answer
"does this survive the real world". Keep these as separate passes:

- **Low-volume playback.** At low level the contours flatten your extremes: bass and
  top disappear first. A patch that only works loud is a patch leaning on level. This
  is the single cheapest check for "sounds huge alone, vanishes in the track".
- **Mono fold-down.** See `references/masking.md` for comb filtering.
- **Headphones and speakers.** Width and low-mid body read differently on each.

Run each at matched loudness too. Otherwise you are testing two variables.

## Candidate against a commercial reference

A mastered reference is typically several LU louder and already limited. Comparing a
raw candidate to it unmatched guarantees the reference wins.

- Match integrated loudness of the *excerpt* you are comparing, not the whole track.
- Expect the reference's crest factor to be lower from mastering. Do not chase it by
  compressing the candidate — see `references/` in `pedal-tone-shaping` on crest factor.
- Ask about spectral balance, role and movement. Do not ask which sounds more
  "finished"; the answer is always the mastered one and it teaches you nothing.
- `pedal-context-translation` states the general rule: never ask the listen tool to
  judge a solo candidate against a full master as if they were the same source.
