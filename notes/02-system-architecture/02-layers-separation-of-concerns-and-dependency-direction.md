# Layers, Separation of Concerns, and Dependency Direction

## Why does code become difficult to change?

A small program may begin with only a few functions.

As the program grows, the same code may start handling many different responsibilities:

- receiving user input,
- displaying information,
- applying business rules,
- reading from a database,
- creating error responses.
  When these responsibilities are mixed together, changing one behaviour can unexpectedly affect another.

For example, changing how information is displayed should not require rewriting a database query. Replacing a database should not require changing every user-interface component. Separation of concerns and layered architecture help organize these responsibilities.

## What is a concern?

A concern is a responsibility or area of interest within a system.

Examples include:

- user interaction,
- business rules,
- data storage,
- communication,
- authentication,
- logging.
  A concern does not have to be one file or one function. It is a type of responsibility.

For example, “how a maintenance request changes status” is a business concern. “How that status appears on a screen” is a presentation concern. These concerns are related, but they are not the same.

## What is separation of concerns?

Separation of concerns means organizing software so that different responsibilities are handled in different places. Each part of the system should have a clear purpose.

- User-interface code: Collects and displays information
- Business code: Decides which operations are valid
- Data-access code: Reads and writes stored information

This separation makes it easier to understand where a behaviour belongs. It also reduces the number of unrelated reasons for one part of the code to change.

A user-interface change mainly affects presentation code.
A database change mainly affects data-access code.
A business-rule change mainly affects business logic.

Perfect separation is not always possible, but clear responsibility boundaries reduce unnecessary coupling.

## What is a layer?

A layer is a group of software responsibilities at a similar level.

## Presentation layer

The presentation layer receives input and presents results.

In a web application, it may include:

- screens and forms,
- HTTP routes,
- request and response formatting,
- user-facing error messages.

The presentation layer should understand how users or clients communicate with the system. It should not become the only place where important business rules exist. For example, a form may hide an invalid action, but the server-side business logic must still reject that action if a request is sent directly.

## Application layer

The application layer coordinates a use case.

A use case is something the system allows an actor to do, such as:

> > > Create a maintenance request.

The application layer may:

1. receive validated input,
2. ask the domain logic to apply rules,
3. ask the data layer to save the result,
4. return the outcome.

It organizes the steps of the operation. It should not be concerned with the visual appearance of a button or the exact details of a database query.

## Domain layer

The domain layer represents the important concepts and rules of the problem being solved.

For a maintenance system, domain concepts may include:

- maintenance request,
- equipment,
- coordinator,
- request status.

A domain rule might state:

> A completed request cannot return to the open state.

This rule should remain true whether the action comes from a web page, mobile application, or another system. For this reason, important domain rules should not exist only in presentation code. The domain represents what the system means, not how it is displayed or stored.

## Data-access layer

The data-access layer communicates with storage.

It may:

- execute database queries,
- save records,
- retrieve records,
- translate stored data into application objects,
- report storage failures.

This layer understands the details of the chosen storage technology. Other parts of the system should not need to know every query or database-specific detail. If database operations are spread throughout the entire application, changing or testing data behaviour becomes more difficult.

## How does a request pass through the layers?

Imagine that a coordinator creates a maintenance request.

The flow may look like this:

- Presentation → receives the request
- Application → coordinates the operation
- Domain → checks the business rules
- Data access → stores the request

The result then travels back to the presentation layer.
Data access → saved result
Application → operation result
Presentation → response shown to the user

This is a simplified model. Real systems may have different structures, but the central idea remains the same: each part handles a clear responsibility.

## What is a dependency?

A dependency exists when one part of the system relies on another part.

If module A imports and uses module B, module A depends on module B.
Changes in B may therefore affect A.
Dependencies are necessary. Software components must work together.
The engineering question is not how to remove every dependency.
It is how to keep dependencies understandable and controlled.

## What is dependency direction?

Dependency direction describes which parts of the system are allowed to depend on which other parts.
In a simple layered architecture, the presentation layer may depend on the application layer.
The application layer may depend on domain concepts and data-access boundaries.

The important business rules should not depend directly on the user-interface framework.
Otherwise, changing the interface could also require changing the rules.
Similarly, domain concepts should not need to understand HTTP response codes or visual components.

A useful general principle is:

> Technical details should depend on important business concepts more than business concepts depend on technical details.

This helps protect the core meaning of the system from frequently changing tools and frameworks.

## Call direction and dependency direction

The order in which code runs and the direction of code dependencies are related, but they are not always identical.
For example, application logic may ask a storage interface to save information. A database implementation performs the operation.
The application uses the storage capability without needing to know every database detail.
This allows the business operation to be tested with a controlled replacement instead of always requiring a real database.
The important beginner-level idea is that business logic should not be tightly connected to one technical implementation when that connection creates unnecessary difficulty.

## Coupling and cohesion

Two additional concepts help explain good separation.

**Coupling** describes how strongly one part depends on another.
High coupling means that changing one part frequently requires changing several other parts.

**Cohesion** describes how closely the responsibilities inside one part belong together.
A cohesive module has a clear purpose.

Good separation generally aims for: Lower unnecessary coupling + Higher cohesion

For example, a module containing only maintenance status rules is more cohesive than a module containing status rules, database connection code, button styles, and email configuration.

## A simple example

Imagine that a request can be completed only after it has been assigned. If this rule exists only inside a user-interface button, another client could bypass it by sending a request directly to the server.

A better separation is:

- the presentation layer shows the available action,
- the application layer coordinates the completion request,
- the domain layer decides whether completion is allowed,
- the data layer saves the valid state change.

The user interface can still prevent an obvious invalid action. However, the authoritative rule belongs in the domain or business logic. This makes the rule reusable and testable independently of the interface.

## Layer and tier are not the same

A **layer** is a logical separation of responsibilities in the code.
A **tier** is usually a physical or operational separation between running parts of a system.

For example, presentation logic and business logic may be separate layers inside the same application process.
A web application server and a database server may run as separate tiers.

Layer: Logical code responsibility
Tier: Running or deployment boundary

A system can have several logical layers while still being deployed as one application.

## Common confusion

### Creating folders does not automatically create separation

A project may have folders named `presentation`, `domain`, and `data` while responsibilities are still mixed.
Architecture is determined by actual dependencies and behaviour, not only folder names.

### Every operation does not need many layers

A small and simple program may not need separate files for presentation, application, domain, and data access.
Creating empty pass-through layers adds complexity without improving separation.

### Separation does not mean no communication

Layers must communicate to complete a use case.
The goal is controlled communication through clear boundaries.

### Shared code does not automatically belong in a common folder

Code should be shared because it represents a genuinely shared concept.
Moving unrelated utilities into a large common area can make ownership less clear.

### Database rules and domain rules are related but different

A database constraint can protect stored data.
Domain logic explains the business meaning of an operation.
Important rules may need protection at more than one boundary for different reasons.

## Benefits and costs

Clear layers can improve:

- readability,
- maintainability,
- testability,
- consistency,
- replacement of technical details.

They can also introduce costs:

- more files and interfaces,
- additional concepts to learn,
- indirect execution paths,
- unnecessary mapping between similar objects.

Layering is useful when it clarifies real responsibilities.
It becomes harmful when the structure is more complicated than the problem.

## Engineering and testing perspective

Separation of concerns creates smaller and clearer test targets.
Presentation tests can focus on user interaction and displayed results.
Domain tests can focus on business rules without requiring a browser or database.
Data integration tests can focus on real queries and database behaviour.
Full-stack tests can verify that the layers work together through a complete user journey.
Testing also helps reveal incorrect separation.
If a simple business rule can only be tested by starting the entire application and a real database, the rule may be too tightly coupled to technical details.
If every change requires updating many unrelated tests, responsibilities may be mixed or dependencies may be unclear.

## Main idea

A **concern** is a responsibility within the system.
**Separation of concerns** keeps different responsibilities in appropriate places.
A **layer** groups related responsibilities.
A **dependency** exists when one part relies on another.
**Dependency direction** controls which parts are allowed to know about and rely on other parts.

Good architecture does not create the largest number of layers. It creates enough separation to keep the system understandable and changeable.
