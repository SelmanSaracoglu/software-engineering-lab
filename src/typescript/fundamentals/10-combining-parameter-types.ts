// COMBINING PARAMETER TYPES
//
// We can combine:
// - a function parameter
// - a union type
// - an object type
// - an optional property
// - a default value


function getInitialRoute(
  entry:
    | string
    | {
        pathname: string;
        fromDashboard?: boolean;
      } = "/"
) {
  return entry;
}


// 1. No argument is provided.
//
// The default value "/" is used.

const defaultRoute = getInitialRoute();

console.log(defaultRoute);
// /


// 2. A string argument is provided.
//
// entry becomes "/orders/101".

const stringRoute = getInitialRoute("/orders/101");

console.log(stringRoute);
// /orders/101


// 3. An object argument is provided.
//
// This is valid because entry can be:
//
// string
//
// OR
//
// {
//   pathname: string;
//   fromDashboard?: boolean;
// }

const objectRoute = getInitialRoute({
  pathname: "/orders/101",
  fromDashboard: true
});

console.log(objectRoute);


// fromDashboard is optional,
// so this is also valid.

const routeWithoutState = getInitialRoute({
  pathname: "/orders/101"
});

console.log(routeWithoutState);


// Read the parameter from left to right:
//
// entry
// -> parameter name
//
// :
// -> TypeScript type information starts here
//
// string
// -> entry can be a string
//
// |
// -> OR
//
// { pathname: string; fromDashboard?: boolean }
// -> entry can be an object with this shape
//
// = "/"
// -> if no argument is provided, use "/" as the default value