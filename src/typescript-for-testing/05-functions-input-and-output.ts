/*
 * Lesson 05
 * Functions, parameters, arguments, and return values
 */

function isStatusExpected(
    actualStatus: number,
    expectedStatus: number,
):boolean {
    return actualStatus === expectedStatus;
}

const loginTestPassed = isStatusExpected(200, 200);
const createOrderTestPassed = isStatusExpected(500, 201);

console.log('Login test passed:', loginTestPassed);
console.log(
  'Create order test passed:',
  createOrderTestPassed,
);


function isResponseTimeAcceptable(
    actualResponseTime:number,
    maximumResponseTime:number,
): boolean {
    return actualResponseTime <= maximumResponseTime
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