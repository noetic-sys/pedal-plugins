# Reading a piano roll screenshot

A screenshot is the most common artifact a producer can hand over in five seconds, and
it is straightforwardly convertible into a `clip` stimulus — provided you do not fall
into the octave trap.

## Confirm the octave before anything else

**MIDI note 60 is not called the same thing in every DAW.** The MIDI standard fixes the
note number and says nothing about octave names, so hosts disagree:

| Host convention | MIDI 60 is labeled |
| --- | --- |
| Ableton Live, Logic Pro, Yamaha | **C3** |
| Scientific pitch notation, many others | **C4** |
| FL Studio | **C5** |

All three are the same key at 261.6 Hz. But if you read "C3" off an FL Studio roll and
build MIDI 48, the patch is **two octaves low** — and every conclusion that follows is
about the wrong register: body, harshness, filter tracking, masking, all of it.

So either ask which DAW, or anchor on something unambiguous:

- Ask "is that middle C?" about a specific note.
- Ask for the note's frequency if the host shows one.
- Match against the audio if you also have a bounce.
- State your reading back: "reading the low note as MIDI 48, two octaves below middle C
   — correct?"

Never silently assume. `pedal-phrase-performance` requires note names *including octave*
in the phrase contract; this is the step that makes the octave trustworthy.

## What to extract

Convert to `clip` notes, each `{ pitch, at_ms, dur_ms, velocity }`:

- **Pitch** — per the octave check above.
- **Entrance** — read off the grid, then convert with the tempo. At 120 BPM a quarter is
  500 ms, an eighth 250 ms, a sixteenth 125 ms. Generally: `ms = 60000 / BPM × beats`.
- **Duration** — the bar's drawn length, which is *not* the grid spacing. This is the
  field most often wrong, and it is exactly the one that decides whether notes overlap.
- **Velocity** — from the velocity lane if visible. If not, say you are assuming a flat
  velocity rather than inventing accents.
- **Tempo and meter** — usually in the transport, often cropped out. Ask if absent;
  every millisecond above depends on it.

## Traps in the image itself

- **The bars are longer than the grid.** Overlapping notes look like adjacent notes at a
  glance. Overlap changes polyphony, glide, legato and masking — look at where each bar
  *ends*, not where the next begins.
- **The screenshot is cropped.** A loop usually continues past the right edge. Ask
  whether it is the whole phrase, and do not silently pad it to a tidy bar count.
- **Zoom hides short notes.** Zoomed out, a sixteenth can look like a grid line.
- **Snap suggests a grid that the performance does not follow.** Notes drawn slightly off
  the grid are usually deliberate feel. Do not quantize them — `pedal-phrase-performance`
  is explicit that silently quantizing an expressive entrance destroys the performance.
- **Two clips look like one.** Layered or stacked parts may be shown together. Ask which
  one the pedal is on.
- **Sustain pedal or note-length automation is invisible.** If the roll shows short notes
  but the user describes long ones, believe the user and ask.
- **The last note's true length is unknowable** if the clip ends on it. Ask whether it
  rings out or is cut.

## Reading it back

Before rendering, restate the phrase in one line and let the user correct it — cheaper
than three iterations on a wrong transcription:

> Reading this as: 84 BPM, 4/4, two notes a bar — MIDI 45 and 48, each held about a bar
> and a half so they overlap, flat velocity. Rendering with a 2 s release tail.

Mark anything uncertain in the handoff rather than resolving it silently, and carry that
note into `pedal-graph-finishing`'s provenance record.
