// FUNCTIONS --> A function is a reusable block of code that performs a task.
// In the OrderDetailDialog test, functions are used to build test helpers and small React components.

function getStatus() {
  return "NEW";
}

// This is a function declaration. The function is defined here, but it does not run yet.


// Call the function with parentheses.

const status = getStatus();
console.log(status); // NEW

// return sends a value back from the function.
function getPrice() {
  return 50;
}

const price = getPrice();
console.log(price); // 50


// A function can return different kinds of values.
function getOrder() {
  return {
    id: 101,
    status: "NEW",
    total: 85
  };
}

const order = getOrder();

console.log(order.status); // NEW

console.log(order.total); // 85


// -- Important distinction --
// getPrice -> the function itself
// getPrice() -> calls the function and gives us its returned value

const functionReference = getPrice;
const functionResult = getPrice();

console.log(functionReference);
console.log(functionResult); // 50


// Example from the OrderDetailDialog test:
//
// const location = useLocation();
//
// At this stage, we do not need to understand
// how useLocation works internally.
//
// What matters here is:
//
// useLocation()
// -> a function call
//
// const location = useLocation();
// -> call the function and store its result
