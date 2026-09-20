/*
 * TEST ENGINEERING FOUNDATIONS
 * TEST DESIGN TECHNIQUES
 *
 * Exhaustive testing is normally impossible. Test design techniques help us
 * choose a small set of cases that represents important behaviour and risk.
 *
 * This lesson combines:
 * - positive and negative testing
 * - equivalence partitioning
 * - boundary value analysis
 * - state-transition testing
 * - risk-based test selection
 */

/*
 * SECTION 1
 * Positive and negative testing
 */

type ScenarioKind = 'POSITIVE' | 'NEGATIVE';

type DesignScenario = {
    id: string;
    kind: ScenarioKind;
    purpose: string;
};

const designScenarios: readonly DesignScenario[] = [
    {
        id: 'SCN-NAME-01',
        kind: 'POSITIVE',
        purpose: 'Accept a display name that satisfies the rules.',
    },
    {
        id: 'SCN-NAME-02',
        kind: 'NEGATIVE',
        purpose: 'Reject a display name shorter than the minimum.',
    },
    {
        id: 'SCN-NAME-03',
        kind: 'NEGATIVE',
        purpose: 'Reject a display name longer than the maximum.',
    },
];

console.log('Positive and negative scenarios:', designScenarios);

/*
 * Positive testing checks behaviour with accepted input or an allowed action.
 * Negative testing checks rejection, protection, and error behaviour.
 *
 * Positive and negative do not mean passed and failed. A negative scenario
 * passes when the system rejects the invalid action exactly as required.
 */

/*
 * SECTION 2
 * Equivalence partitioning
 */

const MINIMUM_NAME_LENGTH = 3;
const MAXIMUM_NAME_LENGTH = 50;

type NamePartition =
    | 'TOO_SHORT'
    | 'VALID_LENGTH'
    | 'TOO_LONG';

function classifyNameLength(length: number): NamePartition {
    if (length < MINIMUM_NAME_LENGTH) {
        return 'TOO_SHORT';
    }

    if (length > MAXIMUM_NAME_LENGTH) {
        return 'TOO_LONG';
    }

    return 'VALID_LENGTH';
}

type PartitionExample = {
    partition: NamePartition;
    representativeLength: number;
    expectedAccepted: boolean;
};

const partitionExamples: readonly PartitionExample[] = [
    {
        partition: 'TOO_SHORT',
        representativeLength: 1,
        expectedAccepted: false,
    },
    {
        partition: 'VALID_LENGTH',
        representativeLength: 20,
        expectedAccepted: true,
    },
    {
        partition: 'TOO_LONG',
        representativeLength: 70,
        expectedAccepted: false,
    },
];

console.log('Equivalence partitions:', partitionExamples);

/*
 * An equivalence partition is a group of values expected to be processed by
 * the same rule. Instead of testing every length from zero to thousands, we
 * first represent the three behaviour groups.
 *
 * This is a hypothesis, not proof that every member behaves identically. Other
 * risks such as Unicode, whitespace, or database limits may require additional
 * partitions even when the character count is the same.
 */

/*
 * SECTION 3
 * Boundary value analysis
 */

type LengthTestCase = {
    id: string;
    length: number;
    expectedPartition: NamePartition;
    expectedAccepted: boolean;
};

const boundaryCases: readonly LengthTestCase[] = [
    {
        id: 'BVA-MIN-BELOW',
        length: 2,
        expectedPartition: 'TOO_SHORT',
        expectedAccepted: false,
    },
    {
        id: 'BVA-MIN-AT',
        length: 3,
        expectedPartition: 'VALID_LENGTH',
        expectedAccepted: true,
    },
    {
        id: 'BVA-MIN-ABOVE',
        length: 4,
        expectedPartition: 'VALID_LENGTH',
        expectedAccepted: true,
    },
    {
        id: 'BVA-MAX-BELOW',
        length: 49,
        expectedPartition: 'VALID_LENGTH',
        expectedAccepted: true,
    },
    {
        id: 'BVA-MAX-AT',
        length: 50,
        expectedPartition: 'VALID_LENGTH',
        expectedAccepted: true,
    },
    {
        id: 'BVA-MAX-ABOVE',
        length: 51,
        expectedPartition: 'TOO_LONG',
        expectedAccepted: false,
    },
];

type DesignExecution = {
    id: string;
    passed: boolean;
    expected: string | boolean;
    actual: string | boolean;
};

const boundaryExecutions = boundaryCases.flatMap((testCase) => {
    const actualPartition = classifyNameLength(testCase.length);
    const actualAccepted = actualPartition === 'VALID_LENGTH';

    return [
        {
            id: `${testCase.id}-PARTITION`,
            passed: actualPartition === testCase.expectedPartition,
            expected: testCase.expectedPartition,
            actual: actualPartition,
        },
        {
            id: `${testCase.id}-ACCEPTANCE`,
            passed: actualAccepted === testCase.expectedAccepted,
            expected: testCase.expectedAccepted,
            actual: actualAccepted,
        },
    ];
});

console.log('Boundary executions:', boundaryExecutions);

/*
 * Boundaries are transition points between partitions. Defects frequently occur
 * because of < versus <=, > versus >=, indexing, rounding, or misunderstood
 * inclusivity. Values immediately below, at, and immediately above an important
 * boundary give stronger evidence than arbitrary values from the middle.
 */

/*
 * SECTION 4
 * State-transition testing
 */

const MAXIMUM_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

type AccountState =
    | {
        status: 'ACTIVE';
        failedAttempts: number;
        lockedUntilMs: null;
    }
    | {
        status: 'LOCKED';
        failedAttempts: number;
        lockedUntilMs: number;
    };

type PasswordAttempt = {
    passwordCorrect: boolean;
    occurredAtMs: number;
};

type AttemptOutcome =
    | 'AUTHENTICATED'
    | 'PASSWORD_REJECTED'
    | 'ACCOUNT_LOCKED'
    | 'REJECTED_WHILE_LOCKED';

type TransitionResult = {
    outcome: AttemptOutcome;
    nextState: AccountState;
};

function evaluatePasswordAttempt(
    currentState: AccountState,
    attempt: PasswordAttempt,
): TransitionResult {
    if (
        currentState.status === 'LOCKED' &&
        attempt.occurredAtMs < currentState.lockedUntilMs
    ) {
        return {
            outcome: 'REJECTED_WHILE_LOCKED',
            nextState: currentState,
        };
    }

    const activeState: AccountState = {
        status: 'ACTIVE',
        failedAttempts:
            currentState.status === 'LOCKED'
                ? 0
                : currentState.failedAttempts,
        lockedUntilMs: null,
    };

    if (attempt.passwordCorrect) {
        return {
            outcome: 'AUTHENTICATED',
            nextState: {
                status: 'ACTIVE',
                failedAttempts: 0,
                lockedUntilMs: null,
            },
        };
    }

    const nextFailureCount = activeState.failedAttempts + 1;

    if (nextFailureCount >= MAXIMUM_FAILED_ATTEMPTS) {
        return {
            outcome: 'ACCOUNT_LOCKED',
            nextState: {
                status: 'LOCKED',
                failedAttempts: nextFailureCount,
                lockedUntilMs:
                    attempt.occurredAtMs + LOCK_DURATION_MS,
            },
        };
    }

    return {
        outcome: 'PASSWORD_REJECTED',
        nextState: {
            status: 'ACTIVE',
            failedAttempts: nextFailureCount,
            lockedUntilMs: null,
        },
    };
}

type TransitionCase = {
    id: string;
    description: string;
    currentState: AccountState;
    attempt: PasswordAttempt;
    expectedOutcome: AttemptOutcome;
    expectedStatus: AccountState['status'];
    expectedFailureCount: number;
};

const baseTimeMs = Date.parse('2026-09-20T10:00:00.000Z');

const transitionCases: readonly TransitionCase[] = [
    {
        id: 'STATE-01',
        description: 'A failure below the threshold increments the counter.',
        currentState: {
            status: 'ACTIVE',
            failedAttempts: 3,
            lockedUntilMs: null,
        },
        attempt: {
            passwordCorrect: false,
            occurredAtMs: baseTimeMs,
        },
        expectedOutcome: 'PASSWORD_REJECTED',
        expectedStatus: 'ACTIVE',
        expectedFailureCount: 4,
    },
    {
        id: 'STATE-02',
        description: 'The fifth failure enters the locked state.',
        currentState: {
            status: 'ACTIVE',
            failedAttempts: 4,
            lockedUntilMs: null,
        },
        attempt: {
            passwordCorrect: false,
            occurredAtMs: baseTimeMs,
        },
        expectedOutcome: 'ACCOUNT_LOCKED',
        expectedStatus: 'LOCKED',
        expectedFailureCount: 5,
    },
    {
        id: 'STATE-03',
        description: 'Success before the threshold resets the counter.',
        currentState: {
            status: 'ACTIVE',
            failedAttempts: 4,
            lockedUntilMs: null,
        },
        attempt: {
            passwordCorrect: true,
            occurredAtMs: baseTimeMs,
        },
        expectedOutcome: 'AUTHENTICATED',
        expectedStatus: 'ACTIVE',
        expectedFailureCount: 0,
    },
    {
        id: 'STATE-04',
        description: 'Correct credentials are rejected before lock expiry.',
        currentState: {
            status: 'LOCKED',
            failedAttempts: 5,
            lockedUntilMs: baseTimeMs + LOCK_DURATION_MS,
        },
        attempt: {
            passwordCorrect: true,
            occurredAtMs: baseTimeMs + LOCK_DURATION_MS - 1,
        },
        expectedOutcome: 'REJECTED_WHILE_LOCKED',
        expectedStatus: 'LOCKED',
        expectedFailureCount: 5,
    },
    {
        id: 'STATE-05',
        description: 'Correct credentials work at the expiry boundary.',
        currentState: {
            status: 'LOCKED',
            failedAttempts: 5,
            lockedUntilMs: baseTimeMs + LOCK_DURATION_MS,
        },
        attempt: {
            passwordCorrect: true,
            occurredAtMs: baseTimeMs + LOCK_DURATION_MS,
        },
        expectedOutcome: 'AUTHENTICATED',
        expectedStatus: 'ACTIVE',
        expectedFailureCount: 0,
    },
];

type TransitionExecution = {
    id: string;
    passed: boolean;
    expected: {
        outcome: AttemptOutcome;
        status: AccountState['status'];
        failedAttempts: number;
    };
    actual: {
        outcome: AttemptOutcome;
        status: AccountState['status'];
        failedAttempts: number;
    };
};

function executeTransitionCase(
    testCase: TransitionCase,
    transition: (
        state: AccountState,
        attempt: PasswordAttempt,
    ) => TransitionResult,
): TransitionExecution {
    const result = transition(testCase.currentState, testCase.attempt);

    const expected = {
        outcome: testCase.expectedOutcome,
        status: testCase.expectedStatus,
        failedAttempts: testCase.expectedFailureCount,
    };

    const actual = {
        outcome: result.outcome,
        status: result.nextState.status,
        failedAttempts: result.nextState.failedAttempts,
    };

    return {
        id: testCase.id,
        passed:
            actual.outcome === expected.outcome &&
            actual.status === expected.status &&
            actual.failedAttempts === expected.failedAttempts,
        expected,
        actual,
    };
}

const transitionExecutions = transitionCases.map((testCase) => {
    return executeTransitionCase(testCase, evaluatePasswordAttempt);
});

console.log('State-transition executions:', transitionExecutions);

/*
 * State-transition testing verifies more than isolated input values. It asks:
 *
 * - What state is the system in now?
 * - Which event occurs?
 * - Is that event allowed in this state?
 * - What next state and output should result?
 *
 * This is essential for orders, payments, sessions, approvals, retries, and
 * incident workflows where the same action behaves differently by state.
 */

/*
 * SECTION 5
 * Risk-based selection
 */

type DesignRisk = {
    id: string;
    description: string;
    impact: 1 | 2 | 3 | 4 | 5;
    likelihood: 1 | 2 | 3 | 4 | 5;
    coveredBy: readonly string[];
};

const designRisks: readonly DesignRisk[] = [
    {
        id: 'RISK-BRUTE-FORCE',
        description: 'Unlimited attempts allow password guessing.',
        impact: 5,
        likelihood: 4,
        coveredBy: ['STATE-02', 'STATE-04'],
    },
    {
        id: 'RISK-PERMANENT-LOCKOUT',
        description: 'A legitimate user remains locked after expiry.',
        impact: 4,
        likelihood: 3,
        coveredBy: ['STATE-05'],
    },
    {
        id: 'RISK-COUNTER-NOT-RESET',
        description: 'A successful user is locked by old failures.',
        impact: 3,
        likelihood: 3,
        coveredBy: ['STATE-03'],
    },
];

const prioritizedDesignRisks = [...designRisks].sort((left, right) => {
    const leftScore = left.impact * left.likelihood;
    const rightScore = right.impact * right.likelihood;

    return rightScore - leftScore;
});

console.log('Prioritized design risks:', prioritizedDesignRisks);

/*
 * Risk-based testing does not mean ignoring low-risk behaviour. It uses impact,
 * likelihood, detectability, exposure, and business context to decide test
 * depth, order, level, data variation, and automation investment.
 *
 * The risk score supports discussion; it is not a substitute for judgment.
 */

/*
 * WORKED APPLICATION
 *
 * For the lockout requirement, the selected compact suite is:
 *
 * 1. STATE-01: ordinary failure remains active.
 * 2. STATE-02: threshold failure locks the account.
 * 3. STATE-03: success resets the counter.
 * 4. STATE-04: action immediately before expiry remains rejected.
 * 5. STATE-05: action exactly at expiry is allowed.
 *
 * This combines equivalence partitions, important boundaries, state changes,
 * positive and negative behaviour, and the highest risks. It is more useful
 * than five arbitrary password attempts with no design rationale.
 */

/*
 * ERROR OBSERVATION
 */

function evaluateAttemptWithBoundaryDefect(
    currentState: AccountState,
    attempt: PasswordAttempt,
): TransitionResult {
    if (currentState.status === 'LOCKED') {
        return evaluatePasswordAttempt(currentState, attempt);
    }

    if (attempt.passwordCorrect) {
        return evaluatePasswordAttempt(currentState, attempt);
    }

    const nextFailureCount = currentState.failedAttempts + 1;

    // Defect: the rule uses > instead of >=, so the sixth failure locks.
    if (nextFailureCount > MAXIMUM_FAILED_ATTEMPTS) {
        return {
            outcome: 'ACCOUNT_LOCKED',
            nextState: {
                status: 'LOCKED',
                failedAttempts: nextFailureCount,
                lockedUntilMs:
                    attempt.occurredAtMs + LOCK_DURATION_MS,
            },
        };
    }

    return {
        outcome: 'PASSWORD_REJECTED',
        nextState: {
            status: 'ACTIVE',
            failedAttempts: nextFailureCount,
            lockedUntilMs: null,
        },
    };
}

const defectiveTransitionExecutions = transitionCases.map((testCase) => {
    return executeTransitionCase(
        testCase,
        evaluateAttemptWithBoundaryDefect,
    );
});

const detectedBoundaryFailures = defectiveTransitionExecutions.filter(
    (execution) => {
        return !execution.passed;
    },
);

console.log(
    'Failures detected in the defective boundary rule:',
    detectedBoundaryFailures,
);

/*
 * STATE-02 fails because the implementation locks after the sixth failure. The
 * case was selected at the threshold, so it exposes the classic > versus >=
 * defect. A random middle value might not reveal this error.
 */

/*
 * FINAL SUMMARY
 *
 * Positive and negative testing select allowed and rejected behaviour.
 * Equivalence partitioning represents groups expected to behave alike.
 * Boundary analysis targets transition edges between those groups.
 * State-transition testing verifies valid and invalid movement over time.
 * Risk-based testing decides where stronger and earlier evidence is needed.
 *
 * The techniques complement one another. They are not competing templates.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why not test every possible input?
 * A: The input and state space is usually too large. Design techniques select
 *    representative and high-risk cases that provide useful evidence.
 *
 * Q: What is the relationship between partitions and boundaries?
 * A: Partitions group values expected to behave alike. Boundaries are the edges
 *    where the expected behaviour changes between groups.
 *
 * Q: When is state-transition testing useful?
 * A: When behaviour depends on current state, history, event order, or time,
 *    such as authentication, payment, approval, and workflow systems.
 *
 * Q: Does risk-based testing mean only testing high-risk features?
 * A: No. It changes priority and depth. Lower-risk behaviour may still need
 *    coverage, but it should not automatically receive the same investment.
 */

