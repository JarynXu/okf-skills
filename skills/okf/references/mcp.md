# OKF MCP reference for Agents

Use the OKF MCP server when configured. It is an adapter over the native OKF CLI/SDK and must preserve the same user-facing knowledge model: mounted Libraries extend existing OKF operations rather than creating a parallel retrieval API.

## Knowledge tools

Typical tools include `okf_validate`, `okf_list`, `okf_get`, `okf_inspect`, `okf_search`, and `okf_graph`.

`okf_search` is the canonical retrieval tool before and after Libraries are mounted. It may accept an optional Library scope, but normally searches the active knowledge space and lets the Runtime route internally using Library-owned catalogs and provider capabilities.

`okf_get` reads ordinary bundle identifiers/aliases and canonical `okf://<library>/<path>` Library URIs.

## Library management tools

The generic Library MCP surface is management-only:

- `okf_library_add`
- `okf_library_update`
- `okf_library_remove`
- `okf_library_mount`
- `okf_library_unmount`
- `okf_library_list`

Do not add a new generic MCP tool simply because one concrete Library application needs a domain action. Application-specific tools belong to that Library/application package.

Lifecycle tools can mutate Runtime state; ordinary search/get remain read-only. Do not infer maintenance authority from retrieval access.

Provider declarations remain inert during add and update. When a reviewed Library requires an external provider, pass only the required kinds through `okf_library_mount.allowProviders`, for example:

```json
{
  "id": "project-context",
  "allowProviders": ["process"]
}
```

Each value maps to the CLI's `--allow-provider <kind>`. Treat `process` as code execution, `http` as network access and possible disclosure, and other kinds according to their equivalent authority. Do not authorize a kind merely because the manifest requests it. Updating a Library does not silently approve newly introduced providers.

1. Pass the narrowest arguments needed.
2. Treat tool results as structured data and preserve evidence/provenance.
3. Do not emulate unavailable Runtime behavior by crawling Library backing storage.
4. For authorized content maintenance, use the maintenance path appropriate to the backing OKF Library and validate afterward.
5. If the server reports a CLI, registry, source, or provider failure, fix configuration rather than silently substituting another knowledge implementation.

`OKF_REGISTRY` may select the default Library registry and `OKF_BUNDLE` the default bundle. The server handles MCP protocol negotiation; use only tools advertised by the host.
