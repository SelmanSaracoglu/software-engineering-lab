/*
  ARRAY .filter()

  In the previous lesson, we learned: .map()
  map takes every item, runs a callback, and uses the RETURNED VALUE to build a new array.

  .filter() also takes a callback. But filter uses the callback result differently.

  The callback must produce: true or false
  true -> keep the item
  false > remove the item
*/

// --------------------------------------------------
// 1. START WITH A SIMPLE ARRAY
// --------------------------------------------------

const numbers = [
  1,
  2,
  3,
  4,
  5
];
console.log(numbers);

// --------------------------------------------------
// 2. OUR FIRST FILTER
// --------------------------------------------------

const greaterThanThree =
  numbers.filter(
    (number: number) => {
      return number > 3;
    }
  );

console.log(greaterThanThree); // [4, 5]

/*
  filter calls the callback once for every item.
  The callback returns a boolean.

  number > 3

  produces: true
  or: false
*/

// --------------------------------------------------
// 3. FOLLOW THE FIRST ITEM
// --------------------------------------------------

/*
  First item:                           1
  callback receives:                    number = 1
  Then:                                 number > 3
  becomes:                              1 > 3 -> false
  Because the callback returned false:  1 is NOT included in the new array.
*/

// --------------------------------------------------
// 4. FOLLOW ALL ITEMS
// --------------------------------------------------

/*
  Original: [1, 2, 3, 4, 5]

  1 > 3
  -> false
  -> remove

  2 > 3
  -> false
  -> remove

  3 > 3
  -> false
  -> remove

  4 > 3
  -> true
  -> keep

  5 > 3
  -> true
  -> keep

  Result: [4, 5]
*/

// --------------------------------------------------
// 5. FILTER KEEPS ORIGINAL VALUES
// --------------------------------------------------

const evenNumbers =
  numbers.filter(
    (number: number) =>
      number % 2 === 0
  );
console.log(evenNumbers); // [2, 4]

/*
  filter does NOT transform:    2 into something else
  or:                           4 into something else
  It simply decides: keep this item? yes or no?
*/

// --------------------------------------------------
// 6. WHAT DOES % MEAN?
// --------------------------------------------------

console.log(4 % 2); // 0
console.log(5 % 2); // 1

/*
  % is the remainder operator.

  4 divided by 2 leaves remainder: 0
  5 divided by 2 leaves remainder: 1

  Therefore: number % 2 === 0
  is a common way to ask: "Is this number even?"
*/

// --------------------------------------------------
// 7. FILTER WITH STRINGS
// --------------------------------------------------

const names = [
  "Ali",
  "Ayse",
  "Mehmet",
  "Can"
];

const shortNames =
  names.filter(
    (name: string) =>
      name.length <= 4
  );

console.log(shortNames);

/*
  For each string: 
  name.length 
  gives its character count.

  "Ali" -> 3 -> keep
  "Ayse" -> 4 -> keep
  "Mehmet" -> 6 -> remove
  "Can" -> 3 > keep
*/

// --------------------------------------------------
// 8. FILTER WITH BOOLEANS
// --------------------------------------------------

const activeStates = [
  true,
  false,
  true,
  false
];

const activeOnly =
  activeStates.filter(
    (isActive: boolean) =>
      isActive
  );
console.log(activeOnly); // [true, true]

// --------------------------------------------------
// 9. USING ! WITH FILTER
// --------------------------------------------------

const inactiveOnly =
  activeStates.filter(
    (isActive: boolean) =>
      !isActive
  );
console.log(inactiveOnly); // [false, false]

/*
  ! reverses the boolean.
  true -> false -> remove
  false -> true -> keep
*/

// --------------------------------------------------
// 10. FILTER WITH OBJECTS
// --------------------------------------------------

const products = [
  {
    name: "Keyboard",
    price: 50,
    available: true
  },
  {
    name: "Mouse",
    price: 20,
    available: false
  },
  {
    name: "Monitor",
    price: 200,
    available: true
  }
];

const availableProducts =
  products.filter(
    (product) =>
      product.available
  );
console.log(availableProducts);

/*
  For each product: product.available

  produces: true 
  or: false

  true -> keep the whole product object
  false -> remove the whole product object
*/

// --------------------------------------------------
// 11. FILTER WITH A COMPARISON
// --------------------------------------------------

const expensiveProducts =
  products.filter(
    (product) =>
      product.price >= 50
  );
console.log(expensiveProducts);

// --------------------------------------------------
// 12. FILTER WITH MULTIPLE CONDITIONS
// --------------------------------------------------

const sellableProducts =
  products.filter(
    (product) =>
      product.available &&
      product.price > 0
  );
console.log(sellableProducts);

// --------------------------------------------------
// 13. FILTER WITH STATUS VALUES
// --------------------------------------------------

const orders = [
  {
    id: 1,
    status: "NEW"
  },
  {
    id: 2,
    status: "COMPLETED"
  },
  {
    id: 3,
    status: "IN_PROGRESS"
  },
  {
    id: 4,
    status: "CANCELLED"
  }
];


const openOrders =
  orders.filter(
    (order) =>
      order.status === "NEW" ||
      order.status === "IN_PROGRESS"
  );
console.log(openOrders);

// --------------------------------------------------
// 14. FOLLOW ONE OBJECT CAREFULLY
// --------------------------------------------------

/*
  Imagine this item:
  {
    id: 3,
    status: "IN_PROGRESS"
  }

  callback parameter:
  order = {
    id: 3,
    status: "IN_PROGRESS"
  }

  First comparison: 
  order.status === "NEW"
  "IN_PROGRESS" === "NEW" -> false

  Second comparison: 
  order.status === "IN_PROGRESS" > true

  Then: 
  false || true -> true

  Therefore the object stays in the new array.
*/

// --------------------------------------------------
// 15. FILTER WITH A NAMED CALLBACK
// --------------------------------------------------

function isPositive(
  number: number
): boolean {
  return number > 0;
}

const mixedNumbers = [
  -10,
  5,
  -3,
  20
];

const positiveNumbers =
  mixedNumbers.filter(
    isPositive
  );

console.log(positiveNumbers); // [5, 20]

/*
  Remember: filter(isPositive)
  NOT: filter(isPositive())

  filter needs the FUNCTION. It will call the function itself.
*/

// --------------------------------------------------
// 16. MAP VS FILTER
// --------------------------------------------------

const originalNumbers = [
  1,
  2,
  3
];

const mappedNumbers =
  originalNumbers.map(
    (number: number) =>
      number * 10
  );

const filteredNumbers =
  originalNumbers.filter(
    (number: number) =>
      number > 1
  );

console.log(mappedNumbers); // [10, 20, 30]
console.log(filteredNumbers); // [2, 3]

/*
  MAP asks: "What should this item become?"
  FILTER asks: "Should this item stay?"
*/

// --------------------------------------------------
// 17. VERY IMPORTANT DIFFERENCE
// --------------------------------------------------

const mapExample =
  [10, 20, 30].map(
    (number: number) =>
      number > 15
  );
console.log(mapExample); // [false, true, true]

const filterExample =
  [10, 20, 30].filter(
    (number: number) =>
      number > 15
  ); 
console.log(filterExample); // [20, 30]

/*
  SAME callback expression: number > 15
  But map and filter use the returned boolean differently.

  MAP: takes the returned boolean and puts it into the new array.
  Result: [false, true, true]

  FILTER: uses the returned boolean only as a decision.
  true -> keep original item
  false -> remove original item
  Result: [20, 30]
*/

// --------------------------------------------------
// 18. FILTER DOES NOT CHANGE THE ORIGINAL ARRAY
// --------------------------------------------------

const values = [
  5,
  10,
  15
];

const filteredValues =
  values.filter(
    (value: number) =>
      value >= 10
  );
console.log(values); // [5, 10, 15]
console.log(filteredValues); // [10, 15]

// filter returns a NEW array. The original array remains unchanged.

// --------------------------------------------------
// 19. EMPTY RESULT IS STILL AN ARRAY
// --------------------------------------------------

const largeNumbers =
  numbers.filter(
    (number: number) =>
      number > 100
  );
console.log(largeNumbers); // []

/*
  No item passed the condition. 
  filter still returns an array. 
  It is simply empty.
*/

// --------------------------------------------------
// 20. COMPLETE EXAMPLE
// --------------------------------------------------

const users = [
  {
    username: "alice",
    active: true,
    role: "USER"
  },
  {
    username: "bob",
    active: false,
    role: "ADMIN"
  },
  {
    username: "charlie",
    active: true,
    role: "ADMIN"
  }
];

const activeAdmins =
  users.filter(
    (user) =>
      user.active &&
      user.role === "ADMIN"
  );
console.log(activeAdmins);

// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  .filter(): Runs a callback once for every item.
  CALLBACK: Must produce a boolean result.
  true: keep the original item.
  false: remove the original item.

  map: callback return value becomes a value in the new array.
  filter: callback return value is used only to decide whether the ORIGINAL item remains.
*/