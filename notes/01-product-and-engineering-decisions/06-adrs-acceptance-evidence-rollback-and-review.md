# Architecture Decision Records, Acceptance Evidence, Rollback, and Review

## Why should decisions be recorded?
During software development, teams make many decisions. They choose how information will be stored, how parts of the system will communicate, which technology will be used, and which quality is most important in a particular situation. The code shows **what** was built, but it does not always explain **why** it was built that way.

Several months later, another developer may see a decision and think: > Why did the team choose this solution?

If the original reasoning is missing, the team may repeat old discussions, remove something important, or continue using a decision that is no longer suitable.
Important decisions therefore need a small and understandable record.

## What is an Architecture Decision Record?
An Architecture Decision Record, usually called an **ADR**, is a short document that records an important engineering decision and the reasoning behind it.
Despite the word “architecture,” an ADR is not limited to large system diagrams. It can record any decision that has an important or lasting effect on the system.

An ADR usually explains:
- the situation or problem,
- the available options,
- the chosen option,
- the reasons for the choice,
- the expected consequences.

The goal is not to prove that the decision is perfect.
The goal is to make the decision understandable and reviewable.

## A simple ADR structure

A small ADR can use the following structure:

# Decision title
## Status: Proposed, accepted, or superseded.
## Context: What problem are we trying to solve? Which requirements and constraints matter?
## Options considered: Which reasonable alternatives were examined?
## Decision: Which option was selected?
## Consequences: What benefits, costs, limitations, and risks does the decision create?

The document should be clear enough for someone who did not attend the original discussion.
It does not need to contain every conversation or technical detail.

## Which decisions need an ADR?
Not every code change needs an ADR. Changing a private function name or adjusting the spacing of a button is usually easy to understand and reverse.
An ADR is more useful when a decision:

- affects several parts of the system,
- creates a long-term dependency,
- is difficult or expensive to reverse,
- introduces an important trade-off,
- limits future options,
- may be questioned again later.

For example, choosing how services communicate may deserve an ADR. Choosing the name of a temporary local variable usually does not.
The record should be proportional to the importance of the decision.

## ADR status
A decision can change over time. For this reason, an ADR usually has a status.

**| Status | Meaning |**
| Proposed      | The decision is still being considered                                    |
| Accepted      | The decision has been approved                                            |
| Superseded    | A later ADR has replaced the decision                                     |
| Deprecated    | The decision is still present but should no longer be used for new work   |

An old ADR should usually remain in the repository even when the decision changes. Deleting it also deletes part of the system’s history.
Instead, the old record can point to the new decision that replaced it.

## What is acceptance evidence?
Acceptance evidence is information showing that a requirement or expected outcome has been satisfied.

A statement such as: > The feature looks correct.

is an opinion, not strong evidence.

Evidence may include:

- an automated test result,
- a successful integration test,
- a manual acceptance result,
- a build or static analysis result,
- an observed system measurement,
- a review against agreed acceptance criteria.

The type of evidence should match the requirement.

For example, a unit test may show that a calculation is correct. It does not prove that the entire user workflow works with a real database.

A full user-interface test may show that the workflow works. It may not explain every calculation edge case.

Good acceptance evidence answers:

> What did we verify, under which conditions, and what was the result?

## Evidence and confidence

Testing cannot prove that a system will never fail.

It provides evidence that specific behaviours worked under specific conditions.

Different evidence supports different kinds of confidence.

| Expected outcome | Possible evidence |
|---|---|
| A calculation is correct | Unit tests |
| An API and database work together | Integration tests |
| A user can complete a workflow | End-to-end or manual acceptance test |
| The code follows type rules | Type checking |
| The application can be produced for release | Successful build |
| A response meets a performance target | Performance measurement |

A long list of passing tests is useful only when those tests represent meaningful risks and requirements.

The purpose of evidence is not to collect green check marks. It is to support a clear acceptance decision.

## What is rollback?
Rollback means returning from a problematic change to a previous safe state. A new release may pass its tests and still cause an unexpected problem in the real environment.
The team therefore needs to understand how the change can be stopped or reversed. A rollback plan may explain:

- which version is considered safe,
- how the previous version can be restored,
- what happens to newly created data,
- how the team will confirm recovery,
- who makes the rollback decision.

Rollback should be considered before release, not only after a failure begins.

## Code rollback is not always enough

Reverting application code may be simple. However, a release can also change:

- database structure,
- stored data,
- external messages,
- files,
- user permissions,
- third-party systems.

These effects may continue even after the previous code version is restored. For example, if a release changes stored data into a new format, the old application may no longer understand that data. A complete rollback plan therefore considers the state of the whole system, not only the source code.
Sometimes a safe forward fix is more practical than returning to the previous version. The important point is to understand the available recovery options before they are needed.

## What is decision review?
A decision review examines whether an earlier decision is still appropriate. A decision can be reasonable when it is made and become unsuitable later.
The situation may change because:

- the number of users increases,
- requirements change,
- a new risk appears,
- operational costs grow,
- the team gains new information,
- the original constraint no longer exists.

Review does not mean that every decision should be reopened constantly. It means that important decisions should be reconsidered when relevant evidence or conditions change.
An ADR helps this review because it preserves the original context. The team can compare the old assumptions with the current reality.

## How do these concepts connect?
An engineering decision has a lifecycle.

Understand the context
→ Compare the options
→ Record the decision
→ Implement the change
→ Collect acceptance evidence
→ Release and observe
→ Roll back if necessary
→ Review when conditions change

The ADR records the reasoning. Acceptance evidence shows whether the implementation achieved the expected result.
Rollback provides a recovery option if the change causes unacceptable problems.
Review checks whether the decision remains suitable over time.
Together, these practices make decisions visible rather than allowing them to disappear inside the code.

## A simple example

Imagine a team developing a maintenance request system. The team must decide where requests will be stored.
It considers two options:

1. storing requests in local files,
2. using a relational database.

The relational database is selected because several users must access the same information and the requests must remain consistent. The ADR records the context, both options, the chosen database approach, and its consequences. One consequence is that the system now requires database operation, backup, and schema management.
After implementation, the team collects acceptance evidence:
- valid requests can be saved,
- invalid requests are rejected,
- saved requests can be retrieved,
- information remains available after the application restarts.

Before releasing the change, the team also considers rollback. 
If the new version fails, can the previous application version still read the database? 
Has the database structure changed? 
Would restoring a backup remove newly created requests? 

Later, if the number of requests or operational needs changes, the team can review the original decision using real evidence.

## Common confusion

### An ADR is not a complete design document

An ADR records one important decision and its reasoning.

Detailed diagrams, API contracts, or implementation plans may belong in separate documents.

### An ADR is not a meeting transcript

The document does not need to record everything everyone said.

It should preserve the context, meaningful alternatives, decision, and consequences.

### Tests are not automatically sufficient evidence

A passing test is valuable only if it verifies a relevant expectation under meaningful conditions.

### Rollback is not simply “use Git revert”

Reverting code does not automatically reverse database changes, external actions, or modified data.

### Changing a decision does not mean the original decision was wrong

The original choice may have been correct for the original requirements and constraints.

A later decision can replace it because the situation has changed.

## Engineering and testing perspective

ADRs help developers understand which system properties are intentional.

They also help testers identify important consequences and risks.

If an ADR chooses asynchronous messaging, testing may need to consider delayed processing and duplicate messages.

If an ADR chooses a shared database, testing may need to consider data consistency and concurrent access.

Acceptance evidence connects decisions and requirements to observable results.

Rollback thinking encourages the team to test failure and recovery, not only successful behaviour.

Decision review then uses production experience, test results, incidents, and changing requirements to determine whether the original choice remains appropriate.

## Main idea

An **ADR** records an important decision, its context, alternatives, and consequences.
**Acceptance evidence** shows whether the expected result has been achieved.
A **rollback plan** explains how the system can recover from an unacceptable change.
A **decision review** checks whether an earlier choice is still suitable.

Make the reasoning visible
→ Verify the result
→ Prepare for failure
→ Learn from evidence
→ Review when reality changes

Good engineering is not only making decisions. 
It is making those decisions understandable, testable, recoverable, and open to improvement.