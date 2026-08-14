// Spread copies the outer object, not the nested objects inside it.

const product = {
  id: 1,
  name: "Dress",
  details: {
    color: "Black",
    size: "M"
  }
};

const copiedProduct = {
  ...product
};

// copiedProduct is a new object.
// The nested details object is not new.

/*

product --------\
                -> same details object
copiedProduct --/

product === copiedProduct
false
product.details === copiedProduct.details
true

*/


// If you want a nested object to be independent, copy that level too. 
// Copy each nested level that you intend to change independently.

const copiedProductwithDetail = {
  ...product,
  details: {
    ...product.details
  }
};