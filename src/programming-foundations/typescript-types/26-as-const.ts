/*
  AS CONST

  TypeScript normally allows a value
  to be interpreted more broadly.

  "NEW"

  can often become:

  string


  as const tells TypeScript:

  "Treat this value as exactly this value."
*/


// --------------------------------------------------
// 1. NORMAL STRING VALUE
// --------------------------------------------------

let status = "NEW";

/*
  status is:

  string

  because later we could write:

  status = "SOMETHING_ELSE";
*/


status = "COMPLETED";


// --------------------------------------------------
// 2. CONST VARIABLE
// --------------------------------------------------

const fixedStatus = "NEW";

/*
  fixedStatus cannot be reassigned.

  TypeScript therefore knows
  its exact value is:

  "NEW"
*/


// --------------------------------------------------
// 3. ARRAY WITHOUT as const
// --------------------------------------------------

const statuses = [
  "NEW",
  "IN_PROGRESS",
  "COMPLETED"
];


/*
  TypeScript sees this roughly as:

  string[]


  The array can still be changed.
*/


statuses.push(
  "CANCELLED"
);


// --------------------------------------------------
// 4. ARRAY WITH as const
// --------------------------------------------------

const fixedStatuses = [
  "NEW",
  "IN_PROGRESS",
  "COMPLETED"
] as const;


/*
  Now TypeScript understands:

  these exact values

  in this exact readonly structure.


  Conceptually:

  readonly [
    "NEW",
    "IN_PROGRESS",
    "COMPLETED"
  ]
*/


// fixedStatuses.push("CANCELLED");
// Error: readonly array


// --------------------------------------------------
// 5. WHY THIS IS USEFUL
// --------------------------------------------------

type Status =
  (typeof fixedStatuses)[number];


/*
  Do not focus too much on the syntax yet.

  The result is:

  type Status =
    "NEW"
    | "IN_PROGRESS"
    | "COMPLETED";
*/


const currentStatus: Status =
  "NEW";


const completedStatus: Status =
  "COMPLETED";


// const invalidStatus: Status =
//   "UNKNOWN";

// Error


// --------------------------------------------------
// 6. SAME IDEA WITH AN OBJECT
// --------------------------------------------------

const settings = {
  theme: "dark",
  language: "tr"
} as const;


/*
  TypeScript now treats these as
  exact readonly values:

  theme
  -> "dark"

  language
  -> "tr"
*/


// settings.theme = "light";
// Error: readonly


// --------------------------------------------------
// 7. PRACTICAL EXAMPLE
// --------------------------------------------------

const priorities = [
  "LOW",
  "MEDIUM",
  "HIGH"
] as const;


type Priority =
  (typeof priorities)[number];


function printPriority(
  priority: Priority
): string {

  return "Priority: " + priority;
}


console.log(
  printPriority("HIGH")
);


// printPriority("URGENT");
// Error


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  Without as const:

  ["NEW", "COMPLETED"]

  is usually treated broadly as:

  string[]


  With as const:

  ["NEW", "COMPLETED"] as const

  means:

  these exact values
  should stay fixed.


  MENTAL MODEL:

  as const

  =
  "Do not widen these values.
   Keep them exact and readonly."
*/