// NUMBER CONVERSION AND VALIDATION
//
// Route parameters come from the URL as strings.
// Example: "101" --> But an order ID should be a number.

const orderIdParam = "101";
const orderId = Number(orderIdParam);
console.log(orderId); // 101

// Number(...) tries to convert a value into a number.
console.log(Number("25")); // 25
console.log(Number("101")); // 101

// If the value cannot be converted into a valid number, the result is NaN.
// NaN means: Not a Number
const invalidOrderId = Number("not-a-number");
console.log(invalidOrderId); // NaN

// Number.isInteger(...) checks whether a value is a whole number.
console.log(Number.isInteger(101)); // true
console.log(Number.isInteger(10.5)); // false
console.log(Number.isInteger(NaN)); // false

// An order ID must also be greater than zero.
console.log(101 > 0); // true
console.log(0 > 0); // false
console.log(-5 > 0); // false

// && means AND.
// Both conditions must be true for the complete expression to be true.
const hasValidOrderId =
  Number.isInteger(orderId) && orderId > 0;

console.log(hasValidOrderId); // true

const invalidParam = "not-a-number";

const convertedInvalidId = 
  Number(invalidParam);

const hasValidInvalidId =
  Number.isInteger(convertedInvalidId) &&
  convertedInvalidId > 0;

console.log(hasValidInvalidId); // false