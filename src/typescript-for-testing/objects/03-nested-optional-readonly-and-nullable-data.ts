/*
 * NESTED, OPTIONAL, READONLY AND NULLABLE DATA
 *
 * API responses and test fixtures rarely stay flat. They contain nested
 * objects, fields that may be absent, fields that may explicitly contain null,
 * and values that test code should not change accidentally.
 *
 * This lesson covers:
 * - nested object types and access
 * - optional properties
 * - exact optional-property behaviour
 * - nullable properties
 * - optional chaining
 * - nullish coalescing
 * - readonly properties
 * - the shallow nature of readonly
 */

/*
 * SECTION 1
 * Nested objects
 */

type Customer = {
    id: string;
    contact: {
        email: string;
        phone: string;
    };
};

const customer: Customer = {
    id: 'customer-101',
    contact: {
        email: 'customer@example.com',
        phone: '+49-000-000000',
    },
};

console.log('Customer ID:', customer.id);
console.log('Customer email:', customer.contact.email);

/*
 * Read customer.contact.email from left to right:
 *
 * customer         -> the outer object
 * customer.contact -> the nested contact object
 * .email           -> the string inside that nested object
 */

/*
 * SECTION 2
 * Optional properties
 *
 * A question mark means the property may be absent.
 */

type TestUser = {
    username: string;
    displayName?: string;
};

const userWithoutDisplayName: TestUser = {
    username: 'security.analyst',
};

const userWithDisplayName: TestUser = {
    username: 'security.analyst',
    displayName: 'Security Analyst',
};

console.log(
    'Missing display name:',
    userWithoutDisplayName.displayName,
); // undefined

console.log(
    'Present display name:',
    userWithDisplayName.displayName,
);

/*
 * Reading an optional property produces string | undefined here. Code must
 * handle the possibility that the property is absent.
 */

function getUserLabel(user: TestUser): string {
    if (user.displayName === undefined) {
        return user.username;
    }

    return user.displayName;
}

console.log('User label:', getUserLabel(userWithoutDisplayName));

/*
 * SECTION 3
 * exactOptionalPropertyTypes
 *
 * This repository enables exactOptionalPropertyTypes. Therefore:
 *
 * displayName?: string
 *
 * means the property may be absent. It does not automatically mean a present
 * property may explicitly contain undefined.
 */

const validOptionalUser: TestUser = {
    username: 'operator',
};

console.log('Valid optional user:', validOptionalUser);

/*
 * The following object would fail with this repository configuration:
 */

// const invalidOptionalUser: TestUser = {
//     username: 'operator',
//     displayName: undefined,
// };

/*
 * If explicit undefined is part of the domain, declare it deliberately:
 */

type UserWithExplicitUndefined = {
    username: string;
    displayName: string | undefined;
};

const explicitUndefinedUser: UserWithExplicitUndefined = {
    username: 'operator',
    displayName: undefined,
};

console.log(
    'Explicit undefined:',
    explicitUndefinedUser.displayName,
);

/*
 * SECTION 4
 * Nullable properties
 *
 * null is an explicit runtime value. It often means "known to have no value".
 * An optional property may be absent; a nullable property is present but may
 * contain null.
 */

type Session = {
    sessionId: string;
    expiresAt: string | null;
};

const persistentSession: Session = {
    sessionId: 'session-101',
    expiresAt: null,
};

const expiringSession: Session = {
    sessionId: 'session-102',
    expiresAt: '2026-09-20T10:00:00.000Z',
};

function describeExpiration(session: Session): string {
    if (session.expiresAt === null) {
        return 'No expiration date';
    }

    return `Expires at ${session.expiresAt}`;
}

console.log(describeExpiration(persistentSession));
console.log(describeExpiration(expiringSession));

/*
 * SECTION 5
 * Optional chaining
 *
 * Optional chaining stops and produces undefined when the value before ?. is
 * null or undefined.
 */

type ApiError = {
    message: string;
    details?: {
        field?: string;
    };
};

const validationError: ApiError = {
    message: 'Validation failed',
    details: {
        field: 'email',
    },
};

const genericError: ApiError = {
    message: 'Unexpected error',
};

const validationField =
    validationError.details?.field;

const missingField =
    genericError.details?.field;

console.log('Validation field:', validationField);
console.log('Missing field:', missingField);

/*
 * Optional chaining does not prove that data is valid. It only accesses a
 * possibly missing path safely.
 */

/*
 * SECTION 6
 * Nullish coalescing
 *
 * ?? uses its right side only when the left side is null or undefined.
 */

const validationFieldLabel =
    validationError.details?.field ?? 'unknown field';

const genericFieldLabel =
    genericError.details?.field ?? 'unknown field';

console.log('Validation field label:', validationFieldLabel);
console.log('Generic field label:', genericFieldLabel);

/*
 * Unlike ||, ?? does not replace valid falsy values such as 0, false, or ''.
 */

const retryCount: number | null = 0;

console.log('Retry count with ??:', retryCount ?? 3); // 0
console.log('Retry count with ||:', retryCount || 3); // 3

/*
 * SECTION 7
 * readonly properties
 *
 * readonly prevents assignment through that typed property after creation.
 */

type AuditEvent = {
    readonly id: string;
    readonly createdAt: string;
    outcome: string;
};

const auditEvent: AuditEvent = {
    id: 'event-101',
    createdAt: '2026-09-19T10:00:00.000Z',
    outcome: 'PENDING',
};

auditEvent.outcome = 'SUCCESS';

console.log('Audit outcome:', auditEvent.outcome);

/*
 * These assignments would fail:
 */

// auditEvent.id = 'event-202';
// auditEvent.createdAt = '2026-09-20T10:00:00.000Z';

/*
 * readonly is a TypeScript compile-time restriction. It is not runtime
 * freezing, and it is shallow unless nested properties are also readonly.
 */

type TestConfiguration = {
    readonly environment: string;
    limits: {
        maximumResponseTimeMs: number;
    };
};

const testConfiguration: TestConfiguration = {
    environment: 'test',
    limits: {
        maximumResponseTimeMs: 1000,
    },
};

testConfiguration.limits.maximumResponseTimeMs = 800;

console.log(
    'Updated nested limit:',
    testConfiguration.limits.maximumResponseTimeMs,
);

/*
 * environment is readonly, but limits.maximumResponseTimeMs is not. A later
 * lesson covers deeper readonly types and immutable copies.
 */

/*
 * PRACTICE
 */

type OrderSummary = {
    readonly id: string;
    customer: {
        name: string;
        email?: string;
    };
    cancellationReason: string | null;
};

const orderSummary: OrderSummary = {
    id: 'order-101',
    customer: {
        name: 'Ada',
    },
    cancellationReason: null,
};

const customerEmail =
    orderSummary.customer.email ?? 'email not provided';

const cancellationLabel =
    orderSummary.cancellationReason ?? 'not cancelled';

console.log('Customer email:', customerEmail);
console.log('Cancellation:', cancellationLabel);

/*
 * FINAL SUMMARY
 *
 * Nested object:
 * An object stored as a property value inside another object.
 *
 * Optional property:
 * May be absent and therefore reads as possibly undefined.
 *
 * Nullable property:
 * Is present but may explicitly contain null.
 *
 * Optional chaining:
 * Safely stops property access at null or undefined.
 *
 * Nullish coalescing:
 * Supplies a fallback only for null or undefined.
 *
 * readonly:
 * Prevents assignment through a property in checked TypeScript code. It is
 * shallow and does not freeze runtime objects.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: How do an optional and a nullable property differ?
 * A: An optional property may be absent. A nullable property is present but
 *    its value may be null.
 *
 * Q: What does optional chaining do?
 * A: It returns undefined instead of continuing property access when the value
 *    before ?. is null or undefined.
 *
 * Q: How does ?? differ from ||?
 * A: ?? falls back only for null or undefined. || also falls back for other
 *    falsy values such as 0, false, and an empty string.
 *
 * Q: Does readonly deeply freeze an object?
 * A: No. It is a compile-time assignment restriction and is shallow unless
 *    nested data is also declared readonly.
 */
