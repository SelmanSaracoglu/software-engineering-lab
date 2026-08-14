
// Expand the first array, then expand the second array.


const summerProducts = [
  { id: 1, name: "Dress" },
  { id: 2, name: "Skirt" }
];

const winterProducts = [
  { id: 3, name: "Coat" },
  { id: 4, name: "Sweater" }
];

const allProducts = [
  ...summerProducts,
  ...winterProducts
];

console.log("Summer:", summerProducts);
console.log("Winter:", winterProducts);
console.log("Combined:", allProducts);