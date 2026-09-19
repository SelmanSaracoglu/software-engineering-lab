# Software Engineering Lab

A living software engineering knowledge repository built incrementally from concepts encountered in real project code.

The goal is not to collect isolated examples or study every technology in advance.

The workflow is:

Real project code
→ identify concepts
→ check existing knowledge
→ learn missing prerequisites
→ practice
→ document
→ reinforce when the concept appears again

## Knowledge Types

### Executable Knowledge

Small runnable examples live under `src/`.

These are used for concepts that are best understood through code and experimentation.

### Conceptual Knowledge

Engineering concepts and decision-making notes live under `notes/`.

These focus on:

- what a concept is
- what problem it solves
- alternatives
- trade-offs
- where it appeared in a real project
- how deeply it currently needs to be understood

---

## Current Learning Map

### TypeScript Foundations for Testing

The complete executable curriculum is under
[`src/typescript-for-testing/`](src/typescript-for-testing/README.md).

Implemented and compiler-verified chapters:

- language and control-flow foundations
- functions, callbacks, parameter patterns, and closures
- objects, reusable object types, nested data, and immutable copies
- arrays, safe index access, iteration, transformation, search, and aggregation
- unions, narrowing, discriminated states, runtime boundaries, generics, and utility types
- string, number, date, RegExp, JSON, and runtime validation
- value imports, type-only imports, and module boundaries
- class foundations and custom error subclasses
- Promises, async/await, concurrency, and error handling
- integrated typed API data and test-helper foundation check

These files are learning programs, not test-framework suites. They print and
explain results; automated assertions begin in the testing-fundamentals stage.
Material implementation and compiler verification do not by themselves prove
individual mastery. A topic is learned when it can be explained, modified, and
applied to a new example.

The next planned sequence is testing fundamentals followed by Cypress. React or
another framework is not the next step merely because TypeScript material exists.

---

## Learning Rule

New topics are added because they appear in real project code.

Before adding a new topic:

1. Check whether it already exists in this repository.
2. Improve or reinforce existing material when possible.
3. Add new material only when the concept is genuinely new.
4. Learn prerequisites before advanced usage.
5. Do not expand into unrelated technologies only to make the repository look complete.
