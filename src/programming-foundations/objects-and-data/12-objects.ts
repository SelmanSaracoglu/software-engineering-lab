//  OBJECTS

// 1. SEPARATE VALUES
// --------------------------------------------------
// These values describe the same product. But right now they are stored separately.

const productName = "Keyboard";
const productPrice = 50;
const productAvailable = true;

// 2. GROUPING VALUES INTO AN OBJECT
// --------------------------------------------------

const product = {
  name: "Keyboard",
  price: 50,
  available: true
};
console.log(product);

/*
  product is ONE value. That value is an object.

  Inside the object we have:
  name
  price
  available

  These are called PROPERTIES.
*/

// 3. PROPERTY NAME AND PROPERTY VALUE
// --------------------------------------------------

const user = {
  username: "selman",
  age: 32,
  active: true
};

/*
  Look at: username: "selman"
  username: property name
  "selman": property value

  The same pattern exists here:
  age: 32
  active: true
*/

// 4. READING A PROPERTY
// --------------------------------------------------

console.log(user.username); // selman
console.log(user.age); // 32
console.log(user.active); // true

/*
  Dot notation: object.property
  "Go to the user object and read its username property."
*/

// 5. PROPERTY VALUES STILL HAVE TYPES
// --------------------------------------------------

const example = {
  title: "Book",
  price: 20,
  available: false
};

const title = example.title;
const price = example.price;
const available = example.available;

console.log(typeof title); // string
console.log(typeof price); // number
console.log(typeof available); // boolean

/*
  Objects do not remove types. Each property still contains a value.
  And that value still has a type.
*/

// 6. USING OBJECT VALUES IN EXPRESSIONS
// --------------------------------------------------

const item = {
  price: 25,
  quantity: 4
};

const total =
  item.price *
  item.quantity;

console.log(total); // 100

// 7. USING OBJECT VALUES IN CONDITIONS
// --------------------------------------------------

const account = {
  username: "alice",
  active: true
};

if (account.active) {
  console.log("Account is active");
}

// 8. COMPARING A PROPERTY
// --------------------------------------------------

const order = {
  id: 101,
  status: "NEW"
};

if (order.status === "NEW") {
  console.log("New order");
}

// 9. OBJECTS CAN CONTAIN DIFFERENT TYPES
// --------------------------------------------------

const customer = {
  name: "Ayse",
  age: 28,
  verified: true,
  balance: 150.50
};
console.log(customer);

// 10. PROPERTY NAMES SHOULD DESCRIBE THE DATA
// --------------------------------------------------

const betterProduct = {
  name: "Monitor",
  price: 200,
  available: true
};

// 11. CHANGING A PROPERTY
// --------------------------------------------------

const profile = {
  name: "Mehmet",
  active: false
};

profile.active = true;
console.log(profile.active); // true


/*
  Important: 
  profile was created with const.

  But we changed: 
  profile.active

  How is that possible?
  const prevents us from assigning a completely different value to: profile
  But the properties inside the object can still be changed.
*/

// 12. CONST OBJECT DOES NOT MEAN IMMUTABLE OBJECT
// --------------------------------------------------

const settings = {
  darkMode: false
};
settings.darkMode = true; // This is allowed.
console.log(settings); // { darkMode: true }

/*
  But this would NOT be allowed:

  settings = {
    darkMode: false
  };

  Because that would replace the entire value stored in the settings variable.
*/

// 13. ADDING VALUES FROM VARIABLES
// --------------------------------------------------

const name = "Mouse";
const unitPrice = 20;

const newProduct = {
  name: name,
  price: unitPrice
};

console.log(newProduct);

/*
  Property value does not need to be written directly.
  It can come from a variable.
*/

// 14. PROPERTY SHORTHAND
// --------------------------------------------------

const city = "Duisburg";
const country = "Germany";

const address = {
  city,
  country
};
console.log(address);

/*
  This: { city, country }
  is shorthand for:
  {
    city: city,
    country: country
  }
  We can use shorthand when the variable name and property name are the same.
*/

// 15. OBJECT AS A FUNCTION ARGUMENT
// --------------------------------------------------

function printProductName(
  product: {
    name: string;
    price: number;
  }
): void {

  console.log(product.name);
}

const laptop = {
  name: "Laptop",
  price: 900
};

printProductName(laptop); // Laptop

/*
  The function receives an OBJECT.
  Inside the function:  product is the parameter.
                        laptop is the argument.

  So conceptually:      product = laptop
  Then:                 product.name -> "Laptop"
*/

// 16. READING MULTIPLE PROPERTIES IN A FUNCTION
// --------------------------------------------------

function calculateItemTotal(
  item: {
    price: number;
    quantity: number;
  }
): number {

  return (
    item.price *
    item.quantity
  );
}

const basketItem = {
  price: 15,
  quantity: 3
};

const basketTotal =
  calculateItemTotal(
    basketItem
  );
console.log(basketTotal); // 45

// 17. THE OBJECT SHAPE
// --------------------------------------------------

function showUser(
  user: {
    username: string;
    active: boolean;
  }
): void {

  console.log(user.username);
  console.log(user.active);
}

/*
  This part describes the SHAPE of the object.

  the object must have:
  username -> string
  active -> boolean
*/

const firstUser = {
  username: "alice",
  active: true
};

showUser(firstUser);

// 18. TYPESCRIPT CHECKS THE SHAPE
// --------------------------------------------------

const secondUser = {
  username: "bob",
  active: false
};

showUser(secondUser);


/*
  This works because secondUser has:
  username: string
  active: boolean

  It matches the shape by showUser.
*/

// 19. OBJECTS INSIDE ARRAYS
// --------------------------------------------------

const products = [
  {
    name: "Keyboard",
    price: 50
  },
  {
    name: "Mouse",
    price: 20
  }
];

console.log(
  products[0]
);

/*
  The array contains objects.
  Each item is a complete object.
*/

// 20. ARRAY CALLBACK RECEIVES ONE OBJECT
// --------------------------------------------------

const productNames =
  products.map(
    (product) =>
      product.name
  );

console.log(productNames); // ["Keyboard", "Mouse"]

/*
  Now this should be easier to read.

  First callback call:
  product = {
    name: "Keyboard",
    price: 50
  }
  product.name -> "Keyboard"


  Second callback call:
  product = {
    name: "Mouse",
    price: 20
  }
  product.name -> "Mouse"
*/

// 21. FILTERING OBJECTS
// --------------------------------------------------

const expensiveProducts =
  products.filter(
    (product) =>
      product.price >= 30
  );

console.log(expensiveProducts);


/*
  filter receives each WHOLE object.

  Then we inspect one property: product.price
  Keyboard:     50 >= 30    -> true     -> keep whole Keyboard object
  Mouse:        20 >= 30    -> false    -> remove whole Mouse object
*/

// 22. NESTED OBJECTS
// --------------------------------------------------

const orderWithCustomer = {
  id: 1001,

  customer: {
    name: "Ayse",
    city: "Duisburg"
  }
};


console.log(
  orderWithCustomer.customer
);


console.log(
  orderWithCustomer.customer.name
); // Ayse

/*
  customer is itself an object.

  First: orderWithCustomer.customer
  gives:

  {
    name: "Ayse",
    city: "Duisburg"
  }


  Then: .name
  gives:

  "Ayse"
*/

// 23. FOLLOW A NESTED PROPERTY
// --------------------------------------------------

/*
  orderWithCustomer.customer.name

  Read from left to right:
  orderWithCustomer                 -> main object
  orderWithCustomer.customer        -> customer object
  orderWithCustomer.customer.name   -> "Ayse"
*/

// 24. OBJECT INSIDE OBJECT INSIDE OBJECT
// --------------------------------------------------

const company = {
  name: "Example Ltd",

  address: {
    city: "Duisburg",

    country: {
      name: "Germany",
      code: "DE"
    }
  }
};

console.log(
  company.address.country.code
); // DE

// 25. COMPLETE EXAMPLE
// --------------------------------------------------

const orderExample = {
  id: 5001,
  status: "NEW",

  customer: {
    name: "Ali",
    city: "Duisburg"
  },

  item: {
    name: "Shirt",
    price: 30,
    quantity: 2
  }
};

function calculateOrderTotal(
  order: {
    item: {
      price: number;
      quantity: number;
    };
  }
): number {

  return (
    order.item.price *
    order.item.quantity
  );
}

const orderTotal =
  calculateOrderTotal(
    orderExample
  );

console.log(
  orderExample.customer.name
); // Ali

console.log(
  orderExample.status
); // NEW

console.log(orderTotal); // 60


/*
  One object now represents several related pieces of data.
  Objects allow us to represent structured data.

  orderExample
       |
       |-- id
       |
       |-- status
       |
       |-- customer
       |      |
       |      |-- name
       |      |
       |      |-- city
       |
       |-- item
              |
              |-- name
              |
              |-- price
              |
              |-- quantity
*/

// CORE IDEA
// --------------------------------------------------

/*
  OBJECT: A value that groups related values together.
  PROPERTY: A named value inside an object.
  DOT NOTATION: object.property
  NESTED OBJECT: 

  const user = {
    address: {
      city: "Duisburg"
    }
  };

  user.address.city -> "Duisburg"

  Most importantly: an object is still ONE value.
  It simply contains multiple related named values inside it.
*/