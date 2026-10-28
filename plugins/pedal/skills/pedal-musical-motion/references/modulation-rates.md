# Modulation rates and depths

Read this when setting an LFO rate, a vibrato depth, or a filter-envelope endpoint,
and when "add movement" needs a starting number instead of a guess.

Two claims to keep apart: measured performance vibrato, which is reliable, and rate
bands for synthesis, which are convention — a starting point you then audition.

## Vibrato: what players actually do

Measured, not conventional. Human vibrato occupies a narrow rate range:

| Source | Rate (Hz) | Extent |
| --- | --- | --- |
| General typical range | 4.5–6.5 | ~50 cents each side (a quarter tone) |
| Violin | 5.13–8.23, mean 6.65 | 0.04–0.32 semitones, mean 0.14 (≈14 cents) |
| Operatic voice, female | mean 5.9 | mean 79.3 cents |
| Operatic voice, male | mean 5.4 | mean 67.3 cents |
| Cello | mean 5.24 | — |
| Singers (studied range) | — | 34–123 cents, mean 71 |

Two things fall out of this:

- **Rate is tightly constrained. Depth is not.** Almost all musical vibrato sits
  between 4.5 and 7 Hz, while extent spans nearly 4:1 across players. So when vibrato
  sounds wrong, **suspect depth before rate.** `pedal-musical-motion` says to increase
  depth before changing rate when motion is inaudible; the measurements support that
  asymmetry.
- **Instrumental vibrato is shallower than vocal.** Violin averages ~14 cents; singers
  average ~71 cents. A 50-cent vibrato on a guitar or lead patch is a *vocal* depth and
  will read as seasick. Start around 10–25 cents for instrumental, 50–70 for vocal.

Above ~7 Hz pitch modulation stops reading as expression and becomes an effect —
trill, warble, or a nervous artifact. Below ~4 Hz it reads as drift or bad tuning
rather than vibrato.

## Rate bands for synthesis

Convention, for choosing a starting rate. Audition, do not trust.

| Rate | Perceived as | Use for |
| --- | --- | --- |
| < 0.1 Hz | Evolution you notice only over a phrase | Pad drift, slow wavetable travel |
| 0.1–1 Hz | A sweep with a clear direction | Filter opening, formant travel, texture |
| 1–4 Hz | Rhythmic pulsing, tempo-related | Tremolo, wobble, auto-pan |
| 4–7 Hz | Expressive vibrato | Pitch vibrato, subtle formant shimmer |
| 7–20 Hz | Warble, trill, tension | Effects, not expression |
| > 20 Hz | Sideband timbre, no longer "movement" | Audio-rate FM |

`pedal-musical-motion` warns against using 3–7 Hz for broad formant travel. This is
why: that band is the vibrato band, and the ear reads anything in it as expressive
pitch movement. Broad timbral travel belongs below 1 Hz.

## Depth and endpoints

For anything with a destination — filter cutoff, formant frequency, wavetable
position — the **endpoint matters more than the rate.** `pedal-musical-motion` says
the final settled value often matters more than the initial sweep, which is a direct
consequence of forward masking and attention: the listener hears the onset once and
then lives at the endpoint for the rest of the note.

So write down the endpoint in Hz, then check it against the harshness band
(2–5 kHz, the sensitivity minimum — see `pedal-tone-shaping`'s
`references/spectral-map.md`). A formant sweep whose endpoint lands at 1.5–3 kHz is
the acid-squelch failure. Fix order, most to least effective:

1. Lower the destination/endpoint value.
2. Reduce resonance/Q.
3. Reduce modulation depth.
4. Slow the rate.
5. Only then a narrow bell cut.

A bell cut first hides the symptom and leaves the sweep pointing at the problem band.

## Tempo relationships

Anything at 1–4 Hz will be heard against the beat whether you intended it or not.
Rates in beats at common tempos:

| BPM | 1/4 note | 1/8 | 1/16 |
| --- | --- | --- | --- |
| 90 | 1.50 Hz | 3.00 Hz | 6.00 Hz |
| 120 | 2.00 Hz | 4.00 Hz | 8.00 Hz |
| 140 | 2.33 Hz | 4.67 Hz | 9.33 Hz |
| 174 | 2.90 Hz | 5.80 Hz | 11.60 Hz |

A rate slightly off one of these reads as a mistake, not as looseness — the ear locks
to the grid and hears the drift as error. Either lock to the grid or go clearly free
(below ~0.5 Hz). The uncanny zone is a few percent off a division.

Note the overlap: at 120 BPM an eighth note is 4 Hz, inside the vibrato band. A
tempo-synced tremolo and an expressive vibrato can be the same rate and read
completely differently depending on whether they modulate amplitude or pitch. Keep
them on separate destinations — `pedal-musical-motion` already requires pitch and
timbre modulation stay separate.

## Detune and drift

- **Unison detune**: a few cents to ~25 cents spreads a stack. Beyond that it reads as
  out of tune rather than wide. Check mono — detune is safer than Haas width but still
  sums (`pedal-context-translation`'s `references/masking.md`).
- **Slow pitch drift**: below 0.5 Hz and under ~10 cents reads as analog instability.
  Above ~20 cents it reads as broken.
- Pitch JND for trained listeners is a few cents, so "subtle" here is genuinely small.
