/*
 * FUNCTION EXPRESSIONS AND ARROW FUNCTIONS
 *
 * JavaScript functions can be written in different forms.
 *
 * This chapter compares:
 * - function declarations
 * - function expressions
 * - arrow functions
 *
 * All three forms can:
 * - receive arguments
 * - execute instructions
 * - return values
 * - be called with parentheses
 *
 * We begin with syntax. Later sections use function values as parameters
 * and distinguish a function type from the function it describes.
 * All three examples below implement the same rule, so they return the
 * same answer for the same input. The forms also have other language
 * differences that this lesson does not need yet.
 */

/*
 * SECTION 1
 * Function declaration
 *
 * This is the function form used in the previous chapters.
 *
 * The function has its own declared name: isStatusSuccessfulDeclaration
 */

function isStatusSuccessfulDeclaration(
    statusCode: number,
): boolean {
    return statusCode >= 200 && statusCode < 300;
}

const declarationResult =
    isStatusSuccessfulDeclaration(201);

console.log(
    'Declaration result:',
    declarationResult,
);

/*
 * SECTION 2
 * Function expression
 *
 * A function can be created as a value and assigned to a variable.
 *
 * The function below does not have a separate name after the function keyword.
 *
 * The variable name is used to access and call it.
 * The = performs the assignment; the body still waits for a call with ().
 */

const isStatusSuccessfulExpression = function (
    statusCode: number,
): boolean {
    return statusCode >= 200 && statusCode < 300;
};

/*
 * Writing the variable name without parentheses refers to the function value.
 *
 * Adding parentheses calls the stored function.
 */

const expressionResult =
    isStatusSuccessfulExpression(201);

console.log(
    'Function expression result:',
    expressionResult,
);

/*
 * SECTION 3
 * Arrow function
 *
 * An arrow function is another way to create a function value and assign it to a variable.
 *
 * The arrow symbol is:
 *
 * =>
 *
 * The return type is written before the arrow.
 * Here the => belongs to the actual function value.
 */

const isStatusSuccessfulArrow = (
    statusCode: number,
): boolean => {
    return statusCode >= 200 && statusCode < 300;
};

const arrowResult =
    isStatusSuccessfulArrow(201);

console.log(
    'Arrow function result:',
    arrowResult,
);

/*
 * SECTION 4
 * Structural comparison
 *
 * Function declaration:
 *
 * function functionName(parameter: type): returnType {
 *     return value;
 * }
 *
 * Function expression:
 *
 * const functionName = function (
 *     parameter: type,
 * ): returnType {
 *     return value;
 * };
 *
 * Arrow function:
 *
 * const functionName = (
 *     parameter: type,
 * ): returnType => {
 *     return value;
 * };
 */

/*
 * SECTION 5
 * The behaviour is the same in this example
 *
 * All three functions receive 500 below.
 * All three apply the same status-code rule.
 * All three therefore return false.
 */

const failedDeclarationResult =
    isStatusSuccessfulDeclaration(500);

const failedExpressionResult =
    isStatusSuccessfulExpression(500);

const failedArrowResult =
    isStatusSuccessfulArrow(500);

console.log(
    'Failed declaration result:',
    failedDeclarationResult,
);

console.log(
    'Failed expression result:',
    failedExpressionResult,
);

console.log(
    'Failed arrow result:',
    failedArrowResult,
);

/*
 * IMPORTANT DISTINCTION
 *
 * This assignment does not call the function:
 *
 * const savedFunction = isStatusSuccessfulArrow;
 *
 * This expression calls the function:
 *
 * isStatusSuccessfulArrow(201);
 *
 * The same parentheses rule applies to declarations, function expressions and arrow functions.
 */

const savedStatusFunction =
    isStatusSuccessfulArrow;

const savedFunctionResult =
    savedStatusFunction(204);

console.log(
    'Saved function result:',
    savedFunctionResult,
);

/*
 * TESTING CONNECTION
 *
 * Arrow functions are common in testing code.
 *
 * Cypress and Vitest examples frequently contain:
 *
 * () => {
 *     // test instructions
 * }
 *
 * We will use callbacks later in this file. First, recognise that the
 * arrow syntax creates a function value.
 *
 * The function does not execute merely because it has been created or assigned to a variable.
 * It must still be called by some code.
 */

/*
 * RECAP BEFORE FUNCTION TYPES
 *
 * function declaration:
 * A named function declared with the function keyword.
 *
 * function expression:
 * A function value assigned to a variable.
 *
 * arrow function:
 * Another syntax for creating a function value.
 *
 * In all three cases:
 * - a variable or function name without () refers to the function
 * - adding () calls the function through that name
 */

/*
 * SECTION 6
 * Block body and concise body
 *
 * Arrow functions have two body forms:
 *
 * 1. Block body
 * 2. Concise expression body
 *
 * A block body uses curly braces.
 * An explicit return statement is required when
 * the function must return a value.
 *
 * The existing isStatusSuccessfulArrow function
 * uses a block body:
 *
 * const functionName = (
 *     parameter: type,
 * ): returnType => {
 *     return value;
 * };
 */

/*
 * A concise body does not use curly braces.
 *
 * It contains one expression.
 * The result of that expression is returned automatically.
 */

const isStatusSuccessfulConcise = (
    statusCode: number,
): boolean =>
    statusCode >= 200 && statusCode < 300;

const conciseSuccessfulResult =
    isStatusSuccessfulConcise(204);

const conciseFailedResult =
    isStatusSuccessfulConcise(500);

console.log(
    'Concise successful result:',
    conciseSuccessfulResult,
);

console.log(
    'Concise failed result:',
    conciseFailedResult,
);

/*
 * These two forms have the same behaviour:
 *
 * Block body:
 *
 * (statusCode: number): boolean => {
 *     return statusCode === 200;
 * }
 *
 * Concise body:
 *
 * (statusCode: number): boolean =>
 *     statusCode === 200
 *
 * In the concise form, the comparison expression becomes the returned value.
 */

/*
 * COMMON MISTAKE
 *
 * Adding curly braces creates a block body.
 * A block body does not return the final expression automatically.
 *
 * The following function would produce a TypeScript
 * error because it promises boolean but has no return:
 *
 * const incorrectCheck = (
 *     statusCode: number,
 * ): boolean => {
 *     statusCode === 200;
 * };
 *
 * The comparison is calculated and then discarded.
 */

/*
 * IMPORTANT
 *
 * The arrow symbol does not itself mean return.
 *
 * Implicit return happens only when:
 * - there are no curly braces
 * - the body contains one expression
 *
 * If curly braces are present, use return explicitly.
 */

/*
 * SECTION 7
 * The type of a function value
 *
 * A variable can hold a function, so its type can describe the function's
 * inputs and output: (statusCode: number) => boolean.
 *
 * In the assignment below, read the three parts separately:
 * - ':' introduces a TypeScript type description; nothing runs here.
 * - '=' assigns a real function value to the variable.
 * - the second '=>' creates the actual arrow function.
 *
 * The first '=>' appears inside the TYPE. It means "number in, boolean out".
 * The second '=>' appears after the '='. It introduces executable code.
 * TypeScript checks that the value matches the type, then removes type
 * annotations when the code is run.
*/

const checkSuccessfulStatus: (
    statusCode: number
) => boolean = (statusCode) => {
    return statusCode >= 200 && statusCode < 300;
};

const successfulStatusResult =
    checkSuccessfulStatus(204);

const unsuccessfulStatusResult =
    checkSuccessfulStatus(500);

console.log(
    'Function type result with 204:',
    successfulStatusResult
);

console.log(
    'Function type result with 500:',
    unsuccessfulStatusResult
);

/*
 * SECTION 8
 * A function must match its function type
 *
 * validStatusChecker matches its type: number in, boolean out.
 * createStatusMessage also matches its own type: number in, string out.
 * If we assigned createStatusMessage to a variable typed as a boolean
 * checker, TypeScript would report a type error.
*/

const validStatusChecker: (
    statusCode: number
) => boolean = (statusCode) => {
    return statusCode >= 200 && statusCode < 300;
};

const createStatusMessage: (
    statusCode: number
) => string = (statusCode) => {
    return `Received status: ${statusCode}`;
};

// Uncomment to observe the mismatch: a string-returning function
// cannot be assigned where a boolean-returning function is required.
// const invalidStatusChecker: (statusCode: number) => boolean =
//     createStatusMessage;

/*
 * SECTION 9
 * Naming a function type
 *
 * A function type can be given a reusable name. StatusChecker describes
 * a contract: one number in, one boolean out. It is erased at runtime;
 * StatusChecker itself is not a callable function.
 *
 * Both functions below satisfy that contract but apply different rules.
 * The parameter's number type is inferred from StatusChecker, so we do
 * not need to write ': number' again in each implementation.
*/

type StatusChecker = (
    statusCode: number
) => boolean;

const isSuccessfulHttpStatus: StatusChecker =
    (statusCode) => {
        return statusCode >= 200 && statusCode < 300;
    };

const isServerErrorHttpStatus: StatusChecker =
    (statusCode) => {
        return statusCode >= 500 && statusCode < 600;
    };

const successfulStatusCheck =
    isSuccessfulHttpStatus(204);

const serverErrorStatusCheck =
    isServerErrorHttpStatus(500);

console.log(
    '204 is successful:',
    successfulStatusCheck
); // 204 is successful: true

console.log(
    '500 is a server error:',
    serverErrorStatusCheck
); // 500 is a server error: true

/*
 * SECTION 10
 * Passing a function as an argument
 *
 * A callback is a function passed to another function. In
 * runStatusCheck(204, isSuccessfulHttpStatus), the second argument is a
 * function value: no () follows its name. The checker parameter receives
 * that value, and checker(statusCode) actually calls it.
 *
 * In this example the call is synchronous: it returns before
 * runStatusCheck continues to the next console.log.
*/

function runStatusCheck(
    statusCode: number,
    checker: StatusChecker
): boolean {
    console.log('runStatusCheck started');

    const checkResult = checker(statusCode);

    console.log(
        'The callback returned:',
        checkResult
    );

    return checkResult;
}

const callbackCheckResult = runStatusCheck(
    204,
    isSuccessfulHttpStatus
); // The callback returned: true

console.log(
    'Final callback result:',
    callbackCheckResult // Final callback result: true
);

/*
 * SECTION 11
 * Changing behaviour with a callback
 *
 * runStatusCheck controls the execution order. The callback supplies
 * the rule. For status 500, a success rule returns false while a server
 * error rule returns true; the receiving function stays the same.
*/

const statusCodeToEvaluate = 500;

const successfulRuleResult = runStatusCheck(
    statusCodeToEvaluate,
    isSuccessfulHttpStatus
);

const serverErrorRuleResult = runStatusCheck(
    statusCodeToEvaluate,
    isServerErrorHttpStatus
);

console.log(
    'Is 500 a successful status?',
    successfulRuleResult
);

console.log(
    'Is 500 a server error?',
    serverErrorRuleResult
);

/*
 * SECTION 12
 * Write and pass your own callback
 *
 * A client error has a status code from 400 through 499. The variable
 * below holds a checker for that range. Passing its name without ()
 * supplies the function; runStatusCheck calls it with the status code.
*/

const isClientErrorHttpStatus: StatusChecker =
    (statusCode) => {
        return statusCode >= 400 && statusCode < 500;
    };

const clientErrorResult = runStatusCheck(
    404,
    isClientErrorHttpStatus
);

console.log('Is 404 a client error?', clientErrorResult);

/*
 * SECTION 13
 * Inline callbacks
 *
 * Instead of passing a separately named checker, we can write a function
 * directly as the second argument. Creating that function does not run
 * its body. runStatusCheck receives it in checker and later calls it with
 * checker(statusCode). The returned boolean becomes its final result.
 *
 * TypeScript infers receivedStatusCode: number and a boolean return
 * from the StatusChecker type of the checker parameter.
*/

const inlineClientErrorResult = runStatusCheck(
    404,
    (receivedStatusCode) => {
        return receivedStatusCode >= 400 &&
            receivedStatusCode < 500;
    }
);

console.log(
    'Is 404 a client error?',
    inlineClientErrorResult
);

const inlineServerErrorResult = runStatusCheck(
    503,
    (receivedStatusCode) => {
        return receivedStatusCode >= 500 &&
            receivedStatusCode < 600;
    },
);

console.log('Is 503 a server error?', inlineServerErrorResult);

/*
 * SECTION 14
 * A callback that represents work to run
 *
 * A callback's type depends on what the receiver needs. StatusChecker
 * is (statusCode: number) => boolean: the receiver passes a number and
 * uses the result. The testBody callback is () => void: the receiver
 * gives it no arguments and does not use its returned value.
 *
 * Passing the callback does not run its body. Here runExampleTest calls
 * testBody() synchronously between the "Starting" and "Finished" logs.
 * This is a learning example, not an actual test runner: it makes no
 * assertion and does not fail when an expected result is wrong. Real
 * test frameworks control when their callbacks run.
*/

function runExampleTest(
    testName: string,
    testBody: () => void
): void {
    console.log('Starting test:', testName);

    testBody();

    console.log('Finished test:', testName);
}

runExampleTest(
    'status code is 200',
    () => {
        console.log('Checking the status code');
    }
);

/*
 * INTERVIEW ANSWERS
 *
 * Q: What is a function expression or an arrow function?
 * A: Each is a way to create a function value that can be assigned to
 *    a variable. The body runs when the function is called, not assigned.
 *
 * Q: What do the two arrows in an annotated arrow function mean?
 * A: The arrow after ':' describes the function's input and output type.
 *    The arrow after '=' creates the actual function value.
 *
 * Q: What is a callback?
 * A: A callback is a function passed to another function. The receiver
 *    can call it when needed, as runStatusCheck does with checker(statusCode).
 *
 * Q: How is (statusCode: number) => boolean different from () => void?
 * A: The first receives a number and returns a boolean. The second
 *    receives no arguments and has no useful return value for its caller.
 */
