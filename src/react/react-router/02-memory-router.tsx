import {
  MemoryRouter,
  useLocation
} from "react-router-dom";

// MEMORY ROUTER
//
// React Router components and hooks need a Router.
// MemoryRouter keeps routing information in memory instead of depending on the browser's URL history.
// This makes it useful for tests.


function LocationDisplay() {
  const location = useLocation();

  return <span>{location.pathname}</span>;
}


// initialEntries defines where the Router starts. Here the initial route is: --> /orders/101

function OrderRouteExample() {
  return (
    <MemoryRouter initialEntries={["/orders/101"]}>
      <LocationDisplay />
    </MemoryRouter>
  );
}


// LocationDisplay is inside MemoryRouter, so useLocation() can read the current location.
//
// location.pathname will be: --> "/orders/101"
// The initial route can also come from a variable.

const initialEntry = "/";

function DashboardRouteExample() {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <LocationDisplay />
    </MemoryRouter>
  );
}


// In the real OrderDetailDialog test:
//
// <MemoryRouter initialEntries={[initialEntry]}>
//   ...
// </MemoryRouter>
//
// initialEntry determines where each test starts.
// initialEntry = "/" -> start from the Dashboard
// initialEntry = "/orders/101" -> start directly from the order detail route

