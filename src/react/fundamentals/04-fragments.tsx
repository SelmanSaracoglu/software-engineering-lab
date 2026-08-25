// REACT FRAGMENTS
//
// A React component must return a single parent structure.
// Sometimes we want to group several elements without adding an extra HTML element like <div>.
// React Fragment lets us do that.

function OrderTitle() {
  return <h1>Orders</h1>;
}

function OrderStatus() {
  return <span>NEW</span>;
}

// Without a wrapper, this would not be valid:
//
// function OrderPage() {
//   return (
//     <OrderTitle />
//     <OrderStatus />
//   );
// }

// One option is to add a real HTML wrapper.
function OrderPageWithDiv() {
  return (
    <div>
      <OrderTitle />
      <OrderStatus />
    </div>
  );
}

// But sometimes we do not want an extra <div> in the rendered HTML.
// We can use a Fragment instead. <> and </> are the short Fragment syntax.
// They group the components for React, but they do not create an extra HTML element in the page.

function OrderPageWithFragment() {
  return (
    <>
      <OrderTitle />
      <OrderStatus />
    </>
  );
}

// This directly matches the project code:
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
// The Fragment groups three components without adding an unnecessary wrapper element.