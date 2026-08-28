# Software Engineering Lab — Learning Track

## Purpose

This repository is a living, transferable software engineering knowledge base.

Its purpose is to develop the judgment needed to understand, design, build, test,
operate, and later secure realistic software systems. It is not intended to turn
the learner into a framework specialist or reproduce the documentation of a
particular product.

The repository follows two complementary learning tracks:

1. a **career-driven theory track** under `notes/`, and
2. a **code-driven practical track** under `src/`.

These tracks support each other, but they do not use the same method for deciding
what comes next.

---

# Track 1 — Theory Notes

## 1. Career direction determines the roadmap

The `notes/` roadmap is determined by the engineering capabilities required for
the long-term career direction:

- software engineering judgment,
- product and requirements reasoning,
- system and data design,
- software quality and test engineering,
- delivery and production awareness,
- security-aware engineering,
- and, after the core foundation, Secure SDLC and detection-ready design.

The roadmap is **not derived from the current product repository or technology
stack**. A project may expose a useful example, but it does not define or limit
the theory curriculum.

The notes must remain useful across different domains, including business
applications, healthcare systems, e-commerce, CRM, games, operational platforms,
and security products.

## 2. Notes teach decisions, not only definitions

A theory note should make it possible to answer:

> What problem does this concept solve, what alternatives exist, how should a
> choice be made, and where can that choice fail?

A note such as `REST` must explain more than what REST is. It should also explain
why it may be suitable, when RPC, GraphQL, or gRPC may be more appropriate, and
how the choice affects security, performance, reliability, operations, cost, and
complexity.

## 3. Standard decision framework

Each theory note should use the following questions when they are relevant:

1. What is the problem?
2. How does the concept work?
3. What options exist?
4. What are the selection criteria?
5. What are the security effects?
6. What are the performance and scalability effects?
7. What are the reliability and operational effects?
8. What are the complexity and cost effects?
9. What are the common mistakes, failure points, and attack points?
10. Under which conditions is the choice no longer correct?

The framework should guide the explanation without forcing irrelevant sections
or artificial detail into every note.

## 4. Security sequencing

Security remains a permanent engineering concern. Its effects should be included
in ordinary architecture, API, data, testing, and operations notes from the
beginning.

Dedicated Secure SDLC, application security, telemetry, and detection topics are
studied after the core Software Engineering and Test Engineering foundation.
This prevents security topics from becoming disconnected from how software is
designed, tested, deployed, and operated.

---

# Track 2 — Code-Based Practice

## 1. Real code determines the practical learning path

Practical learning starts from a real codebase, file, or fragment selected for
analysis.

The code acts as a **compass** that identifies the technical concepts required to
understand it. The source project and business context do not become the context
of the learning material.

Examples should remain generic and transferable so that the same concept can be
recognized later in unrelated code.

## 2. Build the smallest useful practical roadmap

Before starting a new code-based learning sequence:

1. Analyze the selected code.
2. Identify the concepts required to understand it.
3. Check which concepts already exist in this repository.
4. Identify genuinely missing or insufficient topics.
5. Build the smallest useful learning roadmap.
6. Learn the topics in prerequisite order.

Do not continue through TypeScript, React, Node.js, Express, Zod, databases,
testing tools, or another technology simply because more topics exist.

## 3. Learn code incrementally

Complex code should be decomposed into known concepts plus one new concept at a
time. A long expression should not be treated as one new subject when it is
actually several simpler concepts combined together.

Practical lessons should use isolated examples before returning to the original
pattern in real code.

---

# Principles Shared by Both Tracks

## 1. Keep the material project-independent

Products and repositories may provide evidence, examples, or practice. They do
not become the identity of this knowledge base.

## 2. Check existing knowledge before adding material

Before creating a new file:

1. Check whether the topic already exists.
2. Determine whether new learning exposes an important missing aspect.
3. Improve an existing file when possible.
4. Create a new file only when it provides genuinely different value.

Repeated exposure is useful. Repeated documentation of the same explanation is
not.

## 3. Keep scope proportional to engineering value

Not every keyword, method, syntax element, or API call deserves a separate file.
Small supporting concepts should remain inside the larger lesson that gives them
meaning.

Important concepts may be revisited at increasing levels of difficulty, but the
repository should not become a generic full curriculum for every technology it
touches.

## 4. Preserve the theory–practice distinction

| Theory under `notes/` | Practice under `src/` |
| --- | --- |
| Why APIs exist and how API styles are selected | Following or implementing a request in code |
| Why runtime validation is required | Defining and using a Zod schema |
| When TypeScript is a suitable choice | Applying types, unions, and narrowing |
| How test levels are selected by risk | Writing and debugging Cypress or integration tests |
| Why transactions protect invariants | Reading and implementing transaction code |

A concept may appear in both locations only when the files provide clearly
different theoretical and practical value.

---

# Repository Usage

- `src/` is primarily for executable, code-based learning.
- `notes/` is the decision-oriented theory knowledge base.
- `notes/THEORY-NOTES-ROADMAP.md` defines the theory sequence and current module.
- TypeScript examples must respect the repository's strict compiler settings.
- Learning files should be named after the concepts they teach.
- Complete learning files should be presented as cohesive documents rather than
  fragmented snippets.

---

# Commit Strategy

A commit should represent one coherent learning increment, not every individual
file change.

Examples:

```text
docs(learning): separate theory and practical learning tracks
notes(product): explain problem and capability boundaries
notes(architecture): compare service architecture options
learn(ts): add function and callback fundamentals
learn(cypress): complete component testing fundamentals
```

When the current learning position changes, update the roadmap in the same
commit as the related material. Git history records previous increments, so this
file should not contain a session-by-session log.

---

# Current Position

## Theory track

Active.

The first module is **Product & Engineering Decisions**. The first subject is
**Product Problem, User Need, and Capability Boundary**.

## Practical track

Paused until the theory-notes phase reaches its planned checkpoint.

The completed practical material remains valid. Future practical roadmaps will
be produced from selected repositories or code only when this track is resumed.

