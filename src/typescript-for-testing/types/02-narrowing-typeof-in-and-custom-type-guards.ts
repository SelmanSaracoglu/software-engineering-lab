/*
 * TYPE NARROWING WITH TYPEOF, IN AND CUSTOM TYPE GUARDS
 *
 * A union type describes several possibilities. Narrowing uses runtime evidence
 * to determine which possibility is present on one control-flow path.
 *
 * This lesson covers:
 * - narrowing with typeof
 * - equality narrowing
 * - narrowing object unions with in
 * - custom type predicates
 * - validating unknown values before property use
 */

/*
 * SECTION 1
 * typeof narrowing
 */

function normalizeIdentifier(
    identifier: string | number,
): string {
    if (typeof identifier === 'number') {
        return identifier.toString();
    }

    return identifier.trim().toLowerCase();
}

console.log(normalizeIdentifier(101));
console.log(normalizeIdentifier(' USER-101 '));

/*
 * In the if branch identifier is number. After that branch returns, the
 * remaining path contains only string.
 */

/*
 * SECTION 2
 * Equality narrowing
 */

function formatMessage(
    message: string | null,
): string {
    if (message === null) {
        return 'No message';
    }

    return message.toUpperCase();
}

console.log(formatMessage(null));
console.log(formatMessage('request failed'));

/*
 * Comparing explicitly with null is clear and does not accidentally treat an
 * empty string as missing.
 */

/*
 * SECTION 3
 * Narrowing object unions with in
 */

type StatusResponse = {
    statusCode: number;
};

type NetworkFailure = {
    networkError: string;
};

function describeResponse(
    result: StatusResponse | NetworkFailure,
): string {
    if ('networkError' in result) {
        return `Network failure: ${result.networkError}`;
    }

    return `Received status: ${result.statusCode}`;
}

console.log(describeResponse({ statusCode: 200 }));
console.log(
    describeResponse({ networkError: 'Connection refused' }),
);

/*
 * The in operator is a runtime check. TypeScript uses its result to narrow the
 * object union on each branch.
 */

/*
 * SECTION 4
 * Custom type guard
 *
 * A return type of value is StatusResponse tells TypeScript what a true result
 * proves about the argument.
 */

function isStatusResponse(
    value: unknown,
): value is StatusResponse {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    if (!('statusCode' in value)) {
        return false;
    }

    return typeof value.statusCode === 'number';
}

const externalResult: unknown = {
    statusCode: 201,
};

if (isStatusResponse(externalResult)) {
    console.log(
        'Validated status:',
        externalResult.statusCode,
    );
} else {
    console.log('Value is not a status response');
}

/*
 * The predicate must be truthful. TypeScript trusts the declared relationship
 * between true and StatusResponse, so a careless guard can create false safety.
 */

/*
 * APPLICATION
 * A guard for testing results received through an unknown boundary
 */

type BasicTestResult = {
    name: string;
    passed: boolean;
};

function isBasicTestResult(
    value: unknown,
): value is BasicTestResult {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    if (!('name' in value) || !('passed' in value)) {
        return false;
    }

    return typeof value.name === 'string' &&
        typeof value.passed === 'boolean';
}

const possibleResults: unknown[] = [
    {
        name: 'login succeeds',
        passed: true,
    },
    {
        name: 'invalid result',
        passed: 'yes',
    },
    null,
];

for (const possibleResult of possibleResults) {
    if (isBasicTestResult(possibleResult)) {
        console.log(
            possibleResult.name,
            possibleResult.passed,
        );
    } else {
        console.log('Rejected invalid result');
    }
}

/*
 * SECTION 6
 * Narrowing is path-specific
 */

function printUnknownValue(value: unknown): void {
    if (typeof value === 'string') {
        console.log('Uppercase:', value.toUpperCase());

        return;
    }

    if (typeof value === 'number') {
        console.log('Doubled:', value * 2);

        return;
    }

    console.log('Unsupported value');
}

printUnknownValue('ready');
printUnknownValue(21);
printUnknownValue(false);

/*
 * FINAL SUMMARY
 *
 * Narrowing:
 * Uses runtime evidence and control flow to reduce a broad type.
 *
 * typeof:
 * Narrows primitive runtime categories such as string and number.
 *
 * in:
 * Checks whether an object has a property and can narrow object unions.
 *
 * Type predicate:
 * A return type such as value is StatusResponse that states what true proves.
 *
 * unknown boundary:
 * Requires validation or narrowing before value-specific operations.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What is type narrowing?
 * A: It is TypeScript's use of runtime checks and control flow to determine a
 *    more specific type on one path.
 *
 * Q: When is the in operator useful?
 * A: It can distinguish object types by checking for a property that exists on
 *    one member of a union.
 *
 * Q: What is a custom type guard?
 * A: A function with a type-predicate return that performs runtime checks and
 *    tells TypeScript what a true result proves.
 */
