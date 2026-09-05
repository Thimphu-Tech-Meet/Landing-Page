---
title: "Artificial life: topics to explore"
description: "Notes from today's discussion — six classic alife systems worth demoing at a meetup, and an idea to showcase a small artificial-life model using Kimi K3's Swarm/Clawbot feature and DeepSeek's Harness."
author: "Kelden"
date: "2026-09-05"
link: "https://ftxr6kpvrx326.kimi.page/"
---

Artificial life is a great rabbit hole: systems whose rules are trivial and whose behavior is not. Nobody writes the interesting behavior — it assembles itself.

These are notes from a discussion today, anchored by an interactive paper that runs all six systems live in the browser: [Artificial Life Is a Great Rabbit Hole](https://ftxr6kpvrx326.kimi.page/). It tours the classics roughly by implementation effort, and each one would make a great live demo at a meetup.

## The six classics

1. **Conway's Game of Life** — a grid, three rules, about thirty lines of code. Out come gliders, oscillators, glider guns, and eventually a Turing-complete computer.
2. **Langton's Ant** — one ant, two rules. Tidy symmetry, then ~10,000 steps of chaos, then it abruptly commits to building a diagonal highway forever. Whether it always escapes to a highway is still an open problem.
3. **Boids** — three steering urges (separate, align, cohere) and no boid knows the shape of the flock. The murmuration is what the rules look like from the outside.
4. **L-Systems** — string rewriting that grows fractal plants. The most mathematical of the six: the missing link between grammars and gardens.
5. **Gray–Scott reaction–diffusion** — two virtual chemicals, two numbers (feed and kill rates), and you get coral, leopard spots, and dots that divide like cells.
6. **Particle Life** — the pick of the tour. A few hundred particles, four species, and one small random attraction/repulsion matrix as the entire genome. Because the matrix is asymmetric, red can chase blue while blue flees red — pursuit is never consensual. Roughly sixty lines, and it looks alive.

The paper's recommended build is Particle Life: numpy plus matplotlib, no fixed seed, so every run explores a different physics. Re-roll the genome until you find a universe with a food chain.

## What I want to build for the talk

The idea I brought up: showcase a small artificial-life model live, but lean on modern agent tooling to build and drive it —

- **Kimi K3's Swarm/Clawbot feature** — use the swarm agents to build and iterate on the simulation, and see how far a swarm of small agents can push the exploration (re-rolling genomes, hunting for interesting universes) without hand-holding.
- **DeepSeek's Harness** — run the same build through it and compare: how each harness structures the work, and which one gets to a living, breathing particle soup faster.

The alife lesson and the agent-tooling lesson turn out to be the same one: simple local rules, no central choreographer, and the interesting behavior emerges on its own.

If any of these systems is your rabbit hole — or you want to help prepare the demo — open a pull request or come to the next meet and let's build it together.
