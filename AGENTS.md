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

## Rules
- Prefer existing abstractions.
- Don't introduce dependencies without justification.
- Never commit secrets.
