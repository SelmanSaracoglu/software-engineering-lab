/*
 * GENERICS, KEYOF, INDEXED ACCESS AND RECORD
 *
 * Reusable helpers often need to preserve a relationship between their input
 * and output types. Generics describe that relationship without replacing
 * useful types with any.
 *
 * This lesson covers:
 * - generic type parameters
 * - generic functions
 * - generic object types
 * - keyof
 * - indexed access types
 * - generic property access
 * - Record
 */

/*
 * SECTION 1
 * Generic identity
 *
 * T is a type parameter chosen from the argument at each call.
 */

function keepValue<T>(value: T): T {
    return value;
}

const keptStatus = keepValue(200);
const keptTestName = keepValue('login succeeds');

console.log('Kept status:', keptStatus);
console.log('Kept test name:', keptTestName);

/*
 * keptStatus remains number and keptTestName remains string. A version using
 * any would lose that relationship.
 */

/*
 * SECTION 2
 * Generic result type
 */

type SuccessResult<T> = {
    success: true;
    data: T;
};

type FailureResult = {
    success: false;
    error: string;
};

type OperationResult<T> =
    | SuccessResult<T>
    | FailureResult;

type UserData = {
    id: string;
    username: string;
};

const userResult: OperationResult<UserData> = {
    success: true,
    data: {
        id: 'user-101',
        username: 'analyst',
    },
};

if (userResult.success) {
    console.log('Returned username:', userResult.data.username);
}

/*
 * OperationResult<T> keeps the wrapper behaviour reusable while the data type
 * remains specific for each operation.
 */

/*
 * SECTION 3
 * keyof
 *
 * keyof produces a union of an object type's property names.
 */

type ApiResponse = {
    statusCode: number;
    requestId: string;
    responseTimeMs: number;
};

type ApiResponseKey = keyof ApiResponse;

const responseKey: ApiResponseKey = 'statusCode';

console.log('Response key:', responseKey);

// const invalidKey: ApiResponseKey = 'missing';

/*
 * ApiResponseKey is:
 *
 * 'statusCode' | 'requestId' | 'responseTimeMs'
 */

/*
 * SECTION 4
 * Indexed access type
 *
 * TypeName['property'] reads a property TYPE, not a runtime value.
 */

type StatusCode = ApiResponse['statusCode'];
type RequestId = ApiResponse['requestId'];

const successfulStatus: StatusCode = 200;
const requestId: RequestId = 'request-101';

console.log(successfulStatus, requestId);

/*
 * This keeps derived types connected to the source contract. If the property
 * type changes, the derived alias changes with it.
 */

/*
 * SECTION 5
 * Generic property reader
 */

function getProperty<T, K extends keyof T>(
    object: T,
    key: K,
): T[K] {
    return object[key];
}

const apiResponse: ApiResponse = {
    statusCode: 201,
    requestId: 'request-201',
    responseTimeMs: 450,
};

const returnedStatus =
    getProperty(apiResponse, 'statusCode');

const returnedRequestId =
    getProperty(apiResponse, 'requestId');

console.log('Returned status:', returnedStatus);
console.log('Returned request ID:', returnedRequestId);

// getProperty(apiResponse, 'missing');

/*
 * K must be a key of T. The return type T[K] depends on the selected key, so a
 * status lookup returns number while a request-ID lookup returns string.
 */

/*
 * SECTION 6
 * Record
 *
 * Record<Keys, Value> creates an object type with one property for every key.
 */

type Role =
    | 'ADMIN'
    | 'ORDER_OPERATOR'
    | 'PAYMENT_OPERATOR';

const auditAccessByRole: Record<Role, boolean> = {
    ADMIN: true,
    ORDER_OPERATOR: false,
    PAYMENT_OPERATOR: false,
};

function canAccessAudit(role: Role): boolean {
    return auditAccessByRole[role];
}

console.log('Admin audit access:', canAccessAudit('ADMIN'));

/*
 * Record requires all Role keys and rejects unsupported keys on a direct
 * object literal. It is appropriate when every known key must map to the same
 * value type.
 */

/*
 * APPLICATION
 * Environment configuration with structured Record values
 */

type Environment = 'local' | 'test' | 'production';

type EnvironmentConfiguration = {
    baseUrl: string;
    requestTimeoutMs: number;
};

const configurations: Record<
    Environment,
    EnvironmentConfiguration
> = {
    local: {
        baseUrl: 'http://localhost:3000',
        requestTimeoutMs: 1000,
    },
    test: {
        baseUrl: 'https://test.example.com',
        requestTimeoutMs: 3000,
    },
    production: {
        baseUrl: 'https://example.com',
        requestTimeoutMs: 5000,
    },
};

console.log('Test URL:', configurations.test.baseUrl);

/*
 * FINAL SUMMARY
 *
 * Generic:
 * A type parameter that preserves relationships across reusable code.
 *
 * keyof T:
 * A union of the known property keys of T.
 *
 * T[K]:
 * The property type selected from T by key K.
 *
 * Record<K, V>:
 * An object type requiring every key in K to have a value of type V.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why use a generic instead of any?
 * A: A generic preserves the relationship between concrete input and output
 *    types, while any discards checking.
 *
 * Q: What does keyof produce?
 * A: A union of an object type's known property keys.
 *
 * Q: What does T[K] represent?
 * A: The type of property K on object type T.
 *
 * Q: When is Record useful?
 * A: When every key in a known key union must map to one consistent value type.
 */
