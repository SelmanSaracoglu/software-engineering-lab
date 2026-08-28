# MVP, Vertical Slices, and Incremental Delivery

## Learning objective

Software products contain uncertainty.

A team may be uncertain about:

- whether the problem is important,
- whether users will adopt the proposed workflow,
- whether an integration will work,
- whether the architecture will support the required load,
- whether important failure cases have been understood,
- or whether the product can be operated safely.

Trying to design and build the complete imagined system before receiving evidence increases the cost of being wrong.

This note explains how to reduce that risk through:

- Minimum Viable Products,
- minimum viable capabilities,
- vertical slices,
- walking skeletons,
- increments,
- iterations,
- prototypes,
- and incremental delivery.

The purpose is not to deliver unfinished or low-quality software.

The purpose is to produce the smallest coherent result that creates useful value or evidence while preserving essential quality, security, and operational responsibilities.

---

# 1. What is the problem?

Traditional planning may treat software delivery as a large sequence:

```text
Complete requirements
→ complete architecture
→ complete database
→ complete backend
→ complete frontend
→ complete testing
→ deploy everything
```

This approach delays evidence.

The team may spend months building components without proving that:

- the product solves the intended problem,
- the complete workflow works,
- important integrations are possible,
- the architecture can be deployed,
- the system can recover from failure,
- or users understand the result.

Each individual layer may appear nearly complete while no usable capability exists.

For example:

- database tables exist,
- APIs exist,
- interface components exist,
- test infrastructure exists,

but a user still cannot complete one meaningful end-to-end outcome.

This creates several risks:

- integration problems are discovered late,
- incorrect assumptions survive for a long time,
- architecture becomes expensive to change,
- stakeholders see activity but not usable evidence,
- testing is delayed until many decisions are already embedded,
- and the first production deployment contains too much simultaneous change.

Incremental delivery addresses this by shortening the distance between:

```text
Decision
→ implementation
→ integration
→ verification
→ feedback
```

---

# 2. How do the concepts work?

## Minimum Viable Product

A Minimum Viable Product, or MVP, is the smallest product version that can produce meaningful value or learning for a defined user and product question.

The important words are:

- **minimum**,
- **viable**,
- and **product**.

### Minimum

It includes only what is necessary to test the current outcome or assumption.

Minimum does not mean:

- careless,
- insecure,
- untested,
- unreliable,
- or impossible to operate.

### Viable

The result must be coherent enough for its intended purpose.

A version that cannot complete the selected user outcome is not viable merely because some screens or services exist.

### Product

An MVP is more than disconnected technical components.

It must allow the intended user, operator, or stakeholder to experience enough of the capability to produce evidence.

## MVP as an experiment

An MVP should answer a question.

Examples:

- Will users adopt the proposed workflow?
- Can the organization replace the current manual process?
- Can the external integration support the required operation?
- Can the team deliver and operate the capability safely?
- Is the response time acceptable under realistic demand?

Without a defined question, “MVP” may become a label for an arbitrary incomplete release.

A useful MVP statement contains:

```text
Target actor
+ problem or outcome
+ smallest coherent capability
+ assumption being tested
+ evidence required
```

Example:

> For maintenance coordinators who currently track work through email, provide the ability to create and view a persisted maintenance request so that we can determine whether a centralized request record reduces lost and duplicated work.

## Minimum viable capability

A complete product may contain many capabilities.

Instead of asking for the minimum version of the entire future product, a team can define the minimum viable version of one capability.

Example:

```text
Future product:
Complete equipment-maintenance platform

First minimum viable capability:
Create and retrieve a persisted maintenance request
```

This keeps the increment focused while preserving an end-to-end outcome.

## Vertical slice

A vertical slice is a small, end-to-end implementation of behaviour that crosses the necessary system boundaries.

Depending on the system, a vertical slice may include:

- user interaction,
- interface or API contract,
- application behaviour,
- domain rules,
- authorization,
- persistence,
- tests,
- deployment configuration,
- logging,
- and operational evidence.

A vertical slice is organized around a user or system outcome rather than a technical layer.

Example:

```text
Vertical slice:
An authorized coordinator creates a valid maintenance request
and can retrieve the persisted result.
```

This may require a small part of:

- frontend,
- API,
- backend logic,
- database,
- validation,
- authorization,
- testing,
- and deployment.

It does not require completing every future feature in any layer.

## Horizontal slice

A horizontal slice completes work inside one technical layer.

Examples:

- create the complete database schema,
- build all planned API endpoints,
- design every interface screen,
- implement the entire authentication subsystem,
- write all repository classes.

Horizontal work is sometimes necessary.

However, if delivery is organized only horizontally, integrated behaviour and user value appear late.

Compare:

```text
Horizontal delivery:

All database work
→ all backend work
→ all frontend work
→ all testing
```

with:

```text
Vertical delivery:

Create request end to end
→ assign request end to end
→ complete request end to end
→ reporting end to end
```

## Walking skeleton

A walking skeleton is a very small end-to-end implementation proving that the system’s major technical path can work.

It may demonstrate:

```text
User or caller
→ application entry point
→ core processing
→ persistence or dependency
→ response
→ deployment
→ basic observation
```

A walking skeleton usually contains very little business behaviour.

Its purpose is to expose early risks in:

- integration,
- deployment,
- architecture,
- environments,
- data access,
- and system boundaries.

A walking skeleton is not automatically an MVP.

It may prove technical feasibility without yet creating enough user value or product learning.

## Increment

An increment is an integrated addition that leaves the product in a more complete and usable state.

A good increment should be:

- coherent,
- integrated,
- verifiable,
- and compatible with the existing product state.

An increment does not need to be released publicly immediately, but it should not leave the system knowingly broken.

## Iteration

An iteration is a repeated cycle of work and learning.

Example:

```text
Understand
→ design
→ implement
→ test
→ review evidence
→ adapt
```

An iteration is a process cycle.

An increment is a product result.

A team can complete an iteration without producing a useful increment.

A team can also produce an increment through several iterations.

## Incremental development

Incremental development adds the system in usable pieces.

```text
Capability A
→ Capability A + B
→ Capability A + B + C
```

## Iterative development

Iterative development improves or revises an existing result.

```text
Basic search
→ improved search
→ measured and optimized search
→ more usable search
```

Most effective product development is both incremental and iterative:

- new capabilities are added,
- existing capabilities are improved using evidence.

## Prototype

A prototype is an exploratory representation used to learn about:

- workflow,
- usability,
- feasibility,
- risk,
- or technology.

A prototype may be:

- disposable,
- incomplete,
- simulated,
- or intentionally unsuitable for production.

A prototype answers a question.

It does not automatically become production software.

## Proof of Concept

A Proof of Concept, or PoC, investigates whether a particular technical idea is feasible.

Example:

> Can the system read the required data from the external device protocol?

A PoC usually focuses on technical feasibility rather than complete user value.

## Pilot

A pilot exposes a limited but operational version to a controlled real-world group or environment.

A pilot can test:

- workflow,
- adoption,
- operational support,
- performance,
- training,
- and integration.

Unlike a disposable prototype, a pilot may use production-quality components because real users or data are involved.

## Beta release

A beta release is a product version made available to a limited or broader audience before general release.

It may be feature-complete or nearly complete but still used to collect evidence and identify defects.

## The relationship

```text
Uncertainty
→ define question
→ choose smallest useful experiment
→ build coherent vertical slice
→ integrate and verify
→ release or expose safely
→ collect evidence
→ adapt next increment
```

---

# 3. What delivery options exist?

## Big-bang delivery

The complete planned system is built and released as one large delivery.

Advantages:

- may suit indivisible replacement events,
- avoids maintaining several public transitional states,
- may provide a complete experience at first release.

Risks:

- feedback arrives late,
- integration risk accumulates,
- deployment contains many simultaneous changes,
- failure diagnosis is difficult,
- rollback may be complex,
- incorrect assumptions become expensive.

Big-bang release does not necessarily mean development must also be big-bang.

The system can still be developed and integrated incrementally before one controlled release.

## Horizontal delivery

Work is completed by technical layer.

Advantages:

- may suit specialized teams,
- can establish foundations used by several capabilities,
- may be necessary for infrastructure or migration work.

Risks:

- usable outcomes arrive late,
- integration is delayed,
- technical completion can be confused with product progress,
- testing may depend on unfinished layers.

## Vertical-slice delivery

Each increment delivers a narrow end-to-end behaviour.

Advantages:

- produces early integrated evidence,
- reveals boundary and contract problems,
- supports focused acceptance,
- makes progress visible through capability,
- limits simultaneous change.

Risks:

- shared foundations may be implemented repeatedly without care,
- temporary duplication may appear,
- slices may create inconsistent user experiences,
- poor slicing may cause extensive rework.

## Walking skeleton followed by capability slices

The team first proves the technical path, then adds real capabilities vertically.

Advantages:

- exposes deployment and integration risks early,
- creates a stable delivery path,
- supports continuous integration from the beginning.

Risks:

- the skeleton may become over-engineered,
- technical work may continue without producing product value,
- temporary implementation may be mistaken for production readiness.

## Prototype before implementation

The team first tests workflow, design, or technical feasibility.

Advantages:

- reduces uncertainty cheaply,
- supports user feedback,
- may prevent expensive implementation of the wrong design.

Risks:

- stakeholders may assume the prototype is nearly finished,
- disposable code may be promoted to production,
- simulated behaviour may hide real integration or performance problems.

## Feature flags

A feature flag allows behaviour to exist in deployed code while controlling who can access it.

Possible uses:

- gradual rollout,
- internal testing,
- controlled experiment,
- quick disablement,
- tenant-specific availability.

Advantages:

- separates deployment from release,
- supports small rollout groups,
- reduces some release risk.

Risks:

- creates additional system states,
- increases testing combinations,
- old flags may remain permanently,
- configuration mistakes may expose incomplete behaviour,
- flags may be incorrectly used as authorization controls.

A feature flag decides whether behaviour is enabled.

It does not replace permission checks.

## Dark launch

A dark launch deploys or activates a capability without exposing its result to normal users.

It may be used to:

- process copied traffic,
- measure performance,
- verify integration,
- observe resource consumption.

Risks include:

- processing sensitive data without clear purpose,
- causing hidden side effects,
- duplicating external operations,
- and collecting unnecessary telemetry.

## Parallel run

An old and new process operate together for comparison.

This can support:

- migration,
- financial reconciliation,
- safety validation,
- and confidence building.

Risks include:

- inconsistent results,
- duplicated work,
- unclear source of truth,
- higher operational cost,
- prolonged temporary architecture.

---

# 4. What are the selection criteria?

## Product question

Ask:

- What uncertainty are we trying to reduce?
- What must the user be able to accomplish?
- What evidence would change the next decision?
- Is the increment testing value, usability, feasibility, risk, or scale?

## Coherent user outcome

A slice should produce a meaningful result.

Too narrow:

> Display a button that does nothing.

Too wide:

> Build the complete maintenance platform.

More coherent:

> An authorized coordinator can create a valid maintenance request and retrieve the persisted result.

## Risk

High-risk paths should be exercised early.

Examples:

- authorization,
- state transitions,
- payment or irreversible actions,
- external integrations,
- data migration,
- concurrency,
- recovery,
- unusual performance demands.

A first slice does not always need to be the easiest feature.

It may be more valuable to test the most dangerous assumption first.

## Dependencies

Ask:

- Which external systems are required?
- Can they be simulated safely?
- Is the contract stable?
- Does the increment create a real dependency?
- Who owns dependency failure?

## Reversibility

Ask:

- Can the increment be changed or removed safely?
- Does it create persistent data?
- Does it expose a public contract?
- Does another team depend on it?
- Is migration required later?

## Evidence

Define evidence before implementation.

Possible evidence includes:

- user completion rate,
- reduced manual effort,
- valid persisted state,
- controlled failure behaviour,
- performance measurements,
- support feedback,
- security-test results,
- or successful recovery.

## Operational readiness

Ask:

- Can the increment be deployed?
- Can it be disabled or rolled back?
- Can operators identify failure?
- Can data be recovered?
- Are ownership and support clear?

## Quality threshold

“Minimum” applies to scope, not automatically to quality.

Some qualities may be reduced in the first increment.

Examples:

- fewer supported workflows,
- smaller scale target,
- limited reporting,
- one integration instead of several.

Essential qualities must still be protected:

- data integrity,
- required authorization,
- controlled errors,
- safe persistence,
- acceptable recovery,
- and sufficient observability.

## Testability

Ask:

- Can the slice be verified independently?
- Can its data be isolated?
- Can failure be simulated?
- Are important state changes observable?
- Does it create stable contracts for later increments?

## Learning speed

The best first increment may be the one that produces the most valuable evidence soonest, not the one containing the most code.

---

# 5. What are the security effects?

Every released increment changes the attack surface.

A small feature can still introduce:

- a new endpoint,
- a new data store,
- a new authorization decision,
- a new dependency,
- a new file upload,
- a new administrative action,
- or new sensitive telemetry.

## Minimum scope does not mean minimum security

An MVP involving real users or data still requires protection proportional to its risk.

Essential controls may include:

- authentication,
- authorization,
- runtime validation,
- safe error handling,
- secrets management,
- secure transport,
- audit evidence,
- dependency protection,
- and resource limits.

## Security boundaries should appear in the first relevant slice

If a capability requires tenant isolation, the first persisted slice should not temporarily allow every authenticated user to read every record.

Building authorization “later” may embed insecure assumptions into:

- data models,
- API contracts,
- tests,
- and user workflows.

## Feature flags are not authorization

A hidden interface does not protect a backend operation.

Users may still:

- call the endpoint directly,
- modify client behaviour,
- discover the route,
- or replay a request.

Protected behaviour requires server-authoritative authorization.

## Prototype security boundary

A prototype that uses:

- real personal data,
- production credentials,
- real external services,
- or public network exposure

is no longer risk-free simply because it is called a prototype.

Use synthetic data and isolated environments when possible.

## Security evidence per increment

Relevant evidence may include:

- unauthorized actions are rejected,
- rejected operations do not change state,
- input is validated at trust boundaries,
- secrets are not exposed,
- audit events are produced,
- security-relevant failures are observable,
- resource abuse is limited.

## Temporary security decisions

If a control is intentionally deferred, record:

- affected asset,
- threat or abuse case,
- exposure,
- compensating control,
- accountable risk owner,
- and removal or review condition.

---

# 6. What are the performance and scalability effects?

An early vertical slice creates an opportunity to measure the real system path.

This is more useful than optimizing isolated components based only on assumptions.

## Measure the complete path

An end-to-end slice can reveal:

- network latency,
- serialization cost,
- application processing,
- database queries,
- external dependency delays,
- frontend rendering,
- and resource consumption.

## Do not design for imaginary scale

The first increment should support a justified workload and leave reasonable paths for change.

Avoid automatically adding:

- distributed caching,
- complex sharding,
- several services,
- queues for every operation,
- or specialized infrastructure

without evidence.

## Do not ignore known scale requirements

Incremental delivery does not justify ignoring a real contractual or physical limit.

If the capability must handle a known workload, the relevant performance path should be tested early.

## Performance hypothesis

Example:

```text
Assumption:
The first-year workload will remain below
100 concurrent users and 100,000 active records.

Target:
95% of list requests complete within two seconds.

Evidence:
Measured performance test in a representative environment.

Review trigger:
Observed usage reaches 70% of tested capacity.
```

## Performance budget by increment

Each slice should avoid consuming the entire acceptable response-time or resource budget.

A later increment should not discover that the first slice already used all available capacity.

---

# 7. What are the reliability and operational effects?

A vertical slice should include enough operational behaviour to prove it can exist outside a developer’s machine.

## Deployability

Ask:

- Can the slice be built consistently?
- Can configuration be supplied safely?
- Can it be deployed to the target environment?
- Are database changes controlled?
- Can deployment failure be detected?

## Observability

Ask:

- Can important requests be traced?
- Are controlled failure categories visible?
- Can operators distinguish invalid input from internal failure?
- Are sensitive values excluded from logs?
- Are important state changes auditable?

## Recovery

Ask:

- What happens after restart?
- Does successful data remain available?
- Can incomplete work be identified?
- Can a failed deployment be rolled back?
- Can data changes be reversed or repaired?

## Partial failure

A vertical slice often crosses several components.

The team must consider:

```text
UI succeeds but API fails
API succeeds but dependency times out
Database commits but notification fails
Client times out but server completes
Retry repeats a completed operation
```

## Definition of Done

A useful Definition of Done for a releasable slice may include:

- required behaviour implemented,
- relevant authorization enforced,
- runtime validation applied,
- automated checks passing,
- failure behaviour verified,
- data migration controlled,
- observability added,
- deployment process verified,
- rollback or recovery considered,
- documentation updated,
- acceptance evidence recorded.

The exact list should be proportional to the capability and risk.

---

# 8. What are the complexity and cost effects?

## Integration risk appears earlier

Vertical slices may initially feel slower because the team must address:

- contracts,
- persistence,
- environments,
- testing,
- and deployment

from the beginning.

This early cost reveals real integration problems while they are still small.

## Horizontal progress can hide incomplete value

A team may report:

- database 100% complete,
- backend 80% complete,
- frontend 70% complete.

These percentages do not prove that any user outcome works.

A smaller vertical slice may contain less code but provide stronger evidence.

## Temporary duplication

Early slices may contain small duplicated implementations before a stable shared abstraction becomes visible.

Removing every duplication immediately may create premature abstraction.

Ignoring repeated patterns indefinitely may create maintenance debt.

The correct time to extract shared behaviour depends on:

- repetition,
- stability,
- ownership,
- and cost of change.

## Compatibility cost

Each released increment may create:

- stored data,
- public contracts,
- user expectations,
- operational procedures,
- and dependent systems.

Later increments must consider compatibility and migration.

## Feature-flag cost

Every active flag adds possible states:

```text
Feature off
Feature on for internal users
Feature on for selected users
Feature on for everyone
```

Tests, support, and operations may need to understand each state.

Flags should have:

- an owner,
- purpose,
- expected lifetime,
- removal condition.

## Cost of delayed foundations

Not every foundation is premature.

Some capabilities genuinely require early work in:

- identity,
- data integrity,
- deployment,
- auditability,
- migration,
- or recovery.

The decision should be based on the selected vertical capability, not a desire to build every possible foundation.

---

# 9. What are common mistakes, failure points, and attack points?

## Treating MVP as low quality

An MVP with broken integrity, missing authorization, or no recovery does not create reliable evidence.

Users may reject the defects rather than the product idea.

## Building only the happy path

A viable capability also needs proportionate handling of:

- invalid input,
- unauthorized access,
- duplicate actions,
- timeouts,
- dependency failure,
- and persistence failure.

## Building a thin interface over fake behaviour

A clickable interface may be useful as a prototype.

It should not be presented as an integrated product increment if:

- data is not persisted,
- important rules are simulated,
- or failure behaviour does not exist.

## Calling a large first release an MVP

Removing a few optional features from a large plan does not automatically create an MVP.

An MVP should be connected to a specific outcome and question.

## Slice too narrow

Examples:

- create a button,
- define a database table,
- return a static success message.

These may be tasks, not coherent vertical capabilities.

## Slice too wide

Examples:

- complete authentication, reporting, notifications, administration, analytics, and mobile support in one increment.

Large slices delay evidence and increase integration risk.

## Organizing delivery only by component

Completing all frontend or database work first can create unused designs based on untested assumptions.

## Deferring all testing

If tests begin after several slices, the team may discover that:

- behaviour is difficult to isolate,
- failure is impossible to simulate,
- and contracts are already difficult to change.

## Deferring operations

A capability is not production-ready merely because it works locally.

Missing deployment, monitoring, and recovery create delayed risk.

## Deferring authorization

Adding authorization later may require redesigning:

- resource ownership,
- queries,
- contracts,
- and tests.

## Prototype becoming production accidentally

Prototype code may lack:

- validation,
- secure configuration,
- error control,
- maintainability,
- and operational ownership.

Promotion to production requires an explicit assessment.

## Permanent feature flags

Unused flags increase:

- code complexity,
- configuration risk,
- test combinations,
- and attack surface.

## Measuring output instead of outcome

Examples of output metrics:

- number of screens,
- number of endpoints,
- story points completed,
- lines of code.

Outcome evidence asks:

- Can the actor complete the goal?
- Is manual effort reduced?
- Is important state correct?
- Are failures controlled?
- Has uncertainty decreased?

## Ignoring data lifecycle

Even an early increment may create persistent data.

Ask:

- Can the schema evolve?
- Can test data be cleaned?
- Can incorrect data be repaired?
- What happens if the experiment ends?
- Is personal data retained unnecessarily?

## No review or stopping rule

An experiment without a success, failure, or review condition can continue indefinitely without producing a decision.

## Building speculative architecture

A team may build for:

- millions of users,
- many future teams,
- global deployment,
- or independent scaling

before any evidence supports those needs.

## Using incomplete release as risk transfer

Calling software “beta” or “MVP” does not transfer responsibility to users.

The organization still owns foreseeable:

- security,
- privacy,
- integrity,
- and operational risks.

---

# 10. When is the current approach no longer correct?

Incremental delivery remains useful in most contexts, but the release strategy may need to change.

Review the current approach when:

- the capability cannot safely expose partial behaviour,
- a legal or safety approval applies to the whole release,
- an indivisible data migration is required,
- old and new protocols cannot coexist,
- partial rollout would create inconsistent financial or medical decisions,
- a dependency supports only one coordinated cutover,
- transitional states create greater risk than one controlled release,
- or the cost of maintaining compatibility exceeds the value of staged delivery.

Even when production release must occur at once, development can still use:

- internal vertical slices,
- continuous integration,
- controlled environments,
- feature flags,
- parallel verification,
- and repeated recovery testing.

Incremental development does not require uncontrolled incremental exposure.

## Review triggers for an MVP

An MVP should be reconsidered when:

- the target question has been answered,
- evidence rejects the original assumption,
- users cannot complete the intended outcome,
- operational cost exceeds expected value,
- security or legal risks change,
- adoption grows beyond the supported boundary,
- temporary controls are no longer sufficient,
- or the product needs to transition from experiment to dependable service.

An MVP is a stage, not a permanent excuse for missing quality.

---

# Generic worked example

## Product problem

Maintenance coordinators lose visibility because requests are distributed across email, spreadsheets, and informal messages.

## User need

Coordinators need one reliable way to record, assign, and track maintenance work.

## Future product vision

The future system may include:

- request creation,
- assignment,
- technician workflow,
- notifications,
- reporting,
- offline mobile use,
- asset history,
- analytics,
- and automatic prioritization.

Building the full vision before receiving evidence would create substantial uncertainty and integration risk.

## Product question

> Will coordinators use a centralized persisted request workflow, and can the team operate it safely?

## Walking skeleton

The first technical path proves:

```text
Application entry
→ authenticated request
→ application processing
→ database connection
→ persisted test record
→ controlled response
→ deployment
→ basic diagnostic event
```

This proves technical integration but does not yet provide the complete user outcome.

## Vertical Slice 1 — Create and retrieve a request

### Capability

An authorized coordinator can create a valid maintenance request and retrieve the persisted result.

### Included

- authenticated coordinator,
- required request fields,
- runtime validation,
- stable identifier,
- persisted initial state,
- retrieval,
- controlled errors,
- basic audit and diagnostic evidence,
- integration and end-to-end verification.

### Excluded

- assignment,
- technician workflow,
- notifications,
- reporting,
- offline use,
- analytics.

### Evidence

- valid requests are persisted,
- invalid requests do not create data,
- unauthorized creation is rejected,
- successful data survives restart,
- the request can be retrieved,
- failures can be investigated safely.

## Vertical Slice 2 — Assign a request

### Capability

An authorized coordinator can assign an open request to an active technician.

### Important rules

- only active technicians can be assigned,
- unauthorized assignment is rejected,
- invalid assignment does not change state,
- actor and time are recorded,
- concurrent conflicting assignments preserve the assignment invariant.

### Evidence

- valid assignment succeeds,
- inactive technician assignment fails safely,
- unauthorized assignment changes nothing,
- conflicting operations do not create two primary assignments.

## Vertical Slice 3 — Process and complete work

### Capability

An assigned technician can start and complete the request through valid state transitions.

### Important rules

```text
OPEN → ASSIGNED
ASSIGNED → IN_PROGRESS
IN_PROGRESS → COMPLETED
```

Invalid transitions are rejected without corrupting persisted state.

## Vertical Slice 4 — Notification

A notification is sent after a successful important state change.

The core operation remains valid if notification delivery fails.

This slice introduces:

- asynchronous failure,
- retry behaviour,
- duplicate-notification risk,
- and additional observability needs.

## Vertical Slice 5 — Reporting

Only after operational data and user needs are better understood does the team add reporting.

This avoids designing reports around imagined data and workflows.

## Deferred capabilities

- offline synchronization,
- predictive priority,
- advanced analytics,
- multi-channel notifications.

Each deferred capability has a reason and a review trigger.

## Incremental evidence

| Increment | Primary evidence |
| --- | --- |
| Walking skeleton | Technical path can be built and deployed |
| Create and retrieve | Central persisted record is viable |
| Assignment | Responsibility can be controlled safely |
| Processing | Workflow and state model are valid |
| Notification | Communication improves follow-up |
| Reporting | Accumulated data supports real decisions |

The system grows through complete, verified capabilities rather than disconnected layers.

---

# Vertical-slice template

```text
Slice name:
What coherent outcome does this increment provide?

Actor:
Who receives the outcome?

Product question:
What uncertainty will this slice reduce?

Included behaviour:
What must work end to end?

Explicit exclusions:
What remains outside the slice?

Rules and invariants:
What must remain true?

Security boundary:
Who may perform which actions on which resources?

Data:
What is created, changed, retained, or deleted?

Dependencies:
Which external systems or teams are required?

Failure behaviour:
What happens when validation, persistence, or dependencies fail?

Quality threshold:
What minimum performance, reliability, usability, and recovery are required?

Verification:
What tests and evidence are required?

Operations:
How is the slice deployed, observed, disabled, rolled back, or recovered?

Success evidence:
What result supports continuing?

Failure evidence:
What result supports changing or stopping?

Review trigger:
When must the slice or its design be reconsidered?
```

---

# Decision checklist

Before defining an MVP or vertical slice, ask:

## Purpose

- Which product problem does it address?
- Who is the target actor?
- What user outcome becomes possible?
- What assumption or risk is being tested?

## Viability

- Is the result coherent?
- Can the actor complete a meaningful outcome?
- Is it more than disconnected technical output?
- Is the scope genuinely minimal?

## Boundary

- What is included?
- What is explicitly excluded?
- Which data and state transitions are owned?
- Which dependencies are required?

## Quality

- Which qualities are essential from the first slice?
- Which quality targets can be smaller initially?
- Are security and integrity preserved?
- Is the workload assumption explicit?

## Testing

- Can the slice be tested end to end?
- Are invalid, unauthorized, duplicate, and failure cases considered?
- Are important invariants verified?
- Does the design provide controllability and observability?

## Security

- Does the slice create a new attack surface?
- Is authorization server-authoritative?
- Is external input validated?
- Are sensitive data and secrets protected?
- Are security-relevant events observable?

## Operations

- Can the increment be deployed safely?
- Can it be rolled back or disabled?
- Can operators detect failure?
- Can persistent data be recovered or repaired?
- Is ownership clear?

## Evidence

- What outcome would support continuing?
- What result would require changing direction?
- Which metric represents actual value rather than activity?
- When will the evidence be reviewed?

## Future change

- Does the slice expose a public contract?
- Does it create difficult-to-migrate data?
- Are temporary decisions recorded?
- What condition would justify additional architecture or scale?

---

# Main idea

MVP, vertical slices, and incremental delivery are methods for controlling uncertainty.

They do not remove engineering responsibility.

The reusable reasoning chain is:

```text
Identify the most important uncertainty
→ define the smallest coherent capability
→ deliver it through an end-to-end vertical slice
→ preserve essential quality and security
→ integrate and verify immediately
→ deploy or expose it safely
→ collect product and operational evidence
→ adapt the next increment
```

The goal is not:

> Deliver the smallest amount of code.

The stronger goal is:

> Deliver the smallest responsible end-to-end result that creates meaningful value or evidence and leaves the system in a safe, understandable, and changeable state.