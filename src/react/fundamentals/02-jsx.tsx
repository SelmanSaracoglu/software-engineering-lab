// JSX
// JSX lets us describe UI with HTML-like syntax inside JavaScript/TypeScript code.
// It looks like HTML, but it is part of React code.
function OrderTitle() {
  return <h1>Orders</h1>;
}

// JSX can contain normal HTML-like elements.
function OrderInfo() {
  return (
    <div>
      <h2>Order #101</h2>
      <span>NEW</span>
    </div>
  );
}

// JavaScript/TypeScript values can be inserted into JSX with curly braces: { }
function OrderStatus() {
  const status = "NEW";

  return <span>{status}</span>;
}

// The value inside { } is evaluated as JavaScript/TypeScript.
// Here: status
// contains: "NEW"
// so React renders: <span>NEW</span>

function OrderTotal() {
  const total = 85;

  return <span>Total: {total}</span>;
}

// Expressions can also be used inside { }.
function OrderQuantity() {
  const quantity = 2;
  const unitPrice = 42.5;

  return (
    <span>
      Total: {quantity * unitPrice}
    </span>
  );
}

// Example related directly to the project code:
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
// The JSX part is:
//
// <span data-testid="location">
//   {location.pathname}
// </span>
//
// location.pathname is a JavaScript/TypeScript value.
//
// { } tells JSX to evaluate that value and render the result.

