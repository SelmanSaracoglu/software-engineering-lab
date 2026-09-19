/*
 * DESTRUCTURING, SPREAD AND OBJECT COPIES
 *
 * Object destructuring reads selected properties into variables. Object spread
 * copies properties into a new object. These features make test data and state
 * updates concise, but their behaviour must be understood: spread creates only
 * a shallow copy.
 *
 * This lesson covers:
 * - basic destructuring
 * - renaming and default values
 * - destructured function parameters
 * - object rest
 * - object spread
 * - override order
 * - shallow copies
 * - nested immutable updates
 */

type ApiResponse = {
    endpoint: string;
    statusCode: number;
    responseTimeMs: number;
};

const response: ApiResponse = {
    endpoint: '/api/orders',
    statusCode: 200,
    responseTimeMs: 420,
};

/*
 * SECTION 1
 * Basic destructuring
 */

const {
    statusCode,
    responseTimeMs,
} = response;

console.log('Destructured status:', statusCode);
console.log('Destructured time:', responseTimeMs);

/*
 * This creates two variables. It is similar to:
 *
 * const statusCode = response.statusCode;
 * const responseTimeMs = response.responseTimeMs;
 *
 * Destructuring does not create a new response object.
 */

/*
 * SECTION 2
 * Renaming a destructured variable
 */

const {
    endpoint: responseEndpoint,
} = response;

console.log('Response endpoint:', responseEndpoint);

/*
 * endpoint is the property name.
 * responseEndpoint is the new local variable name.
 */

/*
 * SECTION 3
 * Default values during destructuring
 */

type TestAccount = {
    username: string;
    displayName?: string;
};

const account: TestAccount = {
    username: 'order.operator',
};

const {
    username,
    displayName = username,
} = account;

console.log('Account label:', displayName);

/*
 * The default runs when displayName is undefined. It does not replace null,
 * false, 0, or an empty string.
 */

/*
 * SECTION 4
 * Destructured function parameter
 */

function isExpectedResponse({
    statusCode: actualStatus,
    responseTimeMs: actualResponseTimeMs,
}: ApiResponse): boolean {
    return actualStatus === 200 &&
        actualResponseTimeMs <= 1000;
}

console.log(
    'Response is expected:',
    isExpectedResponse(response),
);

/*
 * The function still receives one ApiResponse object. Its parameter immediately
 * extracts and renames the properties the function uses.
 *
 * Destructuring is helpful when it improves readability. Keeping a meaningful
 * parameter name such as response is often clearer when many properties or
 * nested paths are needed.
 */

/*
 * SECTION 5
 * Object rest
 *
 * In a destructuring pattern, ... collects the remaining properties into a
 * new object.
 */

const responseWithToken = {
    endpoint: '/api/profile',
    statusCode: 200,
    accessToken: 'secret-value',
};

const {
    accessToken,
    ...safeResponseLog
} = responseWithToken;

console.log('Token was removed:', accessToken.length > 0);
console.log('Safe response log:', safeResponseLog);

/*
 * Object rest can help omit a known field from a new object. It does not by
 * itself create a complete security policy; every sensitive field still has
 * to be identified correctly.
 */

/*
 * SECTION 6
 * Object spread creates a new outer object
 */

const originalResult = {
    testName: 'order creation',
    passed: false,
};

const copiedResult = {
    ...originalResult,
};

console.log(
    'Different outer objects:',
    copiedResult !== originalResult,
);

console.log('Copied result:', copiedResult);

/*
 * SECTION 7
 * Updating a property in a new object
 *
 * Later properties override earlier properties with the same name.
 */

const correctedResult = {
    ...originalResult,
    passed: true,
};

console.log('Original passed:', originalResult.passed);
console.log('Corrected passed:', correctedResult.passed);

/*
 * Reversing the order would make ...originalResult overwrite passed: true.
 * Current TypeScript versions report that mistake because the first passed
 * value is guaranteed to be overwritten:
 */

// const wrongOrderResult = {
//     passed: true,
//     ...originalResult,
// };

/*
 * Spread order is part of the program's behaviour even when duplicate keys are
 * not obvious enough for the compiler to report them.
 */

/*
 * SECTION 8
 * Shallow copies
 *
 * Spread creates a new outer object. Nested objects are still shared unless
 * they are copied separately.
 */

type UserProfile = {
    username: string;
    preferences: {
        theme: string;
    };
};

const originalProfile: UserProfile = {
    username: 'analyst',
    preferences: {
        theme: 'light',
    },
};

const shallowProfileCopy = {
    ...originalProfile,
};

console.log(
    'Different outer profile:',
    shallowProfileCopy !== originalProfile,
);

console.log(
    'Shared preferences object:',
    shallowProfileCopy.preferences ===
        originalProfile.preferences,
);

shallowProfileCopy.preferences.theme = 'dark';

console.log(
    'Original theme after shallow mutation:',
    originalProfile.preferences.theme,
);

/*
 * Both profiles observe "dark" because both outer objects still refer to the
 * same nested preferences object.
 */

/*
 * SECTION 9
 * Nested immutable update
 *
 * Copy every object along the path that must change independently.
 */

const independentlyUpdatedProfile: UserProfile = {
    ...originalProfile,
    preferences: {
        ...originalProfile.preferences,
        theme: 'high-contrast',
    },
};

console.log(
    'Original theme:',
    originalProfile.preferences.theme,
);

console.log(
    'Independent theme:',
    independentlyUpdatedProfile.preferences.theme,
);

console.log(
    'Different preferences objects:',
    independentlyUpdatedProfile.preferences !==
        originalProfile.preferences,
);

/*
 * PRACTICE
 * Create an updated test configuration without changing the original.
 */

type TestConfiguration = {
    environment: string;
    limits: {
        responseTimeMs: number;
        retryCount: number;
    };
};

const baseConfiguration: TestConfiguration = {
    environment: 'test',
    limits: {
        responseTimeMs: 1000,
        retryCount: 2,
    },
};

const strictConfiguration: TestConfiguration = {
    ...baseConfiguration,
    limits: {
        ...baseConfiguration.limits,
        responseTimeMs: 500,
    },
};

console.log(
    'Base response-time limit:',
    baseConfiguration.limits.responseTimeMs,
);

console.log(
    'Strict response-time limit:',
    strictConfiguration.limits.responseTimeMs,
);

/*
 * FINAL SUMMARY
 *
 * Destructuring:
 * Extracts selected properties into variables.
 *
 * Object rest:
 * Collects properties not extracted by the destructuring pattern.
 *
 * Object spread:
 * Copies enumerable properties into a new outer object.
 *
 * Override order:
 * Later properties win when names are repeated.
 *
 * Shallow copy:
 * The outer object is new, but nested object references remain shared.
 *
 * Nested immutable update:
 * Copies every object along the changed path.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What does object destructuring do?
 * A: It reads selected properties from an object into local variables and can
 *    rename them or provide defaults.
 *
 * Q: Does object spread create a deep copy?
 * A: No. It creates a shallow outer copy; nested objects remain shared unless
 *    they are copied separately.
 *
 * Q: Why does spread order matter?
 * A: When the same property appears more than once, the later value overwrites
 *    the earlier value.
 *
 * Q: How do you update one nested property without changing the original?
 * A: Create a new outer object and a new object at every level along the path
 *    to the property being changed.
 */
