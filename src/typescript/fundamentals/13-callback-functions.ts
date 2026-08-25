// CALLBACK FUNCTIONS
//
// A callback is a function passed to another function
// so that the receiving function can call it later.


// A normal function.

function printOrder(): void {
  console.log("Order 101");
}


// This function receives another function as a parameter.
//
// callback: () => void
//
// callback
// -> parameter name
//
// () => void
// -> the parameter must be a function
//    that takes no arguments and returns no value.

function execute(callback: () => void): void {
  callback();
}


// We pass the function itself.
//
// printOrder
// -> function itself
//
// printOrder()
// -> function call

execute(printOrder);


// If the callback is only needed once,
// we do not have to create and name it separately.
//
// Instead of:
//
// function printMessage(): void {
//   console.log("Order loaded");
// }
//
// execute(printMessage);
//
// we can write the function directly:

execute(() => {
  console.log("Order loaded");
});


// A callback can also receive parameters.

function processOrder(
  callback: (orderId: number) => void
): void {
  callback(101);
}


// Named callback.

function printOrderId(orderId: number): void {
  console.log(orderId);
}

processOrder(printOrderId);


// The same idea with an inline arrow function.
//
// orderId is the callback's parameter.
//
// Its value comes from:
//
// callback(101);

processOrder((orderId) => {
  console.log(orderId);
});


// Callbacks do not have to return void.
//
// A callback can also return a value.

function calculate(
  callback: () => number
): number {
  return callback();
}

function getPrice(): number {
  return 50;
}

const price = calculate(getPrice);

console.log(price);
// 50