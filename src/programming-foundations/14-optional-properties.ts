/*
  OPTIONAL PROPERTIES

  Until now, our object types required every property.

  type User = {
    username: string;
    active: boolean;
  };

  This means BOTH properties are required. But real data is not always complete.
  Sometimes a property may exist. Sometimes it may not exist.

  TypeScript lets us describe this with: ?
*/

// --------------------------------------------------
// 1. REQUIRED PROPERTIES
// --------------------------------------------------

type User = {
  username: string;
  active: boolean;
};

const firstUser: User = {
  username: "alice",
  active: true
};
console.log(firstUser);

// --------------------------------------------------
// 2. MAKING A PROPERTY OPTIONAL
// --------------------------------------------------

type Customer = {
  name: string;
  phone?: string;
};

/*
  phone?: string --> phone is optional.
  The object MAY contain: phone
  But it does not have to.
*/

// --------------------------------------------------
// 3. OBJECT WITH - WITHOUT OPTIONAL PROPERTY
// --------------------------------------------------

const customerWithPhone: Customer = {
  name: "Ayse",
  phone: "123456"
};

const customerWithoutPhone: Customer = {
  name: "Mehmet"
};

console.log(customerWithPhone);
console.log(customerWithoutPhone);

// --------------------------------------------------
// 4. REQUIRED VS OPTIONAL
// --------------------------------------------------

type Profile = {
  username: string;
  email: string;
  bio?: string;
};

const profileOne: Profile = {
  username: "alice",
  email: "alice@example.com"
};

const profileTwo: Profile = {
  username: "bob",
  email: "bob@example.com",
  bio: "Software learner"
};

console.log(profileOne);
console.log(profileTwo);

// --------------------------------------------------
// 5. READING AN OPTIONAL PROPERTY
// --------------------------------------------------

console.log(profileTwo.bio); // Software learner
console.log(profileOne.bio); // undefined

// If an optional property does not exist, reading it produces: undefined

// --------------------------------------------------
// 6. WHAT IS undefined?
// --------------------------------------------------

const exampleObject = {
  name: "Book"
};
console.log(exampleObject.name); // Book
/*
  But if a property is optional and missing, 
  TypeScript knows its value may be: undefined
  So optional properties introduce another possible value state.
*/

// --------------------------------------------------
// 9. TYPESCRIPT REMEMBERS THIS POSSIBILITY
// --------------------------------------------------

type Product = {
  name: string;
  description?: string;
};

const product: Product = {
  name: "Keyboard"
};

/*
  product.description is NOT simply: string
  It is effectively: string | undefined

  Because description may exist, or may be missing.
*/

// --------------------------------------------------
// 10. USING AN OPTIONAL PROPERTY DIRECTLY
// --------------------------------------------------

const description =
  product.description;

console.log(description); // undefined

/*
  This is safe. We are only reading the value.
  But using string-specific behavior requires more care.
*/

// --------------------------------------------------
// 11. THE PROBLEM
// --------------------------------------------------

/*
  This would be unsafe:             product.description.toUpperCase();
  Because description might be:     undefined
  And undefined does not have:      .toUpperCase()
*/

// --------------------------------------------------
// 12. CHECK BEFORE USING
// --------------------------------------------------

if (product.description) {
  console.log(
    product.description.toUpperCase()
  );
}

/*
  Inside this if block,
  TypeScript knows: product.description
    exists as a usable string.
*/

// --------------------------------------------------
// 13. FOLLOW THE CONDITION
// --------------------------------------------------

/*
  product.description
  could be: "Mechanical keyboard" or: undefined

  If it contains a string:
  if (product.description) becomes truthy and the block runs.

  If it is undefined:
  the block is skipped.
*/

// --------------------------------------------------
// 14. EXPLICIT undefined CHECK
// --------------------------------------------------

type Settings = {
  theme?: string;
};
const settings: Settings = {};

if (
  settings.theme !== undefined
) {

  console.log(
    settings.theme.toUpperCase()
  );
}

/*
  This check is more explicit.
  We are asking: "Is theme different from undefined?"
*/

// --------------------------------------------------
// 15. OPTIONAL PROPERTY IN A FUNCTION
// --------------------------------------------------

type Message = {
  text: string;
  sender?: string;
};

function printMessage(
  message: Message
): void {

  console.log(message.text);

  if (message.sender) {
    console.log(message.sender);
  }
}

printMessage({
  text: "Hello"
});

printMessage({
  text: "Hi",
  sender: "Alice"
});

// --------------------------------------------------
// 16. DEFAULT VALUE WITH ??
// --------------------------------------------------

type Account = {
  username: string;
  displayName?: string;
};

const account: Account = {
  username: "selman"
};

const visibleName =
  account.displayName ??
  account.username;

console.log(visibleName); // selman

/*
  ?? is the nullish coalescing operator.

  For now, think of it as:
  "Use the value on the left, unless it is null or undefined."

  account.displayName -> undefined
  account.username is used instead.
*/

// --------------------------------------------------
// 17. OPTIONAL PROPERTY WITH A DEFAULT
// --------------------------------------------------

const secondAccount: Account = {
  username: "alice",
  displayName: "Alice A."
};

const secondVisibleName =
  secondAccount.displayName ??
  secondAccount.username;

console.log(secondVisibleName); // Alice A.

/*
  This time: displayName exists.
  So the left value is used.
*/

// --------------------------------------------------
// 18. OPTIONAL CHAINING
// --------------------------------------------------

type UserWithAddress = {
  name: string;

  address?: {
    city: string;
  };
};

const userWithoutAddress: UserWithAddress = {
  name: "Mehmet"
};

// address itself may not exist.

const city =
  userWithoutAddress.address?.city;

console.log(city); // undefined

/*
  ?. is called optional chaining.

  userWithoutAddress.address?.city

  "If address exists, read city.
   Otherwise return undefined."
*/


// --------------------------------------------------
// 19. WITHOUT OPTIONAL CHAINING
// --------------------------------------------------

if (
  userWithoutAddress.address
) {

  console.log(
    userWithoutAddress.address.city
  );
}
// This is also valid. We manually check first.

// --------------------------------------------------
// 20. WITH OPTIONAL CHAINING
// --------------------------------------------------

const maybeCity =
  userWithoutAddress.address?.city;
console.log(maybeCity);
// Optional chaining is useful when we only want to safely read a nested value.

// --------------------------------------------------
// 21. OPTIONAL PROPERTY INSIDE ARRAYS
// --------------------------------------------------

type Book = {
  title: string;
  rating?: number;
};

const books: Book[] = [
  {
    title: "Book A",
    rating: 5
  },
  {
    title: "Book B"
  },
  {
    title: "Book C",
    rating: 4
  }
];
console.log(books);

// --------------------------------------------------
// 22. MAP WITH OPTIONAL PROPERTY
// --------------------------------------------------

const ratings =
  books.map(
    (book: Book) =>
      book.rating
  );
console.log(ratings);

// --------------------------------------------------
// 23. FILTERING OBJECTS WITH OPTIONAL VALUES
// --------------------------------------------------

const ratedBooks =
  books.filter(
    (book: Book) =>
      book.rating !== undefined
  );
console.log(ratedBooks);

// --------------------------------------------------
// 24. OPTIONAL DOES NOT MEAN ANY TYPE
// --------------------------------------------------

type Item = {
  name: string;
  discount?: number;
};

const itemOne: Item = {
  name: "Shirt",
  discount: 10
};


/*
  This is valid.
  discount is optional, but if it exists, it must be a number.
*/

/*
  This would be incorrect:

  const itemTwo: Item = {
    name: "Bag",
    discount: "ten"
  };

  Optional means: may be missing
  NOT: may contain any type.
*/

// --------------------------------------------------
// 25. OPTIONAL VS REQUIRED
// --------------------------------------------------

type Order = {
  id: number;
  note?: string;
};

const orderOne: Order = {
  id: 1
};

const orderTwo: Order = {
  id: 2,
  note: "Call customer"
};
console.log(orderOne);
console.log(orderTwo);

// --------------------------------------------------
// 26. COMPLETE EXAMPLE
// --------------------------------------------------

type CustomerOrder = {
  id: number;

  customer: {
    name: string;
    phone?: string;
  };

  note?: string;
};

const order: CustomerOrder = {
  id: 1001,

  customer: {
    name: "Ayse"
  }
};

function printOrderInfo(
  order: CustomerOrder
): void {

  console.log(
    order.customer.name
  );

  const phone =
    order.customer.phone ??
    "No phone";
  console.log(phone);


  const note =
    order.note ??
    "No note";
  console.log(note);
}

printOrderInfo(order);

/*
  Output:

  Ayse
  No phone
  No note

  The object is still valid even though phone and note are missing.
  Because their types say:
  phone?: string
  note?: string
*/


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  MENTAL MODEL
  required property: "This value must be here."
  optional property: "This value may be here."

  And if it may not exist, our code must be prepared for that possibility.
*/