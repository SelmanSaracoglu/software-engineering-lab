# Trade-offs, Prioritization, and Constraints

## Why can we not maximize everything?
A software system is expected to provide useful features, respond quickly, protect information, remain reliable, and be easy to maintain.
The team may also need to deliver it with limited time, money, and people.
These goals are all valuable, but they cannot always receive equal attention at the same time.

Improving one part of a system may increase the cost or complexity of another part. Adding more features may delay delivery. Stronger validation may require additional development and testing. Better performance may require more infrastructure.

Software engineering therefore involves making choices. Trade-offs, priorities, and constraints help us understand those choices.

## What is a trade-off?
A trade-off is a situation in which gaining an advantage in one area requires accepting a disadvantage, cost, or limitation in another area.

For example, a team could improve performance by introducing a cache. The cache may make the system faster, but it also creates new questions:

- When should cached information be updated?
- What happens if the cached information becomes outdated?
- Who will maintain the additional logic?
- Is the performance improvement worth the added complexity?

The decision is not simply between a good option and a bad option. Both options have benefits and costs.

- Without cache: Simpler system, possibly slower responses
- With cache: Faster responses, more complexity

A trade-off does not mean that quality is unimportant. It means that engineering decisions have consequences.

## Common areas of trade-off
Trade-offs can appear between many system qualities.

**| Goal | Possible consequence |**
| More features             | More development and testing time                     |
| Faster delivery           | Less time for lower-priority improvements             |
| Higher performance        | More infrastructure or complexity                     |
| Greater flexibility       | More configuration and more possible failure cases    |
| Simpler user experience   | Fewer advanced options                                |
| Stronger protection       | Additional steps or restrictions for users            |
| Greater reliability       | More redundancy and operational cost                  |

This does not mean these goals always conflict. 
For example, simpler code may improve maintainability, reliability, and security at the same time. 
However, the team should still examine the effects of a decision rather than assuming that every improvement is free.

## What is prioritization?
Prioritization is the process of deciding what should be handled first and what can wait.
A product may have many valid requirements, but the team usually cannot implement all of them at once.
Prioritization helps the team focus on the work that creates the most important value or reduces the most important risk.

A simple classification is:

**| Priority | Meaning |**
| Must have     | The current capability cannot succeed without it              |
| Should have   | Important, but delivery can continue temporarily without it   |
| Could have    | Useful improvement if time and resources allow                |
| Not now       | Intentionally postponed                                       |

“Not now” does not necessarily mean “never.” It means that the item is not important enough for the current stage.

For example, a request system may need users to create and view requests before it needs advanced reporting. Reporting may still be useful, but it should not delay the basic workflow if the workflow is the immediate need.

## How should priority be decided?
Priority should be based on reasons, not personal preference.

The team can ask:
- Does the user need this to complete the main task?
- Does it prevent serious incorrect behaviour?
- Does it reduce an important business or operational risk?
- Is another requirement dependent on it?
- What happens if it is postponed?
- How much effort and complexity does it introduce?

The answers do not automatically make the decision, but they make the reasoning visible.
If everything is called the highest priority, then nothing is truly prioritized.

## What is a constraint?
A constraint is a limit that reduces the available solution options.
Some constraints come from the environment in which the system must operate.

For example:
- The system must work with an existing identity provider.
- The team must deliver the first usable version within three months.
- Personal information must be handled according to applicable regulations.
- The application must support devices already used by the organization.
- The team has limited operational experience with distributed systems.

A constraint is different from a requirement.
A requirement describes an expected behaviour or quality.
A constraint limits how the solution can be created or operated.

Requirement: Authorized employees can access the system.
Constraint: Authentication must use the organization’s existing identity provider.

The requirement explains the expected result.
The constraint restricts the possible implementation.

## Hard and soft constraints
Not every constraint has the same strength. A hard constraint cannot be ignored without making the solution unacceptable.
Examples include legal obligations, mandatory compatibility needs, or a fixed physical limitation.
A soft constraint expresses a strong preference but may be reconsidered when there is sufficient reason.

For example: > The team prefers to use technologies it already understands.

This is a reasonable constraint because unfamiliar technology creates learning and operational costs. 
However, the team may choose another technology if the current tools cannot satisfy an important requirement.
The important question is whether the constraint is truly fixed or merely assumed.

## How do these concepts connect?
Trade-offs, priorities, and constraints describe different parts of the same decision.

Priority: What matters most right now?
Constraint: What limits our available choices?
Trade-off: What do we gain and what do we accept?

A decision becomes clearer when all three are understood.
For example, imagine that a small team is building a maintenance request system.
Its current priority is to let employees report broken equipment and allow coordinators to track those reports.

The team has two important constraints:
- The first usable version is needed within eight weeks.
- The system must use the organization’s existing sign-in service.

The team considers adding real-time notifications. Notifications could help coordinators respond sooner, but they would introduce additional implementation and testing work.
The trade-off is between delivering notifications now and keeping the first version smaller and easier to complete.
The team may decide to begin with an ordinary request list and add notifications later.
This does not mean notifications are useless. They are simply less important than completing the main workflow within the current constraints.

## Necessary quality versus optional improvement
Prioritization should not be used as an excuse to ignore essential quality. For example, the team may postpone an advanced reporting screen. It should not knowingly allow unauthorized users to view private information merely because security work was described as a lower priority.

Some expectations form a minimum acceptable level for the system. The team should distinguish between:

- essential conditions required for safe and correct operation,
- improvements that can be delivered incrementally.

The exact boundary depends on the system. Software controlling medical treatment requires different minimum conditions from a simple personal note application.

## Common confusion

### A trade-off is not automatically a failure
Choosing a simpler solution for the current need can be a responsible engineering decision.
The decision becomes dangerous when the team ignores its consequences or cannot explain why the choice was made.

### A constraint is not the same as an assumption

A team may say: > We must use microservices.
But this may not be a real constraint. It could be a preference or an unexamined assumption.

A useful question is: > What would prevent us from choosing another architecture?
If there is no clear answer, the supposed constraint should be challenged.

### Priority does not describe importance forever
A requirement can be low priority today and become essential later.
Priorities may change when user needs, risks, regulations, or system usage change.

### The most advanced option is not always the best option
A more advanced solution may provide additional capabilities, but it may also require more knowledge, infrastructure, testing, and maintenance.
The best option is the one that fits the current problem and constraints.

## Engineering perspective
Engineering is not only the ability to build a solution. It is also the ability to explain why that solution is suitable.
A clear decision should answer:

- What are we trying to achieve?
- What matters most at this stage?
- Which constraints are real?
- Which alternatives were considered?
- What does the chosen option improve?
- What cost or limitation are we accepting?

These questions also help testers. A tester needs to know which behaviours are essential, which quality expectations matter, and which constraints must be respected.
For example, if compatibility with an existing browser is a hard constraint, testing only on a newer browser does not provide sufficient evidence.
Priorities guide where testing effort should begin. Constraints define conditions that testing must include. Trade-offs reveal areas where new risks may have been introduced.

## Main idea
A **trade-off** explains what we gain and what cost or limitation we accept.
A **priority** explains what matters most at the current stage.
A **constraint** explains what limits the available solution options.

Understand the goal
→ Identify the priorities
→ Confirm the real constraints
→ Compare the available options
→ Understand the trade-offs
→ Make and review the decision

Good engineering does not remove every limitation. It makes limitations, choices, and consequences understandable.