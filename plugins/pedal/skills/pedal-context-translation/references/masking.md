# Masking and mono

Read this when a part is audible soloed and gone in the loop, when two parts fight
and you cannot hear which to move, or when a wide patch collapses in mono.

Masking is why "audible solo, missing in loop" is a real failure mode and not the
producer imagining things. Three mechanisms, each with a different fix.

## 1. Simultaneous masking — critical bands

The ear resolves frequency into critical bands, not into Hz. Energy inside one band
competes; energy in different bands mostly does not. Two sources within about
**1 Bark** fuse, and their perceived separation is smaller than the Hz gap looks.

The 24 critical-band edges in Hz:

```
0    100   200   300   400   510   630   770   920  1080  1270  1480
1720 2000  2320  2700  3150  3700  4400  5300  6400  7700  9500 12000 15500
```

Read it as: **bands are ~100 Hz wide below 500 Hz, then widen fast.** Consequences
that change what you do:

- Down low, small Hz moves are large perceptual moves. A bass at 80 Hz and a kick at
  60 Hz are two bands apart and separable. A body layer at 220 Hz and a guitar at
  250 Hz are in the *same* band and will fuse no matter how carefully you EQ.
- Up high, a 300 Hz move at 6 kHz stays inside one band and buys you nothing. Moving
  a part "out of the way" by a few hundred Hz works at 200 Hz and is theatre at 6 kHz.
- A narrow cut only unmasks if it is narrow relative to the band. Below 500 Hz that
  means genuinely narrow.

**So: to unmask, cross a band edge or change the envelope.** Do not make a
half-band EQ move and declare it fixed.

## 2. Temporal masking — tails over the next note

A loud sound masks in time as well as in frequency, and the two directions are wildly
asymmetric:

- **Forward masking (post-masking)** — a masker hides what *follows* it, for roughly
  **50–300 ms**, sometimes beyond 200 ms and reportedly as far as 500 ms with a strong,
  long masker. Effectiveness decays exponentially, the offset attenuation lasting
  roughly 100 ms.
- **Backward masking (pre-masking)** — a masker hides what *precedes* it for only about
  **1–2 ms** of real effect, noticeable up to ~20 ms.

Forward masking is the one that ruins parts. A reverb or delay tail, a long release,
or a ringing resonance sits in the 50–300 ms window and swallows the *attack of the
next note*. The symptom is "notes blur" or "the groove went away", and the
instinctive fix — more attack, more presence — makes it worse by adding energy into a
window that is already occupied.

**Shorten the tail first.** `pedal-context-translation` lists shortening a competing
tail as the first complementary move, and this is why it outranks EQ.

Practical: at 120 BPM a sixteenth note is 125 ms. A 300 ms release on a sixteenth-note
riff means every note is masking the next two. Compute the note interval before
setting release, and check it against the phrase, not a held note — a held note cannot
show you this. `pedal-phrase-performance` requires the real phrase for exactly this
reason.

## 3. Mono fold-down — comb filtering

Summing a widened stereo signal to mono sums a signal with a delayed or phase-shifted
copy of itself. Frequencies where the copies are out of phase cancel; where in phase
they reinforce. The result is a comb filter: regular notches spaced about **1/delay Hz**
apart. A 5 ms offset puts a 180° shift at 100 Hz and its odd multiples.

This is the mechanism behind "wide solo, weak in mono":

- **Haas / precedence width** (one channel delayed ~10–20 ms) reads as width in stereo
  because the ear localizes to the first arrival while the delay stays under about
  **25–40 ms**. In mono it is a comb filter with notches every 50–100 Hz. It is the
  worst offender and the most popular trick.
- **Detuned unison** is safer; its cancellation moves rather than sitting in a fixed
  notch.
- **Mid/side or stereo-spread EQ** is safest for body, because the center survives.

Checks:

1. Fold to mono and compare level and tone, at matched loudness.
2. If body drops on fold-down, a phase-based width trick is eating the fundamental.
   Narrow it or move to detune.
3. Keep the fundamental and body **centered**. Width belongs to harmonics, air and
   effect returns — not to the note.

`pedal-producer-controls` requires every macro to keep the mono center across its
range; a Width knob that passes this test at center and fails at maximum is a
range-design bug, not a taste call.

## Which mechanism am I looking at

| Observation | Mechanism | First move |
| --- | --- | --- |
| Gone in loop, tone unchanged soloed | Simultaneous, same critical band | Cross a band edge, or move a layer an octave |
| Attacks blur, groove weak, fine soloed | Forward masking from tails | Shorten release, reverb time, or delay feedback |
| Body drops when folded to mono | Comb filtering from width | Narrow width; center the fundamental |
| Harsh at low level only | Narrow upper-mid peak | Bell cut at the measured peak (`pedal-tone-shaping`) |
| Fine at volume, thin quiet | Equal-loudness contours | Do not fix with EQ; check the arrangement role |
