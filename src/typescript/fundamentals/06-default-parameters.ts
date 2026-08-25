// DEFAULT PARAMETERS
//
// A parameter can have a default value.
//
// The default value is used when the function is called
// without providing an argument for that parameter.

function getRoute(path: string = "/") {
  return path;
}


// An argument is provided,
// so path receives "/orders/101".

const detailRoute = getRoute("/orders/101");

console.log(detailRoute);
// /orders/101


// No argument is provided.
//
// path uses its default value: "/"

const dashboardRoute = getRoute();

console.log(dashboardRoute);
// /


// This is still the same function structure:
//
// function name(parameter) {
//   return ...
// }
//
// The only new part is:
//
// parameter = defaultValue

function getStatus(status: string = "NEW") {
  return status;
}

const firstStatus = getStatus("COMPLETED");
const secondStatus = getStatus();

console.log(firstStatus);
// COMPLETED

console.log(secondStatus);
// NEW


// Example related to the OrderDetailDialog test:
//
// The real test contains:
//
// function mountOrdersRoute(
//   initialEntry = "/",
// ) {
//   ...
// }
//
// initialEntry is a parameter.
//
// When called like this:
//
// mountOrdersRoute("/orders/101");
//
// initialEntry receives:
//
// "/orders/101"
//
//
// When called like this:
//
// mountOrdersRoute();
//
// no argument is provided,
// so initialEntry receives its default value:
//
// "/"