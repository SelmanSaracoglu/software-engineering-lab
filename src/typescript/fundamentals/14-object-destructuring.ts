// OBJECT DESTRUCTURING
//
// Destructuring lets us take properties from an object and store them directly in variables.

const order = {
  id: 101,
  status: "NEW",
  total: 85
};


// Normal property access:
const orderStatus = order.status;
console.log(orderStatus); // NEW


// The same idea with destructuring:
const { status } = order;
console.log(status); // NEW


// Multiple properties can be extracted at once.
const { id, total } = order;
console.log(id); // 101
console.log(total); // 85

// A destructured property can also be stored under a different variable name.
const routeParams = {
  orderId: "101"
};

const {
  orderId: orderIdParam
} = routeParams;

console.log(orderIdParam); // 101


// Important:
// "orderId: orderIdParam" does NOT mean: property type
// It means: read the "orderId" property and store its value in a variable named "orderIdParam".