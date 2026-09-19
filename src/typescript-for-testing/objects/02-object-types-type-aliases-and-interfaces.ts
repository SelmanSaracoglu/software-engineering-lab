/*
 * OBJECT TYPES, TYPE ALIASES AND INTERFACES
 *
 * Object foundations showed how TypeScript infers a shape from an object
 * literal. Real test code often reuses the same shape for fixtures, helper
 * parameters, and returned results. Repeating an inline type everywhere makes
 * the relationship harder to see and easier to change inconsistently.
 *
 * This lesson covers:
 * - inline object types
 * - reusable type aliases
 * - interfaces
 * - structural typing
 * - excess-property checks on object literals
 * - choosing between type and interface for ordinary data shapes
 */

/*
 * SECTION 1
 * Inline object type
 */

function printResponseSummary(
    response: {
        endpoint: string;
        statusCode: number;
        responseTimeMs: number;
    },
): void {
    console.log('Endpoint:', response.endpoint);
    console.log('Status:', response.statusCode);
    console.log('Time:', response.responseTimeMs);
}

printResponseSummary({
    endpoint: '/api/orders',
    statusCode: 200,
    responseTimeMs: 420,
});

/*
 * The inline type is clear for one small use. If several functions need the
 * same shape, a reusable name communicates that they work with the same kind
 * of value.
 */

/*
 * SECTION 2
 * Type alias for an object shape
 *
 * A type alias gives a TypeScript type a reusable name. It creates no runtime
 * object and produces no JavaScript output.
 */

type ApiResponse = {
    endpoint: string;
    statusCode: number;
    responseTimeMs: number;
};

const ordersResponse: ApiResponse = {
    endpoint: '/api/orders',
    statusCode: 201,
    responseTimeMs: 380,
};

function isSuccessfulResponse(
    response: ApiResponse,
): boolean {
    return response.statusCode >= 200 &&
        response.statusCode < 300;
}

function isResponseWithinLimit(
    response: ApiResponse,
    maximumResponseTimeMs: number,
): boolean {
    return response.responseTimeMs <= maximumResponseTimeMs;
}

console.log(
    'Orders response is successful:',
    isSuccessfulResponse(ordersResponse),
);

console.log(
    'Orders response is fast enough:',
    isResponseWithinLimit(ordersResponse, 1000),
);

/*
 * ApiResponse is a compile-time description. ordersResponse is a runtime
 * value. Do not confuse the type name with an object that can be logged or
 * called.
 */

/*
 * SECTION 3
 * Returning a named object type
 */

type StatusCheckResult = {
    expectedStatus: number;
    actualStatus: number;
    passed: boolean;
};

function evaluateStatus(
    actualStatus: number,
    expectedStatus: number,
): StatusCheckResult {
    return {
        expectedStatus,
        actualStatus,
        passed: actualStatus === expectedStatus,
    };
}

const createdStatusResult = evaluateStatus(201, 201);

console.log('Created status result:', createdStatusResult);

/*
 * The return annotation checks that every returned object contains the
 * required properties with the correct value types.
 */

/*
 * SECTION 4
 * Interface
 *
 * An interface is another way to name an object shape.
 */

interface TestAccount {
    username: string;
    active: boolean;
    role: string;
}

const operatorAccount: TestAccount = {
    username: 'order.operator',
    active: true,
    role: 'ORDER_OPERATOR',
};

function canAttemptLogin(
    account: TestAccount,
): boolean {
    return account.active;
}

console.log(
    'Operator can attempt login:',
    canAttemptLogin(operatorAccount),
);

/*
 * For an ordinary object shape, both type and interface can describe required
 * properties. A project may prefer one style for consistency.
 *
 * This course uses:
 * - type when composing unions or other type expressions later
 * - interface when an extendable object contract reads naturally
 *
 * This is a convention, not a rule that one form is always better.
 */

/*
 * SECTION 5
 * Interface extension
 *
 * An interface can extend another interface. The new shape includes the base
 * properties plus its own properties.
 */

interface IdentifiedEntity {
    id: string;
}

interface UserRecord extends IdentifiedEntity {
    username: string;
    enabled: boolean;
}

const testUser: UserRecord = {
    id: 'user-101',
    username: 'analyst',
    enabled: true,
};

console.log('Test user ID:', testUser.id);
console.log('Test username:', testUser.username);

/*
 * Extension is useful when the relationship is real. Do not create inheritance
 * chains merely to save a few repeated property lines.
 */

/*
 * SECTION 6
 * Structural typing
 *
 * TypeScript mainly checks whether a value has the required structure. It does
 * not require the value to have been created by a particular constructor or
 * explicitly labelled with the target type.
 */

function printAccountName(
    account: TestAccount,
): void {
    console.log('Account:', account.username);
}

const accountFromFixture = {
    username: 'payment.operator',
    active: true,
    role: 'PAYMENT_OPERATOR',
    fixtureSource: 'local',
};

printAccountName(accountFromFixture);

/*
 * accountFromFixture has every property required by TestAccount. Its extra
 * fixtureSource property does not prevent the variable from being passed.
 * The function only relies on the contract it declared.
 */

/*
 * SECTION 7
 * Excess-property check on a direct object literal
 *
 * TypeScript applies an additional check when a fresh object literal is used
 * directly where a specific shape is expected. This catches many misspellings
 * and accidental properties.
 */

printAccountName({
    username: 'fulfillment.operator',
    active: true,
    role: 'FULFILLMENT_OPERATOR',
});

/*
 * Uncommenting fixtureSource in this direct call produces an excess-property
 * error because fixtureSource is not part of TestAccount.
 */

// printAccountName({
//     username: 'admin',
//     active: true,
//     role: 'ADMIN',
//     fixtureSource: 'local',
// });

/*
 * Do not work around this check with a type assertion merely to silence the
 * compiler. Decide whether the contract should include the property or whether
 * the caller should pass the correct shape.
 */

/*
 * PRACTICE
 * Create and evaluate a reusable test-case shape
 */

type ResponseTimeCase = {
    name: string;
    actualResponseTimeMs: number;
    maximumResponseTimeMs: number;
};

type ResponseTimeResult = {
    name: string;
    passed: boolean;
};

function evaluateResponseTimeCase(
    testCase: ResponseTimeCase,
): ResponseTimeResult {
    return {
        name: testCase.name,
        passed:
            testCase.actualResponseTimeMs <=
            testCase.maximumResponseTimeMs,
    };
}

const responseTimeCase: ResponseTimeCase = {
    name: 'profile response stays within its limit',
    actualResponseTimeMs: 900,
    maximumResponseTimeMs: 1000,
};

console.log(
    'Response-time result:',
    evaluateResponseTimeCase(responseTimeCase),
);

/*
 * FINAL SUMMARY
 *
 * Inline object type:
 * Useful for one local contract.
 *
 * Type alias:
 * Gives a reusable name to a type and is removed at runtime.
 *
 * Interface:
 * Names an object contract and can extend another interface.
 *
 * Structural typing:
 * Compatibility depends mainly on required properties and their types.
 *
 * Excess-property check:
 * A fresh object literal is checked for properties not declared by the target
 * object type.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why name an object type?
 * A: A reusable name keeps fixtures, parameters, and return values aligned to
 *    one contract and avoids repeating the same inline shape.
 *
 * Q: What is the practical difference between a type alias and an interface?
 * A: Both can describe object shapes. Interfaces support extension and
 *    declaration merging; type aliases also name unions and other composed
 *    types. Team consistency and the required feature should guide the choice.
 *
 * Q: What is structural typing?
 * A: TypeScript checks whether a value has the required structure rather than
 *    requiring a specific nominal class or explicit label.
 *
 * Q: Do type aliases and interfaces exist at runtime?
 * A: No. They are compile-time descriptions removed from the emitted code.
 */
