import {
  MemoryRouter,
  Route,
  Routes,
  useParams
} from "react-router-dom";

// USE PARAMS --> Dynamic route parameters are defined with: ":parameterName"
//
// Example:
// /orders/:orderId
// When the URL is: /orders/101
// orderId becomes: "101"

function OrderDetail() {
  const params = useParams();

  return (
    <span>
      {params.orderId}
    </span>
  );
}


function AppRoutes() {
  return (
    <MemoryRouter initialEntries={["/orders/101"]}>
      <Routes>
        <Route
          path="/orders/:orderId"
          element={<OrderDetail />}
        />
      </Routes>
    </MemoryRouter>
  );
}


// Route pattern: "/orders/:orderId"
// Current URL: /orders/101
//
// React Router matches them and creates a params object containing:
// {
//   orderId: "101"
// }

// useParams() returns that params object.
// The property can also be extracted with object destructuring.

function OrderDetailWithDestructuring() {
  const { orderId } = useParams();

  return <span>{orderId}</span>;
}

// And it can be renamed while destructuring.

function OrderDetailWithRename() {
  const {
    orderId: orderIdParam
  } = useParams();

  return <span>{orderIdParam}</span>;
}


// This matches the real project: const { orderId: orderIdParam } = useParams();
// If the route is: /orders/101
// then: orderIdParam
// contains: "101"