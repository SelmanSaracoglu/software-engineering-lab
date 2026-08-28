# Architecture Decision Records, Acceptance Evidence, Rollback, and Decision Review

## Learning objective

Engineering decisions affect:

- product behaviour,
- architecture,
- security,
- data,
- testing,
- deployment,
- operations,
- and future change.

The selected implementation is visible in the final system, but the reasoning behind it is often lost.

A future engineer may see what was built without knowing:

- which problem it was intended to solve,
- which alternatives were considered,
- which constraints existed,
- which risks were accepted,
- what evidence supported the decision,
- or what change should trigger reconsideration.

This note explains:

- Architecture Decision Records,
- decision status and lifecycle,
- acceptance criteria and acceptance evidence,
- quality gates,
- rollback and roll-forward,
- recovery,
- risk acceptance,
- and systematic decision review.

The goal is not to document every minor action.

The goal is to preserve the reasoning, evidence, consequences, and review conditions of decisions that would otherwise be difficult to understand or safely change.

---

# 1. What is the problem?

Software teams make important decisions continuously.

Examples include:

- where a responsibility belongs,
- which component owns data,
- whether an operation is synchronous or asynchronous,
- which API contract is exposed,
- how identity and authorization are handled,
- whether a capability is built or purchased,
- how a migration is performed,
- which failure behaviour is acceptable,
- and whether an identified risk can be accepted.

These decisions may initially exist only in:

- meetings,
- chat messages,
- pull-request discussions,
- personal memory,
- issue comments,
- or implementation code.

Over time:

- people leave,
- constraints change,
- conversations become difficult to find,
- code is refactored,
- and the original reasoning disappears.

A future engineer may then conclude:

> This design looks unnecessarily complicated. We should simplify it.

The complexity may actually protect:

- a regulatory requirement,
- a data-integrity invariant,
- an external compatibility contract,
- a recovery requirement,
- or a previously discovered failure mode.

The opposite may also happen.

A temporary compromise may continue for years because no one knows that it was intended to be temporary.

Without a decision record, teams may:

- repeat previously rejected analysis,
- reintroduce known risks,
- preserve obsolete constraints,
- treat preferences as permanent requirements,
- or remain unable to explain why the system behaves as it does.

Implementation alone shows:

> What does the system do now?

It does not reliably show:

> Why was this option selected, what did we knowingly sacrifice, and when should the decision be reviewed?

---

# 2. How do the concepts work?

## Engineering decision

An engineering decision selects an option that materially affects the system or how it is delivered and operated.

Examples:

- selecting an architecture style,
- defining a public contract,
- assigning data ownership,
- selecting a persistence model,
- establishing a trust boundary,
- accepting a dependency,
- choosing a migration strategy,
- or accepting a reliability risk.

Not every code change is an engineering decision requiring a permanent record.

A local variable name or small refactoring is usually explained sufficiently by:

- clear code,
- tests,
- and version history.

A decision deserves a separate record when its rationale and consequences will remain important after the original conversation disappears.

## Architecture Decision Record

An Architecture Decision Record, or ADR, is a short document preserving one significant engineering decision.

Despite the word “Architecture,” ADRs are not limited to large system diagrams or technology selection.

An ADR may document decisions about:

- service boundaries,
- API contracts,
- data ownership,
- authentication,
- authorization,
- failure handling,
- deployment,
- observability,
- testing strategy,
- migration,
- or dependency policy.

A useful ADR answers:

```text
What problem required a decision?
Which conditions and constraints mattered?
What realistic options were considered?
What was selected?
Why was it selected?
What consequences and risks were accepted?
What evidence supports the decision?
When should the decision be reviewed?
```

## ADR lifecycle

An ADR should have an explicit status.

Common statuses include:

### Proposed

The decision is under review and has not yet been accepted.

### Accepted

The decision has been approved and is currently authoritative.

### Rejected

The proposed option was considered but not selected.

A rejected ADR can still preserve useful reasoning.

### Superseded

A newer ADR replaces the decision.

The original record remains available because it explains the historical context.

### Deprecated

The decision is still visible in the system but should no longer guide new work.

### Retired

The decision no longer applies because the relevant system or capability no longer exists.

ADR status should not be confused with implementation status.

An accepted ADR may still be awaiting implementation.

## ADR immutability

After a decision is accepted and implemented, its historical record should generally not be silently rewritten as if the new reasoning had always existed.

Minor corrections may be acceptable.

A materially changed decision should normally create a new ADR that:

- references the old ADR,
- explains what changed,
- and marks the old decision as superseded.

This preserves the actual decision history.

## ADR context

The context explains the conditions that created the need for a decision.

It may include:

- product capability,
- current system state,
- quality attributes,
- known risks,
- constraints,
- assumptions,
- dependencies,
- and relevant measurements.

Context should contain enough information to understand the decision without turning the ADR into complete product documentation.

## Decision drivers

Decision drivers are the requirements, risks, qualities, and constraints that matter most.

Examples:

- integrity is more important than maximum write throughput,
- the operations team cannot support another always-on component,
- an external contract cannot currently change,
- the system must preserve an audit trail,
- recovery must complete within a defined period,
- or independent deployment is required.

Decision drivers explain why one option is more suitable than another.

## Considered options

An ADR should describe realistic alternatives.

This does not require documenting every imaginable idea.

Useful alternatives include:

- the selected option,
- the strongest competing option,
- retaining the current state,
- and, where relevant, delaying the decision.

For each option, identify:

- advantages,
- disadvantages,
- risks,
- operational effects,
- and compatibility with constraints.

## Decision

The decision states what was selected.

It should be direct and unambiguous.

Weak:

> We will improve lifecycle management.

Stronger:

> The server will own the allowed lifecycle transitions. Clients may request a transition but may not directly replace persisted status.

The decision should not hide inside a long explanation.

## Consequences

Every meaningful decision has consequences.

Consequences may be:

- positive,
- negative,
- neutral,
- temporary,
- or uncertain.

Example:

```text
Positive:
Transition policy is enforced consistently.

Negative:
Adding a new state requires a controlled code and data change.

Accepted risk:
The initial policy does not support customer-defined workflows.

Operational consequence:
Invalid transition attempts must be observable without exposing sensitive internals.
```

Documenting negative consequences does not weaken an ADR.

It proves that the decision is deliberate.

## Assumptions

An ADR should identify assumptions that materially influence the decision.

Example:

> The product will use one lifecycle policy during the first operational stage.

This allows future engineers to review the decision when multiple policies become a real requirement.

## Acceptance criteria

Acceptance criteria define the observable conditions that must be satisfied.

Example:

- a valid transition succeeds,
- an invalid transition is rejected,
- an unauthorized transition changes no persisted state,
- a successful transition records the actor and time.

Acceptance criteria describe what acceptance requires.

They do not prove that acceptance has occurred.

## Acceptance evidence

Acceptance evidence is the actual information demonstrating that acceptance criteria and relevant quality expectations were satisfied.

Examples:

- automated test results,
- manual test observations,
- database verification,
- security-test results,
- performance measurements,
- deployment logs,
- migration rehearsal,
- recovery exercise,
- monitoring evidence,
- or stakeholder acceptance.

Compare:

```text
Acceptance criterion:
An invalid transition does not change persisted state.

Acceptance evidence:
Integration test executed against the real database shows that
the API returns a controlled conflict response and the stored
state remains unchanged.
```

## Evidence versus confidence

Evidence increases confidence.

It does not prove that all possible failures are impossible.

A passing test proves that:

- a particular scenario,
- under particular conditions,
- with particular data,
- produced the expected result.

It does not automatically prove:

- every possible input is safe,
- production conditions are identical,
- concurrency cannot expose another failure,
- or future changes will preserve the behaviour.

Professional acceptance describes what the evidence supports without exaggerating it.

## Definition of Done

A Definition of Done describes the general completion standard applied to product increments.

It may require:

- implementation completed,
- automated checks passing,
- relevant documentation updated,
- security considerations reviewed,
- deployment verified,
- and acceptance evidence recorded.

Definition of Done is broader and more reusable than one requirement’s acceptance criteria.

## Quality gate

A quality gate is a condition that must be satisfied before work can progress to another lifecycle stage.

Examples:

- type checking must pass before merge,
- critical security findings block release,
- database migration rehearsal must succeed,
- required test suites must pass,
- rollback procedure must be verified.

A quality gate should have:

- a clear purpose,
- objective result,
- owner,
- and exception process.

A gate without a meaningful risk relationship may become bureaucracy.

## Rollback

Rollback restores an earlier known state after a change produces an unacceptable result.

Rollback may concern:

- application code,
- configuration,
- infrastructure,
- database schema,
- persisted data,
- feature exposure,
- or external integration.

These do not necessarily roll back together.

## Roll-forward

Roll-forward corrects the problem through a newer change instead of restoring the previous version.

Roll-forward may be preferable when:

- rollback would lose valid new data,
- the old version cannot read the new schema,
- an external contract has already changed,
- or a focused correction is safer than reversal.

## Recovery

Recovery restores acceptable service or data after failure.

Recovery may involve:

- restart,
- failover,
- restore from backup,
- data repair,
- replay,
- reconciliation,
- or controlled manual action.

Rollback is one possible recovery method.

The terms are not interchangeable.

## Compensating action

Some effects cannot be technically reversed.

Examples:

- an email was sent,
- a payment was captured,
- a message was delivered,
- personal data was exposed,
- an external device executed a command.

The system may need a compensating action:

- send a correction,
- issue a refund,
- publish a reversal transaction,
- revoke access,
- or start incident response.

Compensation creates a new effect.

It does not erase the original one.

## Decision review

Decision review asks whether the original decision remains appropriate under current evidence and constraints.

A review may result in:

- retain,
- modify,
- supersede,
- deprecate,
- or retire.

Review should be triggered by meaningful change rather than performed only on an arbitrary schedule.

## The relationship

```text
Problem and context
→ decision drivers
→ realistic options
→ decision
→ consequences and accepted risks
→ acceptance criteria
→ implementation
→ acceptance evidence
→ deployment and rollback readiness
→ operational evidence
→ decision review
```

---

# 3. What documentation and governance options exist?

## No separate record

The decision exists only in code and conversation.

Advantages:

- no documentation cost,
- suitable for small local and reversible choices.

Risks:

- rationale disappears,
- constraints become invisible,
- rejected alternatives are reconsidered repeatedly.

## Code comment

A comment explains a local implementation decision.

Advantages:

- close to the affected code,
- useful for non-obvious local behaviour.

Risks:

- unsuitable for broad system decisions,
- does not capture cross-component consequences,
- may become stale.

A comment should explain why, not restate what the code does.

## Commit message or pull request

Version-control history can preserve change context.

Advantages:

- connected to implementation,
- useful for local evolution and review.

Risks:

- difficult to discover later,
- may describe only one implementation step,
- reasoning may be scattered across several changes.

## Issue or task record

A ticket can contain requirements, discussion, and acceptance evidence.

Advantages:

- connected to delivery work,
- useful for coordination and status.

Risks:

- may be closed and forgotten,
- may contain excessive conversation,
- decision may be difficult to distinguish from implementation tasks.

## Decision log

A lightweight decision log lists decisions and their brief rationale.

Advantages:

- low maintenance,
- useful for smaller decisions,
- provides discoverability.

Risks:

- may omit alternatives, consequences, or evidence,
- can become too brief for expensive decisions.

## Architecture Decision Record

An ADR records one significant decision in a stable, reviewable format.

Advantages:

- focused,
- version-controlled,
- preserves reasoning and consequences,
- can link to evidence and later decisions.

Risks:

- too many ADRs create noise,
- poorly maintained status becomes misleading,
- teams may write decisions after implementation only to justify them.

## Request for Comments or design proposal

An RFC or design document supports broader analysis before a complex decision.

It may include:

- detailed architecture,
- alternatives,
- rollout,
- migration,
- security,
- performance,
- test strategy,
- and operational plan.

Advantages:

- suitable for large cross-team decisions,
- supports review before commitment.

Risks:

- higher documentation cost,
- slower decision-making,
- may become speculative design.

An accepted RFC may later produce one or more concise ADRs recording the actual decisions.

## Formal governance record

Regulated, safety-critical, or high-risk environments may require:

- formal approval,
- traceability,
- risk classification,
- independent verification,
- and controlled change records.

Advantages:

- supports accountability and compliance,
- creates stronger traceability.

Risks:

- significant cost,
- slower change,
- documents may become approval theatre if evidence is weak.

The process should be proportional to impact and obligation.

---

# 4. What are the selection criteria?

## Decision significance

Create a durable record when the decision materially affects:

- multiple components,
- several teams,
- public behaviour,
- data ownership,
- security boundaries,
- deployment,
- operations,
- or future migration.

## Reversal cost

The harder a decision is to reverse, the stronger the justification should be.

High-cost examples include:

- public contracts,
- persisted formats,
- external dependencies,
- identity models,
- destructive migrations,
- and irreversible external effects.

## Decision lifetime

Ask:

- Will this reasoning still matter in six months?
- Will future engineers wonder why this structure exists?
- Is the constraint temporary?
- Could the implementation survive longer than the people who made the decision?

## Risk and impact

Stronger records are appropriate when failure can cause:

- unauthorized access,
- data corruption,
- operational outage,
- financial loss,
- legal exposure,
- safety impact,
- or difficult recovery.

## Cross-team coordination

A decision affecting several owners needs:

- clear contract,
- consequences,
- accountability,
- and change process.

## Novelty and uncertainty

A familiar local pattern may not need an ADR.

A novel technology, operating model, or dependency may require stronger analysis because the team has less evidence.

## Alternatives

An ADR is most valuable when several reasonable options exist.

If a hard external constraint allows only one option, the record may still be useful for preserving that constraint.

## Compliance and audit need

Some decisions need formal traceability because the organization must demonstrate:

- who approved the decision,
- what evidence existed,
- which risks were accepted,
- and when the decision was reviewed.

## Proportionality

Use the smallest record that preserves the important reasoning.

| Decision                            | Likely record                   |
| ----------------------------------- | ------------------------------- |
| Local variable or private helper    | Clear code and tests            |
| Non-obvious local workaround        | Code comment and linked issue   |
| Focused team-level decision         | Decision log or lightweight ADR |
| Long-lived system boundary          | ADR                             |
| Cross-team architecture change      | RFC plus ADR                    |
| Regulated or safety-critical change | Formal controlled record        |

## Evidence selection

Evidence should match the claim.

| Claim                            | Useful evidence                              |
| -------------------------------- | -------------------------------------------- |
| Functional behaviour works       | Unit, integration, component, or E2E results |
| Database invariant is protected  | Database or integration verification         |
| Unauthorized action is prevented | Security and authorization tests             |
| Performance target is met        | Measurement under stated workload            |
| Migration is safe                | Rehearsal against representative data        |
| Recovery target is achievable    | Timed recovery exercise                      |
| Deployment is controlled         | Deployment and rollback verification         |
| User outcome improves            | User or operational outcome evidence         |

The largest test suite is not automatically the strongest evidence.

The correct evidence is the evidence that addresses the important claim and risk.

---

# 5. What are the security effects?

## Security decisions need explicit ownership

Examples include:

- authentication model,
- authorization boundary,
- sensitive-data handling,
- audit strategy,
- encryption ownership,
- secrets management,
- and accepted vulnerability risk.

A security decision should identify:

- protected asset,
- relevant threat or abuse case,
- control,
- residual risk,
- accountable owner,
- and review condition.

## Risk acceptance is a decision

A known security risk should not become accepted merely because the team continues development.

Risk acceptance requires:

- clear risk description,
- impact,
- affected scope,
- existing controls,
- acceptance authority,
- expiry or review trigger,
- and planned remediation where applicable.

Developers and testers should expose risk.

They should not silently accept organizational risk outside their authority.

## ADRs may contain sensitive information

Do not place the following in widely accessible decision records:

- credentials,
- private keys,
- tokens,
- exploitable production details,
- personal data,
- unnecessary internal addresses,
- or detailed unmitigated attack procedures.

A record can explain security reasoning without becoming a source of sensitive operational information.

## Integrity of decision records

Important decision and risk records may themselves require:

- access control,
- version history,
- review,
- and protection against silent alteration.

## Security acceptance evidence

Relevant evidence may include:

- authentication checks,
- authorization tests,
- negative security scenarios,
- input-validation results,
- secret scanning,
- dependency analysis,
- audit-event verification,
- and controlled penetration or abuse testing.

“No known vulnerability was found” is different from:

> The system is secure.

Security evidence always has scope and limitations.

## Rollback after security exposure

If a change exposes sensitive information, code rollback alone is insufficient.

Recovery may require:

- credential rotation,
- token revocation,
- data-access review,
- log preservation,
- investigation,
- notification,
- and incident response.

---

# 6. What are the performance and scalability effects?

Performance decisions require evidence describing the measurement conditions.

Weak:

> Option A is faster.

Stronger:

> Under 300 concurrent users and 100,000 representative records, Option A produced a p95 response time of 1.8 seconds compared with 3.2 seconds for Option B in the stated environment.

Performance evidence should identify:

- operation,
- workload,
- concurrency,
- data volume,
- environment,
- dependencies,
- measurement duration,
- percentile or throughput,
- and known limitations.

## Benchmark evidence can expire

Performance characteristics change when:

- data grows,
- query patterns change,
- dependencies change,
- infrastructure changes,
- caching changes,
- or new features add work.

An ADR should therefore record both the result and the conditions under which it was observed.

## Scalability decisions need review triggers

Example:

```text
Current decision:
Use one database instance for the current workload.

Evidence:
Measured capacity is substantially above current peak use.

Review trigger:
Sustained demand reaches 70% of tested safe capacity,
or availability requirements change.
```

This is more useful than either:

- designing for unlimited scale,
- or assuming the current solution will remain sufficient forever.

---

# 7. What are the reliability and operational effects?

## Rollback is not one operation

Different change types have different reversal characteristics.

| Change type                  | Typical reversal concern                               |
| ---------------------------- | ------------------------------------------------------ |
| Application code             | Previous version may not support new data or contracts |
| Configuration                | Old value may be unknown or unsafe                     |
| Infrastructure               | Existing resources or state may have changed           |
| Additive schema migration    | Usually easier if old code tolerates the addition      |
| Destructive schema migration | Deleted structure or data may not be recoverable       |
| Data transformation          | Reversal may require original data or mapping          |
| Public API change            | External consumers may already depend on it            |
| External side effect         | May require compensation rather than rollback          |
| Credential change            | Rollback may re-enable compromised material            |
| Feature exposure             | Users may already have created new state               |

## Backward and forward compatibility

A safe deployment may require:

- new code working with the old schema,
- old code working with the new schema,
- consumers tolerating additional fields,
- both contract versions coexisting,
- or a staged migration.

Without compatibility, application rollback may fail even when the old binary is available.

## Expand-and-contract migration

A common migration sequence is:

```text
Expand:
Add new structure while preserving old behaviour.

Migrate:
Move or copy data and consumers gradually.

Contract:
Remove old structure only after it is no longer required.
```

This improves reversibility but adds temporary complexity.

## Backup is not a rollback plan

A backup provides potential recovery data.

It does not prove:

- the backup is complete,
- restoration works,
- recovery is fast enough,
- recent data loss is acceptable,
- or dependencies remain consistent.

Restore procedures must be tested.

## Rollback criteria

Before deployment, define:

- which signals indicate failure,
- who can decide to roll back,
- which components must be reversed,
- what happens to new data,
- how external effects are reconciled,
- and how success after rollback is verified.

## Observability supports rollback decisions

Rollback decisions may depend on:

- error rate,
- latency,
- failed operations,
- data-integrity checks,
- security events,
- queue growth,
- or user-impact signals.

Without useful telemetry, the team may not know whether deployment succeeded or whether rollback is required.

## Roll-forward may be safer

If production has already created data under a new contract, a focused corrective deployment may be safer than restoring incompatible old code.

The correct strategy should be decided using:

- current system state,
- data compatibility,
- impact,
- and recovery time.

---

# 8. What are the complexity and cost effects?

## Documentation cost

Decision records require:

- writing,
- review,
- linking,
- updating status,
- and later discovery.

This cost is justified when the cost of forgotten reasoning is higher.

## Too many ADRs create noise

If every small implementation choice becomes an ADR:

- important decisions become difficult to find,
- writing becomes mechanical,
- review slows down,
- and records are ignored.

## Records can become stale

A decision record without:

- status,
- owner,
- related implementation,
- or review trigger

may become misleading.

## Evidence collection has cost

Strong evidence may require:

- test environments,
- representative data,
- performance tools,
- security review,
- migration rehearsal,
- or recovery exercises.

The evidence effort should be proportional to risk.

## Rollback capability has cost

Supporting safe rollback may require:

- backward compatibility,
- duplicate schemas,
- feature flags,
- retained artifacts,
- additional monitoring,
- and operational rehearsal.

This cost should be compared with:

- impact of failed deployment,
- recovery time,
- and change frequency.

## Governance can become approval theatre

A document does not create quality by itself.

An ADR with no meaningful alternatives, consequences, or evidence may only create the appearance of control.

The value comes from the reasoning and accountability, not the template.

---

# 9. What are common mistakes, failure points, and attack points?

## Writing the ADR after implementation to justify the chosen option

The record should reflect real analysis rather than create retrospective legitimacy.

Late documentation can still be valuable, but uncertainty and missing evidence should remain honest.

## Recording only the selected technology

Weak:

> We chose Database A.

Missing:

- problem,
- alternatives,
- constraints,
- consequences,
- evidence,
- and review trigger.

## No rejected alternatives

Without alternatives, future engineers cannot know whether an option was:

- overlooked,
- impossible,
- or deliberately rejected.

## No negative consequences

Every real decision has cost.

An ADR listing only benefits is probably incomplete.

## Confusing a requirement with a decision

Requirement:

> Important operations must remain traceable.

Decision:

> Record append-only audit events containing actor, action, target, time, and controlled result.

The requirement explains what must be achieved.

The decision explains how the current system will achieve it.

## Treating acceptance criteria as evidence

A checklist stating what should happen is not proof that it happened.

## Evidence without environment

“Performance tests passed” is weak without:

- workload,
- data,
- environment,
- thresholds,
- and results.

## Evidence without failure cases

A successful happy-path test may not support claims about:

- authorization,
- concurrency,
- rollback,
- or recovery.

## “Rollback means redeploy the old version”

Old code may be incompatible with:

- new data,
- new schema,
- changed configuration,
- or public contracts.

## Destructive migration without recovery

Deleting or transforming data without verified backup, restoration, or reconciliation creates an expensive one-way decision.

## External effects ignored

Rollback cannot unsend an email or erase a completed external action.

## No decision owner

An unowned decision may remain active after its assumptions become false.

## No review trigger

“Review later” is not actionable.

Useful triggers are observable.

## Silently editing historical ADRs

This destroys the actual reasoning history.

Supersede significant decisions instead.

## Permanent proposed ADR

A proposal that is never accepted or rejected creates ambiguity.

## Risk acceptance without authority

A technical team should not silently accept business, regulatory, safety, or security risk beyond its mandate.

## Sensitive information in documentation

Decision transparency does not justify exposing secrets or unnecessary exploit details.

## Using ADRs instead of communication

An ADR supports shared understanding.

It does not replace discussion with affected engineers, testers, operators, security specialists, and stakeholders.

## Linking only to temporary systems

If all supporting evidence exists in short-lived CI logs or inaccessible conversations, the record may soon lose its value.

Preserve enough durable evidence or summary to understand the decision later.

---

# 10. When is the current decision no longer correct?

Review a decision when:

- a recorded assumption becomes false,
- a hard constraint disappears,
- a new constraint appears,
- usage or data volume changes materially,
- a security incident exposes a new threat,
- operational failures reveal unacceptable complexity,
- the selected option no longer meets quality targets,
- ownership moves to another team,
- an external contract changes,
- regulation or policy changes,
- migration cost becomes significant,
- or a previously rejected alternative becomes viable.

## Review outcomes

### Retain

The original decision remains appropriate.

Record new evidence if it materially strengthens or limits the decision.

### Modify

The decision remains generally valid but needs a controlled adjustment.

### Supersede

A new decision replaces the original one.

Create a new ADR and link both records.

### Deprecate

The decision remains temporarily supported but should not guide new work.

### Retire

The decision no longer applies.

## Time-based review

A calendar review may be useful for:

- temporary compromises,
- accepted risks,
- expiring contracts,
- and rapidly changing dependencies.

However, event-based triggers are often more meaningful.

Example:

```text
Review when:
- a second team becomes a consumer,
- p95 latency exceeds two seconds,
- more than one lifecycle policy becomes necessary,
- or the current provider contract changes.
```

---

# Generic worked example

## Decision subject

A maintenance-request system needs controlled lifecycle transitions.

Known lifecycle:

```text
OPEN → ASSIGNED
ASSIGNED → IN_PROGRESS
IN_PROGRESS → COMPLETED
OPEN → CANCELLED
ASSIGNED → CANCELLED
```

## ADR-006 — Use a server-authoritative explicit lifecycle

### Status

Accepted

### Context

Maintenance requests have operational states.

State changes affect:

- work ownership,
- completion evidence,
- reporting,
- authorization,
- and auditability.

Clients are untrusted and may submit:

- invalid states,
- outdated transitions,
- repeated operations,
- or unauthorized requests.

The current product requires one stable lifecycle.

There is no validated requirement for user-configurable workflows.

### Decision drivers

- Invalid transitions must not corrupt persisted state.
- Authorization must remain server-authoritative.
- Terminal states must be protected.
- Behaviour must be understandable and testable.
- Current operational complexity should remain low.
- A universal workflow engine is not currently justified.

### Considered options

#### Option A — Client directly replaces status

Advantages:

- simple client implementation,
- minimal server logic.

Disadvantages:

- trusts untrusted input,
- permits invalid transitions,
- duplicates rules across clients,
- weakens integrity and auditability.

#### Option B — Configurable workflow engine

Advantages:

- supports many possible workflows,
- rules may change without code deployment.

Disadvantages:

- significant configuration and validation complexity,
- larger attack surface,
- more test combinations,
- no current product requirement justifies it.

#### Option C — Explicit server-authoritative transition policy

Advantages:

- lifecycle rules are clear,
- authorization and state validation are centralized,
- invalid transitions can be rejected consistently,
- behaviour is straightforward to test and operate.

Disadvantages:

- adding states or transitions requires a controlled code change,
- the current model does not support arbitrary customer-defined workflows.

### Decision

Use an explicit server-authoritative lifecycle policy.

Clients may request an intended transition but may not directly replace persisted status.

The server:

- validates actor authority,
- reads current persisted state,
- determines whether the requested transition is allowed,
- records valid state changes,
- rejects invalid transitions without changing state,
- and records required decision evidence.

### Positive consequences

- Lifecycle integrity is enforced consistently.
- Clients cannot define their own transition rules.
- Invalid behaviour is easier to test.
- Operational investigation has a clear authority boundary.

### Negative consequences

- Lifecycle changes require implementation and verification.
- Persisted status evolution may require migration planning.
- Supporting several organization-specific workflows would require a new decision.

### Accepted risk

The initial lifecycle is intentionally not configurable.

This may require redesign if multiple validated workflows appear.

### Assumptions

- One lifecycle is sufficient for the current capability.
- Transition changes will be infrequent.
- Server-side code can remain the authoritative policy owner.

### Acceptance criteria

- Every allowed transition succeeds for an authorized actor.
- Every disallowed transition returns a controlled conflict result.
- Unauthorized transitions change no persisted state.
- Terminal-state rules are enforced.
- Repeating an already completed idempotent request does not create an additional state change.
- Successful transitions record the actor and time.

### Acceptance evidence

Required evidence includes:

- focused tests for the transition table,
- integration tests against real persistence,
- negative authorization scenarios,
- invalid-transition verification,
- duplicate-operation verification,
- a complete end-to-end lifecycle journey,
- and manual inspection of the user-visible result.

Each result must state:

- environment,
- tested scenario,
- expected result,
- observed result,
- and relevant limitations.

### Deployment and rollback

Application rollback is permitted only while the previous version can safely interpret all persisted statuses.

Before adding a new persisted status:

- compatibility must be evaluated,
- schema and data changes must be reviewed,
- old and new versions must be considered,
- and rollback or roll-forward behaviour must be defined.

A code rollback does not automatically reverse lifecycle changes already completed by users.

### Operational evidence

Monitor:

- invalid-transition rate,
- authorization failures,
- controlled conflict responses,
- unexpected internal lifecycle failures,
- and state-reconciliation anomalies.

### Review triggers

Review this decision when:

- a second real lifecycle is required,
- organizations require different transition policies,
- transitions change frequently,
- separate teams need independent lifecycle ownership,
- or the explicit policy produces unacceptable maintenance cost.

### Related decisions

- capability boundary,
- authorization model,
- persistence and transaction ownership,
- audit-event design,
- concurrency control.

This ADR does not define those subjects completely. It links them as related decision areas.

---

# Lightweight ADR template

```text
# ADR-[number] — [Decision title]

## Status

Proposed | Accepted | Rejected | Superseded | Deprecated | Retired

## Date

[Decision date]

## Owners

[Accountable owner or group]

## Context

What problem requires a decision?

Which product capability, requirements, quality attributes,
constraints, assumptions, risks, and dependencies matter?

## Decision drivers

Which conditions have the greatest influence on the choice?

## Considered options

### Option A

Benefits:
- ...

Costs and risks:
- ...

### Option B

Benefits:
- ...

Costs and risks:
- ...

## Decision

What option is selected?

State it directly.

## Consequences

### Positive
- ...

### Negative
- ...

### Uncertain
- ...

## Accepted risks

Which risks remain, who accepts them, and until when?

## Assumptions

What is currently believed to be true?

## Acceptance criteria

What conditions must be satisfied?

## Acceptance evidence

What evidence must be collected, under which conditions?

## Rollout

How will the decision be introduced safely?

## Rollback, roll-forward, and recovery

What can be reversed?

What cannot be reversed?

How will data and external effects be handled?

## Operational ownership

Who observes, supports, and responds to failure?

## Review triggers

Which measurable changes require reconsideration?

## Related decisions

Which requirements, ADRs, contracts, or runbooks are related?
```

---

# Acceptance evidence record template

```text
Decision or requirement:
What claim is being evaluated?

Acceptance criterion:
What must be true?

Evidence type:
Automated test, manual observation, security test,
performance measurement, migration rehearsal,
deployment verification, recovery exercise, or other.

Environment:
Where and under which configuration was it evaluated?

Data and workload:
Which inputs, volume, concurrency, and dependencies were used?

Expected result:
What should happen?

Observed result:
What actually happened?

Status:
Passed, failed, partially satisfied, or blocked.

Limitations:
What does this evidence not prove?

Artifact:
Where is the durable result or summary?

Reviewer:
Who assessed the evidence?

Date:
When was it collected?
```

---

# Rollback-readiness template

```text
Change:
What is being deployed?

Affected areas:
Code, configuration, infrastructure, schema, data,
public contract, external system, or user-visible state?

Failure signals:
What indicates that rollback or correction is required?

Decision authority:
Who can initiate rollback?

Previous version:
Is it available and deployable?

Compatibility:
Can the previous version read current data and schema?

Data:
What new data may exist?

Migration:
Can schema and data changes be reversed?

External effects:
Which effects require compensation rather than rollback?

Feature exposure:
Can the capability be disabled safely?

Verification:
How will the team know rollback succeeded?

Recovery alternative:
When is roll-forward or manual recovery safer?

Time limit:
How long is rollback a valid option?

Communication:
Who must be informed?
```

---

# Decision checklist

Before accepting a significant decision, ask:

## Context

- What problem requires a decision?
- Which capability and requirements are affected?
- Which constraints and assumptions exist?
- Which risks and dependencies matter?

## Options

- Which realistic alternatives were considered?
- Was maintaining the current state considered?
- Why is the selected option more suitable?
- What does each option sacrifice?

## Decision

- Is the selected option stated clearly?
- Is its scope explicit?
- Is the owner clear?
- Is the decision internal or externally binding?

## Consequences

- Which positive consequences are expected?
- Which negative consequences are accepted?
- Which outcomes remain uncertain?
- What new operational responsibilities appear?

## Security

- Which assets and trust boundaries are affected?
- Who can accept remaining risk?
- Does the record expose sensitive information?
- What security evidence is required?

## Acceptance

- Are acceptance criteria observable?
- Does the planned evidence match the important claims?
- Are failure, authorization, and recovery cases included?
- Are evidence limitations stated honestly?

## Rollout and recovery

- Can the change be introduced gradually?
- Can code, configuration, schema, and data all be reversed?
- Are external effects compensatable?
- Is roll-forward safer?
- Has recovery been verified rather than assumed?

## Operations

- Which telemetry determines success or failure?
- Who monitors the result?
- Who responds to failure?
- Are runbooks or recovery procedures required?

## Review

- Which assumptions may become false?
- Which metrics or events trigger reconsideration?
- Does accepted risk have an expiry?
- Will a new ADR supersede this decision when it changes?

---

# Main idea

A decision is not complete when code is merged.

A professional engineering decision connects:

```text
Context
→ alternatives
→ selected option
→ consequences
→ accepted risks
→ acceptance criteria
→ implementation
→ evidence
→ rollout and recovery
→ operational observation
→ review
```

An ADR preserves why a significant decision was made.

Acceptance evidence shows what was actually verified.

Rollback and recovery planning expose whether change is genuinely reversible.

Decision review prevents old assumptions from becoming permanent architecture.

The strongest question is not:

> Did we document the decision?

It is:

> Can another engineer understand why this decision was appropriate, what evidence supported it, what could still go wrong, and when it must be reconsidered?
