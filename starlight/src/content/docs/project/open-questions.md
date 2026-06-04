---
title: Open questions
description: The next decisions to make.
sidebar:
  order: 3
---

These are the unresolved decisions that should be settled by prototypes,
measurement, or focused review.

1. **llama-server vs Ollama:** `llama-server` for portability, but offer
   Ollama's comfort as an optional mode?
2. **Confidence routing:** which concrete [dissent measure](/council/bias-and-confidence/)
   should (later) trigger an online escalation without undermining privacy?
3. **VLM engine:** llama.cpp multimodal vs a dedicated vision binary; weigh the
   [integration cost](/project/roadmap/).
4. **Eval sets:** which tasks most convincingly prove "Council > Single" (code
   review, decision memo, document triage)? See [evals](/evals/overview/).
5. **Browser inference:** is in-browser WebGPU a useful **fallback seat** for
   hosts that can't run the native engine, or a distraction? See
   [explorations](/architecture/explorations/).
6. **Phone transport:** should **USB-gadget Ethernet** become the recommended
   Phone Access transport, ahead of LAN-IP binding?
7. **Appliance form factor:** does a self-hosting board belong on the roadmap, or
   does it become a *second product* that dilutes "software you copy onto a stick"?
