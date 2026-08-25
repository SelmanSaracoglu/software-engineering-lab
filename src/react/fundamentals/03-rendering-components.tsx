// RENDERING COMPONENTS
//
// React components can be rendered inside other components.
//
// A component name starts with an uppercase letter.

function OrderTitle() {
  return <h1>Orders</h1>;
}


function OrderStatus() {
  return <span>NEW</span>;
}


// Use <ComponentName /> to render a component.

function OrderPage() {
  return (
    <div>
      <OrderTitle />
      <OrderStatus />
    </div>
  );
}


// <OrderTitle />
// -> render the OrderTitle component
//
// <OrderStatus />
// -> render the OrderStatus component


// This is different from a normal function call:
//
// OrderTitle()
//
// In React code, components are normally used
// through JSX:
//
// <OrderTitle />


// Example from the real project:
//
// function TestOrdersLayout() {
//   return (
//     <>
//       <OrdersDashboard />
//       <Outlet />
//       <LocationProbe />
//     </>
//   );
// }
//
// OrdersDashboard
// Outlet
// LocationProbe
//
// are all being rendered as components.