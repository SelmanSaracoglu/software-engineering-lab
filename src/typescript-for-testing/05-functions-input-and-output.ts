/*
 * Lesson 05
 * Functions, parameters, arguments, and return values
 *
 * A function groups instructions so we can call the same rule with
 * different inputs. In the declaration, actualStatus and expectedStatus
 * are parameters. In isStatusExpected(200, 200), the two 200 values
 * are arguments matched to those parameters by position.
 *
 * The : boolean annotation describes the returned result. Calling the
 * function executes its body and assigns that result to a variable.
 * Detailed execution order, scope, function values and callbacks are
 * developed in the functions/ chapter; this file is the first example.
 */

function isStatusExpected(
    actualStatus: number,
    expectedStatus: number,
): boolean {
    return actualStatus === expectedStatus;
}

const loginTestPassed = isStatusExpected(200, 200);
const createOrderTestPassed = isStatusExpected(500, 201);

console.log('Login test passed:', loginTestPassed);
console.log(
  'Create order test passed:',
  createOrderTestPassed,
);
/*
 * The second rule accepts a response time at or below its maximum.
 * Testing a value below, equal to, and above the limit shows that
 * the boundary belongs to the accepted range.
 */
function isResponseTimeAcceptable(
    actualResponseTime: number,
    maximumResponseTime: number,
): boolean {
    return actualResponseTime <= maximumResponseTime;
}

const slowerResponseIsAcceptable =
  isResponseTimeAcceptable(1250, 1000);

const equalResponseIsAcceptable =
  isResponseTimeAcceptable(1000, 1000);

const fasterResponseIsAcceptable =
  isResponseTimeAcceptable(750, 1000);

console.log(
  'Slower response is acceptable:',
  slowerResponseIsAcceptable,
);

console.log(
  'Equal response is acceptable:',
  equalResponseIsAcceptable,
);

console.log(
  'Faster response is acceptable:',
  fasterResponseIsAcceptable,
);

/*
 * These boolean outputs illustrate the function rule. Printing "test
 * passed" does not itself assert anything or fail an automated test.
 *
 * INTERVIEW ANSWERS
 *
 * Q: What are parameters, arguments, and a return value?
 * A: Parameters name the inputs in a definition; arguments are the
 *    values supplied at a call; return sends the result to the caller.
 *
 * Q: Why call the same function with different response times?
 * A: To reuse one rule and check its behaviour below, at, and above
 *    the maximum allowed value.
 */
