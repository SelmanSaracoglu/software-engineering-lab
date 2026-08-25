import { useLocation } from "react-router-dom";

// USE LOCATION
//
// useLocation() is a React Router hook.
// For now, the important part is simple: useLocation() -> function call
// It returns information about the current location/URL.

function LocationProbe() {
  const location = useLocation();

  return (
    <span>
      {location.pathname}
    </span>
  );
}

// useLocation() -> returns a location object
// const location = useLocation();
//
// location -> variable containing that returned object
// location.pathname -> reads the pathname property from that object

// Example:
//
// If the current route is: /orders/101
// then: location.pathname
// is: "/orders/101"

// This connects directly to concepts already learned:
//
// function call: useLocation() --> returned value stored in a variable:
// const location = useLocation();
// object property access: location.pathname
// JSX value: {location.pathname}