---
name: pedal-producer-controls
description: Design a small, musical Pedal faceplate and automation surface for real producer gestures and safe exploration.
disable-model-invocation: true
---

# Producer controls

Use this when finishing a playable preset, exposing automation, or deciding which technical parameters deserve a faceplate control.

## Design from gestures

Start with actions a producer performs: add bite without harshness, pull body back, widen while staying mono-compatible, shorten a stab, lengthen a held note, add a small delay, or open a moving lead.

Prefer three to five hero controls with distinct jobs. Name them 'Bite', 'Body', 'Space', 'Width', or 'Decay', not 'cutoff_hz_2'. Ordinary bindable parameters already have automation lanes. Use a true multi-target macro only for a coherent relationship or custom curve.

## Safe implementation

Inspect bindable arguments and existing slots. Set baked rest values first. Unbind before reusing a slot. Bind only live graph parameters. Choose ranges around the proven value and avoid self-oscillation, runaway level, body loss, or abrupt movement. Name every module by purpose and title the patch specifically.

## Test the control

Move each control slowly and quickly with a held note, then with the real phrase. Test minimum, center, and maximum. Listen for clicks, level jumps, unstable resonance, loss of mono center, and new squelch. A useful control creates a predictable performance gesture across the target register. If it works only at one extreme, narrow its range or remove it.

## Range design

A macro's center should reproduce the authored preset. Its low and high positions should represent useful production moves, not the legal minimum and maximum of the DSP catalog. For example, a Bite macro can jointly raise a presence bell and slightly shorten a cab low-pass range, while keeping the settled formant peak below the known problem band.

Do not bind a control merely because it is available. A technical parameter belongs on the faceplate only when a producer can predict what moving it will do and recover from its extremes.

## Review checklist

Before handing off, verify:

- every label describes a musical action;
- no two controls create the same gesture;
- no macro causes a level jump;
- minimum, center, and maximum work on low and high notes;
- mono still carries the center;
- the phrase remains playable while the control moves;
- the faceplate names match the saved preset's actual graph.

## Related skills

- Gesture names come from the producer's own vocabulary: `pedal-producer-language`.
- Range endpoints must avoid the harshness band — `spectral-map.md` under
  `pedal-tone-shaping`; and must not break mono — `masking.md` under
  `pedal-context-translation`.
- Modulation depth semantics for a macro driving an LFO or envelope:
  `pedal-musical-motion`.
- Exposing an invented mechanism as one playable gesture:
  `pedal-novel-construction`.
- Dead macro wires, duplicate control names, and the faceplate warning:
  `pedal-graph-finishing`.
- Auditing the faceplate for controls that duplicate a gesture or bind nothing:
  `pedal-simplify-graph`.
- `list_tunable_args`, `bind_macro`, `graph_publish_port`, `set_faceplate`:
  `pedal-authoring`.
