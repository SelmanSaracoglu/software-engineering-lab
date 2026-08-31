/*
  EXPRESSIONS AND OPERATORS

  In the previous lesson, we learned that programs work with values. But programs do not only store values.

  They also:
  - calculate new values
  - compare values
  - transform values

  To understand this, we need two concepts:
  - expression
  - operator
*/


// --------------------------------------------------
// 1. WHAT IS AN EXPRESSION?
// --------------------------------------------------

// An expression is code that produces a value.
const total = 20 + 10;
console.log(total); // 30

// --------------------------------------------------
// 2. VALUES CAN ALSO BE EXPRESSIONS
// --------------------------------------------------

const price = 50;

/*
  The value: 50 is itself a simple expression.
  It produces the value 50.
*/

console.log(price);

// --------------------------------------------------
// 3. VARIABLES CAN BE USED INSIDE EXPRESSIONS
// --------------------------------------------------
const unitPrice = 25;
const quantity = 4;

const orderTotal = unitPrice * quantity;
console.log(orderTotal); // 100

/*
  unitPrice * quantity means:

  take the current value of unitPrice
  and 
  take the current value of quantity
  and 
  multiply them.
*/

// --------------------------------------------------
// 4. OPERATORS
// --------------------------------------------------

/*
  Operators perform operations on values.

  Basic arithmetic operators:
  +   addition
  -   subtraction
  *   multiplication
  /   division
*/

console.log(10 + 5); // 15
console.log(10 - 5); // 5
console.log(10 * 5); // 50
console.log(10 / 5); // 2

// --------------------------------------------------
// 5. MORE THAN ONE OPERATION
// --------------------------------------------------

const subtotal = 50 * 2;
const shipping = 5;
const finalTotal = subtotal + shipping;

console.log(finalTotal); // 105

// --------------------------------------------------
// 6. OPERATOR PRECEDENCE
// --------------------------------------------------

const result = 10 + 5 * 2;
console.log(result); // 20

// --------------------------------------------------
// 7. PARENTHESES
// --------------------------------------------------

const groupedResult = (10 + 5) * 2;
console.log(groupedResult); // 30

// --------------------------------------------------
// 8. STRING + STRING
// --------------------------------------------------

const firstName = "Selman";
const lastName = "Saracoglu";

const fullName = firstName + " " + lastName;
console.log(fullName);

/*
  + does not only work with numbers.
  With strings, + joins text together.
  This is called concatenation.
*/

/*---------------------------------------------------
   9. COMPARISON EXPRESSIONS
  ---------------------------------------------------
  Expressions can also compare values. 
  Comparison expressions produce a boolean: true or false
*/

const isGreater = 10 > 5;
console.log(isGreater); // true

const isSmaller = 10 < 5;
console.log(isSmaller); // false

// --------------------------------------------------
// 10. GREATER THAN AND LESS THAN
// --------------------------------------------------

/*
  >   greater than
  <   less than
  >=  greater than or equal to
  <=  less than or equal to
*/

console.log(20 > 10); // true
console.log(20 < 10); // false
console.log(20 >= 20); // true
console.log(20 <= 20); // true

// --------------------------------------------------
// 11. STRICT EQUALITY
// --------------------------------------------------

const currentStatus = "NEW";
const isNewOrder = currentStatus === "NEW";

console.log(isNewOrder); // true

/*
  === asks:

  "Are these two values equal?"
  It produces a boolean result.
*/

console.log(10 === 10); // true
console.log("NEW" === "NEW"); // true
// console.log("NEW" === "COMPLETED"); // false


// --------------------------------------------------
// 12. ASSIGNMENT AND EQUALITY ARE DIFFERENT
// --------------------------------------------------

const orderStatus = "NEW";

/*
  Here: = means assignment.
  orderStatus === "NEW" uses: === which means comparison.
*/

console.log(orderStatus === "NEW"); // true

/*
  This distinction is extremely important: 
  =         assign a value
  ===       compare two values
*/

// --------------------------------------------------
// 13. NOT EQUAL
// --------------------------------------------------

const paymentStatus = "PENDING";
const isCompleted = paymentStatus !== "COMPLETED";
console.log(isCompleted); // true

//  !== means: "not equal"
console.log(10 !== 5); // true
console.log(10 !== 10); // false

// --------------------------------------------------
// 14. COMPARISONS PRODUCE VALUES
// --------------------------------------------------

const stock = 5;
const hasStock = stock > 0;

console.log(hasStock); // true

// --------------------------------------------------
// 15. READ FROM RIGHT TO LEFT
// --------------------------------------------------

const customerAge = 25;
const isAdult = customerAge >= 18;

console.log(isAdult); // true

// --------------------------------------------------
// 16. AN EXAMPLE CLOSE TO REAL APPLICATION CODE
// --------------------------------------------------

const itemPrice = 40;
const itemQuantity = 3;

const calculatedTotal = 
  itemPrice * itemQuantity;

const maximumAllowedTotal = 200;

const isWithinLimit =
  calculatedTotal <= maximumAllowedTotal;

console.log(calculatedTotal); // 120
console.log(isWithinLimit); // true

// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  EXPRESSION: Code that produces a value.

  10 + 5
  price * quantity
  age >= 18
  status === "NEW"

  OPERATOR: A symbol that performs an operation.

  Arithmetic:
  +
  -
  *
  /

  Comparison: Comparison expressions produce boolean values: true --- false
  >
  <
  >=
  <=
  ===
  !==

  IMPORTANT

  =         -->     assignment
  ===       -->     equality comparison

*/