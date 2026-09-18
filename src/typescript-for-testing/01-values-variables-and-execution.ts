/*
 * Lesson 01
 * Values, variables, types, and execution order
 */

const testName = 'login returns the expected status';
const expectedStatus = 200;

let actualStatus = 500;
let passed = actualStatus === expectedStatus;

console.log('Test:', testName);
console.log('Expected status:', expectedStatus);
console.log('Actual status:', actualStatus);
console.log('Passed:', passed);

actualStatus = 200;

console.log('Actual status changed:', actualStatus);
console.log('Passed before recalculation:', passed);

passed = actualStatus === expectedStatus;

console.log('Passed after recalculation:', passed);

// Remove the comment markers later and run the compiler again.
// actualStatus = '200';

const expectedUserRole = 'ADMIN';
let actualUserRole = 'ORDER_OPERATOR';
let rightRole = actualUserRole === expectedUserRole;

console.log('Role is right:', rightRole);

actualUserRole = 'ADMIN';

console.log('Role is right:', rightRole);

rightRole = actualUserRole === expectedUserRole;

console.log('Role is right:', rightRole);




