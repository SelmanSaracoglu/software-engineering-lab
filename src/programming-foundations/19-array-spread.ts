/*
  ARRAY SPREAD

  Array spread copies items from one array into a new array.

  [
    ...oldArray
  ]
*/


// --------------------------------------------------
// 1. COPYING AN ARRAY
// --------------------------------------------------

const numbers = [
  10,
  20,
  30
];


const copiedNumbers = [
  ...numbers
];


console.log(
  copiedNumbers
);


/*
  copiedNumbers contains: [10, 20, 30]

  But it is a new array.
*/


// --------------------------------------------------
// 2. ADDING AN ITEM
// --------------------------------------------------

const updatedNumbers = [
  ...numbers,
  40
];


console.log(
  updatedNumbers
); // [10, 20, 30, 40]

/*
  The original array is unchanged.
*/

console.log(
  numbers
); // [10, 20, 30]


// --------------------------------------------------
// 3. PREPENDING AN ITEM
// --------------------------------------------------

const withZero = [
  0,
  ...numbers
];

console.log(
  withZero
); // [0, 10, 20, 30]


// --------------------------------------------------
// 4. COMBINING ARRAYS
// --------------------------------------------------

const firstGroup = [
  1,
  2
];


const secondGroup = [
  3,
  4
];


const combined = [
  ...firstGroup,
  ...secondGroup
];


console.log(
  combined
); // [1, 2, 3, 4]

// --------------------------------------------------
// 5. MUTATION VS NEW ARRAY
// --------------------------------------------------

const fruits = [
  "apple",
  "banana"
];

// Mutation:
fruits.push(
  "orange"
);

// New array:
const newFruits = [
  ...fruits,
  "pear"
];

/*
  push changes the existing array.
  spread creates a new array.
*/

// --------------------------------------------------
// 6. ARRAYS OF OBJECTS
// --------------------------------------------------

type Product = {
  id: number;
  name: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Keyboard"
  }
];

const newProduct: Product = {
  id: 2,
  name: "Mouse"
};

const updatedProducts = [
  ...products,
  newProduct
];

console.log(
  updatedProducts
);

// --------------------------------------------------
// 7. SHALLOW COPY
// --------------------------------------------------

const copiedProducts = [
  ...products
];

/*
  The array itself is new.
  But the objects inside are still the same objects.
*/

copiedProducts[0]!.name =
  "Updated Keyboard";

console.log(
  products[0]?.name
); // Updated Keyboard

/*
  Spread copied the array structure,
  but it did not create new copies of each object.
*/


// --------------------------------------------------
// 8. COPYING OBJECTS INSIDE THE ARRAY
// --------------------------------------------------

const independentProducts =
  products.map(
    (product) => ({
      ...product
    })
  );

independentProducts[0]!.name =
  "Independent Keyboard";

console.log(
  products[0]?.name
); // Updated Keyboard

/*
  map + object spread creates new objects too.
*/

// --------------------------------------------------
// 9. PRACTICAL EXAMPLE
// --------------------------------------------------

type Order = {
  id: number;
  status:
    "NEW"
    | "COMPLETED";
};


function addOrder(
  orders: Order[],
  newOrder: Order
): Order[] {

  return [
    ...orders,
    newOrder
  ];
}


const orders: Order[] = [
  {
    id: 1,
    status: "NEW"
  }
];


const nextOrders =
  addOrder(
    orders,
    {
      id: 2,
      status: "NEW"
    }
  );


console.log(
  orders.length
);
// 1


console.log(
  nextOrders.length
);
// 2
