// PARAMETERS AND ARGUMENTS --> Functions can receive values from outside.
//
// Parameters are the variables defined in the function declaration.
// Arguments are the actual values passed when the function is called.

function getCustomerName(name: string) {
  return name;
}

const customerName = getCustomerName("New Customer");

console.log(customerName); // New Customer

// name -> parameter
// "New Customer" -> argument

// -- A function can receive more than one parameter. --
function calculateTotal(price: number, quantity: number) {
  return price * quantity;
}

const total = calculateTotal(42.5, 2);
console.log(total); // 85

// price and quantity are parameters.
// 42.5 and 2 are arguments passed to the function.


function createOrderLabel(id: number, status: string) {
  return `Order #${id} - ${status}`;
}

const orderLabel = createOrderLabel(101, "NEW");

console.log(orderLabel); // Order #101 - NEW

// Parameters allow the same function to work with different input values.

const firstTotal = calculateTotal(30, 1);
const secondTotal = calculateTotal(50, 3);

console.log(firstTotal); // 30
console.log(secondTotal); // 150


// TypeScript checks the parameter types.
//
// calculateTotal("30", 2);
// Error: "30" is a string, but price expects a number.