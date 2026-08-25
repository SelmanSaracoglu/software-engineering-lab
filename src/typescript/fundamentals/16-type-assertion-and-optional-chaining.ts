// TYPE ASSERTION AND OPTIONAL CHAINING
// Sometimes TypeScript does not know the exact shape of a value as specifically as we do.
//
// A type assertion uses: as SomeType to tell TypeScript how we expect the value to be treated.

type RouteState = {
  fromDashboard?: boolean;
};

const rawState: unknown = {
  fromDashboard: true
};

const routeState =
  rawState as RouteState;
console.log(routeState.fromDashboard); // true


// A value may also be "null". "null" means: there is intentionally no value.
const emptyState: RouteState | null = null;

// Optional chaining uses: "?".
// It safely accesses a property when the value may be null or undefined.

const firstState: RouteState | null = {
  fromDashboard: true
};
console.log(firstState?.fromDashboard); // true

const secondState: RouteState | null = null;
console.log(secondState?.fromDashboard); // undefined

// Without optional chaining: secondState.fromDashboard
// would not be safe because secondState might be null.

// Example matching the real project:

const locationState =
  rawState as RouteState | null;

const openedFromDashboard =
  locationState?.fromDashboard === true;

console.log(openedFromDashboard); // true