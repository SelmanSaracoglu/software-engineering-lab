# MVP, Vertical Slices, and Incremental Delivery

## Why not build everything at once?

A software product can contain many capabilities. A maintenance system might eventually include request creation, assignment, status tracking, notifications, reporting, user management, and integrations with other systems. Building all of these before showing anything to users creates several risks.

The team may spend months working on features that users do not actually need. Important misunderstandings may remain hidden until late in development. Testing and integration may also become more difficult because many parts of the system are connected for the first time near the end.

Incremental delivery takes a different approach. The product is built as a sequence of small but meaningful improvements. Each improvement creates new evidence about the product, the technology, and the user need.

## What is an MVP?
MVP means **Minimum Viable Product**. It is the smallest version of a product that can provide real value and help the team learn whether its main idea works.

Each word is important.
**Minimum** means that unnecessary capabilities are excluded from the current version.
**Viable** means that the product can perform its main purpose well enough to be useful.
**Product** means that users can interact with something meaningful. It is not only an unfinished collection of technical components.

An MVP for a maintenance system might allow an employee to create a maintenance request and allow a coordinator to view it.
The first version may not include notifications, advanced reporting, multiple assignment rules, or extensive customization.
However, its main workflow should work correctly.

## Minimum does not mean careless
An MVP is smaller than the possible final product, but it should not be intentionally broken or unsafe. For example, if the system stores personal or operational information, the MVP may still need appropriate access control and validation. 

If losing a submitted request would make the product unusable, reliable storage is not an optional future improvement. It is part of making the product viable.
The correct question is not: > What quality can we remove?
The better question is: > What is the smallest responsible solution that provides the intended value?

An MVP reduces scope. It does not remove the minimum conditions required for the system to work safely and correctly.

## What is a vertical slice?
A vertical slice is a small piece of functionality that works through the necessary parts of the system from beginning to end. 
Imagine that a system contains a user interface, application logic, an API, and a database. A vertical slice might allow a user to:

1. enter a maintenance request,
2. submit it through the interface,
3. validate it in the application,
4. save it in the database,
5. receive confirmation.

The slice passes through several technical layers, but it delivers one understandable capability.

User action
→ Application behaviour
→ Data handling
→ Observable result

The user may not know which technical layers are involved. The user only sees that a meaningful task can now be completed.

## Vertical work and horizontal work
A horizontal approach develops one technical layer at a time. For example, the team might first create all database tables, then all API endpoints, and later all user interface screens. A vertical approach completes one small behaviour across the required layers before moving to another behaviour.

**| Horizontal work                       | Vertical slice |**
| Focuses on one technical layer        | Focuses on one user or system behaviour   |
| May not be usable by itself           | Produces an observable result             |
| Feedback often arrives later          | Feedback can arrive earlier               |
| Example: create all database tables   | Example: create and save one request      |

Horizontal work is not always wrong. Some infrastructure or foundational work may be necessary. However, if the team performs only horizontal work for a long period, it may appear busy without producing a complete, testable capability. Vertical slices help connect technical work to actual behaviour.

## What is an increment?
An increment is a usable improvement added to the existing product. 
The first increment may provide one basic capability. The next increment extends the product with another capability.

Increment 1: Create a maintenance request
Increment 2: View existing requests
Increment 3: Assign a request to a coordinator
Increment 4: Complete or cancel a request

Each increment builds on the previous state of the product. The system becomes more useful step by step.
An increment does not have to be large. It should be complete enough to provide an observable improvement and clear enough to be tested.

## What is incremental delivery?
Incremental delivery is the practice of developing and delivering a product through a sequence of usable increments.
Instead of waiting for the entire planned system, the team completes a smaller part, evaluates it, and then continues.

Choose a small capability
→ Build it
→ Test it
→ Review the result
→ Learn from it
→ Add the next capability

This creates shorter feedback cycles. The team can discover whether:
- the requirement was understood correctly,
- the design is usable,
- the technical approach works,
- important risks were missed,
- the next planned capability is still valuable.

Later decisions can use real evidence from the earlier increments.

## How do MVP, vertical slices, and increments connect?
These concepts are related, but they are not identical.
**| Concept | Main meaning |**
| MVP                   | The smallest useful product that can test the main idea   |
| Vertical slice        | A small end-to-end piece of working behaviour             |
| Increment             | A usable improvement added to the product                 |
| Incremental delivery  | Building and delivering through a sequence of increments  |

An MVP can be created from one or more vertical slices. After the MVP exists, further vertical slices can extend it as new increments.

Vertical slice + Vertical slice = Initial usable product
Initial product + Further increments = Growing product

The MVP describes the smallest useful product boundary. 
A vertical slice describes how a small capability can be implemented from end to end.
Incremental delivery describes how the product grows over time.

## A simple example
Imagine that an organization currently reports broken equipment through unstructured messages. The main problem is that requests are easily missed and their current state is unclear. The team considers the following first product:

> Employees can submit a maintenance request, and coordinators can see submitted requests.

This may be a reasonable MVP because it addresses the central problem without trying to automate the entire maintenance process.
The team can divide it into vertical slices.

The first slice allows an employee to create a request. It includes the required input, validation, storage, and confirmation.
The second slice allows a coordinator to view saved requests.

Together, these slices create a small but usable workflow.

Later increments may add assignment, status changes, notifications, filtering, and reporting.
The order of these increments should depend on user value and observed needs rather than an assumption that every possible feature must be built.

## MVP, prototype, and proof of concept
These terms are sometimes confused.

**| Concept           | Purpose |**
| Proof of concept  | Checks whether a technical idea is possible       |
| Prototype         | Explores or demonstrates a possible design        |
| MVP               | Provides minimum real value and supports learning |
| Increment         | Extends the working product                       |

A proof of concept may contain temporary code and may never reach users. 
A prototype may look realistic but may not store real information or complete the full behaviour.
An MVP is expected to perform its limited purpose as a real product.
The team should know which one it is building. Otherwise, temporary prototype decisions may accidentally become production decisions.

## How should an increment be selected?
A useful first increment usually represents a small, important workflow.

The team should ask:
- Does this solve part of the real user problem?
- Can the result be observed and tested?
- Does it include the necessary end-to-end behaviour?
- Is it small enough to complete without too many unknowns?
- Will completing it help us make the next decision?

A slice that is too large creates slow feedback. A slice that is too small may produce technical activity without meaningful behaviour.
The goal is not to make every task tiny. The goal is to create the smallest coherent improvement.

## Common confusion

### An MVP is not the final product with many unfinished features
A product with ten partially working capabilities is not necessarily better than a product with two complete capabilities.
A smaller coherent workflow often provides better learning.

### Incremental delivery is not random feature delivery
Each increment should contribute to a clear product direction.
Adding unrelated features one by one is not useful merely because the changes are small.

### A vertical slice is not only a user-interface screen
A screen that does not connect to real behaviour may be a prototype or partial implementation.
A vertical slice includes the parts necessary to produce the intended result.

### Small delivery does not remove the need for design
The team still needs to understand requirements, data, failure cases, and important quality expectations.
Incremental delivery limits the current scope. It does not replace engineering thinking.

### The MVP can change
The original MVP idea may be wrong. Learning that users need a different workflow is not necessarily a project failure. 
Discovering this early is one of the reasons for building an MVP.

## Engineering and testing perspective
Small vertical slices create clear test boundaries.

For each slice, the team can define:
- what action is supported,
- what result is expected,
- which invalid conditions must be rejected,
- which important quality expectations apply.

Testing can begin before the whole product exists. A completed slice can provide evidence that the user interface, application logic, data handling, and important integrations work together. When a failure occurs, a smaller change is also easier to understand than a large release containing many new capabilities.
Incremental delivery therefore supports both product learning and engineering feedback.

## Main idea
An **MVP** is the smallest responsible product that provides real value and tests the main idea.
A **vertical slice** is a small capability implemented through the necessary parts of the system.
An **increment** is a usable improvement added to the existing product.
**Incremental delivery** grows the product through a sequence of these improvements.

The reusable model is:

Find the smallest valuable workflow
→ Implement it from end to end
→ Test the real behaviour
→ Review what was learned
→ Add the next valuable increment

The purpose is not simply to deliver less. 
It is to learn earlier, reduce unnecessary work, and grow the system through complete and understandable steps.