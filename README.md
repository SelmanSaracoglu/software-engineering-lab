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

### TypeScript Foundations for Testing and Automation

The complete executable curriculum is under
[`src/typescript-for-testing/`](src/typescript-for-testing/README.md).

Implemented and compiler-verified chapters:

- language and control-flow foundations
- functions, callbacks, parameter patterns, and closures
- objects, reusable object types, nested data, and immutable copies
- arrays, safe index access, iteration, transformation, search, and aggregation
- collection choice with Array, object, Record, Map, and Set
- unions, narrowing, discriminated states, runtime boundaries, generics, and utility types
- string, number, date, RegExp, JSON, and runtime validation
- value imports, type-only imports, and module boundaries
- class foundations, OOP contracts, composition, polymorphism, and custom errors
- Promises, async/await, concurrency, and error handling
- integrated typed API data and test-helper foundation check

These files are learning programs, not test-framework suites. They print and
explain results; automated assertions begin in the testing-fundamentals stage.
Material implementation and compiler verification do not by themselves prove
individual mastery. A topic is learned when it can be explained, modified, and
applied to a new example.

The TypeScript language curriculum is closed at the foundation level and has
now been applied through the Test Engineering Foundations and Vitest stages.
Later Node.js, API, log-processing, and security-automation work will continue
to use it without reopening unrelated syntax topics. The next focused step is
only the React knowledge required for component testing.

### Test Engineering Foundations

The completed executable curriculum is under
[`src/test-engineering-foundations/`](src/test-engineering-foundations/README.md).

The completed stage connects requirements and risks to test conditions,
scenarios, concrete test cases, design techniques, test-level selection,
determinism, isolation, test data, environment control, expected evidence, and
failure investigation.

The integrated foundation check distributes one feature across unit, component,
API/integration, and E2E boundaries while validating requirement and high-risk
coverage. Its following practical stage, Vitest unit testing, is now complete.

### Unit Testing with Vitest

The completed Vitest foundation is under
[`src/unit-testing-with-vitest/`](src/unit-testing-with-vitest/README.md).

The stage covers pure functions, boundaries, table-driven cases, validation,
custom exceptions, asynchronous success and failure, dependency boundaries,
fakes, stubs, spies, mocks, fake timers, module mocking, HTTP adapters,
readability, and V8 coverage gates. `npm run test:unit:closure` is the repeatable
compiler, unit-suite, and coverage closure proof.

The next stage teaches only the React knowledge required to understand and test
component inputs, state, events, rendering, context, and routing.

### React for Component Testing

The active focused React curriculum is under
[`src/react-for-component-testing/`](src/react-for-component-testing/README.md).

The first increment introduces function components, JSX, typed props,
parent-to-child data flow, composition, semantic output, and the component
input-output boundary. Runtime verification uses static React rendering without
pretending that it is already a browser interaction test.

---

## Learning Rule

New topics are added because they appear in real project code.

Before adding a new topic:

1. Check whether it already exists in this repository.
2. Improve or reinforce existing material when possible.
3. Add new material only when the concept is genuinely new.
4. Learn prerequisites before advanced usage.
5. Do not expand into unrelated technologies only to make the repository look complete.
