# OKF Library Runtime

Use this reference when working with multiple pluggable knowledge Libraries.

## Mental model

A Library is an independently identifiable knowledge unit. The Runtime is the host that registers, mounts, routes, and aggregates Libraries. A Library contributes its own semantic catalog and provider capabilities; backing storage is an implementation detail.

Canonical knowledge addresses use `okf://<library>/<path>` and may resolve to physical Markdown, generated runtime state, remote objects, databases, or another provider.

## Progressive knowledge access

```bash
okf library list
okf library catalog
okf library catalog mcx
okf library query "XCAP document selector" --library mcx
okf library read okf://mcx/interfaces/xcap
```

Prefer the semantic catalog before broad querying. A specialist Library is responsible for telling the Runtime how its knowledge is organized; the host should not infer professional domain structure from filenames.

## Lifecycle

```bash
okf library add ./knowledge --id local-knowledge
okf library add https://github.com/example/library.git --id example --ref main
okf library mount example
okf library update example
okf library unmount example
okf library remove example
```

Install/register is distinct from mount. A mounted Library contributes routes and catalog entries. Unmounting preserves installation/materialization; removing/uninstalling removes Runtime-managed materialization such as a Git cache.

The Runtime registry defaults to `.okf/libraries.json` and can be selected with `--registry`.

## Query behavior

A Library may implement exact, lexical, semantic, graph, remote, or agent-backed retrieval. Do not assume every `library query` is simple full-text search. Treat returned evidence URIs and provenance as the stable verification surface.

For a known URI, use `read` rather than query. For an exact ID when a provider offers exact lookup, prefer that deterministic path before semantic/agentic retrieval.

## Provider boundary

Do not write logic such as "if this Library is Git, search it this way" in Agent behavior. Local, Git, object storage, HTTP, database, generated, and agent-backed forms are provider/source concerns. After resolution, use the same Runtime operations.

A Runtime may expose a virtual filesystem/MCP/HTTP view, but these are adapters over the same logical namespace. A visible virtual file does not imply bytes exist as a real local file.

## Dynamic global catalog

The global catalog is generated from currently mounted Libraries. Do not hand-maintain a second global directory document. Mount/unmount operations change the global catalog automatically while each Library remains responsible for its own optimized internal catalog.
