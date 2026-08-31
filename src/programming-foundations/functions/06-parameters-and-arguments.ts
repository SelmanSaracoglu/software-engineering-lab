/*
  PARAMETERS AND ARGUMENTS

  In the previous lesson, we created functions like:

  function getPrice() {
    return 50;
  }

  This function always returns the same value. But real functions usually need to work with different values.

  For example:
  - calculate different prices
  - validate different usernames
  - process different order IDs
  - compare different statuses

  To give data to a function, we use:
  - parameters
  - arguments
*/


// --------------------------------------------------
// 1. THE LIMITATION OF A FIXED FUNCTION
// --------------------------------------------------

function calculateFixedTotal() {
  return 20 * 3;
}

console.log(calculateFixedTotal()); // 60

/*
  This works. But the function can calculate only: 20 * 3

  What if we want: 50 * 2
  or: 15 * 4 ?

  We need a way to give values to the function.
*/

// --------------------------------------------------
// 2. OUR FIRST PARAMETER
// --------------------------------------------------

function doubleNumber(number: number) {
  return number * 2;
}


/*
  Look carefully at: number: number

  The first: number is the PARAMETER NAME.
  The second: number is the TYPE.

  We can read this as: "This function expects a value called number, and that value must be a number."
*/


// --------------------------------------------------
// 3. CALLING A FUNCTION WITH AN ARGUMENT
// --------------------------------------------------

const doubled = doubleNumber(10);
console.log(doubled); // 20

/*
  doubleNumber(10) --> 10 is an ARGUMENT.
  PARAMETER --> The variable declared by the function.
  ARGUMENT  --> The actual value supplied when calling the function.
*/

// --------------------------------------------------
// 4. PARAMETER VS ARGUMENT
// --------------------------------------------------

function square(value: number) {
  return value * value;
}

square(5);


/*
  Think of the parameter as an empty named place.
  When the function is called, the argument provides the value for that place.
*/

// --------------------------------------------------
// 5. FOLLOW THE VALUE
// --------------------------------------------------

function addTen(number: number) {
  return number + 10;
}

const result = addTen(5);
console.log(result); // 15

// --------------------------------------------------
// 6. THE SAME FUNCTION, DIFFERENT ARGUMENTS
// --------------------------------------------------

function calculateTax(price: number) {
  return price * 1.2;
}

console.log(calculateTax(100)); // 120
console.log(calculateTax(50)); // 60
console.log(calculateTax(200)); // 240

/*
  The function behavior stays the same.
  But the input changes.
  This is what makes the function reusable.
*/

// --------------------------------------------------
// 7. MORE THAN ONE PARAMETER
// --------------------------------------------------

function calculateTotal(
  price: number,
  quantity: number
) {
  return price * quantity;
}

const firstTotal = calculateTotal(20, 3);
console.log(firstTotal); // 60

/*
  When we call: calculateTotal(20, 3)
  the arguments are matched by POSITION.

  price     --> 20
  quantity  --> 3
*/

// --------------------------------------------------
// 8. ARGUMENT ORDER MATTERS
// --------------------------------------------------

function subtract(
  first: number,
  second: number
) {
  return first - second;
}

console.log(subtract(10, 3)); // 7
console.log(subtract(3, 10)); // -7

/*
  The first argument goes to the first parameter.
  The second argument goes to the second parameter.
  Argument position matters.
*/

// --------------------------------------------------
// 9. STRING PARAMETERS
// --------------------------------------------------

function createGreeting(name: string) {
  return "Hello " + name;
}

console.log(createGreeting("Selman")); // Hello Selman
console.log(createGreeting("Ayse")); // Hello Ayse

/*
  Parameters do not have to be numbers.
  name: string --> tells TypeScript that the function expects a string argument.
*/

// --------------------------------------------------
// 10. BOOLEAN PARAMETERS
// --------------------------------------------------

function getAccountMessage(
  isActive: boolean
) {
  if (isActive) {
    return "Account active";
  }

  return "Account inactive";
}

console.log(
  getAccountMessage(true)
); // Account active

console.log(
  getAccountMessage(false)
); // Account inactive

// --------------------------------------------------
// 11. DIFFERENT PARAMETER TYPES
// --------------------------------------------------

function getProductMessage(
  name: string,
  price: number,
  available: boolean
) {
  if (!available) {
    return name + " is unavailable";
  }

  return name + " costs " + price;
}

console.log(
  getProductMessage(
    "Keyboard",
    50,
    true
  )
);

console.log(
  getProductMessage(
    "Mouse",
    20,
    false
  )
);

/*
  One function can receive several parameters with different types.
  name -> string
  price -> number
  available -> boolean
*/

// --------------------------------------------------
// 12. VARIABLES CAN BE ARGUMENTS
// --------------------------------------------------

const productPrice = 30;
const productQuantity = 4;

const total =
  calculateTotal(
    productPrice,
    productQuantity
  );

console.log(total); // 120

/*
  Arguments do not have to be raw values like: calculateTotal(30, 4)
  They can also be variables.

  Before the function runs:
  productPrice -> 30
  productQuantity -> 4
*/

// --------------------------------------------------
// 13. EXPRESSIONS CAN BE ARGUMENTS
// --------------------------------------------------

const expressionResult =
  calculateTotal(
    10 + 10,
    2 + 1
  );

console.log(expressionResult); // 60

/*
  Remember:
  arguments are values given to the function.
  Expressions produce values.

  So JavaScript first evaluates:
  10 + 10 -> 20
  2 + 1 -> 3

  Then the call becomes conceptually: 
  calculateTotal(20, 3)
*/

// --------------------------------------------------
// 14. FUNCTION RESULTS CAN BE ARGUMENTS
// --------------------------------------------------

function getPrice() {
  return 25;
}

function getQuantity() {
  return 2;
}

const calculatedTotal =
  calculateTotal(
    getPrice(),
    getQuantity()
  );

console.log(calculatedTotal); // 50

/*
  This connects several concepts we already know:

  function calls
  return values
  expressions
  arguments
*/

// --------------------------------------------------
// 15. PARAMETERS EXIST INSIDE THE FUNCTION
// --------------------------------------------------

function showUsername(
  username: string
) {
  console.log(username);
}

showUsername("selman");

/*
  username is created for the function call.
  Inside the function body we can use it like another variable.
  Its value comes from the argument.
*/

// --------------------------------------------------
// 16. RETURN TYPE
// --------------------------------------------------

function multiply(
  first: number,
  second: number
): number {
  return first * second;
}

/*
  Look at: --> ): number
  This describes the type of value returned by the function.

  Parameters:
  first: number
  second: number

  Return type: number
*/

const multiplicationResult =
  multiply(5, 4);

console.log(multiplicationResult); // 20

// --------------------------------------------------
// 17. STRING RETURN TYPE
// --------------------------------------------------

function getStatusMessage(
  status: string
): string {

  if (status === "ACTIVE") {
    return "User is active";
  }

  return "User is inactive";
}

console.log(
  getStatusMessage("ACTIVE")
);

// --------------------------------------------------
// 18. BOOLEAN RETURN TYPE
// --------------------------------------------------

function isAdult(
  age: number
): boolean {
  return age >= 18;
}

console.log(isAdult(25)); // true
console.log(isAdult(15)); // false

// --------------------------------------------------
// 19. INPUT -> BEHAVIOR -> OUTPUT
// --------------------------------------------------

function calculateDiscountedPrice(
  price: number,
  discount: number
): number {

  const discountAmount =
    price * discount;

  const finalPrice =
    price - discountAmount;

  return finalPrice;
}

console.log(
  calculateDiscountedPrice(
    100,
    0.2
  )
); // 80

// --------------------------------------------------
// 20. COMPLETE EXAMPLE
// --------------------------------------------------

function canProcessItem(
  price: number,
  quantity: number,
  available: boolean
): boolean {

  if (!available) {
    return false;
  }

  if (price <= 0) {
    return false;
  }

  if (quantity <= 0) {
    return false;
  }

  return true;
}

const firstCheck =
  canProcessItem(
    20,
    2,
    true
  );
console.log(firstCheck); // true

const secondCheck =
  canProcessItem(
    20,
    0,
    true
  );
console.log(secondCheck); // false

// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  PARAMETER: A named input declared by a function.

  function doubleNumber(number: number)
  number -> parameter

  ARGUMENT: The actual value supplied when calling the function.
  doubleNumber(10)
  10 -> argument

  MULTIPLE PARAMETERS
  function calculateTotal(
    price: number,
    quantity: number
  )

  MULTIPLE ARGUMENTS: calculateTotal(20, 3)

  Matching happens by position:
  price    -> 20
  quantity -> 3


  RETURN TYPE
  function isAdult(
    age: number
  ): boolean

  : boolean --> describes what kind of value the function returns.
*/