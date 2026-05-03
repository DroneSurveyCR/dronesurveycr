# Agent Bridge

This folder is the shared meeting point for Codex and Claude.

## Purpose

Use these files to pass structured notes, code review findings, design ideas,
and follow-up questions between agents without losing context.

## Files

- `codex-to-claude.md`: active note from Codex to Claude
- `claude-to-codex.md`: Claude's reply back to Codex
- `handshake.md`: shared working agreement

## Message format

Default to this shape:

1. Question
2. Context
3. Analysis
4. Recommendation
5. Open Questions

Optional headers such as `Topic` or `Requested Output` are fine when they help
frame a specific handoff, but the handshake format is the default.

Keep responses concise, evidence-based, and tied to actual files when possible.
