/*
  ARROW FUNCTIONS

  Until now, we usually declared functions like this:

  function doubleNumber(
    number: number
  ): number {
    return number * 2;
  }

  JavaScript also has another way to create functions: arrow functions.

  const doubleNumber = (
    number: number
  ): number => {
    return number * 2;
  };

  These are still FUNCTIONS. The main difference is syntax.
*/


// --------------------------------------------------
// 1. NORMAL FUNCTION DECLARATION
// --------------------------------------------------

function sayHello(): void {
  console.log("Hello");
}

sayHello();

// --------------------------------------------------
// 2. THE SAME IDEA AS AN ARROW FUNCTION
// --------------------------------------------------

const sayHelloArrow = (): void => {
  console.log("Hello");
};

sayHelloArrow();

/*
  Compare: function sayHello() { ... }
  with: const sayHelloArrow = () => { ... };

  Both create a function.
*/

// --------------------------------------------------
// 3. READ THE ARROW FUNCTION
// --------------------------------------------------

const showReady = (): void => {
  console.log("Ready");
};

/*
  const showReady --> Create a variable called showReady.

  ()    -->    The function currently receives no parameters.
  =>    -->    This is the arrow.

  It is part of arrow function syntax.
  { ... }  is the function body.
*/

showReady();

// --------------------------------------------------
// 4. THE VARIABLE CONTAINS A FUNCTION
// --------------------------------------------------

console.log(
  typeof showReady
); // function

/*
  showReady is not the result of the function.
  It contains the function itself.

  showReady -> function reference
  showReady() -> function call
*/

// --------------------------------------------------
// 5. ARROW FUNCTION WITH A PARAMETER
// --------------------------------------------------

const doubleNumber = (
  number: number
): number => {

  return number * 2;
};

console.log(
  doubleNumber(5)
); // 10

/*
  This behaves like:

  function doubleNumber(
    number: number
  ): number {
    return number * 2;
  }

  Input: number
  Output: number
*/

// --------------------------------------------------
// 6. MULTIPLE PARAMETERS
// --------------------------------------------------

const calculateTotal = (
  price: number,
  quantity: number
): number => {

  return price * quantity;
};

console.log(
  calculateTotal(20, 3)
); // 60

//  Parameters work exactly like they did in normal function declarations.

// --------------------------------------------------
// 7. ARROW FUNCTION WITH A STRING
// --------------------------------------------------

const createGreeting = (
  name: string
): string => {

  return "Hello " + name;
};

console.log(
  createGreeting("Selman")
);
// Hello Selman

// --------------------------------------------------
// 8. ARROW FUNCTION WITH A BOOLEAN RESULT
// --------------------------------------------------

const isAdult = (
  age: number
): boolean => {

  return age >= 18;
};

console.log(
  isAdult(25)
); // true

console.log(
  isAdult(15)
); // false

// --------------------------------------------------
// 9. FUNCTION TYPE STILL WORKS THE SAME WAY
// --------------------------------------------------

const operation:
  (value: number) => number =
  doubleNumber;

console.log(
  operation(10)
); // 20

/*
  Remember this: (value: number) => number is a FUNCTION TYPE.

  But:

  (value: number) => {
    return value * 2;
  }

  is an ARROW FUNCTION. They look similar, but they have different jobs.
*/

// --------------------------------------------------
// 10. FUNCTION TYPE VS ARROW FUNCTION
// --------------------------------------------------

const addTen:
  (value: number) => number =
  (value: number): number => {
    return value + 10;
  };

console.log(
  addTen(5)
); // 15

// --------------------------------------------------
// 11. SHORTER ARROW FUNCTION
// --------------------------------------------------

const tripleNumber = (
  number: number
): number => number * 3;

console.log( tripleNumber(4) ); // 12

/*
  When an arrow function contains only ONE expression, we can sometimes remove:
  { return ... }
  This:

  const tripleNumber = (
    number: number
  ): number => {
    return number * 3;
  };

  can become:

  const tripleNumber = (
    number: number
  ): number => number * 3;
*/

// --------------------------------------------------
// 12. IMPLICIT RETURN
// --------------------------------------------------

const subtractOne = (
  number: number
): number => number - 1;

/*
  There is no written: return
  But the expression result is returned automatically.
  This is called an implicit return.
*/
console.log( subtractOne(10) ); // 9

// --------------------------------------------------
// 13. EXPLICIT RETURN
// --------------------------------------------------

const subtractTwo = (
  number: number
): number => {

  return number - 2;
};

/*
  Here we use:
  { return ... } This is an explicit return.
*/
console.log( subtractTwo(10) ); // 8

// --------------------------------------------------
// 14. DO NOT MIX THE TWO FORMS
// --------------------------------------------------

const correctExample = (
  number: number
): number => number * 2;


/*
  Short form: => expression
  Or block form: => { return expression; }
  Once we use curly braces, we normally need return when we want to produce a result.
*/

const anotherCorrectExample = (
  number: number
): number => {

  return number * 2;
};

console.log( correctExample(5) ); // 10
console.log( anotherCorrectExample(5) ); // 10

// --------------------------------------------------
// 15. ARROW FUNCTIONS ARE FUNCTION VALUES
// --------------------------------------------------

const getStatus = (): string => {
  return "ACTIVE";
};

const statusFunction = getStatus;
const statusResult = getStatus();

console.log( typeof statusFunction ); // function
console.log( typeof statusResult ); // string

/*
  Exactly the same rule still applies:
  getStatus -> function
  getStatus() -> call the function
*/

// --------------------------------------------------
// 16. ARROW FUNCTION AS A CALLBACK
// --------------------------------------------------

function runSomething(
  action: () => void
): void {

  action();
}

runSomething(
  () => {
    console.log("Running callback");
  }
);


/*
  Look carefully. Previously we might write:

  function printMessage() {
    console.log("Running callback");
  }

  runSomething(printMessage);

  Here we create the function directly where it is needed:

  runSomething(
    () => {
      console.log("Running callback");
    }
  );
*/


// --------------------------------------------------
// 17. THE CALLBACK STILL WORKS THE SAME WAY
// --------------------------------------------------

function executeOperation(
  value: number,
  operation: (value: number) => number
): number {

  return operation(value);
}


const result =
  executeOperation(
    10,
    (number: number): number => {
      return number * 2;
    }
  );
console.log(result); // 20

/*
  Second argument:

  (number: number): number => {
    return number * 2;
  }

  is simply a function.
  Therefore:
  operation = that function
  Then:
  operation(10) -> 20
*/

// --------------------------------------------------
// 18. SHORT CALLBACK VERSION
// --------------------------------------------------

const shortResult =
  executeOperation(
    10,
    (number: number): number =>
      number * 3
  );

console.log(shortResult);
// 30

/*
  Same callback idea. Just using implicit return.
*/

// --------------------------------------------------
// 19. WHY THIS STYLE IS COMMON
// --------------------------------------------------

/*
  Imagine a callback that is used only once.

  Creating a separate named function can sometimes make the code unnecessarily distant.

  Instead of:

  function doubleNumber(number: number) {
    return number * 2;
  }

  executeOperation(10, doubleNumber);

  we can write:

  executeOperation(
    10,
    number => number * 2
  );

  The behavior is visible exactly where it is used.
*/

// --------------------------------------------------
// 20. DO NOT CONFUSE THESE TWO
// --------------------------------------------------

const storedFunction =
  (number: number): number =>
    number * 2;

const storedResult =
  storedFunction(5);


/*
  storedFunction -> function
  storedFunction(5) -> function call
  storedResult -> 10
*/

console.log(
  typeof storedFunction
); // function

console.log(
  storedResult
); // 10

// --------------------------------------------------
// 21. COMPLETE EXAMPLE
// --------------------------------------------------

const calculateRegularPrice = (
  price: number
): number => price;

const calculateDiscountPrice = (
  price: number
): number => price * 0.8;

function calculatePrice(
  price: number,
  calculator: (price: number) => number
): number {

  return calculator(price);
}

const normalPrice =
  calculatePrice(
    100,
    calculateRegularPrice
  );

console.log(normalPrice); // 100

const discountPrice =
  calculatePrice(
    100,
    calculateDiscountPrice
  );

console.log(discountPrice); // 80

const specialPrice =
  calculatePrice(
    100,
    (price: number): number =>
      price * 0.5
  );

console.log(specialPrice); // 50

/*
  Notice: calculatePrice receives a callback in all cases.

  First: calculateRegularPrice
  Second: calculateDiscountPrice
  Third: an arrow function created directly  inside the function call.

  Different syntax. Same callback concept.
*/

// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  NORMAL FUNCTION
  ---------------

  function doubleNumber(
    number: number
  ): number {
    return number * 2;
  }

  ARROW FUNCTION
  --------------

  const doubleNumber = (
    number: number
  ): number => {
    return number * 2;
  };

  SHORT ARROW FUNCTION
  --------------------

  const doubleNumber = (
    number: number
  ): number => number * 2;


  IMPORTANT
  ---------

  Arrow functions are still functions.

  They can:
  - receive parameters
  - receive arguments
  - return values
  - be stored in variables
  - be passed as callbacks
  - be called with ()

  FUNCTION REFERENCE doubleNumber -> function
  FUNCTION CALL doubleNumber(5) -> result

  CALLBACK EXAMPLE
  ----------------

  runSomething(
    () => {
      console.log("Hello");
    }
  );

  The arrow function is simply the function being passed as the callback.
*/