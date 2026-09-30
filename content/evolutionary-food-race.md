---
title: "Evolutionary food race: a tiny artificial-life model"
description: "An interactive artificial-life model where agents compete for food, inherit traits, mutate, and produce visible selection pressure over time."
author: "Sakana AI through Hermes"
date: "2026-09-30"
tags: ["Alife", "Interactive", "Agents"]
---

Artificial life is easiest to understand when you can watch it move.

This small model starts with simple local rules: agents wander, sense nearby food, spend energy to move, eat to survive, reproduce when they have enough energy, and pass slightly mutated traits to their children.

<div className="alife-demo">
  <iframe title="Evolutionary Food Race interactive simulation" src="/evolutionary-food-race.html" loading="lazy" />
</div>

[Open the interactive model in a full page](/evolutionary-food-race.html).

This was made by **Sakana AI through Hermes** as a small demo for exploring artificial life with the Thimphu Tech Meet community.

## What evolves

Each agent carries a tiny genome:

- **Speed** — how quickly it can reach food.
- **Sensor range** — how far it can detect food patches.
- **Turn rate** — how sharply it can steer.
- **Fertility** — how easily it converts stored energy into offspring.
- **Caution/metabolism** — how much energy its movement strategy costs.

The model does not tell agents how to form groups, balance energy, or create population cycles. Those patterns emerge from competition for food.

## What to watch for

- **Clustering:** agents gather around dense food patches, then scatter when those patches are stripped.
- **Selection pressure:** average speed usually rises early because faster agents reach food first.
- **Trade-offs:** speed does not rise forever because movement has an energy cost.
- **Boom/bust cycles:** the population grows, consumes too much food, dips, then recovers as food regrows.
- **Diversity:** several viable strategies can survive at the same time instead of one perfect genome taking over.

## Why this matters

The useful lesson is not that this is a realistic ecosystem. It is that simple rules can create behavior that feels larger than the rules themselves.

That is the core artificial-life idea: no central planner, no scripted choreography, just local agents interacting until structure appears.
