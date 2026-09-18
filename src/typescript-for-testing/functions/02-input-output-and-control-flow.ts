/*
 * FUNCTION INPUT, OUTPUT AND CONTROL FLOW
 *
 * A function can:
 * - receive input through parameters
 * - perform instructions
 * - return an output to its caller
 *
 * Printing a value and returning a value are different operations.
 * In a test, this distinction decides whether the caller can inspect
 * the result: terminal output is visible to a person; a returned value
 * can also be compared by code.
 */

/*
 * SECTION 1
 * Printing without returning
 *
 * This function prints a value to the terminal.
 * It does not return a useful value to its caller.
 *
 * The return type void communicates this behaviour through TypeScript.
 * The function may still have an effect: console.log writes output.
 * No return statement sends that printed text back to the caller.
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
 * At runtime, a function that reaches its end without returning a value
 * produces undefined. void is the TypeScript return type; undefined is
 * the JavaScript value observed in this example.
 */

/*
 * SECTION 2
 * Returning a calculated value
 *
 * return sends a value back to the code that called the function.
 *
 * The explicit boolean return type asks TypeScript to check the output.
 * The <= operator includes the boundary: 1000 ms is acceptable if the
 * maximum is 1000 ms. The caller supplies the numbers at each call.
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
 * This function also prints which path ran so that we can follow the
 * execution order. Those prints do not change the returned string.
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
 * An early return is useful when a condition can settle the answer at
 * once, for example an account that is already blocked.
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
 * The example below prints PASS or FAIL for practice. It has no test
 * framework assertion: printing FAIL alone would not fail a test run.
 * We will later use assertions to make an incorrect result fail a test.
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

/*
 * INTERVIEW ANSWERS
 *
 * Q: How does console.log differ from return?
 * A: console.log creates output as a side effect. return gives a value
 *    to the caller and immediately stops the current function call.
 *
 * Q: What happens if a JavaScript function ends without returning a value?
 * A: Its call evaluates to undefined. TypeScript often uses void to show
 *    that callers should not use the return value.
 *
 * Q: Why is an early return useful?
 * A: It ends a path as soon as its answer is known, so the remaining
 *    statements run only for the other paths.
 */
