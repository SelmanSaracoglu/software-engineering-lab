const products = [
  { id: 1, name: "Dress", price: 50 },
  { id: 2, name: "Skirt", price: 30 },
  { id: 3, name: "Shirt", price: 20 },
];

// Check each item. Update the matching one, return the others unchanged.
const updatedProducts = products.map(product => {
    if (product.id === 2) {
        return {
            ...product, // Copy the existing object, then override the property you want to change.
            price: 35
        };
    }
    return product;
});

const updatedProducts2 = products.map(product => {
    if (product.id === 3) {
        return {
            ...product, // Copy the existing object, then override the property you want to change.
            price: product.price * 1.1
        };
    }
    return product;
});

console.log(products);
console.log(updatedProducts);
console.log(updatedProducts2);