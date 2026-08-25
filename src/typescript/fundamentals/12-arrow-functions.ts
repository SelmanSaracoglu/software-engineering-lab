// ARROW FUNCTIONS
// An arrow function is another syntax for writing a function.
//
// The core function concepts do not change:
// - parameters
// - arguments
// - function body
// - return value


// These two functions perform the same task. Regular:
// Regular function syntax:
function getStatus() {
  return "NEW";
}
console.log(getStatus()); // NEW

// Arrow function syntax:
const getStatusArrow = () => {
  return "NEW";
};
console.log(getStatusArrow()); // NEW

// Arrow functions can also have parameters.
const calculateTotal = (price: number, quantity: number) => {
  return price * quantity;
};

const total = calculateTotal(42.5, 2);
console.log(total); // 85


// price and quantity are still parameters.
// 42.5 and 2 are still arguments.
// Only the function syntax has changed.

// A regular function with parameters:

function createOrderLabel(id: number, status: string) {
  return `Order #${id} - ${status}`;
}

// The same idea as an arrow function:
const createOrderLabelArrow = (
  id: number,
  status: string
) => {
  return `Order #${id} - ${status}`;
};


console.log(createOrderLabel(101, "NEW")); // Order #101 - NEW

console.log(createOrderLabelArrow(101, "NEW")); // Order #101 - NEW


// Arrow functions can be stored in variables.
//
// Here:
//
// const calculateTotal
//
// stores the function.
//
// The function itself is:
//
// (price: number, quantity: number) => {
//   return price * quantity;
// }


// An arrow function can also have no parameters.

const printMessage = () => {
  console.log("Order loaded");
};

printMessage(); // Order loaded