# Product Problem, User Need, and Capability Boundary

## Learning objective

Before choosing architecture, technology, data models, or tests, an engineer must
understand what outcome the system is expected to create and where its
responsibility ends.

This note explains how to distinguish:

- a **product problem**,
- a **user need**,
- a **capability**,
- a **feature**,
- a **requirement**,
- and a **capability boundary**.

The distinction prevents teams from treating a requested implementation as if it
were already the correct solution.

---

# 1. What is the problem?

Software work often begins with a sentence such as:

> We need a dashboard.

That sentence describes a possible solution. It does not establish:

- who has a problem,
- what outcome they cannot achieve,
- how serious or frequent the problem is,
- whether software is the correct response,
- or whether a dashboard is the best implementation.

When the solution is accepted before the problem is understood, several risks
appear:

- unnecessary features are built,
- important users or workflows are missed,
- success cannot be measured,
- architecture is shaped around an assumption,
- tests verify implementation but not value,
- and scope expands without a stable boundary.

The first engineering task is therefore not selecting a framework. It is turning
an uncertain request into a clear, testable problem and capability boundary.

---

# 2. How do the concepts work?

## Product problem

A product problem is an undesirable situation or outcome experienced by an
identifiable actor in a specific context.

A useful problem statement contains:

```text
Actor + goal + context + obstacle or evidence + impact
```

Template:

> [Actor] cannot reliably [goal] when [context] because [observed obstacle],
> resulting in [measurable or observable impact].

A problem statement should not silently prescribe the implementation.

## User need

A user need describes the outcome an actor must be able to achieve. It is more
stable than a requested feature.

Template:

> [Actor] needs to [achieve outcome] so that [value or responsibility].

“The user needs a dropdown” is usually not a user need. It is a proposed
interface. The underlying need may be “the user needs to select one valid status
without entering an unsupported value.”

## Capability

A capability is a stable ability that the product or system provides.

Examples:

- submit an inspection report,
- review and approve a document,
- recover an account,
- reconcile a payment,
- investigate a failed operation.

A capability describes **what the system enables**, not the exact screen,
framework, endpoint, or database table used to enable it.

## Feature

A feature is a concrete product behaviour or interface that contributes to a
capability.

For example:

```text
Capability: Review a submitted document.

Possible features:
- a review queue,
- an approve action,
- a rejection reason field,
- a history view.
```

Capabilities are relatively stable. Features may change as evidence, constraints,
or technology changes.

## Requirement

A requirement is a verifiable statement about expected behaviour or quality.

Examples:

- A reviewer can reject a submitted document with a reason.
- An unauthorized user cannot approve a document.
- A confirmed decision remains available after a service restart.

Requirements turn a capability into testable expectations. Functional and
non-functional requirements are examined in the next note.

## Capability boundary

A capability boundary states what responsibility belongs to the current product
increment and what does not.

It should make the following explicit:

- included actors,
- supported outcomes,
- owned data,
- permitted state changes,
- required integrations,
- important constraints,
- non-goals,
- and acceptance evidence.

“Out of scope” does not mean “unimportant forever.” It means the responsibility
is intentionally excluded from the current decision.

## The relationship

```text
Observed problem
→ user need
→ product capability
→ capability boundary
→ requirements
→ design and implementation options
→ acceptance evidence
```

Skipping directly from a request to implementation removes the reasoning that
should connect these steps.

---

# 3. What options exist?

Teams can frame work in several ways.

| Approach | Starting point | Strength | Main risk |
| --- | --- | --- | --- |
| Solution-led | “Build this screen or service” | Fast when the solution is already proven | Locks assumptions into design |
| Feature-led | A list of desired behaviours | Concrete and easy to schedule | Features may not solve a validated need |
| Outcome-led | A user or business result | Keeps attention on value | Can remain too vague without boundaries |
| Capability-led | A stable ability with explicit responsibility | Connects outcomes to architecture and testing | Requires more early reasoning |

No approach is automatically wrong.

A small, reversible interface change may not require extensive product discovery.
A high-risk, expensive, or irreversible capability needs stronger evidence and a
clearer boundary before implementation begins.

The amount of analysis should be proportional to uncertainty, impact, and the
cost of being wrong.

---

# 4. What are the selection criteria?

Before accepting a proposed capability, evaluate:

## Evidence

- Is the problem observed or only assumed?
- Which users or operators experience it?
- How often does it occur?
- What is the current workaround?

## Impact

- What outcome is harmed?
- Is the effect financial, operational, legal, safety-related, or reputational?
- What happens if nothing is changed?

## Scope and ownership

- Does this product own the problem?
- Is another service, team, or process responsible for part of it?
- Which data and state transitions must the capability own?

## Risk and reversibility

- Can the decision be changed cheaply?
- Could it create data loss, unauthorized access, service interruption, or an
  irreversible external effect?

## Feasibility and dependency

- Which systems, people, policies, and integrations are required?
- Are important assumptions outside the team's control?

## Testability and acceptance

- Can success be observed?
- Can the capability be verified without depending only on subjective opinion?
- What evidence would show that it is safe and ready?

The strongest capability statement is not the longest. It is the one that makes
the important decision boundaries visible.

---

# 5. What are the security effects?

Every new capability can change the attack surface, even when the feature is not
described as a security feature.

Defining the boundary should identify:

- who may invoke the capability,
- which identity or role is trusted,
- what data enters or leaves the system,
- which actions have sensitive or irreversible effects,
- which external systems cross a trust boundary,
- what misuse or abuse is possible,
- and what evidence an investigation would require.

An unclear capability boundary often creates unclear authorization. If the team
cannot state who owns an action and who is allowed to perform it, implementation
will probably rely on accidental or inconsistent access rules.

Security requirements should therefore begin at problem framing, not after the
feature has already been designed.

---

# 6. What are the performance and scalability effects?

A capability statement does not need to invent large-scale requirements. It must,
however, identify conditions that materially change the design.

Examples include:

- expected number of users or operations,
- peak rather than average demand,
- acceptable response time,
- size and growth of retained data,
- real-time versus delayed processing,
- and expensive external dependencies.

Without this context, a team may either under-design a critical operation or
over-engineer a small one.

The principle is:

> Record meaningful constraints now; optimize only when evidence justifies the
> mechanism.

---

# 7. What are the reliability and operational effects?

The boundary must account for the capability's full operational lifecycle, not
only the successful user interaction.

Ask:

- What if the operation partially fails?
- Can it be retried safely?
- Is the result persisted?
- Must an operator recover or correct it?
- Does the capability depend on another service?
- How will support know what happened?
- Which states are valid after restart or deployment?

A capability that creates an important state change may require recovery,
observability, audit, or reconciliation responsibilities. Leaving those outside
the boundary without assigning ownership does not remove the work; it creates an
operational gap.

---

# 8. What are the complexity and cost effects?

Every included responsibility creates implementation and long-term ownership
cost.

Cost includes more than development time:

- testing,
- data migration,
- deployment,
- monitoring,
- support,
- documentation,
- security review,
- dependency maintenance,
- and future change.

A narrow capability boundary reduces the number of assumptions that must be
correct at once. A boundary that is too narrow, however, may produce a workflow
that cannot create a complete user outcome.

The objective is not the smallest possible feature. It is the smallest coherent
capability that produces meaningful evidence and can be operated responsibly.

---

# 9. What are common mistakes, failure points, and attack points?

## Treating a requested solution as the problem

“We need notifications” does not explain who needs which information, when, or
what failure the notification prevents.

## Using vague actors

“The user” may hide several roles with different permissions and responsibilities.

## Defining only the happy path

Failure, cancellation, duplicate operations, recovery, and unauthorized use are
part of the capability boundary.

## Confusing capability with interface

A page, button, endpoint, queue, or table may implement a capability, but none of
them is the capability itself.

## Hiding dependencies

An external identity provider, payment service, device, or manual approval may
control whether the capability can succeed.

## Omitting non-goals

Without explicit exclusions, stakeholders may assume that related behaviours are
included.

## Inventing requirements without evidence

Claims such as “must support millions of users” can create premature complexity
when no plausible demand or obligation supports them.

## Ignoring abuse cases

A legitimate capability may be automated, repeated, manipulated, or invoked by
the wrong actor. The product boundary must include responsibility for preventing
or detecting material misuse.

---

# 10. When is the current choice no longer correct?

A capability boundary should be reviewed when:

- evidence shows that the original problem was misunderstood,
- a different actor or workflow becomes important,
- legal, safety, privacy, or security obligations change,
- usage or data volume exceeds the original assumptions,
- an external dependency changes its contract or reliability,
- operational failures reveal missing ownership,
- the capability becomes shared by several products or teams,
- or the cost of maintaining the boundary becomes greater than reorganizing it.

Changing a boundary is not automatically a failure. Refusing to review it after
its assumptions change is the failure.

---

# Generic worked example

## Initial request

> Build a dashboard for inspection reports.

## Product problem

> Field supervisors cannot reliably determine which submitted inspection reports
> still require review because status information is distributed across email and
> local documents, causing delayed decisions and repeated follow-up.

## User need

> A supervisor needs to identify and review pending reports so that required
> decisions are completed and traceable.

## Capability

> The system enables authorized supervisors to find a submitted report, record a
> review decision, and see the current review state.

## Included in the first boundary

- submitted reports,
- authorized supervisor access,
- pending, approved, and rejected review states,
- a recorded decision time and actor,
- controlled failure responses,
- and evidence that a decision was persisted.

## Explicit non-goals

- real-time collaborative editing,
- automated risk scoring,
- offline mobile synchronization,
- cross-organization reporting,
- and predictive analytics.

## Acceptance evidence

- An authorized supervisor can find and decide a pending report.
- An unauthorized actor cannot record a decision.
- An invalid state change does not alter persisted state.
- A successful decision remains visible after restarting the application.
- A failed operation provides enough controlled evidence for investigation
  without exposing sensitive internals.

The dashboard may become one implementation option, but the decision is now
based on a defined problem and capability rather than the requested screen.

---

# Decision checklist

Before design begins, can the team answer:

- Who experiences the problem?
- What outcome cannot currently be achieved reliably?
- What evidence supports the problem?
- What stable capability should the system provide?
- What is included and explicitly excluded?
- Which actors, data, and state changes are involved?
- Which trust boundaries or abuse cases appear?
- Which scale and reliability constraints are real?
- How will success and safe failure be verified?
- Which assumptions would trigger a review later?

If several answers are unknown, the team may still explore a reversible
prototype. It should not silently treat its assumptions as settled product and
architecture decisions.

---

# Main idea

The reusable reasoning chain is:

```text
Understand the observed problem
→ express the user outcome
→ define the system capability
→ set an explicit boundary
→ derive verifiable requirements
→ compare implementation options
→ collect acceptance evidence
→ review the decision when assumptions change
```

Software engineering begins before code. A clear capability boundary gives
architecture, security, performance, reliability, and testing decisions a stable
problem to solve.

