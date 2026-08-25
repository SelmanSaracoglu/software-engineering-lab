import {
  MemoryRouter,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";

// USE NAVIGATE
// useNavigate() gives us a function that can change the current route.
// This is called programmatic navigation.
// Instead of the user clicking a <Link />, our code decides when navigation should happen.

function OrderDetail() {
  const navigate = useNavigate();

  function closeDetail() {
    navigate("/");
  }

  return (
    <button onClick={closeDetail}>
      Close
    </button>
  );
}

function AppRoutes() {
  return (
    <MemoryRouter initialEntries={["/orders/101"]}>
      <Routes>
        <Route
          path="/orders/101"
          element={<OrderDetail />}
        />
      </Routes>
    </MemoryRouter>
  );
}


// useNavigate() -> function call --> It returns another function.
//
// const navigate = useNavigate();
// navigate -> variable containing the navigation function

// Calling: navigate("/") --> changes the current route to: --> /

// navigate can also move through the existing history.
//
// navigate(-1) means: go back one history entry.


// ### Example ###
// history:
//
// /
// /orders/101
//
// current: /orders/101
//
// navigate(-1) returns to: "/"

// Navigation can also replace the current history entry.

function DirectOrderDetail() {
  const navigate = useNavigate();

  function closeDetail() {
    navigate("/", {
      replace: true
    });
  }

  return (
    <button onClick={closeDetail}>
      Close
    </button>
  );
}


// replace: true
// means the current history entry is replaced instead of adding another navigation entry.