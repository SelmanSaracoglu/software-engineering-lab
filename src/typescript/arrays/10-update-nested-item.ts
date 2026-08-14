const products = [
  {
    id: 1,
    name: "Dress",
    details: {
      color: "Black",
      size: "M"
    }
  },
  {
    id: 2,
    name: "Skirt",
    details: {
      color: "Beige",
      size: "S"
    }
  }
];
const updatedProducts = products.map(product => {
    if (product.id === 2) {
        return {
            ...product,
            details: {
                ...product.details,
                color: "Blue"
            }
        };
    }
    return product;
});

console.log("Original:", products);
console.log("Updated:", updatedProducts);