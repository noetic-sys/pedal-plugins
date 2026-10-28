# Invention catalog

Worked constructions, to calibrate what "novel but musical" means and to break the
blank-page problem. **Do not treat these as a menu to ship from** — a catalog entry
copied verbatim is just a rarer default. Use them to see the *shape* of a good
invention, then run the matrix for the brief in front of you.

Each entry gives the detector, the target, the story sentence a producer would say, the
way it fails, and whether real gear has done it. Node names are deliberately absent:
build from whatever `list_dsp_ops` and `list_node_ops` actually report.

---

## 1. Width compressor

**Level → stereo width, inversely.** Loud passages narrow toward the center, quiet ones
spread out.

> "It tightens up when I dig in and opens out as it fades."

Dynamics and imaging are normally unrelated, so the sound seems to have depth that does
not come from reverb. Focus when loud, size when soft — the opposite of what a mix
usually forces you to choose.

**Precedent:** partly. Mid/side compression is a form of dynamic width control —
compress the mid and loud material widens the image; compress the side and it narrows.
As an explicit width parameter driven by an envelope, it is rare.

**Fails when:** width comes from a phase trick. Check mono first — if the fundamental
disappears on fold-down the invention is unusable regardless of how good it sounds.
Prefer detune- or band-based width. See `masking.md` under `pedal-context-translation`.

---

## 2. Gap bloom

**Level → delay feedback or reverb decay, inversely.** The tail grows only where the
playing stops.

> "The spaces breathe. It fills in around me and gets out of the way when I play."

Solves the real problem that a reverb big enough to sound good in the gaps is too big
during the notes. This one is *both* novel and mix-correct: it is forward masking
avoidance built into the patch. See `masking.md`.

**Precedent:** ducking delay is common on vocals. Modulating decay rather than send
level is much less common, and sounds different — the tail changes character, not just
volume.

**Fails when:** the release is too fast, which chops the tail audibly. Use 200–500 ms and
asymmetric timing.

---

## 3. Texture expander

**Level → drive, positively.** Soft playing is clean; hard playing distorts.

> "It's clean until I lean on it, then it snarls. The pedal follows my hand."

Inverts the compressor relationship. Dynamics normally get *smaller* downstream; here
dynamic range becomes timbral range, so the performance controls texture rather than
just volume.

**Precedent:** this is roughly how an overdriven tube amp behaves, which is why it
sounds right immediately. Making it an explicit routing lets you exaggerate it far past
what a real amp does.

**Fails when:** the level rises with the drive, and then it wins the A/B on loudness
alone. Compensate gain across the range, then level-match.

---

## 4. Ring instead of open

**Level or transient → filter resonance, not cutoff.** Hard notes ring; soft notes stay
plain.

> "Accents chime. The harder ones have a voice."

Everyone modulates cutoff; almost nobody modulates Q. The result is pitched and vocal
rather than the familiar wah sweep.

**Fails when:** resonance approaches self-oscillation and a hard note screams. Cap the
range well below it — `pedal-graph-finishing` treats an uncapped high-Q range as an
audio risk, and doubly so when modulated. Check the endpoint against the 2–5 kHz
harshness band (`spectral-map.md` under `pedal-tone-shaping`).

---

## 5. Transient-gated room

**Derived transient-ness → reverb send.** Picked attacks get the room; sustained notes
stay dry.

> "Every pick has a room around it, but the held notes stay right in front of you."

Backwards from normal (tails usually get the reverb), and it works because the ear
localizes on the attack. You get audible space without the tail wash that buries the
next note.

**Build:** fast envelope − slow envelope, the differential approach. Level-independent, so it behaves consistently across a dynamic phrase — which
a plain envelope follower will not.

---

## 6. Play-brightness width

**Derived brightness-ness → detune amount or spread.** Brighter playing spreads the
stack; darker playing collapses it to mono.

> "Dig in near the bridge and it goes huge. Play back by the neck and it's tight."

Pairs two attributes that have no natural relationship, so it feels like an instrument
rather than a processor, and it responds to picking position — an input you do not
normally get to use.

**Build:** band envelope − full envelope. Three nodes.

---

## 7. Velocity-shaped envelope

**Note velocity → the amplitude envelope's own attack time, inversely.** Soft notes
swell; hard notes snap.

> "Ghost notes sigh in, accents hit. It plays like a bowed thing when I'm gentle."

Velocity almost always goes to amplitude or cutoff. Routing it to the envelope's *own
shape* is second-order and rare, and it does what real instruments do: articulation
changes with force, not just loudness.

**Fails when:** the slow attack makes soft notes late in a fast phrase. Test the real
phrase (`pedal-phrase-performance`), never a held note.

---

## 8. Dirty room, clean note

**Position change: drive *after* the reverb.** The tail saturates; the attack stays
clean.

> "The note is clear but the room behind it is wrecked."

Free — no new nodes, just order. Sounds nothing like drive → reverb, which dirties the
note and puts it in a clean room. One of the highest yield-to-effort moves available.

**Fails when:** the drive lifts the tail's level enough to mask the next note. Watch
crest factor (`measurement.md` under `pedal-tone-shaping`).

---

## 9. Shimmer, and its near misses

**Position change: pitch shifter inside the feedback loop**, up an octave, with a long
decay.

> "It keeps climbing. Chords turn into a choir that never lands."

The canonical demonstration that position matters more than parts. A shifter *after* a
reverb is a pitch-shifted reverb and sounds ordinary. The same shifter *inside* the
feedback path transposes on every pass, so harmony ascends indefinitely.

**Precedent:** the classic ambient shimmer — pitch shifter and long-decay reverb in a
global feedback loop.

**Worth knowing:** feeding the shifter pre-reverb rather than into the feedback path
gives pitch-shifted delay loops that never resolve into shimmer — a different, less
famous, still useful sound. Pedal supports one feedback loop, so this competes with
delay feedback and comb structures. Choose deliberately.

---

## 10. Split-time architecture

**Position change: route attack and tail down separate paths.** Attack stays dry,
centered, focused. Tail gets width, space, and pitch movement.

> "It's right in your face and enormous at the same time."

The most reliable way to sound expensive, because it dissolves the clarity-versus-size
tradeoff instead of picking a side. Also mono-safe if you keep the attack path centered:
the part that carries the note never gets the phase treatment.

**Fails when:** the crossover between paths is audible as a swell or a gap. Overlap the
two envelopes rather than switching between them.

---

## 11. Self-modulating space

**Wet-path level → reverb size or delay time.** The effect's own output steers the
effect.

> "It never repeats. It keeps finding a slightly different room."

Second-order and self-referential: the movement itself changes, so it never reads as a
cycling LFO. Feels alive in a way blind modulation cannot.

**Fails when:** it runs away or hunts audibly. Cap the target range tightly, lag the
detector heavily (500 ms+), and check stability at maximum input before shipping.
Modulated delay time also pitch-shifts — that may be the point, but know it is happening.

---

## 12. Rhythmic side-ducking

**External rhythmic source → the side channel only.** A kick or a silent trigger ducks
the stereo extremes while the center is untouched.

> "It pulses at the edges. The middle stays completely still."

Groove that lives entirely in the image rather than in level. The center's stability is
what makes it feel like movement instead of pumping.

**Precedent:** an established mid/side technique — sidechain a side-only compressor
from something rhythmic for undulation at the stereo extremes.

**Fails when:** there is no side content to duck (a mono or near-mono source), in which
case nothing happens and you will hear that as the invention failing rather than as an
absent precondition. Confirm the source is genuinely stereo first.

---

## Reading the catalog

Three properties recur in every entry that works, and they are worth more than the
entries themselves:

1. **It pairs two attributes with no natural relationship.** Level with width. Brightness
   with spread. That coupling is what makes a sound seem to have intent.
2. **The story sentence is about playing, not about signal.** If you cannot write it
   without node names, the construction has no perceptual identity.
3. **It is one mechanism.** Every entry is a single change against an otherwise
   conventional patch. None of them stack.

Entries 5, 6 and 7 are the ones least likely to exist in any product, because they need
a derived detector or a second-order target. Start there when the brief explicitly asks
for something nobody has heard.
