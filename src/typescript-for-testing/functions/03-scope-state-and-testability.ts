/*
 * FUNCTION SCOPE, STATE AND TESTABILITY
 *
 * Scope determines where a variable can be accessed.
 *
 * In this chapter we examine:
 * - function-local scope
 * - parameters and local variables
 * - separate local values for separate calls
 * - outer scope
 * - shared state
 * - pure functions
 * - side effects
 *
 * These concepts matter in testing because hidden or
 * shared state can make test results depend on the
 * execution order of other tests.
 */

/*
 * SECTION 1
 * Parameters and local variables
 *
 * A parameter belongs to the function in which it is declared.
 *
 * A variable declared inside a function is also local to that function.
 */

function getScopedStatusMessage(
    statusCode: number,
): string {
    // This parameter is accessible inside the function:
    console.log('Received status:', statusCode);

    // This variable is also local to the function:
    const expectedStatusCode = 200;

    const statusIsExpected =
        statusCode === expectedStatusCode;

    if (statusIsExpected) {
        return 'Status: OK';
    }

    return 'Status: NOT OK';
}

const scopedOkMessage =
    getScopedStatusMessage(200);

const scopedErrorMessage =
    getScopedStatusMessage(500);

console.log(
    'First returned message:',
    scopedOkMessage,
);

console.log(
    'Second returned message:',
    scopedErrorMessage,
);

/*
 * The following names belong to the function:
 *
 * statusCode
 * expectedStatusCode
 * statusIsExpected
 *
 * Code outside getScopedStatusMessage cannot directly access these names.
 *
 * Uncommenting the following line would produce:
 *
 * TS2304: Cannot find name 'expectedStatusCode'.
 */

// console.log(expectedStatusCode);

/*
 * The returned strings can be used outside the function
 * because the caller stores them in scopedOkMessage and
 * scopedErrorMessage.
 *
 * The local variables themselves do not become available outside the function.
 */

/*
 * SECTION 2
 * Every call has its own local values
 *
 * Local variables are created again whenever the function is called.
 *
 * They are not automatically shared between calls.
 */

function inspectLocalStatusCheck(
    statusCode: number,
): boolean {
    /*
     * A new comparisonCount is created with the value 0
     * at the beginning of every call.
     */
    let comparisonCount = 0;

    comparisonCount =
        comparisonCount + 1;

    console.log(
        'Status inside current call:',
        statusCode,
    );

    console.log(
        'Comparison count inside current call:',
        comparisonCount,
    );

    return statusCode === 200;
}

const firstLocalResult =
    inspectLocalStatusCheck(200);

const secondLocalResult =
    inspectLocalStatusCheck(500);

console.log(
    'First local result:',
    firstLocalResult,
);

console.log(
    'Second local result:',
    secondLocalResult,
);

/*
 * Both calls print a comparison count of 1.
 *
 * First call:
 * - creates comparisonCount with 0
 * - changes it to 1
 * - finishes
 *
 * Second call:
 * - creates a different comparisonCount with 0
 * - changes it to 1
 * - finishes
 *
 * The two calls do not share their local variables.
 */

/*
 * SECTION 3
 * Outer scope and shared state
 *
 * A function can access a variable declared in its outer scope.
 *
 * An outer variable is not recreated for every call.
 * Its changed value can remain available after a call.
 */

let totalRecordedStatusChecks = 0;

function recordSharedStatusCheck(
    statusCode: number,
): string {
    /*
     * This variable comes from the outer scope.
     *
     * The function is changing the existing variable, not creating a new local variable.
     */
    totalRecordedStatusChecks =
        totalRecordedStatusChecks + 1;

    if (statusCode === 200) {
        return 'Status: OK';
    }

    return 'Status: NOT OK';
}

console.log(
    'Shared count before calls:',
    totalRecordedStatusChecks,
);

const firstRecordedMessage =
    recordSharedStatusCheck(200);

console.log(
    'First recorded message:',
    firstRecordedMessage,
);

console.log(
    'Shared count after first call:',
    totalRecordedStatusChecks,
);

const secondRecordedMessage =
    recordSharedStatusCheck(500);

console.log(
    'Second recorded message:',
    secondRecordedMessage,
);

console.log(
    'Shared count after second call:',
    totalRecordedStatusChecks,
);

/*
 * The shared count produces:
 *
 * Before calls:      0
 * After first call:  1
 * After second call: 2
 *
 * The value continues between calls because it belongs
 * to the outer scope rather than the function-local scope.
 */

/*
 * SECTION 4
 * Scope access direction
 *
 * Code inside a function can look outward and access values from an outer scope.
 *
 * Code outside a function cannot look inward and access the function's parameters or local variables.
 *
 * Inner function code:
 * - can access its parameters
 * - can access its local variables
 * - can access permitted outer variables
 *
 * Outer code:
 * - cannot access function-local names
 */

/*
 * SECTION 5
 * Pure functions
 *
 * A pure function calculates its output from its inputs and does not change values outside the function.
 *
 * The same inputs produce the same output.
 */

function isExpectedStatus(
    actualStatus: number,
    expectedStatus: number,
): boolean {
    return actualStatus === expectedStatus;
}

const firstPureResult =
    isExpectedStatus(200, 200);

const secondPureResult =
    isExpectedStatus(200, 200);

console.log(
    'First pure result:',
    firstPureResult,
);

console.log(
    'Second pure result:',
    secondPureResult,
);

/*
 * Both results are true.
 *
 * Nothing that happened before these calls changes the calculation.
 *
 * The result depends only on:
 * - actualStatus
 * - expectedStatus
 */

/*
 * SECTION 6
 * Side effects
 *
 * A side effect happens when a function interacts with something outside its returned value.
 *
 * Examples include:
 * - changing an outer variable
 * - writing to a database
 * - changing a web page
 * - sending a network request
 * - writing to a file
 * - printing to the console
 *
 * recordSharedStatusCheck has a side effect because it changes totalRecordedStatusChecks.
 *
 * Side effects are not automatically wrong. Real applications and Cypress tests need them.
 *
 * However, we must recognise them because they can make one test depend on actions performed by another test.
 */

/*
 * TESTING CONNECTION
 *
 * Pure calculation:
 *
 * isExpectedStatus(200, 200)
 *
 * always returns true for the same inputs. It can be tested independently.
 *
 * Shared-state operation:
 *
 * recordSharedStatusCheck(200)
 *
 * changes totalRecordedStatusChecks.
 * Its surrounding state must be considered when testing.
 *
 * If one test changes shared state and another test assumes the original state, 
 * test order can affect the result.
 *
 * This is why tests often reset:
 * - database records
 * - browser storage
 * - cookies and sessions
 * - shared variables
 * - mocked responses
 */

/*
 * FINAL SUMMARY
 *
 * Local scope:
 * A parameter or variable belongs to one function call.
 *
 * Outer scope:
 * A function may access values declared outside it.
 *
 * Shared state:
 * An outer value may continue changing across calls.
 *
 * Pure function:
 * Its result depends on its inputs and it does not change outside state.
 *
 * Side effect:
 * The function interacts with or changes something outside its returned value.
 */