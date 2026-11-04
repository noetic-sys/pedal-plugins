# Change order when matching a reference

Notes, octave, and timing are locked first (`pedal-phrase-performance`). Then start
from a tutorial-shaped chain for the genre — for example saw stack → low-pass → drive
→ ensemble → hall — not a blank graph, and keep it small enough that each listen
suggestion maps to one or two parameters.

Apply one small cluster per round, re-render the identical stimulus, and keep or
revert. This order usually moves the match fastest; skip any step the reference
does not need.

1. **Open the filter / restore the highs** when a closed low-pass is the blocker.
   Check against the reference LTAS, not a single "darker" request.
2. **Fix the amp envelope shape.** Plucks: fast attack, decay to low sustain.
   Chops and gated parts: hard square gate, sustain 1, short release.
3. **Add drive or saturation** for mid grit and attack definition. Level-match
   before judging.
4. **Add a short transient layer** when the reference has a percussive front —
   for example noise → band-pass → fast envelope.
5. **Filter envelope into cutoff**, then slow drift or an LFO on cutoff for movement.
6. **Width, ensemble, and space last.** Near-mono first; light ensemble; short hall
   or room. Width and reverb added early mask envelope and tone judgments.

Every round:

- Same phrase, note lengths, register, velocity, and `release_ms`.
- Ask `listen_audio` about tone (and gate feel when relevant). Prefer concrete
  parameter suggestions over adjectives.
- Log the query gist, the listen gist, what changed, and the next plan — one line
  each.
- Do not accept the first render or a noisy score. Continue until the sound is
  clearly identifiable and close by ear and listen, or until you can name the
  concrete limitation that blocks it. Stop conditions live in
  `pedal-branching-and-ab`.
