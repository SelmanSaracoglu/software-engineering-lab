/*
 * PARAMETER PATTERNS AND CLOSURES
 *
 * The earlier function lessons established parameters, return values, scope,
 * composition, function values, and callbacks. This lesson adds two practical
 * parameter patterns and explains how a returned function can remember values
 * from the call that created it.
 *
 * The focus is:
 * - default parameters
 * - optional parameters and undefined
 * - closures
 * - function factories
 * - private state held by a closure
 * - testing benefits and shared-state risks
 */

/*
 * SECTION 1
 * Default parameters
 *
 * A default parameter supplies a value when the caller omits that argument or
 * explicitly passes undefined. Callers can still provide another value.
 */

function isResponseTimeAcceptable(
    actualResponseTimeMs: number,
    maximumResponseTimeMs: number = 1000,
): boolean {
    return actualResponseTimeMs <= maximumResponseTimeMs;
}

const defaultLimitResult =
    isResponseTimeAcceptable(850);

const customLimitResult =
    isResponseTimeAcceptable(850, 500);

console.log('Default limit result:', defaultLimitResult);
console.log('Custom limit result:', customLimitResult);

/*
 * First call:
 * maximumResponseTimeMs receives its default value, 1000.
 *
 * Second call:
 * maximumResponseTimeMs receives the supplied argument, 500.
 *
 * A default should represent a real, safe rule. It should not hide information
 * that every caller must choose deliberately.
 */

/*
 * SECTION 2
 * Optional parameters
 *
 * A question mark makes a parameter optional. Inside the function, its type
 * also includes undefined because the caller may omit it.
 */

function createTestLabel(
    testName: string,
    requestId?: string,
): string {
    if (requestId === undefined) {
        return testName;
    }

    return `${testName} [${requestId}]`;
}

const labelWithoutRequestId =
    createTestLabel('login returns 200');

const labelWithRequestId =
    createTestLabel(
        'login returns 200',
        'request-123',
    );

console.log('Label without request ID:', labelWithoutRequestId);
console.log('Label with request ID:', labelWithRequestId);

/*
 * Optional and default parameters solve different problems:
 *
 * requestId?: string
 *     Missing information remains meaningful. The function handles undefined.
 *
 * maximumResponseTimeMs: number = 1000
 *     Missing input is replaced with a defined fallback value.
 */

/*
 * SECTION 3
 * A closure remembers an outer value
 *
 * A closure is a function together with access to the lexical scope in which
 * it was created. The returned function below continues to access
 * expectedStatus even after createStatusChecker has finished.
 */

function createStatusChecker(
    expectedStatus: number,
): (actualStatus: number) => boolean {
    return (actualStatus: number): boolean => {
        return actualStatus === expectedStatus;
    };
}

const expectsSuccess = createStatusChecker(200);
const expectsCreated = createStatusChecker(201);

console.log('200 matches success:', expectsSuccess(200));
console.log('500 matches success:', expectsSuccess(500));
console.log('201 matches created:', expectsCreated(201));

/*
 * createStatusChecker(200) creates one function that remembers 200.
 * createStatusChecker(201) creates another function that remembers 201.
 *
 * The returned checker receives only actualStatus because its expected value
 * has already been configured by the earlier factory call.
 */

/*
 * SECTION 4
 * Function factories
 *
 * A function factory creates and returns a function. This is useful when one
 * rule should be configured once and reused with several actual values.
 */

type ResponseTimeChecker = (
    actualResponseTimeMs: number,
) => boolean;

function createResponseTimeChecker(
    maximumResponseTimeMs: number = 1000,
): ResponseTimeChecker {
    return (actualResponseTimeMs) => {
        return actualResponseTimeMs <= maximumResponseTimeMs;
    };
}

const isFastEnough = createResponseTimeChecker();
const isFastEnoughForCriticalApi =
    createResponseTimeChecker(300);

console.log('850 is within default limit:', isFastEnough(850));
console.log(
    '850 is within critical limit:',
    isFastEnoughForCriticalApi(850),
);

/*
 * The factory separates configuration from evaluation:
 *
 * createResponseTimeChecker(300)
 *     configures the rule
 *
 * isFastEnoughForCriticalApi(250)
 *     evaluates one observed value
 */

/*
 * SECTION 5
 * Closure state
 *
 * A closure may also remember a variable that changes between calls.
 */

function createAttemptCounter(): () => number {
    let attemptCount = 0;

    return (): number => {
        attemptCount = attemptCount + 1;

        return attemptCount;
    };
}

const countLoginAttempt = createAttemptCounter();

console.log('Login attempt:', countLoginAttempt());
console.log('Login attempt:', countLoginAttempt());
console.log('Login attempt:', countLoginAttempt());

const countPaymentAttempt = createAttemptCounter();

console.log('Payment attempt:', countPaymentAttempt());

/*
 * countLoginAttempt remembers its own attemptCount: 1, then 2, then 3.
 * countPaymentAttempt comes from a separate factory call and starts at 1.
 *
 * The outer program cannot directly access either attemptCount variable.
 * It can affect the value only by calling its returned function.
 */

/*
 * TESTING CONNECTION
 *
 * Closures are useful for configured helpers, fake implementations, and small
 * pieces of isolated state. They can also create hidden dependencies if one
 * closure instance is reused across tests.
 *
 * Safer pattern:
 * Create a fresh stateful helper for each test that needs one.
 *
 * Risky pattern:
 * Share one mutable counter across unrelated tests and assume it is reset.
 *
 * A closure is not automatically pure. A checker that only reads remembered
 * configuration can be predictable; a counter changes remembered state.
 */

/*
 * PRACTICE
 *
 * Predict the three results before running the file.
 */

function createInclusiveRangeChecker(
    minimum: number,
    maximum: number,
): (value: number) => boolean {
    return (value: number): boolean => {
        return value >= minimum && value <= maximum;
    };
}

const isClientErrorStatus =
    createInclusiveRangeChecker(400, 499);

console.log('399 is client error:', isClientErrorStatus(399));
console.log('400 is client error:', isClientErrorStatus(400));
console.log('499 is client error:', isClientErrorStatus(499));

/*
 * FINAL SUMMARY
 *
 * Default parameter:
 * Uses a fallback when its argument is omitted or undefined.
 *
 * Optional parameter:
 * May be omitted, so the function must account for undefined.
 *
 * Closure:
 * A function that retains access to values from the lexical scope where it
 * was created.
 *
 * Function factory:
 * A function that creates and returns another function.
 *
 * Closure state:
 * A returned function may remember changing data between calls. Separate
 * factory calls create separate state.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What is the difference between an optional and a default parameter?
 * A: An optional parameter may be undefined. A default parameter replaces an
 *    omitted or undefined argument with its fallback value.
 *
 * Q: What is a closure?
 * A: A closure is a function that retains access to its lexical outer scope,
 *    including after the outer function has returned.
 *
 * Q: Why use a function factory in test code?
 * A: It can configure a reusable rule once and return a focused function that
 *    evaluates many observed values against that configuration.
 *
 * Q: What testing risk can closure state create?
 * A: Reusing one stateful closure across tests can make later results depend
 *    on earlier calls. Create fresh instances or reset state deliberately.
 */
