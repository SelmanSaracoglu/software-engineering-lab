# Test Engineering Foundations

This directory contains the executable learning sequence that connects
requirements and risks to deliberate test design. It comes after the TypeScript
foundation and before framework-specific unit, component, API, and E2E testing.

The goal is not to produce test cases mechanically. The learner should be able
to explain why a test exists, what boundary it owns, which failure it can reveal,
and what evidence is required before reporting a defect.

## Curriculum status

- [x] `01-requirement-risk-and-test-language.ts`
- [ ] Test design techniques: positive and negative testing, equivalence
  partitioning, boundary values, and state transitions
- [ ] Test levels and risk-based distribution
- [ ] Determinism, isolation, test data, and environment control
- [ ] Integrated feature analysis and foundation check

## Verification

Compile the complete repository:

```bash
npm run typecheck
```

Run the current lesson:

```bash
npm run test-foundations:01
```

Testing frameworks are intentionally not used in this first lesson. Vitest is
introduced after the learner can define the expected behaviour and choose an
appropriate test responsibility.

