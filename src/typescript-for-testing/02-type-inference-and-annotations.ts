/*
 * Lesson 02
 * Type inference and explicit type annotations
 *
 * TypeScript can infer a variable's type from the value assigned to it:
 * endpoint is a string and actualStatus is a number. We can also write
 * an explicit type after ':', as in expectedStatus: number. Both forms
 * let the compiler check later assignments before the code runs.
 *
 * An annotation is a check, not a runtime conversion. typeof below is
 * JavaScript's runtime operator; it inspects the current value after
 * TypeScript's annotations have been removed.
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

// Uncomment these lines one at a time and run tsc. The compiler rejects
// both assignments because their strings do not match number/boolean.

// actualStatus = '201';
// const invalidResult: boolean = 'true';

/*
 * Printing a FAIL label is practice output. This file has no assertion
 * yet, so printing alone does not make an automated test fail.
 *
 * INTERVIEW ANSWERS
 *
 * Q: What is type inference?
 * A: TypeScript deduces a type from context, such as number from 500.
 *
 * Q: What is an explicit type annotation?
 * A: A type written after ':', such as expectedStatus: number, which
 *    asks the compiler to check assignments against that type.
 *
 * Q: Do TypeScript annotations validate runtime data by themselves?
 * A: No. They are removed before execution. Runtime data must be
 *    checked separately when its shape or type is uncertain.
 */
