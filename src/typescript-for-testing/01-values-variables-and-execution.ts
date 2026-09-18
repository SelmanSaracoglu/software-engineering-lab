/*
 * Lesson 01
 * Values, variables, types, and execution order
 *
 * A value is data such as 200, 'ADMIN', or true. A variable gives a value
 * a name. const keeps that binding from being reassigned; let permits
 * reassignment. Code runs in order, and an expression is evaluated when
 * execution reaches it. Its result is then stored as a value.
 *
 * In this example "passed" is a stored boolean, not a live link to
 * actualStatus. Changing actualStatus will not recalculate passed until
 * we explicitly assign the comparison result again.
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

// Re-evaluate the expression using the current values.
passed = actualStatus === expectedStatus;

console.log('Passed after recalculation:', passed);

// Uncomment and run tsc to see the type error: '200' is a string,
// while actualStatus was inferred as a number from its first assignment.
// actualStatus = '200';

/*
 * The same execution-order rule applies to a user's role. The second
 * log still prints false because rightRole has not been recalculated.
 */
const expectedUserRole = 'ADMIN';
let actualUserRole = 'ORDER_OPERATOR';
let rightRole = actualUserRole === expectedUserRole;

console.log('Role is right:', rightRole);

actualUserRole = 'ADMIN';

console.log('Role is right:', rightRole);

rightRole = actualUserRole === expectedUserRole;

console.log('Role is right:', rightRole);

/*
 * INTERVIEW ANSWERS
 *
 * Q: How do const and let differ?
 * A: const prevents reassignment of its binding; let allows reassignment.
 *
 * Q: Does changing an input variable automatically update a calculated
 *    boolean stored in another variable?
 * A: No. The expression was evaluated during the original assignment.
 *    Assign a new result to recalculate it using the current inputs.
 */
