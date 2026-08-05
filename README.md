# OKF Agent Skills

Portable Agent Skills for working with Open Knowledge Format bundles through the native [`okf` CLI](https://github.com/open-knowledge-stack/okf-cli) or the [`okf-mcp`](https://github.com/open-knowledge-stack/okf-mcp) server.

## Install

```bash
npx skills add open-knowledge-stack/okf-skills --list
npx skills add open-knowledge-stack/okf-skills --skill okf
```

For CLI use:

```bash
npm install --global @open-knowledge-stack/okf
```

## Catalog

| Skill | Purpose |
| --- | --- |
| [`okf`](skills/okf/SKILL.md) | Discover, inspect, search, create, edit, migrate, and validate OKF bundles through the CLI or MCP server. |

## Development

```bash
npm ci
npm run check
bash -n skills/okf/scripts/okf-health.sh
```

Development happens on `develop`. Stable skill sets are promoted to `main`.

## Status

This is a community-maintained Open Knowledge Stack project. The current instructions describe the alpha SDK, CLI, and MCP behavior and do not claim to define a universal OKF standard.

## License

Apache License 2.0. See [LICENSE](LICENSE).
