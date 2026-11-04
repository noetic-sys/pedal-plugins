---
name: pedal-branching-and-ab
description: Explore subjective sound-design alternatives with reproducible branches, equal stimuli, explicit decisions, and safe rollback.
disable-model-invocation: true
---

# Branching and A/B history

Use this when several sources, drive levels, filter ranges, movement shapes, or spaces could fit, or when repeated edits risk losing the best version.

## Preserve the baseline

Before exploring, preserve the known-good spec or preset. Record its name, spec id, phrase stimulus, level treatment, and the reason it currently wins. Never overwrite it with an untested branch.

Give each branch a musical identity such as 'tight-bright', 'dark-body', or 'wide-dusty', never 'v7' or 'final'.

## One axis per branch

Keep each branch identical except for one axis: source, envelope, spectral placement, grit, movement, or space. If a body layer and reverb are both under question, make separate branches before a combined version. Otherwise the result cannot teach you which decision helped.

Render candidates with identical phrase, velocities, duration, release, and level handling. Pass labeled clips together to 'listen_audio' and ask for role, attack, body, movement, high-end, and tail. Record keep, reject, or merge with the audible reason.

A scalar score is evidence, not authority. A branch can score well while failing the requested role. If the user says go back, restore the named branch or preset instead of reconstructing it from memory. Apply only the selected spec after validation.

## Branch record

Each branch record should contain:

- branch name and parent candidate;
- one changed axis;
- exact spec id or preset path;
- stimulus path, and the reference named rather than copied;
- level treatment;
- listen result;
- keep/reject/merge decision;
- the next experiment.

Use stable names such as body-shelf-vs-layer or endpoint-low-vs-slow, so another producer can understand the experiment without opening the graph.

## Stop conditions

Stop exploring when one candidate clearly wins the requested role, when additional changes only trade one already-solved problem for another, or when the remaining difference is a taste call for the producer. At that point finish the winning branch rather than generating endless near-duplicates.

When matching a reference, also stop on a plateau: `listen_audio` oscillates (asks for opposite moves on consecutive rounds — darker, then brighter) or returns the same verdict across several rounds. Further rounds are noise. If the plateau is below the target because Pedal lacks a capability, name the missing capability and what it would likely unlock instead of iterating further.

## Hand the producer a clean A/B

At a plateau or a decision point, give the producer a listening set they can judge in one pass:

- the reference window;
- the current candidate;
- the previous best, or the currently applied version;
- all level-matched, all playing the identical stimulus;
- clearly labeled, with file names or short gaps that keep the order obvious.

The producer's ear overrides `listen_audio`. When they pick a candidate, lock that exact spec: save or apply the one they heard, not a re-tweaked version, and record that it was chosen by ear.

## Related skills

- Identical stimulus and matched loudness are what make a branch comparison mean
  anything: `level-matching.md` under `pedal-context-translation`.
- Establishing and locking that stimulus in the first place:
  `pedal-audition-stimulus`.
- Choosing which single axis to vary: `pedal-tone-shaping` (tonal),
  `pedal-musical-motion` (movement), `pedal-phrase-performance` (performance).
- The adjective that decides the winner stays the producer's:
  `pedal-producer-language`.
- Generating branches that are genuinely different rather than three flavors of one
  shape: `pedal-novel-construction`. Its baseline is the branch to beat.
- Finishing the winner rather than making more near-duplicates:
  `pedal-graph-finishing`.
- `save_preset`, spec ids, and what `apply_to_live` does not persist:
  `pedal-authoring`.
