const products = [
  { name: "Dress", price: 50 },
  { name: "Skirt", price: 30 },
  { name: "Shirt", price: 20 },
];

//Keep the product, update the price.
const productsWithTax = products.map(product => {
  return {
    ...product, // Copy the existing object, then override the property you want to change.
    price: product.price * 1.2
  };
});

console.log(products);
console.log(productsWithTax);