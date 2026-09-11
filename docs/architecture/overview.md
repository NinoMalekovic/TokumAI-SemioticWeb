# Architecture Overview

## Purpose

TokumAi-SemioticWeb is a TypeScript monorepo intended to support the Semiotic Web project and its agent-assisted development workflow.

## Repository Structure

- `apps/` — application-level packages and services.
- `packages/` — reusable workspace packages.
- `packages/core/` — core TypeScript functionality.
- `docs/` — persistent project documentation and architectural decisions.
- `infrastructure/` — infrastructure and deployment configuration.
- `.github/workflows/` — GitHub Actions automation.

## Development Model

Development is performed through isolated Git branches/worktrees and validated through automated checks.

The repository uses GitHub Actions for CI and automated agent review.

## Quality Gates

The canonical CI workflow is:

`CI / build`

The CI workflow runs the repository's `pnpm check` validation.

Agent review is implemented separately so that agent-specific automation does not replace the canonical CI quality gate.

## Documentation

Architectural decisions are recorded as ADRs under `docs/decisions/`.

Agent-specific development conventions are documented in `AGENTS.md` and `docs/development/agent-workflow.md`.
