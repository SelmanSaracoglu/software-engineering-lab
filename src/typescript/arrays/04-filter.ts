const products = [
  { id: 1, name: "Dress", price: 50 },
  { id: 2, name: "Skirt", price: 30 },
  { id: 3, name: "Shirt", price: 20 },
];

// Keep what matches, remove what does not.
const remainingProducts = products.filter(product => {
  if (product.id !== 2) {
    return true;
  }
  return false;
});



/*

const remainingProducts = products.filter(product => {
  return product.id !== 2;
});


const remainingProducts = products.filter(
  product => product.id !== 2
);

*/

console.log(products);
console.log(remainingProducts);
