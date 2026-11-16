---
name: feature-discovery
description: List built-in features, plugins, connectors and skills that would help with a task or project. Use when the user says "feature discovery", "what tools can help with", or "are there built-in features for".
---

# Feature discovery

Tell the user which Claude features would help. Advise only; do not start the task or change any files.

## Pick the mode
1. **Task mode:** the user named a task (e.g. "list tools to create a painting calculator form UI"). Recommend features for that task.
2. **Audit mode:** no task given. Review the project setup and list what the user is not using.

## Rules for both modes
1. Check what is already available first: installed skills, plugins, connectors / MCP servers, CLAUDE.md, the `.claude/` folder. Keep file reads minimal.
2. Recommend only features you can confirm exist. If unsure how a feature works or whether it is available, check the docs. Do not guess.
3. Every recommendation must name the specific part of the task or project it helps. No generic tips.
4. Keep the report under 30 lines. Use numbered lists.
5. Assume a full stack developer who is new to Claude features beyond skills.

## Task mode
1. Restate the task in 1 line. If it is too vague to recommend for, ask 1-2 questions and stop.
2. List at most 5 features, best fit first, drawn from:
   - Design: Claude Design, design-related skills, Figma workflows
   - Extensions: skills, plugins, hooks
   - Services: connectors / MCP servers (e.g. Figma, Firebase, Cloudflare, GitHub)
   - Workflow: plan mode, subagents, /clear, /compact
3. For each feature give:
   - What it is (1 line)
   - Which part of this task it helps (1 line)
   - Status: ready to use, or needs setup
   - First step (1 line)
4. Finish with a suggested order: which feature to use at which stage of the task.
5. If no feature beats a plain prompt, say so.

## Audit mode
1. List what is set up now (1 line per category: skills, plugins, connectors, CLAUDE.md, hooks).
2. List at most 5 gaps, biggest benefit first. For each: the feature (1 line), what it would improve in this project (1 line), first step (1 line).
3. Skip anything the project does not need.

## Close
End with exactly this line:

Pick a number to learn more, `y` for the next step, `q` to ask a question.

## Follow-ups
1. If the user picks a number, explain only that feature in 2-4 lines per point, including how to set it up, then repeat the closing line.
2. Do not start the task unless the user explicitly asks.
