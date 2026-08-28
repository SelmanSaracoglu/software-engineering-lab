# Functional Requirements, Non-Functional Requirements, and Quality Attributes

## Learning objective

After defining a product problem, user need, capability, and capability boundary, the next task is to describe what the system must do and how well it must do it.

This note explains how to distinguish:

- functional requirements,
- non-functional requirements,
- quality attributes,
- business rules,
- constraints,
- invariants,
- and acceptance criteria.

The goal is not merely to produce documentation. The goal is to create requirements that can guide architecture, implementation, testing, security analysis, and operational decisions.

---

# 1. What is the problem?

A capability statement describes a stable ability:

> Authorized reviewers can evaluate submitted documents and record a decision.

However, this statement is not yet detailed enough to design, implement, or verify the system.

It does not establish:

- which actors may perform each action,
- which inputs are required,
- which state changes are valid,
- what happens when an operation fails,
- how quickly the system should respond,
- how much data or traffic it should support,
- which information must remain confidential,
- how long data must remain available,
- or what evidence proves the capability works correctly.

Without explicit requirements, different people fill these gaps with different assumptions.

A product owner may assume that:

- rejected documents require a reason,
- decisions are permanent,
- and reviewers can see only their assigned documents.

A developer may assume that:

- rejection reasons are optional,
- decisions can be overwritten,
- and every authenticated user can see every document.

A tester may verify the implementation that exists without knowing which behaviour was actually intended.

An operator may receive a production failure without logs, recovery instructions, or ownership information.

The problem is therefore not simply missing documentation.

The problem is that an undefined expectation cannot reliably guide:

- design,
- implementation,
- testing,
- security,
- deployment,
- operation,
- or acceptance.

Requirements turn product intent into explicit and verifiable expectations.

---

# 2. How do the concepts work?

## Functional requirement

A functional requirement describes a behaviour, service, calculation, decision, or state change that the system must provide.

It answers questions such as:

- What can an actor do?
- What input does the system accept?
- What output does it produce?
- What state can change?
- Which rule determines the result?
- What happens when the operation is invalid?
- Which actor is allowed to perform the behaviour?

Example:

> An authorized reviewer can reject a submitted document by providing a rejection reason.

A useful functional requirement normally identifies:

```text
Actor
+ precondition
+ action or event
+ system response
+ state or output
+ important failure behaviour
```

Another example:

> When an authorized reviewer approves a document in the `SUBMITTED` state, the system changes its state to `APPROVED` and records the reviewer and decision time.

This statement is stronger than:

> The system supports document approval.

The stronger version exposes:

- the authorized actor,
- the required starting state,
- the requested action,
- the resulting state,
- and the evidence that must be recorded.

## Non-functional requirement

A non-functional requirement describes a quality expectation or constraint affecting how the system delivers its capabilities.

Common examples concern:

- security,
- performance,
- availability,
- reliability,
- scalability,
- usability,
- maintainability,
- interoperability,
- portability,
- auditability,
- observability,
- recoverability,
- and compliance.

Example:

> Under a workload of 200 concurrent authenticated users, 95% of document-list requests must complete within two seconds.

This does not introduce a new business capability. It describes how well an existing capability must perform under stated conditions.

The term “non-functional” can be misleading. These requirements are not less important and they are not unrelated to functionality.

A system that returns the correct result after ten minutes may be functionally correct but operationally unusable.

A system that stores the correct data but exposes it to unauthorized actors does not provide an acceptable capability.

## Quality attribute

A quality attribute is a measurable or observable property that expresses how well a system behaves.

Examples include:

| Quality attribute | Question it answers |
| --- | --- |
| Performance | How quickly or efficiently does the system respond? |
| Availability | When must the system be accessible? |
| Reliability | Can it continue producing correct results over time? |
| Security | How are confidentiality, integrity, identity, and authority protected? |
| Scalability | How does behaviour change as demand or data grows? |
| Maintainability | How safely and efficiently can the system be changed? |
| Testability | How easily can important behaviour be controlled and observed? |
| Usability | Can intended users complete their goals effectively? |
| Interoperability | Can the system exchange meaningful data with other systems? |
| Recoverability | Can the system restore acceptable service and data after failure? |
| Observability | Can operators understand the system’s internal state from its outputs? |
| Auditability | Can important actions be reconstructed and attributed? |

A quality attribute is a category.

A quality-attribute requirement makes the expected quality concrete and verifiable.

For example:

```text
Quality attribute:
Performance

Weak statement:
The search must be fast.

Verifiable requirement:
With 100,000 indexed documents and 300 concurrent users,
95% of search requests must complete within two seconds
and 99% within five seconds.
```

## Business rule

A business rule is a domain policy, calculation, restriction, or truth that the system must enforce.

Examples:

- A submitted document cannot be edited.
- A rejected document must have a rejection reason.
- Only a supervisor can reopen a closed case.
- A refund cannot exceed the captured payment amount.

A business rule may produce one or more functional requirements.

For example:

```text
Business rule:
A rejected document must have a reason.

Functional requirements:
- The reject operation requires a non-empty reason.
- A rejection request without a reason is rejected.
- An invalid rejection request does not change persisted state.
```

Business rules should not be hidden only inside interface behaviour or application code. If a rule protects important business or security integrity, it must be explicit.

## Constraint

A constraint limits the available solution space.

Examples:

- The system must integrate with an existing identity provider.
- Data must remain within a particular legal region.
- The application must support an existing external protocol.
- The delivery date is fixed by a regulatory deadline.
- A specific legacy platform cannot yet be replaced.

A constraint is different from a quality attribute.

For example:

> The system must be maintainable.

This expresses a desired quality, although it is too vague.

> The system must run on an existing supported Linux platform.

This limits the solution options and is therefore a technical constraint.

Some constraints are legitimate and unavoidable. Others are assumptions disguised as requirements.

For example:

> The system must use a microservice architecture.

This should not automatically be accepted as a requirement. The team should ask:

- Which business, technical, operational, or organizational constraint requires it?
- What problem would a modular monolith fail to solve?
- Who owns the resulting deployment and operational complexity?
- What evidence would show that this constraint is still necessary?

## Invariant

An invariant is a condition that must remain true whenever the system is in a valid state.

Examples:

- A completed payment cannot have a negative captured amount.
- A document cannot be both `APPROVED` and `REJECTED`.
- Inventory cannot be allocated below zero.
- An unauthorized actor cannot become the recorded approver.
- A completed operation must have a completion time.

Invariants are especially important because they often require protection at more than one level:

- user interface,
- application logic,
- API validation,
- authorization,
- database constraints,
- transactions,
- and concurrency control.

The correct protection depends on the invariant and the failure risks.

## Acceptance criterion

An acceptance criterion is a specific condition used to determine whether a requirement or product increment has been satisfied.

Example:

> Given a submitted document and an authorized reviewer, when the reviewer rejects the document with a non-empty reason, then the document becomes rejected and the decision reason, reviewer, and decision time are recorded.

Acceptance criteria help turn requirements into observable examples.

However, acceptance criteria do not automatically replace requirements.

A requirement explains the expected rule or behaviour.

Acceptance criteria provide concrete evidence that selected cases satisfy it.

One requirement may need several acceptance criteria covering:

- successful behaviour,
- invalid input,
- unauthorized access,
- duplicate operations,
- dependency failure,
- and recovery.

## The relationship

```text
Product problem
→ user need
→ capability
→ functional requirements
→ quality attributes and constraints
→ business rules and invariants
→ acceptance criteria
→ design
→ implementation
→ verification evidence
```

These elements have different responsibilities.

| Element | Main responsibility |
| --- | --- |
| Product problem | Explains why change is needed |
| User need | Describes the desired user outcome |
| Capability | Defines the stable system ability |
| Functional requirement | Describes required behaviour |
| Quality requirement | Describes how well behaviour must be delivered |
| Business rule | Defines a domain policy or restriction |
| Constraint | Limits solution choices |
| Invariant | Defines a condition that must always remain true |
| Acceptance criterion | Defines concrete evidence for acceptance |

---

# 3. What specification options exist?

Requirements can be expressed in several complementary forms.

## Natural-language requirements

Example:

> An authorized coordinator can assign an open maintenance request to an active technician.

Advantages:

- understandable by different roles,
- easy to review,
- suitable for business and product discussions.

Risks:

- ambiguous terms,
- hidden assumptions,
- inconsistent wording,
- and requirements that cannot be objectively verified.

Natural language is useful, but important terms must be defined.

## User stories

Example:

> As a maintenance coordinator, I want to assign an open request to a technician so that responsibility for the work is clear.

Advantages:

- keeps attention on actor and value,
- supports incremental product planning,
- is easy to discuss with stakeholders.

Risks:

- may remain too vague for implementation,
- may hide domain rules,
- may omit failure and security cases,
- and may be treated as a complete requirement without sufficient acceptance criteria.

A user story is a conversation structure, not a substitute for analysis.

## Use cases

A use case describes an interaction between an actor and the system, often including:

- preconditions,
- main flow,
- alternative flows,
- failure flows,
- and postconditions.

Advantages:

- useful for multi-step workflows,
- makes alternative and failure behaviour visible,
- helps identify actor responsibilities.

Risks:

- can become unnecessarily large,
- may focus heavily on interaction while missing quality attributes,
- and can be expensive to maintain if every small behaviour becomes a formal use case.

## Behaviour examples

Example:

```gherkin
Given an open maintenance request
And an authorized coordinator
When the coordinator assigns an active technician
Then the request is assigned to that technician
And the assignment actor and time are recorded
```

Advantages:

- concrete and testable,
- supports shared understanding,
- exposes missing examples.

Risks:

- examples may be mistaken for the complete rule,
- teams may overproduce detailed scenarios,
- implementation details may leak into business examples,
- and automated scenarios may become the only requirements documentation.

## State models

A state model describes valid states and transitions.

Example:

```text
OPEN → ASSIGNED
ASSIGNED → IN_PROGRESS
IN_PROGRESS → COMPLETED
OPEN → CANCELLED
ASSIGNED → CANCELLED
```

Advantages:

- exposes invalid transitions,
- makes terminal states visible,
- supports concurrency and idempotency analysis,
- provides strong input for implementation and testing.

Risks:

- may omit actor authorization,
- may omit side effects,
- may hide why transitions exist,
- and may not represent complex parallel states without additional modelling.

## Quality-attribute scenarios

A quality-attribute scenario makes a quality expectation measurable.

A common structure is:

```text
Source of stimulus
+ stimulus
+ environment
+ affected system or component
+ expected response
+ response measure
```

Example:

```text
Source:
Authenticated users

Stimulus:
Submit search requests

Environment:
Normal production operation with 300 concurrent users

System:
Document search capability

Response:
Return matching authorized documents

Measure:
95% of requests complete within two seconds
and 99% complete within five seconds
```

This is stronger than:

> Search must be fast.

## Formal models and specifications

High-risk systems may require more formal representations, such as:

- mathematical constraints,
- decision tables,
- protocol specifications,
- data schemas,
- state machines,
- safety cases,
- or formally verified properties.

Advantages:

- reduces ambiguity,
- supports systematic analysis,
- can expose contradictions and unreachable states.

Risks:

- requires specialist knowledge,
- costs more to produce and maintain,
- may exclude stakeholders who cannot review the notation,
- and can create false confidence if the model omits important real-world assumptions.

The appropriate method depends on risk, complexity, and the cost of misunderstanding.

---

# 4. What are the selection criteria?

The goal is not to use the most formal specification method everywhere.

The goal is to use enough precision for the risk.

## Business and user impact

Ask:

- What happens if the requirement is misunderstood?
- Does failure cause inconvenience, financial loss, legal exposure, safety impact, or security compromise?
- Is the behaviour central to the product capability?

Higher-impact behaviour requires more explicit requirements and stronger evidence.

## Complexity

Ask:

- Does the behaviour contain many rules or exceptions?
- Are there several actors?
- Are state transitions involved?
- Can operations occur concurrently?
- Does success depend on external services?

Complex rules may need decision tables, state models, or multiple acceptance examples.

## Reversibility

Ask:

- Can an incorrect decision be changed cheaply?
- Does the operation create an irreversible external effect?
- Could it it destroy or expose data?
- Does it affect historical or financial records?

Irreversible behaviour needs clearer preconditions, authorization, failure handling, and audit evidence.

## Frequency and scale

Ask:

- How often does the operation occur?
- What workload and data volume are expected?
- Is demand stable or bursty?
- Does a slow operation block a critical workflow?

Performance targets should reflect realistic workloads rather than arbitrary numbers.

## Regulatory, privacy, and safety obligations

Ask:

- Must the system demonstrate compliance?
- Must actions be attributable?
- Are retention, deletion, or regional restrictions involved?
- Could incorrect behaviour affect health, safety, or protected information?

These conditions may require explicit auditability, integrity, access-control, retention, and recovery requirements.

## Testability

Ask:

- Can the requirement be observed?
- Can test inputs and expected outcomes be controlled?
- Is the expected result objective?
- Does verification require unavailable production conditions?
- Can failure behaviour be reproduced safely?

A requirement that cannot be verified may be too vague, too broad, or missing a measurable outcome.

## Operational responsibility

Ask:

- Who detects failure?
- Who responds?
- What information is needed for diagnosis?
- What recovery behaviour is expected?
- Which dependencies must be available?

Operational requirements should exist before production incidents expose the missing assumptions.

## Cost of specification

Detailed specification also has a cost.

The team must balance:

- the cost of writing and maintaining the requirement,
- the cost of verifying it,
- and the cost of being wrong without it.

A reversible visual preference does not need the same formality as an authorization boundary or financial invariant.

---

# 5. What are the security effects?

Security requirements should describe protected outcomes, trust decisions, and verifiable controls.

Weak statement:

> The system must be secure.

This cannot guide design or testing.

Stronger requirements include:

- Only authorized coordinators can assign maintenance requests.
- A user cannot access requests belonging to another organization.
- Authentication tokens are not written to application logs.
- A failed authorization check does not change persisted state.
- Sensitive data is encrypted when transmitted over untrusted networks.
- Security-relevant state changes record the actor, time, action, and result.
- Repeated failed authentication attempts are limited and observable.
- Invalid input is rejected at the system boundary before reaching sensitive operations.

Security requirements should consider:

## Confidentiality

- Who can read the data?
- Which data is sensitive?
- Where can it be exposed?
- Are logs, exports, backups, and error messages included?

## Integrity

- Who can change the data?
- Which changes are valid?
- How are unauthorized or conflicting changes prevented?
- Which invariants must survive concurrency and failure?

## Availability

- Which capabilities must remain available?
- What resource-exhaustion or abuse cases exist?
- Can one actor prevent others from using the service?

## Authentication

- How does the system establish an actor’s identity?
- What assurance level is required?
- What happens when identity information is missing or expired?

## Authorization

- Which actor may perform which action on which resource?
- Does authorization depend on role, ownership, organization, state, or context?
- Is authorization checked on every protected operation?

## Auditability

- Which actions must be reconstructable?
- What actor and context must be recorded?
- How is sensitive information excluded from audit records?
- Who may access or alter those records?

A security mechanism may also produce functional requirements.

For example:

> The system locks an account after repeated failed authentication attempts.

This is functional behaviour serving a security quality goal.

The distinction between functional and non-functional is therefore not always absolute. Clarity, ownership, and verifiability matter more than forcing every statement into one category.

---

# 6. What are the performance and scalability effects?

Performance requirements must include a workload and a measurable result.

Weak statement:

> The application must be fast.

Stronger statement:

> With 50,000 open maintenance requests and 300 concurrent authenticated users, 95% of filtered-list requests must complete within two seconds.

Important performance dimensions include:

- response time,
- latency,
- throughput,
- concurrency,
- processing time,
- resource usage,
- payload size,
- startup time,
- and background-job completion time.

A performance requirement should state:

```text
Operation
+ workload
+ data volume
+ environment
+ response measure
+ acceptable threshold
```

## Average values are often insufficient

An average can hide a poor experience for a significant number of requests.

For example:

```text
Nine requests complete in 100 ms.
One request completes in 10 seconds.
```

The average does not fully communicate the slow-request risk.

Percentiles are often more useful:

- p50 describes the median,
- p95 describes the value below which 95% of observations fall,
- p99 exposes behaviour near the slow end.

The required percentile depends on the capability and impact.

## Scalability is not simply high performance

Performance asks:

> How does the system behave under a stated workload?

Scalability asks:

> How does behaviour and required capacity change as workload or data grows?

A system can be fast at its current size but expensive or unstable when demand doubles.

Scalability requirements should be based on plausible growth or contractual obligations. Inventing extreme scale without evidence encourages premature complexity.

---

# 7. What are the reliability and operational effects?

Reliability requirements define behaviour across time, failure, recovery, and dependency problems.

Relevant questions include:

- What happens if a dependency is unavailable?
- Can the operation be retried?
- Can a retry create a duplicate effect?
- What happens after partial success?
- Which data must survive a restart?
- How is corruption detected?
- What degraded behaviour is acceptable?
- How quickly must service recover?
- How much data loss is tolerable?
- What information must operators receive?

Examples:

- A successfully accepted maintenance request remains available after an application restart.
- Retrying a completed submission with the same idempotency key does not create another request.
- If notification delivery fails, the recorded maintenance request remains valid and the notification can be retried independently.
- A dependency timeout produces a controlled failure and does not leave the request in an undefined state.
- Operators can identify failed background jobs through monitored status and structured diagnostic events.

## Availability and reliability are related but different

Availability asks whether the system is accessible when needed.

Reliability asks whether it continues producing correct behaviour over time.

A system can be available but unreliable if it responds successfully with incorrect or inconsistent data.

A system can be reliable during operation but have insufficient availability because of frequent maintenance or slow recovery.

## Recovery requirements

Recovery expectations may include:

- maximum acceptable service-restoration time,
- maximum acceptable data loss,
- backup frequency,
- restore verification,
- failover behaviour,
- and manual recovery responsibility.

These topics later become more precise through concepts such as RTO and RPO.

## Observability requirements

A production capability must provide enough evidence to understand important behaviour.

Examples:

- Every request receives a correlation identifier.
- Failed external calls record dependency name, duration, and controlled failure category.
- Security-relevant state changes produce an audit event.
- Sensitive credentials and personal data are not included in diagnostic logs.
- Operators can distinguish invalid user input from an internal service failure.

Logging everything is not observability. Useful operational evidence must be intentional, structured, safe, and connected to decisions operators may need to make.

---

# 8. What are the complexity and cost effects?

Every requirement creates cost.

The cost may include:

- implementation,
- automated and manual testing,
- test environments,
- performance infrastructure,
- monitoring,
- security controls,
- deployment,
- support,
- documentation,
- audit evidence,
- maintenance,
- and future change.

Quality attributes frequently compete.

Examples:

| Desired quality | Possible cost or conflict |
| --- | --- |
| Stronger security | More identity, authorization, review, and operational complexity |
| Lower latency | More caching, memory, concurrency, or infrastructure |
| Higher availability | Redundancy, failover, monitoring, and operational cost |
| Strong consistency | Reduced availability or throughput in some distributed designs |
| Greater flexibility | More configuration and more states to test |
| Faster delivery | Less time for discovery, hardening, or automation |
| More audit detail | Storage, privacy, access-control, and retention obligations |
| Greater maintainability | Additional boundaries, documentation, and refactoring effort |

The correct decision is rarely “maximize every quality.”

The engineering task is to determine:

- which qualities are most important,
- what level is sufficient,
- which trade-offs are acceptable,
- and what evidence supports those priorities.

## Verification also has a cost

A requirement such as:

> The system must never fail.

Cannot be realistically proven.

A requirement such as:

> The service must achieve 99.99% monthly availability.

May require:

- redundant infrastructure,
- carefully controlled deployments,
- extensive monitoring,
- incident response,
- and a small allowed failure budget.

The target must be justified by product impact, not chosen because a larger number sounds more professional.

---

# 9. What are common mistakes, failure points, and attack points?

## Vague quality words

Examples:

- fast,
- secure,
- reliable,
- scalable,
- intuitive,
- user-friendly,
- robust,
- maintainable.

These words express direction but not a verifiable requirement.

Ask:

- Under which conditions?
- For which actor or operation?
- Measured how?
- What threshold is acceptable?

## Describing implementation instead of need

Example:

> The system must use Redis.

This may be a design decision rather than a product requirement.

The underlying requirement may concern:

- response time,
- shared state,
- rate limiting,
- or temporary data.

Implementation constraints should have an explicit reason.

## Missing actors and authorization

Example:

> A document can be deleted.

This does not explain:

- who can delete it,
- in which state,
- whether deletion is permanent,
- what happens to related records,
- or what audit evidence remains.

## Specifying only successful behaviour

Requirements often omit:

- invalid input,
- duplicate operations,
- unauthorized actions,
- dependency failure,
- timeouts,
- concurrency,
- cancellation,
- partial success,
- and recovery.

These are common locations for defects and security failures.

## Treating all requirements as equal

Without prioritization, teams may spend substantial effort on low-impact qualities while leaving critical integrity or recovery behaviour undefined.

Useful categories may include:

- mandatory,
- important,
- desirable,
- and explicitly deferred.

Priority must reflect impact and evidence, not only stakeholder seniority.

## Using absolute words carelessly

Words such as:

- always,
- never,
- all,
- immediate,
- zero,
- and unlimited

create strong obligations.

Sometimes they are correct:

> An unauthorized operation must never change persisted state.

Sometimes they are unrealistic:

> Search results must always be immediate.

Absolute language should be used only when the system can reasonably guarantee and verify it.

## Performance targets without workload

> Requests must complete within one second.

This is incomplete without:

- request type,
- concurrency,
- data volume,
- environment,
- dependency conditions,
- and percentile or measurement method.

## Availability without exclusions

An availability target should define whether it includes:

- planned maintenance,
- dependency outages,
- regional failures,
- and degraded service.

Without a measurement boundary, teams may calculate the same target differently.

## Security as a final checklist

Adding “must be secure” after design does not identify:

- assets,
- actors,
- trust boundaries,
- abuse cases,
- authorization rules,
- or investigation evidence.

Security requirements must be connected to product behaviour and system boundaries.

## Conflicting requirements

Examples:

- retain all audit data forever,
- delete all personal data immediately on request.

Or:

- require strict synchronous confirmation from every dependency,
- remain available when those dependencies fail.

Conflicts must be exposed and resolved through priorities, legal interpretation, architecture, or scope decisions.

## Requirements that cannot be tested

A requirement may be impossible to verify because:

- its expected result is subjective,
- important conditions are missing,
- no observable output exists,
- the test environment cannot reproduce the workload,
- or the requirement combines several independent behaviours.

The answer is not necessarily to create more tests. The requirement may need to be rewritten.

## Treating acceptance criteria as the complete system specification

A few happy-path Given/When/Then scenarios do not automatically cover:

- domain invariants,
- security rules,
- quality attributes,
- operational requirements,
- or behaviour outside the examples.

Examples support understanding. They do not eliminate the need to state important general rules.

## Ignoring testability

A system may be difficult to verify because:

- time cannot be controlled,
- external dependencies cannot be substituted,
- state cannot be observed,
- failure cannot be safely injected,
- test data cannot be isolated,
- or operations have uncontrolled side effects.

Testability is an engineering quality, not merely a concern for the testing team.

---

# 10. When are the current requirements no longer correct?

Requirements are based on assumptions and context. They should be reviewed when that context changes.

Common review triggers include:

- the original product problem changes,
- new actors or roles appear,
- usage or data volume grows,
- legal or contractual obligations change,
- new threats or abuse patterns are discovered,
- an external dependency changes,
- operational incidents expose missing behaviour,
- performance measurements contradict earlier estimates,
- users do not achieve the expected outcome,
- verification cost becomes disproportionate,
- or architecture makes an important requirement impractical.

A requirement may also be technically satisfied while no longer serving the product need.

For example:

- the system meets a two-second response target,
- but users still cannot complete the workflow efficiently.

The performance requirement is satisfied, but the underlying usability or workflow problem remains.

Requirements must therefore remain connected to:

```text
Problem
→ user need
→ capability
→ measurable outcome
```

Requirements should be controlled, reviewed, and versioned when important, but they should not be treated as permanent truth.

---

# Generic worked example

## Capability

> Authorized coordinators can create, assign, and track equipment-maintenance requests.

## Functional requirements

### FR-1 — Create a request

> An authorized coordinator can create a maintenance request containing an equipment identifier, problem description, and reported priority.

### FR-2 — Initial state

> When a valid request is created, the system assigns a unique identifier, records the creator and creation time, and places the request in the `OPEN` state.

### FR-3 — Assignment

> An authorized coordinator can assign an `OPEN` request to an active technician.

### FR-4 — Invalid assignment

> An assignment request for an inactive technician is rejected and does not change persisted request state.

### FR-5 — State transitions

> An assigned technician can change an assigned request from `ASSIGNED` to `IN_PROGRESS` and from `IN_PROGRESS` to `COMPLETED`.

### FR-6 — Terminal state

> A completed request cannot return to an operational state without an explicitly authorized reopen operation.

### FR-7 — Controlled failure

> If request creation fails before persistence is complete, the system does not expose a successful result or leave a partially created request.

## Business rules and invariants

- Only active technicians can receive new assignments.
- A completed request has a completion time.
- A request cannot be simultaneously assigned to two primary technicians.
- An unauthorized operation does not change persisted state.
- A successful request has exactly one stable identifier.

## Quality requirements

### Security

> Only authenticated users with the coordinator role can assign a maintenance request.

> Users can access only requests belonging to organizations they are authorized to access.

> Assignment and completion operations record the actor, time, previous state, new state, and result.

### Performance

> With 50,000 open requests and 300 concurrent authenticated users, 95% of filtered request-list operations complete within two seconds.

### Reliability

> Once request creation is reported as successful, the request remains available after an application restart.

> Retrying the same creation operation with the same idempotency identifier does not create a duplicate request.

### Availability

> During normal operating hours, the request-reading capability meets its agreed availability target, excluding explicitly defined planned maintenance.

### Recoverability

> The service has documented and verified recovery procedures for restoring persisted requests after infrastructure failure.

### Observability

> Internal failures produce structured diagnostic events containing a correlation identifier and controlled failure category without exposing credentials or sensitive request content.

### Testability

> Request state transitions can be verified through stable system interfaces without requiring direct manual database modification.

## Constraints

- The system must integrate with the existing organizational identity provider.
- Maintenance records must follow the organization’s established retention policy.
- Assignment data must be exchangeable with the existing equipment-management system.

## Acceptance examples

### Successful assignment

```gherkin
Given an open maintenance request
And an active technician
And an authorized coordinator
When the coordinator assigns the request to the technician
Then the request becomes assigned
And the technician is recorded
And the assignment actor and time are recorded
```

### Inactive technician

```gherkin
Given an open maintenance request
And an inactive technician
And an authorized coordinator
When the coordinator attempts the assignment
Then the operation is rejected
And the request remains open
And no technician is assigned
```

### Unauthorized assignment

```gherkin
Given an open maintenance request
And an authenticated user without assignment permission
When the user attempts to assign a technician
Then the operation is rejected
And persisted request state remains unchanged
And a security-relevant result is recorded
```

This example separates:

- required behaviour,
- domain truth,
- quality expectations,
- environmental constraints,
- and concrete acceptance evidence.

---

# Requirement quality checklist

Before accepting a requirement, ask:

## Purpose

- Which product problem or user need does it support?
- Which capability does it belong to?
- Is it necessary for the current capability boundary?

## Clarity

- Is the actor identified?
- Are important terms defined?
- Does the statement describe one coherent expectation?
- Is it free from avoidable ambiguity?

## Behaviour

- Are preconditions clear?
- Is the expected system response clear?
- Are state changes and outputs clear?
- Are invalid and failure cases included where important?

## Quality

- Is the quality attribute identified?
- Is the relevant environment or workload stated?
- Is there an observable response?
- Is the target measurable?

## Security

- Are identity and authority clear?
- Are protected resources and data clear?
- Are trust boundaries or abuse cases relevant?
- Does failure preserve security and data integrity?
- Is investigation evidence required?

## Reliability and operations

- What happens during dependency failure?
- Can the operation be retried?
- Can a retry create duplicates?
- What recovery and diagnostic evidence are required?

## Verification

- Can the requirement be tested or otherwise verified?
- Is the expected result objective?
- Are acceptance criteria representative rather than only happy-path?
- Can the required environment and data be created safely?

## Cost and priority

- What will implementation and verification cost?
- Which quality attribute may conflict with it?
- Is the requirement mandatory, important, desirable, or deferred?
- What evidence justifies the priority?

## Lifecycle

- Who owns the requirement?
- Which assumptions support it?
- What change would trigger review?
- How will important changes be communicated and versioned?

---

# Main idea

Functional requirements define what behaviour the system must provide.

Quality requirements define how well and under which conditions that behaviour must be delivered.

Business rules express domain policy.

Constraints limit solution choices.

Invariants define conditions that must remain true.

Acceptance criteria provide concrete verification evidence.

The reusable reasoning chain is:

```text
Capability
→ required behaviour
→ quality expectations
→ rules and invariants
→ constraints
→ acceptance evidence
→ design and implementation
→ verification and operational evidence
→ review when assumptions change
```

A professional engineer does not ask only:

> Does the feature work?

The stronger questions are:

> Does it produce the intended outcome, under the required conditions, while preserving security, integrity, reliability, and operational responsibility—and can we prove it?