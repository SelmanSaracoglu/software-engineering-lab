
// Copy the existing array, then append the new item.

const products = [
  { id: 1, name: "Dress", price: 50 },
  { id: 2, name: "Skirt", price: 30 },
];

const newProduct = {
  id: 3,
  name: "Shirt",
  price: 20
};

const updatedProducts = [...products, newProduct];

console.log("Original:", products);
console.log("Updated:", updatedProducts);