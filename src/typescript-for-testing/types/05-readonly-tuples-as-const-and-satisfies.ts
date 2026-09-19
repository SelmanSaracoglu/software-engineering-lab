/*
 * READONLY, TUPLES, AS CONST AND SATISFIES
 *
 * TypeScript can preserve exact values, describe fixed-position arrays, and
 * prevent accidental assignments in checked code. These tools improve test
 * data contracts when used deliberately.
 *
 * This lesson covers:
 * - readonly object properties
 * - readonly arrays
 * - tuples
 * - readonly tuples
 * - const assertions
 * - satisfies
 * - the difference between checking and changing runtime behaviour
 */

/*
 * SECTION 1
 * Readonly object properties
 */

type TestIdentity = {
    readonly id: string;
    name: string;
};

const testIdentity: TestIdentity = {
    id: 'test-101',
    name: 'login succeeds',
};

testIdentity.name = 'login returns 200';

// testIdentity.id = 'test-202';

console.log('Test identity:', testIdentity);

/*
 * readonly prevents assignment through the typed property. It does not freeze
 * the runtime object.
 */

/*
 * SECTION 2
 * Readonly arrays
 */

const acceptedStatuses: readonly number[] = [
    200,
    201,
    204,
];

console.log('First accepted status:', acceptedStatuses[0]);

// acceptedStatuses.push(202);
// acceptedStatuses[0] = 500;

/*
 * Reading and non-mutating methods remain available. Mutating methods and
 * element assignment are rejected by TypeScript.
 */

function includesStatus(
    statuses: readonly number[],
    statusCode: number,
): boolean {
    return statuses.includes(statusCode);
}

console.log(
    '201 is accepted:',
    includesStatus(acceptedStatuses, 201),
);

/*
 * A function that only reads an array should accept readonly input. Mutable
 * arrays can still be passed because the function promises not to mutate them.
 */

/*
 * SECTION 3
 * Tuples
 *
 * A tuple describes a fixed set of positions with known types.
 */

type StatusCaseTuple = [
    name: string,
    actualStatus: number,
    expectedStatus: number,
];

const statusCase: StatusCaseTuple = [
    'order is created',
    201,
    201,
];

const tupleName = statusCase[0];
const tupleActualStatus = statusCase[1];
const tupleExpectedStatus = statusCase[2];

console.log('Tuple name:', tupleName);
console.log(
    'Tuple passed:',
    tupleActualStatus === tupleExpectedStatus,
);

/*
 * Use tuples when positions are stable and meaningful. Use objects when named
 * properties make the data clearer or the shape may grow.
 */

/*
 * SECTION 4
 * Readonly tuple
 */

type Coordinate = readonly [
    x: number,
    y: number,
];

const clickPosition: Coordinate = [120, 300];

console.log('Click X:', clickPosition[0]);

// clickPosition[0] = 200;

/*
 * SECTION 5
 * as const
 *
 * A const assertion preserves literal values and makes object properties or
 * array positions readonly in the inferred type.
 */

const expectedResponse = {
    method: 'POST',
    statusCode: 201,
} as const;

/*
 * Inferred type:
 *
 * {
 *     readonly method: 'POST';
 *     readonly statusCode: 201;
 * }
 */

console.log('Expected method:', expectedResponse.method);

const allowedRoles = [
    'ADMIN',
    'ORDER_OPERATOR',
] as const;

type AllowedRole = (typeof allowedRoles)[number];

function printAllowedRole(role: AllowedRole): void {
    console.log('Allowed role:', role);
}

printAllowedRole('ADMIN');

// printAllowedRole('UNKNOWN');

/*
 * as const is useful when a runtime list should also become the source of an
 * exact literal union. It still does not deep-freeze the runtime value.
 */

/*
 * APPLICATION
 * Validate endpoint expectations with satisfies
 *
 * satisfies checks that an expression is compatible with a type while keeping
 * the expression's useful inferred detail.
 */

type EndpointExpectation = {
    method: 'GET' | 'POST';
    expectedStatus: number;
};

const createOrderExpectation = {
    method: 'POST',
    expectedStatus: 201,
} satisfies EndpointExpectation;

function requiresPost(method: 'POST'): void {
    console.log('Confirmed method:', method);
}

requiresPost(createOrderExpectation.method);

/*
 * If createOrderExpectation had been annotated directly as
 * EndpointExpectation, its method property would be viewed as 'GET' | 'POST'.
 * satisfies validates the contract while preserving the inferred literal
 * 'POST' for this value.
 */

const endpointExpectations = {
    listOrders: {
        method: 'GET',
        expectedStatus: 200,
    },
    createOrder: {
        method: 'POST',
        expectedStatus: 201,
    },
} satisfies Record<string, EndpointExpectation>;

console.log(
    'Create-order status:',
    endpointExpectations.createOrder.expectedStatus,
);

/*
 * FINAL SUMMARY
 *
 * readonly:
 * Prevents assignment through the checked type; it does not freeze runtime
 * data.
 *
 * Tuple:
 * An array type with fixed positions and known position-specific types.
 *
 * as const:
 * Preserves literal values and infers readonly properties or tuple positions.
 *
 * satisfies:
 * Checks compatibility while retaining the expression's useful inferred type.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: When should a function accept a readonly array?
 * A: When it only reads the elements. The contract then prevents accidental
 *    mutation and accepts both readonly and mutable callers.
 *
 * Q: How does a tuple differ from a normal array?
 * A: A tuple has a fixed positional structure with a known type for each
 *    position; an array has one general element type and variable length.
 *
 * Q: What does as const do?
 * A: It preserves literal inference and makes inferred properties or array
 *    positions readonly.
 *
 * Q: How does satisfies differ from a type assertion?
 * A: satisfies checks compatibility and reports mistakes. An assertion tells
 *    the compiler to accept a view and may bypass useful checking.
 */
