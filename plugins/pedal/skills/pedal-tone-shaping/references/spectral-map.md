# Spectral map: symptom to band

Read this when a tonal complaint needs a frequency before you touch an EQ, or when
you have a measured peak and need to know what a listener will call it.

Two kinds of claim live here, and they are not equally solid:

- **Register facts** (instrument fundamentals, where a cab stops) — arithmetic, reliable.
- **Band names** ("mud", "bite", "air") — studio convention, not a standard. They are
  a shared vocabulary for talking about a region, never a target to EQ toward.

Trust the psychoacoustics over the band names.

## Register anchors

Fundamentals, so you never mistake "no body" for "no bass":

| Source | Lowest fundamental | Top of normal range |
| --- | --- | --- |
| Piano | ~27.5 Hz (A0) | ~4.2 kHz (C8) |
| Kick drum | ~40 Hz | ~100 Hz |
| Bass guitar (4-string, low E1) | ~41 Hz | ~400 Hz |
| Electric guitar (low E2) | ~82 Hz | ~1.3 kHz (24th fret E6) |
| Male voice | ~85 Hz | ~1 kHz |
| Snare | ~150 Hz | ~250 Hz |
| Female voice | ~165 Hz | ~1.1 kHz |
| Guitar, open high E4 | ~330 Hz | — |

**Body lives at the played fundamental, not below it.** Look the source up in the
table before reaching for low end. A part has no energy at an octave it never plays,
so adding it produces rumble that eats headroom and does nothing for perceived body —
the single most common wrong fix for "thin". An electric guitar's body is 80–250 Hz;
40–60 Hz on a thin guitar is pure waste. `pedal-authoring` says the same thing from
the graph side: an octave-down sub is not body.

If the chain ends in a cab sim, expect a steep rolloff above **~5 kHz** — that is
where a typical guitar speaker stops. Anything you
add above that on a cab-terminated chain is inaudible unless the cab sim is
bypassed or the low-pass is set unusually high. If a patch sounds harsh and the
measured peak is at 6 kHz, check whether the cab stage is actually in the path.

## Symptom to band

Conventional names, with the edit that usually fixes them. Always confirm by
measurement before cutting — the band that *sounds* wrong is often not the band
carrying the energy.

| Complaint | Usual region | First move |
| --- | --- | --- |
| Rumbly, wasted headroom | 20–60 Hz | High-pass below the lowest fundamental |
| Thin, no weight | 80–250 Hz | Body shelf or a richer source at the played octave |
| Muddy, boxy, blurred | 200–500 Hz | Narrow cut; check for stacked layers sharing this band |
| Hollow, distant, scooped | 400 Hz–1 kHz | Stop cutting here; mid scoop is why it vanishes in a mix |
| Honky, nasal, "cheap" | 800 Hz–1.5 kHz | Narrow cut; suspect a resonant filter peak |
| Bite, pick attack, definition | 1.5–3 kHz | Presence bell — the band that makes a part *legible* |
| Harsh, screechy, fatiguing | 2–5 kHz | Narrow cut at the measured peak, never a broad shelf |
| Sibilant, brittle | 5–8 kHz | De-ess or a gentle shelf |
| Air, sheen | 8 kHz+ | Absent on anything cab-terminated — check the cab first |

**The 2–5 kHz warning.** The ear is most sensitive around **3–4 kHz** — the minimum
of the equal-loudness contours, from the ear canal's own resonance. Two consequences:

1. A peak here reads as *harsh* at a level that would be unremarkable elsewhere.
2. This is also where bite, pick attack and vocal intelligibility live.

So "more bite but no screech" is not a contradiction — it is a request to add
presence *beside* a narrow peak rather than raising the whole region. Find the peak
in Hz, cut it narrowly, then add the broad presence you wanted. Doing it in the
other order raises the problem along with the fix.

## Narrow peak is not overall brightness

The distinction `pedal-tone-shaping` insists on, in measurement terms:

- **A narrow resonant peak** shows as a spike a few semitones wide. A listener calls
  it harsh, squelchy, whistly, nasal. It needs a bell cut at the measured frequency.
  A broad low-pass "fixes" it only by removing everything above it, taking the body
  and legibility with it.
- **Overall brightness** shows as a tilt across the whole spectrum, and moves the
  spectral centroid. A listener calls it bright, thin, brittle. It needs a shelf or
  tilt.

Measure before you choose. These feel identical in a blind A/B and respond to
opposite edits.

## Two things in one band

When a body layer and a competing part both sit at 200–400 Hz, EQ on one of them is
the weaker move. Prefer:

- move one layer by an octave;
- shorten the competing tail (see `pedal-context-translation`);
- narrow one part's stereo image so the center is not doubled;
- pick a different source whose natural register does not collide.

Two sources within about **1 Bark** share a critical band and fuse perceptually —
their separation is smaller than the Hz gap suggests. The band table in
`pedal-context-translation`'s `references/masking.md` has the edges.
