import {
  MemoryRouter,
  Outlet,
  Route,
  Routes
} from "react-router-dom";

// OUTLET: Outlet marks the place where a matched child route should be rendered inside its parent route.

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


// When the current route is: --> /orders/101
// the parent route matches: --> /
// and the child route matches: --> orders/:orderId

// React Router renders: <OrdersLayout />
// and places: <OrderDetail />
// where: <Outlet /> appears inside OrdersLayout.