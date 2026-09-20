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
