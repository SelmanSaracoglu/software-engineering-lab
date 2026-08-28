# Trade-offs, Prioritization, and Constraints

## Learning objective

Software engineering decisions are made under limited:

- time,
- money,
- people,
- knowledge,
- infrastructure,
- operational capacity,
- and tolerance for risk.

A system cannot maximize every desirable quality at the same time and at no cost.

The purpose of this note is to explain how engineers:

- identify genuine constraints,
- separate constraints from assumptions and preferences,
- recognize competing quality attributes,
- prioritize requirements and risks,
- compare options transparently,
- make deliberate trade-offs,
- and review decisions when their original conditions change.

The objective is not to find a universally perfect solution.

The objective is to choose the most appropriate solution for the current problem, evidence, risks, and constraints.

---

# 1. What is the problem?

Software products usually contain more desired work than a team can safely deliver at once.

Stakeholders may simultaneously request that a system be:

- delivered quickly,
- inexpensive,
- secure,
- highly available,
- easy to use,
- easy to change,
- strongly consistent,
- fast under heavy load,
- fully observable,
- compatible with legacy systems,
- and simple to operate.

These goals are individually reasonable, but their implementations may compete for the same resources.

For example:

- stronger authorization may add implementation and testing effort,
- more redundancy may improve availability but increase infrastructure and operational complexity,
- synchronous confirmation may provide immediate consistency but reduce availability when a dependency fails,
- extensive audit logging may improve investigation capability but increase storage, privacy, and access-control obligations,
- aggressive caching may improve response time but make data freshness and invalidation more difficult,
- faster delivery may reduce short-term cost but increase future maintenance or reliability risk.

Without explicit prioritization, teams do not avoid trade-offs.

They make them accidentally.

Common accidental outcomes include:

- the easiest work is completed before the most valuable work,
- visible features are prioritized over data integrity,
- performance is optimized before it becomes a real problem,
- testing and operational work are postponed until the end,
- stakeholder seniority determines priority,
- temporary assumptions become permanent architecture,
- and every request is labelled urgent.

The engineering problem is therefore:

> How do we use limited resources to protect the most important outcomes and risks while accepting the consequences of what we defer or simplify?

---

# 2. How do the concepts work?

## Trade-off

A trade-off is a decision in which improving, protecting, or accelerating one concern creates a cost, limitation, or risk somewhere else.

A trade-off does not always mean one quality becomes objectively worse.

Sometimes one decision improves several qualities together.

For example:

- clear module boundaries may improve maintainability, testability, and security,
- database constraints may improve integrity and reduce application complexity,
- automated deployment checks may improve both delivery speed and reliability.

However, even beneficial improvements require:

- implementation effort,
- learning,
- maintenance,
- infrastructure,
- or operational ownership.

The trade-off may therefore be between the improvement and its total cost rather than between two directly opposing qualities.

A useful trade-off statement contains:

```text
We prioritize [driver or outcome]
over [competing concern]
because [evidence and context].

We accept [consequence or risk]
and mitigate it through [control, limit, or review trigger].
```

Example:

> We prioritize data integrity over maximum write throughput because duplicate financial records would create a high operational and legal impact. We accept lower peak throughput and will review the decision if measured demand approaches the supported capacity.

## Priority

A priority expresses the relative importance or sequence of work, risk, requirement, or quality.

Priority answers:

- What must be protected first?
- What should be delivered first?
- What deserves the strongest verification?
- What can be simplified?
- What can be deferred?
- What will not be included?

Priority is meaningful only when it changes a decision.

If every item is “high priority,” no priority exists.

## Constraint

A constraint is a condition that limits the available solution space.

Examples:

- data must remain in a particular legal region,
- the system must integrate with an existing identity provider,
- an external protocol cannot currently be changed,
- a safety-related release requires independent approval,
- a fixed regulatory deadline exists,
- the current operations team cannot support a new always-on infrastructure component.

Constraints can be classified in several ways.

### Hard constraint

A hard constraint cannot be violated within the current decision.

Examples:

- a legal data-residency requirement,
- an externally controlled protocol,
- a contractual deadline,
- a supported medical-device interface,
- a mandatory safety control.

A hard constraint may still change later, but the current team cannot simply ignore it.

### Soft constraint

A soft constraint expresses a strong preference or current limitation that may be negotiable.

Examples:

- preference for an existing programming language,
- preference for the current cloud provider,
- limited familiarity with a new technology,
- desire to reuse an existing internal service,
- preference for a particular release day.

Soft constraints should not be presented as permanent truths.

### Internal constraint

An internal constraint originates within the organization or product environment.

Examples:

- current team capacity,
- supported deployment platform,
- internal security policy,
- existing operational ownership,
- available skills.

### External constraint

An external constraint originates outside the immediate team.

Examples:

- law,
- regulation,
- external API contract,
- customer contract,
- hardware interface,
- industry protocol.

### Product constraint

A product constraint limits what the capability can or must provide.

Example:

> The capability must work for users with intermittent network access.

### Technical constraint

A technical constraint limits implementation or integration choices.

Example:

> The system must exchange data with an existing service using its current protocol.

### Organizational constraint

An organizational constraint arises from ownership, structure, skills, or coordination.

Example:

> Only one operations team is available to support production incidents.

## Assumption

An assumption is something treated as true for planning or decision-making without complete evidence.

Examples:

- usage will remain below 10,000 requests per day,
- most users will access the system from desktop devices,
- the external service will normally respond within two seconds,
- one team will continue owning the capability,
- data growth will remain predictable.

An assumption is not automatically a constraint.

Compare:

```text
Assumption:
Traffic will remain below 10,000 requests per day.

Constraint:
The currently approved infrastructure supports no more than
10,000 requests per day at the required response time.
```

An assumption should have:

- evidence,
- an owner,
- a confidence level,
- and a review trigger.

When an assumption changes, decisions based on it must be reconsidered.

## Preference

A preference is a desired option that is not required by the problem or an unavoidable constraint.

Example:

> The team prefers Technology A because it already has operational experience with it.

This can be a legitimate decision factor.

However, it must not be rewritten as:

> The system must use Technology A.

unless there is a genuine constraint requiring it.

## Dependency

A dependency is a person, system, service, process, decision, or resource required for an outcome.

Examples:

- identity provider,
- payment processor,
- database,
- approval team,
- external data source,
- deployment platform,
- regulatory review.

A dependency creates:

- scheduling risk,
- availability risk,
- security boundaries,
- contract risk,
- and operational ownership questions.

## Decision driver

A decision driver is a requirement, quality attribute, constraint, or risk important enough to influence architecture or delivery.

Examples:

- protection of sensitive records,
- ability to recover from failure,
- very low response-time requirement,
- strict auditability,
- fixed external protocol,
- high cost of duplicate processing,
- ability to deploy independently.

Not every requirement is an architectural driver.

A colour preference may be a valid product requirement but probably does not determine the system architecture.

## Risk

Risk combines uncertainty with potential impact.

A simple reasoning model is:

```text
Risk = likelihood × impact
```

This does not require false mathematical precision.

Qualitative categories may be sufficient:

- low,
- medium,
- high,
- critical.

Risk analysis should also consider:

- detectability,
- reversibility,
- exposure duration,
- affected users or assets,
- and recovery cost.

## Opportunity cost

Opportunity cost is the value lost by choosing one use of resources instead of another.

If a team spends two weeks optimizing a low-volume query, those two weeks cannot simultaneously be used to:

- protect an authorization boundary,
- improve test reliability,
- automate deployment,
- or deliver a higher-value capability.

“Can we build it?” is therefore not enough.

The stronger question is:

> Is this the best use of the available capacity compared with the alternatives?

## The decision relationship

```text
Product outcome
→ requirements and quality attributes
→ constraints and assumptions
→ risks and dependencies
→ available options
→ trade-off analysis
→ priority decision
→ implementation and verification
→ operational evidence
→ review
```

---

# 3. What prioritization and decision options exist?

No single prioritization method is suitable for every decision.

Methods are thinking aids, not automatic decision engines.

## Mandatory, Important, Desirable, Deferred

A simple classification can separate work into:

- mandatory,
- important,
- desirable,
- deferred.

### Mandatory

The product increment cannot be accepted without it.

Examples:

- core user outcome,
- legal obligation,
- critical security boundary,
- data-integrity invariant,
- essential recovery behaviour.

### Important

The item creates significant value or reduces meaningful risk but may be delivered in a later controlled increment.

### Desirable

The item provides useful value but has lower impact or stronger alternatives.

### Deferred

The item is intentionally excluded from the current boundary.

Deferred does not mean forgotten.

A deferred item should have a reason and, where useful, a review condition.

## MoSCoW

MoSCoW classifies work as:

- Must have,
- Should have,
- Could have,
- Won’t have now.

Advantages:

- simple,
- understandable,
- useful for capability boundaries.

Risks:

- too many items become “Must,”
- categories may be based on negotiation power rather than evidence,
- “Won’t” may be misunderstood as permanently rejected,
- items within one category remain unordered.

A useful rule is:

> A “Must” item must have a clear consequence if omitted.

If no one can explain what fails without it, it may not be mandatory.

## Impact–effort comparison

Items are compared by expected impact and required effort.

Typical categories include:

- high impact, low effort,
- high impact, high effort,
- low impact, low effort,
- low impact, high effort.

Advantages:

- exposes inexpensive improvements,
- makes opportunity cost visible,
- supports early planning.

Risks:

- impact and effort estimates may be unreliable,
- security and operational risks may be undervalued,
- “easy” work may appear more valuable than foundational work,
- necessary high-effort work cannot always be avoided.

## Risk-based prioritization

Work is prioritized according to the probability and impact of failure.

This is especially useful for:

- test strategy,
- security controls,
- data integrity,
- migration,
- recovery,
- concurrency,
- external integrations,
- and irreversible operations.

Advantages:

- directs attention toward meaningful failure,
- connects engineering and testing priorities,
- exposes low-frequency but high-impact scenarios.

Risks:

- likelihood may be guessed without evidence,
- visible risks may receive more attention than systemic risks,
- low-probability catastrophic events may be dismissed,
- teams may focus only on failure and ignore user value.

## Cost of delay

Cost of delay asks what is lost while an item remains unfinished.

Delay may create:

- lost revenue,
- continued manual effort,
- legal exposure,
- security exposure,
- operational incidents,
- blocked dependent work,
- or missed learning.

This helps distinguish two equally valuable capabilities when one becomes much more expensive if delayed.

Risks:

- financial values may be invented,
- long-term engineering work may be underestimated,
- benefits may be easier to quantify than prevented failures.

## Weighted decision matrix

A weighted decision matrix compares options against explicit criteria.

Example:

| Criterion | Weight | Option A | Option B |
| --- | ---: | ---: | ---: |
| Data integrity | 5 | 5 | 4 |
| Delivery speed | 3 | 4 | 2 |
| Operational simplicity | 4 | 5 | 2 |
| Independent scaling | 2 | 2 | 5 |
| Team experience | 3 | 5 | 2 |

A score can make reasoning visible, but it does not create objective truth.

Advantages:

- makes criteria explicit,
- exposes why an option is preferred,
- allows stakeholders to challenge weights and assumptions.

Risks:

- numerical scores may create false precision,
- an unacceptable option may appear acceptable through averaging,
- criteria may overlap,
- weights may be manipulated to justify a preferred solution.

A mandatory constraint should normally act as a gate, not merely another weighted criterion.

## Architectural drivers

A smaller set of high-impact requirements, risks, and constraints can be identified as architectural drivers.

Examples:

- strict isolation between organizations,
- offline operation,
- very high write throughput,
- independently regulated subsystems,
- hard recovery target,
- irreversible external transactions.

Architectural drivers help prevent every requirement from influencing architecture equally.

## Incremental prioritization

Instead of deciding the complete final system at once, the team can prioritize a coherent vertical capability and gather evidence.

Example sequence:

```text
First:
Create and safely persist a request.

Then:
Assign and process the request.

Then:
Add notifications and reporting.

Later:
Add forecasting or automation if evidence supports it.
```

Advantages:

- produces early evidence,
- reduces simultaneous uncertainty,
- keeps decisions more reversible,
- supports focused testing.

Risks:

- early increments may create temporary limitations,
- poorly selected slices may not produce a complete user outcome,
- temporary design decisions may become permanent without review.

## Experiment or technical spike

When uncertainty is the primary risk, a limited experiment may be more valuable than a large implementation.

A spike can investigate:

- performance limits,
- external API behaviour,
- technology suitability,
- migration feasibility,
- failure modes,
- or security controls.

A spike should define:

- the question,
- time limit,
- expected evidence,
- and what decision the result will inform.

A prototype is not automatically production-ready software.

---

# 4. What are the selection criteria?

Prioritization should consider several dimensions together.

## User and product outcome

Ask:

- Which item directly enables the intended capability?
- Which omission prevents the user from completing the outcome?
- Which item is useful but not essential to the current boundary?
- What happens if nothing is delivered?

## Impact of failure

Ask:

- Could failure cause data loss?
- Could it create unauthorized access?
- Could it affect safety or legal obligations?
- Could it create incorrect financial or operational decisions?
- How many users or systems are affected?
- Is the effect reversible?

## Evidence and uncertainty

Ask:

- Is the need supported by observation?
- Is the workload measured or estimated?
- Is the threat plausible?
- Is the dependency behaviour known?
- Which assumption is least certain?
- Would a small experiment reduce the uncertainty?

High uncertainty does not always mean “do not proceed.”

It may mean:

> Prioritize learning before committing to an expensive decision.

## Reversibility

Ask:

- Can this choice be changed cheaply?
- Does it create persistent data or an external effect?
- Does it become embedded in public contracts?
- Will other teams or customers depend on it?
- Does migration become more expensive over time?

Reversible decisions can often be made quickly.

Irreversible or expensive-to-reverse decisions deserve stronger evidence and review.

## Security, privacy, legal, and safety obligations

Ask:

- Is the item mandatory because of law, contract, or policy?
- Does it protect a high-value asset?
- Does it establish an authorization or trust boundary?
- Does it prevent a difficult-to-detect integrity failure?
- Is the risk accepted by someone with the authority to accept it?

Security work should not automatically be labelled highest priority without analysis.

However, mandatory security and safety boundaries must not compete with optional features as if they were equivalent preferences.

## Reliability and operational ownership

Ask:

- Can the system be operated with the available team and skills?
- Who detects and responds to failure?
- Is recovery possible?
- Does the option create a new 24/7 dependency?
- Can the system be deployed and rolled back safely?
- Is enough operational evidence available?

A feature without operational ownership is incomplete.

## Performance and scale

Ask:

- Is there evidence of a current or near-future bottleneck?
- What workload must be supported?
- What is the cost of missing the target?
- Can capacity be increased later?
- Does optimization reduce maintainability or correctness?

## Testability and quality evidence

Ask:

- Which risks require the strongest verification?
- Can the behaviour be isolated and controlled?
- Can failure conditions be reproduced?
- Which test level provides useful evidence at reasonable cost?
- Does the option make critical behaviour observable?
- Will deferred testing create an unsafe release decision?

Prioritization applies to testing as well as implementation.

High-risk areas usually deserve earlier and deeper verification, such as:

- authorization,
- data integrity,
- irreversible operations,
- state transitions,
- concurrency,
- recovery,
- and external contracts.

Test priority should be based on product risk, not only code coverage or implementation order.

## Total cost of ownership

Ask:

- What does implementation cost?
- What does verification cost?
- What infrastructure is required?
- What operational support is required?
- What maintenance and upgrade cost follows?
- What migration cost appears later?
- What other work will be delayed?

## Dependency and sequencing

Ask:

- Does this item unblock several others?
- Is another team or external system required?
- Is there a deadline outside the team’s control?
- Can the capability be divided without creating inconsistent temporary behaviour?
- Which work belongs on the critical path?

## A practical prioritization sequence

A useful reasoning sequence is:

1. Remove options that violate hard constraints.
2. Identify the product outcome and critical invariants.
3. Identify high-impact security, safety, legal, and integrity risks.
4. Separate known facts from assumptions.
5. Compare viable options using relevant decision drivers.
6. Identify what is sacrificed by each option.
7. Choose the smallest coherent increment that produces useful evidence.
8. Define verification and operational evidence.
9. Record deferred work and accepted risk.
10. Define review triggers.

---

# 5. What are the security effects?

Security decisions contain trade-offs, but security must not be treated as an optional decoration.

## Security versus usability

Examples:

- stronger authentication may create user friction,
- short session lifetime may reduce exposure but interrupt work,
- detailed authorization may create more administration,
- strict input limits may reject unusual but legitimate use.

The goal is not to remove security controls for convenience.

The goal is to design controls proportional to:

- asset value,
- threat,
- actor,
- context,
- and failure impact.

## Security versus performance

Examples:

- encryption consumes processing capacity,
- authorization checks add work to protected operations,
- security scanning increases pipeline time,
- detailed validation increases request processing,
- audit events create storage and I/O.

These costs should be measured and designed responsibly.

“Performance” is not a valid reason to remove a necessary trust boundary without understanding the resulting risk.

## Security versus availability

Examples:

- fail-closed behaviour may protect integrity but prevent legitimate access during dependency failure,
- fail-open behaviour may preserve availability but permit unauthorized action,
- aggressive rate limits may reduce abuse but block legitimate demand.

The correct choice depends on the capability.

For example:

- a public content page may tolerate degraded authorization dependencies differently from a financial approval operation,
- a safety-critical state change may need to fail closed,
- a low-risk read operation may allow a controlled cached result.

## Observability versus privacy

More telemetry may improve:

- incident investigation,
- debugging,
- detection,
- and auditability.

It can also expose:

- personal data,
- credentials,
- tokens,
- business-sensitive information,
- and long-term behavioural records.

Logging decisions must prioritize useful evidence while minimizing unnecessary sensitive data.

## Security debt

A team may deliberately defer a security improvement when:

- the affected capability is not yet exposed,
- a temporary compensating control exists,
- the risk is understood,
- an owner accepts the risk,
- and a review or removal date exists.

Unrecorded security debt is not a deliberate trade-off.

It is an unmanaged risk.

## Security priority questions

- What asset is protected?
- Which actor or threat can affect it?
- What is the impact?
- How likely or exposed is the scenario?
- Can the event be detected?
- Can the effect be reversed?
- Which control is mandatory?
- Which control is a defence-in-depth improvement?
- Who can accept the remaining risk?
- When will the decision be reviewed?

---

# 6. What are the performance and scalability effects?

Performance work competes with:

- delivery time,
- correctness,
- maintainability,
- infrastructure cost,
- and operational simplicity.

## Latency versus throughput

A system may optimize individual response time or total work completed over time.

These goals are related but not identical.

Batching may improve throughput while delaying individual items.

Immediate processing may reduce individual latency while using more resources.

## Performance versus consistency

A cached or replicated result may be returned quickly but may not contain the newest state.

The acceptable trade-off depends on the capability.

Examples:

- slightly stale public analytics may be acceptable,
- stale authorization or account-balance data may not be acceptable.

## Performance versus cost

More processing capacity may improve response times but increase infrastructure cost.

The decision should consider:

- observed load,
- expected growth,
- peak demand,
- response-time target,
- and cost of missing the target.

## Optimization versus maintainability

Highly specialized optimizations may:

- make code harder to understand,
- create more states,
- complicate testing,
- increase coupling,
- and make future changes risky.

Optimization should be based on measurement.

The useful sequence is:

```text
Define meaningful target
→ measure current behaviour
→ locate bottleneck
→ compare options
→ implement the smallest justified change
→ measure again
```

## Performance budgets

A performance budget allocates an acceptable limit to a capability or component.

Examples:

- maximum response-time percentile,
- maximum payload size,
- maximum page-load size,
- maximum processing duration,
- maximum resource usage.

A budget makes the trade-off visible before every component independently consumes the available capacity.

---

# 7. What are the reliability and operational effects?

Reliability improvements often require:

- redundancy,
- recovery mechanisms,
- retries,
- queues,
- monitoring,
- backups,
- failover,
- and operational procedures.

These mechanisms add complexity and cost.

## Availability versus complexity

Running several service instances may improve availability.

It also requires:

- traffic distribution,
- coordinated deployment,
- health checks,
- shared or replicated state,
- monitoring,
- and failure diagnosis.

Redundancy without operational capability can create more failure modes rather than dependable availability.

## Retries versus duplicate effects

Retries may recover from temporary failure.

They may also repeat an operation.

Examples:

- create duplicate records,
- charge twice,
- send repeated notifications,
- apply the same state change more than once.

Retry decisions must consider:

- idempotency,
- operation identity,
- timeout behaviour,
- and visibility of the original result.

## Consistency versus availability

When distributed components cannot communicate, a system may need to choose between:

- refusing an operation to protect consistency,
- or accepting temporary divergence to preserve availability.

This is not a purely technical preference.

The correct decision depends on the business invariant and recovery process.

## Deployment speed versus change risk

Frequent small deployments may reduce batch size and make change easier to understand.

They require:

- automated checks,
- controlled deployment,
- observability,
- rollback or forward-fix capability,
- and disciplined ownership.

Slower deployment does not automatically mean safer deployment.

Large infrequent releases may accumulate more interacting changes and increase recovery difficulty.

## Operational simplicity as a priority

Operational simplicity deserves explicit consideration.

A design that is elegant in code but difficult to deploy, observe, secure, recover, or support may not be the best system design.

Ask:

- Can the team understand the failure modes?
- Can it detect failure?
- Can it recover?
- Can it test recovery?
- Can it support the system outside normal development conditions?

---

# 8. What are the complexity and cost effects?

Complexity is not only the number of lines of code.

It includes:

- number of components,
- number of states,
- number of dependencies,
- number of deployment units,
- number of owners,
- number of failure modes,
- amount of configuration,
- amount of required knowledge,
- and difficulty of changing the system safely.

## Essential complexity

Essential complexity comes from the real problem.

Examples:

- multiple legally distinct roles,
- unavoidable external integrations,
- genuine concurrent operations,
- required audit history,
- complex but necessary domain rules.

## Accidental complexity

Accidental complexity comes from how the solution is designed.

Examples:

- unnecessary service boundaries,
- duplicated data models,
- premature abstraction,
- excessive configuration,
- custom infrastructure without a demonstrated need,
- too many tools solving overlapping problems.

Engineering cannot eliminate all essential complexity.

It should avoid introducing accidental complexity without sufficient value.

## Total cost of ownership

A decision’s cost includes:

```text
Acquisition or creation
+ implementation
+ testing
+ deployment
+ infrastructure
+ monitoring
+ incident response
+ maintenance
+ upgrades
+ migration
+ retirement
```

The cheapest implementation may not have the lowest total cost.

## Technical debt as a trade-off

Technical debt can be deliberate when:

- speed has a justified value,
- the limitation is understood,
- the affected boundary is controlled,
- consequences are recorded,
- remediation has an owner,
- and a review trigger exists.

Technical debt becomes dangerous when:

- no one knows it exists,
- every future change depends on it,
- it protects a critical invariant poorly,
- or “temporary” has no end condition.

## Cost of coordination

A solution that divides work among many teams may increase:

- meetings,
- contract negotiation,
- deployment coordination,
- incident ownership disputes,
- and cross-team debugging.

Organizational cost must be considered alongside technical design.

---

# 9. What are common mistakes, failure points, and attack points?

## Everything is high priority

If every item is mandatory, the team has avoided making a decision.

Require a clear consequence for each mandatory item.

## Prioritizing by stakeholder authority

A senior person may have important information, but authority does not replace:

- evidence,
- impact analysis,
- user need,
- or engineering risk.

## Treating a preference as a hard constraint

Example:

> We always use this framework.

This may be a useful organizational preference, but it should not prevent comparison when the problem materially differs.

## Treating an assumption as a fact

Example:

> Traffic will always remain low.

If the assumption is not monitored, the system may cross its safe limit without triggering review.

## Solution disguised as requirement

Example:

> The system must use microservices.

Ask which required outcome or constraint makes that solution necessary.

## False precision

A decision matrix score of `4.3` does not make uncertain assumptions scientifically accurate.

Numbers support reasoning only when their meaning and evidence are understood.

## Ignoring opportunity cost

Adding work without identifying what will be delayed creates an unrealistic plan.

Every priority consumes capacity.

## Optimizing the visible feature

User-facing work may receive attention while teams defer:

- authorization,
- migrations,
- recovery,
- monitoring,
- test isolation,
- and operational ownership.

These deferred concerns often determine whether the feature is safe in production.

## Prioritizing tests only after implementation

Testing priorities should be considered while defining risks and requirements.

Otherwise:

- important behaviour may be difficult to test,
- failure conditions may be unobservable,
- and the design may require expensive rework.

## Prioritizing by code coverage

A high coverage number does not prove that the most important risks were tested.

Critical authorization or concurrency behaviour may have less code but greater impact than a large collection of simple formatting functions.

## Sunk-cost reasoning

Past investment does not automatically justify continuing a weak decision.

Ask:

> If we were choosing today with current evidence, would we make the same choice?

## Temporary constraints becoming permanent

A short-term skill or deadline limitation may remain embedded in architecture long after the limitation disappears.

Every temporary constraint needs a review condition.

## Ignoring compound risk

Several individually acceptable compromises can combine into an unacceptable system.

Example:

- weak validation,
- limited monitoring,
- manual deployment,
- and unclear recovery

may together create much greater risk than each item considered separately.

## Security controls without threat context

Adding controls because they are generally recommended can create cost without protecting the most important assets or paths.

Security priority should connect:

```text
Asset
→ threat or abuse case
→ exposure
→ impact
→ control
→ evidence
```

## Unowned accepted risk

A developer or tester should not silently accept business, legal, security, or safety risk beyond their authority.

Accepted risk requires:

- visibility,
- rationale,
- an accountable owner,
- and a review condition.

---

# 10. When is the current choice no longer correct?

A trade-off is valid only while its assumptions and constraints remain valid.

Review the decision when:

- user needs change,
- usage or data volume grows,
- a new legal or contractual obligation appears,
- a security incident reveals a new threat,
- operational incidents expose hidden complexity,
- an external dependency changes,
- team skills or ownership change,
- infrastructure cost changes materially,
- a temporary constraint disappears,
- a deferred capability becomes essential,
- performance measurements approach the current limit,
- accepted technical debt blocks safe delivery,
- or verification evidence contradicts the original expectation.

## Decision review record

A useful decision record includes:

```text
Decision:
What was selected?

Context:
What problem and capability required the decision?

Drivers:
Which requirements, qualities, risks, and constraints mattered?

Options:
Which realistic alternatives were considered?

Trade-off:
What was prioritized and what was sacrificed?

Assumptions:
What was believed to be true?

Accepted risk:
What could still go wrong?

Mitigation:
How is the remaining risk limited or detected?

Evidence:
What supports the decision?

Owner:
Who is accountable for the decision or risk?

Review trigger:
What change requires reconsideration?
```

A decision does not become wrong merely because a better option becomes available later.

It becomes wrong when it no longer satisfies the important outcomes and constraints of its current context.

---

# Generic worked example

## Context

An organization is introducing a system for managing equipment-maintenance requests.

The first capability boundary includes:

- creating a maintenance request,
- assigning it to an authorized technician,
- tracking its operational state,
- and recording completion.

Stakeholders also request:

- real-time analytics,
- mobile offline operation,
- automatic priority prediction,
- notification through several channels,
- advanced reporting,
- and independently deployable services.

## Product outcome

> Coordinators and technicians need a reliable way to record, assign, and complete maintenance work so that responsibility and current state are visible.

## Hard constraints

- Only authorized users can access maintenance records.
- Important state changes must be attributable.
- Existing organizational identity must be used.
- Maintenance records must follow the required retention policy.
- Invalid or unauthorized operations must not change persisted state.

## Current soft constraints

- The team prefers technologies it already operates.
- The current operations team prefers fewer production components.
- The first usable increment is expected within twelve weeks.

These preferences and limitations influence the decision but should be reviewed if the context changes.

## Assumptions

- The first year will contain fewer than 100,000 active maintenance requests.
- Most users will have reliable network access.
- Real-time analytics are not required for operational work.
- One product team will own the initial capability.
- Notification failure should not invalidate a successfully recorded request.

Each assumption requires evidence or a later review trigger.

## Prioritization

| Item | Priority | Reason |
| --- | --- | --- |
| Authorization | Mandatory | Protects organizational data and actions |
| Request creation | Mandatory | Required for the core user outcome |
| Valid state transitions | Mandatory | Protects operational integrity |
| Assignment | Mandatory | Establishes responsibility |
| Persistence and recovery | Mandatory | Successful work must not disappear |
| Audit evidence | Mandatory | Important actions must be attributable |
| Controlled notification | Important | Reduces manual follow-up |
| Basic filtered list | Important | Supports daily operational work |
| Advanced analytics | Desirable | Useful but not required for the first outcome |
| Offline mobile operation | Deferred | Current evidence does not justify its complexity |
| Automatic priority prediction | Deferred | No validated data or decision model exists |
| Independent deployment of every capability | Deferred | No current ownership or scaling need justifies it |

## Main trade-off

The team prioritizes:

- core workflow completeness,
- authorization,
- data integrity,
- testability,
- recovery,
- and operational simplicity

over:

- advanced analytics,
- speculative automation,
- offline synchronization,
- and early distribution into multiple deployment units.

## Accepted consequences

- The first increment provides limited reporting.
- Users need a network connection.
- Notifications may initially support only one channel.
- Some components may need to be separated later if ownership or scaling requirements change.

## Mitigations

- Keep internal responsibilities clearly separated.
- Record relevant state-change events.
- Avoid exposing internal implementation through public contracts.
- Measure workload and response time.
- Review the architecture if scaling, deployment ownership, or availability requirements materially change.
- Keep deferred items visible with reasons rather than pretending they were forgotten.

## Test prioritization

The strongest early verification focuses on:

1. unauthorized access,
2. valid and invalid state transitions,
3. persistence after successful operations,
4. duplicate and retry behaviour,
5. assignment rules,
6. failure without partial state,
7. audit evidence,
8. dependency failure.

Visual refinements and advanced reporting receive proportionally lighter verification until they become more important.

## Review triggers

The decision must be reconsidered if:

- offline work becomes a frequent operational need,
- request volume approaches measured capacity,
- separate teams need independent ownership,
- different capabilities require materially different availability,
- analytics becomes essential for daily decisions,
- or incidents reveal that the simplified design cannot isolate failure safely.

This is a deliberate trade-off.

The team is not claiming that deferred capabilities have no value.

It is protecting the most important current outcome while keeping future decisions open.

---

# Constraint record template

Use the following structure for an important constraint:

```text
Constraint:
What condition limits the available choices?

Type:
Hard or soft?
Internal or external?
Product, technical, legal, operational, or organizational?

Source:
Who or what establishes the constraint?

Rationale:
Why does it exist?

Evidence:
What proves it is real?

Consequences:
Which options does it remove or make more expensive?

Owner:
Who can clarify or change it?

Validity:
How long is it expected to remain true?

Review trigger:
What change requires re-evaluation?
```

---

# Trade-off record template

```text
Decision goal:
What outcome must the decision support?

Decision drivers:
Which requirements, qualities, constraints, and risks matter most?

Options:
Which viable alternatives were considered?

Selected option:
What was chosen?

Prioritized:
What does the decision protect or improve?

Sacrificed:
What becomes weaker, slower, later, or more expensive?

Accepted risk:
What can still go wrong?

Mitigation:
How is the consequence reduced, detected, or recovered?

Evidence:
What supports the choice?

Owner:
Who is accountable?

Review trigger:
When must the decision be reconsidered?
```

---

# Decision checklist

Before prioritizing work or selecting an engineering option, ask:

## Outcome

- Which product problem and user outcome are being protected?
- Is the work inside the current capability boundary?
- What happens if it is not done now?

## Requirements and qualities

- Which functional requirements are mandatory?
- Which quality attributes are architectural drivers?
- Which invariants must never be violated?
- Which qualities compete?

## Constraints

- Which constraints are genuinely hard?
- Which are preferences or assumptions?
- What evidence supports each constraint?
- Who owns it?
- When should it be reviewed?

## Risk

- What is the impact of failure?
- How likely or exposed is the failure?
- Can it be detected?
- Can it be reversed or recovered?
- Who has authority to accept the remaining risk?

## Options

- Which realistic alternatives exist?
- Does any option violate a hard constraint?
- What does each option improve?
- What does each option make worse or more expensive?
- Is a small experiment needed before deciding?

## Delivery

- What is the smallest coherent increment?
- Which work is explicitly deferred?
- What opportunity cost does the decision create?
- Does the plan include testing, deployment, and operational work?

## Testing and evidence

- Which risks require the strongest verification?
- Can important failures be reproduced?
- Can the design be observed and controlled?
- What evidence is required for acceptance?
- Does the test strategy reflect risk rather than implementation size?

## Operations

- Who operates the result?
- How is failure detected?
- How is it recovered?
- Does the option introduce a new production dependency?
- Can the team support its operational complexity?

## Review

- Which assumptions support the decision?
- What metrics or incidents should trigger review?
- When does a temporary compromise expire?
- Is the rationale recorded clearly enough for a future engineer?

---

# Main idea

Engineering is the disciplined management of limited resources, uncertainty, and consequences.

A professional decision does not hide the sacrifice.

It makes the trade-off explicit:

```text
Understand the outcome
→ identify requirements and invariants
→ expose constraints and assumptions
→ evaluate risks and dependencies
→ compare viable options
→ prioritize deliberately
→ record what is sacrificed
→ define verification and operational evidence
→ monitor review triggers
→ change the decision when its context changes
```

The question is not:

> Which option is best in general?

The stronger question is:

> Which option best protects the most important current outcome and risks under the real constraints—and what consequence are we knowingly accepting?