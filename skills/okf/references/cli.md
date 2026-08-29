# OKF CLI reference for Agents

Use global options before the subcommand. `--bundle` selects the ordinary bundle and `--registry` selects the Library registry (default `.okf/libraries.json`). Prefer `--output json` for Agent reasoning.

Mounted Libraries transparently extend the active OKF knowledge space. Do not switch to a separate Library retrieval command set.

## Knowledge operations

```bash
okf --bundle "$BUNDLE" --registry "$REGISTRY" --output json <command>
```

| Intent | Command |
| --- | --- |
| Initialize bundle | `okf --bundle "$BUNDLE" init` |
| Validate bundle | `okf --bundle "$BUNDLE" validate` |
| Allow unresolved references | `okf --bundle "$BUNDLE" validate --allow-unresolved` |
| Deny warnings | `okf --bundle "$BUNDLE" validate --deny-warnings` |
| List bundle documents | `okf --bundle "$BUNDLE" list` |
| Filter bundle by tags | `okf --bundle "$BUNDLE" list --tag operations --tag runbook` |
| Read bundle ID/alias | `okf --bundle "$BUNDLE" get "operations/deploy"` |
| Read Library URI | `okf --registry "$REGISTRY" get "okf://mcx/interfaces/xcap"` |
| Inspect bundle document | `okf --bundle "$BUNDLE" inspect "operations/deploy"` |
| Search active knowledge space | `okf search "rollback procedure" --limit 8` |
| Restrict search to one Library | `okf search "XCAP document selector" --library mcx --limit 8` |
| Graph summary for current bundle | `okf --bundle "$BUNDLE" graph` |
| Focus bundle graph | `okf --bundle "$BUNDLE" graph --id "operations/deploy"` |
| Graphviz DOT | `okf --bundle "$BUNDLE" graph --representation dot` |

Without `--library`, `search` includes the current bundle and mounted Libraries. The Runtime may use Library catalog/routing metadata and provider-specific lexical, semantic, graph, remote, or agentic retrieval internally. `--library` is optional advanced scoping, not a separate mode.

A canonical `okf://` URI identifies a logical Library node, not necessarily a physical file.

## Library management operations

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

Do not treat `library add`, `mount`, and `remove` as synonyms. Do not manually modify the registry/cache to simulate lifecycle commands. `library` is the management plane; knowledge retrieval remains `search`/`get`.

## Core identifiers

Core OKF document IDs are canonical slash-separated identifiers. When frontmatter omits `id`, the parser derives it from the bundle-relative path without the Markdown suffix. A nested `index.md` maps to its directory ID. Aliases are accepted by read and inspection commands.

## Exit codes

- `0`: success.
- `1`: validation failed or warnings were denied.
- `2`: invalid CLI usage.
- `3`: operational failure such as I/O, provider/source failure, unknown document/Library, or invalid mount/search operation.

Consume named JSON fields rather than human output or property order.
