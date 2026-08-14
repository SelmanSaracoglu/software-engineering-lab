
// Copy the object, then override the property.
// Spread copies. It does not update.
// Do not mutate the original value.
// Spread copies the object; the later property overrides the copied value.
// Spread expands existing values into a new structure. 
// What comes around it determines whether we copy, add, override, or combine.

const product = {
  id: 1,
  name: "Dress",
  price: 50,
  stock: 8
};

const updatedProduct = {
  ...product,
  stock: 12
};

console.log("Original:", product);
console.log("Updated:", updatedProduct);