// OBJECT TYPES
//
// TypeScript can describe the expected shape
// of an object.

type Order = {
  id: number;
  status: string;
  total: number;
};


const firstOrder: Order = {
  id: 101,
  status: "NEW",
  total: 85
};

console.log(firstOrder.id);
// 101

console.log(firstOrder.status);
// NEW


// The type defines which properties are expected
// and which type each property must have.
//
// id: number
// -> id must be a number
//
// status: string
// -> status must be a string
//
// total: number
// -> total must be a number


// This would be invalid:
//
// const invalidOrder: Order = {
//   id: "101",
//   status: "NEW",
//   total: 85
// };
//
// id expects a number, not a string.


// Object types can also contain nested objects.

type RouteEntry = {
  pathname: string;
  state: {
    fromDashboard: boolean;
  };
};


const detailRoute: RouteEntry = {
  pathname: "/orders/101",
  state: {
    fromDashboard: true
  }
};

console.log(detailRoute.pathname);
// /orders/101

console.log(detailRoute.state.fromDashboard);
// true