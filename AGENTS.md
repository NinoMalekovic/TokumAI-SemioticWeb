# AGENTS.md

## Project
This is a TypeScript monorepo using pnpm.

## Before changing code
- Read the relevant package documentation.
- Run existing tests.
- Don't modify generated files.

## After changing code
- Run pnpm lint
- Run pnpm typecheck
- Run relevant tests

## Architecture
- apps/ = applications
- packages/ = shared libraries
- infrastructure/ = deployment

## Tooling
- Agent tooling and its guardrails: docs/mcp-architecture.md
- Permission rules live in .claude/settings.json. They are Claude Code harness
  guardrails, not an OS-level security boundary.
- GitHub MCP is optional local developer tooling; its setup and credential requirements
  are documented in docs/mcp-architecture.md. No shared project MCP server is configured.
- The gh CLI credential is separate and remains write-capable.

## Rules
- Prefer existing abstractions.
- Don't introduce dependencies without justification.
- Never commit secrets.
