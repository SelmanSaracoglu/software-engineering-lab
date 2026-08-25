import {
  MemoryRouter,
  Outlet,
  Route,
  Routes
} from "react-router-dom";

// NESTED ROUTES: A Route can contain another Route.
//
// The outer Route is the parent.
// The inner Route is the child.

function OrdersLayout() {
  return (
    <>
      <h1>Orders</h1>
      <Outlet />
    </>
  );
}

function OrderDetail() {
  return <h2>Order Detail</h2>;
}

function AppRoutes() {
  return (
    <MemoryRouter initialEntries={["/orders/101"]}>
      <Routes>
        <Route
          path="/"
          element={<OrdersLayout />}
        >
          <Route
            path="orders/:orderId"
            element={<OrderDetail />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}


// Parent route: path="/"
// element={<OrdersLayout />}


// Child route: path="orders/:orderId"
// element={<OrderDetail />}


// The child path is relative to the parent.
// Parent:   --> /
// Child:    --> orders/:orderId
// Together: --> /orders/:orderId

// ### Example ###
// /orders/101
// matches: --> /orders/:orderId
// 101 becomes the value of: --> orderId


// Because OrderDetail is a child route, the parent layout stays rendered.
// OrdersLayout -> remains on screen
// OrderDetail -> renders inside the parent's <Outlet />