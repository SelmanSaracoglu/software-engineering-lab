/*
  ARRAY .map()

  We already know:
  - functions
  - parameters
  - arguments
  - callbacks
  - arrow functions
  Now we will use those ideas with arrays.

  .map() is an array method. It takes a callback function.
  Then it calls that callback once for every item in the array.
  The values returned by the callback are collected into a NEW array.
*/

// --------------------------------------------------
// 1. START WITH A SIMPLE ARRAY
// --------------------------------------------------

const numbers = [1, 2, 3, 4];
console.log(numbers);

// --------------------------------------------------
// 2. OUR FIRST MAP
// --------------------------------------------------

const doubledNumbers =
  numbers.map(
    (number: number) => {
      return number * 2;
    }
  );
console.log(doubledNumbers); // [2, 4, 6, 8]

/*
  .map() receives a callback.

  The callback is:
  (number: number) => {
    return number * 2;
  }

  map calls this function once for every array item.
*/

// --------------------------------------------------
// 3. FOLLOW THE FIRST ITEM
// --------------------------------------------------

/*
  Original array: [1, 2, 3, 4]
  First item: 1

  map gives 1 to the callback: number = 1
  Then: return number * 2
  becomes: return 1 * 2 -> 2

  map stores that returned value.
*/

// --------------------------------------------------
// 4. FOLLOW ALL ITEMS
// --------------------------------------------------

/*
  First item: number = 1 -->    1 * 2 -> 2
  Second item: number = 2 -->   2 * 2 -> 4
  Third item: number = 3 -->    3 * 2 -> 6
  Fourth item: number = 4 -->   4 * 2 -> 8
  New array: [2, 4, 6, 8]
*/

// --------------------------------------------------
// 5. MAP DOES NOT CHANGE THE ORIGINAL ARRAY
// --------------------------------------------------

console.log(numbers); // [1, 2, 3, 4]
console.log(doubledNumbers); // [2, 4, 6, 8]

/*
  The original array still exists unchanged. 
  map creates a NEW array.
*/

// --------------------------------------------------
// 6. SHORTER ARROW FUNCTION
// --------------------------------------------------

const tripledNumbers =
  numbers.map(
    (number: number) =>
      number * 3
  );
console.log(tripledNumbers); // [3, 6, 9, 12]

/*
  This:                     (number: number) => { return number * 3; }
  can be shortened to:      (number: number) => number * 3

  because there is only one expression.
*/

// --------------------------------------------------
// 7. MAP WITH STRINGS
// --------------------------------------------------

const names = [
  "Ali",
  "Ayse",
  "Mehmet"
];

const greetings =
  names.map(
    (name: string) =>
      "Hello " + name
  );

console.log(greetings);

/*
  Callback runs for each name.

  "Ali" -> "Hello Ali"
  "Ayse" -> "Hello Ayse"
  "Mehmet" -> "Hello Mehmet"
*/

// --------------------------------------------------
// 8. INPUT TYPE AND OUTPUT TYPE CAN DIFFER
// --------------------------------------------------

const prices = [
  10,
  20,
  30
];

const priceLabels =
  prices.map(
    (price: number) =>
      "Price: " + price
  );

console.log(priceLabels);

/*
  Original array: number[]
  Callback receives: number
  Callback returns: string
  Therefore the new array becomes: string[]

  map does NOT require the output type to be the same as the input type.
*/

// --------------------------------------------------
// 9. MAP WITH A NAMED CALLBACK
// --------------------------------------------------

function doubleNumber(
  number: number
): number {
  return number * 2;
}

const results =
  numbers.map(doubleNumber);

console.log(results); // [2, 4, 6, 8]

/*
  Remember: numbers.map(doubleNumber)
  We wrote: doubleNumber
  NOT: doubleNumber()
  Why? Because map expects a FUNCTION. map will call that function itself.
*/

// --------------------------------------------------
// 10. WHAT MAP DOES CONCEPTUALLY
// --------------------------------------------------

/*
  When we write: numbers.map(doubleNumber)

  You can imagine map doing something like:
  doubleNumber(1)
  doubleNumber(2)
  doubleNumber(3)
  doubleNumber(4)

  Then collecting the returned values:
  [ 2, 4, 6, 8 ]
  We do not manually write these calls. map handles that repetition for us.
*/

// --------------------------------------------------
// 11. CALLBACK PARAMETER GETS THE CURRENT ITEM
// --------------------------------------------------

const values = [
  5,
  10,
  15
];

const increasedValues =
  values.map(
    (value: number) => {
      return value + 1;
    }
  );

console.log(increasedValues); // [6, 11, 16]

/*
  The callback parameter: value
  receives a DIFFERENT array item every time the callback runs.
*/

// --------------------------------------------------
// 12. PARAMETER NAME IS OUR CHOICE
// --------------------------------------------------

const firstExample =
  numbers.map(
    (number: number) =>
      number * 2
  );

const secondExample =
  numbers.map(
    (item: number) =>
      item * 2
  );

const thirdExample =
  numbers.map(
    (x: number) =>
      x * 2
  );

console.log(firstExample);
console.log(secondExample);
console.log(thirdExample);

/*
  number / item / x are simply parameter names.
  map gives each one the current array value.
  Good names usually make code easier to read.
*/

// --------------------------------------------------
// 13. MAP CAN USE CONDITIONS
// --------------------------------------------------

const scores = [
  40,
  75,
  90
];

const resultsByScore =
  scores.map(
    (score: number) => {

      if (score >= 60) {
        return "Passed";
      }

      return "Failed";
    }
  );

console.log(resultsByScore);

/*
  For each score:   40 -> Failed
                    75 -> Passed
                    90 -> Passed
  New array:
  [
    "Failed",
    "Passed",
    "Passed"
  ]
*/

// --------------------------------------------------
// 14. MAP WITH BOOLEAN RESULTS
// --------------------------------------------------

const ages = [
  12,
  20,
  35
];

const adultChecks =
  ages.map(
    (age: number) =>
      age >= 18
  );

console.log(adultChecks); // [false, true, true]

/*
  The callback returns a boolean.
  Therefore map collects booleans.
*/

// --------------------------------------------------
// 15. MAP WITH OBJECTS
// --------------------------------------------------

const products = [
  {
    name: "Keyboard",
    price: 50
  },
  {
    name: "Mouse",
    price: 20
  },
  {
    name: "Monitor",
    price: 200
  }
];

// Each array item is now an object.

const productNames =
  products.map(
    (product) =>
      product.name
  );

console.log(productNames);

/*
  First callback call:

  product =
  {
    name: "Keyboard",
    price: 50
  }
  product.name -> "Keyboard"
  The same happens for each object.
  New array:
  [
    "Keyboard",
    "Mouse",
    "Monitor"
  ]
*/

// --------------------------------------------------
// 16. RETURNING NEW OBJECTS
// --------------------------------------------------

const productsWithTax =
  products.map(
    (product) => {

      return {
        name: product.name,
        finalPrice:
          product.price * 1.2
      };
    }
  );
console.log(productsWithTax);

/*
  The callback receives one product object.
  Then it returns a NEW object.
  map collects those new objects into a new array.
*/

// --------------------------------------------------
// 17. ORIGINAL OBJECT ARRAY STILL EXISTS
// --------------------------------------------------

console.log(products);

/*
  map itself does not replace the original array.
  We now have: 
  products and productsWithTax
  as separate arrays.
*/

// --------------------------------------------------
// 18. MAP ALSO PROVIDES THE INDEX
// --------------------------------------------------

const letters = [
  "A",
  "B",
  "C"
];


const labels =
  letters.map(
    (
      letter: string,
      index: number
    ) => {

      return (
        index +
        ": " +
        letter
      );
    }
  );

console.log(labels);

/*
  map can give the callback more than just the current value.

  First parameter: current item
  Second parameter: current index

  Array indexes start at: 0
  So:
  A -> index 0
  B -> index 1
  C -> index 2
*/

// --------------------------------------------------
// 19. INDEX + 1
// --------------------------------------------------

const numberedLabels =
  letters.map(
    (
      letter: string,
      index: number
    ) => {

      return (
        index + 1
      ) + ". " + letter;
    }
  );
console.log(numberedLabels);

/*
  index begins at 0. But humans often count from 1.
  Therefore: index + 1 is a common pattern.
*/

// --------------------------------------------------
// 20. COMPLETE EXAMPLE
// --------------------------------------------------

const orderItems = [
  {
    name: "Shirt",
    price: 30,
    quantity: 2
  },
  {
    name: "Bag",
    price: 50,
    quantity: 1
  }
];

const itemTotals =
  orderItems.map(
    (item) => {

      return {
        name: item.name,
        total:
          item.price *
          item.quantity
      };
    }
  );
console.log(itemTotals);


/*
  First item:
  {
    name: "Shirt",
    price: 30,
    quantity: 2
  }

  callback calculates: 30 * 2 -> 60

  returns:
  {
    name: "Shirt",
    total: 60
  }

  Second item: 50 * 1 -> 50

  New array contains:
  [
    {
      name: "Shirt",
      total: 60
    },
    {
      name: "Bag",
      total: 50
    }
  ]
*/

// --------------------------------------------------
// 21. THE MOST IMPORTANT MENTAL MODEL
// --------------------------------------------------

const exampleNumbers = [
  1,
  2,
  3
];

const exampleResult =
  exampleNumbers.map(
    (number: number) =>
      number * 10
  );
console.log(exampleResult); // [10, 20, 30]

/*
  FOR EACH ITEM:
  call the callback
  give the current item to the callback
  take the returned value
  put that value into the new array
*/


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  .map() -->            Runs a callback once for every item in an array.
  ORIGINAL ARRAY -->    [1, 2, 3]
  CALLBACK -->          number => number * 2
  CALLBACK CALLS-->     
  1 -> 2
  2 -> 4
  3 -> 6

  NEW ARRAY -->         [2, 4, 6]
  IMPORTANT -->         map uses the VALUE RETURNED by the callback.

  Example:

  numbers.map(
    number => number * 2
  )

  map does not only "loop".
  It transforms each item and builds a new array from the callback results.
*/