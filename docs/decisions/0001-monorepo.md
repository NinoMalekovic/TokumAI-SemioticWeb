# ADR 0001: Use a TypeScript Monorepo

- Status: Accepted
- Date: 2026-09-11

## Context

The project contains reusable core functionality and is expected to grow into multiple applications, services, and infrastructure components.

A monorepo provides a single versioned repository for these related components while allowing workspace-level dependency management.

## Decision

Use a TypeScript monorepo with pnpm workspaces.

Reusable functionality belongs under `packages/`.

Applications and services belong under `apps/`.

## Consequences

- Shared code can be developed and versioned together.
- Workspace dependencies are explicit.
- CI can validate the repository as a single unit.
- The repository can grow without immediately requiring multiple repositories.
