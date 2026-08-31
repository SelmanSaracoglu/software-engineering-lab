/*
  FUNCTIONS

  Until now, our code has mostly executed statements directly from top to bottom. 
  Real programs contain many operations that need to be used more than once.

  A function lets us:
  - give a piece of behavior a name
  - run that behavior when we need it
  - reuse code
  - return a result

  In this lesson we focus only on:
  - declaring a function
  - calling a function
  - returning a value

  Parameters and arguments will come later.
*/


// --------------------------------------------------
// 1. WITHOUT A FUNCTION
// --------------------------------------------------

console.log("Application started");
console.log("Application started");
console.log("Application started");

/*
  This works. But we repeated the same behavior three times.
  If this behavior becomes larger, repetition becomes difficult to maintain.
*/


// --------------------------------------------------
// 2. OUR FIRST FUNCTION
// --------------------------------------------------

function printStartMessage() {
  console.log("Application started");
}

/*
  This DECLARES a function. The code inside the function does NOT run yet.
  We have only defined what the function should do.
*/

// --------------------------------------------------
// 3. FUNCTION DECLARATION
// --------------------------------------------------

/*
  function --> JavaScript keyword used to declare a function.

  printStartMessage --> The name we give to the function.
  () --> Parentheses belong to the function declaration. Later they will also contain parameters.
  {} --> The function body. The code that should run when the function is called.
*/

// --------------------------------------------------
// 4. CALLING A FUNCTION
// --------------------------------------------------

printStartMessage();

/*
  Now the function runs. Notice the difference:

  printStartMessage -> the function itself
  printStartMessage() -> CALL the function

  Parentheses after the function name mean: "Run this function."
*/

// --------------------------------------------------
// 5. CALLING THE SAME FUNCTION AGAIN
// --------------------------------------------------

printStartMessage();
printStartMessage();

/*
  We declared the function only once.
  But we can call it many times.
  This is one reason functions are useful.
*/

// --------------------------------------------------
// 6. ANOTHER FUNCTION
// --------------------------------------------------

function printReadyMessage() {
  console.log("System ready");
}

printReadyMessage();

// --------------------------------------------------
// 7. FUNCTIONS CAN DO MORE THAN CONSOLE.LOG
// --------------------------------------------------

function calculateExample() {
  const price = 20;
  const quantity = 3;

  const total = price * quantity;

  console.log(total);
}

calculateExample(); // 60

/*
  Everything inside the function belongs to that function's execution.

  When calculateExample() is called:
  1. price is created
  2. quantity is created
  3. total is calculated
  4. total is printed
*/

// --------------------------------------------------
// 8. FUNCTION CALLS AFFECT CONTROL FLOW
// --------------------------------------------------

console.log("Before");
calculateExample();
console.log("After");

// --------------------------------------------------
// 9. RETURN
// --------------------------------------------------

function getPrice() {
  return 50;
}

/*
  return sends a value back to the place where the function was called.
  getPrice() therefore produces a value.
*/

const price = getPrice();
console.log(price); // 50


/*
  Think about this line: const price = getPrice();

  First: getPrice()
  The function executes: return 50;

  So we can mentally replace: getPrice() with: 50

  The line becomes: const price = 50;
*/

// --------------------------------------------------
// 10. A FUNCTION CALL CAN BE AN EXPRESSION
// --------------------------------------------------

function getQuantity() {
  return 3;
}

const quantity = getQuantity();
console.log(quantity); // 3

/*
  We previously learned: an expression is code that produces a value.

  getQuantity() produces: 3

  Therefore a function call can also be an expression when the function returns a value.
*/

// --------------------------------------------------
// 11. USING A RETURNED VALUE
// --------------------------------------------------

function getUnitPrice() {
  return 25;
}

const totalPrice =
  getUnitPrice() * 4;

console.log(totalPrice); // 100

// --------------------------------------------------
// 12. RETURN AND CONSOLE.LOG ARE DIFFERENT
// --------------------------------------------------

function printPrice() {
  console.log(50);
}

function returnPrice() {
  return 50;
}

printPrice();

const returnedPrice =
  returnPrice();

console.log(returnedPrice);

/*
  These functions are NOT doing the same thing.

  printPrice() --> prints: 50 --> But it does not give us 50 to use elsewhere.

  returnPrice() -->  gives the value 50 back to the caller.

  We can then:
  store it
  calculate with it
  compare it
  pass it somewhere else

  console.log --> displays something.
  return --> produces a result from the function.
*/


// --------------------------------------------------
// 13. RETURN ENDS THE FUNCTION
// --------------------------------------------------

function getMessage() {
  return "Finished";

  console.log("This will never run");
}

console.log(getMessage());

/*
  When return executes, the function immediately ends.
  Therefore: console.log("This will never run"); is unreachable.
*/

// --------------------------------------------------
// 14. RETURN WITH CONDITIONS
// --------------------------------------------------

function getAccessStatus() {
  const isAllowed = true;

  if (isAllowed) {
    return "Allowed";
  }

  return "Denied";
}

console.log(getAccessStatus()); // Allowed

// --------------------------------------------------
// 15. FUNCTION ITSELF VS FUNCTION CALL
// --------------------------------------------------

function getStatus() {
  return "ACTIVE";
}

const functionItself = 
  getStatus;

const functionResult =
  getStatus();

console.log(functionItself);
console.log(functionResult); // ACTIVE

/*
  This distinction is extremely important.

  getStatus --> refers to the FUNCTION ITSELF.
  getStatus() --> CALLS the function and produces its result.

  We will need this distinction later when we learn callbacks.
*/

// --------------------------------------------------
// 16. NAMING FUNCTIONS
// --------------------------------------------------

function calculateTotal() {
  return 100;
}

function getCurrentStatus() {
  return "NEW";
}

function isApplicationReady() {
  return true;
}

/*
  Function names should normally describe behavior.

  calculate...
  get...
  create...
  update...
  validate...
  is...
  has...
  can...

  Good names help us understand what code does without reading every implementation detail.
*/

// --------------------------------------------------
// 17. COMPLETE EXAMPLE
// --------------------------------------------------

function getProductPrice() {
  return 40;
}

function getProductQuantity() {
  return 2;
}

function calculateOrderTotal() {
  const price =
    getProductPrice();

  const quantity =
    getProductQuantity();

  return price * quantity;
}

const orderTotal =
  calculateOrderTotal();

console.log(orderTotal); // 80