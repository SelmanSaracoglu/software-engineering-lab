# Monorepo, Polyrepo, Workspaces, and Service Boundaries

## What is a repository?

A repository is a version-controlled place where source code and related files are stored.

It normally contains the history of changes made to those files.

A repository may contain:

- one application,
- several applications,
- shared libraries,
- tests,
- configuration,
- documentation.

A repository describes how code is stored and managed.

It does not automatically describe how the software runs.

This distinction is important because repository architecture and runtime architecture are different decisions.

## What is a monorepo?

A monorepo is one repository that contains several related projects or packages.

For example:

```text
repository/
├── applications/
│   ├── web/
│   └── api/
├── packages/
│   └── shared-types/
└── package.json
```

The web application, API, and shared package are stored in the same version-controlled repository.

They may still be built, tested, and deployed in different ways.

The word “mono” refers to the repository, not necessarily to one application.

## Is a monorepo the same as a monolith?

No.

A monolith is a runtime and deployment architecture.

A monorepo is a source-code organization strategy.

One monorepo can contain several independently deployed microservices.

```text
One repository
├── User Service
├── Request Service
└── Notification Service
```

These services are stored together but may still run and deploy separately.

A modular monolith can also exist inside a monorepo.

The two decisions answer different questions:

| Decision | Question |
|---|---|
| Repository architecture | Where is the code stored and versioned? |
| Runtime architecture | How is the system divided and executed? |
| Deployment architecture | Which parts can be released independently? |

The repository structure should not be used as the only evidence of the system architecture.

## What is a polyrepo?

Polyrepo means using separate repositories for separate applications, services, or libraries.

For example:

```text
web-application repository

api-service repository

shared-library repository
```

Each repository has its own version history and can have its own access rules, release process, and automation.

Polyrepo can create stronger organizational separation.

However, changes affecting several repositories may require more coordination.

## Benefits of a monorepo

A monorepo can make related code easier to discover.

A developer can see how the frontend, backend, tests, and shared packages connect.

Changes affecting several projects can be made together in one commit.

For example, an API contract and the client using it can be updated in the same change.

A monorepo may also provide:

- shared development commands,
- consistent tooling,
- coordinated dependency updates,
- easier reuse of internal packages,
- one place for cross-project changes.

These benefits are especially useful when the projects are closely related and frequently change together.

## Costs of a monorepo

As a monorepo grows, it may become more difficult to manage.

A small change should not require rebuilding and testing every unrelated project.

The team may need tools that understand which projects are affected.

A monorepo can also create unclear ownership.

Because all code is easy to access, developers may create dependencies between packages without considering whether those dependencies are appropriate.

Other concerns include:

- large continuous-integration workloads,
- complicated permissions,
- accidental access to unrelated secrets,
- increasing repository size,
- unclear release boundaries.

A monorepo makes sharing easier, but not every kind of sharing is healthy.

## Benefits of a polyrepo

Polyrepo can provide clear ownership.

Each application or service can have:

- its own repository,
- its own permissions,
- its own release process,
- its own version,
- its own development workflow.

This can be useful when separate teams own independently changing services.

A team can release its service without changing the history or configuration of unrelated projects.

Repository access can also be limited more directly.

## Costs of a polyrepo

Changes that cross repository boundaries require coordination.

Suppose an API changes and a client must change with it.

In a polyrepo structure, the team may need:

1. a change in the API repository,
2. a new API or library version,
3. a change in the client repository,
4. compatible deployment ordering.

Shared tooling and standards may also be duplicated across repositories.

Finding all related code can be more difficult because it is distributed.

Polyrepo provides separation, but that separation creates coordination work.

## What is a package?

A package is a named unit of code that can be depended on by another part of the system.

A package may contain:

- reusable functions,
- shared types,
- configuration,
- a user-interface component library,
- a complete application.

Packages can be public or private.

Inside a repository, packages help define code ownership and dependency relationships.

For example:

```text
web application
→ depends on shared-types package

API application
→ depends on shared-types package
```

The shared package can provide an agreed data shape used by both applications.

## What is a workspace?

A workspace is a package-management feature used to manage several packages together, usually inside a monorepo.

Tools such as npm, pnpm, and Yarn support workspace concepts.

A workspace can help the repository:

- install dependencies together,
- connect local packages,
- run commands across packages,
- manage package relationships,
- avoid manually publishing every internal package during development.

For example:

```text
workspace
├── web package
├── API package
└── shared-types package
```

The web and API packages can depend on the local shared package.

The package manager connects them as part of the same workspace.

## What a workspace does not do

A workspace helps manage packages.

It does not automatically create good architecture.

It does not decide:

- which package owns a business rule,
- which dependencies are allowed,
- whether two services should share data,
- whether a package should be deployed independently,
- whether sensitive information can cross a boundary.

A repository may use workspaces while still having tightly coupled packages.

Architecture still requires explicit responsibility and dependency decisions.

## What is a service boundary?

A service boundary separates one independently operating service from another.

A service usually owns a specific capability and controls its internal implementation.

Other services communicate with it through an explicit contract such as an API or event.

```text
Request Service
→ public contract
→ Notification Service
```

The request service should not reach inside the notification service and change its private data directly.

A service boundary is stronger than a folder or package boundary because communication crosses a running-process boundary.

This introduces network, deployment, and failure concerns.

## Package boundary and service boundary

A package boundary organizes code.

A service boundary organizes independently running software.

| Package boundary | Service boundary |
|---|---|
| Separates code ownership | Separates running applications |
| Often uses imports and function calls | Uses APIs or messages |
| May be deployed with other packages | Can be deployed independently |
| Failure usually occurs in the same process | Network and partial failures are possible |

A package can support a service, but it is not automatically a service.

## Shared code

Shared code can reduce duplication, but it also creates dependency.

If several applications depend on one shared package, changing that package may affect all of them.

Shared code is often reasonable for stable technical concepts such as:

- common type definitions,
- carefully selected validation rules,
- consistent tooling configuration,
- small general utilities.

Sharing becomes risky when several services use the same internal business implementation.

The services may appear separate but become unable to change independently.

The question should not only be:

> Can this code be shared?

The team should also ask:

> Should these consumers be required to change together?

If the answer is no, duplication or communication through a contract may provide a clearer boundary.

## Shared types and runtime validation

Two applications may share TypeScript types in a workspace.

This can improve development feedback because both sides understand the expected structure.

However, a shared compile-time type does not prove that information received at runtime is valid.

External requests can still contain missing, incorrect, or malicious values.

A server must validate incoming information at its trust boundary even when the client imports the same type.

```text
Shared type:
Helps developers during compilation

Runtime validation:
Checks real incoming data
```

Repository sharing does not remove runtime trust boundaries.

## A simple example

Imagine a system with a web client and an API.

The team places both applications in one monorepo:

```text
system/
├── apps/
│   ├── web/
│   └── api/
└── packages/
    └── shared-types/
```

A workspace manages these three packages.

The web application and API can use the shared type definitions.

They can also run separate tests and produce separate builds.

The API and web application are still separate runtime components even though their code exists in one repository.

Later, the system may gain a notification service.

The team can place that service in the same monorepo or in a separate repository.

That repository choice does not decide whether it is a real service.

Its independent runtime, deployment, responsibility, and communication boundary determine that.

## How should the repository strategy be selected?

A monorepo may be suitable when:

- projects change together frequently,
- shared tooling is valuable,
- developers need visibility across the system,
- atomic cross-project changes are important.

Polyrepo may be suitable when:

- services have clearly separate ownership,
- access must be strongly separated,
- release processes are independent,
- projects rarely need coordinated changes.

The choice also depends on team size, tooling, permissions, and operational maturity.

Neither strategy is automatically more professional.

## Common confusion

### Monorepo does not mean monolith

Several independent services can be stored in one repository.

### Polyrepo does not guarantee independent services

Two repositories can still be tightly coupled and require coordinated releases.

### A package is not automatically a service

A package is a code unit. A service is an independently running unit.

### Shared code is not free

Every shared package creates a dependency that must be maintained and tested.

### A workspace is not an architecture

It manages packages and commands. It does not define correct ownership or service boundaries.

### Separate folders do not guarantee boundaries

Real boundaries depend on allowed dependencies and controlled communication.

## Engineering and testing perspective

Repository structure affects how tests are organized and executed.

A monorepo can run tests for several related projects in one workflow.

It may also run only the tests affected by a change when the dependency graph is understood.

Polyrepo systems need confidence that separately versioned components remain compatible.

Contract testing becomes important when one repository changes an interface used by another repository.

Shared packages also require their own tests because one change may affect several consumers.

The team should distinguish:

- package tests,
- application tests,
- service contract tests,
- complete system tests.

The repository location of a test does not determine its test level. The behaviour and boundary being tested determine the test level.

## Main idea

A **monorepo** stores several related projects in one repository.

A **polyrepo** stores projects in separate repositories.

A **package** is a named unit of code.

A **workspace** helps manage several packages together.

A **service boundary** separates independently running and communicating software.

The reusable model is:

```text
Decide where code is versioned
→ Define package ownership
→ Control dependencies
→ Separate runtime services only when needed
→ Keep repository structure and system architecture conceptually distinct
```

Repository organization can support good architecture, but it cannot create good boundaries by itself.