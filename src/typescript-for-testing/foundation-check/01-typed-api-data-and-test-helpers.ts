/*
 * FOUNDATION CHECK
 * TYPED API DATA AND TEST HELPERS
 *
 * This file combines the TypeScript foundations used by realistic API and test
 * automation code. It does not introduce a framework. Instead, it follows one
 * complete data flow:
 *
 * asynchronous response text
 * -> JSON parsing
 * -> unknown runtime value
 * -> runtime validation
 * -> typed API data
 * -> array analysis
 * -> reusable typed test helpers
 * -> explicit test results
 *
 * The purpose is to prove that the earlier topics can work together, not to
 * create a production HTTP client or test runner.
 */

import {
    DEFAULT_TIMEOUT_MS,
    createStatusResult,
} from '../modules/support/test-helpers.js';

import type {
    StatusResult,
} from '../modules/support/test-contracts.js';

/*
 * SECTION 1
 * Domain contracts
 */

const supportedRoles = [
    'ADMIN',
    'ORDER_OPERATOR',
    'PAYMENT_OPERATOR',
] as const;

type Role = (typeof supportedRoles)[number];

type UserRecord = {
    readonly id: string;
    username: string;
    active: boolean;
    roles: Role[];
    lastLoginAt: string | null;
};

type UserListResponse = {
    statusCode: number;
    requestId: string;
    data: UserRecord[];
};

type ApiSuccess<T> = {
    kind: 'success';
    value: T;
};

type ApiFailure = {
    kind: 'failure';
    reason: string;
};

type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/*
 * The literal role list exists at runtime. Its indexed-access type creates the
 * matching Role union so the values and type do not drift apart.
 */

/*
 * SECTION 2
 * Runtime validators
 */

function isRole(value: unknown): value is Role {
    return typeof value === 'string' &&
        (supportedRoles as readonly string[]).includes(value);
}

function isUserRecord(value: unknown): value is UserRecord {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    if (!('id' in value) ||
        !('username' in value) ||
        !('active' in value) ||
        !('roles' in value) ||
        !('lastLoginAt' in value)) {
        return false;
    }

    const loginDateIsValid =
        value.lastLoginAt === null ||
        typeof value.lastLoginAt === 'string';

    const rolesAreValid =
        Array.isArray(value.roles) &&
        value.roles.every(isRole);

    return typeof value.id === 'string' &&
        typeof value.username === 'string' &&
        typeof value.active === 'boolean' &&
        rolesAreValid &&
        loginDateIsValid;
}

function isUserListResponse(
    value: unknown,
): value is UserListResponse {
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
        Array.isArray(value.data) &&
        value.data.every(isUserRecord);
}

/*
 * The validators inspect the runtime value. Their type predicates allow code
 * after a true result to use the checked contracts.
 */

/*
 * SECTION 3
 * Parse unknown JSON into an explicit result union
 */

function parseUserListResponse(
    responseText: string,
): ApiResult<UserListResponse> {
    let parsedValue: unknown;

    try {
        parsedValue = JSON.parse(responseText) as unknown;
    } catch {
        return {
            kind: 'failure',
            reason: 'Response is not valid JSON',
        };
    }

    if (!isUserListResponse(parsedValue)) {
        return {
            kind: 'failure',
            reason: 'Response has an invalid user-list shape',
        };
    }

    return {
        kind: 'success',
        value: parsedValue,
    };
}

/*
 * Failure is a normal represented outcome rather than an unsafe assertion.
 * The kind property lets callers narrow success and failure exhaustively.
 */

/*
 * SECTION 4
 * Controlled asynchronous response source
 */

type ResponseScenario = 'valid' | 'invalid-shape';

const validResponseText = JSON.stringify({
    statusCode: 200,
    requestId: 'request-101',
    data: [
        {
            id: 'user-101',
            username: 'admin',
            active: true,
            roles: ['ADMIN'],
            lastLoginAt: '2026-09-19T08:30:00.000Z',
        },
        {
            id: 'user-102',
            username: 'order.operator',
            active: true,
            roles: ['ORDER_OPERATOR'],
            lastLoginAt: null,
        },
    ],
});

const invalidShapeResponseText = JSON.stringify({
    statusCode: '200',
    requestId: 101,
    data: [],
});

async function requestUserList(
    scenario: ResponseScenario,
): Promise<string> {
    await new Promise<void>((resolve) => {
        setTimeout(resolve, 5);
    });

    if (scenario === 'valid') {
        return validResponseText;
    }

    return invalidShapeResponseText;
}

/*
 * This function simulates an external async boundary deterministically. A real
 * client would obtain the text from fetch, Cypress, or another HTTP layer.
 */

/*
 * SECTION 5
 * Generic test definition and runner
 */

type TestDefinition<TInput> = {
    name: string;
    input: TInput;
    evaluate: (input: TInput) => boolean;
};

type TestResult = {
    name: string;
    passed: boolean;
};

function runTest<TInput>(
    definition: TestDefinition<TInput>,
): TestResult {
    return {
        name: definition.name,
        passed: definition.evaluate(definition.input),
    };
}

/*
 * The generic preserves the relationship between input and evaluate. A test
 * that supplies UserRecord[] must also provide a function accepting that type.
 */

/*
 * SECTION 6
 * Helper factories and array analysis
 */

function createRoleChecker(
    requiredRole: Role,
): (user: UserRecord) => boolean {
    return (user) => {
        return user.roles.includes(requiredRole);
    };
}

const isAdmin = createRoleChecker('ADMIN');

function createUserTests(
    users: UserRecord[],
): Array<TestDefinition<UserRecord[]>> {
    return [
        {
            name: 'at least one admin exists',
            input: users,
            evaluate: (receivedUsers) => {
                return receivedUsers.some(isAdmin);
            },
        },
        {
            name: 'all returned users are active',
            input: users,
            evaluate: (receivedUsers) => {
                return receivedUsers.every((user) => {
                    return user.active;
                });
            },
        },
        {
            name: 'user IDs are unique',
            input: users,
            evaluate: (receivedUsers) => {
                const uniqueIds = new Set(
                    receivedUsers.map((user) => user.id),
                );

                return uniqueIds.size === receivedUsers.length;
            },
        },
    ];
}

/*
 * APPLICATION
 * Complete foundation execution
 */

async function runFoundationCheck(): Promise<void> {
    console.log(
        'Configured timeout:',
        DEFAULT_TIMEOUT_MS,
    );

    const responseText = await requestUserList('valid');
    const parsedResult =
        parseUserListResponse(responseText);

    if (parsedResult.kind === 'failure') {
        throw new Error(parsedResult.reason);
    }

    const response = parsedResult.value;

    const statusResult: StatusResult =
        createStatusResult(
            response.statusCode,
            200,
        );

    const userTestResults = createUserTests(response.data)
        .map(runTest);

    const completeResults: TestResult[] = [
        {
            name: 'response status is 200',
            passed: statusResult.passed,
        },
        ...userTestResults,
    ];

    const failedResults = completeResults.filter((result) => {
        return !result.passed;
    });

    const passedCount = completeResults.reduce(
        (count, result) => {
            return result.passed ? count + 1 : count;
        },
        0,
    );

    console.log('Request ID:', response.requestId);
    console.log(
        'Usernames:',
        response.data.map((user) => user.username),
    );
    console.log('Test results:', completeResults);
    console.log('Passed count:', passedCount);
    console.log('Failed results:', failedResults);

    const invalidResponseText =
        await requestUserList('invalid-shape');

    const invalidResult =
        parseUserListResponse(invalidResponseText);

    if (invalidResult.kind === 'success') {
        throw new Error(
            'Invalid response unexpectedly passed validation',
        );
    }

    console.log(
        'Invalid response rejected:',
        invalidResult.reason,
    );
}

try {
    await runFoundationCheck();
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error('Foundation check failed:', error.message);
    } else {
        console.error('Foundation check failed with an unknown error');
    }

    throw error;
}

/*
 * FINAL SUMMARY
 *
 * This check combined:
 * - literal unions derived from runtime constants
 * - object types, readonly, nullable data, and arrays
 * - unknown JSON and runtime type guards
 * - discriminated result unions
 * - asynchronous functions and await
 * - generics and typed callbacks
 * - closures and helper factories
 * - map, filter, some, every, and reduce
 * - relative value imports and type-only imports
 * - explicit error handling
 *
 * Passing this file does not mean every future TypeScript problem is known. It
 * demonstrates the foundation needed to read and build typed test helpers,
 * follow API data, and continue into testing fundamentals and Cypress.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why treat parsed JSON as unknown?
 * A: External text has not yet proved that it follows the TypeScript contract.
 *    Runtime validation must establish the shape.
 *
 * Q: Why return a discriminated success/failure union from the parser?
 * A: It makes both outcomes explicit and lets callers narrow them through one
 *    reliable discriminant.
 *
 * Q: What does the generic test runner protect?
 * A: It keeps each test input type aligned with the callback that evaluates
 *    that input.
 *
 * Q: Why separate request, validation, analysis, and reporting helpers?
 * A: Each responsibility can be understood, reused, and tested independently,
 *    while the complete flow remains composable.
 */
