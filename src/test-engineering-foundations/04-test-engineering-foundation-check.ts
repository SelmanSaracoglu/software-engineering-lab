/*
 * TEST ENGINEERING FOUNDATIONS
 * INTEGRATED FOUNDATION CHECK
 *
 * This file proves the Stage 1 outcome: analyze a feature and distribute its
 * risks across unit, component, API/integration, and E2E boundaries without
 * turning every idea into the same kind of test.
 *
 * Complete flow:
 *
 * requirements
 * -> risks
 * -> test conditions
 * -> design techniques
 * -> test levels and boundaries
 * -> traceable evidence plan
 * -> coverage validation
 */

/*
 * SECTION 1
 * Feature requirements
 */

type FeatureRequirement = {
    id: string;
    statement: string;
};

const requirements: readonly FeatureRequirement[] = [
    {
        id: 'REQ-LOCK-01',
        statement:
            'The fifth consecutive failed password locks an active account for fifteen minutes.',
    },
    {
        id: 'REQ-LOCK-02',
        statement:
            'A successful sign-in before the fifth failure resets the failure counter.',
    },
    {
        id: 'REQ-LOCK-03',
        statement:
            'A locked account receives no session and only a generic public rejection.',
    },
];

/*
 * SECTION 2
 * Product and security risks
 */

type FeatureRisk = {
    id: string;
    description: string;
    impact: 1 | 2 | 3 | 4 | 5;
    likelihood: 1 | 2 | 3 | 4 | 5;
};

const risks: readonly FeatureRisk[] = [
    {
        id: 'RISK-BRUTE-FORCE',
        description:
            'An attacker continues password guessing without a working limit.',
        impact: 5,
        likelihood: 4,
    },
    {
        id: 'RISK-LEGITIMATE-LOCKOUT',
        description:
            'A legitimate user stays locked longer than required.',
        impact: 4,
        likelihood: 3,
    },
    {
        id: 'RISK-ACCOUNT-DISCLOSURE',
        description:
            'The response reveals account existence or internal account state.',
        impact: 4,
        likelihood: 3,
    },
    {
        id: 'RISK-CONCURRENCY-BYPASS',
        description:
            'Concurrent requests bypass or corrupt the failure threshold.',
        impact: 5,
        likelihood: 3,
    },
];

function riskScore(risk: FeatureRisk): number {
    return risk.impact * risk.likelihood;
}

function isHighRisk(risk: FeatureRisk): boolean {
    return riskScore(risk) >= 15;
}

/*
 * SECTION 3
 * Test conditions
 */

type FeatureCondition = {
    id: string;
    objective: string;
    requirementIds: readonly string[];
    riskIds: readonly string[];
};

const conditions: readonly FeatureCondition[] = [
    {
        id: 'COND-THRESHOLD',
        objective:
            'Verify the transition immediately below and at the fifth failure.',
        requirementIds: ['REQ-LOCK-01'],
        riskIds: ['RISK-BRUTE-FORCE'],
    },
    {
        id: 'COND-EXPIRY',
        objective:
            'Verify rejection before expiry and access at the exact expiry boundary.',
        requirementIds: ['REQ-LOCK-01'],
        riskIds: ['RISK-LEGITIMATE-LOCKOUT'],
    },
    {
        id: 'COND-RESET',
        objective:
            'Verify that success before the threshold resets stored failures.',
        requirementIds: ['REQ-LOCK-02'],
        riskIds: ['RISK-LEGITIMATE-LOCKOUT'],
    },
    {
        id: 'COND-GENERIC-REJECTION',
        objective:
            'Verify that locked attempts create no session and reveal no account state.',
        requirementIds: ['REQ-LOCK-03'],
        riskIds: [
            'RISK-BRUTE-FORCE',
            'RISK-ACCOUNT-DISCLOSURE',
        ],
    },
    {
        id: 'COND-CONCURRENCY',
        objective:
            'Verify that simultaneous failures cannot bypass or corrupt the threshold.',
        requirementIds: ['REQ-LOCK-01'],
        riskIds: ['RISK-CONCURRENCY-BYPASS'],
    },
];

/*
 * SECTION 4
 * Test distribution
 */

type TestLevel =
    | 'UNIT'
    | 'COMPONENT'
    | 'API_INTEGRATION'
    | 'E2E';

type DesignTechnique =
    | 'POSITIVE'
    | 'NEGATIVE'
    | 'EQUIVALENCE_PARTITION'
    | 'BOUNDARY_VALUE'
    | 'STATE_TRANSITION'
    | 'CONCURRENCY'
    | 'CRITICAL_USER_JOURNEY';

type PlannedTest = {
    id: string;
    title: string;
    level: TestLevel;
    conditionIds: readonly string[];
    requirementIds: readonly string[];
    riskIds: readonly string[];
    techniques: readonly DesignTechnique[];
    realParts: readonly string[];
    controlledParts: readonly string[];
    expectedEvidence: string;
};

const plannedTests: readonly PlannedTest[] = [
    {
        id: 'UNIT-LOCK-01',
        title: 'The fifth failure enters the locked state',
        level: 'UNIT',
        conditionIds: ['COND-THRESHOLD'],
        requirementIds: ['REQ-LOCK-01'],
        riskIds: ['RISK-BRUTE-FORCE'],
        techniques: [
            'NEGATIVE',
            'BOUNDARY_VALUE',
            'STATE_TRANSITION',
        ],
        realParts: ['lockout transition function'],
        controlledParts: ['account state', 'clock'],
        expectedEvidence:
            'Four previous failures plus one new failure produce LOCKED until exactly fifteen minutes later.',
    },
    {
        id: 'UNIT-LOCK-02',
        title: 'Success before the threshold resets the counter',
        level: 'UNIT',
        conditionIds: ['COND-RESET'],
        requirementIds: ['REQ-LOCK-02'],
        riskIds: ['RISK-LEGITIMATE-LOCKOUT'],
        techniques: ['POSITIVE', 'STATE_TRANSITION'],
        realParts: ['lockout transition function'],
        controlledParts: ['account state', 'clock'],
        expectedEvidence:
            'A correct password from four failures returns ACTIVE with zero failures.',
    },
    {
        id: 'UNIT-LOCK-03',
        title: 'The exact expiry instant ends the lock',
        level: 'UNIT',
        conditionIds: ['COND-EXPIRY'],
        requirementIds: ['REQ-LOCK-01'],
        riskIds: ['RISK-LEGITIMATE-LOCKOUT'],
        techniques: ['BOUNDARY_VALUE', 'STATE_TRANSITION'],
        realParts: ['lock-expiry rule'],
        controlledParts: ['fixed clock', 'account state'],
        expectedEvidence:
            'One millisecond before expiry is rejected and the exact expiry instant is allowed.',
    },
    {
        id: 'COMP-LOCK-01',
        title: 'The sign-in form shows one generic rejection',
        level: 'COMPONENT',
        conditionIds: ['COND-GENERIC-REJECTION'],
        requirementIds: ['REQ-LOCK-03'],
        riskIds: ['RISK-ACCOUNT-DISCLOSURE'],
        techniques: ['NEGATIVE', 'EQUIVALENCE_PARTITION'],
        realParts: [
            'sign-in component',
            'rendering',
            'user interaction',
        ],
        controlledParts: [
            'locked-account API response',
            'unknown-account API response',
        ],
        expectedEvidence:
            'Both controlled rejection classes render the same public message and no success state.',
    },
    {
        id: 'API-LOCK-01',
        title: 'The real API persists the fifth failure and refuses a session',
        level: 'API_INTEGRATION',
        conditionIds: [
            'COND-THRESHOLD',
            'COND-GENERIC-REJECTION',
        ],
        requirementIds: ['REQ-LOCK-01', 'REQ-LOCK-03'],
        riskIds: ['RISK-BRUTE-FORCE'],
        techniques: ['NEGATIVE', 'STATE_TRANSITION'],
        realParts: [
            'HTTP route',
            'validation',
            'lockout service',
            'session service',
            'database',
        ],
        controlledParts: ['browser UI', 'fixed clock'],
        expectedEvidence:
            'The fifth failed request persists LOCKED, returns the generic rejection, and creates no session.',
    },
    {
        id: 'API-LOCK-02',
        title: 'The real API persists a successful counter reset',
        level: 'API_INTEGRATION',
        conditionIds: ['COND-RESET'],
        requirementIds: ['REQ-LOCK-02'],
        riskIds: ['RISK-LEGITIMATE-LOCKOUT'],
        techniques: ['POSITIVE', 'STATE_TRANSITION'],
        realParts: [
            'HTTP route',
            'authentication service',
            'database',
        ],
        controlledParts: ['browser UI'],
        expectedEvidence:
            'Successful authentication creates a session and stores zero consecutive failures.',
    },
    {
        id: 'API-LOCK-03',
        title: 'Concurrent failures cannot bypass the threshold',
        level: 'API_INTEGRATION',
        conditionIds: ['COND-CONCURRENCY'],
        requirementIds: ['REQ-LOCK-01'],
        riskIds: ['RISK-CONCURRENCY-BYPASS'],
        techniques: ['NEGATIVE', 'CONCURRENCY'],
        realParts: [
            'HTTP route',
            'transaction logic',
            'database locking',
        ],
        controlledParts: ['browser UI', 'request release timing'],
        expectedEvidence:
            'Simultaneous failed requests preserve the threshold invariant and final locked state.',
    },
    {
        id: 'E2E-LOCK-01',
        title: 'A locked user cannot complete the real sign-in journey',
        level: 'E2E',
        conditionIds: ['COND-GENERIC-REJECTION'],
        requirementIds: ['REQ-LOCK-03'],
        riskIds: [
            'RISK-BRUTE-FORCE',
            'RISK-ACCOUNT-DISCLOSURE',
        ],
        techniques: ['NEGATIVE', 'CRITICAL_USER_JOURNEY'],
        realParts: [
            'browser',
            'frontend',
            'HTTP API',
            'backend',
            'database',
        ],
        controlledParts: ['known locked test account'],
        expectedEvidence:
            'The browser shows the generic rejection, remains unauthenticated, and cannot open the protected area.',
    },
];

/*
 * SECTION 5
 * Validate traceability and high-risk coverage
 */

type PlanIssue = {
    kind:
        | 'UNKNOWN_REFERENCE'
        | 'UNCOVERED_REQUIREMENT'
        | 'UNCOVERED_CONDITION'
        | 'UNCOVERED_HIGH_RISK'
        | 'MISSING_EVIDENCE';
    message: string;
};

function collectReferencedIds(
    tests: readonly PlannedTest[],
    selectIds: (test: PlannedTest) => readonly string[],
): Set<string> {
    return new Set(tests.flatMap(selectIds));
}

function validatePlan(tests: readonly PlannedTest[]): PlanIssue[] {
    const issues: PlanIssue[] = [];

    const knownRequirementIds = new Set(
        requirements.map((requirement) => requirement.id),
    );
    const knownConditionIds = new Set(
        conditions.map((condition) => condition.id),
    );
    const knownRiskIds = new Set(risks.map((risk) => risk.id));

    const coveredRequirementIds = collectReferencedIds(
        tests,
        (test) => test.requirementIds,
    );
    const coveredConditionIds = collectReferencedIds(
        tests,
        (test) => test.conditionIds,
    );
    const coveredRiskIds = collectReferencedIds(
        tests,
        (test) => test.riskIds,
    );

    for (const test of tests) {
        for (const requirementId of test.requirementIds) {
            if (!knownRequirementIds.has(requirementId)) {
                issues.push({
                    kind: 'UNKNOWN_REFERENCE',
                    message:
                        `${test.id} references unknown requirement ${requirementId}.`,
                });
            }
        }

        for (const conditionId of test.conditionIds) {
            if (!knownConditionIds.has(conditionId)) {
                issues.push({
                    kind: 'UNKNOWN_REFERENCE',
                    message:
                        `${test.id} references unknown condition ${conditionId}.`,
                });
            }
        }

        for (const riskId of test.riskIds) {
            if (!knownRiskIds.has(riskId)) {
                issues.push({
                    kind: 'UNKNOWN_REFERENCE',
                    message:
                        `${test.id} references unknown risk ${riskId}.`,
                });
            }
        }

        if (test.expectedEvidence.trim().length === 0) {
            issues.push({
                kind: 'MISSING_EVIDENCE',
                message: `${test.id} has no expected evidence.`,
            });
        }
    }

    for (const requirement of requirements) {
        if (!coveredRequirementIds.has(requirement.id)) {
            issues.push({
                kind: 'UNCOVERED_REQUIREMENT',
                message: `${requirement.id} has no planned test.`,
            });
        }
    }

    for (const condition of conditions) {
        if (!coveredConditionIds.has(condition.id)) {
            issues.push({
                kind: 'UNCOVERED_CONDITION',
                message: `${condition.id} has no planned test.`,
            });
        }
    }

    for (const risk of risks.filter(isHighRisk)) {
        if (!coveredRiskIds.has(risk.id)) {
            issues.push({
                kind: 'UNCOVERED_HIGH_RISK',
                message:
                    `${risk.id} has score ${riskScore(risk)} but no planned test.`,
            });
        }
    }

    return issues;
}

const planIssues = validatePlan(plannedTests);

if (planIssues.length > 0) {
    throw new Error(
        `Foundation plan is invalid: ${JSON.stringify(planIssues)}`,
    );
}

/*
 * SECTION 6
 * Produce concise coverage evidence
 */

function countTestsByLevel(
    tests: readonly PlannedTest[],
): Record<TestLevel, number> {
    const counts: Record<TestLevel, number> = {
        UNIT: 0,
        COMPONENT: 0,
        API_INTEGRATION: 0,
        E2E: 0,
    };

    for (const test of tests) {
        counts[test.level] += 1;
    }

    return counts;
}

function mapRiskCoverage(
    tests: readonly PlannedTest[],
): Map<string, string[]> {
    const coverage = new Map<string, string[]>();

    for (const test of tests) {
        for (const riskId of test.riskIds) {
            const currentTests = coverage.get(riskId) ?? [];
            currentTests.push(test.id);
            coverage.set(riskId, currentTests);
        }
    }

    return coverage;
}

const testsByLevel = countTestsByLevel(plannedTests);
const riskCoverage = mapRiskCoverage(plannedTests);

console.log('Requirements:', requirements.length);
console.log('Risks:', risks.length);
console.log('Test conditions:', conditions.length);
console.log('Tests by level:', testsByLevel);
console.log(
    'Risk coverage:',
    Object.fromEntries(riskCoverage),
);
console.log('Foundation plan issues:', planIssues);
console.log('Test Engineering Foundations: PASSED');

/*
 * The counts are not target ratios. Three unit tests and one E2E test are not
 * automatically correct because a pyramid diagram looks balanced. Each planned
 * test must own useful evidence at an appropriate boundary.
 */

/*
 * ERROR OBSERVATION
 *
 * Remove the concurrency integration test and validate the plan again. The
 * high-risk concurrency bypass becomes visible as uncovered evidence.
 */

const planWithoutConcurrencyTest = plannedTests.filter((test) => {
    return test.id !== 'API-LOCK-03';
});

const incompletePlanIssues = validatePlan(planWithoutConcurrencyTest);

console.log(
    'Issues detected after removing concurrency evidence:',
    incompletePlanIssues,
);

/*
 * The validator reports both the uncovered concurrency condition and the
 * uncovered high-risk item. A suite can contain many tests and still miss an
 * important risk; raw test count is not coverage reasoning.
 */

/*
 * FINAL SUMMARY
 *
 * Stage 1 is complete when a feature can be analyzed in this order:
 *
 * 1. Clarify verifiable requirements and expected results.
 * 2. Identify product, quality, operational, and security risks.
 * 3. Express focused test conditions and scenarios.
 * 4. Apply partitions, boundaries, and state transitions deliberately.
 * 5. Place each check at the smallest boundary that proves the needed fact.
 * 6. Control time, data, dependencies, environment, and test isolation.
 * 7. Keep traceability from requirement and risk to evidence.
 * 8. Investigate test failures before reporting product defects.
 *
 * The next stage can now introduce Vitest. The framework will implement test
 * decisions that already have a purpose, expected result, and boundary.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: How do you turn a requirement into an automation strategy?
 * A: I clarify observable expectations, identify risks and conditions, select
 *    representative cases with design techniques, and place each check at the
 *    smallest test boundary that can provide the required evidence.
 *
 * Q: How do you avoid duplicating the same test at every level?
 * A: I give each level a distinct responsibility. Unit tests cover rule
 *    variations, component tests cover UI responses, integration tests cover
 *    real collaborations, and E2E tests cover a few critical journeys.
 *
 * Q: What makes test evidence trustworthy?
 * A: A confirmed expectation, controlled starting state, deterministic inputs,
 *    isolated data, known environment, explicit assertions, and reproducible
 *    actual results connected to a requirement or risk.
 */

