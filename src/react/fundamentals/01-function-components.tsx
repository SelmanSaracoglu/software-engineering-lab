// REACT FUNCTION COMPONENTS
//
// A React function component is a function that returns UI.

function OrderTitle() {
  return <h1>Orders</h1>;
}

// OrderTitle is the function itself.
// OrderTitle() --> would be a normal JavaScript function call.
// In React, components are normally rendered with JSX syntax:

const page = <OrderTitle />;
console.log(page);

// A component can return more detailed UI.

function OrderStatus() {
  return <span>NEW</span>;
}

const status = <OrderStatus />;
console.log(status);

// Compare this with the real project code:
//
// function LocationProbe() {
//   const location = useLocation();
//
//   return (
//     <span data-testid="location">
//       {location.pathname}
//     </span>
//   );
// }
//
// LocationProbe is still a function. The important new idea is:
// instead of returning a string, number, or object, a React component returns UI.