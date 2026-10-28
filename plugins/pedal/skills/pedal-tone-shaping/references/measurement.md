# Reading the numbers

Read this when `analyze_reference` or `compare_to_reference` returns metrics and you
need to know what they license you to conclude.

The rule that governs this whole file: **a metric locates a difference, it does not
name a problem.** Every number here has a documented failure mode where it moves for
a reason unrelated to what you are hearing. Use them to point the listening, and to
catch yourself claiming a change you did not make.

## Spectral centroid — brightness

The energy-weighted mean frequency. The best-supported single correlate of perceived
brightness: on distorted guitar timbre, centroid and listener brightness ratings
correlate at around **r ≈ 0.91**.

- Candidate centroid well above reference → brighter. Suspect too much presence, too
  little body, an open filter, or excess drive harmonics.
- Well below → darker or duller. Suspect a low cab low-pass, a closed filter, or
  missing harmonic content.

**Where it lies:** it is a *mean*, so it cannot distinguish a broad tilt from one
narrow spike, and those need opposite edits (see `references/spectral-map.md`). A
single resonant peak drags the centroid up and reads as "brighter" when the real
complaint is "whistly". Always pair a centroid delta with a spectrogram before
deciding between a shelf and a bell.

## Spectral rolloff — where the top ends

The frequency below which a set fraction of energy falls (commonly 85% or 95%).
Complements the centroid: rolloff finds the *edge*, centroid finds the balance.

- Candidate rolloff far below reference → the top is being removed. Check the cab
  low-pass and filter cutoff before adding treble.
- Far above → content above where the reference stops, often fizz from drive.

Useful specifically for cab and filter checks, because it tracks a ceiling rather
than a distribution. If rolloff matches and centroid does not, the difference is
balance inside the band, not bandwidth.

## Crest factor — transient life

Peak divided by RMS, in dB. How much the peaks stand above the average.

- **Falling crest factor across your edits means compression, not improvement.** This
  is the number that catches "too fuzzy": a patch that measures denser and louder
  while sounding worse is a crest factor problem. `pedal-tone-shaping` states it as
  a lower crest factor often meaning excess processing rather than better sustain.
- Candidate much lower than reference → over-compressed or over-driven; reduce ratio
  or drive before touching EQ.
- Much higher → transients exposed, body or sustain missing.

**Where it lies:** it is global over the window. A phrase with rests measures
differently from a held note. Compare like stimuli only — same notes, same length —
which is the same discipline `pedal-branching-and-ab` applies to branches.

## Loudness — LUFS

Integrated loudness, in LUFS. Not a tone metric; it is the
precondition for trusting every other comparison. Level-match first or the A/B
is decided by level. Method and the reason are in
`pedal-context-translation`'s `references/level-matching.md`.

## Interpreting a metric set

1. **Level-match first.** An unmatched pair makes centroid and crest factor
   uninterpretable, because level changes perceived spectrum (equal-loudness contours).
2. **Read them together.** Centroid up + crest factor down = more drive, not brighter
   EQ. Centroid up + rolloff flat = balance shift inside the same bandwidth. Centroid
   flat + crest down = compression with no tonal change.
3. **Locate, then listen.** Take the metric delta to the spectrogram, find the band or
   the moment, then use `listen_audio` for the perceptual call.
4. **Let the adjective decide.** The producer's word is the acceptance criterion, not
   the metric — see `pedal-producer-language`. A candidate can match the reference on
   every number and still be wrong for the role.

## What metrics cannot tell you

No number here distinguishes:

- musical movement from noise — both raise variance;
- a tail that supports the part from one that masks the next note;
- "expensive" from "loud";
- the right register from a plausible one.

Those need `listen_audio` against a labeled reference, or the producer.
