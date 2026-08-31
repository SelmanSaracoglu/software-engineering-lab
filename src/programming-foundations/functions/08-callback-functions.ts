/*
  CALLBACK FUNCTIONS

  A function passed into another function is commonly called a callback.

  In the previous lesson, we learned the difference between:
  getPrice and getPrice()
  getPrice -> the function itself
  getPrice() -> call the function and get its result

  That distinction becomes useful when we want to give one function to another function.
*/

// --------------------------------------------------
// 1. START WITH A NORMAL FUNCTION
// --------------------------------------------------

function sayHello(): void {
  console.log("Hello");
}

sayHello();

/*
  This function does not return a useful value.
  It performs an action: console.log("Hello")
*/

// --------------------------------------------------
// 2. A FUNCTION CAN RECEIVE NORMAL VALUES
// --------------------------------------------------

function printNumber(
  number: number
): void {
  console.log(number);
}

printNumber(10);

/*
  number is a parameter.
  10 is the argument.
*/

// --------------------------------------------------
// 3. A PARAMETER CAN ALSO EXPECT A FUNCTION
// --------------------------------------------------

function runSomething(
  action: () => void
): void {
  action();
}

/*
  Look carefully at: action: () => void

  action        parameter name
  () => void    parameter type

  It means: action must be a function 
  that:  receives no arguments and does not return a useful value.
*/

// --------------------------------------------------
// 4. PASSING A FUNCTION AS AN ARGUMENT
// --------------------------------------------------

runSomething(sayHello);

/*
  VERY IMPORTANT:
  We wrote: sayHello NOT: sayHello()
  Why? Because we want to GIVE the function to runSomething.
  We do not want to run it yet.
*/

// --------------------------------------------------
// 5. FOLLOW THE VALUE
// --------------------------------------------------

/*
  We call: runSomething(sayHello)

  The parameter: action --> receives: sayHello

  Conceptually: action = sayHello

  Then inside runSomething: action()
  means: call the function currently stored in action.
  So it becomes: sayHello()

  Output: Hello
*/

// --------------------------------------------------
// 6. THE CALLBACK IS CALLED BY ANOTHER FUNCTION
// --------------------------------------------------

function printGoodbye(): void {
  console.log("Goodbye");
}

runSomething(printGoodbye);

/*
  This time: action = printGoodbye
  Then: action()
  becomes: printGoodbye()

  Output: Goodbye
*/

// --------------------------------------------------
// 7. SAME FUNCTION, DIFFERENT CALLBACKS
// --------------------------------------------------

function printStart(): void {
  console.log("Start");
}

function printFinish(): void {
  console.log("Finish");
}

runSomething(printStart);
runSomething(printFinish);

/*
  runSomething does not need to know the exact behavior beforehand.
  It only knows: "I will receive a function, and I will call it."
*/

// --------------------------------------------------
// 8. CALLBACK IS JUST A FUNCTION VALUE
// --------------------------------------------------

function execute(
  callback: () => void
): void {
  console.log("Before callback");

  callback();

  console.log("After callback");
}


function printMessage(): void {
  console.log("Callback is running");
}

execute(printMessage);

// --------------------------------------------------
// 9. WHY NOT USE () WHEN PASSING IT?
// --------------------------------------------------

function getMessage(): string {
  return "Hello from function";
}

/*
  Compare: getMessage 
  and: getMessage()
*/

const functionReference =
  getMessage;

const functionResult =
  getMessage();

console.log(typeof functionReference); // function
console.log(typeof functionResult); // string

/*
  If another function expects a FUNCTION, we usually need to give:
  getMessage 
  not: 
  getMessage()

  Because getMessage() produces a string, not a function.
*/

// --------------------------------------------------
// 10. CALLBACK THAT RETURNS A VALUE
// --------------------------------------------------

function getPrice(): number {
  return 50;
}

function useNumberFunction(
  callback: () => number
): number {

  const result =
    callback();

  return result;
}

const price =
  useNumberFunction(getPrice);

console.log(price); // 50

/*
  callback type: () => number
  means: 
  callback must be a function 
  that: 
  receives nothing and returns a number.
*/

// --------------------------------------------------
// 11. FOLLOW THIS EXAMPLE CAREFULLY
// --------------------------------------------------

function getQuantity(): number {
  return 3;
}

const quantity =
  useNumberFunction(
    getQuantity
  );

console.log(quantity); // 3

// --------------------------------------------------
// 12. CALLBACK CAN RECEIVE A VALUE
// --------------------------------------------------

function doubleNumber(
  value: number
): number {
  return value * 2;
}

function applyOperation(
  value: number,
  operation: (value: number) => number
): number {

  return operation(value);
}

/*
  applyOperation receives TWO arguments:
  1. a number
  2. a function
  The function must have this shape: number -> number
*/

const doubled =
  applyOperation(
    10,
    doubleNumber
  );

console.log(doubled); // 20

// --------------------------------------------------
// 13. FOLLOW THE PARAMETERS
// --------------------------------------------------

/*
  We call: 
  applyOperation(10, doubleNumber)

  So:
  value = 10
  operation = doubleNumber

  Inside the function: operation(value)
  becomes: doubleNumber(10)

  which returns: 20
*/

// --------------------------------------------------
// 14. ANOTHER CALLBACK WITH THE SAME SHAPE
// --------------------------------------------------

function addTen(
  value: number
): number {
  return value + 10;
}

const result =
  applyOperation(
    5,
    addTen
  );

console.log(result); // 15

/*
  applyOperation did not change. Only the callback changed.

  First possibility:  doubleNumber
  Second possibility: addTen
*/

// --------------------------------------------------
// 15. CALLBACK CHANGES THE BEHAVIOR
// --------------------------------------------------

function subtractOne(
  value: number
): number {
  return value - 1;
}

console.log(
  applyOperation(
    10,
    doubleNumber
  )
); // 20

console.log(
  applyOperation(
    10,
    addTen
  )
); // 20


console.log(
  applyOperation(
    10,
    subtractOne
  )
); // 9

// --------------------------------------------------
// 16. WHY CALLBACKS ARE USEFUL
// --------------------------------------------------

/*
  Imagine this function: applyOperation

  It knows:
  - which value to use
  - when to call the operation

  But it does NOT decide the exact operation.
  That behavior is supplied from outside.

  This is an important programming idea:
  one piece of code controls WHEN something happens, another piece of code defines WHAT happens.
*/

// --------------------------------------------------
// 17. CALLBACK WITH BOOLEAN RESULT
// --------------------------------------------------

function isPositive(
  value: number
): boolean {
  return value > 0;
}

function checkValue(
  value: number,
  check: (value: number) => boolean
): boolean {

  return check(value);
}

console.log(
  checkValue(
    10,
    isPositive
  )
); // true

console.log(
  checkValue(
    -5,
    isPositive
  )
); // false

// --------------------------------------------------
// 18. CALLBACK NAME IS NOT SPECIAL
// --------------------------------------------------

function executeTask(
  task: () => void
): void {
  task();
}

function showReady(): void {
  console.log("Ready");
}

executeTask(showReady);

/*
  The parameter does not have to be called: callback
  It could be:

  action
  operation
  task
  handler
  check

  "callback" describes the role of the function.
  It is not a special JavaScript keyword.
*/

// --------------------------------------------------
// 19. COMPLETE EXAMPLE
// --------------------------------------------------

function regularPrice(
  price: number
): number {
  return price;
}

function discountPrice(
  price: number
): number {
  return price * 0.8;
}

function calculateFinalPrice(
  price: number,
  calculator: (price: number) => number
): number {

  return calculator(price);
}

const normalResult =
  calculateFinalPrice(
    100,
    regularPrice
  );
console.log(normalResult); // 100


const discountedResult =
  calculateFinalPrice(
    100,
    discountPrice
  );
console.log(discountedResult); // 80

// --------------------------------------------------
// 20. MOST IMPORTANT EXAMPLE
// --------------------------------------------------

function processNumber(
  number: number,
  callback: (number: number) => number
): number {

  return callback(number);
}

function multiplyByThree(
  number: number
): number {
  return number * 3;
}

const finalResult =
  processNumber(
    4,
    multiplyByThree
  );
console.log(finalResult); // 12


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  CALLBACK: A function passed to another function so that the receiving function can call it.

  function sayHello() {
    console.log("Hello");
  }

  function runSomething(
    action: () => void
  ) {
    action();
  }

  runSomething(sayHello);

  IMPORTANT

  sayHello -> give the function
  sayHello() -> run the function


  CALLBACK PARAMETER 
  action: () => void 
  means: action must contain a function.

  CALLBACK WITH INPUT
  operation:
    (value: number) => number

  means: operation must be a function 
  that: receives a number and returns a number.

*/