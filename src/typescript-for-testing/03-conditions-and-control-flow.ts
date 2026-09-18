/*
 * Lesson 03
 * Conditions and control flow
 */

const testName = 'login returns the expected status';
const expectedStatus:number = 200;
const actualStatus:number = 500;

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


// ################# //

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
