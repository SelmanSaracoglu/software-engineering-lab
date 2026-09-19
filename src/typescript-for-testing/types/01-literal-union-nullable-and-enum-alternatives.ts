/*
 * LITERAL, UNION, NULLABLE AND ENUM ALTERNATIVES
 *
 * Primitive types such as string and number sometimes allow more values than
 * the domain accepts. TypeScript can describe a smaller set of exact values and
 * combine multiple possible types into a union.
 *
 * This lesson covers:
 * - literal types
 * - union types
 * - reusable unions
 * - nullable values
 * - narrowing a union
 * - string unions compared with enums
 */

/*
 * SECTION 1
 * Literal types
 *
 * A literal type represents one exact value.
 */

let requiredMethod: 'POST' = 'POST';

console.log('Required method:', requiredMethod);

// requiredMethod = 'GET';

/*
 * The variable can only contain 'POST'. A literal type is useful when one
 * exact value is part of a contract.
 */

/*
 * SECTION 2
 * Union of literal types
 *
 * The | symbol means "or" at the type level.
 */

type HttpMethod =
    | 'GET'
    | 'POST'
    | 'PATCH'
    | 'DELETE';

function describeRequest(
    method: HttpMethod,
    endpoint: string,
): string {
    return `${method} ${endpoint}`;
}

console.log(describeRequest('GET', '/api/orders'));
console.log(describeRequest('POST', '/api/orders'));

// describeRequest('FETCH', '/api/orders');

/*
 * A plain string parameter would accept misspellings and unsupported methods.
 * HttpMethod expresses the allowed domain directly.
 */

/*
 * SECTION 3
 * Union of different types
 */

type Identifier = string | number;

function formatIdentifier(identifier: Identifier): string {
    if (typeof identifier === 'number') {
        return `numeric-${identifier}`;
    }

    return identifier.toLowerCase();
}

console.log('String ID:', formatIdentifier('USER-101'));
console.log('Number ID:', formatIdentifier(101));

/*
 * Before narrowing, only operations valid for both string and number are safe.
 * typeof selects one member of the union inside each branch.
 */

/*
 * SECTION 4
 * Nullable values
 *
 * With strictNullChecks, null is not automatically accepted by string or
 * another ordinary type. Add null only when it represents a real state.
 */

type FailureReason = string | null;

function createOutcomeMessage(
    passed: boolean,
    failureReason: FailureReason,
): string {
    if (failureReason !== null) {
        return `FAIL: ${failureReason}`;
    }

    if (passed) {
        return 'PASS';
    }

    return 'FAIL: reason unavailable';
}

console.log(createOutcomeMessage(true, null));
console.log(
    createOutcomeMessage(false, 'Unexpected status'),
);

/*
 * null is different from an optional property. null is an explicit value;
 * optional means a property or argument may be absent.
 */

/*
 * SECTION 5
 * Union type for state
 */

type TestState =
    | 'PENDING'
    | 'RUNNING'
    | 'PASSED'
    | 'FAILED';

function isFinished(state: TestState): boolean {
    return state === 'PASSED' || state === 'FAILED';
}

console.log('PENDING is finished:', isFinished('PENDING'));
console.log('PASSED is finished:', isFinished('PASSED'));

/*
 * SECTION 6
 * String enum
 *
 * An enum also defines named choices, but unlike a string union it creates a
 * runtime JavaScript object.
 */

enum TestOutcome {
    Passed = 'PASSED',
    Failed = 'FAILED',
}

function printOutcome(outcome: TestOutcome): void {
    console.log('Enum outcome:', outcome);
}

printOutcome(TestOutcome.Passed);
console.log('Runtime enum object:', TestOutcome);

/*
 * String union:
 * - no runtime object
 * - works naturally with JSON string values
 * - callers use values such as 'PASSED'
 *
 * enum:
 * - creates a runtime object
 * - callers normally use TestOutcome.Passed
 * - may be appropriate when runtime namespacing is intentionally wanted
 *
 * Many application and test contracts prefer string unions because API data is
 * already represented as strings. Use the form that matches the real boundary
 * rather than choosing enum automatically.
 */

/*
 * PRACTICE
 */

type AccessDecision = 'ALLOWED' | 'DENIED';
type AccessReason =
    | 'ROLE_MATCHED'
    | 'ROLE_MISSING'
    | null;

function createAccessMessage(
    decision: AccessDecision,
    reason: AccessReason,
): string {
    if (reason === null) {
        return decision;
    }

    return `${decision}: ${reason}`;
}

console.log(
    createAccessMessage('DENIED', 'ROLE_MISSING'),
);

/*
 * FINAL SUMMARY
 *
 * Literal type:
 * One exact allowed value.
 *
 * Union type:
 * A value that may belong to any listed member type.
 *
 * Nullable type:
 * A union that deliberately includes null.
 *
 * String union:
 * Restricts strings without creating runtime code.
 *
 * Enum:
 * Provides named members and creates a runtime object.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why use a string-literal union instead of string?
 * A: It restricts the value to the supported domain and catches unsupported or
 *    misspelled values during compilation.
 *
 * Q: What does string | null mean?
 * A: The value may be either a string or the explicit runtime value null.
 *
 * Q: How does a string union differ from a string enum?
 * A: A union is only a compile-time type. An enum also creates a runtime object
 *    with named members.
 */
