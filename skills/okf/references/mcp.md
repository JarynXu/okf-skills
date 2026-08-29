# OKF MCP reference for Agents

Use the OKF MCP server when configured. It is an adapter over the native OKF CLI/SDK and exposes core bundle operations, Library Runtime operations, and the Project Context application profile without requiring the Agent to know backing storage details.

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

## Project Context tools

The repository-recovery surface includes:

- `okf_project_init`: scaffold, install, and mount a Project Context Library bound to a Git repository.
- `okf_project_status`: return `UNINITIALIZED`, `VALID`, `DIRTY`, or `UNKNOWN` plus revisions, changed paths, and impacted topics.
- `okf_project_checkpoint`: advance the validated revision after the caller has completed required knowledge maintenance and project verification.

Use `okf_project_status` at session/subagent entry before broad repository exploration when a Project Context profile is expected. If `VALID`, query the mounted Library progressively. If `DIRTY`, use impacted topics as the first revalidation frontier. `okf_project_checkpoint` records prior verification; it is not itself a test or correctness check.

Lifecycle and Project Context initialization/checkpoint tools mutate Runtime/profile state; status/read/query/catalog tools are read-only. Do not infer maintenance authority from query access.

1. Pass the narrowest arguments needed.
2. Treat tool results as structured data and preserve evidence/provenance.
3. Do not emulate unavailable Runtime behavior by crawling Library backing storage.
4. For authorized content maintenance, use the maintenance path appropriate to the backing OKF Library and validate afterward.
5. If the server reports a CLI, registry, source, provider, Git, or profile failure, fix configuration rather than silently substituting another knowledge implementation.

`OKF_REGISTRY` may select the default Library registry, `OKF_BUNDLE` the default core bundle, and `OKF_PROJECT_CONTEXT` the default Project Context profile. The server handles MCP protocol negotiation; use only tools advertised by the host.
