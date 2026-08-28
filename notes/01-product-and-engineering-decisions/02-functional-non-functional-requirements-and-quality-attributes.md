# Functional Requirements, Non-Functional Requirements, and Quality Attributes

## Why do requirements matter?

A product problem explains what is wrong. 
A user need explains what the user is trying to achieve.
A capability describes what the system should make possible.

However, these ideas are usually not detailed enough to guide development and testing. 
The team still needs to define the expected behaviour of the system.
This is the purpose of requirements.
Requirements connect a product idea to implementation and testing.

Product problem
→ User need
→ Capability
→ Requirements
→ Implementation
→ Tests and evidence

Without clear requirements, different people may understand the same capability differently.
A developer may build one behaviour, a tester may expect another, and the user may need something else.

## What is a requirement?: 
A requirement is a clear statement about what a system must do or what condition it must satisfy.

>>> An authorized coordinator can create a maintenance request.
> This statement gives the team an expected system behaviour.

A useful requirement should be understandable and testable. 
The team should be able to examine the system and decide whether the requirement has been satisfied.

## What is a functional requirement?
A functional requirement describes **what the system must do**.
It usually describes an action, calculation, state change, input, or output.

Examples include:
- A user can create a request.
- The system assigns an identifier to the request.
- A coordinator can change the request status.
- The system rejects a request with missing required information.

Functional requirements describe **observable behaviour.**
>>> When an authorized coordinator submits a valid maintenance request, the system saves it and assigns it an identifier.

This requirement tells us:
- who performs the action,
- what action is performed,
- what conditions apply,
- what result is expected.

Functional requirements often become the foundation for implementation tasks and functional tests.

## What is a non-functional requirement?
A non-functional requirement describes **how well the system must work** or **under which conditions it must operate**.
It does not usually introduce a new user action. Instead, it places an expectation on the quality of the system.

Examples include:
- The request list should appear within two seconds under normal load.
- Only authorized users should be able to create requests.
- A successfully saved request should remain available after the application restarts.
- The application should be usable on common mobile screen sizes.

Non-functional does not mean unimportant. A system may provide the correct features and still be unusable because it is too slow, unreliable, difficult to understand, or insufficiently protected.

## What is a quality attribute?
A quality attribute is a characteristic used to describe the quality of a system.

Common quality attributes include:
**| Quality attribute | Question it asks |**
| Performance           | How quickly does the system respond?              |
| Reliability           | Does the system continue to behave correctly?     |
| Security              | Who can access or change information?             |
| Usability             | Can users understand and operate the system?      |
| Maintainability       | Can developers safely understand and change it?   |
| Testability           | Can important behaviour be verified effectively?  |

A quality attribute is a general category. A non-functional requirement turns that category into a concrete expectation.

For example:
Quality attribute: Performance
Non-functional requirement: Under normal load, the request list appears within two seconds.

“Performance” tells us which quality we are discussing.
The non-functional requirement tells us what level of performance is expected.

## How are these concepts different?

**| Concept | Meaning |**
| Functional requirement        | What the system must do                           |
| Non-functional requirement    | How well or under which conditions it must work   |
| Quality attribute             | The type of system quality being considered       |

Consider a sign-in capability. They describe different parts of the same capability.

A functional requirement might be: > A registered user can sign in with valid credentials.
A related non-functional requirement might be: > The system temporarily limits repeated failed sign-in attempts.

The first requirement describes the behaviour offered to the user.
The second describes a security condition under which that behaviour must operate.


## Clear and unclear requirements

A requirement such as this is difficult to use: > The application must be fast.
Different people may have different meanings for “fast.” It is also difficult to test consistently.
A clearer requirement is: > Under normal operating conditions, the request list should appear within two seconds.

The same problem occurs with statements such as: > The application must be secure.
Security is too broad to test as a single requirement.
A clearer statement is: > Only authorized coordinators can assign maintenance requests.

Clear requirements replace vague expectations with observable conditions.
Not every requirement needs a number, but the expected result should be understandable.

## Related concepts
Requirements are closely connected to business rules, constraints, and acceptance criteria.

### Business rule
A business rule describes a rule that belongs to the problem domain.

For example: > A completed maintenance request cannot return to the open state.
This rule comes from how the process is expected to work.

### Constraint
A constraint limits the possible solution.

For example: > The system must use the organization’s existing identity provider.
This does not describe a user capability. It restricts how the solution may be designed.

### Acceptance criterion
An acceptance criterion describes a concrete condition used to confirm that a requirement has been satisfied.

For example: > Given an unauthorized user, when the user tries to assign a request, the system rejects the operation.
Requirements explain what is expected. Acceptance criteria help demonstrate that the expectation has been met.

## A simple example

Imagine a system used to coordinate equipment maintenance.

The capability is: > Authorized coordinators can create and track maintenance requests.

Possible functional requirements are:
- A coordinator can create a request with an equipment identifier and a description.
- A successfully created request receives an identifier and the `OPEN` state.
- A request without an equipment identifier is not saved.
- A coordinator can view the current state of an existing request.

Related non-functional requirements might be:
- Only authorized coordinators can create requests.
- Under normal load, the request list appears within two seconds.
- A successfully saved request remains available after the application restarts.

The capability gives us the general ability.
The functional requirements divide that ability into expected behaviours.
The non-functional requirements describe important qualities and operating conditions.

## Common confusion

### A feature is not the same as a requirement
“Request management” may be the name of a feature.
The requirements explain what request management must actually allow and under which conditions it must work.

### Non-functional does not mean optional
Performance, security, reliability, and usability can determine whether a feature is useful in practice.
They are not decorations added after development.

### A technology choice is not automatically a requirement
A statement such as: > Use PostgreSQL. 
is not a quality attribute.

It may be a technical constraint or an engineering decision. The actual requirement might be:
> Successfully saved requests must remain available after an application restart.
PostgreSQL could be one possible way to satisfy that requirement, but it is not the requirement itself.

### Requirements should describe outcomes before solutions
A requirement should usually explain the expected result. 
If it immediately names a technology, framework, or database, the team may commit to a solution before understanding the problem.

## Engineering perspective
Requirements give developers and testers a shared definition of expected behaviour.
Developers use them to decide what the system must implement.
Testers use them to decide what must be verified and what evidence is needed.
If a requirement is ambiguous, both the implementation and the test can be correct according to different interpretations.

For example: > Users can update requests quickly.

This does not clearly explain who can update a request, which information can change, or what “quickly” means.
Clarifying these questions before implementation prevents unnecessary rework.
Requirements do not need to predict every detail of the future. 
They need to be clear enough for the current capability to be designed, implemented, and tested with a shared understanding.

## Main idea
A functional requirement explains **what the system must do**.
A non-functional requirement explains **how well or under which conditions it must work**.
A quality attribute names the kind of quality being considered, such as performance, reliability, security, usability, maintainability, or testability.

Capability
→ What behaviour is needed?
→ What quality is expected?
→ How will we know it works?

Clear requirements help turn a product idea into software that can be understood, implemented, and verified.