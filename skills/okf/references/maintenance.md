# Maintenance workflows

## Answer a knowledge question

1. Validate and note existing diagnostics.
2. Search with a focused query and small limit.
3. Read the strongest documents with `get`.
4. Follow only links needed to resolve ambiguity.
5. Identify the document IDs or paths used.

## Edit a document

1. `inspect` and `get` it.
2. Read nearby indexes, logs, links, and project instructions when relevant.
3. Edit Markdown while preserving unknown frontmatter.
4. Update metadata or relationships only when the content change makes them inaccurate.
5. Validate and compare diagnostics with the baseline.

## Add a document

1. Confirm a new document is preferable to extending an existing one.
2. Choose a stable subject-based path.
3. Add discovery metadata only when known.
4. Add `links` for meaningful directed relationships and explain them in prose.
5. Update an existing index or log only when local policy requires it.
6. Validate and inspect the result.

## Migrate Markdown

Inventory files, propose path and metadata mappings, convert a representative subset, preserve unknown metadata and history, then migrate in reviewable batches. Do not convert project instructions, licenses, generated files, or vendored Markdown merely because they use Markdown.
