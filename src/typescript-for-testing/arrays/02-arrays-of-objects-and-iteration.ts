/*
 * ARRAYS OF OBJECTS AND ITERATION
 *
 * An array can store structured objects. Test suites use this pattern for test
 * cases, fixtures, API records, users, and captured events. Iteration lets one
 * block of code process each element without repeating the instructions.
 *
 * This lesson covers:
 * - arrays of a named object type
 * - safe indexed object access
 * - for...of iteration
 * - forEach callbacks
 * - accumulating information during iteration
 * - choosing between a loop and later transformation methods
 */

type StatusTestCase = {
    name: string;
    actualStatus: number;
    expectedStatus: number;
};

const statusTestCases: StatusTestCase[] = [
    {
        name: 'login succeeds',
        actualStatus: 200,
        expectedStatus: 200,
    },
    {
        name: 'order is created',
        actualStatus: 201,
        expectedStatus: 201,
    },
    {
        name: 'missing order is rejected',
        actualStatus: 500,
        expectedStatus: 404,
    },
];

console.log('Complete test-case array:', statusTestCases);

/*
 * Each element is one StatusTestCase object. The array type requires every
 * element to contain the declared properties with matching value types.
 */

/*
 * SECTION 1
 * Safe indexed object access
 */

const firstTestCase = statusTestCases[0];

if (firstTestCase !== undefined) {
    console.log('First test name:', firstTestCase.name);
    console.log('First actual status:', firstTestCase.actualStatus);
}

/*
 * The undefined check comes before property access because index 0 would be
 * missing if the array were empty.
 */

/*
 * SECTION 2
 * for...of iteration
 *
 * for...of gives the loop variable one complete element at a time.
 */

for (const testCase of statusTestCases) {
    const passed =
        testCase.actualStatus === testCase.expectedStatus;

    console.log(testCase.name, 'passed:', passed);
}

/*
 * Iteration order follows the array order:
 *
 * first call  -> login object
 * second call -> order object
 * third call  -> missing-order object
 */

/*
 * SECTION 3
 * Continue to skip the rest of one iteration
 */

for (const testCase of statusTestCases) {
    if (testCase.actualStatus === testCase.expectedStatus) {
        continue;
    }

    console.log(
        'Failed case requires investigation:',
        testCase.name,
    );
}

/*
 * continue does not end the entire loop. It skips to the next element.
 */

/*
 * SECTION 4
 * forEach callback
 *
 * forEach receives a callback and calls it once for every element.
 */

statusTestCases.forEach((testCase) => {
    console.log('Executing:', testCase.name);
});

/*
 * The callback parameter is inferred as StatusTestCase. forEach is suitable
 * when the purpose is a side effect such as logging. It returns void; it does
 * not create a new transformed array.
 */

/*
 * SECTION 5
 * Index in a forEach callback
 */

statusTestCases.forEach((testCase, index) => {
    console.log(
        `Case ${index + 1}:`,
        testCase.name,
    );
});

/*
 * The index is zero-based. Adding one here is only for a human-facing label.
 */

/*
 * SECTION 6
 * Accumulating a count with a loop
 */

let passedCaseCount = 0;

for (const testCase of statusTestCases) {
    const passed =
        testCase.actualStatus === testCase.expectedStatus;

    if (passed) {
        passedCaseCount = passedCaseCount + 1;
    }
}

console.log('Passed case count:', passedCaseCount);

/*
 * A loop is explicit and easy to debug. A later lesson introduces array
 * transformations and reduce for operations that create new arrays or combine
 * all elements into one result.
 */

/*
 * SECTION 7
 * Reusable evaluation function
 */

type StatusTestResult = {
    name: string;
    passed: boolean;
};

function evaluateStatusCase(
    testCase: StatusTestCase,
): StatusTestResult {
    return {
        name: testCase.name,
        passed:
            testCase.actualStatus ===
            testCase.expectedStatus,
    };
}

for (const testCase of statusTestCases) {
    const result = evaluateStatusCase(testCase);

    console.log('Evaluated result:', result);
}

/*
 * The loop controls which objects are processed. The function controls how one
 * object is evaluated. Keeping these responsibilities separate improves reuse.
 */

/*
 * PRACTICE
 */

type RoleCase = {
    role: string;
    expectedToAccessAudit: boolean;
};

const roleCases: RoleCase[] = [
    {
        role: 'ADMIN',
        expectedToAccessAudit: true,
    },
    {
        role: 'ORDER_OPERATOR',
        expectedToAccessAudit: false,
    },
];

for (const roleCase of roleCases) {
    const expectation = roleCase.expectedToAccessAudit
        ? 'ALLOWED'
        : 'DENIED';

    console.log(roleCase.role, expectation);
}

/*
 * FINAL SUMMARY
 *
 * Array of objects:
 * An ordered collection whose elements follow one object shape.
 *
 * for...of:
 * Processes one complete element at a time and supports loop control such as
 * continue and break.
 *
 * forEach:
 * Calls a callback for every element and is normally used for side effects.
 *
 * Responsibility separation:
 * A loop can choose elements while a function evaluates one element.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What is the type of one element in StatusTestCase[]?
 * A: StatusTestCase.
 *
 * Q: How does for...of differ from forEach?
 * A: for...of is loop syntax and supports break and continue. forEach calls a
 *    callback for every element and cannot be stopped with those statements.
 *
 * Q: Why check an indexed object before reading its properties?
 * A: The index may not exist, so the result may be undefined.
 */
