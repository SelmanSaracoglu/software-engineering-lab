# YAGNI, Abstraction, and Reversible Decisions

## Learning objective

Software must be able to change, but attempting to predict every future change often makes the current system harder to understand, test, secure, and operate.

Engineers therefore need to balance two risks:

```text
Too little structure
→ duplication, inconsistency, expensive change

Too much speculative structure
→ unnecessary abstraction, coupling, hidden behaviour, expensive change
```

This note explains:

- YAGNI,
- abstraction,
- premature abstraction,
- duplication,
- generalization,
- encapsulation,
- indirection,
- evolutionary design,
- reversible and irreversible decisions,
- and how evidence should determine when additional flexibility is justified.

The objective is not to avoid design.

The objective is to design for the current problem while preserving reasonable options for change.

---

# 1. What is the problem?

Teams frequently try to protect themselves from future requirements.

They may say:

- “We may support many workflows later.”
- “Another team may use this.”
- “We may change databases.”
- “We may need several notification providers.”
- “We may deploy every capability independently.”
- “This should be configurable in case the rules change.”
- “Let us create a generic framework so we never rewrite it.”

Some preparation for change is responsible.

However, speculative flexibility introduces immediate cost for a future that may never appear.

A generic solution may require:

- more interfaces,
- more configuration,
- more states,
- more dependencies,
- more documentation,
- more test combinations,
- more failure handling,
- and more operational knowledge.

The future requirement may also arrive in a different form from the one predicted.

The team then has two problems:

1. the original abstraction is already expensive,
2. the real requirement does not fit it.

At the opposite extreme, a team may refuse all structure in the name of simplicity.

This can produce:

- duplicated business rules,
- inconsistent authorization,
- repeated defects,
- incompatible contracts,
- and changes that must be applied manually in many places.

The real engineering problem is:

> When should we solve only the concrete current problem, and when is there enough evidence to create a reusable abstraction or make a more durable decision?

---

# 2. How do the concepts work?

## YAGNI

YAGNI means:

> You Aren’t Gonna Need It.

It is a principle that warns against implementing functionality or flexibility before there is sufficient evidence that it is needed.

YAGNI does not mean:

- ignore known requirements,
- avoid architecture,
- skip security,
- avoid tests,
- create careless code,
- or refuse all preparation for change.

It means:

> Do not pay the full implementation and ownership cost of a predicted requirement merely because it is imaginable.

A useful YAGNI question is:

> What evidence shows that this additional capability, abstraction, or configuration is necessary now?

## Current need versus possible future need

Compare:

```text
Current requirement:
Send a confirmation email after a successful operation.

Possible future requirements:
- SMS
- mobile push
- postal letter
- webhook
- provider failover
- per-user channel preferences
- delivery scheduling
```

The current system may need:

- one clear notification boundary,
- one email implementation,
- controlled failure behaviour,
- and observable delivery results.

It probably does not yet need a universal multi-channel communication platform.

A small boundary can preserve the option to change without implementing every imagined option.

## Abstraction

An abstraction represents important behaviour or concepts while hiding details that callers do not need to know.

Examples:

- a function hiding a calculation,
- a module hiding database details,
- a repository exposing persistence operations,
- an interface hiding an external provider,
- a domain type representing a validated business concept.

A useful abstraction reduces the amount of knowledge required by its caller.

For example:

```ts
calculateTotal(items)
```

can hide:

- iteration,
- quantity multiplication,
- rounding rules,
- and invalid-item handling.

The caller should need to understand the meaning of the operation, not every implementation step.

## Encapsulation

Encapsulation keeps related data and behaviour together and limits uncontrolled access to internal details.

Abstraction asks:

> Which details should the caller need to understand?

Encapsulation asks:

> Which internal details should the caller be allowed to access or change?

The concepts are related but not identical.

## Indirection

Indirection adds an intermediate layer between a caller and an implementation.

Examples:

```text
Caller → interface → provider
Caller → service → repository → database
Caller → event → handler
```

Indirection can:

- reduce direct coupling,
- create a test seam,
- support replacement,
- centralize policy.

It can also:

- make execution harder to follow,
- hide failures,
- create additional contracts,
- and increase debugging effort.

Every abstraction creates some indirection.

Not every indirection creates useful abstraction.

## Generalization

Generalization changes a solution that handles one concrete case into a solution intended to handle several related cases.

Example:

```text
Concrete:
sendEmail(message)

Generalized:
sendNotification(channel, recipient, content, options)
```

Generalization is valuable when the variants are known and share stable meaning.

It is premature when the future variants are only imagined.

## Premature abstraction

A premature abstraction is created before the team understands the common behaviour and real variation it must represent.

Example:

A team has one approval workflow but creates a configurable workflow engine supporting:

- arbitrary states,
- dynamic transitions,
- custom role expressions,
- scripts,
- timers,
- plugins,
- and conditional branches.

The framework may be impressive, but the product currently needs only:

```text
DRAFT → SUBMITTED → APPROVED
DRAFT → SUBMITTED → REJECTED
```

The generic engine introduces many states and failure modes without current value.

## Duplication

Duplication means similar code or knowledge appears in several places.

Not all duplication has the same risk.

### Textual duplication

Code looks similar.

This may be harmless if the behaviours have different meanings and may change independently.

### Knowledge duplication

The same business rule or decision is expressed in several places.

This is more dangerous.

Example:

```text
Maximum refund amount is calculated in:
- frontend validation,
- API validation,
- service logic,
- reporting code
```

If the rule changes, each copy must change consistently.

### Coincidental similarity

Two pieces of code currently look alike but represent different concepts.

Combining them may incorrectly couple future changes.

The important question is not:

> Do these lines look similar?

It is:

> Must these behaviours change together for the same reason?

## DRY

DRY means:

> Don’t Repeat Yourself.

Its strongest interpretation concerns duplicated knowledge, not merely repeated syntax.

DRY and YAGNI must be balanced.

```text
YAGNI:
Do not create speculative flexibility.

DRY:
Do not maintain the same knowledge inconsistently in many places.
```

A wrong abstraction can be more expensive than temporary duplication.

## Rule of Three

The Rule of Three is a heuristic:

1. implement the first concrete case,
2. tolerate a second similar case while comparing them,
3. consider abstraction when a third case reveals a stable pattern.

It is not a law.

One high-risk security policy may need immediate centralization.

Three visually similar functions may still represent different concepts.

The purpose of the heuristic is to let evidence reveal the abstraction.

## Simple versus simplistic

A simple design contains the minimum structure needed to solve the real problem clearly and safely.

A simplistic design ignores important complexity.

Example:

```text
Simple:
One explicit state-transition policy with controlled invalid cases.

Simplistic:
Directly replace any status with any requested value.
```

YAGNI encourages simplicity.

It does not justify ignoring essential domain, security, failure, or operational complexity.

## Evolutionary design

Evolutionary design allows structure to develop as the team learns from:

- new capabilities,
- repeated changes,
- production behaviour,
- tests,
- incidents,
- and changing constraints.

The general sequence is:

```text
Implement concrete behaviour
→ observe real variation
→ identify stable knowledge
→ create a focused abstraction
→ verify existing behaviour
→ continue evolving
```

Evolutionary design requires the ability to refactor safely.

That usually depends on:

- automated verification,
- clear boundaries,
- understandable code,
- controlled deployment,
- and reversible data changes.

## Reversible decision

A reversible decision can be changed at relatively low cost and risk.

Examples:

- internal function name,
- local component structure,
- unexposed implementation library,
- internal algorithm behind a stable interface,
- temporary internal feature flag.

A reversible decision can often be made quickly with incomplete information.

## Irreversible decision

A fully irreversible software decision is uncommon, but many decisions are expensive or dangerous to reverse.

Examples:

- public API contract used by external consumers,
- persisted data format containing years of records,
- identity model,
- authorization ownership,
- external protocol,
- destructive migration,
- contractual availability commitment,
- irreversible external transaction.

These decisions deserve:

- more evidence,
- explicit alternatives,
- migration analysis,
- review,
- and acceptance evidence.

## One-way and two-way doors

A useful mental model is:

### Two-way door

The decision is easy to enter and leave.

Make it quickly, observe evidence, and change when necessary.

### One-way door

The decision is difficult, expensive, or risky to reverse.

Slow down, compare options, and define migration and recovery before committing.

Most decisions exist on a spectrum rather than being completely one-way or two-way.

## Option value

Option value is the benefit of keeping a future choice available without paying the full cost of implementing it today.

Example:

```text
Current implementation:
One email provider behind a focused internal boundary.

Preserved option:
Replace the provider later.

Not implemented:
A complete multi-provider routing platform.
```

This is different from building the entire future system.

Good design can preserve options through:

- clear ownership,
- small interfaces,
- isolated dependencies,
- controlled contracts,
- and migration-friendly data

without implementing every possible variation.

## The relationship

```text
Current requirement
→ simplest responsible implementation
→ observe real repetition and variation
→ identify stable knowledge
→ abstract only what is understood
→ preserve important options
→ treat difficult-to-reverse decisions with greater care
→ review as evidence changes
```

---

# 3. What implementation and design options exist?

## Direct concrete implementation

Implement the current behaviour directly.

Advantages:

- easy to understand,
- quick to verify,
- minimal indirection,
- low initial cost.

Risks:

- may create duplication,
- may couple business rules to infrastructure,
- may become expensive if change appears quickly.

Appropriate when:

- one case exists,
- the requirement is clear,
- variation is speculative,
- the decision is reversible.

## Local helper or function

Extract a small named operation without designing a broad reusable framework.

Advantages:

- improves readability,
- centralizes one piece of knowledge,
- remains easy to remove or change.

Risks:

- helper collections may become unstructured,
- weak names may hide unclear responsibility.

Appropriate when:

- repeated logic has one stable meaning,
- the boundary is local,
- broader reuse is not yet proven.

## Focused module boundary

Place related behaviour behind a module with explicit responsibility.

Advantages:

- protects ownership,
- limits coupling,
- supports replacement,
- improves testing and reasoning.

Risks:

- requires contract design,
- can become an unnecessary service-shaped layer,
- may expose too many generic operations.

Appropriate when:

- the responsibility is real and stable,
- several callers need the same policy,
- infrastructure details should remain internal.

## Shared abstraction

Create a reusable implementation for several known cases.

Advantages:

- centralizes shared knowledge,
- reduces inconsistent changes,
- can improve security and maintainability.

Risks:

- consumers become coupled,
- special cases may distort the abstraction,
- changes require coordination.

Appropriate when:

- multiple real cases exist,
- their shared behaviour is understood,
- they must change for the same reason.

## Configurable abstraction

Move variation into configuration.

Example:

```text
Allowed transitions are read from configuration
instead of implemented explicitly.
```

Advantages:

- some changes require no code release,
- policy may be adjusted by authorized operators,
- several variants may share one mechanism.

Risks:

- configuration becomes another programming language,
- invalid combinations multiply,
- testing becomes more difficult,
- authorization and audit ownership become unclear,
- runtime failures replace compile-time or build-time failures.

Appropriate only when runtime configurability is a real product requirement.

## Plugin or extension architecture

Define extension points that allow independently developed behaviour.

Advantages:

- supports external or separate ownership,
- can isolate optional capabilities,
- may reduce changes to the core system.

Risks:

- larger attack surface,
- versioning and compatibility obligations,
- lifecycle and failure complexity,
- difficult testing,
- untrusted extension behaviour.

Appropriate when independent extension is a validated capability, not merely an imagined future.

## Generic engine or internal platform

Build a broad system intended to serve many products or workflows.

Advantages:

- may standardize stable cross-product needs,
- may reduce duplicated infrastructure,
- can provide consistent security and operations.

Risks:

- high initial cost,
- unclear product ownership,
- lowest-common-denominator design,
- teams depend on platform priorities,
- extensive compatibility obligations.

Appropriate only when repeated needs, ownership, funding, and operational capability are established.

## External product or managed service

Use an existing service instead of building an abstraction internally.

Advantages:

- faster access to mature capability,
- reduced internal implementation,
- provider may own specialized operations.

Risks:

- vendor dependency,
- data exposure,
- integration constraints,
- recurring cost,
- migration difficulty,
- availability and contract dependence.

The decision should compare total ownership cost, not only initial development effort.

---

# 4. What are the selection criteria?

## Evidence of repetition

Ask:

- How many real cases exist?
- Are they currently implemented?
- Are future cases committed or merely imaginable?
- Do the cases share meaning or only syntax?

## Shared reason for change

The strongest signal for abstraction is:

> These behaviours must change together because they represent the same knowledge.

If similar code may change independently, combining it can create harmful coupling.

## Stability of the concept

Ask:

- Is the domain rule understood?
- Are important variations known?
- Is the terminology stable?
- Does the abstraction have one clear responsibility?

Unstable knowledge is difficult to abstract correctly.

## Cost of being wrong

Ask:

- How expensive is it to remove the abstraction?
- Will many consumers depend on it?
- Will it become a public contract?
- Will it own persisted data?
- Does it cross team boundaries?

The larger the cost of being wrong, the stronger the required evidence.

## Change frequency

Ask:

- Does the behaviour change frequently?
- Do several places require synchronized edits?
- Are defects caused by inconsistent implementations?
- Would centralization reduce real maintenance cost?

## Security and integrity

Ask:

- Does the abstraction enforce an authorization or integrity policy?
- Would duplication create inconsistent protection?
- Could excessive generalization allow unsafe combinations?
- Is the boundary auditable?

## Testability

Ask:

- Does the abstraction make important behaviour easier to control and observe?
- Can it be tested through a stable contract?
- Does it require excessive mocking?
- Does it hide important failure behaviour?

A test seam can be useful, but production design should not become unnecessarily abstract only to satisfy a preferred mocking style.

## Ownership

Ask:

- Who owns the abstraction?
- Who approves changes?
- Who supports failures?
- Are consumers inside one team or distributed across organizations?
- Can one team safely evolve the contract?

## Performance sensitivity

Ask:

- Does the abstraction sit on a high-volume path?
- Does it hide expensive work?
- Does dynamic behaviour prevent optimization?
- Is the performance concern measured?

## Reversibility

Ask:

- Can the decision remain internal?
- Can callers be migrated gradually?
- Can stored data be transformed?
- Can both old and new behaviour coexist temporarily?
- Is rollback possible?

## A practical decision sequence

1. Implement the current behaviour clearly.
2. Keep infrastructure and domain responsibilities identifiable.
3. Observe real duplication and variation.
4. Determine whether cases share knowledge.
5. Compare the cost of duplication with the cost of abstraction.
6. Prefer the smallest abstraction that fits known cases.
7. Keep speculative options outside the public contract.
8. Protect behaviour with verification before refactoring.
9. Record difficult-to-reverse choices.
10. Review the abstraction as new cases arrive.

---

# 5. What are the security effects?

## YAGNI does not justify missing essential security

The following are not speculative when the current capability requires them:

- authentication,
- authorization,
- input validation,
- secrets protection,
- data integrity,
- safe error handling,
- auditability,
- and resource protection.

Example:

> “We will add authorization when multiple organizations use the system.”

If the current system already stores data for different authorization scopes, the security requirement exists now.

## Security abstractions can improve consistency

Centralized, focused security policies may reduce:

- forgotten authorization checks,
- inconsistent role interpretation,
- duplicated validation rules,
- unsafe error responses,
- and incomplete audit events.

Example:

```text
authorizeAssignment(actor, request)
```

may centralize one stable authorization policy.

## Generic security abstractions can hide authority

A highly generic permission engine may introduce:

- complex policy configuration,
- difficult-to-review combinations,
- unclear denial behaviour,
- privilege escalation through misconfiguration,
- and poor investigation evidence.

Security abstractions should make authority easier to understand, not merely more configurable.

## Configuration increases attack surface

Runtime configuration may allow authorized users or attackers to:

- enable unsafe transitions,
- weaken validation,
- alter destinations,
- expose data,
- or disable controls.

Configuration requires:

- authorization,
- validation,
- audit,
- safe defaults,
- and recovery.

## Plugin systems increase trust boundaries

Extensions may execute code, access data, or invoke operations.

A plugin architecture may therefore require:

- isolation,
- permission models,
- signing or verification,
- compatibility control,
- resource limits,
- and incident visibility.

This cost should not be introduced before extension is a real requirement.

## Security versus duplicated policy

Temporary duplication may be acceptable for ordinary presentation logic.

Duplicating critical authorization or cryptographic policy is more dangerous because inconsistent change can create vulnerabilities.

The abstraction threshold should therefore consider risk, not only the number of copies.

---

# 6. What are the performance and scalability effects?

## Abstraction has runtime and reasoning cost

Some abstractions add negligible runtime cost but meaningful cognitive cost.

Others may introduce:

- additional network calls,
- serialization,
- dynamic dispatch,
- repeated allocation,
- reflection,
- extra database queries,
- or generalized processing.

The effect should be measured rather than assumed.

## Generic layers can hide expensive behaviour

A simple-looking operation such as:

```ts
repository.findAll()
```

may hide:

- a large query,
- repeated dependency calls,
- loading unnecessary data,
- or an N+1 access pattern.

Abstraction should hide irrelevant detail without hiding important operational cost.

## Premature optimization is related to YAGNI

Examples include:

- adding cache before measuring latency,
- introducing queues without a throughput need,
- distributing components before a scaling need,
- denormalizing data before query evidence,
- building complex pooling or batching without measurement.

The useful sequence is:

```text
Define target
→ measure
→ identify bottleneck
→ apply focused change
→ verify again
```

## Scalability options can be preserved without implementation

Examples:

- keep stateless request processing where reasonable,
- isolate external dependencies,
- avoid hidden global mutable state,
- use stable operation identity,
- define clear ownership of data.

These choices may preserve future scalability without building a distributed system today.

## Generic solutions may block specialized optimization

A universal abstraction may prevent one high-volume use case from using the most appropriate data access or execution path.

Do not force every case through one abstraction merely to achieve superficial consistency.

---

# 7. What are the reliability and operational effects?

## Abstractions must expose meaningful failure

An abstraction should not convert every failure into an unhelpful result such as:

```text
Something went wrong.
```

Callers may need to distinguish:

- invalid request,
- unauthorized operation,
- dependency timeout,
- conflict,
- unavailable service,
- and internal failure.

Implementation details can remain hidden while failure meaning remains visible.

## Generic retry abstractions can be dangerous

A universal retry wrapper may repeat operations that are not safe to repeat.

Retry behaviour depends on:

- idempotency,
- operation identity,
- timeout meaning,
- side effects,
- dependency contract.

Reliability mechanisms should preserve domain meaning.

## Focused boundaries improve resilience

An external dependency behind a clear boundary can make it easier to:

- define timeouts,
- control retries,
- simulate failure,
- observe duration,
- replace the provider,
- and degrade safely.

## Too many layers harm diagnosis

Excessive indirection may make it difficult to determine:

- where failure occurred,
- which configuration was active,
- which implementation ran,
- and who owns the incident.

Operational understandability is part of maintainability.

## Reversible deployment is different from reversible design

Code rollback may not reverse:

- sent emails,
- external payments,
- deleted records,
- exposed data,
- or irreversible migrations.

A decision is not reversible merely because the application binary can be redeployed.

## Data decisions require special care

Persisted data makes abstraction changes more expensive.

Ask:

- Can both schemas coexist?
- Can old data be migrated?
- Is the migration reversible?
- Can the application read both versions?
- What happens if deployment fails after part of the migration?

---

# 8. What are the complexity and cost effects?

## The carrying cost of abstraction

An abstraction must be:

- understood,
- documented,
- tested,
- versioned,
- debugged,
- operated,
- and changed safely.

Its cost continues after initial implementation.

## Wrong abstraction versus duplication

Temporary duplication usually creates local maintenance cost.

A wrong shared abstraction can create system-wide coupling.

Consumers may begin adding:

- flags,
- optional parameters,
- special cases,
- bypasses,
- and exceptions

until the abstraction no longer has one coherent meaning.

## Boolean-parameter warning

Example:

```ts
processRequest(
  request,
  true,
  false,
  true,
)
```

Multiple boolean flags often indicate that one abstraction is hiding several different behaviours.

Named options improve readability but do not solve an incoherent responsibility.

## Framework-building cost

An internal framework requires more than reusable code.

It may require:

- documentation,
- examples,
- compatibility policy,
- support,
- release management,
- ownership,
- and migration guidance.

Without these capabilities, a “platform” may become an unsupported dependency.

## Cost of delayed abstraction

Avoiding abstraction forever also has cost.

Signals include:

- the same rule changes in many places,
- fixes repeatedly miss one implementation,
- consumers depend on infrastructure details,
- security decisions are inconsistent,
- testing requires duplicated setup,
- and every new variant requires invasive changes.

YAGNI protects against speculative cost.

It does not prohibit responding to observed cost.

## Option-preserving cost

A small boundary may be cheaper than a complete abstraction.

Example:

```text
Dependency-specific implementation
behind an internal module
```

can preserve replacement options without creating a full provider framework.

---

# 9. What are common mistakes, failure points, and attack points?

## Using YAGNI to avoid known requirements

Security, integrity, recovery, and testability are not speculative when the current capability depends on them.

## Abstracting after one example

One implementation does not reveal what is common and what varies.

## Abstracting by visual similarity

Similar-looking code may represent different business concepts.

## Applying DRY mechanically

Removing every repeated line can create coupling between unrelated behaviour.

## Creating a generic name

Names such as:

- manager,
- processor,
- handler,
- engine,
- utility,
- common service

may hide unclear responsibility.

A broad name is often evidence that the abstraction has no stable concept.

## Adding parameters for every new case

If each new consumer requires another option or boolean, the abstraction may not represent one coherent behaviour.

## Leaky abstraction

A leaky abstraction forces callers to understand the hidden implementation.

Example:

A storage abstraction claims to hide the database but exposes:

- database-specific errors,
- query syntax,
- transaction objects,
- and database-specific identifiers.

## Making internal decisions public too early

Once an interface becomes a public contract, changing it requires compatibility and migration.

Keep uncertain decisions internal when possible.

## Confusing test mocking with good architecture

Creating an interface for every function only to mock it can add meaningless indirection.

Test seams should correspond to useful responsibility or dependency boundaries.

## Excessive mocking

Tests may verify interactions with abstractions rather than meaningful system behaviour.

This can make refactoring difficult even when observable behaviour remains correct.

## Generic workflow engines

A configurable engine may allow invalid or unsafe combinations that explicit domain logic would prevent.

## Universal repository abstraction

Trying to hide every database capability behind one generic repository may remove access to:

- transactions,
- constraints,
- efficient queries,
- and database-specific integrity features.

## Speculative provider support

Building for several providers before one real provider works may delay valuable evidence.

## Assuming a decision is reversible

A change may become difficult because of:

- stored data,
- public contracts,
- external consumers,
- operational procedures,
- or user expectations.

## Temporary abstractions becoming permanent

A temporary compatibility layer needs:

- an owner,
- removal condition,
- and monitoring of remaining consumers.

## Hidden security policy

An abstraction that silently applies permissions or filtering may make authorization difficult to review and investigate.

Security-relevant behaviour should remain explicit at the appropriate boundary.

## Abstraction ownership failure

A shared abstraction without an accountable owner may accumulate incompatible requirements from every consumer.

---

# 10. When is the current choice no longer correct?

## When concrete implementation should become abstraction

Review a concrete implementation when:

- several real cases share the same rule,
- changes must repeatedly be synchronized,
- inconsistency creates defects or security risk,
- several callers depend on the same responsibility,
- infrastructure detail is spreading through the system,
- or a stable variation point has become visible.

## When an abstraction should be split

Review an abstraction when:

- consumers change for different reasons,
- special cases dominate the implementation,
- optional parameters continue growing,
- one consumer needs very different performance or reliability,
- ownership becomes unclear,
- or the abstraction name no longer describes one concept.

## When an abstraction should be removed

Consider removal when:

- only one consumer remains,
- the predicted variants never arrived,
- the abstraction adds no useful policy or isolation,
- debugging cost exceeds its value,
- or the underlying implementation is already the real contract.

## When a reversible decision becomes difficult to reverse

Review when:

- external consumers adopt the contract,
- significant data is persisted,
- other teams depend on the behaviour,
- migration cost increases,
- or operational procedures become tied to it.

## Review triggers

Useful triggers include:

- third real variation appears,
- duplicated rule causes a defect,
- security policy diverges,
- a new team becomes a consumer,
- performance evidence contradicts the generic path,
- a public contract is proposed,
- or a data migration becomes necessary.

---

# Generic worked example

## Current capability

An equipment-maintenance system allows an authorized coordinator to assign an open request to an active technician.

The current transition is:

```text
OPEN → ASSIGNED
```

## Speculative proposal

The team proposes a universal workflow engine supporting:

- arbitrary states,
- configurable transitions,
- dynamic role expressions,
- timers,
- scripts,
- plugins,
- and organization-specific workflows.

## Current evidence

The system currently has only one real workflow.

Known rules are:

- only an open request can be assigned,
- only an active technician can receive assignment,
- only an authorized coordinator can assign,
- a successful assignment records actor and time,
- an invalid assignment does not change persisted state.

There is no validated requirement for user-configurable workflows.

## YAGNI decision

Do not build the workflow engine.

Implement the current domain policy explicitly.

Conceptually:

```ts
assignRequest(
  request,
  technician,
  actor,
)
```

The operation owns the current assignment rules.

## Focused abstraction

A focused state-transition policy may still be valuable:

```text
Assignment policy
- validates current request state,
- validates technician eligibility,
- validates actor authority,
- creates the new valid state,
- records required evidence.
```

This is not a universal workflow framework.

It is an abstraction over one stable domain responsibility.

## Preserved options

The design can preserve reasonable future options by:

- keeping transition rules out of interface components,
- keeping authorization server-authoritative,
- isolating persistence details,
- using explicit state values,
- recording stable transition evidence,
- and preventing external consumers from depending on internal implementation.

## Later evidence

The product later introduces:

```text
ASSIGNED → IN_PROGRESS
IN_PROGRESS → COMPLETED
OPEN → CANCELLED
ASSIGNED → CANCELLED
```

The team now has several real transitions.

It can examine:

- shared preconditions,
- actor rules,
- terminal states,
- audit behaviour,
- and invalid-transition handling.

A focused lifecycle abstraction may now be justified.

## Still not justified

The evidence still may not justify:

- arbitrary user-defined states,
- runtime scripts,
- plugins,
- dynamic transition configuration,
- or a cross-product workflow platform.

## Reversible decisions

Relatively reversible:

- internal function names,
- module structure,
- local error representation,
- private implementation details.

More difficult to reverse:

- persisted status values,
- externally documented API contract,
- authorization ownership,
- audit-event schema,
- public transition semantics.

The difficult decisions deserve greater care even while the implementation remains simple.

## Testing consequences

Before refactoring, verification should protect:

- valid transitions,
- invalid transitions,
- terminal states,
- authorization,
- persistence,
- concurrent requests,
- and audit evidence.

Tests should verify observable lifecycle behaviour rather than every internal function call.

This allows the internal design to evolve without losing confidence.

---

# Abstraction decision template

```text
Current problem:
What concrete behaviour must be supported?

Existing cases:
Which real implementations or consumers exist?

Shared knowledge:
What must change together for the same reason?

Known variation:
Which differences are real rather than imagined?

Proposed abstraction:
What responsibility will it own?

Hidden details:
What should callers no longer need to know?

Contract:
What must remain stable for callers?

Security and integrity:
Which policies does the abstraction protect or expose?

Failure:
Which failures must remain visible?

Cost:
What new code, tests, documentation, and operations are required?

Reversibility:
How can the abstraction be changed, split, or removed?

Evidence:
Why is abstraction justified now?

Review trigger:
What new variation would invalidate the current design?
```

---

# Reversibility assessment template

```text
Decision:
What is being selected?

Current scope:
Who and what depend on it now?

Data:
Does it create or transform persistent data?

Contract:
Is it exposed outside the owning module or team?

External effect:
Can it trigger irreversible real-world behaviour?

Migration:
Can old and new behaviour coexist?

Rollback:
Does rollback reverse code only, or also data and side effects?

Operational dependency:
Do support and deployment procedures depend on it?

Cost of reversal:
Low, medium, high, or critical?

Evidence required:
How much analysis is justified before deciding?

Review trigger:
What would increase reversal cost?
```

---

# Decision checklist

Before introducing an abstraction, ask:

## Current need

- Which real problem does it solve?
- How many real cases exist?
- Is the variation observed or predicted?
- Can the current behaviour remain clear without it?

## Meaning

- Do the cases share the same business knowledge?
- Must they change together for the same reason?
- Is there one clear name for the responsibility?
- Are important differences being hidden?

## Scope

- Is a local helper enough?
- Is a focused module enough?
- Is runtime configuration genuinely required?
- Is a plugin or platform capability validated?

## Security

- Does centralization improve consistent protection?
- Could generalization permit unsafe combinations?
- Is authority still explicit?
- Does configuration introduce new attack paths?
- Are audit and failure behaviour clear?

## Testing

- Can behaviour be verified through a stable contract?
- Does the abstraction improve controllability or observability?
- Are tests coupled to implementation details?
- Is excessive mocking hiding real integration risk?

## Performance

- Does the abstraction hide expensive work?
- Is it used on a high-volume path?
- Is runtime flexibility worth its cost?
- Is optimization based on evidence?

## Operations

- Can failures be diagnosed through the abstraction?
- Who owns it?
- Who supports its consumers?
- Does it require versioning or migration?
- Can it be removed safely?

## Reversibility

- Is the decision internal or public?
- Does it affect persisted data?
- Can consumers migrate gradually?
- Can old and new behaviour coexist?
- What makes reversal expensive?

## YAGNI

- What happens if we do not build this now?
- Can a smaller boundary preserve the important option?
- Is the future requirement committed, likely, or merely possible?
- What evidence would justify revisiting the decision?

---

# Main idea

YAGNI does not mean “do no design.”

It means:

> Design for the current problem and known risks without paying the full cost of imagined futures.

Useful abstractions emerge from stable knowledge and real variation.

The reusable reasoning chain is:

```text
Implement the current capability clearly
→ protect essential quality and security
→ observe real repetition and change
→ identify shared knowledge
→ create the smallest justified abstraction
→ keep uncertain decisions internal
→ invest more care in difficult-to-reverse choices
→ verify behaviour before restructuring
→ review when evidence changes
```

The goal is not maximum flexibility.

The stronger goal is:

> Keep today’s system understandable and responsible while preserving tomorrow’s most valuable options at a proportionate cost.