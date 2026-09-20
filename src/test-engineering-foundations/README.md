# Test Engineering Foundations

This directory contains the executable learning sequence that connects
requirements and risks to deliberate test design. It comes after the TypeScript
foundation and before framework-specific unit, component, API, and E2E testing.

The goal is not to produce test cases mechanically. The learner should be able
to explain why a test exists, what boundary it owns, which failure it can reveal,
and what evidence is required before reporting a defect.

## Curriculum status

- [x] `01-requirement-risk-and-test-language.ts`
- [x] `02-test-design-techniques.ts`
- [x] `03-test-levels-and-reliable-tests.ts`
- [x] `04-test-engineering-foundation-check.ts`

## Verification

Compile the complete repository:

```bash
npm run typecheck
```

Run each lesson:

```bash
npm run test-foundations:01
npm run test-foundations:02
npm run test-foundations:03
npm run test-foundations:check
```

Run the complete stage:

```bash
npm run test-foundations
```

## Completion boundary

This stage is complete when a feature can be analyzed from requirement and risk
through test conditions, scenarios, cases, expected evidence, and deliberate
distribution across unit, component, API/integration, and E2E boundaries.

Testing frameworks are intentionally not used in this stage. Vitest is the next
curriculum stage and will implement test decisions that already have a purpose,
expected result, and boundary.
