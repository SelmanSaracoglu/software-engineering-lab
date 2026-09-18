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
 * The primary difference in this lesson is syntax.
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
 * We are not studying callbacks yet.
 * First, we need to understand that the arrow syntax creates a function value.
 *
 * The function does not execute merely because it has been created or assigned to a variable.
 * It must still be called by some code.
 */

/*
 * FINAL SUMMARY
 *
 * function declaration:
 * A named function declared with the function keyword.
 *
 * function expression:
 * A function value assigned to a variable.
 *
 * arrow function:
 * A shorter syntax for creating a function value.
 *
 * In all three cases:
 * - the function name without () refers to the function
 * - the function name with () calls the function
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
SECTION 7: THE TYPE OF A FUNCTION VALUE

A variable can have a function as its value.
Therefore, the variable can also have a function type.

The function type below says:

- the function receives one number
- the function returns one boolean

The first arrow belongs to the type description.
The second arrow creates the actual function value.
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
SECTION 8: A FUNCTION MUST MATCH ITS FUNCTION TYPE

The variable below is allowed to store a function that:

- receives one number
- returns one boolean

However, the assigned function returns a string. TypeScript should reject this assignment.
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

/*
SECTION 9: NAMING A FUNCTION TYPE

A function type can be given a reusable name.

StatusChecker is not a function and cannot be called.
It is only a TypeScript type name.

Every function assigned as a StatusChecker must:

- receive one number
- return one boolean
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
SECTION 10: PASSING A FUNCTION AS AN ARGUMENT

A callback is a function passed to another function.

The callback is not called while it is being passed. The receiving function decides when to call it.

This example is synchronous: the callback finishes before runStatusCheck continues.
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
SECTION 11: CHANGING BEHAVIOR WITH A CALLBACK

runStatusCheck contains the execution process.

The callback contains the rule that will be executed.

The same status code can produce different results when it is evaluated by different callback functions.
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
SECTION 12: WRITE AND PASS YOUR OWN CALLBACK

A client error has a status code from 400 through 499.

Create a StatusChecker for this rule.
Pass the function itself to runStatusCheck.
runStatusCheck will call it through checker(statusCode).
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
SECTION 13: INLINE CALLBACKS

A callback can be defined separately and passed by name:

    runStatusCheck(404, isClientErrorHttpStatus);

It can also be written directly at the place where it is passed.
This is called an inline callback.

The arrow function below is created while the arguments for
runStatusCheck are prepared. Its body does not run at that point.

runStatusCheck receives that function in its checker parameter.
Inside runStatusCheck, checker(statusCode) calls the function.
The returned boolean becomes the result of runStatusCheck.

TypeScript knows that the inline callback receives a number
and must return a boolean. It gets this information from the
StatusChecker type of the checker parameter.
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

const sample = runStatusCheck(
    503,
    (receivedStatusCode) => {
        return receivedStatusCode >=500 && receivedStatusCode < 600
    }
);

/*
SECTION 14: A CALLBACK THAT REPRESENTS WORK TO RUN

A callback's function type depends on what the receiving function needs.

StatusChecker is (statusCode: number) => boolean:
runStatusCheck gives it a status code and uses its result.

The testBody callback below is () => void:
runExampleTest gives it no arguments and does not use a returned value. It asks the callback to perform work.

Defining or passing the callback does not run its body. The receiving function runs it at testBody().
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