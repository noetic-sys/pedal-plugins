---
name: pedal-producer-language
description: Expand terse or shorthand producer asks into an explicit task brief, and translate producer vocabulary and subjective feedback into perceptual hypotheses, controlled tests, and minimal Pedal DSP or MIDI changes. Use whenever the ask is short, slangy, frustrated, or uses producer terms (pluck, stab, chop, reese, OTT, sidechain, glue, air, mud, sits, expensive, stabby, thin), and before acting on any one-line request.
---

# Producer language

Producers talk in shorthand. "Find the plucks and render the MIDI" is a complete,
precise instruction to another producer: it implies a time window, isolating one
instrument, onset detection, pitch estimation, snapping to the song's tempo and key,
and an audible check against the original. A model that reads it literally does a
fraction of that, asks what was meant, and the producer has to spell out their own
job.

This skill has two jobs: **expand the ask** into the full brief before acting, and
**translate the vocabulary** into audible tests.

## Expand the ask

Before acting on a short request, rewrite it for yourself as an explicit brief. Fill
every field you can from the conversation, the files, and research
(`pedal-reference-research`). Mark what you assumed.

- **Target** — the exact sound, part, and section. "The pluck in the first 15 s of
  the reference, solo, 0:00–0:15."
- **Known facts** — tempo, key, notes, role, recipe; looked up, not asked.
- **Stimulus** — the exact phrase every render plays (`pedal-audition-stimulus`).
- **Method** — the concrete steps, in order, including the ones a producer would
  consider too obvious to say.
- **Judge** — how you will know it worked: a labeled `listen_audio` A/B against the
  reference window, the user's adjective as acceptance criterion, measurable gates.
- **Loop** — change one thing, re-render the identical stimulus, keep or revert, log
  it. Do not stop at the first render that compiles.
- **Quality gates** — no clipping, clean note ends, level-matched, sounds like a
  finished production sound.
- **Deliverable** — what you hand back: render paths, the preset, the stimulus, the
  log, and what is still uncertain.

Then do it. The expansion is for you; show the user a one-line summary of the plan,
not the whole brief, unless they ask.

### Worked expansions

**"take 15 seconds of audio, find the plucks, render some midi for that"** →
Target: the plucked part in 0:00–0:15 of the reference. Known facts: look up the
song's tempo and key first. Method: trim the window; find each pluck's onset; estimate
each pluck's pitch and octave; snap onsets to the looked-up tempo grid, keeping real
pickups and rests; check pitches against the key; write a clip stimulus. Judge:
render the MIDI on a neutral tone and A/B against the reference window with
`listen_audio`, asking about note identity, octave, and timing separately; fix wrong
notes and re-check. Never reuse an earlier guessed pattern — the audio is the source
of truth. Deliverable: the MIDI/clip, the A/B result, and any notes still uncertain.

**"make it sound like the drop"** → Target: the named lead or bass in the first drop,
by timestamp. Research tempo, key, recipe, and existing MIDI. Stimulus: the drop
phrase, not a held note. Judge: labeled A/B of the drop window vs the candidate.

**"it's thin"** → Hypothesis, not edit: missing played-octave body or exposed
resonance. Test body at the played octave against the same phrase before adding
layers (`pedal-tone-shaping`).

**"do the thing from earlier but darker"** → Restore the named earlier candidate, not
a reconstruction from memory (`pedal-branching-and-ab`). "Darker" is a hypothesis
about the settled spectrum; check whether the reference is actually dark before
closing the filter.

## When the user is frustrated

Frustration means the previous turn under-delivered: it asked instead of looking it
up, guessed instead of measuring, or reused a wrong earlier result. The fix is the
work, not the apology.

- Do not apologize at length, restate their complaint back to them, or promise to do
  better. One clause of acknowledgement at most.
- Do not ask another clarifying question unless it is truly unanswerable from the
  audio, the files, or a search.
- Re-expand the ask from the original source material, discard the earlier guessed
  work, do the full method, and come back with evidence: the render, the A/B result,
  and what changed.

## Translate vocabulary before editing

Restate the term as an audible test. "Stabby" means a clearer first 20–80 ms and a
shorter tail. "Thin" suggests missing played-octave body or exposed resonance.
"Gritty" concerns nonlinear texture and transient harmonics at equal loudness.
"Human" suggests phrase timing, velocity, retrigger, and subtle movement. "Big"
separates body, width, and space. "Forward" tests attack, presence, tail, and level.

For the full vocabulary — sound-type names (pluck, stab, chop, reese, hoover,
supersaw, wobble), processing shorthand (OTT, sidechain, glue, parallel), mix terms
(mud, boxy, honky, air, sits, buried), performance terms (glide, ghost notes, swing,
legato), and subjective adjectives — read `references/glossary.md`.

Treat each translation as a hypothesis, not a parameter name. The user's word
remains the acceptance criterion.

## Controlled response

Ask at most one clarification when solo/context or dark/bright direction is genuinely
ambiguous. Otherwise state the hypothesis, render the same held note and phrase,
change the smallest relevant parameter group, and ask `listen_audio` whether the
candidate moved toward the adjective.

Do not solve "bigger" with loudness, "human" with random modulation, or "warm" with an
unbounded low shelf. Report what the test was meant to learn and what actually
changed.

## Keep the user in charge of taste

Do not replace the user's adjective with a score. The listen model can identify a
likely mechanism, but the producer decides whether "warm," "raw," "expensive," or
"ugly in the right way" is correct. If model feedback and the user's direct report
disagree, run the same labeled A/B again and make the disagreement explicit. The
user's ear wins.

## Minimal-test examples

- "More body, less pluck" means hold drive and reverb constant, lengthen attack a
  little, compare the low-mid envelope, then decide whether a shelf is needed.
- "More bite but no screech" means preserve the attack, locate the narrow settled
  peak, and add presence outside that peak rather than raising the whole treble band.
- "Fatter but not muddy" means compare a restrained body shelf, unison width, and
  short room as separate candidates.
- "More human" means compare phrase velocity and retrigger behavior before adding
  random LFO modulation.

## Related skills

This skill turns shorthand into a brief and an adjective into a hypothesis. Hand the
work to whichever skill owns the mechanism:

- a named song, artist, sound, or reference to look up → `pedal-reference-research`
- what to render, and the stimulus contract → `pedal-audition-stimulus`
- tonal (thin, fat, bright, harsh, fuzzy) → `pedal-tone-shaping`
- static, boring, lifeless timbre → `pedal-musical-motion`
- notes, groove, timing, articulation, "more human" → `pedal-phrase-performance`
- "disappears in the track", "too loud for its job" → `pedal-context-translation`
- two or more readings of the adjective are plausible → `pedal-branching-and-ab`
- "boring", "generic", "safe", "sounds like everything else" →
  `pedal-novel-construction`. This is a brief for a new mechanism, not a tonal
  complaint; EQ will not fix it.

Tool mechanics and the authoring loop live in `pedal-authoring`.
