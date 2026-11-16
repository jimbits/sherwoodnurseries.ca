---
name: token-feedback
description: Review the user's prompts and token usage in this session. Use when the user asks for "token feedback", "token usage feedback", "token optimization feedback", "prompt feedback", or "evaluate my prompts".
---

# Token and prompt feedback

When triggered, review this session and report concisely. Tie every point to a specific prompt or moment in the session.

## Prompt evaluation
1. Rate overall prompt quality (1-10).
2. Style: clarity, specificity, context given, scope.
3. What worked well (cite specific prompts).
4. What to improve, with a rewritten example of the weakest prompt.

## Token usage
1. Biggest context consumers (large file reads, long outputs, repeated work, tool calls).
2. Vague prompts that caused extra back-and-forth.

## Token optimization
1. Top 3 leaner approaches for next time.
2. When /clear or /compact would have helped.

## Feature suggestions
1. Suggest at most 2 Claude Code features that would have helped in this session (e.g. skills, plugins, subagents, hooks, plan mode, /compact, /clear, MCP servers).
2. Only suggest a feature if you can point to a specific moment in this session where it would have saved tokens or steps.
3. For each: what it is (1 line), where it would have helped (1 line), first step to try it (1 line).
4. If unsure a feature exists or how it works, check the Claude Code docs before recommending. Do not guess.
5. Do not explain further unless the user asks.

## Format
1. Keep the report under 40 lines. Use numbered lists.
2. End with exactly this line:

Pick a number to learn more, `q` to ask a question.
