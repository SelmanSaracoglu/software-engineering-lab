# Unit Testing with Vitest

This directory applies the completed TypeScript and Test Engineering
Foundations through executable Vitest unit tests.

The sequence starts with pure business rules. Dependencies, asynchronous code,
spies, mocks, fake timers, and coverage are introduced only when the tested
behaviour creates a real need for them.

## Curriculum status

- [x] Vitest installation, configuration, discovery, and CLI execution
- [x] `describe`, `it`, `test`, and `expect`
- [x] Primitive and object matchers
- [x] Arrange-Act-Assert in executable tests
- [x] Boundary, state-transition, and table-driven pure-function tests
- [ ] Exception and validation tests
- [ ] Asynchronous function tests
- [ ] Dependency boundaries, stubs, spies, and mocks
- [ ] Fake timers and module mocking
- [ ] Readability, coverage, and final integrated unit-testing check

## Files

- `01-lockout-policy.ts` contains the production rule.
- `01-lockout-policy.test.ts` contains the first Vitest suite.

Production and test code are separate because they have different
responsibilities. Production code implements behaviour; test code provides
evidence about that behaviour.

## Commands

Run all Vitest tests once:

```bash
npm test
```

Run tests in watch mode while editing:

```bash
npm run test:watch
```

Run only this learning directory:

```bash
npm run test:unit
```

