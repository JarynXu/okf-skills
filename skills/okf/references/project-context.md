# Project Context Library recovery protocol

A Project Context Library is a dynamic Library profile for durable project knowledge across sessions, context windows, and subagents. It is not a substitute for source code or tests; it is a versioned, queryable representation of the project's current understanding and history.

## Recovery states

Treat project context as one of four states:

- `UNINITIALIZED`: no usable project-context Library exists; bootstrap project knowledge.
- `VALID`: the Library's validated repository revision matches the current authoritative revision; restore and query task-local context.
- `DIRTY`: repository state changed after the Library's validated revision; perform incremental impact analysis/revalidation.
- `UNKNOWN`: freshness cannot be established; revalidate conservatively before modifying the project.

Do not infer these states from conversational memory. Use profile/runtime status and repository revision evidence.

## Session/subagent entry

A new session or child Agent should:

1. discover the project-context Library and its status/canonical namespace;
2. compare/verify the declared validated revision when the profile supports it;
3. load the semantic catalog and only the knowledge needed by the task;
4. follow source/evidence pointers where the task requires stronger verification;
5. avoid a full repository relearn when context is `VALID`.

When a parent Agent delegates work, pass the project/revision, relevant Library identity/URIs, and task scope. The child should verify that the revision is still compatible before using inherited context.

## Incremental revalidation

When context is `DIRTY`, identify changes since the validated revision, determine affected knowledge/topics, and invalidate or update only those regions when possible. Expand toward full revalidation only when impact cannot be bounded or invariants fail.

## Before changes

Do not treat the existence of a context Library as proof that the Agent has read enough for the task. Query task-relevant architecture, constraints, decisions, and affected components, then use source/tests as required by the task.

## After changes

Authorized maintenance should update affected current knowledge, append relevant history/decision information, preserve provenance, refresh catalog/index state if needed, and advance the validated revision only after required verification passes.

Project Context consumes the generic Library primitives: no special ad-hoc global memory file should bypass the Runtime.
