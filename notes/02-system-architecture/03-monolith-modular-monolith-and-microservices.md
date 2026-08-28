# Monolith, Modular Monolith, and Microservices

## Why do we need an application structure?

As a system grows, it gains more responsibilities. A maintenance system may manage requests, users, assignments, notifications, and reports. The team must decide how these responsibilities will be organized and deployed.

- Should everything run as one application?
- Should the application contain clearly separated modules?
- Should each responsibility become an independently running service?

Monolith, modular monolith, and microservices are different answers to these questions.

## What is a monolith?

A monolith is an application whose main parts are built and deployed together as one unit.

It may include:

- user-interface delivery,
- application logic,
- business rules,
- data access,
- integrations.

When the application changes, the team normally builds and deploys the complete application.
One application → One deployment unit

A monolith does not mean that all code must exist in one file.
A monolith can contain many folders, classes, functions, layers, and features.
The defining characteristic is that these parts belong to one running and deployable application.

## Is a monolith automatically bad? No.

A monolith is often the simplest way to begin a new system. The team can develop, run, test, and deploy one application. Internal communication usually happens through normal function calls rather than network requests.

This can provide:

- simpler development,
- easier local setup,
- straightforward debugging,
- simpler transactions,
- fewer operational components.

A monolith becomes difficult when its internal responsibilities are poorly separated. If every part can directly access and change every other part, the application may become tightly coupled.

The problem is not that the system is one deployment unit. The problem is the absence of clear internal boundaries.

## What is a modular monolith?

A modular monolith is one deployable application with clearly separated internal modules. Each module represents a meaningful capability or area of responsibility.

For example:
Maintenance Application
├── Requests
├── Users
├── Assignments
└── Notifications

The modules run together as one application, but they do not freely share all internal details. The request module should not directly change the private data of the notification module. Instead, modules communicate through clear boundaries.

One deployment unit + Clear internal modules = Modular monolith

A modular monolith combines operational simplicity with stronger internal organization.

## What is a module?

A module is a part of the application with a clear responsibility and boundary.

A well-defined module usually owns:

- its main concepts,
- its business rules,
- its internal operations,
- the way other modules interact with it.

The module exposes only what other parts of the system need. Its internal details remain private.

For example, an assignment module may provide an operation such as:
assignRequest(requestId, coordinatorId)

Other modules can request an assignment without directly modifying the assignment module’s internal state.
Modules reduce unnecessary dependencies inside the application.

## What are microservices?

Microservices architecture divides a system into several small, independently deployable services.
Each service usually owns a specific business capability.

```
Request Service
User Service
Notification Service
Reporting Service
```

These services run as separate processes. They normally communicate through network calls or messages.

```
Request Service → network communication → Notification Service
```

Each service can potentially be developed, deployed, and scaled independently. This operational independence is one of the main differences between a module and a microservice.

## Module and microservice difference

A module exists inside an application. A microservice is a separately running and deployable application.

**| Module | Microservice |**
| Part of one application | Independent running service |
| Deployed with the application | Can be deployed separately |
| Usually communicates through code | Communicates over a network |
| Shares the application process | Has its own process |
| Simpler operationally | Requires distributed-system operation |

A folder named `services` does not automatically mean the system uses microservices. The name of the folder does not determine the architecture.

## Why choose a monolith?

A monolith can be suitable when:

- the product is new,
- requirements are still changing,
- the team is small,
- the system has limited operational needs,
- independent deployment is not required.

The team can focus on understanding the product without first building a distributed platform. A monolith also makes many operations easier. One request can call several internal functions without network communication. A database transaction can protect changes across several related operations.

However, a poorly structured monolith may become harder to change as it grows.

## Why choose a modular monolith?

A modular monolith is useful when the team wants clear capability boundaries without the operational cost of separate services.

It can provide:

- understandable ownership,
- controlled internal dependencies,
- simpler testing than distributed services,
- one deployment process,
- the possibility of extracting a module later if needed.

The possibility of later extraction does not mean every module will become a microservice. Modules are valuable even when the system remains a monolith permanently. The main purpose is internal clarity.

## Why choose microservices?

Microservices may become useful when the system has needs such as:

- independent deployment of different capabilities,
- different scaling needs,
- clear ownership by separate teams,
- strong isolation between certain failures,
- very different technology or operational requirements.

For example, a reporting capability may require heavy processing while the rest of the system handles smaller interactive requests.
Running it independently may allow the team to scale and operate it differently.

However, this benefit is valuable only when the need is real. Microservices introduce a distributed system, and distributed systems contain new forms of complexity.

## What complexity do microservices introduce?

A function call inside one application is usually fast and direct.
A network call between services can fail in more ways. - The destination service may be unavailable. - The network may be slow. - The request may time out. - The operation may succeed even though the response is lost.

The system may need to handle:

- network failures,
- timeouts and retries,
- duplicate operations,
- partial failures,
- data consistency between services,
- service authentication,
- monitoring across several applications,
- multiple deployments and versions.

Instead of one application log, the team may need to follow one operation through several services.
Microservices move some code complexity into communication and operations. They do not remove complexity from the system.

## Data ownership

A monolith often uses one shared database. This can make transactions and reporting simpler.
Microservices should normally control their own data rather than allowing every service to modify the same tables directly.

```
Request Service → Request data
User Service → User data
```

If several services directly change the same database tables, they remain strongly coupled through the database.
Changing one table can break several services. Separate data ownership improves independence, but it also makes operations across services more difficult.

A single database transaction may no longer protect the complete workflow. The team may need to handle temporary inconsistency or failed partial operations.

## Scaling

A common misunderstanding is that monoliths cannot scale.
A monolith can often run as several application instances behind a load balancer.

```
Users → Load balancer → Several monolith instances
```

The whole application is scaled together.

Microservices allow selected capabilities to scale independently. This is helpful when different parts of the system have clearly different workloads. However, microservices do not automatically make a system faster. Network communication and data coordination may reduce performance.

Architecture should respond to measured bottlenecks rather than an assumption that more services create more scale.

## Reliability

A monolith has fewer running parts, but a serious application failure may affect the complete system.

Microservices may isolate some failures. A reporting service could fail while request creation continues.

However, one service may depend on several others. A failure can still spread through slow responses, retries, or unavailable dependencies. More services also create more components that can fail.

Reliability depends on boundaries, failure handling, and operations—not only on the number of applications.

## Security

A monolith has internal calls inside one process.
Microservices communicate across networks and therefore create more exposed boundaries.

Each service may need:

- authentication,
- authorization,
- encrypted communication,
- controlled access to data,
- secure configuration,
- monitoring.

Microservices can create strong isolation when they are designed correctly. They can also create a larger attack surface when every service exposes interfaces and holds credentials.
Choosing microservices does not automatically improve security.

## A simple example

Imagine a maintenance platform with three capabilities:

- request management,
- user management,
- notifications.

A small team can begin with a modular monolith. Each capability has its own module, but all modules run and deploy together.

```
Maintenance Application
├── Request Module
├── User Module
└── Notification Module
```

This structure gives the team clear boundaries without requiring several deployments, network calls, and separate monitoring.
Later, the notification capability may develop different needs. It may send a large number of messages, use background processing, and be operated independently.

At that point, the team can evaluate whether extracting it as a separate service provides enough benefit to justify the new complexity. The decision is based on observed needs, not on the belief that every mature system must use microservices.

## Common confusion

### Monolith does not mean unstructured code

A monolith can have strong modules, layers, and dependency rules.

### Microservices do not automatically create good boundaries

Poorly separated responsibilities can exist across several services. This is sometimes called a distributed monolith: the system has the operational complexity of microservices but the parts cannot change independently.

### Small services are not automatically microservices

The important characteristics are capability ownership and independent deployment, not only code size.

### One repository does not mean one application

Several services can exist in one repository. A monolith can also be stored across poorly organized repositories.
Repository structure and runtime architecture are related decisions, but they are not the same decision.

### Microservices are not the required destination

A well-designed modular monolith may remain the correct architecture for the entire life of a product.

## How should the choice be made?

**| Situation | Often suitable starting point |**
| New product with uncertain requirements | Monolith or modular monolith |
| Small team and simple operations | Monolith or modular monolith |
| Need for clear internal capability boundaries | Modular monolith |
| Separate teams need independent deployment | Microservices may be suitable |
| One capability has very different scaling needs | A separate service may be suitable |
| Limited distributed-system experience | Avoid unnecessary service separation |

These are guides, not automatic rules. The actual choice depends on the product, team, workload, risks, and operational environment.

## Engineering and testing perspective

A monolith is usually easier to run and test as a complete system. Its internal modules can still be tested independently when the boundaries are clear.

A modular monolith provides useful test boundaries without requiring network communication between every capability.

Microservices require additional testing concerns:

- service contracts,
- network failures,
- timeouts,
- retries,
- version compatibility,
- partial system availability.

End-to-end testing across many services can become slower and harder to diagnose. For this reason, service-level tests and contract tests become important.

The architecture changes not only how the system is deployed but also how evidence is collected.

## Main idea

A **monolith** is built and deployed as one application.
A **modular monolith** is one application with clear internal capability boundaries.
**Microservices** are independently running and deployable services that communicate across a network.

The reusable decision model is:

```
Start from the current problem
→ Define clear internal boundaries
→ Keep operations as simple as possible
→ Observe real scaling and ownership needs
→ Separate services only when independence provides clear value
```

Microservices are not a more advanced version of a monolith. They are a different trade-off that exchanges operational simplicity for greater independence.
