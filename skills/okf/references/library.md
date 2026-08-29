# OKF Library Runtime

Use this reference when working with multiple pluggable knowledge Libraries.

## Mental model

A Library is an independently identifiable knowledge unit. The Runtime is the host that registers, mounts, routes, and aggregates Libraries. A Library contributes its own semantic catalog and provider capabilities; backing storage is an implementation detail.

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

## Retrieval behavior

A Library may internally implement exact, lexical, semantic, graph, remote, or agent-backed retrieval. The user still invokes `search`; provider-specific retrieval is an implementation detail selected by the Runtime and Library guidance.

Treat returned evidence URIs and provenance as the stable verification surface. For a known URI, prefer deterministic `get` over another broad search.

## Provider boundary

Do not write logic such as "if this Library is Git, search it this way" in Agent behavior. Local, Git, object storage, HTTP, database, generated, and agent-backed forms are provider/source concerns. After resolution, use the same OKF consumption operations.

A Runtime may expose a virtual filesystem/MCP/HTTP view, but these are adapters over the same logical namespace. A visible virtual file does not imply bytes exist as a real local file.

## Dynamic routing metadata

Each Library owns its semantic catalog and routing guidance. The Runtime may aggregate that metadata dynamically to route `search` efficiently. Do not hand-maintain a second global directory document and do not require users to browse a Library-specific catalog command before normal retrieval.

## Domain boundary

Concrete application Libraries own their own application lifecycle, domain rules, and Agent instructions. Generic OKF tooling must not add dedicated commands for one installed Library.
