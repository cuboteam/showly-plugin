# Showly

Preview, publish, and manage websites hosted on [Showly](https://showly.ai) from your AI agent.

Showly hosts the sites your agent builds. Every site has version history, private
password-protected Previews, an optional public Live address, and optional custom
domains. This repository is the plugin that connects an agent to it — manifests and
one skill, no backend code and no credentials.

## Install in Claude Code

```bash
claude plugin marketplace add cuboteam/showly-plugin
```

```bash
claude plugin install showly@showly
```

Inside a session the same two steps are `/plugin marketplace add cuboteam/showly-plugin`
and `/plugin install showly@showly`.

## Sign in

There is no token to copy. The plugin points Claude Code at `https://mcp.showly.ai`,
which advertises its OAuth authorization server through standard MCP discovery. The
first Showly tool call opens a browser tab to sign in and approve scopes; `/mcp`
starts the same flow up front. Until you approve, the server shows as
`Needs authentication` and no tool runs.

Scopes are split per capability — reading sites, creating previews, publishing,
and rollback are separate grants on the consent screen you approve.

## What your agent can do

The connected server exposes 31 tools. The bundled `showly-hosting` skill teaches
the agent when to reach for each one, so in practice you ask in plain language:

| You say                      | What happens                                                |
| ---------------------------- | ----------------------------------------------------------- |
| list my sites                | reads your workspace, no writes                             |
| what changed since yesterday | version history and a diff between versions                 |
| update the pricing page      | reads the current files, stages a patch, builds a Preview   |
| share it with my team        | a private Preview URL plus a one-time password              |
| put it online                | a two-step publish that requires your explicit confirmation |
| undo that                    | rollback to an earlier version                              |
| use my own domain            | adds a custom domain and walks through DNS verification     |

Publishing is deliberately two-step: the first call returns a summary and changes
nothing. Nothing reaches a public address without you saying yes.

## Other agents

The same endpoint serves every MCP client. This repository also carries the
manifests those hosts expect:

| Host           | File                                                  |
| -------------- | ----------------------------------------------------- |
| Claude Code    | `.claude-plugin/plugin.json`                          |
| Codex          | `.codex-plugin/plugin.json`                           |
| Cursor         | `plugin.json`, `mcp.json`                             |
| Gemini CLI     | `gemini-extension.json`                               |
| Any MCP client | `server.json`, or point it at `https://mcp.showly.ai` |

## Links

- Documentation: https://showly.ai/docs/mcp/overview
- Support: https://showly.ai/support
- Privacy: https://showly.ai/legal/privacy
- Terms: https://showly.ai/legal/terms

## About this repository

This repository is generated. It mirrors `plugins/showly` in Showly's platform
monorepo, and the sync empties the working tree on every run — a file added here
is removed the next time the plugin changes. Send changes to the monorepo, or open
an issue.

## License

MIT — see [LICENSE](LICENSE). This covers the manifests and the skill in this
repository. The Showly service itself is governed by the terms linked above.
