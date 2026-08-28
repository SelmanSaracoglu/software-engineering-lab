# Product Problem, User Need, and Capability Boundary

## Why do we start here?
Software development does not begin with code, a database, or a framework. 
It begins with understanding why a system should exist.
People often describe a software idea by immediately suggesting a feature:

> We need a dashboard.
> We need notifications.
> We need a mobile application.

These statements describe possible solutions. They do not explain the original problem. Before deciding what to build, we should understand:

- who experiences the problem,
- what they are trying to achieve,
- what prevents them from achieving it,
- and which part of that problem the software should solve.

This is the difference between building requested features and solving a real problem.

## What is a product problem?
A **product problem** is an unwanted situation experienced by a person, organization, or system.
>>> Maintenance coordinators cannot easily see which equipment requests are still waiting for action because the information is spread across emails and spreadsheets. This statement explains:

- who experiences the problem,
- what they cannot do reliably,
- why the problem exists,
- and what effect it creates.

Compare it with:
>>> We need a maintenance dashboard.

The dashboard may be a suitable solution, but it is not the problem itself. Other solutions may also exist.
Starting with the problem prevents the team from becoming attached to one implementation too early.

## What is a user need?
A **user need** describes the outcome a person needs to achieve. For the previous problem, the user need could be:

>>> A maintenance coordinator needs to see which requests still require action so that work can be assigned and completed on time.
A user need should normally describe the desired result, not the interface used to produce it.

For example:
>>> The user needs a dropdown.
is usually not a real user need. A dropdown is an interface element.

The underlying need might be:
> The user needs to select one valid request status without entering an unsupported value.
The dropdown is only one possible way to support that need.

## What is a capability?
A **capability** is something the product or system enables its users to do.

Examples include:

- creating a maintenance request,
- approving a document,
- completing a payment,
- recovering an account,
- or investigating a failed operation.

A capability is more stable than a particular screen or technology.
For example: 
>>> Review a submitted document <<< is a capability.

It might be implemented through:
- a web page,
- a mobile application,
- an API,
- or another interface.

The implementation may change while the capability remains the same.

## What is a feature?

A **feature** is a specific piece of product behaviour that helps provide a capability.

For example, the capability: 

>>> Review a submitted document >>> might contain features such as:
- a list of submitted documents,
- an approve button,
- a reject action,
- and a field for the rejection reason.

The difference is:
| Concept       | Meaning                                                           |
| Capability    | What the system enables the user to achieve                       |
| Feature       | A specific behaviour or interface that supports that capability   |

A capability can contain several features. 
Features may change as the team learns more about the user. 
The underlying capability usually changes less often.

## What is a capability boundary?

A **capability boundary** defines what responsibility belongs to the current capability and what remains outside it.

Imagine that we want to provide the capability:

>>> Create and track a maintenance request.

The first version might include:

- creating a request,
- giving it a unique identifier,
- saving it,
- and viewing its current status.

It might intentionally exclude:

- automatic priority prediction,
- advanced analytics,
- offline mobile access,
- and communication with external suppliers.

These excluded features may still be valuable. They are simply not part of the current boundary.
A clear boundary prevents a small capability from growing into an undefined collection of related features.

It also helps the team answer: >>> What must work before this capability can be considered complete?

## How do these concepts connect?

The concepts form a simple reasoning chain:

> Product problem → User need → Capability → Capability boundary → Requirements → Implementation

The **product problem** explains what is wrong.
The **user need** explains which outcome is required.
The **capability** explains what the system will enable.
The **capability boundary** explains how much responsibility the current capability will contain.
The **requirements** later describe the expected behaviour in a testable form.

Only after these questions are understood should the team decide how to implement the solution.

## A simple example
Imagine an organization where equipment problems are reported through email. Some emails are forgotten, two technicians may work on the same problem, and coordinators cannot easily see which requests are still open.

### Product problem
Maintenance coordinators cannot reliably track active equipment problems because requests are spread across emails and personal notes.

### User need
Coordinators need one place where they can record and follow maintenance requests.

### Capability
The system enables an authorized coordinator to create and view a maintenance request.

### First capability boundary
The system will:

- accept the equipment identifier and problem description,
- create a request,
- give it a unique identifier,
- save it,
- and show the saved request.

The system will not yet:

- assign technicians,
- send notifications,
- calculate priority automatically,
- or produce advanced reports.

### Possible features
The capability may be implemented with:

- a request form,
- a submit button,
- a request list,
- and a request-detail view.

The features are not the original goal. They are implementation choices that support the capability.

## Common confusion: problem or solution?

Consider this sentence: > Users need email notifications.
This may appear to describe a need, but it already selects email as the solution.

A better question is: > Why do users need notifications?
The answer may be: > Users do not notice when an important request changes state.
Now the problem is clearer.

Possible solutions might include:

- email,
- an in-application notification,
- a dashboard indicator,
- or a task list.

Understanding the problem allows the team to compare these options instead of automatically building the first requested feature.

## Engineering perspective
Clear product problems and capability boundaries help every engineering activity that follows.
Developers understand which behaviour belongs in the system.
Testers understand which user outcome and risks must be verified.
Architects understand which responsibilities and external systems are involved.
Security work becomes clearer because the team can identify which actors may perform which actions and which data must be protected.

The capability boundary does not need to describe every future possibility. It only needs to make the current responsibility clear enough for the team to design, implement, and test it responsibly.

## Main idea

Software should not begin with: > Which technology should we use?

It should begin with: > Who has a problem, what outcome do they need, and what responsibility should the system take?

Remember the basic distinction:

> A problem explains what is wrong.
> A user need explains the desired outcome.
> A capability explains what the system enables.
> A feature is one part of the solution.
> A capability boundary explains what is included now and what is intentionally left for later.

When these ideas are clear, requirements, architecture, implementation, and testing have a real problem to solve.