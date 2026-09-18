/*
 * FUNCTION INPUT, OUTPUT AND CONTROL FLOW
 *
 * A function can:
 * - receive input through parameters
 * - perform instructions
 * - return an output to its caller
 *
 * Printing a value and returning a value are different operations.
 */

/*
 * SECTION 1
 * Printing without returning
 *
 * This function prints a value to the terminal.
 * It does not return a useful value to its caller.
 *
 * The return type void communicates this behaviour through TypeScript.
 */

function printReceivedStatus(
    statusCode: number,
): void {
    console.log(
        'Inside printReceivedStatus:',
        statusCode,
    );
}

console.log('Before print function call');

const printedValue =
    printReceivedStatus(200);

console.log('After print function call');

console.log(
    'Value returned by print function:',
    printedValue,
);

/*
 * Execution order:
 *
 * 1. "Before print function call" is printed.
 * 2. The right side of the assignment is evaluated.
 * 3. printReceivedStatus(200) is called.
 * 4. The function body prints the status code.
 * 5. The function finishes without a return statement.
 * 6. JavaScript produces undefined as the call result.
 * 7. undefined is assigned to printedValue.
 * 8. Program execution continues after the assignment.
 *
 * TypeScript describes this function as void.
 * At runtime, a function without a return value produces undefined.
 */

/*
 * SECTION 2
 * Returning a calculated value
 *
 * return sends a value back to the code that called the function.
 *
 * The explicit boolean return type promises that every completed path returns a boolean value.
 */

function isResponseTimeAcceptable(
    actualResponseTime: number,
    maximumResponseTime: number,
): boolean {
    const responseTimeIsWithinLimit =
        actualResponseTime <= maximumResponseTime;

    return responseTimeIsWithinLimit;
}

const acceptableResponseTime =
    isResponseTimeAcceptable(750, 1000);

const unacceptableResponseTime =
    isResponseTimeAcceptable(1250, 1000);

console.log(
    'Acceptable response time:',
    acceptableResponseTime,
);

console.log(
    'Unacceptable response time:',
    unacceptableResponseTime,
);

/*
 * The function does not print the answer itself.
 * It returns the answer.
 *
 * The caller decides what to do with that answer.
 * It may:
 * - store it in a variable
 * - print it
 * - compare it
 * - use it in a condition
 * - pass it somewhere else
 *
 * This separation makes the calculation reusable.
 */

/*
 * SECTION 3
 * Multiple return paths
 *
 * A function may contain more than one return
 * statement when different conditions produce
 * different results.
 *
 * Only one return path is executed during one call.
 */

function getStatusMessage(
    statusCode: number,
): string {
    console.log(
        'Function started with:',
        statusCode,
    );

    if (statusCode === 200) {
        console.log('Successful path selected');

        return 'Status: OK';
    }

    console.log('Error path selected');

    return 'Status: NOT OK';
}

console.log('Before first message call');

const okStatusMessage =
    getStatusMessage(200);

console.log('After first message call');

console.log(
    'First returned message:',
    okStatusMessage,
);

console.log('Before second message call');

const errorStatusMessage =
    getStatusMessage(500);

console.log('After second message call');

console.log(
    'Second returned message:',
    errorStatusMessage,
);

/*
 * First call:
 *
 * statusCode is 200.
 * The if condition is true.
 * "Status: OK" is returned.
 * The function call ends immediately.
 *
 * Second call:
 *
 * statusCode is 500.
 * The if condition is false.
 * The if body is skipped.
 * Execution continues below the if statement.
 * "Status: NOT OK" is returned.
 */

/*
 * SECTION 4
 * Early return
 *
 * return does two things:
 *
 * 1. It sends a value to the caller.
 * 2. It immediately ends the current function call.
 *
 * Because the successful path already ends with return,
 * an else block is not required in getStatusMessage.
 *
 * Code below that return can only be reached when
 * the if condition is false.
 */

function getLoginMessage(
    isAccountBlocked: boolean,
): string {
    console.log('Login function started');

    if (isAccountBlocked) {
        console.log('Blocked account path selected');

        return 'Login: DENIED';
    }

    console.log('Active account path selected');

    return 'Login: ALLOWED';
}

const blockedAccountMessage =
    getLoginMessage(true);

const activeAccountMessage =
    getLoginMessage(false);

console.log(
    'Blocked account result:',
    blockedAccountMessage,
);

console.log(
    'Active account result:',
    activeAccountMessage,
);

/*
 * getLoginMessage(true):
 *
 * The first return is executed.
 * The current call ends.
 * Lines below that return do not execute
 * during this call.
 *
 * getLoginMessage(false):
 *
 * The if body is skipped.
 * Execution continues after the if statement.
 * The second return is executed.
 */

/*
 * SECTION 5
 * Why returned values matter in testing
 *
 * Test code frequently calculates a result and then
 * compares that result with an expectation.
 *
 * Functions that return values allow the test to
 * inspect and verify those values.
 */

const responseTimeTestPassed =
    isResponseTimeAcceptable(800, 1000);

if (responseTimeTestPassed) {
    console.log('Response time test: PASS');
} else {
    console.log('Response time test: FAIL');
}

/*
 * FINAL SUMMARY
 *
 * console.log:
 * - creates terminal output
 * - does not return the printed value
 *
 * return:
 * - sends a value back to the caller
 * - immediately ends the current function call
 *
 * void:
 * - describes a function that does not return a useful value
 *
 * A returned value:
 * - can be stored
 * - can be printed
 * - can be compared
 * - can control later program behaviour
 */