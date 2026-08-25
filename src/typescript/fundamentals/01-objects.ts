// OBJECTS
//
// An object groups related data into a single value.
//
// In the OrderDetailDialog test, one order is represented
// by an object because all of these properties describe
// the same order.

const order = {
  id: 101,
  customerIdentifier: "@newcustomer",
  customerName: "New Customer",
  status: "NEW",
  total: 85
};


// Each object entry has:
//
// property: value
//
// Example:
//
// customerName: "New Customer"
//
// customerName  -> property
// "New Customer" -> value


// Access object properties with dot notation.

console.log(order.id);
// 101

console.log(order.customerName);
// New Customer

console.log(order.status);
// NEW

console.log(order.total);
// 85


// The variable name and the object's properties
// are different concepts.
//
// order -> variable containing the object
//
// id
// customerIdentifier
// customerName
// status
// total
//
// -> properties of that object


// Objects can contain different value types.
//
// id    -> number
// total -> number
//
// customerName -> string
// status       -> string


// Another example from the same domain:

const orderItem = {
  id: 1,
  description: "Black Dress",
  quantity: 2,
  unitPrice: 42.5
};

console.log(orderItem.description);
// Black Dress

console.log(orderItem.quantity);
// 2