# YAGNI, Abstraction, and Reversible Decisions

## Why do systems become complicated?

Software often begins with a small and understandable purpose.
As development continues, the team may start thinking about possible future needs:

- What if another type of user appears?
- What if we later support five databases?
- What if this component is reused by many applications?
- What if the system eventually needs millions of users?

These questions can be useful, but they can also cause the team to build solutions for problems that do not yet exist.
The result may be more code, configuration, testing, and maintenance without providing additional value to current users.
YAGNI, careful abstraction, and reversible decisions help control this unnecessary complexity.

## What is YAGNI?
YAGNI means: > You Aren’t Gonna Need It. 
It is a software engineering principle that advises teams not to implement functionality until there is a real and understood need for it.

Suppose a system currently sends only email notifications. The team may consider building a general notification platform that supports email, SMS, mobile push notifications, and several future providers. If none of these additional options is currently required, building the platform may create unnecessary work.

YAGNI suggests implementing the email capability that is actually needed and expanding the design when another real need appears.
>>> Possible future need ≠ Current requirement

The principle does not claim that the future is unimportant. It warns against treating uncertain predictions as confirmed requirements.

## What YAGNI does not mean

YAGNI does not mean:

- ignore known future requirements,
- avoid all planning,
- write careless code,
- remove necessary validation or testing,
- choose a design that is intentionally difficult to change.

The team should still consider the future consequences of current decisions.
The difference is between **preparing for change** and **implementing imagined functionality**.

For example, using clear module boundaries may make future change easier without building unused features today.
That can be responsible design. Building several unused implementations because they may someday be needed is speculative development.

## What is abstraction?
An abstraction represents a concept while hiding details that are not important to its user.

A function is a simple example. Instead of repeating the steps required to calculate a total, the program can provide a function:

```ts
calculateTotal(items)
```
The caller needs to know what the function does. It does not need to know every internal calculation.
Abstractions can make software easier to understand when they represent a real and stable concept.

They can:
- give a meaningful name to behaviour,
- hide unnecessary implementation details,
- reduce repeated logic,
- create a clear boundary between parts of a system.

However, every abstraction also introduces another concept that developers and testers must understand.
An abstraction is useful only when it makes the system clearer or safer than the direct solution.

## What is premature abstraction?
Premature abstraction happens when a team creates a generalized solution before it understands the real pattern or variation. Imagine that two parts of an application display similar information. The team immediately creates one highly configurable component for both situations.
Later, the two screens develop different requirements. The shared component receives more options, conditions, and exceptions.
The abstraction that was intended to simplify the system now makes both behaviours harder to understand.

Observed similarity
→ Immediate generalization
→ New differences appear
→ More conditions and configuration
→ Harder maintenance

The problem is not abstraction itself. The problem is creating it before the team has enough evidence to know what should truly be shared.

## Duplication and abstraction
Duplicated code can create maintenance problems. If the same business rule exists in several places, one copy may be updated while another is forgotten.
However, removing every small duplication immediately can also create the wrong abstraction.
Two pieces of code may look similar today but change for different reasons.
In that situation, keeping them separate for a while can make their real differences easier to discover.

A useful principle is:
> Prefer a small amount of clear duplication over one confusing abstraction.

This does not mean duplication should never be removed.
It means that the team should understand the shared concept before creating a shared solution.

## When does abstraction become useful?
An abstraction becomes more reasonable when:
- the same meaningful behaviour appears in several places,
- the common part is stable and understood,
- duplicated implementations must change together,
- the abstraction makes the calling code easier to understand,
- the shared boundary can be explained clearly.

For example, if several operations must calculate money according to the same rounding rule, a shared calculation function may prevent inconsistent results.
The abstraction represents a real business rule rather than a guessed future possibility.

The question is not only: > Is this code repeated?
The more important question is: > Does this code represent the same concept and change for the same reason?

## What is a reversible decision?
A reversible decision can be changed later without excessive cost or disruption.

Examples may include:
- changing the wording of a button,
- reorganizing a small internal module,
- changing a private function name,
- adjusting a display order.

These decisions still deserve thought, but they usually do not require long analysis because the team can correct them relatively easily.
An irreversible decision is not always literally impossible to reverse.
It is a decision that becomes expensive, risky, or disruptive to change.

Examples may include:
- publishing an API used by external clients,
- choosing a data format stored in millions of records,
- sharing sensitive information with another system,
- depending heavily on a specific platform,
- dividing a system into separately operated services.

The more difficult a decision is to reverse, the more evidence and review it deserves.

## Why does reversibility matter?
Teams have limited time for analysis. If every decision receives the same amount of discussion, development becomes unnecessarily slow.
Reversibility helps determine how much attention a decision needs.

**| Decision type | Reasonable approach |**
| Easy to reverse           | Decide with available information and learn quickly   |
| Difficult to reverse      | Investigate alternatives and consequences carefully   |
| Unclear reversibility     | Identify what would make change expensive             |

A reversible decision supports experimentation. The team can begin with a simple option, observe the result, and change it if necessary.
A difficult-to-reverse decision should be made more carefully because incorrect assumptions may create long-term cost.

## How do these concepts connect?
YAGNI prevents the team from implementing uncertain future needs. 
Careful abstraction prevents the team from generalizing before the real pattern is understood.
Reversible decisions allow the team to begin simply and adapt when evidence appears.

Build what is needed now
→ Keep the solution understandable
→ Avoid unsupported generalization
→ Preserve the ability to change
→ Add complexity when evidence justifies it

Together, these ideas support incremental development. The team does not need to predict the complete future of the system. It needs to make responsible current decisions without creating unnecessary barriers to later change.

## A simple example
Imagine a small document approval system. The current requirement is:

>>> A manager can approve or reject a submitted document.

The team knows that another approval level might be requested in the future, but there is no confirmed requirement.
One option is to build a configurable workflow engine supporting unlimited approval levels, conditional transitions, multiple approver groups, and custom rules.
Another option is to implement the confirmed approval process with clear boundaries and a simple state model.

YAGNI supports the second option.
The team builds the required behaviour without implementing the imagined workflow engine.
It still keeps approval logic separate from the user interface so that future change remains possible.
If real requirements later show several approval processes with shared rules, the team will have evidence for designing a useful abstraction.
The simple current design is also a relatively reversible decision. It can be extended or replaced before many consumers depend on it.

## Costs of unnecessary abstraction
An unnecessary abstraction can affect more than code readability.

It may introduce:
- more configuration that can be incorrect,
- more execution paths that require testing,
- indirect behaviour that is harder to trace,
- additional dependencies,
- broader access to data or operations,
- more failure conditions,
- harder incident investigation.

For example, a generic system that can call many external services has a larger failure and security surface than a direct integration with one required service.
This does not mean generic platforms should never exist. It means their cost should be justified by real needs.

## Common confusion

### Simple does not mean poorly designed
A simple solution can still have clear names, validation, tests, and sensible boundaries.
Simplicity means avoiding unnecessary parts, not ignoring engineering quality.

### Future-aware does not mean future-built
The team may recognize that change is possible and avoid decisions that make it unnecessarily difficult.
It does not need to implement every possible future variation.

### Abstraction is not automatically improvement
A shared interface, base class, generic function, or configuration system is not valuable merely because it looks reusable.
It should reduce real complexity rather than move complexity somewhere less visible.

### Reversible does not mean consequence-free
Changing a reversible decision still requires work and testing.
Reversible means that the cost and risk remain manageable.

### YAGNI is not an excuse to ignore known risks
A possible future feature can wait.
A current risk to data integrity, user safety, or essential system operation may require action even if users do not see it as a feature.

## Engineering and testing perspective
Simple and direct behaviour is usually easier to understand and test. Premature abstraction creates more combinations and branches that may need verification. 
A highly configurable component may require many tests even when the product uses only one configuration. Test failures can also become harder to diagnose because the behaviour passes through several indirect layers.

However, a good abstraction can improve testing when it creates a clear boundary around a stable concept. The goal is not to minimize the number of functions, modules, or interfaces. The goal is to ensure that each one has a clear reason to exist.

When reviewing a proposed abstraction, developers and testers can ask:
- Which current problem does it solve?
- What evidence shows that the shared behaviour is stable?
- Is the direct solution currently easier to understand?
- What new paths or configurations will require testing?
- Can we introduce the abstraction later without unreasonable cost?

## Main idea

**YAGNI** means implementing confirmed needs instead of speculative future functionality.
An **abstraction** hides details behind a meaningful concept.
A **premature abstraction** generalizes behaviour before the real pattern is understood.
A **reversible decision** can be changed later with manageable cost and risk.

The reusable thinking model is:

Start with the real requirement
→ Choose the simplest responsible solution
→ Keep important boundaries clear
→ Delay unsupported generalization
→ Add abstraction when real patterns appear

Good software design does not attempt to predict every future need. It creates a clear system that can change when the future becomes real.