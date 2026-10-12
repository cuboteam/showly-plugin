# Showly

Preview, publish, and manage websites hosted on [Showly](https://showly.ai) from your AI agent.

Showly hosts the sites your agent builds. A site keeps its version history, serves
from one stable `<name>.showly.site` address, and can take a custom domain. A new
build does not replace what is published until you say so, and access defaults to
anyone with the link — password or organization-only protection is there when you
ask for it. This repository is the plugin that connects an agent to it — manifests
and reusable hosting, report, design and copy skills, no backend code and no credentials.

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

| You say                      | What happens                                                  |
| ---------------------------- | ------------------------------------------------------------- |
| list my sites                | reads your workspace, no writes                               |
| what changed since yesterday | version history and a diff between versions                   |
| update the pricing page      | reads the current files, stages a patch, builds a new version |
| share it with my team        | a link to that version, password-protected only if you ask    |
| put it online                | a two-step publish that requires your explicit confirmation   |
| undo that                    | rollback to an earlier version                                |
| use my own domain            | adds a custom domain and walks through DNS verification       |

Publishing is deliberately two-step: the first call returns a summary and changes
nothing, and only a second call carrying that summary's token publishes. What it
decides is which version the site's stable address serves — not whether the site
is reachable, which is what the access setting controls.

## Visual reports

The bundled `showly-reports` skill turns Markdown drafts into visual HTML reports,
with diagrams, tables, themes and light/dark mode. Ask: “Compare these options in
a visual report and give me a Showly share link.” A local shell and Node.js 20+
are required for rendering; connecting remote MCP alone does not run the renderer.
Reports stay local unless sharing is requested. Shared reports use Showly's
existing access, version and publishing controls.

The pinned renderer is based on Answer me with HTML. No separate install is
needed; updates come through Showly. This integration supports static reports and
section edits, with video and voice outside its scope. See the
[report skill](skills/showly-reports/SKILL.md) and
[third-party licenses](skills/showly-reports/THIRD_PARTY_LICENSES.txt).

## Design and copy editing

Ask “Polish this page while keeping its branding” to use `showly-design`, or
“Make this Chinese or English copy sound more natural” to use `showly-copy`.
The design skill also guides new website layouts; the copy skill edits existing
prose while preserving facts, qualifications and the author's voice. References
load by task and language. These are compact, locally adapted instructions from
Impeccable and Humanizer, not the complete upstream tool suites.

Both skills work through the agent's existing tools, without extra engines,
hooks or runtime downloads. Skill selection depends on the host agent. A remote
MCP connection alone does not install these local skills. Editing alone does not
upload or publish content; requested sharing follows the hosting workflow.

See the [design skill](skills/showly-design/SKILL.md),
[copy skill](skills/showly-copy/SKILL.md), and their
[design notices](skills/showly-design/THIRD_PARTY_LICENSES.txt) and
[copy notices](skills/showly-copy/THIRD_PARTY_LICENSES.txt).

## Other agents

The same endpoint serves every MCP client. This repository also carries the
manifests those hosts expect:

| Host             | File                                                  |
| ---------------- | ----------------------------------------------------- |
| Claude Code      | `.claude-plugin/plugin.json`                          |
| Codex            | `.codex-plugin/plugin.json`                           |
| Cursor           | `plugin.json`, `mcp.json`                             |
| Gemini CLI       | `gemini-extension.json`                               |
| OpenClaw         | `.claude-plugin/plugin.json`, `.mcp.json`             |
| DeepSeek Harness | `package.json`, `cordis.patch.yml`                    |
| Hermes Agent     | `hermes/plugin.json`, `hermes/mcp.json`               |
| Any MCP client   | `server.json`, or point it at `https://mcp.showly.ai` |

### OpenClaw

OpenClaw reads this tree as a Claude bundle because `.claude-plugin/` is present, so it uses `.mcp.json` rather than a separate OpenClaw manifest. `.mcp.json` says `type: "http"`; OpenClaw treats that as its `streamable-http` alias, so the same file Claude and Cursor install is the one OpenClaw connects with. Do not rewrite it to `transport: streamable-http`.

```bash
openclaw plugins install ./showly-plugin
```

Sign-in is separate from the bundle. `npx @showly/mcp-server login --to openclaw` writes the token into `~/.openclaw/openclaw.json`, then run `openclaw mcp reload`.

### DeepSeek Harness

`package.json` declares a DSH bundle whose patch inserts the official MCP client pointed at `https://mcp.showly.ai`. The patch carries no credential. DSH has no Showly login command; the endpoint is the same OAuth-protected server every other host uses, and the client must obtain a token itself.

From the directory that contains this checkout:

```bash
dsh plugin --profile <name> add ./showly-plugin
```

Or, once this repository is the copy you want:

```bash
dsh plugin --profile <name> add github:cuboteam/showly-plugin
```

Nothing is enabled until that profile installs it.

### Hermes Agent

Hermes portable plugins need `type: streamable-http` and their own `plugin.json`. Cursor already owns the repository root for both of those files, so the Hermes plugin is the `hermes/` directory. It bundles the same skills. `hermes/mcp.json` has no credential.

```bash
hermes plugins install ./showly-plugin/hermes --force
hermes plugins enable showly
```

Sign-in is `npx @showly/mcp-server login --to hermes`, which writes `~/.hermes/config.yaml`. Restart Hermes afterwards. A community-catalog pin needs the mirror commit that exists only after a release, so it is not part of this repository.

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

MIT — see [LICENSE](LICENSE). That covers the manifests and Showly's skills in this
repository, and the `@showly/mcp-server` package on npm from 0.5.0 onward,
except third-party and derived material under its stated licenses. The design
skill is Apache-2.0; see its bundled notices. The
Showly service itself is governed by the terms linked above.
