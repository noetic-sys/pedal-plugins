# Producer glossary

Each entry: what the producer means → what to listen for → what to test in Pedal.
Every translation is a hypothesis. The producer's word stays the acceptance
criterion; confirm with a labeled A/B on the locked stimulus.

## Sound types

- **Pluck** — short, percussive note with a fast attack and decay to silence or near
  silence; the filter often closes with the amp. Test: attack ≤ 5 ms, decay
  100–400 ms, sustain 0–0.2, filter envelope tracking the amp. A pluck has pitch and
  body; it is not a click.
- **Stab** — short, loud, often chordal hit, usually on or around the beat. Unlike a
  pluck, the sustain is often held for the note length and then cut. Test: chords,
  not arpeggios; note length controls the length; short release.
- **Chop / gated** — a sustained sound cut rhythmically, on/off. The MIDI note length
  is the gate. Test: hard square amp envelope — attack and decay ≈ 1 ms, sustain 1,
  short release. Sustain 0 turns it into a pluck and will not match.
- **Lead** — the foreground melodic line. Must sit in front: clear attack, body at the
  played octave, presence 1–4 kHz, not buried in reverb.
- **Pad** — sustained, slow-attack harmonic bed. Width, slow movement, space; must not
  mask the lead.
- **Keys** — piano/EP/organ-like; velocity-sensitive, often tine or bell transient.
- **Bell** — inharmonic or FM-rich bright attack with long decay.
- **Sub** — sine or near-sine fundamental below ~100 Hz; felt more than heard. Mono.
- **808** — long, pitched, sub-heavy kick/bass, often with pitch drop, glide, and
  saturation so it reads on small speakers.
- **Reese** — two or more detuned saws, low-passed, with slow phasey beating; often
  with movement in the detune or filter.
- **Hoover** — detuned, pitch-bending, chorused PWM/saw stack with downward glide
  (classic rave).
- **Supersaw** — many detuned saws (7+ voices) with wide stereo spread; trance and
  EDM leads and chords.
- **Wobble** — bass whose low-pass cutoff (or formant) is modulated by a tempo-synced
  LFO (1/4, 1/8, triplets).
- **Growl** — bass with formant/vowel-like movement, heavy distortion, often FM or
  comb filtering.
- **Donk** — short, bouncy, pitched-percussion bass (hard house); fast pitch envelope.
- **Acid / 303** — saw or square mono bass through a resonant 18–24 dB low-pass with
  accent and slide; filter-envelope squelch.
- **Riser / sweep** — rising noise or pitch building tension into a drop.
- **Impact / downlifter** — boom or falling sweep marking a section start.
- **Drop** — the high-energy section after a build; usually where the signature bass
  or lead is exposed.

## Processing shorthand

- **OTT** — aggressive multiband upward and downward compression (Xfer OTT). Brings
  up low-level detail and squashes peaks: bright, dense, "in your face." Test:
  multiband or stacked compression with parallel mix; watch fizz and noise.
- **Sidechain / pump / duck** — level dips on every kick so the sound breathes with
  the groove. Test: tempo-synced volume envelope (1/4 note), fast attack, release
  shaped to the groove.
- **Glue** — gentle bus compression making layers feel like one sound. Low ratio,
  slow attack, a few dB of reduction. Not "louder."
- **Parallel** — blend a heavily processed copy under the dry signal (parallel
  compression or distortion) to add density without losing the transient.
- **Saturation / drive / dirt / grit** — harmonic distortion. "Warm" saturation adds
  low-order harmonics; "grit" adds upper harmonics and transient edge. Level-match
  before judging.
- **Bitcrush / downsample** — lo-fi digital aliasing and quantization noise.
- **Formant** — vowel-like resonant peaks ("talking," "yoi"). Test: bandpass/bell
  peaks moving between vowel positions.
- **Unison / detune** — stacked voices slightly detuned for thickness and width.
  Watch mono collapse and phasey beating.
- **Wet / dry** — effect amount vs original.
- **Pre-delay** — gap before reverb starts; keeps the attack clear while adding space.
- **Ping-pong** — delay alternating left/right.
- **Throw** — a delay or reverb send automated onto a single note or phrase end.
- **Tape stop / pitch dive** — pitch and speed dropping to a stop.

## Mix and tone terms (approximate bands)

- **Sub** — 20–60 Hz. **Bass / low end** — 60–250 Hz.
- **Mud / muddy** — buildup around 200–500 Hz; blurred, unclear.
- **Boxy** — 300–800 Hz resonance; sounds like a cardboard box.
- **Honky / nasal** — 800 Hz–1.5 kHz bump.
- **Presence** — 2–5 kHz; definition and forwardness. Too much is harsh.
- **Harsh / bitey / screechy** — 2–5 kHz or a narrow resonant peak; fatiguing.
- **Sibilant / fizzy** — 5–10 kHz; esses, distortion fizz.
- **Air** — 10–20 kHz; openness and sheen.
- **Body** — energy at the played fundamental and its first harmonics. Not the same
  as sub; an octave-down sub does not add body.
- **Thin** — missing body, or too much upper-mid relative to it.
- **Sits / sits in the mix** — occupies its own space without masking or being
  masked; holds level on low-volume and mono playback.
- **Buried / gets lost** — masked by another part; often fixed by attack, presence,
  or carving the competing part, not by raising level.
- **Wide / narrow / mono-compatible** — stereo spread; must survive mono summing.
- **Punch** — strong, short transient followed by controlled body.
- **Headroom** — margin below 0 dBFS. **Loud** is not better: always level-match.

## Performance and MIDI terms

- **Glide / portamento / slide** — pitch travels between notes. Usually mono/legato
  only. Glide makes notes feel late; use only when audible in the reference.
- **Legato** — notes connected without retriggering the envelope.
- **Retrigger** — each note restarts the envelope (and often oscillator phase).
- **Ghost notes** — quiet, short in-between notes that carry groove.
- **Swing / shuffle** — off-beats delayed; a percentage or grid (16th swing).
- **Humanize** — small timing and velocity variation. Evidence-based only.
- **Velocity** — how hard a note is played; often maps to level, brightness, attack.
- **Accent** — a louder/brighter note in a pattern (303 accent).
- **Off-beat** — notes between the beats (classic house bass on the "and").
- **Triplet** — three notes in the space of two (1/8T, 1/16T).
- **Pickup / anacrusis** — notes before the downbeat. Do not quantize them away.
- **Voicing** — which notes of a chord, in which octave, in which order.
- **Arp** — a chord played as a repeating note sequence. Never turn a chord into an
  arp, or an arp into a chord, without evidence.
- **Root / fifth / octave** — intervals relative to the chord; "octave the lead"
  means double it 12 semitones up or down.
- **Half-time / double-time** — feels like half or twice the tempo. When BPM sources
  disagree by 2×, test both against the reference.

## Subjective adjectives

- **Stabby** — clearer first 20–80 ms, shorter tail.
- **Plucky** — fast decay; too plucky means the sustain is missing.
- **Round** — fewer upper harmonics, soft attack, solid fundamental.
- **Warm** — gentle low-mid emphasis and soft high-end rolloff, low-order saturation.
  Not an unbounded low shelf.
- **Bright / crisp** — more upper energy; check it is not one narrow peak.
- **Dark / dull** — less upper energy; "dull" is the bad version.
- **Fat / thick / big** — body + width + space agreeing. Not loudness.
- **Gritty / dirty / raw** — audible nonlinear texture at equal loudness.
- **Clean** — no audible distortion, clean transients, controlled tails.
- **Expensive / polished** — controlled dynamics, no harsh peaks, sense of space,
  nothing out of place. Often "less," not "more."
- **Cheap / plasticky** — static timbre, harsh upper mids, no body, no movement,
  stock-preset character.
- **Corny / cheesy** — overly obvious effects (too much reverb, chorus, cliché
  pitch bends) or dated preset character.
- **Lush** — wide, slowly moving, with long smooth space.
- **Dusty / lo-fi** — rolled-off highs, noise, wow and flutter, bitcrush.
- **Glassy** — clean, bright, bell-like upper harmonics, little distortion.
- **Hollow** — missing mids, often square/odd-harmonic or comb-filtered.
- **Squelchy** — resonant filter envelope sweep (acid).
- **Bouncy** — short notes with clear rests and groove; pitch envelope on bass.
- **Breathing / alive / moving** — slow, musical modulation; opposite of static.
- **Human** — timing, velocity, retrigger, and subtle movement; not random LFOs.
- **Forward / in your face** — attack, presence, dry level. **Sits back** — softer
  attack, less presence, more space.
- **Washed out** — too much reverb or delay masking the attack.
- **Ugly in the right way** — intentional distortion or dissonance; keep it, control
  level.
