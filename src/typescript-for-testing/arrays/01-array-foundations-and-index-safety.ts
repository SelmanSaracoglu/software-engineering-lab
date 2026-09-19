/*
 * ARRAY FOUNDATIONS AND INDEX SAFETY
 *
 * An array stores an ordered sequence of values. Test code uses arrays for
 * response collections, test cases, roles, statuses, and captured events.
 *
 * This lesson covers:
 * - array literals and element types
 * - explicit array annotations
 * - length and zero-based indexes
 * - noUncheckedIndexedAccess
 * - safe index checks
 * - updating and adding elements
 * - const with arrays
 * - array parameters
 */

/*
 * SECTION 1
 * Array literal and inferred element type
 */

const expectedStatuses = [200, 201, 204];

console.log('Complete status array:', expectedStatuses);
console.log('Number of statuses:', expectedStatuses.length);

/*
 * TypeScript infers number[] because every element is a number.
 * The brackets describe one ordered array value, while commas separate its
 * elements.
 */

/*
 * SECTION 2
 * Explicit array types
 *
 * These two annotations describe the same kind of value.
 */

const testNames: string[] = [
    'login succeeds',
    'logout succeeds',
];

const responseTimes: Array<number> = [
    320,
    480,
    750,
];

console.log('Test names:', testNames);
console.log('Response times:', responseTimes);

/*
 * string[] is common for simple element types. Array<Type> may be easier to
 * read when the element type is longer or already uses brackets.
 */

/*
 * SECTION 3
 * Zero-based indexes
 *
 * The first element is at index 0. The last valid index is length - 1.
 */

console.log('First expected status:', expectedStatuses[0]);
console.log('Second expected status:', expectedStatuses[1]);

const lastStatusIndex = expectedStatuses.length - 1;
const lastExpectedStatus = expectedStatuses[lastStatusIndex];

console.log('Last expected status:', lastExpectedStatus);

/*
 * SECTION 4
 * Index access may produce undefined
 *
 * This repository enables noUncheckedIndexedAccess. TypeScript therefore
 * treats array[index] as possibly undefined because an index may not exist.
 */

const requestedIndex = 10;
const statusAtRequestedIndex =
    expectedStatuses[requestedIndex];

console.log(
    'Status at requested index:',
    statusAtRequestedIndex,
); // undefined

/*
 * statusAtRequestedIndex has type number | undefined, not only number.
 */

if (statusAtRequestedIndex === undefined) {
    console.log('No status exists at that index');
} else {
    console.log(
        'Existing status doubled:',
        statusAtRequestedIndex * 2,
    );
}

/*
 * The check narrows the value. Inside the else branch, TypeScript knows it is
 * a number.
 */

/*
 * SECTION 5
 * Safe helper for indexed access
 */

function getStatusAtIndex(
    statuses: number[],
    index: number,
): number | undefined {
    return statuses[index];
}

const existingStatus =
    getStatusAtIndex(expectedStatuses, 1);

const missingStatus =
    getStatusAtIndex(expectedStatuses, 99);

console.log('Existing status:', existingStatus);
console.log('Missing status:', missingStatus);

/*
 * Returning number | undefined makes the absence visible to every caller.
 * A fallback should be added only when the domain defines a correct fallback.
 */

/*
 * SECTION 6
 * Updating an existing element
 */

const retryStatuses = [500, 500, 200];

retryStatuses[1] = 503;

console.log('Updated retry statuses:', retryStatuses);

/*
 * TypeScript checks the element type. This would fail:
 */

// retryStatuses[1] = '503';

/*
 * SECTION 7
 * Adding and removing elements
 */

const observedStatuses: number[] = [];

observedStatuses.push(200);
observedStatuses.push(404);

console.log('Observed statuses:', observedStatuses);

const removedStatus = observedStatuses.pop();

console.log('Removed status:', removedStatus);
console.log('Statuses after pop:', observedStatuses);

/*
 * pop returns number | undefined because an empty array has no last element.
 */

/*
 * SECTION 8
 * const array does not mean immutable array
 *
 * const prevents assigning a different array to observedStatuses. It does not
 * prevent push, pop, or element assignment on the existing array.
 */

observedStatuses.push(201);

// observedStatuses = [500];

/*
 * Readonly arrays are covered later with other readonly type tools.
 */

/*
 * SECTION 9
 * Array parameter
 */

function calculateAverage(
    values: number[],
): number | undefined {
    if (values.length === 0) {
        return undefined;
    }

    let total = 0;

    for (const value of values) {
        total = total + value;
    }

    return total / values.length;
}

console.log(
    'Average response time:',
    calculateAverage(responseTimes),
);

console.log(
    'Average of empty array:',
    calculateAverage([]),
);

/*
 * The empty-array case has no mathematically meaningful average here, so the
 * function returns undefined instead of inventing a number.
 */

/*
 * PRACTICE
 */

const authenticationStatuses = [401, 403, 200];

const firstAuthenticationStatus =
    authenticationStatuses[0];

const fourthAuthenticationStatus =
    authenticationStatuses[3];

if (firstAuthenticationStatus !== undefined) {
    console.log(
        'First authentication status:',
        firstAuthenticationStatus,
    );
}

console.log(
    'Fourth authentication status:',
    fourthAuthenticationStatus,
);

/*
 * FINAL SUMMARY
 *
 * Array:
 * An ordered sequence of values with one element type.
 *
 * Index:
 * A zero-based position. The last valid index is length - 1.
 *
 * Safe index access:
 * With noUncheckedIndexedAccess, array[index] includes undefined and must be
 * checked before number-, string-, or object-specific operations.
 *
 * const array:
 * The variable cannot be reassigned, but the existing array can still change.
 *
 * Empty result:
 * Operations such as pop or a custom average may return undefined when no
 * element or meaningful result exists.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What type does TypeScript infer for [200, 201, 204]?
 * A: number[], because every element is inferred as a number.
 *
 * Q: Why can array[index] be undefined?
 * A: The index may be outside the array's current range. This repository's
 *    noUncheckedIndexedAccess option exposes that possibility in the type.
 *
 * Q: Can a const array be changed?
 * A: Its variable cannot be reassigned, but elements may still be added,
 *    removed, or updated unless a readonly type prevents those operations.
 */
