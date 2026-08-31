/*
  ARRAY .find()

  .find() searches an array and returns the first item that matches a condition.
*/


// --------------------------------------------------
// 1. BASIC find
// --------------------------------------------------

const numbers = [
  10,
  20,
  30,
  40
];


const foundNumber =
  numbers.find(
    (number) =>
      number > 25
  );


console.log(
  foundNumber
);
// 30


/*
  find checks items one by one.

  When the callback returns true, that item is returned.
*/


// --------------------------------------------------
// 2. IF NOTHING MATCHES
// --------------------------------------------------

const missingNumber =
  numbers.find(
    (number) =>
      number > 100
  );


console.log(
  missingNumber
); // undefined


/*
  So the result type is:

  number | undefined
*/


// --------------------------------------------------
// 3. CHECK BEFORE USING THE RESULT
// --------------------------------------------------

if (
  foundNumber !== undefined
) {

  console.log(
    foundNumber * 2
  );
}


/*
  After the check, TypeScript knows: foundNumber is number.
*/


// --------------------------------------------------
// 4. FINDING AN OBJECT
// --------------------------------------------------

type Product = {
  id: number;
  name: string;
  price: number;
};


const products: Product[] = [
  {
    id: 1,
    name: "Keyboard",
    price: 50
  },
  {
    id: 2,
    name: "Mouse",
    price: 20
  },
  {
    id: 3,
    name: "Monitor",
    price: 200
  }
];


const product =
  products.find(
    (product) =>
      product.id === 2
  );


if (
  product !== undefined
) {

  console.log(
    product.name
  );
}


/*
  product is: Product | undefined
*/


// --------------------------------------------------
// 5. find INSIDE A FUNCTION
// --------------------------------------------------

function findProductById(
  products: Product[],
  id: number
): Product | undefined {

  return products.find(
    (product) =>
      product.id === id
  );
}


const selectedProduct =
  findProductById(
    products,
    3
  );


console.log(
  selectedProduct
);


// --------------------------------------------------
// 6. find VS filter
// --------------------------------------------------

const firstExpensiveProduct =
  products.find(
    (product) =>
      product.price >= 50
  );


const allExpensiveProducts =
  products.filter(
    (product) =>
      product.price >= 50
  );


/*
  find
  -> first matching item
  -> Product | undefined


  filter
  -> all matching items
  -> Product[]
*/


// --------------------------------------------------
// 7. PRACTICAL EXAMPLE
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
    id: 101,
    status: "NEW"
  },
  {
    id: 102,
    status: "IN_PROGRESS"
  }
];


function getOrderStatus(
  orders: Order[],
  orderId: number
): string {

  const order =
    orders.find(
      (order) =>
        order.id === orderId
    );


  if (
    order === undefined
  ) {

    return "Order not found";
  }


  return order.status;
}


console.log(
  getOrderStatus(
    orders,
    102
  )
);


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  array.find(
    (item) =>
      condition
  )


  asks:

  "What is the first item that matches this condition?"


  Result:

  item or: undefined


  MENTAL MODEL:

  check item
      ↓
  false
      ↓
  next item
      ↓
  true
      ↓
  return that item
*/