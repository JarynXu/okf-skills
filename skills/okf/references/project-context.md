# Project Context Library recovery protocol

A Project Context Library is a repository-bound Library profile for durable project knowledge across sessions, context windows, and subagents. It is not a substitute for source code or tests; it is a versioned, queryable representation of the project's current understanding and history.

## Bootstrap

When no Project Context profile exists, bootstrap it with the dedicated application surface instead of inventing an ad-hoc memory directory:

```bash
okf project init --repository . --project <name> --id project-context
```

The default profile state is `.okf/project-context.json`; the default scaffold is `.okf/project-context/`. Initialization creates a standard OKF Library package, registers it in the Library Runtime, and mounts it. The scaffold contains curated `current/` topics and an append-only `history/log` entry point.

With MCP, use `okf_project_init` with equivalent arguments.

## Recovery states

Treat project context as one of four states:

- `UNINITIALIZED`: no usable validated project-context checkpoint exists; bootstrap project knowledge.
- `VALID`: the validated repository revision matches the current authoritative revision and there are no relevant staged, unstaged, or untracked working-tree changes.
- `DIRTY`: committed repository state or the working tree differs from the validated checkpoint; perform incremental impact analysis/revalidation.
- `UNKNOWN`: freshness cannot be established; revalidate conservatively before modifying the project.

Do not infer these states from conversational memory or from `HEAD` alone. Evaluate them through:

```bash
okf project status --output json
```

or MCP `okf_project_status`.

The status result includes `validated_revision`, `current_revision`, committed and working-tree changed paths when the delta can be established, and `impacted_topics` derived from profile impact rules.

## Session/subagent entry

A new session or child Agent should:

1. call Project Context status;
2. discover the mounted project-context Library and its canonical namespace;
3. if `VALID`, load the semantic catalog and only the knowledge needed by the task;
4. if `DIRTY`, use `impacted_topics` as the first revalidation frontier, then expand if the change is cross-cutting or impact cannot be bounded;
5. follow source/evidence pointers where the task requires stronger verification;
6. avoid a full repository relearn merely because conversational context is new.

When a parent Agent delegates work, pass the project/revision, relevant Library identity/URIs, and task scope. The child should verify revision and working-tree compatibility before using inherited context.

## Incremental revalidation

When context is `DIRTY`, identify committed changes since the validated revision plus current staged, unstaged, and untracked changes, determine affected knowledge/topics, and invalidate or update only those regions when possible. Impact rules are invalidation hints, not proof that unrelated topics are correct. Dependency upgrades, migrations, build-system changes, cross-cutting refactors, or failed invariants may require broader revalidation.

The default scaffold maps common source/package paths to architecture/components and build/configuration paths to constraints. Projects should refine profile impact rules as their structure stabilizes.

## Before changes

Do not treat the existence of a context Library as proof that the Agent has read enough for the task. Query task-relevant architecture, constraints, decisions, and affected components, then use source/tests as required by the task.

Prefer:

```bash
okf library catalog project-context --output json
okf library query "<task context>" --library project-context --output json
```

over recursive repository reading.

## After changes

Authorized maintenance should:

1. update affected `current/` knowledge;
2. append relevant history/decision information;
3. preserve provenance/evidence pointers;
4. refresh catalog/index state if needed;
5. run project-required tests, validation, and review;
6. commit the intended source/knowledge changes when required by project policy;
7. only after those checks pass, advance the checkpoint:

```bash
okf project checkpoint
```

or MCP `okf_project_checkpoint`.

`checkpoint` is not a verification command and does not mutate portable knowledge content after selecting the revision. It records the revision that the maintenance workflow has already verified. Never advance it before required project validation completes.

## Profile boundary

Project Context consumes the generic Library primitives. The dedicated `project` CLI/MCP surface is an application adapter for Git freshness, scaffold/bootstrap, impact calculation, and checkpoint state; it does not add project-specific branches to the generic `LibraryProvider` contract.

No special global memory file should bypass the Runtime. The mounted Library remains the knowledge-consumption interface, while `.okf/project-context.json` is local runtime state used to prove freshness.
