/*
  FUNCTION REFERENCES

  We already know how to declare and call functions.

  function getPrice() {
    return 50;
  }

  There is an important difference between: getPrice and getPrice()

  This lesson focuses on that difference.
*/


// --------------------------------------------------
// 1. A NORMAL FUNCTION
// --------------------------------------------------

function getPrice(): number {
  return 50;
}

console.log(getPrice()); // 50

// --------------------------------------------------
// 2. FUNCTION NAME WITHOUT ()
// --------------------------------------------------

console.log(getPrice);

/*
  Here we did NOT write: getPrice()
  We wrote: getPrice
  This does not call the function. It refers to the function itself.
*/

// --------------------------------------------------
// 3. FUNCTION VS FUNCTION RESULT
// --------------------------------------------------

const firstValue = getPrice;
const secondValue = getPrice();

/*
  These two variables contain very different things.
  firstValue = getPrice     ->  the FUNCTION itself
  secondValue = getPrice()  ->  the RESULT of calling the function

  Since getPrice() returns 50:  
  secondValue-> 50
*/

console.log(firstValue);
console.log(secondValue); // 50

// --------------------------------------------------
// 4. CALLING THE STORED FUNCTION
// --------------------------------------------------

const priceFunction =
  getPrice;

console.log(priceFunction());

/*
  This is important. priceFunction contains the same function referenced by getPrice.
  Therefore we can call: priceFunction() and the function runs.
*/

// --------------------------------------------------
// 5. FOLLOW IT STEP BY STEP
// --------------------------------------------------

function getQuantity(): number {
  return 3;
}

const quantityFunction =
  getQuantity;

/*
  At this point: quantityFunction contains the FUNCTION.
  The function has NOT been called yet.
*/

const quantity =
  quantityFunction();

console.log(quantity); // 3

/*
  Now:
  quantityFunction() calls the stored function.
  That function executes: return 3;
  So: quantity = 3
*/

// --------------------------------------------------
// 6. THE NAME IS NOT THE IMPORTANT PART
// --------------------------------------------------

function sayHello(): string {
  return "Hello";
}

const greetingFunction =
  sayHello;

console.log(
  greetingFunction()
); // Hello

// --------------------------------------------------
// 7. TWO REFERENCES TO THE SAME FUNCTION
// --------------------------------------------------

function getStatus(): string {
  return "ACTIVE";
}

const firstReference =
  getStatus;

const secondReference =
  getStatus;

console.log(
  firstReference()
); // ACTIVE

console.log(
  secondReference()
); // ACTIVE

/*
  We did not create two different functions.
  Both variables reference the same function.
*/

// --------------------------------------------------
// 8. CALLING TOO EARLY CHANGES THE VALUE
// --------------------------------------------------

function getMessage(): string {
  return "System ready";
}

const functionReference =
  getMessage;

const functionResult =
  getMessage();

/*
  functionReference     -> function
  functionResult        -> string

  getMessage        means: "give me the function"
  getMessage()      means: "run the function and give me its result"
*/

console.log(
  functionReference()
); // System ready

console.log(
  functionResult
);// System ready

/*
  The printed text looks the same.
  But the values are NOT the same kind of thing.

  functionReference -> function
  functionResult -> string
*/

// --------------------------------------------------
// 9. WE CAN CHECK WITH typeof
// --------------------------------------------------

console.log(
  typeof functionReference
); // function

console.log(
  typeof functionResult
); // string

// typeof helps us see the difference clearly.

// --------------------------------------------------
// 10. ANOTHER EXAMPLE WITH NUMBERS
// --------------------------------------------------

function calculateExample(): number {
  return 10 + 20;
}

const calculation =
  calculateExample;

const result =
  calculateExample();

console.log(
  typeof calculation
); // function

console.log(
  typeof result
); // number


console.log(
  calculation()
); // 30

console.log(
  result
); // 30

// --------------------------------------------------
// 11. FUNCTION TYPE
// --------------------------------------------------

function isAvailable(): boolean {
  return true;
}

const availabilityCheck:
  () => boolean =
  isAvailable;

/*
  Look at:
  () => boolean             This is a TYPE describing a function.
  () means:                 this function receives no parameters.
  => boolean means:         this function returns a boolean.
  () => boolean means:      "a function that receives nothing and returns a boolean"
*/

console.log(
  availabilityCheck()
); // true


// --------------------------------------------------
// 12. FUNCTION TYPE WITH A PARAMETER
// --------------------------------------------------

function doubleNumber(
  number: number
): number {
  return number * 2;
}

const operation:
  (value: number) => number =
  doubleNumber;

/*
  (value: number) => number
  receives a number and returns a number.
*/

console.log(
  operation(5)
); // 10

// --------------------------------------------------
// 13. PARAMETER NAME IN THE TYPE
// --------------------------------------------------

const anotherOperation:
  (input: number) => number =
  doubleNumber;

console.log(
  anotherOperation(10)
); // 20

/*
  Notice:
  doubleNumber uses:        number
  The variable type uses:   input

  These names do not need to match. What matters is the structure:
  input type    -> number
  return type   -> number
*/

// --------------------------------------------------
// 14. DIFFERENT FUNCTIONS CAN HAVE THE SAME SHAPE
// --------------------------------------------------

function addTen(
  number: number
): number {
  return number + 10;
}

function tripleNumber(
  number: number
): number {
  return number * 3;
}

let currentOperation:
  (value: number) => number;

currentOperation =
  addTen;

console.log(
  currentOperation(5)
); // 15


currentOperation =
  tripleNumber;

console.log(
  currentOperation(5)
); // 15

/*
  currentOperation can reference either function.
  Why? Because both match:
  (value: number) => number
*/

// --------------------------------------------------
// 15. NOTICE WHAT CHANGED
// --------------------------------------------------

function subtractOne(
  number: number
): number {
  return number - 1;
}

let selectedOperation:
  (value: number) => number =
  subtractOne;

console.log(
  selectedOperation(10)
); // 9

selectedOperation =
  doubleNumber;

console.log(
  selectedOperation(10)
); // 20

/*
  The variable:
  selectedOperation did not contain a number. It contained a FUNCTION.

  First:
  selectedOperation -> subtractOne
  Later:
  selectedOperation -> doubleNumber
  Then calling:
  selectedOperation(10) runs whichever function is currently referenced.
*/

// --------------------------------------------------
// 16. COMPLETE EXAMPLE
// --------------------------------------------------

function calculateRegularPrice(
  price: number
): number {
  return price;
}

function calculateDiscountPrice(
  price: number
): number {
  return price * 0.8;
}

let priceCalculator:
  (price: number) => number;

const discountActive = true;

if (discountActive) {
  priceCalculator =
    calculateDiscountPrice;
} else {
  priceCalculator =
    calculateRegularPrice;
}

const finalPrice =
  priceCalculator(100);

console.log(finalPrice); // 80


/*
  Follow the logic carefully.

  discountActive -> true

  Therefore:
  priceCalculator =
    calculateDiscountPrice;

  Notice: NO parentheses. We are storing the FUNCTION.

  Later:
  priceCalculator(100)

  NOW we call that function. So:
  calculateDiscountPrice(100) -> 80
*/


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  getPrice -> GIVE the function
  getPrice() -> RUN the function
*/