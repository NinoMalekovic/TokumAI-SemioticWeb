# ADR 0002: Protect Main with the Canonical CI Check

- Status: Accepted
- Date: 2026-09-11

## Context

The `main` branch is protected by a required GitHub status check.

The repository's canonical workflow is `.github/workflows/CI.yml`.

The protected status check is:

`CI / build`

## Decision

Keep `CI / build` as the canonical required status check.

The `build` job is responsible for running:

pnpm install --frozen-lockfile
pnpm check

Agent-specific automation must remain separate from the canonical CI job.

## Consequences

- Branch protection has a stable status-check contract.
- Agent automation cannot silently replace the primary CI gate.
- Repository validation remains deterministic and reproducible.
