# Choosing the stimulus

Which stimulus can actually show which symptom, and what each one costs you if you pick
it out of habit. Kinds and parameter names below are the real ones the render tools
accept; confirm against the live schema if a call is rejected.

## Effects — `render_test_signal`

| Kind | Shows you | Do not use it for |
| --- | --- | --- |
| `log_chirp` | Magnitude response across a range. The best filter probe. | Anything about musical behavior or dynamics |
| `impulse` | A filter's frequency response, cheaply | Non-linear stages — it undershoots their working point |
| `white_noise` | Steady-state response on non-linear processors | Transient or envelope behavior |
| `sine_tone` | Attenuation or harmonic content at one frequency (THD on a saturator) | Anything broadband |
| `guitar_riff` | An overdrive biting, a delay throw, a chorus, on plucked DI | **Any tempo but 120, any length but ~2 bars** |
| `drum_loop` | Compressor pump, gate chatter, reverb bloom, transient shaping | Same fixed-tempo limitation |
| `synth_di` | A named `clip` through a named `instrument` — musical input you choose | — |

**The canned-loop trap.** `guitar_riff` and `drum_loop` are fixed at roughly two bars at
120 BPM. They are excellent defaults and they are not neutral. If the user plays whole
notes at 84 BPM, neither can reproduce what they hear, and no parameter will make them.
Reach for `synth_di` with a clip that matches, or move the audition to the synth side
where you can write notes directly.

**Match the input to the real input.** An effect auditioned on `guitar_riff` and used on
a pad tells you very little: the transient density, the spectrum and the crest factor all
differ. Ask what goes in.

## Synths — `render_test_notes`

| Kind | Shows you | Blind to |
| --- | --- | --- |
| `single_note` | The whole envelope, movement endpoints, the tail | Groove, note overlap, polyphony |
| `chord` | Polyphony, summation, voice count, intermodulation | Anything monophonic or rhythmic |
| `clip` | A real phrase: entrances, durations, overlap, velocities | — (this is the honest one) |
| `retrigger` | Whether a voice survives repeated striking — the "plays once then blips" bug | Sustain and tail |
| `two_note` | Glide and legato, because the notes overlap | Everything else |
| `velocity_sweep` | The velocity response curve | Timing and tails |
| `pitch_sweep` | Pitch tracking, zipper artifacts on glide | Musical behavior |
| `idle` | The rest state — self-oscillation, DC, "space laser" tone | Anything played |

`clip_preset` gives ready-made phrases (`bass_riff`, `chord_progression`, `arp_up`,
`melody`) — a fast step up from a held note, still not the user's part.

`octave` shifts every note. Use it to audition the patch where the user actually plays,
and to check a symptom at both ends of the register rather than in the middle.

## The two parameters that silently invalidate a render

**`duration_ms`** is how long the gate is held. Short values hide everything that takes
time: release, decay, reverb, delay feedback, filter-envelope endpoints, LFO travel. If
the complaint involves the word *sustain*, *tail*, *decay*, *evolve* or *blur*, the note
must be long enough to get there. `pedal-musical-motion` makes the same point from the
other side: short retriggers hide endpoint behavior, so a bad movement looks harmless.

**`release_ms`** defaults to **500** and is how long capture continues *after* note-off.
A 3-second reverb tail in a graph rendered with the default is cut at 500 ms — the smear
the user is complaining about is not in the file you are judging. Set it past the longest
tail in the graph: reverb decay, delay feedback, and amplitude release, whichever is
longest.

Every synth render also reports `idle_peak`, the level with no note held. Non-zero means
self-oscillation or DC. Read it even when you rendered for another reason.

## Symptom to stimulus

| The user says | Render | Because |
| --- | --- | --- |
| "Notes blur into each other" | `clip` with real overlap, generous `release_ms` | Needs two notes close enough to collide |
| "The tail is wrong / too long / too short" | `single_note`, long `duration_ms`, `release_ms` past the tail | Default release truncates it |
| "It's lifeless / no groove" | `clip` with the real velocities and rests | A held note has no groove to lose |
| "Attack is soft / too clicky" | `clip` at real tempo, plus `single_note` for the envelope | Attack reads differently in context |
| "It goes screechy partway through" | `single_note` long enough to reach the endpoint | The endpoint is the problem, not the onset |
| "Chords sound muddy" | `chord`, at the real voicing and register | Mono renders cannot show summation |
| "Dies after a few notes" | `retrigger`, `count` 8+ | The canonical voice-wind-down probe |
| "Something rings when I'm not playing" | `idle` | A gated render hides the rest state |
| "Fine alone, lost in the track" | `clip` plus a context loop | See `pedal-context-translation` |
| "Sounds thin down low / harsh up high" | Same stimulus at two `octave` values | One register tells you nothing about the other |

## Two renders, not one

When the diagnosis is uncertain, render both:

1. **A long held note** — the complete envelope, movement, and tail, in isolation.
2. **The real phrase** — timing, overlap, velocity, and how notes interact.

They answer different questions and disagreeing is informative: a patch that is fine
held and bad in the phrase is a timing, overlap or masking problem, not a tone problem.
`pedal-phrase-performance` requires both for exactly this reason. Never let the held note
stand in for the phrase — that substitution is the mismatch this whole skill exists to
prevent.
