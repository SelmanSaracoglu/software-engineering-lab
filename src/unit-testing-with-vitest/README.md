# Unit Testing with Vitest

This directory applies the completed TypeScript and Test Engineering
Foundations through executable Vitest unit tests.

The sequence starts with pure business rules. Dependencies, asynchronous code,
spies, mocks, fake timers, and coverage are introduced only when the tested
behaviour creates a real need for them.

## Installation

Vitest 5 requires Node.js 22.12 or newer. Check the installed versions before
running the project:

```bash
node --version
npm --version
```

When this repository is cloned, install every dependency already recorded in
`package.json` and `package-lock.json`:

```bash
npm install
```

Do not install Vitest separately in that case. The repository already declares
it as a development dependency, and `npm install` restores the recorded setup.

To add Vitest to a different or newly created project, use:

```bash
npm install --save-dev vitest
```

`--save-dev` records Vitest under `devDependencies` because it is needed while
developing and verifying the application, not while running production code.

## Configuration

The repository keeps Vitest configuration in `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        globals: false,
        include: ['src/**/*.test.ts'],
    },
});
```

- `environment: 'node'` runs these pure unit tests without a browser DOM.
- `globals: false` requires explicit imports such as
  `import { describe, expect, it } from 'vitest'`. This makes each test file's
  dependencies visible.
- `include: ['src/**/*.test.ts']` discovers files ending in `.test.ts` anywhere
  under `src`. A file outside that pattern will not run automatically.

Vitest's cache and generated working data can be recreated, so `.vitest/` is
excluded from version control in `.gitignore`.

## Running the tests

Run all Vitest tests once:

```bash
npm test
```

This script uses `vitest run`. It executes the suite once and then exits, which
is the appropriate behaviour for CI and final verification.

Run Vitest in watch mode while editing:

```bash
npm run test:watch
```

This script uses `vitest`. It stays active and reruns relevant tests after file
changes.

Run only this learning directory once:

```bash
npm run test:unit
```

Run the TypeScript compiler without producing JavaScript files:

```bash
npm run typecheck
```

Type checking and unit testing prove different things, so both commands should
pass before a commit.

Run the unit suite with V8 coverage and enforce the configured quality gate:

```bash
npm run test:unit:coverage
```

Run the complete Stage 2 closure check:

```bash
npm run test:unit:closure
```

The closure command requires both TypeScript compilation and the covered unit
suite to succeed.

## Curriculum status

- [x] Vitest installation, configuration, discovery, and CLI execution
- [x] `describe`, `it`, `test`, and `expect`
- [x] Primitive and object matchers
- [x] Arrange-Act-Assert in executable tests
- [x] Boundary, state-transition, and table-driven pure-function tests
- [x] Exception and validation tests
- [x] Asynchronous function tests
- [x] Dependency boundaries, stubs, spies, and mocks
- [x] Fake timers and module mocking
- [x] Readability, coverage, and final integrated unit-testing check

## Files

- `01-lockout-policy.ts` contains the production rule.
- `01-lockout-policy.test.ts` contains the first Vitest suite.
- `02-order-input-validation.ts` validates unknown runtime data and throws a
  structured custom error.
- `02-order-input-validation.test.ts` verifies valid results, exception
  contracts, structured issues, and invalid boundaries.
- `03-payment-status-check.ts` validates data from an asynchronous status
  source and translates source failures into a domain-specific error.
- `03-payment-status-check.test.ts` demonstrates direct `await`, `resolves`,
  `rejects`, Promise-returning tests, and asynchronous error inspection.
- `04-payment-confirmation-service.ts` separates payment-confirmation rules
  from persistence and audit dependencies.
- `04-payment-confirmation-service.test.ts` compares an in-memory fake, a
  fixed-response stub, a spy, and typed `vi.fn` mocks.
- `05-security-event-client.ts` is the real HTTP adapter for security events.
- `05-security-event-client.test.ts` verifies the adapter at the `fetch`
  boundary without using a real network.
- `05-session-expiration-monitor.ts` contains time-dependent session behaviour.
- `05-session-expiration-monitor.test.ts` uses fake timers and a module mock to
  control time and isolate the HTTP adapter.

Production and test code are separate because they have different
responsibilities. Production code implements behaviour; test code provides
evidence about that behaviour.

## Test-double decision guide

| Double | Purpose | Evidence in this stage |
| --- | --- | --- |
| Fake | Provide a lightweight working implementation | In-memory payment repository and audit sink |
| Stub | Return controlled data that reaches a behaviour | Missing-payment response |
| Spy | Observe calls while real behaviour can continue | `vi.spyOn` around the in-memory audit sink |
| Mock | Configure and verify required interactions | Repository and audit calls with typed `vi.fn` |

The tool does not determine the category. A `vi.fn` can behave as a stub, spy,
or mock depending on how the test uses it. Prefer state-based verification and
use interaction assertions only when the interaction is part of the risk or
contract.

## Readability rules

- Give each test one clear behavioural reason to fail.
- Name the condition and expected outcome, not the implementation technique.
- Keep Arrange, Act, and Assert visible without adding ceremonial comments to
  every short test.
- Use builders or helpers only when they remove noise without hiding important
  input differences.
- Keep time and external data deterministic.
- Restore timers, globals, and spies after tests that change shared state.
- Avoid asserting private implementation details that are safe to refactor.

## Coverage and its limits

Coverage answers which production statements, branches, functions, and lines
executed. It does not prove that assertions are meaningful, requirements are
correct, important data combinations were selected, or real dependencies work.

This stage uses V8 coverage with global minimums of 95% statements, 90%
branches, 95% functions, and 95% lines. These thresholds are a regression alarm,
not a target to reach with low-value tests. The HTML report is generated under
`coverage/unit/` and is intentionally excluded from version control.

## Stage 2 closure evidence

| Capability | Executable evidence |
| --- | --- |
| Pure behaviour, boundaries, and transitions | `01-lockout-policy.test.ts` |
| Runtime validation and exception paths | `02-order-input-validation.test.ts` |
| Fulfilled and rejected asynchronous work | `03-payment-status-check.test.ts` |
| Dependency boundaries and test doubles | `04-payment-confirmation-service.test.ts` |
| HTTP adapter contract | `05-security-event-client.test.ts` |
| Clock control and module isolation | `05-session-expiration-monitor.test.ts` |
| Compiler, suite, and coverage gate | `npm run test:unit:closure` |

The unit-testing foundation is closed when the closure command passes and the
learner can explain why each example uses its chosen test boundary. The next
stage is the React knowledge required for component testing.

## Final independent practice

Extend the payment-confirmation service with one new business rule. Start from
the risk, choose state-based or interaction-based verification deliberately,
write the failing test first, implement the smallest change, and run
`npm run test:unit:closure`. Do not add a mock unless the rule crosses a real
dependency boundary.
