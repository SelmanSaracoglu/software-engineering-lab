# Software Engineering Lab — Learning Track

## Purpose

This repository is a living software engineering knowledge base built from real project work.

The goal is not to complete a generic TypeScript, React, backend, database, or software architecture curriculum.

New knowledge should primarily come from code, technologies, architecture decisions, problems, and failure points encountered in real projects.

The repository should gradually make it possible to answer not only:

> How does this code work?

but also:

> Why is the system built this way, what alternatives exist, and where can it fail?

---

# Learning Method

## 1. Real project code drives the learning path

Start from an actual project file, feature, test, bug, architecture decision, or implementation.

Do not continue through a technology simply because another topic exists in the same learning category.

Example:

If a Cypress test introduces:

- functions
- callbacks
- React components
- React Router
- network interception

learn the prerequisites required to understand that test.

Do not turn the session into a complete TypeScript or Cypress course.

After the required prerequisite is understood, return to the original project code.

---

## 2. Learn incrementally

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

A long expression should never be treated as one new concept if it is actually several simple concepts combined together.

---

## 3. Check this repository before adding knowledge

Before creating a new learning file:

1. Check whether the topic already exists.
2. If it exists, determine whether the new project code adds useful understanding.
3. Improve or reinforce the existing material instead of duplicating it.
4. Create a new topic only when the concept is genuinely new.

Repeated exposure to a concept is useful.

Repeated documentation of the same explanation is not.

---

## 4. Keep scope proportional to importance

Not every syntax element deserves a large learning section.

Simple supporting concepts should stay short.

For example, basic `import` syntax currently only requires understanding:

- importing functionality from another module
- package imports
- relative imports
- `./`
- `../`
- named imports

Do not expand into module resolution, ESM internals, or related topics unless real project code requires them.

More important concepts may require significantly more reinforcement.

Functions and callbacks are currently high-priority topics and should be revisited when they appear in increasingly complex code.

---

## 5. Return to the project after prerequisites

Prerequisites are temporary detours.

After the missing prerequisite is understood, return to the original project file.

Do not continue sequentially through unrelated learning files.

Example:

Learning `map()` to reinforce callback behaviour does not mean continuing automatically into:

- `filter()`
- `reduce()`
- every array method

unless the project code requires them.

---

# Repository Usage

Use the existing repository structure instead of duplicating knowledge.

- `src/` is primarily for executable, code-based learning.
- `notes/` is for broader engineering concepts, architecture, alternatives, trade-offs, and failure points.
- A concept does not need both a code file and a note unless they provide genuinely different value.
- Existing material should be improved when possible instead of recreated elsewhere.
- TypeScript examples must respect the repository's existing strict compiler configuration.

The repository itself is the record of what has already been learned.

This file should not duplicate that inventory.

---

# Commit Strategy

A commit should represent one coherent learning increment, not every individual file change.

Examples:

```text
learn(ts): add prerequisites for order detail tests
learn(react): add component and JSX fundamentals
learn(cypress): reinforce request interception concepts
notes(api): compare REST with alternative API styles
refactor(learn): clarify strict array access examples
```

When the current learning position changes, update this file in the same commit as the related learning material.

Do not create a separate commit only for the checkpoint unless the checkpoint itself is the only meaningful change.

Git history records previous learning increments, so this file does not need to maintain a session-by-session history.

---

# Current Source

Boutique Order App — `OrderDetailDialog` Cypress component test.

---

# Current Position

React ve React Router prerequisites required for the current test structure are sufficiently covered.


## Next

Return to the OrderDetailDialog Cypress component test and continue with cy.mount(), then the Cypress test structure and network control used by the source.