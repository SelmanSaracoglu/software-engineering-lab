/*
 * Lesson 04
 * Boolean logic with AND, OR, and NOT
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
    console.log('Result: FAIL')
}

const actualUnauthorizedStatus: number = 403;

const requestWasRejected =
  actualUnauthorizedStatus === 401 || // OR Operator
  actualUnauthorizedStatus === 403;

console.log('Unauthorized request was rejected:', requestWasRejected);

const testNeedsInvestigation = !testPassed; // NOT Operator

console.log('Test needs investigation:', testNeedsInvestigation);


console.log('### EXERCISE ###');

const isAccountActive = true;
const isPasswordCorrect = false;
const isRecoveryCodeCorrect = true;
const isAccountBlocked= false;

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