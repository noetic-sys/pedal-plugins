---
name: pedal-reference-research
description: Look up the facts behind a named sound before building or asking — tempo, key, the exact section, existing MIDI or transcriptions, tutorials and breakdowns, and the synth or gear used. Use whenever the user names a song, artist, producer, genre sound, or preset, or hands over a reference recording or link, and before asking the user anything a search could answer.
---

# Reference research

Use this the moment a brief names something that exists in the world: a song, an
artist, a producer, a genre sound ("reese", "hoover", "future bass chords"), a synth
preset, or a recording the user supplied.

## The failure this prevents

The user says "make the Opus intro pluck." You guess 120 BPM, invent a four-note
pattern, build a saw pluck, and ask the user what tempo the song is. The tempo and key
are published, recreation tutorials show the piano roll, and community MIDI exists.
Every one of those facts was a search away. The user now has to do your
research for you, and every render until then compared the wrong phrase.

**Anything a search can answer is not a question for the user.** Asking a producer for
the tempo of a released song reads as not trying.

## What to establish

Before the first edit, look up and record:

- **tempo and meter** — BPM databases, DAW-project breakdowns, tutorials. Released
  songs almost always have a published BPM; cross-check two sources.
- **key and mode** — and the actual pitches of the part, not just the song key. A
  lead in F# minor can still sit on the fifth.
- **the section** — the timestamp where the target part is exposed (intro, breakdown,
  first drop), so analysis and A/B use the window where it is not masked by drums,
  bass, or vocals. Name it: "0:00–0:15, intro, pluck solo."
- **the notes** — existing MIDI, community transcriptions, piano-roll tutorials,
  sheet music, sequencer recreations. Treat community MIDI as a candidate: verify by
  ear, because it is often in the wrong octave or simplified.
- **the sound recipe** — tutorials, producer interviews, preset breakdowns, and
  forum threads: which synth, oscillator shapes, filter, envelope, effects chain,
  layering, and processing (sidechain, OTT, saturation, reverb type).
- **the role** — lead, bass, pad, pluck, stab, counter-melody; what it plays against.

When the user supplies a recording instead of a name, identify it first (title,
artist, section) and then do the same lookup.

## Where to look

- Web search for "<song> BPM key", "<song> MIDI", "<song> <part> tutorial",
  "<song> <part> serum/vital/sylenth preset", "how to make <sound>".
- Video tutorials: read the transcript or description rather than guessing from the
  title. Recreation videos often show the piano roll and the synth panel.
- Producer interviews and gear pages for the original synth and chain.
- The user's own files: a `.mid`, a bounce, or stems they already have outrank any
  web source.

If web search is not available in this session, say so once and fall back to asking,
with your best estimate attached as a default.

## Record it as a contract

Write the findings down, each marked by how you know it:

| Field | Value | Status | Source |
| --- | --- | --- | --- |
| Tempo | 126 BPM | found | two BPM databases agree |
| Key | F# minor | found | tutorial + BPM database |
| Section | 0:00–0:15 intro | found | timestamp in tutorial |
| Notes | F#4 F#5 A4 C#5 repeating | found, verify by ear | community MIDI |
| Recipe | saw pluck, short decay, room + echo | inferred | two tutorials |
| Octave | as written | guessed | — |

- **found** — a source states it; cite the source.
- **inferred** — derived from sources that do not state it directly.
- **guessed** — no evidence; it is a default and must be tested by ear.

Then ask the user **only** about what is still guessed and matters, in one batched
message with defaults attached, per `pedal-audition-stimulus`.

## Use what you found

- Build the stimulus from the found tempo, notes, and section; lock it per
  `pedal-audition-stimulus` and recreate it per `pedal-phrase-performance`.
- Start the graph from the found recipe and the closest exemplar, not a blank shell
  (`pedal-authoring`).
- When MIDI is found but unverified, confirm the octave and pitches with a labeled
  A/B against the reference before any timbre work.
- When sources disagree (two tempos, two keys, half-time vs double-time), test the
  plausible readings against the reference rather than picking one silently.

## Rights

Use references, downloads, and community MIDI as private working material for the
user's own sound design. Do not bake copyrighted audio into a preset, and flag it if
the user intends to redistribute something built on third-party material.

## Related skills

- Turning the found facts into the exact stimulus you render:
  `pedal-audition-stimulus`.
- Recreating the phrase once the notes are known: `pedal-phrase-performance`.
- Turning a terse ask into the full brief this research fills in:
  `pedal-producer-language`.
- Matching the timbre once notes and tempo are locked: `pedal-tone-shaping`.
- Exemplars and the authoring loop: `pedal-authoring`.
