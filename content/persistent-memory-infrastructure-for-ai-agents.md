---
title: "Persistent Memory Infrastructure for AI Agents"
description: "Persisting memories across all the agents."
author: "Tashi Norbu"
github: "MasterScientist22"
date: "2026-09-12"
tags: ["Agents", "Infra"]
---

## Project Overview

This project provides a **persistent memory infrastructure for AI coding agents**, allowing context and knowledge to remain available when switching between agents such as **Claude Code** and **OpenCode**.

> **Agents can change, but project context and knowledge remains persistent.**

---

## Architecture

```text
                         Developer
                             │
                             ▼
                    ┌─────────────────┐
                    │   Agent Code    │
                    │                 │
                    │ Claude Code     │
                    │ OpenCode        │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │      TDAI       │
                    │ TencentDB Agent │
                    │     Memory      │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    OmniRoute    │
                    │   LLM Provider  │
                    └─────────────────┘
```

The infrastructure is accessed remotely through **Tailscale VPN**.

---

## Core Components

| Component                         | Purpose                                    |
| --------------------------------- | ------------------------------------------ |
| **Claude Code / OpenCode**        | AI coding agents                           |
| **TDAI (TencentDB Agent Memory)** | Persistent memory and context management   |
| **OmniRoute**                     | Centralized LLM provider and routing layer |
| **Tailscale**                     | Secure remote access                       |

---

## Cross-Agent Persistent Memory

TDAI provides a shared memory layer between different AI agents.

For example:

```text
Developer
    │
    ▼
OpenCode
    │
    ▼
TDAI
    │
    ▼
Persistent Memory
    │
    ▼
Claude Code
    │
    ▼
TDAI
    │
    ▼
Previous Context
```

This allows the developer to switch between:

```text
OpenCode → Claude Code → OpenCode
```

while maintaining shared project knowledge.

---

## LLM Routing

TDAI uses **OmniRoute** as its LLM provider.

```text
TDAI
 │
 ▼
OmniRoute
 │
 └── LLM Providers
```

OmniRoute provides a centralized interface for connecting TDAI with different LLM services.

---

## Remote Access

The infrastructure can run on a separate server and be accessed through **Tailscale VPN**.

```text
Developer PC
     │
     │ Tailscale VPN
     ▼
AI Infrastructure
     │
     ├── TDAI
     └── OmniRoute
```

---

## Primary Goal

The system creates a **persistent shared-memory layer for AI coding agents**.

### Core Principles

* **Persistent memory** — context survives individual agent sessions.
* **Cross-agent continuity** — different agents can access shared project knowledge.
* **LLM flexibility** — OmniRoute provides the LLM interface for TDAI.
* **Remote infrastructure** — TDAI and OmniRoute can operate independently from the developer's machine.

> **Agents and models can change, but the project's accumulated knowledge remains persistent.**
