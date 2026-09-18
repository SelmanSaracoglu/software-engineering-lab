/*
 * Lesson 03
 * Conditions and control flow
 *
 * A comparison such as actualStatus === expectedStatus evaluates to a
 * boolean. An if statement chooses one path when the condition is true;
 * else runs when it is false. Execution then continues after the block.
 *
 * We try two rules below: an exact status match and a response time limit.
 * For a limit, <= means a response at the maximum still passes.
 */

const testName = 'login returns the expected status';
const expectedStatus: number = 200;
const actualStatus: number = 500;

const passed = actualStatus === expectedStatus;

console.log('Test:', testName);
console.log('Expected:', expectedStatus);
console.log('Actual:', actualStatus);

if (passed) {
  console.log('Result: PASS');
} else {
  console.log('Result: FAIL');
}

console.log('Test evaluation finished.');
/*
 * The first comparison was false, so the else branch ran. This second
 * example checks a different condition without changing the if/else form.
 */

console.log('===> Second test begins here <===');

const testName2 = 'Response time check';
const expectedResponseTime: number = 1000;
const actualResponseTime: number = 1250;

const isResponseTimeAcceptable =
  actualResponseTime <= expectedResponseTime;

console.log('Test:', testName2);

if (isResponseTimeAcceptable) {
  console.log('Response time: PASS');
} else {
  console.log('Response time: FAIL');
}

console.log('Test evaluation finished.');

/*
 * These labels show which branch ran. They are not assertions, so this
 * program does not fail automatically when it prints FAIL.
 *
 * INTERVIEW ANSWERS
 *
 * Q: How does if/else choose a path?
 * A: It evaluates a condition and runs the if branch for true or the
 *    else branch for false, then continues after the conditional.
 *
 * Q: How would you check an inclusive response time limit?
 * A: Compare actualResponseTime <= maximumResponseTime, which accepts
 *    a value equal to the limit as well as smaller values.
 */
