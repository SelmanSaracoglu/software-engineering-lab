/*
  ARRAY .some() AND .every()

  Both methods ask a yes/no question
  about an array.

  They return:

  boolean
*/


// --------------------------------------------------
// 1. some()
// --------------------------------------------------

const numbers = [
  10,
  20,
  30
];


const hasLargeNumber =
  numbers.some(
    (number) =>
      number > 25
  );


console.log(
  hasLargeNumber
);
// true


/*
  some asks:

  "Does AT LEAST ONE item
   match the condition?"
*/


// --------------------------------------------------
// 2. every()
// --------------------------------------------------

const allPositive =
  numbers.every(
    (number) =>
      number > 0
  );


console.log(
  allPositive
);
// true


/*
  every asks:

  "Do ALL items
   match the condition?"
*/


// --------------------------------------------------
// 3. SAME ARRAY, DIFFERENT QUESTION
// --------------------------------------------------

const hasNumberAbove100 =
  numbers.some(
    (number) =>
      number > 100
  );


const allNumbersAbove10 =
  numbers.every(
    (number) =>
      number > 10
  );


console.log(
  hasNumberAbove100
);
// false


console.log(
  allNumbersAbove10
);
// false


/*
  some:

  one true is enough


  every:

  one false is enough
  to make the result false
*/


// --------------------------------------------------
// 4. ARRAYS OF OBJECTS
// --------------------------------------------------

type Order = {
  id: number;
  status:
    "NEW"
    | "IN_PROGRESS"
    | "COMPLETED";
};


const orders: Order[] = [
  {
    id: 1,
    status: "COMPLETED"
  },
  {
    id: 2,
    status: "NEW"
  }
];


const hasOpenOrder =
  orders.some(
    (order) =>
      order.status === "NEW" ||
      order.status === "IN_PROGRESS"
  );


console.log(
  hasOpenOrder
);
// true


const allCompleted =
  orders.every(
    (order) =>
      order.status === "COMPLETED"
  );


console.log(
  allCompleted
);
// false


// --------------------------------------------------
// 5. USING THEM INSIDE FUNCTIONS
// --------------------------------------------------

function hasCompletedOrder(
  orders: Order[]
): boolean {

  return orders.some(
    (order) =>
      order.status === "COMPLETED"
  );
}


function areAllOrdersCompleted(
  orders: Order[]
): boolean {

  return orders.every(
    (order) =>
      order.status === "COMPLETED"
  );
}


console.log(
  hasCompletedOrder(orders)
);


console.log(
  areAllOrdersCompleted(orders)
);


// --------------------------------------------------
// 6. some VS find
// --------------------------------------------------

const foundOpenOrder =
  orders.find(
    (order) =>
      order.status === "NEW"
  );


const openOrderExists =
  orders.some(
    (order) =>
      order.status === "NEW"
  );


/*
  find:

  "Give me the matching item."

  Result:

  Order | undefined


  some:

  "Does a matching item exist?"

  Result:

  boolean
*/


// --------------------------------------------------
// 7. EMPTY ARRAY
// --------------------------------------------------

const emptyNumbers:
  number[] = [];


console.log(
  emptyNumbers.some(
    (number) =>
      number > 0
  )
);
// false


console.log(
  emptyNumbers.every(
    (number) =>
      number > 0
  )
);
// true


/*
  Important behavior:

  [].some(...)
  -> false


  [].every(...)
  -> true


  There is no matching item
  for some().


  And there is no item
  that violates the condition
  for every().
*/


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  some:

  array.some(
    (item) =>
      condition
  )

  -> Does at least one item match?


  every:

  array.every(
    (item) =>
      condition
  )

  -> Do all items match?


  BOTH RETURN:

  boolean


  MENTAL MODEL:

  some
  -> ONE true is enough


  every
  -> ONE false is enough
     to fail
*/