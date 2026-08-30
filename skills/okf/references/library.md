# OKF Library Runtime

Use this reference when working with multiple pluggable knowledge Libraries.

## Mental model

A Library is an independently identifiable knowledge unit. The Runtime is the host that registers, mounts, routes, and aggregates Libraries. A Library contributes semantic catalog/navigation data and provider capabilities; backing storage and transport are implementation details.

Canonical knowledge addresses use `okf://<library>/<path>` and may resolve to physical Markdown, generated runtime state, remote objects, databases, or another provider.

A mounted Library extends the active OKF knowledge space. It does not create a parallel knowledge-consumption interface.

## Normal knowledge access

Use the same OKF commands whether Libraries are installed or not:

```bash
okf search "XCAP document selector"
okf search "XCAP document selector" --library mcx
okf get okf://mcx/interfaces/xcap
```

`search` is the canonical retrieval operation. Without `--library`, the Runtime searches the active knowledge space and may use mounted Libraries' catalogs, routing hints, and provider capabilities to select optimized retrieval strategies. `--library` is optional advanced scoping.

For a known canonical `okf://` URI, use `get` for precise retrieval. Do not crawl backing directories just because a Library is mounted.

## Lifecycle management

```bash
okf library add ./knowledge --id local-knowledge
okf library add https://github.com/example/library.git --id example --ref main
okf library mount example
okf library update example
okf library unmount example
okf library remove example
okf library list
```

`okf library ...` is the management plane. Install/register is distinct from mount. A mounted Library participates in active search and URI routing. Unmounting preserves installation/materialization; removing/uninstalling removes Runtime-managed materialization such as a Git cache.

The Runtime registry defaults to `.okf/libraries.json` and can be selected with `--registry`.

## Provider deployments

A materialized `okf-library.yaml` may declare concrete provider deployments such as `process` or `http`. Provider declarations are **inert data at install time**. Installing or updating a Library MUST NOT silently execute a program, access the network, or resolve credentials merely because a manifest requests it.

Before mounting a Library that declares provider kinds with external authority:

1. inspect the Library source and `okf-library.yaml`;
2. verify the provider kind, command/endpoint, requested capabilities, and credential references;
3. approve only the provider kinds required for the task;
4. mount with explicit authorization, for example:

```bash
okf library mount project-context --allow-provider process
okf library mount remote-docs --allow-provider http
```

Provider approvals are deployment-local Runtime state and may persist across unmount/remount. Updating a Library does not itself grant newly declared provider kinds; re-review and explicitly authorize them when required.

For process providers, treat the executable as code execution. For HTTP providers, treat the endpoint as network access. Portable manifests may refer to credential environment variables or slots but must not carry secret values.

## Retrieval behavior

A Library may internally implement exact, lexical, semantic, graph, remote, or agent-backed retrieval. The user still invokes `search`; provider-specific retrieval is an implementation detail selected by the Runtime and Library guidance.

Treat returned evidence URIs and provenance as the stable verification surface. For a known URI, prefer deterministic `get` over another broad search.

## Provider boundary

Do not write Agent logic such as "if this Library is Git, search it this way". Local, Git, object storage, HTTP, database, generated, process, and agent-backed forms are provider/source concerns. After resolution, use the same OKF consumption operations.

A Runtime may expose a virtual filesystem/MCP/HTTP view, but these are adapters over the same logical namespace. A visible virtual file does not imply bytes exist as a real local file.

## Dynamic routing metadata

Each Library owns semantic catalog/navigation and routing guidance. The Runtime may aggregate that metadata dynamically to route `search` efficiently. Do not hand-maintain a second global directory document and do not require users to browse a Library-specific catalog command before normal retrieval.

## Domain boundary

Concrete application Libraries own their own application lifecycle, domain rules, provider program, and Agent instructions. Generic OKF tooling must not add dedicated commands or semantic types for one installed Library.
