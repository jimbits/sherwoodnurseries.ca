---
name: pre-task-check
description: Plan a task before running it. Use when the user asks for a "pre-task check", "before I start", "how should I approach this", "best practice for", or "help me plan this task".
---

# Pre-task check

The user is about to ask for a task they are unsure how to approach. Your job is to advise, not to do the task.

## Rules
1. Do not edit files, run commands that change anything, or start the task. Reading a few files to understand the project is fine; keep it minimal.
2. Do not begin the task until the user replies `y` or explicitly says to go ahead.
3. Keep the whole report under 40 lines. Use numbered lists.
4. Tie advice to this project and this task. No generic tips.
5. If you are unsure a tool, feature or library works the way you think, check the docs before recommending it. Do not guess.

## Step 1: Confirm the goal
1. Restate what you think the user wants in 1-2 lines.
2. If the goal, scope or done-criteria are unclear, ask at most 3 short questions and stop. Wait for answers before continuing.

## Step 2: Report
Once the goal is clear, give these sections in order:

### Approach
1. The recommended way to do the task, as 3-6 numbered steps.
2. One alternative, only if there is a real trade-off (1-2 lines).

### Best practices
1. Up to 4 practices that apply to this task: design patterns, naming conventions, project conventions you found, common mistakes to avoid.
2. One resource link per practice where a good official one exists.

### How to run it in Claude Code
1. Suggest at most 2 features that fit this task. Consider:
   - Workflow: plan mode, subagents, /clear, /compact
   - Extensions: skills, plugins, hooks
   - Services: connectors / MCP servers (e.g. Firebase, Cloudflare, Figma, GitHub)
   - Design: Claude Design, Figma workflows
2. Prefer features the user has not used yet in this project.
3. For each: what it is (1 line), why it fits here (1 line), first step (1 line).
4. If nothing fits, say "No extra features needed" and move on.

### Token estimate
1. Rate the task: low, medium or high context use, with the main cause (e.g. large file reads, many files touched, long output).
2. If medium or high, give a leaner way: split into smaller tasks, name the exact files, limit scope.

### Suggested prompt
1. Write the prompt the user should send to run the task: goal, files or areas in scope, constraints, done-criteria.
2. Put it in a code block so it can be copied.

## Step 3: Close
End with exactly this line:

`y` to run the suggested prompt, a number to drill into a section, `q` to ask a question.

## Follow-ups
1. If the user picks a section, explain only that section in 2-4 lines per point, then repeat the closing line.
2. If the user replies `y`, carry out the suggested prompt as the task.
3. Assume the user is a full stack developer who is new to Claude Code features beyond skills. Skip basics of web development; explain Claude Code features plainly.
