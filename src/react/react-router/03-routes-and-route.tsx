import {
  MemoryRouter,
  Route,
  Routes
} from "react-router-dom";

// ROUTES AND ROUTE
//
// Route defines: "When this path matches, render this element."
// Routes groups Route definitions and selects the matching route.


function Dashboard() {
  return <h1>Orders</h1>;
}

function OrderDetail() {
  return <h2>Order Detail</h2>;
}


function AppRoutes() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/orders/101"
          element={<OrderDetail />}
        />
      </Routes>
    </MemoryRouter>
  );
}

// Each Route has two important parts:
// path -> which URL should match
// element -> which React component should be rendered

// ### Example ###
// path="/" --> means:
// when the current route is "/"
// render: --> <Dashboard />

// ### Another example ###
// path="/orders/101" --> means:
// when the current route is "/orders/101"
// render: --> <OrderDetail />

// Notice that element receives JSX: element={<Dashboard />}
// We already know: <Dashboard /> --> means render the Dashboard component.