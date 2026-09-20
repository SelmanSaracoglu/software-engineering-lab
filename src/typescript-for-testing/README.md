# TypeScript Foundations for Testing and Automation

This directory contains the executable TypeScript foundation required before
testing fundamentals, Cypress, and later engineering automation. It supports
the longer-term ability to read application code, process API and telemetry
data, and build testable security-oriented automation without turning this
foundation into a framework- or product-specific course.

Every lesson begins with plain-language explanation, uses runnable examples,
connects the concept to testing where useful, and ends with a summary and
interview answers. The files use the repository's strict compiler settings.

## Curriculum status

The material below is implemented and compiler-verified. This status describes
the repository content, not automatic proof of learner mastery.

### Core foundations

- [x] `01-values-variables-and-execution.ts`
- [x] `02-type-inference-and-annotations.ts`
- [x] `03-conditions-and-control-flow.ts`
- [x] `04-boolean-logic.ts`
- [x] `05-functions-input-and-output.ts`

### Functions

- [x] `functions/01-function-foundations.ts`
- [x] `functions/02-input-output-and-control-flow.ts`
- [x] `functions/03-scope-state-and-testability.ts`
- [x] `functions/04-function-composition.ts`
- [x] `functions/05-function-expressions-and-arrow-functions.ts`
- [x] `functions/06-parameter-patterns-and-closures.ts`

### Objects

- [x] `objects/01-object-foundations.ts`
- [x] `objects/02-object-types-type-aliases-and-interfaces.ts`
- [x] `objects/03-nested-optional-readonly-and-nullable-data.ts`
- [x] `objects/04-destructuring-spread-and-object-copies.ts`

### Arrays

- [x] `arrays/01-array-foundations-and-index-safety.ts`
- [x] `arrays/02-arrays-of-objects-and-iteration.ts`
- [x] `arrays/03-array-transformations-search-and-aggregation.ts`

### Collections

- [x] `collections/01-array-object-record-map-and-set.ts`

### Type system

- [x] `types/01-literal-union-nullable-and-enum-alternatives.ts`
- [x] `types/02-narrowing-typeof-in-and-custom-type-guards.ts`
- [x] `types/03-discriminated-unions-intersections-and-exhaustive-checks.ts`
- [x] `types/04-unknown-any-assertions-and-runtime-boundaries.ts`
- [x] `types/05-readonly-tuples-as-const-and-satisfies.ts`
- [x] `types/06-generics-keyof-indexed-access-and-record.ts`
- [x] `types/07-utility-types-and-derived-return-types.ts`

### Runtime data

- [x] `runtime-data/01-string-number-date-and-regexp-operations.ts`
- [x] `runtime-data/02-json-parsing-and-runtime-validation.ts`

### Modules

- [x] `modules/01-import-export-and-type-only-imports.ts`

The `modules/support/` files are small executable fixtures used by the modules
lesson and the final foundation check. They are not separate lessons.

### Classes

- [x] `classes/01-class-foundations-and-error-subclasses.ts`
- [x] `classes/02-oop-contracts-composition-and-polymorphism.ts`

### Asynchronous code

- [x] `asynchronous-code/01-promises-and-asynchronous-execution.ts`
- [x] `asynchronous-code/02-async-await-and-concurrent-work.ts`
- [x] `asynchronous-code/03-throw-try-catch-finally-and-unknown-errors.ts`

### Foundation check

- [x] `foundation-check/01-typed-api-data-and-test-helpers.ts`

## Verification

Install dependencies without requiring the Cypress desktop binary when only the
TypeScript curriculum is being checked:

```bash
CYPRESS_INSTALL_BINARY=0 npm ci
```

Compile the complete repository without emitting JavaScript:

```bash
npm run typecheck
```

Run the integrated foundation check:

```bash
npm run foundation-check
```

The foundation check follows typed API data from asynchronous JSON text through
runtime validation and reusable test helpers. Testing frameworks and assertions
belong to the next curriculum stage.

## Completion boundary

This curriculum provides the TypeScript language foundation needed to continue
into testing and automation. It deliberately does not reproduce every topic in
the TypeScript handbook. Decorators, namespaces, mixins, advanced type-level
programming, WeakMap, WeakSet, custom iterators, and generators should be learned
later only when real code requires them.

Completing the repository content does not by itself prove learner mastery.
Mastery is demonstrated by explaining the concepts, running and changing the
examples, and applying them in later testing and automation work.

The next curriculum stage is testing fundamentals, followed by deliberate
Cypress practice. Node.js automation, API integration, log processing, and
security automation remain later practical stages rather than additional
TypeScript syntax lessons.
