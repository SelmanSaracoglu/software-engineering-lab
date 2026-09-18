/*
 * FUNCTION FOUNDATIONS
 *
 * A function is a reusable set of instructions. It can receive input,
 * perform work, and optionally return a value. A declaration gives it a name;
 * later lessons also show functions stored in variables.
 *
 * Functions help us:
 * - group related instructions
 * - avoid writing the same instructions repeatedly
 * - send different values into the same operation
 * - give meaningful names to program behaviour
 *
 * A function may be called once or many times.
 * Declaring a function does not execute its body.
 * The body runs only when the function is called with parentheses.
 * Read each example in execution order: first the top-level program reaches
 * a call, then it runs the function body, then it resumes after the call.
 */

/*
 * SECTION 1
 * Function declaration and function call
 *
 * A function declaration has:
 * - the function keyword
 * - a function name
 * - parentheses
 * - a function body between curly braces
 *
 * The : void annotation describes the output: the caller should not expect
 * a useful returned value. console.log prints to the terminal, but printing
 * is not the same as returning a value.
 */

function announceLoginCheck(): void {
    console.log('Checking login conditions');
    console.log('Login check finished');
}

console.log('Function declared but not called yet');

/*
 * Parentheses after the function name call the function.
 *
 * Program execution enters the function body, executes its instructions and
 * then continues at the line following the call. Each call starts the body
 * again; the declaration itself prints nothing.
 */

console.log('Before first function call');

announceLoginCheck();

console.log('After first function call');

console.log('Before second function call');

announceLoginCheck();

console.log('After second function call');

/*
 * SECTION 2
 * Parameters and arguments
 *
 * A parameter is a variable written in the
 * function declaration.
 *
 * An argument is the actual value supplied
 * when the function is called.
 *
 * In the declaration below, statusCode is a parameter.
 * In printReceivedStatus(200), 200 is an argument.
 * The : number annotation checks that callers supply a number. It is a
 * TypeScript check and does not convert a string into a number at runtime.
 */

function printReceivedStatus(
    statusCode: number,
): void {
    console.log('Received status:', statusCode);
}

printReceivedStatus(200);
printReceivedStatus(404);
printReceivedStatus(500);

/*
 * The parameter belongs to the current function call.
 *
 * First call:
 * statusCode receives 200
 *
 * Second call:
 * statusCode receives 404
 *
 * Third call:
 * statusCode receives 500
 *
 * The same function body works with different arguments.
 */

/*
 * SECTION 3
 * Multiple parameters
 *
 * A function can receive more than one parameter.
 * Arguments are matched to parameters by position, starting on the left.
 * For an API response, we might want one function to display the endpoint,
 * its HTTP status, and its response time together.
 */

function printResponseDetails(
    endpoint: string,
    statusCode: number,
    responseTime: number,
): void {
    console.log('Endpoint:', endpoint);
    console.log('Status code:', statusCode);
    console.log('Response time:', responseTime);
}

printResponseDetails(
    '/api/orders',
    201,
    350,
);

/*
 * Argument mapping:
 *
 * '/api/orders' -> endpoint
 * 201           -> statusCode
 * 350           -> responseTime
 *
 * TypeScript checks whether argument types match
 * the corresponding parameter types.
 *
 * However, statusCode and responseTime are both numbers.
 * If their positions are accidentally exchanged,
 * TypeScript cannot understand their business meaning.
 *
 * Good naming and careful argument ordering are
 * therefore still important.
 */

/*
 * SECTION 4
 * Function call and function reference
 *
 * Using parentheses calls the function immediately. The expression
 * printReceivedStatus(201) produces the call's result after its body runs.
 * Because this function returns void, that result is not useful to the caller.
 */

console.log('Calling the function now');

printReceivedStatus(201);

/*
 * Using the function name without parentheses
 * does not call the function.
 *
 * The function itself can be stored in a variable and called later.
 * Assignment here only copies the function reference; it does not print.
 */

const savedStatusPrinter = printReceivedStatus;

console.log(
    'Function reference saved but not called yet',
);

/*
 * savedStatusPrinter now refers to the same function.
 * Adding parentheses calls the saved function.
 */

savedStatusPrinter(503);

/*
 * Important distinction:
 *
 * printReceivedStatus
 *     The function itself.
 *
 * printReceivedStatus(200)
 *     A function call. The body executes immediately.
 *
 * savedStatusPrinter
 *     Another variable referring to the same function.
 *
 * savedStatusPrinter(503)
 *     Calls the function through the saved reference.
 *
 * const result = printReceivedStatus(503) would CALL the function now
 * and store its returned value, not the function itself. We will examine
 * returned values in the next file.
 *
 * This distinction will become especially important
 * when we study callbacks and Cypress commands.
 */

/*
 * TESTING CONNECTION
 *
 * Test projects use functions to:
 * - prepare reusable test data
 * - perform repeated actions
 * - calculate expected results
 * - verify application behaviour
 *
 * Later, Cypress and Vitest will also receive functions as values.
 * Before studying that structure, we must clearly distinguish a function from a call.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What is the difference between declaring and calling a function?
 * A: A declaration defines the function. A call with parentheses executes
 *    its body using the arguments supplied for that call.
 *
 * Q: What is the difference between a parameter and an argument?
 * A: A parameter is the named input in the definition. An argument is the
 *    actual value passed into that parameter when the function is called.
 *
 * Q: What is the difference between fn and fn()?
 * A: fn refers to a function value; fn() executes it and produces its result.
 */
