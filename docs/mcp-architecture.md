# MCP / Tooling Architecture

This document covers agent-assisted development tooling only. It defines no protocol
behaviour and has no authority over CTI, Semantic Zero, RDF, or ledger design.

## Policy

Add a tool only when it provides a capability that built-in tools lack, or reaches an
existing capability with lower privilege. The repository has no shared MCP server. GitHub
MCP is optional, credential-bearing developer tooling and is configured locally by a
developer who chooses to use it.

## Optional local GitHub MCP

The GitHub MCP server provides structured, read-only GitHub access without using the
existing `gh` CLI credential. Configure it with Claude Code's **local** scope so the entry
is stored for the current worktree in the developer's untracked Claude configuration. Run
the following only after supplying a dedicated token in the shell that starts Claude Code:

```sh
export GITHUB_MCP_PAT=...

claude mcp add --transport stdio --scope local \
  --env 'GITHUB_PERSONAL_ACCESS_TOKEN=${GITHUB_MCP_PAT}' github -- \
  docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN \
  ghcr.io/github/github-mcp-server@sha256:0ba840c46a237879c8300e7fddb0b6347f20e029ccb9cbe2ce4a943daa1ff560 \
  stdio --read-only --lockdown-mode --toolsets context,repos,issues,pull_requests
```

The single quotes preserve the `${GITHUB_MCP_PAT}` reference for Claude Code to expand at
server start; they do not store a token in the command. Use `--scope user` only when the
same local configuration is deliberately wanted across projects. Docker must be installed
and usable by the developer.

Use a dedicated fine-grained personal access token, limited to the selected repository and
the required read permissions: Metadata, Contents, Issues, and Pull requests. Do not reuse
the existing `gh` CLI credential: it has independently write-capable `repo` and `workflow`
scopes. No credential belongs in a tracked file.

The image is pinned by digest. This is an integrity control: it prevents a moved image tag
from silently changing the image bytes. `--read-only` is the GitHub MCP server's write-tool
restriction. `--lockdown-mode` is only a best-effort filter for untrusted public content and
prompt-injection risk; it is not an authorization boundary.

When Claude Code encounters an unresolved environment-variable reference, it may retain the
unexpanded value and report a configuration warning. Keeping this configuration local means
developers who do not opt in do not inherit a shared-project warning. A developer who adds
the local server should set `GITHUB_MCP_PAT` before starting Claude Code or disable/remove
that local server.

## Trust boundaries

The local Docker container receives the supplied PAT through
`GITHUB_PERSONAL_ACCESS_TOKEN`. It has default Docker networking; this configuration does
not restrict its egress, does not guarantee that it contacts only GitHub, and does not make
Docker a host-isolation boundary. The pinned image, Docker daemon, and the developer's
Docker-host policy are separate trust dependencies. No repository directory or Docker socket
is mounted by the documented command.

The repository commits `.claude/settings.json` as shared Claude Code harness guardrails.
`blockReadsOutsideWorkingDirectories` and its permission rules govern Claude Code file-tool
and tool-call behaviour; they are not OS-level isolation. Subprocesses, `git`, `gh`, and the
Docker daemon remain separate trust boundaries. In particular, these rules do not prevent
the existing `gh` credential from being used by `gh` or `git`.

The configuration does not add `additionalDirectories`, auto-approve project MCP servers,
or pre-allow MCP tools. Local MCP use remains subject to Claude Code's normal approval flow.

## Review triggers

Revisit this policy when the repository gains a browser-facing application, CI workflows, or
a selected storage layer. Evaluate any new tool for its incremental capability, credential
scope, and trust boundary before adding it.
