/*
 * OBJECT FOUNDATIONS
 *
 * An object groups related values under property names.
 *
 * A test often works with values that belong together:
 * - the requested endpoint
 * - the received status code
 * - the measured response time
 *
 * Keeping these values in one object lets us represent one response
 * instead of maintaining several unrelated variables.
 *
 * This lesson covers:
 * - object literals
 * - properties and property values
 * - dot notation
 * - bracket notation
 * - using properties in expressions
 * - updating object properties
 * - const with objects
 * - object references
 */

/*
 * SECTION 1
 * Creating an object
 *
 * Curly braces create an object literal.
 *
 * Each entry contains:
 *
 * propertyName: propertyValue
 *
 * In the response object:
 * - endpoint is a property name and '/api/orders' is its value
 * - statusCode is a property name and 201 is its value
 * - responseTimeMs is a property name and 350 is its value
 *
 * A comma separates one property from the next.
 */

const response = {
    endpoint: '/api/orders',
    statusCode: 201,
    responseTimeMs: 350,
};

console.log('Complete response:', response);

/*
 * SECTION 2
 * Reading properties with dot notation
 *
 * Dot notation reads a known property from an object:
 *
 * objectName.propertyName
 *
 * response.statusCode does not mean the complete response.
 * It evaluates only to the value stored in statusCode: 201.
 */

console.log('Endpoint:', response.endpoint);
console.log('Status code:', response.statusCode);
console.log(
    'Response time:',
    response.responseTimeMs,
);

/*
 * TypeScript infers the property types from their values:
 *
 * response.endpoint       -> string
 * response.statusCode     -> number
 * response.responseTimeMs -> number
 *
 * TypeScript also checks property names.
 * Uncommenting the following line would produce an error because
 * response has no property named responseTime.
 */

// console.log(response.responseTime);

/*
 * SECTION 3
 * Using property values in expressions
 *
 * Reading a property produces a normal value.
 * That value can be stored, printed, compared, or passed to a function.
 *
 * The comparisons below run when execution reaches their assignment.
 * Their boolean results are then stored in variables.
 */

const expectedStatusCode = 200;
const expectedEndpoint = '/api/orders';
const maximumResponseTimeMs = 1000;

const statusIsExpected =
    response.statusCode === expectedStatusCode;

const endpointIsExpected =
    response.endpoint === expectedEndpoint;

const responseTimeIsAcceptable =
    response.responseTimeMs <= maximumResponseTimeMs;

console.log(
    'Status is expected:',
    statusIsExpected,
);

console.log(
    'Endpoint is expected:',
    endpointIsExpected,
);

console.log(
    'Response time is acceptable:',
    responseTimeIsAcceptable,
);

/*
 * Expected results:
 *
 * statusIsExpected         -> false, because 201 is not 200
 * endpointIsExpected       -> true, because both strings are equal
 * responseTimeIsAcceptable -> true, because 350 is at most 1000
 *
 * The object does not perform these checks itself.
 * It only stores the values. Our expressions define the rules.
 */

/*
 * SECTION 4
 * Updating a property
 *
 * We can assign a new value to an existing property.
 * TypeScript checks that the new value matches the inferred property type.
 */

const mutableResponse = {
    statusCode: 500,
    responseTimeMs: 1250,
};

console.log(
    'Status before update:',
    mutableResponse.statusCode,
);

mutableResponse.statusCode = 200;
mutableResponse.responseTimeMs = 750;

console.log(
    'Status after update:',
    mutableResponse.statusCode,
);

console.log(
    'Response time after update:',
    mutableResponse.responseTimeMs,
);

/*
 * The following assignments would be rejected by TypeScript:
 *
 * mutableResponse.statusCode = '200';
 * mutableResponse.responseTimeMs = '750';
 *
 * Both properties were inferred as numbers.
 * TypeScript checks the type; it does not convert the strings.
 */

/*
 * SECTION 5
 * What const means for an object
 *
 * const prevents the variable from being reassigned to another object.
 * It does not automatically make every property read-only.
 *
 * This is allowed:
 *
 * mutableResponse.statusCode = 201;
 *
 * We keep the same object and update one of its properties.
 */

mutableResponse.statusCode = 201;

console.log(
    'Status after second update:',
    mutableResponse.statusCode,
);

/*
 * This would not be allowed:
 *
 * mutableResponse = {
 *     statusCode: 404,
 *     responseTimeMs: 500,
 * };
 *
 * It attempts to assign a different object to a const variable.
 *
 * Mental model:
 *
 * const objectVariable
 *     -> the variable must keep referring to the same object
 *
 * objectVariable.property
 *     -> the property may still be updated unless its type is read-only
 */

/*
 * SECTION 6
 * Reading properties with bracket notation
 *
 * A property can also be read by placing its name as a string
 * between square brackets.
 */

const statusFromDotNotation =
    response.statusCode;

const statusFromBracketNotation =
    response['statusCode'];

console.log(
    'Status from dot notation:',
    statusFromDotNotation,
);

console.log(
    'Status from bracket notation:',
    statusFromBracketNotation,
);

/*
 * Both expressions return 201.
 *
 * Dot notation is usually clearer when the property name is known:
 *
 * response.statusCode
 *
 * Bracket notation is useful when a property name is represented
 * as a string:
 *
 * response['statusCode']
 *
 * Dynamic property names require additional TypeScript concepts.
 * They will be studied later instead of being hidden in this lesson.
 */

/*
 * SECTION 7
 * Object variables store references
 *
 * Assigning an object variable to another variable does not create
 * an independent copy. Both variables refer to the same object.
 */

const originalResponse = {
    statusCode: 500,
};

const savedResponse = originalResponse;

savedResponse.statusCode = 200;

console.log(
    'Status through savedResponse:',
    savedResponse.statusCode,
);

console.log(
    'Status through originalResponse:',
    originalResponse.statusCode,
);

/*
 * Both logs print 200.
 *
 * savedResponse and originalResponse are two variable names that
 * refer to the same object. Updating the object through one reference
 * is visible through the other reference.
 *
 * This matters in testing because changing shared test data can affect
 * another part of a test that uses the same object.
 *
 * We will study independent object copies and immutability later.
 */

/*
 * PRACTICE
 *
 * Read the object below before running the file.
 * Predict the three boolean results, then run the program.
 */

const loginResponse = {
    endpoint: '/api/auth/login',
    statusCode: 401,
    responseTimeMs: 980,
};

const loginEndpointIsExpected =
    loginResponse.endpoint === '/api/auth/login';

const loginWasSuccessful =
    loginResponse.statusCode === 200;

const loginResponseTimeIsAcceptable =
    loginResponse.responseTimeMs <= 1000;

console.log(
    'Login endpoint is expected:',
    loginEndpointIsExpected,
);

console.log(
    'Login was successful:',
    loginWasSuccessful,
);

console.log(
    'Login response time is acceptable:',
    loginResponseTimeIsAcceptable,
);

/*
 * FINAL SUMMARY
 *
 * Object:
 * Groups related values under property names.
 *
 * Property:
 * One named value inside an object.
 *
 * Dot notation:
 * Reads a known property, such as response.statusCode.
 *
 * Bracket notation:
 * Reads a property using a string, such as response['statusCode'].
 *
 * const object:
 * Cannot be reassigned to a different object, but its properties
 * are not automatically read-only.
 *
 * Object reference:
 * Two variables can refer to the same object. A property update
 * through one reference is visible through the other.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What is an object in JavaScript or TypeScript?
 * A: An object groups related values as named properties.
 *
 * Q: What is the difference between dot and bracket notation?
 * A: Dot notation reads a known property directly. Bracket notation
 *    reads a property using a string or another property-key expression.
 *
 * Q: Can properties of a const object change?
 * A: Yes. const prevents reassignment of the variable; it does not
 *    automatically make the object's properties read-only.
 *
 * Q: What happens when one object variable is assigned to another?
 * A: Both variables normally refer to the same object. Updating that
 *    object through one reference is visible through the other.
 */