/*
  OBJECT DESTRUCTURING

  Object destructuring lets us extract
  properties from an object into variables.
*/


// --------------------------------------------------
// 1. NORMAL PROPERTY ACCESS
// --------------------------------------------------

const user = {
  name: "Alice",
  age: 30,
  city: "Duisburg"
};


const userName =
  user.name;

const userAge =
  user.age;


console.log(
  userName,
  userAge
);


// --------------------------------------------------
// 2. DESTRUCTURING
// --------------------------------------------------

const {
  name,
  age
} = user;


console.log(
  name,
  age
);


/*
  This:

  const {
    name,
    age
  } = user;


  is roughly the same as:

  const name = user.name;
  const age = user.age;
*/


// --------------------------------------------------
// 3. WE ONLY TAKE WHAT WE NEED
// --------------------------------------------------

const {
  city
} = user;


console.log(
  city
);


/*
  We do not need to extract
  every property.
*/


// --------------------------------------------------
// 4. RENAMING A VARIABLE
// --------------------------------------------------

const account = {
  username: "alice",
  active: true
};


const {
  username: accountUsername
} = account;


console.log(
  accountUsername
);


/*
  username
  -> property name

  accountUsername
  -> new variable name
*/


// --------------------------------------------------
// 5. DESTRUCTURING IN A FUNCTION
// --------------------------------------------------

type Product = {
  name: string;
  price: number;
};


function printProduct(
  product: Product
): void {

  const {
    name,
    price
  } = product;


  console.log(
    name,
    price
  );
}


printProduct({
  name: "Keyboard",
  price: 50
});


// --------------------------------------------------
// 6. DESTRUCTURING DIRECTLY IN PARAMETERS
// --------------------------------------------------

function getProductLabel(
  {
    name,
    price
  }: Product
): string {

  return (
    name +
    " - " +
    price
  );
}


console.log(
  getProductLabel({
    name: "Mouse",
    price: 20
  })
);


/*
  Instead of:

  product.name
  product.price


  the function receives the properties directly.
*/


// --------------------------------------------------
// 7. OPTIONAL PROPERTY + DEFAULT VALUE
// --------------------------------------------------

type Customer = {
  name: string;
  city?: string;
};

const customer: Customer = {
  name: "Bob"
};


const {
  name: customerName,
  city: customerCity = "Unknown"
} = customer;


console.log(
  customerName,
  customerCity
);


/*
  If city is undefined,

  customerCity gets:

  "Unknown"
*/


// --------------------------------------------------
// 8. NESTED DESTRUCTURING
// --------------------------------------------------

const order = {
  id: 101,

  customer: {
    name: "Alice",
    city: "Duisburg"
  }
};


const {
  customer: {
    name: orderCustomerName
  }
} = order;


console.log(
  orderCustomerName
);


/*
  We reached:

  order.customer.name

  directly through destructuring.
*/


// --------------------------------------------------
// 9. REST
// --------------------------------------------------

const productWithId = {
  id: 1,
  name: "Keyboard",
  price: 50
};

const {
  id,
  ...productWithoutId
} = productWithId;


console.log(
  id
);

console.log(
  productWithoutId
);


/*
  Here ... means REST.

  id is extracted.

  All remaining properties
  are collected into:

  productWithoutId
*/


// --------------------------------------------------
// CORE IDEA

/*
  NORMAL ACCESS: const name = user.name;

  DESTRUCTURING: const { name } = user;

  RENAMING: const { name: userName } = user;

  DEFAULT VALUE: const { city = "Unknown" } = user;

  REST: const { id, ...remaining } = object;

*/