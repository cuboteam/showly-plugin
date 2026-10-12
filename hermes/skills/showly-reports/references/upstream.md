# Renderer provenance and updates

The unmodified `scripts/vendor/am.mjs` is bundled from
[Answer me with HTML](https://github.com/QingYunA/answer-me-with-html), version
0.4.14, commit `e729b248816c0c420531ee61be0d1aac6b197220`.
`scripts/vendor/upstream.json` records its SHA-256 and bundled dependency versions.
`THIRD_PARTY_LICENSES.txt` retains the upstream MIT notice and licenses for marked,
dagre and graphlib. Showly's Skill instructions and wrapper adapt this renderer
for local reports and Showly hosting.

The upstream bundle includes additional commands, but Showly's `scripts/report.mjs`
entrypoint exposes only static rendering, patching, linting and syntax help. It
requires Node.js 20+, uses temporary upstream configuration, suppresses browser
opening and update checks, and leaves an existing upstream installation alone.
No per-user npm install is needed. This is local code execution, not a remote MCP
rendering tool.

To update, maintainers should check out an explicit upstream commit, copy that
commit's generated bundle byte-for-byte, review its dependency lockfile and
refresh the third-party notices and `upstream.json`. Review upstream changes to
file access, networking, embedded source and output behavior. Run the package's
tests, including installed-skill rendering and patching, then check a packed npm
artifact includes both skills, the wrapper, the renderer and licenses. Release
through Showly's existing package release process; never self-update the vendor
file in a user's installed skill directory.
