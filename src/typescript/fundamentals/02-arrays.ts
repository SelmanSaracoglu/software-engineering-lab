// ARRAYS --> // An array stores an ordered collection of values.

const orderSummaries = [
  {
    id: 101,
    customerName: "New Customer",
    status: "NEW",
    total: 85
  },
  {
    id: 102,
    customerName: "Another Customer",
    status: "IN_PROGRESS",
    total: 120
  }
];


// Array elements are accessed by index.
//
// Indexes start at 0:
//
// [0] -> first item
// [1] -> second item

console.log(orderSummaries[0]);
console.log(orderSummaries[1]);


// With strict indexed access, TypeScript does not assume
// that an item exists at a particular index.
//
// First retrieve the item, then check that it exists.

const firstOrder = orderSummaries[0];

if (firstOrder) {
  console.log(firstOrder.customerName);
  // New Customer

  console.log(firstOrder.status);
  // NEW
}


const secondOrder = orderSummaries[1];

if (secondOrder) {
  console.log(secondOrder.customerName);
  // Another Customer

  console.log(secondOrder.total);
  // 120
}


// A simpler array example:

const statuses = [
  "NEW",
  "IN_PROGRESS",
  "COMPLETED"
];

console.log(statuses[0]);
// NEW

console.log(statuses[2]);
// COMPLETED

