# OKF MCP reference for Agents

Use the OKF MCP server when configured. It is an adapter over the native OKF CLI/SDK and exposes both core bundle operations and Library Runtime operations without requiring the Agent to know backing storage details.

## Core bundle tools

Typical tools include `okf_validate`, `okf_list`, `okf_get`, `okf_inspect`, `okf_search`, and `okf_graph`.

## Library Runtime tools

The Library surface includes:

- `okf_library_add`
- `okf_library_update`
- `okf_library_remove`
- `okf_library_mount`
- `okf_library_unmount`
- `okf_library_list`
- `okf_library_catalog`
- `okf_library_read`
- `okf_library_query`

Use `okf_library_catalog` before broad retrieval when you need to understand which Library/topic owns a domain. Use `okf_library_read` for a known canonical URI and `okf_library_query` for retrieval delegated to the Library's provider.

Lifecycle tools can mutate Runtime state; read/query/catalog tools are read-only. Do not infer maintenance authority from query access.

1. Pass the narrowest arguments needed.
2. Treat tool results as structured data and preserve evidence/provenance.
3. Do not emulate unavailable Runtime behavior by crawling Library backing storage.
4. For authorized content maintenance, use the maintenance path appropriate to the backing OKF Library and validate afterward.
5. If the server reports a CLI, registry, source, or provider failure, fix configuration rather than silently substituting another knowledge implementation.

`OKF_REGISTRY` may select the default Library registry and `OKF_BUNDLE` the default core bundle. The server handles MCP protocol negotiation; use only tools advertised by the host.
