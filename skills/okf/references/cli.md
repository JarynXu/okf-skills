# OKF CLI reference for Agents

Use global options before the subcommand. Core bundle operations select `--bundle`; Library operations use the persistent `--registry` (default `.okf/libraries.json`). Prefer `--output json` for Agent reasoning.

## Core bundle operations

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

## Library Runtime operations

```bash
okf --registry "$REGISTRY" --output json library <command>
```

| Intent | Command |
| --- | --- |
| Install local Library | `okf library add ./mcx --id mcx` |
| Install Git Library | `okf library add https://github.com/example/mcx-library.git --id mcx --ref main` |
| Update Library source | `okf library update mcx` |
| Mount | `okf library mount mcx` |
| Unmount | `okf library unmount mcx` |
| Uninstall | `okf library remove mcx` |
| List installed/mounted Libraries | `okf library list` |
| Global semantic catalog | `okf library catalog` |
| One Library catalog | `okf library catalog mcx` |
| Read canonical knowledge URI | `okf library read okf://mcx/interfaces/xcap` |
| Query all mounted Libraries | `okf library query "XCAP document selector" --limit 8` |
| Query one Library | `okf library query "XCAP document selector" --library mcx --limit 8` |

Do not treat `library add`, `mount`, and `remove` as synonyms. Do not manually modify the registry/cache to simulate lifecycle commands.

A canonical `okf://` URI identifies a logical node, not necessarily a physical file. A query result may come from lexical, semantic, graph, remote, or agent-backed retrieval. Preserve evidence URIs and provider/strategy metadata when they matter to the task.

## Core identifiers

Core OKF document IDs are canonical slash-separated identifiers. When frontmatter omits `id`, the parser derives it from the bundle-relative path without the Markdown suffix. A nested `index.md` maps to its directory ID. Aliases are accepted by read and inspection commands.

## Exit codes

- `0`: success.
- `1`: validation failed or warnings were denied.
- `2`: invalid CLI usage.
- `3`: operational failure such as I/O, provider/source failure, unknown document/Library, or invalid mount/query operation.

Consume named JSON fields rather than human output or property order.
