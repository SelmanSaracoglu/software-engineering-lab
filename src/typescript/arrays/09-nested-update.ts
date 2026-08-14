const product = {
  id: 1,
  name: "Dress",
  details: {
    color: "Black",
    size: "M"
  }
};


// Copy the outer object, copy the nested object, then override the nested property.

const updatedProduct = {
  ...product,
  details: {
    ...product.details,
    color: "Blue"
  }
};

console.log("Original:", product);
console.log("Updated:", updatedProduct);