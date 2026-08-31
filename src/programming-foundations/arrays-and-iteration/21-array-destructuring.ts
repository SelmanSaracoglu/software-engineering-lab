/*
  ARRAY DESTRUCTURING

  Array destructuring lets us extract items from an array into variables.
  Unlike object destructuring, array destructuring uses POSITION.
*/


// --------------------------------------------------
// 1. NORMAL INDEX ACCESS
// --------------------------------------------------

const colors = [
  "red",
  "green",
  "blue"
];

const firstColor =
  colors[0];

const secondColor =
  colors[1];

console.log(
  firstColor,
  secondColor
);


// --------------------------------------------------
// 2. ARRAY DESTRUCTURING
// --------------------------------------------------

const [
  first,
  second
] = colors;


console.log(
  first,
  second
);


/*
  This:

  const [
    first,
    second
  ] = colors;


  is roughly:

  const first = colors[0];
  const second = colors[1];
*/


// --------------------------------------------------
// 3. POSITION MATTERS
// --------------------------------------------------

const [
  primary,
  secondary
] = colors;


/*
  Variable names are our choice.

  But their meaning comes from their position.

  primary -> colors[0]

  secondary -> colors[1]
*/


// --------------------------------------------------
// 4. SKIPPING AN ITEM
// --------------------------------------------------

const [
  firstItem,
  ,
  thirdItem
] = colors;


console.log(
  firstItem,
  thirdItem
);


/*
  The empty position skips:

  colors[1]
*/


// --------------------------------------------------
// 5. DEFAULT VALUE
// --------------------------------------------------

const sizes = [
  "M"
];


const [
  selectedSize,
  backupSize = "L"
] = sizes;


console.log(
  selectedSize,
  backupSize
);


/*
  sizes[1] does not exist.

  So backupSize uses:

  "L"
*/


// --------------------------------------------------
// 6. REST
// --------------------------------------------------

const fruits = [
  "apple",
  "banana",
  "orange",
  "pear"
];


const [
  firstFruit,
  ...remainingFruits
] = fruits;


console.log(
  firstFruit
);


console.log(
  remainingFruits
);
// ["banana", "orange", "pear"]


/*
  Here ... is REST.

  It collects all remaining
  array items.
*/


// --------------------------------------------------
// 7. ARRAYS OF OBJECTS
// --------------------------------------------------

type Product = {
  id: number;
  name: string;
};


const products: Product[] = [
  {
    id: 1,
    name: "Keyboard"
  },
  {
    id: 2,
    name: "Mouse"
  }
];


const [
  firstProduct
] = products;


/*
  Because the array could be empty,

  firstProduct can be:

  Product | undefined
*/


if (
  firstProduct !== undefined
) {

  console.log(
    firstProduct.name
  );
}


// --------------------------------------------------
// 8. FUNCTION RETURNING AN ARRAY
// --------------------------------------------------

function getCoordinates():
  [number, number] {

  return [
    10,
    20
  ];
}


const [
  x,
  y
] = getCoordinates();


console.log(
  x,
  y
);


/*
  The tuple type:

  [number, number]

  guarantees exactly two
  numeric positions here.
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


const orders: Order[] = [
  {
    id: 101,
    status: "NEW"
  },
  {
    id: 102,
    status: "COMPLETED"
  }
];


const [
  latestOrder
] = orders;


if (
  latestOrder !== undefined
) {

  console.log(
    latestOrder.id,
    latestOrder.status
  );
}


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  OBJECT DESTRUCTURING:

  const {
    name
  } = user;

  -> property name matters


  ARRAY DESTRUCTURING:

  const [
    first,
    second
  ] = values;

  -> position matters


  SKIP:

  const [
    first,
    ,
    third
  ] = values;


  REST:

  const [
    first,
    ...remaining
  ] = values;


  MENTAL MODEL:

  array positions
      ↓
  match variables by order
      ↓
  extract values
*/