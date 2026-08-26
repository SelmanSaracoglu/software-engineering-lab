# Software Engineering Lab — Learning Track

## Purpose

This repository is a living software engineering knowledge base.

Its purpose is to build transferable software engineering knowledge from real code examples encountered during ongoing development and technical work.

The goal is not to complete a generic TypeScript, React, backend, database, testing, or software architecture curriculum.

The repository should gradually make it possible to answer not only:

> How does this code work?

but also:

> Why is it written this way, what alternatives exist, and where can it fail?

---

# Learning Method

## 1. Shared code determines the learning path

Learning starts from a real code file or code fragment shared for analysis.

The shared code acts only as a **compass** that identifies which concepts need to be understood.

The source, project, repository, or business context of that code does not belong to this learning repository.

The learning material should therefore remain independent from the codebase that originally exposed the concept.

Examples should be generic and transferable enough that the same concept can later be recognized in completely different code.

For example, if a shared file introduces:

- functions
- callbacks
- React components
- routing
- network interception

identify which of those concepts are missing or insufficiently understood and learn only the required prerequisites.

Do not continue through a technology simply because more topics exist in that category.

Do not turn the learning process into a complete TypeScript, React, Cypress, backend, or other technology course.

---

## 2. Build a roadmap from the code

Before starting a new learning sequence:

1. Analyze the shared code.
2. Identify the concepts required to understand it.
3. Check which concepts already exist in this repository.
4. Identify genuinely missing or insufficient topics.
5. Build the smallest useful learning roadmap.
6. Learn those topics in a logical prerequisite order.

The roadmap should be derived from the code being analyzed, not from a predefined curriculum.

---

## 3. Learn concepts independently

The shared source code determines **what to learn**, but it does not have to determine **how the concept is taught**.

Learning examples should preferably use simple, generic code that isolates the concept.

For example, if a complex application contains:

```ts
const { orderId: orderIdParam } = useParams();
```

the learning material may use a simpler object to first explain destructuring and renaming.

The goal is to recognize the same pattern later regardless of variable names, domain, framework, or application.

---

## 4. Learn incrementally

Complex code should be decomposed into already-known concepts plus one new concept at a time.

For example:

```ts
function getRoute(path: string = "/") {
  return path;
}
```

should first be understood as:

- function
- parameter
- type
- default value

More complex syntax should only be introduced after those pieces are understood individually.

A long expression should never be treated as one new concept if it is actually several simpler concepts combined together.

---

## 5. Check this repository before adding knowledge

Before creating a new learning file:

1. Check whether the topic already exists.
2. If it exists, determine whether the new code exposes an important missing aspect.
3. Improve or reinforce existing material instead of duplicating it.
4. Create a new topic only when the concept is genuinely new.

Repeated exposure to a concept is useful.

Repeated documentation of the same explanation is not.

---

## 6. Keep scope proportional to importance

Not every syntax element, keyword, method, or API call deserves a separate learning file.

Small supporting concepts should remain inside the relevant larger lesson.

For example, basic `import` knowledge may only require understanding:

- importing functionality from another module
- package imports
- relative imports
- `./`
- `../`
- named imports

Do not expand into module resolution, ESM internals, or related topics unless the analyzed code makes that knowledge necessary.

More important concepts may require significantly more reinforcement.

Functions and callbacks are high-priority concepts and should be revisited when they appear in increasingly complex forms.

---

# Repository Usage

Use the existing repository structure instead of duplicating knowledge.

- `src/` is primarily for executable, code-based learning.
- `notes/` is for broader engineering concepts, architecture, alternatives, trade-offs, testing strategy, API/database concepts, and failure points.
- A concept does not need both a code file and a note unless they provide genuinely different value.
- Existing material should be improved when possible instead of recreated elsewhere.
- TypeScript examples must respect the repository's existing strict compiler configuration.
- Code lessons should represent meaningful topics rather than individual keywords or API calls.
- Learning files should be named after the concept they teach.
- When presenting a learning file, provide the complete file as one cohesive block rather than fragmented sections.

The repository itself is the record of what has already been learned.

This file should not duplicate that inventory.

---

# Commit Strategy

A commit should represent one coherent learning increment, not every individual file change.

Examples:

```text
learn(ts): add function and callback fundamentals
learn(react): add component and JSX fundamentals
learn(router): add navigation fundamentals
learn(cypress): complete component testing fundamentals
notes(testing): explain test levels and boundaries
refactor(learn): clarify strict array access examples
```

When the current learning position changes, update this file in the same commit as the related learning material.

Do not create a separate commit only for the checkpoint unless the checkpoint itself is the only meaningful change.

Git history records previous learning increments, so this file does not need to maintain a session-by-session history.

---

# Current Position

The current learning sequence covered the concepts required to understand a Cypress component test involving:

- test suite structure and lifecycle
- component mounting
- HTTP request interception
- aliases and request synchronization
- querying and user actions
- assertions and behaviour verification
- dynamic network scenarios and retry testing

Related broader testing concepts such as test levels and test boundaries were also covered separately.

## Next

Wait for the next shared code file or code fragment.

When new code is provided:

1. analyze it,
2. identify the knowledge required to understand it,
3. compare those requirements with the existing repository,
4. create the smallest necessary learning roadmap,
5. learn only the missing or insufficient concepts,
6. update the repository with transferable learning material.
