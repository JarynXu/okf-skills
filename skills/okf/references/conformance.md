# OKF alpha bundle model

This describes the model implemented by the Open Knowledge Stack alpha SDK and CLI. It is an operational contract for these tools, not a universal OKF specification.

## Documents and paths

- The parser recognizes `.md` and `.markdown` recursively.
- Hidden paths are ignored by default.
- `id` may be explicit; otherwise it is derived from the bundle-relative path without the suffix.
- A nested `index.md` maps to its containing directory ID.
- IDs use slash-separated segments and reject empty, `.` and `..` segments.

## Frontmatter

YAML frontmatter is optional. Supported fields are `id`, `title`, `summary`, `tags`, `aliases`, and `links`. Unknown fields are preserved as extension metadata.

```markdown
---
id: operations/deploy
title: Deploy service
summary: Production deployment and rollback procedure.
tags: [operations, runbook]
aliases: [deploy-runbook]
links:
  - target: architecture/runtime
    relation: depends-on
---

# Deploy service
```

A shorthand link such as `links: [architecture/runtime]` uses relation `related`.

When `title` is absent, the first level-one heading is used; otherwise the final ID segment becomes the title.

Validation checks IDs, titles, aliases, relation names, unresolved references, self-references, and disconnected documents. Unresolved references are errors by default and may be downgraded to warnings.
