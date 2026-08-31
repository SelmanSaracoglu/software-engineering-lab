/*
  OBJECT SPREAD

  Object spread lets us copy properties from one object into a new object.

  {
    ...oldObject
  }
*/


// --------------------------------------------------
// 1. COPYING AN OBJECT
// --------------------------------------------------

const user = {
  name: "Alice",
  age: 30
};

const copiedUser = {
  ...user
};

console.log(
  copiedUser
);

/*
  copiedUser contains:

  {
    name: "Alice",
    age: 30
  }

  But copiedUser is a new outer object.
*/


// --------------------------------------------------
// 2. OVERRIDING A PROPERTY
// --------------------------------------------------

const updatedUser = {
  ...user,
  age: 31
};

console.log(
  updatedUser
);

/*
  Spread copies:
  name
  age

  Then: 
  age: 31 comes later and replaces the copied age.
*/

// --------------------------------------------------
// 3. ORDER MATTERS
// --------------------------------------------------

const exampleOne = {
  ...user,
  age: 40
};

const exampleTwo = {
  age: 40,
  ...user
};

console.log(
  exampleOne.age
); // 40

console.log(
  exampleTwo.age
); // 30

/*
  Later properties win.
  So spread order matters.
*/


// --------------------------------------------------
// 4. MUTATION VS NEW OBJECT
// --------------------------------------------------

const product = {
  name: "Keyboard",
  price: 50
};

// Mutation:
product.price = 60;


// New object:
const updatedProduct = {
  ...product,
  price: 70
};

/*
  Mutation changes the existing object.

  Spread creates a new object.
*/


// --------------------------------------------------
// 5. PRACTICAL FUNCTION
// --------------------------------------------------

type Order = {
  id: number;
  status:
    "NEW"
    | "IN_PROGRESS"
    | "COMPLETED";
};


function completeOrder(
  order: Order
): Order {

  return {
    ...order,
    status: "COMPLETED"
  };
}

const order: Order = {
  id: 101,
  status: "IN_PROGRESS"
};

const completedOrder =
  completeOrder(order);

console.log(
  order.status
); // IN_PROGRESS


console.log(
  completedOrder.status
); // COMPLETED


/*
  The original object
  was not changed.
*/


// --------------------------------------------------
// 6. SHALLOW COPY
// --------------------------------------------------

const customer = {
  name: "Alice",

  address: {
    city: "Duisburg"
  }
};


const copiedCustomer = {
  ...customer
};


/*
  Important:

  spread creates a new outer object.
  But nested objects are still shared.
*/


copiedCustomer.address.city =
  "Berlin";

console.log(
  customer.address.city
); // Berlin


/*
  Why?

  customer.address

  and

  copiedCustomer.address

  still refer to
  the same nested object.
*/


// --------------------------------------------------
// 7. COPYING A NESTED OBJECT TOO
// --------------------------------------------------

const safelyUpdatedCustomer = {
  ...customer,

  address: {
    ...customer.address,
    city: "Hamburg"
  }
};

console.log(
  safelyUpdatedCustomer.address.city
); // Hamburg

console.log(
  customer.address.city
); // Berlin

/*
  If we want to update a nested object independently,

  we must spread that nested object too.
*/
