---
name: pedal-producer-language
description: Translate subjective producer feedback into perceptual hypotheses, controlled tests, and minimal Pedal DSP or MIDI changes.
---

# Producer language

Use this when feedback is metaphorical or relational: expensive, corny, round, human, bigger but not louder, sits back, needs attitude, too bitey, or too pure.

## Translate before editing

Restate the adjective as an audible test. “Stabby” means a clearer first 20–80 ms and a shorter tail. “Thin” suggests missing played-octave body or exposed resonance. “Gritty” concerns nonlinear texture and transient harmonics at equal loudness. “Human” suggests phrase timing, velocity, retrigger, and subtle movement. “Big” separates body, width, and space. “Forward” tests attack, presence, tail, and level.

Treat this as a hypothesis, not a parameter name. The user's adjective remains the acceptance criterion.

## Controlled response

Ask at most one clarification when solo/context or dark/bright direction is genuinely ambiguous. Otherwise state the hypothesis, render the same held note and phrase, change the smallest relevant parameter group, and ask 'listen_audio' whether the candidate moved toward the adjective.

Do not solve “bigger” with loudness, “human” with random modulation, or “warm” with an unbounded low shelf. Report what the test was meant to learn and what actually changed.

## Keep the user in charge of taste

Do not replace the user's adjective with a score. The listen model can identify a likely mechanism, but the producer decides whether “warm,” “raw,” “expensive,” or “ugly in the right way” is correct. If model feedback and the user's direct report disagree, run the same labeled A/B again and make the disagreement explicit.

## Minimal-test examples

- “More body, less pluck” means hold drive and reverb constant, lengthen attack a little, compare the low-mid envelope, then decide whether a shelf is needed.
- “More bite but no screech” means preserve the attack, locate the narrow settled peak, and add presence outside that peak rather than raising the whole treble band.
- “Fatter but not muddy” means compare a restrained body shelf, unison width, and short room as separate candidates.
- “More human” means compare phrase velocity and retrigger behavior before adding random LFO modulation.

## Related skills

This skill turns an adjective into a hypothesis. Hand the hypothesis to whichever skill
owns the mechanism:

- tonal (thin, fat, bright, harsh, fuzzy) → `pedal-tone-shaping`
- static, boring, lifeless timbre → `pedal-musical-motion`
- groove, timing, articulation, "more human" → `pedal-phrase-performance`
- "disappears in the track", "too loud for its job" → `pedal-context-translation`
- two or more readings of the adjective are plausible → `pedal-branching-and-ab`
- "boring", "generic", "safe", "sounds like everything else" → `pedal-novel-construction`.
  This is a brief for a new mechanism, not a tonal complaint; EQ will not fix it.

Tool mechanics and the authoring loop live in `pedal-authoring`.
