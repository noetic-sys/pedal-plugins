---
name: pedal-audition-stimulus
description: Establish how the user actually plays the patch before rendering anything — tempo, note lengths, register, polyphony, and what it sits in — and ask for a piano roll screenshot, a MIDI clip, or a bounce when you do not know. Use before the first render on any audio task, and immediately whenever the user reports hearing something you cannot hear in your own renders.
---

# Auditioning what the user actually plays

Use before your first render on any audio-shaped task, and the moment a user reports a
problem your renders do not show.

## The failure this prevents

You render a 500 ms note. The user is holding four-bar chords at 84 BPM. They hear the
release smear into the next chord; your render ended before two notes could ever
overlap. You A/B, hear nothing wrong, and report the patch is fine.

The comparison was invalid and nothing in the output said so. **A wrong stimulus does
not produce an obviously wrong answer — it produces a confident correct answer to a
question nobody asked.** Every downstream tool inherits the error: the metrics are
computed on it, `listen_audio` judges it, the branch records preserve it.

You cannot hear what the user hears unless you render what the user plays.

## The stimulus contract

Before the first render, know as many of these as you can:

- **tempo and meter** — the note grid in milliseconds follows from it;
- **note lengths, and whether notes overlap** — the single most common mismatch;
- **register actually played** — the octave, not the patch's nominal range;
- **monophonic line or chords** — polyphony changes summation, voice count and masking;
- **dynamics** — one velocity throughout, or accents that carry the groove;
- **how the part ends** — does the last note ring out, or get cut;
- **what it plays against** — solo, or under a vocal, or in a dense mix;
- **for an effect: what goes in** — DI guitar, drums, a synth, a full mix.

You will rarely have all of them. The requirement is not certainty — it is knowing
**which ones you are guessing**, and saying so.

## Ask once, batched, with a default attached

Do not interrogate. One short message, every question at once, each with a proposed
default so the user can answer by saying "yeah":

> Before I render — roughly what tempo, and is this long held chords or shorter stabs?
> I'll assume ~120 BPM, quarter notes, mid register unless you tell me otherwise.

**Ask when** the task is about sustain, release, tails, movement, groove, or sitting in
a mix; when the user rejects a render you cannot find fault with; when the brief
mentions a track, song, section or another instrument; or when you are about to spend
several iterations on something.

**Do not ask when** the user already supplied a phrase or MIDI — that is
`pedal-phrase-performance`, and the contract is already on the table — or when the task
is structural (validation, CPU, naming, a dead macro wire) and the stimulus barely
matters. One clarification, per `pedal-producer-language`; then get on with it.

## Better than asking: ask for the artifact

Ranked by how much guesswork each removes:

1. **A bounce of them playing it.** Best. Gives the performance, the tempo, the register
   and the context at once, and becomes the reference for A/B.
2. **The MIDI clip.** Exact notes and velocities, no transcription risk.
3. **A screenshot of the piano roll.** Very good, with real traps —
   `references/reading-a-piano-roll.md`.
4. **A described phrase.** "Whole notes, two chords a bar, low register." Workable.
5. **Your guess.** Last resort, and it gets written down as an assumption.

Say what you will do with it, so the ask sounds like progress rather than an obstacle:

> If you screenshot the piano roll I'll rebuild those exact notes, so we're both
> listening to the same thing.

## Render a stimulus that can show the symptom

Most symptoms are invisible under the wrong stimulus. The mapping from complaint to
stimulus kind and its parameters is in `references/stimulus-selection.md`. The three
that cause the most wasted iterations:

- **A short note hides everything about the tail.** Release, decay, reverb, delay
  feedback and modulation endpoints need a note long enough to reach them.
- **`release_ms` defaults to 500.** A 3-second reverb tail is cut at 500 ms and simply
  is not in the audio you are judging. Raise it past the longest tail in the graph.
- **`guitar_riff` and `drum_loop` are fixed at roughly two bars of 120 BPM.** They are
  convenient, not neutral. If the user plays at 84 BPM in whole notes, these cannot
  represent it — build a `clip`, or use `synth_di` with a clip that fits.

A held note and a phrase answer different questions. Render both when the diagnosis is
unclear, and never let a held note stand in for the phrase.

## Lock it, then keep it

Once established, the stimulus is **fixed**: same notes, same velocities, same
durations, same `release_ms`, same level treatment, for every branch and every
iteration. Changing the stimulus mid-investigation invalidates every comparison before
it, including the branch records in `pedal-branching-and-ab` — a later candidate that
had more time to evolve will win for that reason alone.

Re-establish it when the brief changes: a new section, a different register, chords
instead of a line. Say plainly that the comparison history resets.

## Write it down

Put the stimulus in the handoff alongside the renders, per `pedal-graph-finishing`:
tempo, the notes with entrances and durations, velocities, `release_ms`, octave, and
which fields were **assumed rather than told**. A render whose stimulus is unrecorded
cannot be reproduced, and another agent picking the work up will quietly substitute
their own.

## When the user hears something you do not

Treat it as a stimulus mismatch first, before doubting the report or the graph:

1. Ask what they were playing when they heard it — notes, length, tempo, where in the
   track.
2. Rebuild that exact stimulus and render again.
3. Only if the symptom still does not appear, look at playback path differences: live
   versus offline render, the applied spec versus the candidate, level, mono, or their
   monitoring. `pedal-graph-finishing` covers the render-versus-live divergence case.

The user is listening to the real thing. When your render and their ears disagree,
your render is the thing that is wrong until proven otherwise.

## Related skills

- The user supplied a phrase and recreating it *is* the task:
  `pedal-phrase-performance`. That skill owns the phrase contract and the synth
  behavior choices; this one owns deciding what to render when nobody told you.
- Level-matching the stimulus before judging anything:
  `level-matching.md` under `pedal-context-translation`, which also covers building the
  smallest useful context loop.
- Why tails need a phrase rather than a held note to expose:
  `masking.md` under `pedal-context-translation`.
- Endpoints that only appear on long notes: `pedal-musical-motion`.
- Keeping the stimulus identical across candidates: `pedal-branching-and-ab`.
- `render_test_signal`, `render_test_notes`, formats, and citing `audio_path`:
  `pedal-authoring`.
