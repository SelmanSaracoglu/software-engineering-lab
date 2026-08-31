/*
  OBJECT TYPES

  In the previous lesson, we learned that an object groups related values together.
  But TypeScript also needs to understand: 
  "What shape should this object have?"
  We can describe that shape with a TYPE.

  const product = {
    name: "Keyboard",
    price: 50,
    available: true
  };
*/

// 1. REPEATING AN OBJECT SHAPE
// --------------------------------------------------

function printProduct(
  product: {
    name: string;
    price: number;
    available: boolean;
  }
): void {

  console.log(product.name);
  console.log(product.price);
  console.log(product.available);
}
// This is an object TYPE. It describes the expected shape.

// 2. VALUE VS TYPE
// --------------------------------------------------

const firstProduct = {
  name: "Keyboard",
  price: 50,
  available: true
};
// This is an OBJECT VALUE. They look similar, but they have different jobs.

// 3. OBJECT VALUE
// --------------------------------------------------

const exampleProduct = {
  name: "Mouse",
  price: 20,
  available: false
};

/*
  property name -> name
  actual value -> "Mouse"
*/

// 4. OBJECT TYPE
// --------------------------------------------------

let anotherProduct: {
  name: string;
  price: number;
  available: boolean;
};

anotherProduct = {
  name: "Monitor",
  price: 200,
  available: true
};
console.log(anotherProduct);

// 5. TYPESCRIPT CHECKS THE SHAPE
// --------------------------------------------------

let user: {
  username: string;
  active: boolean;
};

user = {
  username: "alice",
  active: true
};
console.log(user);

// 6. WRONG PROPERTY TYPE
/*
  This would be incorrect: Because the type says:
  active: boolean

  user = {
    username: "alice",
    active: "yes"
  };
*/

// 7. MISSING PROPERTY
/*
  This would also be incorrect:

  user = {
    username: "alice"
  };

  The type requires:
  username
  AND
  active

  So active cannot simply disappear.
*/

// 8. THE PROBLEM WITH REPEATING TYPES
// --------------------------------------------------

function showProductName(
  product: {
    name: string;
    price: number;
    available: boolean;
  }
): void {

  console.log(product.name);
}

function calculateDiscount(
  product: {
    name: string;
    price: number;
    available: boolean;
  }
): number {

  return product.price * 0.8;
}


/*
  Notice the repetition. We wrote this shape twice:
  {
    name: string;
    price: number;
    available: boolean;
  }
  If many functions use the same kind of object, repeating the entire shape becomes inconvenient.
*/

// 9. GIVING THE TYPE A NAME

type Product = {
  name: string;
  price: number;
  available: boolean;
};

/*
  Read this as:
  "Create a type called Product."

  Product describes an object with:
  name -> string
  price -> number
  available -> boolean
*/

// 10. USING THE NAMED TYPE

const keyboard: Product = {
  name: "Keyboard",
  price: 50,
  available: true
};

const mouse: Product = {
  name: "Mouse",
  price: 20,
  available: false
};

console.log(keyboard);
console.log(mouse);

/*
  Product is NOT an object.
  Product is a TYPE.

  keyboard is an object value.
  mouse is another object value.

  Both values must the Product type.
*/

// 11. ONE TYPE, MANY VALUES
// --------------------------------------------------

const monitor: Product = {
  name: "Monitor",
  price: 200,
  available: true
};

const laptop: Product = {
  name: "Laptop",
  price: 900,
  available: false
};

// 12. TYPE IS NOT A VALUE
// --------------------------------------------------

type Account = {
  username: string;
  active: boolean;
};

const account: Account = {
  username: "bob",
  active: true
};

/*
  Account exists for TypeScript's type system.
  account is the actual runtime value.

  Think:    Account -> description / shape
            account -> actual data
*/
console.log(account);


// 13. USING A TYPE IN A FUNCTION PARAMETER
// --------------------------------------------------

function printAccount(
  account: Account
): void {

  console.log(account.username);
  console.log(account.active);
}

const adminAccount: Account = {
  username: "admin",
  active: true
};

printAccount(adminAccount);


/*
  Instead of writing:

  account: {
    username: string;
    active: boolean;
  }

  we can simply write: account: Account
  Much easier to read.
*/


// 14. FOLLOW THE FUNCTION CALL
// --------------------------------------------------

/*
  We call: printAccount(adminAccount)

  adminAccount is:
  {
    username: "admin",
    active: true
  }

  It matches:                   Account
  Then inside the function:     account = adminAccount
  So:                           account.username -> "admin"
*/

// 15. FUNCTION RETURNING AN OBJECT TYPE
// --------------------------------------------------

type Customer = {
  name: string;
  city: string;
};

function createCustomer(): Customer {

  return {
    name: "Ayse",
    city: "Duisburg"
  };
}

const customer =
  createCustomer();

console.log(customer);

/*
  : Customer

  after the function parentheses means:
  this function must return a value matching Customer.
*/

// 16. FOLLOW THE RETURN TYPE

/*
  Customer requires:
  {
    name: string;
    city: string;
  }

  createCustomer returns:
  {
    name: "Ayse",
    city: "Duisburg"
  }

  That object matches Customer. So TypeScript accepts it.
*/


// 17. FUNCTION RECEIVES AND RETURNS OBJECT TYPES
// --------------------------------------------------

type Item = {
  name: string;
  price: number;
};

function applyDiscount(
  item: Item
): Item {

  return {
    name: item.name,
    price: item.price * 0.8
  };
}

const originalItem: Item = {
  name: "Shirt",
  price: 100
};

const discountedItem =
  applyDiscount(originalItem);

console.log(discountedItem);

/*
  Input: Item
  Output: Item

  The actual values may change. But the object still has the same shape.
*/

// 18. TYPES CAN CONTAIN OTHER TYPES

type Address = {
  city: string;
  country: string;
};

type Person = {
  name: string;
  address: Address;
};

/*
  Person has:
  name -> string
  address -> Address

  And Address itself means:
  {
    city: string;
    country: string;
  }
*/

const person: Person = {
  name: "Mehmet",

  address: {
    city: "Duisburg",
    country: "Germany"
  }
};

console.log(
  person.address.city
); // Duisburg

// 19. FOLLOW THE NESTED TYPE
// --------------------------------------------------

/*
  person must match: 
    Person
  Person says: 
    address: Address

  Address says:
    city: string
    country: string

  So TypeScript understands: person.address.city is a string.
*/

// 20. ARRAYS OF A TYPE
// --------------------------------------------------

type Book = {
  title: string;
  price: number;
};

const books: Book[] = [
  {
    title: "Book A",
    price: 10
  },
  {
    title: "Book B",
    price: 20
  },
  {
    title: "Book C",
    price: 30
  }
];
console.log(books);

/*
  Book[]                --> an ARRAY containing Book values.
  Each item must match  --> Book
*/

// 21. MAP NOW BECOMES EASIER TO READ
// --------------------------------------------------

const bookTitles =
  books.map(
    (book: Book) =>
      book.title
  );

console.log(bookTitles); // ["Book A", "Book B", "Book C"]


/*
  book: Book

  every time the callback runs, book contains one object matching the Book type.

  Therefore TypeScript knows:
  book.title -> string
  book.price -> number
*/


// 22. FILTER WITH A NAMED OBJECT TYPE
// --------------------------------------------------

const expensiveBooks =
  books.filter(
    (book: Book) =>
      book.price >= 20
  );
console.log(expensiveBooks);


/*
  filter still works exactly as before.
  The only difference is that the object shape now has a name:

  Book
*/

// 23. TYPE INFERENCE STILL EXISTS
// --------------------------------------------------

const inferredBook = {
  title: "TypeScript Basics",
  price: 25
};

/*
  We did NOT write:
  : Book
  But TypeScript can still inspect the value and infer its structure.

  It can see:
  title -> string
  price -> number
*/
console.log(inferredBook.title);


// 24. EXPLICIT TYPE CAN EXPRESS OUR INTENTION
// --------------------------------------------------

const explicitBook: Book = {
  title: "JavaScript Basics",
  price: 30
};

/*
  Here we explicitly say: "This value is supposed to be a Book."
  TypeScript can now check the object against the Book type.
*/
console.log(explicitBook);

// 25. TYPE ALIASES ARE NOT ONLY FOR OBJECTS
// --------------------------------------------------

type Username = string;

const username: Username =
  "alice";
console.log(username);

/*
  type can give a name to other types too.

  Username is another name for: string

  But object types are one of the places where named types become especially useful.
*/

// 26. COMPLETE EXAMPLE
// --------------------------------------------------

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  status: string;
  item: OrderItem;
};

const order: Order = {
  id: 1001,
  status: "NEW",

  item: {
    name: "Shirt",
    price: 30,
    quantity: 2
  }
};

function calculateOrderTotal(
  order: Order
): number {

  return (
    order.item.price *
    order.item.quantity
  );
}

const total = calculateOrderTotal(order);
console.log(total); // 60