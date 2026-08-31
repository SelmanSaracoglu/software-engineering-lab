/*
  ARRAY INDEX ACCESS

  Arrays store values in order.
  Each position has an index.
  Indexes start at 0.
*/


// --------------------------------------------------
// 1. READING BY INDEX
// --------------------------------------------------

const names = [
  "Alice",
  "Bob",
  "Charlie"
];

console.log(
  names[0]
); // Alice

console.log(
  names[1]
); // Bob

/*
  Indexes start at: 0

  names[0] -> first item
  names[1] -> second item
*/

// --------------------------------------------------
// 2. ARRAY LENGTH
// --------------------------------------------------

console.log(
  names.length
); // 3

/*
  length tells us how many items exist.
  Last valid index: length - 1
*/

const lastName =
  names[
    names.length - 1
  ];

console.log(
  lastName
); // Charlie


// --------------------------------------------------
// 3. AN INDEX MAY NOT EXIST
// --------------------------------------------------

const unknownName =
  names[10];

console.log(
  unknownName
); // undefined

/*
  JavaScript does not throw an error when the index does not exist.
  It returns: undefined
*/

// --------------------------------------------------
// 4. TYPESCRIPT AND STRICT INDEX ACCESS
// --------------------------------------------------

const firstName =
  names[0];

/*
  In this project, noUncheckedIndexedAccess is enabled.

  So TypeScript treats firstName as: string | undefined

  Why?
  The array type says: "This array contains strings."
  But it does NOT guarantee: "Index 0 definitely exists."
*/

// --------------------------------------------------
// 5. CHECK BEFORE USING THE VALUE
// --------------------------------------------------

if (
  firstName !== undefined
) {

  console.log(
    firstName.toUpperCase()
  );
}

/*
  Before the check: string | undefined
  After the check: string
  This is type narrowing.
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
  },
  {
    id: 2,
    name: "Mouse"
  }
];

const firstProduct =
  products[0];

if (
  firstProduct === undefined
) {

  console.log(
    "No product found"
  );

} else {

  console.log(
    firstProduct.name
  );
}

// --------------------------------------------------
// 7. INDEX ACCESS VS ARRAY CALLBACKS
// --------------------------------------------------

products.map(
  (product) =>
    product.name
);


/*
  Important difference: products[0] -> Product | undefined

  But inside map: product -> Product

  map only calls the callback for items that actually exist.
*/


// --------------------------------------------------
// 8. PRACTICAL FUNCTION
// --------------------------------------------------

function getProductByIndex(
  products: Product[],
  index: number
): Product | undefined {

  return products[index];
}


const selectedProduct =
  getProductByIndex(
    products,
    1
  );


if (
  selectedProduct !== undefined
) {

  console.log(
    selectedProduct.name
  );
}


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  Array type: Product[]

  "If an item exists, it is a Product."
  It does NOT mean: "Every index definitely exists."

  So direct index access: products[index]
  can produce: Product | undefined
*/
