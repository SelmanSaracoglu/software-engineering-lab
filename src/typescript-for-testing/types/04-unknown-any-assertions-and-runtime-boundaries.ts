/*
 * UNKNOWN, ANY, ASSERTIONS AND RUNTIME BOUNDARIES
 *
 * TypeScript checks source code, but values from JSON, storage, network calls,
 * browser APIs, and third-party libraries exist at runtime. A static type does
 * not automatically prove that those values match a contract.
 *
 * This lesson covers:
 * - the risk of any
 * - safe uncertainty with unknown
 * - narrowing unknown
 * - type assertions
 * - why assertions do not validate data
 * - keeping runtime boundaries small
 */

/*
 * SECTION 1
 * any disables useful checks
 */

const uncheckedValue: any = {
    statusCode: '200',
};

const uncheckedStatus: number = uncheckedValue.statusCode;

console.log('Unchecked status:', uncheckedStatus);
console.log('Runtime type:', typeof uncheckedStatus);

/*
 * TypeScript accepted number because any opted out of checking. At runtime the
 * value is still a string. any can let incorrect assumptions travel far from
 * the boundary where they entered.
 */

/*
 * SECTION 2
 * unknown represents an untrusted value
 */

const uncertainValue: unknown = {
    statusCode: 200,
};

/*
 * TypeScript does not allow property access yet:
 */

// console.log(uncertainValue.statusCode);

if (typeof uncertainValue === 'object' &&
    uncertainValue !== null &&
    'statusCode' in uncertainValue &&
    typeof uncertainValue.statusCode === 'number') {
    console.log(
        'Narrowed status:',
        uncertainValue.statusCode,
    );
}

/*
 * unknown preserves uncertainty until runtime evidence narrows the value.
 */

/*
 * SECTION 3
 * Reusable boundary validator
 */

type ApiResponse = {
    statusCode: number;
    requestId: string;
};

function isApiResponse(
    value: unknown,
): value is ApiResponse {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    if (!('statusCode' in value) ||
        !('requestId' in value)) {
        return false;
    }

    return typeof value.statusCode === 'number' &&
        typeof value.requestId === 'string';
}

function readApiResponse(value: unknown): ApiResponse {
    if (!isApiResponse(value)) {
        throw new Error('Invalid API response');
    }

    return value;
}

const validatedResponse = readApiResponse({
    statusCode: 201,
    requestId: 'request-201',
});

console.log('Validated response:', validatedResponse);

/*
 * Runtime validation is performed once at the boundary. Code after the
 * boundary receives ApiResponse and can use it normally.
 */

/*
 * SECTION 4
 * Type assertions
 *
 * An assertion tells TypeScript to treat a value as a type. It does not inspect
 * or transform the runtime value.
 */

const assertedResponse = {
    statusCode: 'not a number',
    requestId: 123,
} as unknown as ApiResponse;

console.log(
    'Asserted runtime status type:',
    typeof assertedResponse.statusCode,
);

/*
 * The double assertion is deliberately unsafe and shown only to expose the
 * danger. The runtime object did not change. Assertions are appropriate when
 * the programmer has evidence the compiler cannot express, not as a substitute
 * for validating external data.
 */

/*
 * SECTION 5
 * Narrow assertion after a runtime check
 *
 * DOM or library APIs sometimes expose broad values. Prefer a real check before
 * asserting a narrower relationship.
 */

function getStringValue(value: unknown): string {
    if (typeof value !== 'string') {
        throw new Error('Expected a string');
    }

    return value;
}

console.log('Checked string:', getStringValue('ready'));

/*
 * No assertion is necessary because the runtime check already narrows value.
 * This is the preferred outcome.
 */

/*
 * SECTION 6
 * Keep unsafe code at the boundary
 *
 * Application logic should not repeatedly receive any or unknown when one
 * boundary function can validate the data and return a trusted type.
 */

function isSuccessful(
    response: ApiResponse,
): boolean {
    return response.statusCode >= 200 &&
        response.statusCode < 300;
}

const boundaryInput: unknown = {
    statusCode: 204,
    requestId: 'request-204',
};

const trustedResponse = readApiResponse(boundaryInput);

console.log(
    'Trusted response is successful:',
    isSuccessful(trustedResponse),
);

/*
 * PRACTICE
 */

type TestResult = {
    name: string;
    passed: boolean;
};

function isTestResult(value: unknown): value is TestResult {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    return 'name' in value &&
        typeof value.name === 'string' &&
        'passed' in value &&
        typeof value.passed === 'boolean';
}

const resultBoundaryValue: unknown = {
    name: 'login succeeds',
    passed: true,
};

if (isTestResult(resultBoundaryValue)) {
    console.log(
        resultBoundaryValue.name,
        resultBoundaryValue.passed,
    );
}

/*
 * FINAL SUMMARY
 *
 * any:
 * Disables most checking and allows unsafe assumptions to propagate.
 *
 * unknown:
 * Represents uncertainty and requires narrowing before specific operations.
 *
 * Type assertion:
 * Changes the compiler's view, not the runtime value.
 *
 * Runtime boundary:
 * The place where untrusted data enters trusted application or test code.
 * Validate once, then return a reliable type.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: How do any and unknown differ?
 * A: any opts out of checking. unknown requires runtime narrowing before the
 *    value can be used as a specific type.
 *
 * Q: Does "value as ApiResponse" validate value?
 * A: No. A type assertion only changes TypeScript's compile-time view.
 *
 * Q: Why validate data at a boundary?
 * A: It confines uncertainty to one place and lets the rest of the program use
 *    a trusted, specific type.
 */
