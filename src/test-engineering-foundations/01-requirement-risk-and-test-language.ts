/*
 * TEST ENGINEERING FOUNDATIONS
 * REQUIREMENT, RISK, AND TEST LANGUAGE
 *
 * A test is not valuable merely because it executes code and produces a green
 * result. A useful test connects an expected behaviour or an important risk to
 * observable evidence.
 *
 * This lesson follows one complete chain:
 *
 * requirement
 * -> acceptance criteria
 * -> risk
 * -> test condition
 * -> test scenario
 * -> test case
 * -> expected and actual result
 * -> test outcome
 * -> failure investigation
 *
 * The example uses sign-in behaviour because it contains business, quality,
 * and security concerns without requiring a testing framework yet.
 */

/*
 * SECTION 1
 * Requirement and acceptance criteria
 */

type Requirement = {
    id: string;
    statement: string;
    acceptanceCriteria: readonly string[];
};

const signInRequirement: Requirement = {
    id: 'AUTH-001',
    statement:
        'A registered active user can sign in with valid credentials.',
    acceptanceCriteria: [
        'Valid credentials for an active account create a session.',
        'An incorrect password does not create a session.',
        'A disabled account does not create a session.',
        'Rejected sign-in attempts use the same public error message.',
    ],
};

/*
 * A requirement states an expected behaviour or quality. Acceptance criteria
 * make important parts of that expectation observable and reviewable.
 *
 * A requirement is not yet a complete test case. It does not necessarily list
 * every risk, data variation, precondition, or verification step.
 */

/*
 * SECTION 2
 * Risks explain why testing matters
 */

type Risk = {
    id: string;
    description: string;
    impact: 1 | 2 | 3 | 4 | 5;
    likelihood: 1 | 2 | 3 | 4 | 5;
};

const signInRisks: readonly Risk[] = [
    {
        id: 'RISK-AUTH-01',
        description: 'An unauthorized person gains access.',
        impact: 5,
        likelihood: 3,
    },
    {
        id: 'RISK-AUTH-02',
        description: 'The response reveals whether an account exists.',
        impact: 4,
        likelihood: 3,
    },
    {
        id: 'RISK-AUTH-03',
        description: 'A legitimate active user cannot sign in.',
        impact: 3,
        likelihood: 2,
    },
];

function calculateRiskScore(risk: Risk): number {
    return risk.impact * risk.likelihood;
}

const prioritizedRisks = [...signInRisks].sort((left, right) => {
    return calculateRiskScore(right) - calculateRiskScore(left);
});

console.log(
    'Prioritized risks:',
    prioritizedRisks.map((risk) => {
        return `${risk.id}: ${calculateRiskScore(risk)}`;
    }),
);

/*
 * Risk does not replace the requirement. It changes the depth and priority of
 * testing. The highest score is not automatically the only thing to test, but
 * it helps the team discuss where failure would matter most.
 */

/*
 * SECTION 3
 * Test condition, scenario, and test case
 */

type TestCondition = {
    id: string;
    requirementId: string;
    relatedRiskIds: readonly string[];
    objective: string;
};

const rejectedSignInCondition: TestCondition = {
    id: 'COND-AUTH-02',
    requirementId: signInRequirement.id,
    relatedRiskIds: ['RISK-AUTH-01', 'RISK-AUTH-02'],
    objective:
        'Verify that rejected sign-in attempts create no session and reveal no account state.',
};

type ScenarioKind = 'POSITIVE' | 'NEGATIVE';

type TestScenario = {
    id: string;
    conditionId: string;
    kind: ScenarioKind;
    title: string;
    given: string;
    when: string;
    then: string;
};

const disabledAccountScenario: TestScenario = {
    id: 'SCN-AUTH-003',
    conditionId: rejectedSignInCondition.id,
    kind: 'NEGATIVE',
    title: 'Disabled account attempts to sign in',
    given: 'a registered but disabled account',
    when: 'the correct username and password are submitted',
    then: 'no session is created and a generic rejection is returned',
};

/*
 * Test condition:
 * A high-level statement of what must be checked.
 *
 * Test scenario:
 * A behaviour or situation to examine. Given-When-Then expresses its context,
 * action, and expected outcome without requiring detailed execution data.
 *
 * Test case:
 * An executable specification with concrete preconditions, inputs, actions,
 * and expected results.
 */

type AccountStatus = 'ACTIVE' | 'DISABLED';

type Account = {
    username: string;
    password: string;
    status: AccountStatus;
};

type SignInInput = {
    username: string;
    password: string;
};

type SignInObservation = {
    statusCode: number;
    sessionCreated: boolean;
    publicMessage: 'SIGNED_IN' | 'INVALID_CREDENTIALS' | 'ACCOUNT_DISABLED';
};

type SignInTestCase = {
    id: string;
    scenarioId: string;
    title: string;
    preconditions: readonly string[];
    account: Account;
    input: SignInInput;
    expected: SignInObservation;
};

const disabledAccountTestCase: SignInTestCase = {
    id: 'TC-AUTH-003',
    scenarioId: disabledAccountScenario.id,
    title: 'Reject correct credentials for a disabled account',
    preconditions: [
        'The account exists.',
        'The stored password is correct.',
        'The account status is DISABLED.',
        'No authenticated session exists before the action.',
    ],
    account: {
        username: 'ada',
        password: 'correct-secret',
        status: 'DISABLED',
    },
    input: {
        username: 'ada',
        password: 'correct-secret',
    },
    expected: {
        statusCode: 401,
        sessionCreated: false,
        publicMessage: 'INVALID_CREDENTIALS',
    },
};

/*
 * This test case is traceable:
 *
 * AUTH-001
 * -> RISK-AUTH-01 and RISK-AUTH-02
 * -> COND-AUTH-02
 * -> SCN-AUTH-003
 * -> TC-AUTH-003
 *
 * Traceability explains why the test exists. It also helps the team decide
 * whether a test should change or be removed when the requirement changes.
 */

/*
 * SECTION 4
 * A small system under test
 */

function signIn(
    account: Account,
    input: SignInInput,
): SignInObservation {
    const credentialsAreCorrect =
        account.username === input.username &&
        account.password === input.password;

    if (!credentialsAreCorrect || account.status === 'DISABLED') {
        return {
            statusCode: 401,
            sessionCreated: false,
            publicMessage: 'INVALID_CREDENTIALS',
        };
    }

    return {
        statusCode: 200,
        sessionCreated: true,
        publicMessage: 'SIGNED_IN',
    };
}

/*
 * SECTION 5
 * Arrange, Act, and Assert
 */

type AssertionResult = {
    field: keyof SignInObservation;
    passed: boolean;
    expected: string | number | boolean;
    actual: string | number | boolean;
};

type TestExecution = {
    testCaseId: string;
    outcome: 'PASSED' | 'FAILED';
    assertions: readonly AssertionResult[];
};

function compareObservation(
    expected: SignInObservation,
    actual: SignInObservation,
): AssertionResult[] {
    return [
        {
            field: 'statusCode',
            passed: expected.statusCode === actual.statusCode,
            expected: expected.statusCode,
            actual: actual.statusCode,
        },
        {
            field: 'sessionCreated',
            passed: expected.sessionCreated === actual.sessionCreated,
            expected: expected.sessionCreated,
            actual: actual.sessionCreated,
        },
        {
            field: 'publicMessage',
            passed: expected.publicMessage === actual.publicMessage,
            expected: expected.publicMessage,
            actual: actual.publicMessage,
        },
    ];
}

function executeSignInTest(
    testCase: SignInTestCase,
    systemUnderTest: (
        account: Account,
        input: SignInInput,
    ) => SignInObservation,
): TestExecution {
    // Arrange: the test case supplies the account state and request data.
    const { account, input, expected } = testCase;

    // Act: perform exactly the behaviour under investigation.
    const actual = systemUnderTest(account, input);

    // Assert: compare the observed result with the expected result.
    const assertions = compareObservation(expected, actual);
    const allAssertionsPassed = assertions.every((assertion) => {
        return assertion.passed;
    });

    return {
        testCaseId: testCase.id,
        outcome: allAssertionsPassed ? 'PASSED' : 'FAILED',
        assertions,
    };
}

const passingExecution = executeSignInTest(
    disabledAccountTestCase,
    signIn,
);

console.log('Passing execution:', passingExecution);

/*
 * Arrange-Act-Assert and Given-When-Then are not competing test levels.
 *
 * Given-When-Then is useful for describing behaviour:
 * - Given: context and preconditions
 * - When: action or event
 * - Then: observable expected outcome
 *
 * Arrange-Act-Assert is useful for organizing executable test code:
 * - Arrange: prepare state and data
 * - Act: exercise the system
 * - Assert: compare actual and expected behaviour
 */

/*
 * SECTION 6
 * Expected result, actual result, and test outcome
 */

function signInWithInformationLeak(
    account: Account,
    input: SignInInput,
): SignInObservation {
    if (account.status === 'DISABLED') {
        return {
            statusCode: 403,
            sessionCreated: false,
            publicMessage: 'ACCOUNT_DISABLED',
        };
    }

    return signIn(account, input);
}

const failingExecution = executeSignInTest(
    disabledAccountTestCase,
    signInWithInformationLeak,
);

console.log('Observed failing execution:', failingExecution);

/*
 * Expected result:
 * The behaviour derived before execution from the requirement, agreed design,
 * contract, or another valid oracle.
 *
 * Actual result:
 * What the system really did during execution.
 *
 * Test outcome:
 * PASSED when the relevant actual results match the expected results; FAILED
 * when at least one relevant difference is observed.
 *
 * A wrong expected result can create a misleading test. The expectation must
 * therefore be reviewed, not merely copied from the current implementation.
 */

/*
 * SECTION 7
 * A test failure is evidence, not an automatic defect verdict
 */

type FailureSource =
    | 'PRODUCT'
    | 'TEST_CODE'
    | 'TEST_DATA'
    | 'ENVIRONMENT'
    | 'AMBIGUOUS_REQUIREMENT'
    | 'NOT_YET_INVESTIGATED';

type FailureInvestigation = {
    testCaseId: string;
    reproducible: boolean;
    requirementReviewed: boolean;
    testCodeReviewed: boolean;
    testDataReviewed: boolean;
    environmentReviewed: boolean;
    source: FailureSource;
    evidence: readonly string[];
};

const initialInvestigation: FailureInvestigation = {
    testCaseId: failingExecution.testCaseId,
    reproducible: false,
    requirementReviewed: false,
    testCodeReviewed: false,
    testDataReviewed: false,
    environmentReviewed: false,
    source: 'NOT_YET_INVESTIGATED',
    evidence: [
        'Expected status 401 but observed 403.',
        'Expected a generic message but observed ACCOUNT_DISABLED.',
    ],
};

console.log('Initial failure investigation:', initialInvestigation);

const confirmedProductDefect: FailureInvestigation = {
    ...initialInvestigation,
    reproducible: true,
    requirementReviewed: true,
    testCodeReviewed: true,
    testDataReviewed: true,
    environmentReviewed: true,
    source: 'PRODUCT',
    evidence: [
        ...initialInvestigation.evidence,
        'The behaviour is reproducible through the documented interface.',
        'The requirement explicitly requires one generic rejection.',
        'Independent request evidence confirms the same response.',
    ],
};

console.log('Confirmed investigation:', confirmedProductDefect);

/*
 * A test failure means that observed and expected results differ, or that the
 * test could not complete reliably. Investigation is required because the
 * source may be the product, test code, test data, environment, or requirement.
 *
 * A defect is a confirmed problem in the product or another controlled work
 * product. The failed test becomes evidence supporting that conclusion.
 */

/*
 * WORKED APPLICATION
 *
 * New requirement:
 * After five consecutive failed password attempts, an active account is locked
 * for fifteen minutes. A successful sign-in before the fifth failure resets the
 * consecutive-failure counter.
 */

const lockoutRequirement: Requirement = {
    id: 'AUTH-LOCK-001',
    statement:
        'Repeated failed passwords temporarily lock an active account.',
    acceptanceCriteria: [
        'The fifth consecutive failed password locks the account.',
        'The lock lasts fifteen minutes.',
        'A successful sign-in before the threshold resets the counter.',
    ],
};

const lockoutRisks: readonly Risk[] = [
    {
        id: 'RISK-LOCK-01',
        description:
            'An attacker can continue unlimited password attempts.',
        impact: 5,
        likelihood: 4,
    },
    {
        id: 'RISK-LOCK-02',
        description:
            'A legitimate user remains locked after the required duration.',
        impact: 3,
        likelihood: 3,
    },
];

const lockoutConditions: readonly TestCondition[] = [
    {
        id: 'COND-LOCK-01',
        requirementId: lockoutRequirement.id,
        relatedRiskIds: ['RISK-LOCK-01'],
        objective:
            'Verify that the fifth consecutive failure activates the lock.',
    },
    {
        id: 'COND-LOCK-02',
        requirementId: lockoutRequirement.id,
        relatedRiskIds: ['RISK-LOCK-02'],
        objective:
            'Verify that the lock ends after exactly fifteen minutes.',
    },
    {
        id: 'COND-LOCK-03',
        requirementId: lockoutRequirement.id,
        relatedRiskIds: ['RISK-LOCK-01'],
        objective:
            'Verify that success before the threshold resets the counter.',
    },
];

const fifthFailureScenario: TestScenario = {
    id: 'SCN-LOCK-001',
    conditionId: 'COND-LOCK-01',
    kind: 'NEGATIVE',
    title: 'The fifth consecutive password failure locks the account',
    given:
        'an active account with four consecutive password failures',
    when: 'a fifth incorrect password is submitted',
    then: 'the account is locked for fifteen minutes',
};

type LockoutTestCase = {
    id: string;
    scenarioId: string;
    preconditions: readonly string[];
    input: {
        failedAttemptsBeforeAction: number;
        passwordIsCorrect: boolean;
        actionTime: string;
    };
    expected: {
        failedAttemptsAfterAction: number;
        accountLocked: boolean;
        lockedUntil: string;
        sessionCreated: boolean;
    };
};

const fifthFailureTestCase: LockoutTestCase = {
    id: 'TC-LOCK-001',
    scenarioId: fifthFailureScenario.id,
    preconditions: [
        'The account exists and is active.',
        'Four consecutive failed attempts are stored.',
        'The account is not already locked.',
    ],
    input: {
        failedAttemptsBeforeAction: 4,
        passwordIsCorrect: false,
        actionTime: '2026-09-20T10:00:00.000Z',
    },
    expected: {
        failedAttemptsAfterAction: 5,
        accountLocked: true,
        lockedUntil: '2026-09-20T10:15:00.000Z',
        sessionCreated: false,
    },
};

console.log('Worked requirement:', lockoutRequirement);
console.log('Worked risks:', lockoutRisks);
console.log('Worked test conditions:', lockoutConditions);
console.log('Worked scenario:', fifthFailureScenario);
console.log('Worked test case:', fifthFailureTestCase);

/*
 * The solution starts with purpose and expected behaviour. It does not begin
 * with Cypress commands or copy the output of an existing implementation.
 */

/*
 * ERROR OBSERVATION
 *
 * signInWithInformationLeak returned ACCOUNT_DISABLED for the disabled account.
 * The executed comparison already showed two failed assertions:
 *
 * - statusCode: expected 401, actual 403
 * - publicMessage: expected INVALID_CREDENTIALS, actual ACCOUNT_DISABLED
 *
 * The investigation reviewed the requirement, test code, data, environment,
 * reproducibility, and independent request evidence. Only then was PRODUCT
 * recorded as the source. This is the complete failure-to-defect reasoning.
 */

/*
 * FINAL SUMMARY
 *
 * Requirement:
 * A verifiable statement of expected behaviour or quality.
 *
 * Risk:
 * A possible harmful outcome that influences test priority and depth.
 *
 * Test condition:
 * A high-level aspect or objective that must be checked.
 *
 * Test scenario:
 * A behaviour or situation described at a useful business level.
 *
 * Test case:
 * Concrete preconditions, inputs, actions, and expected results.
 *
 * Expected versus actual:
 * The comparison that creates test evidence.
 *
 * Test failure versus defect:
 * A failure is an observation requiring investigation; a defect is a confirmed
 * problem supported by evidence.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What is the difference between a test condition and a test case?
 * A: A condition states what needs to be checked. A test case defines concrete
 *    preconditions, data, actions, and expected results for performing a check.
 *
 * Q: Why should a test be traceable to a requirement or risk?
 * A: Traceability explains the test's purpose, supports coverage decisions, and
 *    shows when the test should change as the expected behaviour changes.
 *
 * Q: Are positive and negative tests the same as pass and fail outcomes?
 * A: No. Positive and negative describe the kind of scenario. Either kind can
 *    pass or fail when executed.
 *
 * Q: Does every failed automated test prove a product defect?
 * A: No. The cause may be product behaviour, test code, data, environment, or
 *    an ambiguous expectation. The mismatch must be investigated.
 */
