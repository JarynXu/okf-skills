# OKF CLI reference for Agents

Use global options before the subcommand:

```bash
okf --bundle "$BUNDLE" --output json <command>
```

| Intent | Command |
| --- | --- |
| Initialize | `okf --bundle "$BUNDLE" --output json init` |
| Validate | `okf --bundle "$BUNDLE" --output json validate` |
| Allow unresolved references | `okf --bundle "$BUNDLE" --output json validate --allow-unresolved` |
| Deny warnings | `okf --bundle "$BUNDLE" --output json validate --deny-warnings` |
| List documents | `okf --bundle "$BUNDLE" --output json list` |
| Filter by tags | `okf --bundle "$BUNDLE" --output json list --tag operations --tag runbook` |
| Read | `okf --bundle "$BUNDLE" --output json get "operations/deploy"` |
| Inspect | `okf --bundle "$BUNDLE" --output json inspect "operations/deploy"` |
| Search | `okf --bundle "$BUNDLE" --output json search "rollback procedure" --limit 8` |
| Graph summary | `okf --bundle "$BUNDLE" --output json graph` |
| Focus graph | `okf --bundle "$BUNDLE" --output json graph --id "operations/deploy"` |
| Graphviz DOT | `okf --bundle "$BUNDLE" graph --representation dot` |

IDs are canonical slash-separated identifiers. When frontmatter omits `id`, the parser derives it from the bundle-relative path without the Markdown suffix. A nested `index.md` maps to its directory ID. Aliases are accepted by read and inspection commands.

## Exit codes

- `0`: success.
- `1`: validation failed or warnings were denied.
- `2`: invalid CLI usage.
- `3`: operational failure such as I/O or unknown document.

Consume named JSON fields rather than human output or property order.
