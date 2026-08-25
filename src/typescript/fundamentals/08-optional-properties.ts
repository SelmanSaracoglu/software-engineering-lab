// OPTIONAL PROPERTIES
//
// An object property can be optional.
//
// The ? means that the property
// does not have to exist on the object.

type RouteState = {
  fromDashboard?: boolean;
};


// fromDashboard exists.

const dashboardState: RouteState = {
  fromDashboard: true
};

console.log(dashboardState.fromDashboard);
// true


// fromDashboard does not exist.
//
// This is still valid because
// the property is optional.

const emptyState: RouteState = {};

console.log(emptyState.fromDashboard);
// undefined


// Compare:
//
// fromDashboard: boolean
//
// -> the property is required
//
//
// fromDashboard?: boolean
//
// -> the property is optional


type Customer = {
  name: string;
  note?: string;
};


// name is required.
// note is optional.

const firstCustomer: Customer = {
  name: "New Customer",
  note: "Call before shipping"
};

const secondCustomer: Customer = {
  name: "Another Customer"
};

console.log(firstCustomer.note);
// Call before shipping

console.log(secondCustomer.note);
// undefined


// This would be invalid:
//
// const invalidCustomer: Customer = {
//   note: "Call before shipping"
// };
//
// name is required, so it cannot be omitted.