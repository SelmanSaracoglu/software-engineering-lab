/*
 * Lesson 02
 * Type inference and explicit type annotations
 */

const testName: string = 'order creation returns the expected status';
const endpoint = '/api/orders';

const expectedStatus: number = 201;
let actualStatus = 500;

let passed: boolean = actualStatus === expectedStatus;

console.log('Test:', testName);
console.log('Endpoint:', endpoint);
console.log('Expected status:', expectedStatus);
console.log('Actual status:', actualStatus);
console.log('Passed:', passed);

actualStatus = 201;
passed = actualStatus === expectedStatus;

console.log('Updated actual status:', actualStatus);
console.log('Updated result:', passed);

console.log('Runtime type of testName:', typeof testName);
console.log('Runtime type of expectedStatus:', typeof expectedStatus);
console.log('Runtime type of passed:', typeof passed);

// Uncomment these lines one at a time during the exercise.

// actualStatus = '201';
// const invalidResult: boolean = 'true';