# Agent Development Workflow

## Branches

Agents work on isolated branches.

The normal integration target is `main`.

## Before Making Changes

Agents should inspect:

1. `AGENTS.md`
2. repository status
3. recent commits
4. relevant documentation
5. existing CI and workflow configuration

## Validation

Before proposing integration, run the repository's standard validation:

pnpm check

Changes affecting GitHub Actions should also be checked with:

git diff --check

## Pull Requests

Changes should be submitted through a pull request rather than directly modifying protected `main`.

The canonical protected check is:

`CI / build`

The separate agent review workflow is:

`Agent Review / review`

## Documentation

Durable architectural or workflow decisions should be recorded as ADRs under `docs/decisions/`.

Do not use ADRs for temporary debugging notes or transient agent context.
