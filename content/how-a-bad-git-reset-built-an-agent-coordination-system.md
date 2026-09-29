---
title: "How a Bad git reset Built an Agent Coordination System"
description: "A lost four days of work sparked Steward, a coordination system for sharing context, tasks, and file locks across a fleet of AI agents."
author: "Nahar Emet"
github: "NaharEmet"
date: "2026-09-29"
tags: ["Agents", "Infra"]
---

One fateful evening, while vibe coding a project by the name of Wopps, which would never see the light of day, one of my agents had the bright idea to `git reset` to solve a transient issue it faced. This would have been a non-issue had I informed my agents to commit after finishing a task. Unfortunately, this was the `git reset` that made me add that instruction to all future `AGENTS.md` files, and in the blink of an eye, four days of handcrafted vibes disappeared into the digital oblivion of `/dev/null`.

This `git reset`, which set me back four days of work, gave me an opportunity: I knew what had to be built, and my agents were the bottleneck. Back then, and to this day, I'm one of those weirdos who like to watch their agents work. Partially because I have trust issues, and in large part because I use much cheaper and faster Chinese models. The fateful agent that caused this article to exist was an emotionally and neurologically unstable Mimo v2.5 Flash.

After about thirty minutes of depression and thinking about sleep—it was 4 a.m., and both my agents and I were near our context limits—I started telling my agents to rebuild what they had deleted. This time, I was able to graduate from managing two or three agents to four to six in parallel. This, like all changes in tech, resulted in a new issue: the agents started stumbling over each other.

You may ask, like most sane, rational people, "Why not just use worktrees?"

This is a very rational workflow that I don't use much to this day, for two reasons. Firstly, I'm building in Elixir, which means my code hot reloads, both front and backend.

I build and test constantly. Secondly, worktrees mean you end up with very large, messy merges that agents don't always handle gracefully. These constraints resulted in me starting to build a system for my agents to lock files and notify other agents where they are working. This worked surprisingly well. Whenever an agent went to a file, it would lock it before writing. If another agent wanted to go there, its request to lock the file would be rejected, and it would know that another agent was working there.

![The cycle of life of an agent using Steward](/images/steward-agent-lifecycle.png)

![An agent using Steward to get information for this article](/images/steward-agent-context.png)

Here you can see my agent doing three steps:

1. **Create work:** the agent becomes visible to the rest of the fleet.
2. **Retrieve skill:** it gets procedural knowledge rather than reinventing the process.
3. **Retrieve memories:** it gets project-specific historical context.

As my agents continued building, another realisation dawned on me. I was using MCP tools for my agents, and the flow of a request looked like this:

![The request flow through Steward](/images/steward-mcp-context-flow.png)

This is where Steward changed from a traffic cone into a coordination system. The tool call wasn't merely something Steward needed to answer with a yes or no. It was an opportunity to talk with the agent. Steward knew exactly what file the agent was about to edit and could give it warnings, instructions, and context from its forefathers.

Returning `{ok}` from an application is a wasted opportunity. The agent is telling my app what it's going to do. There are very few chances to interact with an agent's context from outside while it's working, and here was an opportunity to return context to the agent alongside the yes, squandered with only an HTTP 200. Opportunities to shape context are rare and far between, and usually at the agent's discretion. Here, I could send high-quality, fresh context to my agents proactively when they went to a file, giving them relevant context right at the top of the context window. Unlike normal memory systems, Steward doesn't have to wait for the agent to realise it needs context and ask for it; the agent's actions themselves create the openings to push the right context.

This has resulted in a system with thousands of memories and agent-based memory quality control. An LLM grades memories and filters out the noise. There is an up-to-date context, skill, and spec store, plus a system for wrapping an API surface in MCP tools so that agents working on these applications can call the applications' APIs, get application logs, and use many other features.

There are things I use less nowadays, such as the API wrappers and getting the logs, since I've found other tools that solve these problems for me. But I've yet to find a better system to replace Steward for memories, task tracking, and file locking. It's a system that's saved me billions of tokens wasted on my agents getting confused, wandering around, and figuring out how the CI/CD works for the hundredth time. It allows me to manage a fleet of 12+ agents, with an agent satisfaction rating of **95.6%**.

What in the hallucination is an agent satisfaction rating? Again, by using the MCP response to give agents guidance about which tools to use, Steward sends the agents surveys to fill out at the end of a task, like a good corporate cruise.

One of the realisations that changed how I built Steward was thinking of the agents it served as clients and sending them surveys to submit feedback, issues, and feature requests.

This, plus the Meta Harness approach, means gathering an ungodly amount of telemetry from the application, feeding it every hour into a poor, unsuspecting Chinese LLM to distill, then taking the distillations and giving them to an expensive American worker to act as if they discovered the insights. These insights are turned into Steward to-dos that are then taken up by cheap models to implement, and the loop continues.

Steward, which originated from the neurotic misbehaviour of an agent that belongs in `/dev/null`, has become my most-used application and a primitive I build around whenever I need to give a team of agents shared context and tools to work together.

![Steward agent coordination](/images/steward-agent-coordination.png)

[More about Nahar Emet](https://naharemet.com) · [GitHub](https://github.com/NaharEmet)
