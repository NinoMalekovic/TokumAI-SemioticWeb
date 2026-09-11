# ADR 0003: Separate Agent Review from Canonical CI

- Status: Accepted
- Date: 2026-09-11

## Context

The project uses AI-assisted development and requires automated review capabilities in addition to ordinary repository validation.

Combining agent review with the canonical CI job would couple two different responsibilities and make failures harder to diagnose.

## Decision

Use a dedicated GitHub Actions workflow:

.github/workflows/agent-review.yml

The workflow runs on relevant pull request events and currently performs deterministic repository validation.

The workflow uses read-only permissions:

- contents: read
- pull-requests: read

The workflow must not receive write access unless a future decision explicitly requires it.

## Consequences

- Agent review has an independent status check.
- CI remains deterministic and independent of agent tooling.
- Permissions remain minimal.
- The workflow can later be extended with an actual LLM/agent reviewer without redesigning the CI pipeline.
