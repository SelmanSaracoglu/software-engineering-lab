/*
 * Lesson 04
 * Boolean logic with AND, OR, and NOT
 *
 * && (AND) is true only if both conditions are true. || (OR) is true
 * if at least one condition is true. ! (NOT) reverses a boolean.
 *
 * Combining small named conditions makes the decision readable:
 * a status can be correct while the overall response check still fails
 * because its response time exceeds the allowed maximum.
 */

const expectedStatus: number = 200;
const actualStatus: number = 200;

const maximumResponseTime: number = 1000;
const actualResponseTime: number = 1250;

const statusIsCorrect =
  actualStatus === expectedStatus;

const responseTimeIsAcceptable =
  actualResponseTime <= maximumResponseTime;

const testPassed =
  statusIsCorrect && responseTimeIsAcceptable;

console.log('Status is correct:', statusIsCorrect);
console.log(
  'Response time is acceptable:',
  responseTimeIsAcceptable,
);
console.log('Test passed:', testPassed);

if (testPassed) {
    console.log('Result: PASS');
} else {
    console.log('Result: FAIL');
}

/*
 * HTTP 401 means unauthenticated; 403 means authenticated but forbidden
 * (or otherwise denied access). The rule below accepts either rejection
 * status for this simplified access-control example.
 */
const actualAccessStatus: number = 403;

const accessWasRejected =
  actualAccessStatus === 401 ||
  actualAccessStatus === 403;

console.log('Access request was rejected:', accessWasRejected);

const testNeedsInvestigation = !testPassed;

console.log('Test needs investigation:', testNeedsInvestigation);


console.log('### EXERCISE ###');

const isAccountActive = true;
const isPasswordCorrect = false;
const isRecoveryCodeCorrect = true;
const isAccountBlocked = false;

// Either accepted credential can satisfy this part of the login rule.
const hasValidCredential =
  isPasswordCorrect || isRecoveryCodeCorrect;

const isLoginAllowed =
  isAccountActive &&
  hasValidCredential &&
  !isAccountBlocked;

if (isLoginAllowed) {
    console.log('Login: ALLOWED');
} else {
    console.log('Login: DENIED');
}

console.log('Login:', isLoginAllowed);

/*
 * Parentheses or intermediate names show which parts belong together.
 * !isAccountBlocked must be true, so a blocked account cannot log in
 * even when a password or recovery code is valid. The last example
 * prints ALLOWED because recovery is correct and the account is active.
 * Printing a label does not create a test assertion.
 *
 * INTERVIEW ANSWERS
 *
 * Q: How do &&, ||, and ! differ?
 * A: && requires both booleans; || requires at least one; ! negates one.
 *
 * Q: How can a correct status still fail an overall check?
 * A: With AND, every requirement must pass. A slow response makes the
 *    result false even when the status matches.
 */
