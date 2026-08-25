// MAP() WITH OBJECTS
//
// map() can also work with arrays of objects.
//
// In this example, each array item is a product object.

const products = [
  { name: "Dress", price: 50 },
  { name: "Skirt", price: 30 },
  { name: "Shirt", price: 20 }
];


// product is the callback parameter.
//
// map() provides one product object at a time.
//
// First call:
// product = { name: "Dress", price: 50 }
//
// Second call:
// product = { name: "Skirt", price: 30 }
//
// Third call:
// product = { name: "Shirt", price: 20 }

const productsWithTax = products.map((product) => {
  return {
    ...product,
    price: product.price * 1.2
  };
});

console.log(products);

console.log(productsWithTax);


// The callback receives an entire object, not only one property.
//
// product -> current product object
// product.price -> price property of the current product


// The callback returns a new object. map() collects each returned object into a new array.


// The same callback could be written as a separately named function.

function addTaxToProduct(product: {
  name: string;
  price: number;
}) {
  return {
    ...product,
    price: product.price * 1.2
  };
}

const productsWithTaxAgain = products.map(addTaxToProduct);

console.log(productsWithTaxAgain);