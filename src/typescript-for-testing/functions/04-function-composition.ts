/*
 * FUNCTION COMPOSITION
 *
 * In this lesson, composing functions means building a larger operation
 * by calling smaller functions and using their returned values.
 *
 * One function may call another function and use the value returned by that call.
 *
 * This helps each function have one clear responsibility.
 * Follow the values as well as the order of calls: the inner call finishes
 * first, then the outer function can use its result and eventually return
 * a different result to the original caller.
 */

/*
 * SECTION 1
 * A small calculation function
 *
 * This function has one responsibility:
 * determine whether an HTTP status code represents a successful response.
 * The range 200 <= statusCode < 300 covers all 2xx statuses.
 * The console messages are traces for learning; they are side effects.
 */

function isSuccessfulStatus(
    statusCode: number,
): boolean {
    console.log(
        'Validator started with:',
        statusCode,
    );

    const statusIsSuccessful =
        statusCode >= 200 && statusCode < 300;

    console.log(
        'Validator returning:',
        statusIsSuccessful,
    );

    return statusIsSuccessful;
}

/*
 * SECTION 2
 * One function calling another function
 *
 * createStatusReport does not calculate the status range itself.
 *
 * It calls isSuccessfulStatus and uses the returned boolean value to select a message.
 * Passing statusCode without parentheses supplies the current number;
 * isSuccessfulStatus(statusCode) uses parentheses to call the validator.
 */

function createStatusReport(
    statusCode: number,
): string {
    console.log(
        'Report function started with:',
        statusCode,
    );

    /*
     * The outer function pauses at this line.
     *
     * isSuccessfulStatus is called with statusCode.
     * The validator finishes and returns a boolean.
     * That boolean is stored in statusIsSuccessful.
     *
     * The report function then continues.
     */
    const statusIsSuccessful =
        isSuccessfulStatus(statusCode);

    console.log(
        'Report function resumed with:',
        statusIsSuccessful,
    );

    if (statusIsSuccessful) {
        return 'Response: SUCCESS';
    }

    return 'Response: FAILURE';
}

/*
 * SECTION 3
 * First complete execution
 */

console.log('Program: before first report call');

const successfulReport =
    createStatusReport(201);

console.log('Program: after first report call');

console.log(
    'First returned report:',
    successfulReport,
);

/*
 * Execution order for createStatusReport(201):
 *
 * 1. The program calls createStatusReport.
 * 2. The report function starts.
 * 3. The report function calls isSuccessfulStatus.
 * 4. The validator function starts.
 * 5. The validator calculates true.
 * 6. The validator returns true and finishes.
 * 7. The report function receives true and continues.
 * 8. The report function returns "Response: SUCCESS".
 * 9. The program stores the returned string.
 * 10. The program continues after the original call.
 */

/*
 * SECTION 4
 * Second complete execution
 */

console.log('Program: before second report call');

const failedReport =
    createStatusReport(500);

console.log('Program: after second report call');

console.log(
    'Second returned report:',
    failedReport,
);

/*
 * The second call follows the same execution structure.
 *
 * The difference comes from the argument:
 *
 * isSuccessfulStatus(201) returns true.
 * isSuccessfulStatus(500) returns false.
 *
 * createStatusReport uses that returned boolean
 * to choose its own returned string.
 */

/*
 * SECTION 5
 * Responsibilities
 *
 * isSuccessfulStatus:
 * - knows the success rule
 * - returns a boolean
 *
 * createStatusReport:
 * - requests the boolean result
 * - converts that result into a readable message
 *
 * The program:
 * - starts the operation
 * - stores the final returned message
 * - prints the final result
 *
 * Each part has a separate responsibility.
 */

/*
 * TESTING CONNECTION
 *
 * Smaller functions can be checked independently.
 *
 * We can verify:
 * - whether isSuccessfulStatus applies the correct rule
 * - whether createStatusReport produces the correct message
 *
 * We can also verify them together because createStatusReport uses isSuccessfulStatus.
 * The testing level depends on what we exercise and what we isolate.
 * Calling another ordinary function does not turn this code into a React
 * component or automatically determine a particular test type.
 *
 * This structure appears frequently in:
 * - application code
 * - unit tests
 * - API test helpers
 * - Cypress commands and callbacks
 */

/*
 * IMPORTANT DISTINCTION
 *
 * This file does not declare a function inside another function.
 *
 * Both functions are declared separately:
 *
 * isSuccessfulStatus
 * createStatusReport
 *
 * 'createStatusReport' only calls the already-declared 'isSuccessfulStatus' function.
 */

/*
 * PRACTICE
 * Composing response-time functions
 *
 * The first function performs one calculation.
 * It determines whether the actual response time
 * is within the allowed maximum.
 *
 * The second function calls the first function,
 * receives its boolean result and converts that
 * result into a readable test report.
 *
 * Required functions:
 *
 * isResponseTimeWithinLimit
 * - receives actualResponseTime and maximumResponseTime
 * - both parameters are numbers
 * - returns a boolean
 * - returns true when actualResponseTime is less than
 *   or equal to maximumResponseTime
 *
 * createResponseTimeReport
 * - receives the same two number parameters
 * - calls isResponseTimeWithinLimit
 * - stores the returned boolean in a local variable
 * - returns "Response time: PASS" when it is true
 * - returns "Response time: FAIL" when it is false
 *
 * Do not repeat the response-time comparison inside
 * createResponseTimeReport. That responsibility belongs
 * to isResponseTimeWithinLimit.
 */

function isResponseTimeWithinLimit(
    actualResponseTime: number,
    maximumResponseTime: number,
): boolean {
    const responseTimeIsWithinLimit =
        actualResponseTime <= maximumResponseTime;

    return responseTimeIsWithinLimit;
}

function createResponseTimeReport(
    actualResponseTime: number,
    maximumResponseTime: number,
): string {
    // Forward this call's inputs. Fixed example numbers here would make
    // different calls produce the same answer for the wrong reason.
    const responseTimeIsWithinLimit =
        isResponseTimeWithinLimit(
            actualResponseTime,
            maximumResponseTime,
        );

    if (responseTimeIsWithinLimit) {
        return 'Response time: PASS';
    }

    return 'Response time: FAIL';
}

const positiveMessage =
    createResponseTimeReport(750, 1000);

const negativeMessage =
    createResponseTimeReport(1250, 1000);

console.log(positiveMessage);
console.log(negativeMessage);

/*
 * PRACTICE NOTES
 *
 * A function calling itself is called recursion.
 * Recursion requires a stopping condition and progress toward it.
 *
 * Without a stopping condition, function calls continue until JavaScript throws:
 *
 * RangeError: Maximum call stack size exceeded
 */

/*
 * SECTION 6
 * Passing one function result to another function
 *
 * A returned value can become the argument of another function.
 *
 * The example below separates three responsibilities:
 *
 * 1. Check whether login is allowed.
 * 2. Convert the boolean result into a message.
 * 3. Coordinate the complete login evaluation.
 */

function checkLoginPermission(
    isAccountActive: boolean,
    isPasswordCorrect: boolean,
): boolean {
    return isAccountActive && isPasswordCorrect;
}

function createLoginDecisionMessage(
    loginIsAllowed: boolean,
): string {
    if (loginIsAllowed) {
        return 'Login: ALLOWED';
    }

    return 'Login: DENIED';
}

function evaluateLoginAttempt(
    isAccountActive: boolean,
    isPasswordCorrect: boolean,
): string {
    /*
     * First function call:
     *
     * checkLoginPermission returns a boolean.
     */
    const loginIsAllowed =
        checkLoginPermission(
            isAccountActive,
            isPasswordCorrect,
        );

    /*
     * Second function call:
     *
     * The returned boolean is passed as an argument
     * to createLoginDecisionMessage.
     */
    const loginDecisionMessage =
        createLoginDecisionMessage(
            loginIsAllowed,
        );

    /*
     * The coordinating function returns the final string
     * to the original caller.
     */
    return loginDecisionMessage;
}

const allowedLoginReport =
    evaluateLoginAttempt(true, true);

const deniedLoginReport =
    evaluateLoginAttempt(true, false);

console.log(allowedLoginReport);
console.log(deniedLoginReport);

/*
 * Complete data flow for evaluateLoginAttempt(true, true):
 *
 * true and true
 *     become the parameters of evaluateLoginAttempt
 *
 * checkLoginPermission(true, true)
 *     returns true
 *
 * createLoginDecisionMessage(true)
 *     returns "Login: ALLOWED"
 *
 * evaluateLoginAttempt
 *     returns "Login: ALLOWED" to the program
 *
 * We deliberately store each returned value in a clearly named variable instead of nesting the calls.
 * This makes the execution order easier to read and debug.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why split a check and a report into separate functions?
 * A: The check returns the decision; the report converts that decision
 *    into text. We can reuse and verify each responsibility separately.
 *
 * Q: What happens when one function calls another?
 * A: The called function runs and returns to the caller. The caller can
 *    use that value to decide what to do or what to return next.
 *
 * Q: Does calling a second function make this a component test?
 * A: No. A component test exercises a UI component. Calling a helper
 *    function alone does not determine the test level.
 */
