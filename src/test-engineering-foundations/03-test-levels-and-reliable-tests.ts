/*
 * TEST ENGINEERING FOUNDATIONS
 * TEST LEVELS AND RELIABLE TESTS
 *
 * A test level is a boundary decision. It identifies which parts are real,
 * which dependencies are controlled, and which failure the test should expose.
 *
 * This lesson combines:
 * - unit, component, API/integration, and E2E responsibility
 * - risk-based distribution across levels
 * - deterministic tests
 * - test isolation
 * - test data and environment control
 * - failure diagnosis
 */

/*
 * SECTION 1
 * Select the level from the evidence needed
 */

type TestLevel =
    | 'UNIT'
    | 'COMPONENT'
    | 'API_INTEGRATION'
    | 'E2E';

type EvidenceNeed =
    | 'PURE_RULE'
    | 'UI_BEHAVIOR'
    | 'HTTP_AND_DATABASE'
    | 'COMPLETE_USER_FLOW';

type TestObjective = {
    id: string;
    description: string;
    evidenceNeed: EvidenceNeed;
    relatedRiskIds: readonly string[];
};

function selectTestLevel(objective: TestObjective): TestLevel {
    switch (objective.evidenceNeed) {
        case 'PURE_RULE':
            return 'UNIT';
        case 'UI_BEHAVIOR':
            return 'COMPONENT';
        case 'HTTP_AND_DATABASE':
            return 'API_INTEGRATION';
        case 'COMPLETE_USER_FLOW':
            return 'E2E';
    }
}

const lockoutObjectives: readonly TestObjective[] = [
    {
        id: 'OBJ-UNIT-01',
        description:
            'The fifth consecutive failure produces a fifteen-minute lock.',
        evidenceNeed: 'PURE_RULE',
        relatedRiskIds: ['RISK-BRUTE-FORCE'],
    },
    {
        id: 'OBJ-COMP-01',
        description:
            'The sign-in form displays the generic rejected state.',
        evidenceNeed: 'UI_BEHAVIOR',
        relatedRiskIds: ['RISK-ACCOUNT-DISCLOSURE'],
    },
    {
        id: 'OBJ-API-01',
        description:
            'The API persists the failure count and refuses a locked account.',
        evidenceNeed: 'HTTP_AND_DATABASE',
        relatedRiskIds: ['RISK-BRUTE-FORCE'],
    },
    {
        id: 'OBJ-E2E-01',
        description:
            'A locked user cannot complete the real sign-in journey.',
        evidenceNeed: 'COMPLETE_USER_FLOW',
        relatedRiskIds: ['RISK-BRUTE-FORCE'],
    },
];

const selectedLevels = lockoutObjectives.map((objective) => {
    return {
        objectiveId: objective.id,
        level: selectTestLevel(objective),
    };
});

console.log('Selected test levels:', selectedLevels);

/*
 * Unit test:
 * Verifies a small rule or transformation without real network, browser, or
 * database dependencies.
 *
 * Component test:
 * Verifies a UI component in a real browser rendering environment while
 * controlling dependencies outside the component boundary.
 *
 * API/integration test:
 * Verifies real collaboration such as route, validation, service, session, and
 * database behaviour. It does not need the browser UI.
 *
 * E2E test:
 * Verifies a critical user flow through the real frontend, backend, contract,
 * and persistence boundary.
 */

/*
 * SECTION 2
 * Explicit boundaries
 */

type TestBoundary = {
    objectiveId: string;
    level: TestLevel;
    realParts: readonly string[];
    controlledParts: readonly string[];
    failureMeaning: string;
};

const lockoutBoundaries: readonly TestBoundary[] = [
    {
        objectiveId: 'OBJ-UNIT-01',
        level: 'UNIT',
        realParts: ['lockout policy function'],
        controlledParts: ['clock', 'account state'],
        failureMeaning: 'The lockout rule calculated a wrong transition.',
    },
    {
        objectiveId: 'OBJ-COMP-01',
        level: 'COMPONENT',
        realParts: [
            'sign-in component',
            'rendering',
            'user interaction',
        ],
        controlledParts: ['API response', 'database'],
        failureMeaning:
            'The UI handled a known rejected response incorrectly.',
    },
    {
        objectiveId: 'OBJ-API-01',
        level: 'API_INTEGRATION',
        realParts: [
            'HTTP route',
            'request validation',
            'lockout service',
            'session logic',
            'database',
        ],
        controlledParts: ['browser UI'],
        failureMeaning:
            'The API and persistence boundary produced inconsistent behaviour.',
    },
    {
        objectiveId: 'OBJ-E2E-01',
        level: 'E2E',
        realParts: [
            'browser',
            'frontend',
            'HTTP API',
            'backend',
            'database',
        ],
        controlledParts: ['pre-created test account'],
        failureMeaning:
            'The critical real user journey failed across system boundaries.',
    },
];

console.log('Test boundaries:', lockoutBoundaries);

/*
 * A larger boundary gives broader confidence but usually costs more time,
 * infrastructure, diagnosis effort, and maintenance. A smaller boundary gives
 * faster and more precise feedback but cannot prove integration it excludes.
 *
 * The goal is complementary evidence, not copying every assertion into every
 * level. For example, dozens of lockout boundary values belong in unit tests;
 * one critical real journey may be enough at E2E level.
 */

/*
 * SECTION 3
 * Deterministic tests
 */

type Clock = {
    nowMs: () => number;
};

function isLockActive(
    lockedUntilMs: number,
    clock: Clock,
): boolean {
    return clock.nowMs() < lockedUntilMs;
}

const fixedNowMs = Date.parse('2026-09-20T10:00:00.000Z');

const fixedClock: Clock = {
    nowMs: () => fixedNowMs,
};

const lockEndingOneMillisecondLater = fixedNowMs + 1;
const lockEndingNow = fixedNowMs;

console.log(
    'Deterministic lock checks:',
    {
        beforeExpiry: isLockActive(
            lockEndingOneMillisecondLater,
            fixedClock,
        ),
        atExpiry: isLockActive(lockEndingNow, fixedClock),
    },
);

/*
 * A deterministic test produces the same result from the same controlled
 * inputs. Time, randomness, network availability, shared data, and execution
 * order are common hidden sources of variation.
 *
 * Calling Date.now directly inside important logic makes exact time boundaries
 * difficult to reproduce. Injecting a fixed clock makes one millisecond before
 * expiry and the exact expiry instant stable and explainable.
 */

/*
 * SECTION 4
 * Test isolation
 */

type AttemptStore = {
    get: (username: string) => number;
    recordFailure: (username: string) => number;
    reset: (username: string) => void;
};

function createAttemptStore(): AttemptStore {
    const attemptsByUsername = new Map<string, number>();

    return {
        get: (username) => {
            return attemptsByUsername.get(username) ?? 0;
        },
        recordFailure: (username) => {
            const nextCount =
                (attemptsByUsername.get(username) ?? 0) + 1;

            attemptsByUsername.set(username, nextCount);

            return nextCount;
        },
        reset: (username) => {
            attemptsByUsername.delete(username);
        },
    };
}

const firstIsolatedStore = createAttemptStore();
const secondIsolatedStore = createAttemptStore();

firstIsolatedStore.recordFailure('ada');

console.log(
    'Isolated store counts:',
    {
        firstTest: firstIsolatedStore.get('ada'),
        secondTest: secondIsolatedStore.get('ada'),
    },
);

/*
 * Isolation means one test does not depend on changes left by another test.
 * Each example above receives a fresh store. The second store remains at zero
 * even after the first store records a failure.
 *
 * Isolation does not always mean no shared infrastructure. Integration tests
 * may share a database server while using separate schemas, transactions,
 * unique records, or reliable cleanup to isolate their data.
 */

/*
 * SECTION 5
 * Deliberate test data
 */

type AccountFixture = {
    id: string;
    username: string;
    status: 'ACTIVE' | 'DISABLED';
    failedAttempts: number;
    lockedUntilMs: number | null;
};

function buildAccount(
    overrides: Partial<AccountFixture> = {},
): AccountFixture {
    return {
        id: 'account-default',
        username: 'test.user',
        status: 'ACTIVE',
        failedAttempts: 0,
        lockedUntilMs: null,
        ...overrides,
    };
}

const accountNearLockout = buildAccount({
    id: 'account-near-lockout',
    username: 'near.lockout',
    failedAttempts: 4,
});

const disabledAccount = buildAccount({
    id: 'account-disabled',
    username: 'disabled.user',
    status: 'DISABLED',
});

console.log('Deliberate test data:', {
    accountNearLockout,
    disabledAccount,
});

/*
 * Good test data makes the relevant condition visible. A builder supplies safe
 * defaults while each test overrides only the facts that create its scenario.
 *
 * Risks remain if defaults hide important information or if tests silently rely
 * on existing accounts. Test data ownership, uniqueness, cleanup, and privacy
 * must match the test level and environment.
 */

/*
 * SECTION 6
 * Environment readiness
 */

type TestEnvironment = {
    name: string;
    apiBaseUrl: string;
    databaseResetAllowed: boolean;
    dedicatedTestData: boolean;
    clockControllable: boolean;
};

function findEnvironmentProblems(
    environment: TestEnvironment,
    level: TestLevel,
): string[] {
    const problems: string[] = [];

    if (!environment.apiBaseUrl.startsWith('https://')) {
        problems.push('API base URL must use HTTPS.');
    }

    if (!environment.dedicatedTestData) {
        problems.push('Dedicated test data is required.');
    }

    if (
        level === 'API_INTEGRATION' &&
        !environment.databaseResetAllowed
    ) {
        problems.push(
            'API integration tests require a safe data reset strategy.',
        );
    }

    if (!environment.clockControllable) {
        problems.push(
            'Exact lock-expiry tests require a controllable clock.',
        );
    }

    return problems;
}

const controlledEnvironment: TestEnvironment = {
    name: 'local-integration',
    apiBaseUrl: 'https://local.test',
    databaseResetAllowed: true,
    dedicatedTestData: true,
    clockControllable: true,
};

const environmentProblems = findEnvironmentProblems(
    controlledEnvironment,
    'API_INTEGRATION',
);

console.log('Environment problems:', environmentProblems);

/*
 * An environment is part of the test system. A test can fail because a service
 * is unavailable, configuration differs, data is stale, time cannot be
 * controlled, or cleanup is unsafe. Environment assumptions should therefore
 * be explicit and checked before interpreting a failure as product evidence.
 */

/*
 * SECTION 7
 * Failure diagnosis
 */

type FailureSignal = {
    reproducible: boolean;
    productBehaviourObservedIndependently: boolean;
    testPassedInAnotherEnvironment: boolean;
    setupCompleted: boolean;
    expectationConfirmed: boolean;
};

type LikelyFailureArea =
    | 'PRODUCT'
    | 'TEST_OR_DATA'
    | 'ENVIRONMENT'
    | 'REQUIREMENT_REVIEW'
    | 'MORE_INVESTIGATION';

function identifyLikelyFailureArea(
    signal: FailureSignal,
): LikelyFailureArea {
    if (!signal.expectationConfirmed) {
        return 'REQUIREMENT_REVIEW';
    }

    if (!signal.setupCompleted) {
        return 'TEST_OR_DATA';
    }

    if (signal.testPassedInAnotherEnvironment) {
        return 'ENVIRONMENT';
    }

    if (
        signal.reproducible &&
        signal.productBehaviourObservedIndependently
    ) {
        return 'PRODUCT';
    }

    return 'MORE_INVESTIGATION';
}

const diagnosedArea = identifyLikelyFailureArea({
    reproducible: true,
    productBehaviourObservedIndependently: true,
    testPassedInAnotherEnvironment: false,
    setupCompleted: true,
    expectationConfirmed: true,
});

console.log('Likely failure area:', diagnosedArea);

/*
 * This function is a reasoning aid, not an automatic defect classifier. Real
 * investigation may require logs, request evidence, database state, screenshots,
 * traces, and reproduction outside the test runner.
 */

/*
 * WORKED APPLICATION
 *
 * Lockout evidence is distributed as follows:
 *
 * UNIT
 * - threshold, counter reset, time boundary, and state-transition variations
 *
 * COMPONENT
 * - loading, generic rejection, disabled controls, and retry presentation with
 *   controlled API conditions
 *
 * API_INTEGRATION
 * - request validation, persisted failure count, session refusal, transaction,
 *   and concurrent request behaviour with the real database
 *
 * E2E
 * - one or a few critical real journeys proving the browser and backend agree
 *
 * The E2E test does not need to repeat every unit boundary. Each level owns a
 * different failure and together they provide broader confidence.
 */

/*
 * ERROR OBSERVATION
 */

const sharedStore = createAttemptStore();

sharedStore.recordFailure('shared.user');

const expectedInitialCountInAnotherTest = 0;
const contaminatedActualCount = sharedStore.get('shared.user');

console.log('Shared-state contamination detected:', {
    passed:
        contaminatedActualCount === expectedInitialCountInAnotherTest,
    expected: expectedInitialCountInAnotherTest,
    actual: contaminatedActualCount,
});

/*
 * The second imagined test fails only because it reused state left by the first
 * test. Creating a fresh store per test removes the ordering dependency. Retry
 * would hide the symptom temporarily but would not fix the isolation defect.
 */

/*
 * FINAL SUMMARY
 *
 * Choose a test level from the evidence and boundary required, not from the
 * framework currently open in the editor. Keep inputs and dependencies
 * controllable enough for deterministic results. Give every test independent
 * data or reliable cleanup. Treat environment assumptions as part of setup and
 * investigate failures before calling them product defects.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: How do you choose between unit, integration, and E2E testing?
 * A: I identify the risk and the smallest boundary that can provide the needed
 *    evidence. I use broader tests only for collaboration or journeys that a
 *    smaller boundary cannot prove.
 *
 * Q: What makes a test deterministic?
 * A: The same controlled inputs and starting state produce the same observable
 *    result. Time, randomness, data, dependencies, and environment are managed.
 *
 * Q: What is test isolation?
 * A: One test does not depend on another test's execution, order, or leftover
 *    state. It owns or safely resets the data it changes.
 *
 * Q: Why can a passing component test coexist with a failing E2E test?
 * A: The component test may correctly prove UI behaviour against a controlled
 *    response while the real frontend-backend contract or environment is broken.
 */

