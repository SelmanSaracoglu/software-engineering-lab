/*
  FOR...OF LOOPS

  for...of lets us work with array items one by one.
*/

// --------------------------------------------------
// 1. BASIC LOOP
// --------------------------------------------------

const numbers = [
  10,
  20,
  30
];


for (
  const number of numbers
) {

  console.log(
    number
  );
}


/*
  Read:
  for each number
  inside numbers
*/


// --------------------------------------------------
// 2. THE LOOP VARIABLE CHANGES
// --------------------------------------------------

const names = [
  "Alice",
  "Bob",
  "Charlie"
];


for (
  const name of names
) {

  console.log(
    "Hello " + name
  );
}

/*
  First iteration: name = "Alice"
  Second: name = "Bob"
  Third: name = "Charlie"
*/


// --------------------------------------------------
// 3. CONDITIONS INSIDE A LOOP
// --------------------------------------------------

for (
  const number of numbers
) {

  if (
    number > 15
  ) {

    console.log(
      number
    );
  }
}


// --------------------------------------------------
// 4. ACCUMULATING A VALUE
// --------------------------------------------------

let total = 0;

for (
  const number of numbers
) {

  total += number;
}

console.log(
  total
); // 60

/*
  total changes after every iteration.
  That is why we use: let
*/


// --------------------------------------------------
// 5. COUNTING MATCHES
// --------------------------------------------------

const statuses = [
  "NEW",
  "COMPLETED",
  "NEW"
];

let newCount = 0;

for (
  const status of statuses
) {

  if (
    status === "NEW"
  ) {

    newCount += 1;
  }
}

console.log(
  newCount
); // 2

// --------------------------------------------------
// 6. continue
// --------------------------------------------------

for (
  const number of numbers
) {

  if (
    number === 20
  ) {

    continue;
  }

  console.log(
    number
  );
}


/*
  continue means:
  skip the rest of this iteration and move to the next item.
*/


// --------------------------------------------------
// 7. break
// --------------------------------------------------

for (
  const number of numbers
) {

  if (
    number === 20
  ) {

    break;
  }

  console.log(
    number
  );
}

/*
  break means: stop the entire loop.
*/


// --------------------------------------------------
// 8. ARRAY OF OBJECTS
// --------------------------------------------------

type Product = {
  name: string;
  price: number;
};


const products: Product[] = [
  {
    name: "Keyboard",
    price: 50
  },
  {
    name: "Mouse",
    price: 20
  }
];


for (
  const product of products
) {

  console.log(
    product.name,
    product.price
  );
}


/*
  product is an existing
  Product from the array.

  It is not:

  Product | undefined
*/


// --------------------------------------------------
// 9. PRACTICAL EXAMPLE
// --------------------------------------------------

type Item = {
  price: number;
  quantity: number;
};


const items: Item[] = [
  {
    price: 20,
    quantity: 2
  },
  {
    price: 10,
    quantity: 3
  }
];


function calculateTotal(
  items: Item[]
): number {

  let total = 0;

  for (
    const item of items
  ) {

    total +=
      item.price *
      item.quantity;
  }

  return total;
}

console.log(
  calculateTotal(items)
); // 70

// --------------------------------------------------
// 10. MAP / FILTER / FOR...OF
// --------------------------------------------------

/*
  map > transform every item into a new array

  filter -> keep matching items in a new array

  for...of -> perform flexible step-by-step logic
*/
