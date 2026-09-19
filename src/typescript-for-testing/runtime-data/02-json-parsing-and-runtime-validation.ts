/*
 * JSON PARSING AND RUNTIME VALIDATION
 *
 * JSON is text. JSON.parse creates JavaScript values, but TypeScript cannot
 * prove that external text follows an application contract. Parse first into
 * uncertainty, validate at the boundary, and only then use a trusted type.
 *
 * This lesson covers:
 * - JSON.stringify
 * - JSON.parse and syntax errors
 * - treating parsed data as unknown
 * - validating primitive and nested properties
 * - validating arrays
 * - separating parsing from application logic
 */

/*
 * SECTION 1
 * Serialising a value to JSON text
 */

const responseValue = {
    statusCode: 200,
    requestId: 'request-101',
    data: {
        id: 'order-101',
    },
};

const responseJson = JSON.stringify(responseValue);

console.log('JSON text:', responseJson);
console.log('JSON text type:', typeof responseJson);

/*
 * JSON.stringify returns a string. Functions, undefined object properties, and
 * some special JavaScript values do not have ordinary JSON representations, so
 * serialisation is not a universal object-copy mechanism.
 */

/*
 * SECTION 2
 * Parsing JSON text
 */

const parsedValue: unknown = JSON.parse(responseJson);

console.log('Parsed runtime type:', typeof parsedValue);

/*
 * JSON.parse returns runtime data. Assigning it to unknown makes the trust
 * boundary explicit and prevents property access before validation.
 */

/*
 * SECTION 3
 * Invalid JSON syntax throws
 */

function parseJson(text: string): unknown {
    try {
        return JSON.parse(text) as unknown;
    } catch {
        throw new Error('Invalid JSON syntax');
    }
}

console.log('Parsed simple JSON:', parseJson('{"ready":true}'));

try {
    parseJson('{invalid-json}');
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Parse error:', error.message);
    }
}

/*
 * Valid JSON syntax does not mean a valid application shape. Syntax parsing
 * and contract validation are separate steps.
 */

/*
 * SECTION 4
 * Validate a nested response shape
 */

type OrderData = {
    id: string;
};

type OrderResponse = {
    statusCode: number;
    requestId: string;
    data: OrderData;
};

function isOrderData(value: unknown): value is OrderData {
    return typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        typeof value.id === 'string';
}

function isOrderResponse(
    value: unknown,
): value is OrderResponse {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    if (!('statusCode' in value) ||
        !('requestId' in value) ||
        !('data' in value)) {
        return false;
    }

    return typeof value.statusCode === 'number' &&
        typeof value.requestId === 'string' &&
        isOrderData(value.data);
}

if (isOrderResponse(parsedValue)) {
    console.log('Validated order ID:', parsedValue.data.id);
} else {
    console.log('Unexpected order response shape');
}

/*
 * The validator checks each property used by OrderResponse. TypeScript trusts
 * the predicate only because we declare value is OrderResponse, so the runtime
 * checks must stay aligned with the type.
 */

/*
 * SECTION 5
 * Parse and validate in one boundary function
 */

function parseOrderResponse(text: string): OrderResponse {
    const value = parseJson(text);

    if (!isOrderResponse(value)) {
        throw new Error('Invalid order response shape');
    }

    return value;
}

const trustedOrderResponse = parseOrderResponse(responseJson);

console.log(
    'Trusted request ID:',
    trustedOrderResponse.requestId,
);

/*
 * Code outside this boundary no longer needs repeated unknown checks.
 */

/*
 * APPLICATION
 * Validate an array of test-result objects
 */

type BasicTestResult = {
    name: string;
    passed: boolean;
};

function isBasicTestResult(
    value: unknown,
): value is BasicTestResult {
    return typeof value === 'object' &&
        value !== null &&
        'name' in value &&
        typeof value.name === 'string' &&
        'passed' in value &&
        typeof value.passed === 'boolean';
}

function isBasicTestResultArray(
    value: unknown,
): value is BasicTestResult[] {
    return Array.isArray(value) &&
        value.every(isBasicTestResult);
}

const testResultsJson = JSON.stringify([
    {
        name: 'login succeeds',
        passed: true,
    },
    {
        name: 'forbidden access is rejected',
        passed: true,
    },
]);

const possibleTestResults = parseJson(testResultsJson);

if (isBasicTestResultArray(possibleTestResults)) {
    const allPassed = possibleTestResults.every((result) => {
        return result.passed;
    });

    console.log('All parsed tests passed:', allPassed);
}

/*
 * Array.isArray proves the outer container is an array. every validates every
 * element before the collection is treated as BasicTestResult[].
 */

/*
 * SECTION 7
 * Reject a valid JSON document with an invalid shape
 */

const wrongShapeJson = JSON.stringify({
    statusCode: '200',
    requestId: 101,
    data: null,
});

const wrongShapeValue = parseJson(wrongShapeJson);

console.log(
    'Wrong shape accepted:',
    isOrderResponse(wrongShapeValue),
);

/*
 * The document is valid JSON, but it is not an OrderResponse.
 */

/*
 * FINAL SUMMARY
 *
 * JSON.stringify:
 * Converts supported JavaScript data into JSON text.
 *
 * JSON.parse:
 * Parses JSON syntax and may throw; it does not validate a domain contract.
 *
 * unknown parsed value:
 * Preserves uncertainty until runtime checks establish a trusted shape.
 *
 * Boundary function:
 * Parses and validates once, then returns a specific trusted type.
 *
 * Array validation:
 * Checks both the outer array and every element.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Does JSON.parse validate a TypeScript type?
 * A: No. It only parses JSON syntax and produces runtime values.
 *
 * Q: Why assign parsed JSON to unknown?
 * A: It prevents unvalidated property access and forces runtime validation at
 *    the trust boundary.
 *
 * Q: What must be checked for an array of objects?
 * A: Verify the value is an array and validate every element's required shape.
 *
 * Q: Why separate a boundary parser from application logic?
 * A: It confines uncertainty and lets the rest of the code depend on a trusted
 *    contract.
 */
