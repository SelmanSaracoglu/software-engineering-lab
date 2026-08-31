/*
  INDEXED OBJECT ACCESS

  We already know dot notation:

  user.name

  But sometimes the property name
  comes from a variable.

  Then we use:

  object[key]
*/


// --------------------------------------------------
// 1. DOT NOTATION
// --------------------------------------------------

const user = {
  name: "Alice",
  age: 30
};


console.log(
  user.name
);


// --------------------------------------------------
// 2. BRACKET NOTATION
// --------------------------------------------------

console.log(
  user["name"]
);


/*
  These both read
  the same property:

  user.name

  user["name"]
*/


// --------------------------------------------------
// 3. WHY BRACKETS MATTER
// --------------------------------------------------

type Status =
  "NEW"
  | "IN_PROGRESS"
  | "COMPLETED";


const statusMessages:
  Record<Status, string> = {

  NEW: "Order created",

  IN_PROGRESS:
    "Order is being processed",

  COMPLETED:
    "Order completed"
};


const currentStatus:
  Status = "IN_PROGRESS";


const message =
  statusMessages[
    currentStatus
  ];


console.log(message);


/*
  We cannot write:

  statusMessages.currentStatus


  because that would look for
  a property literally called:

  "currentStatus"


  But we want the VALUE
  stored inside currentStatus:

  "IN_PROGRESS"


  So we use:

  statusMessages[currentStatus]
*/


// --------------------------------------------------
// 4. FOLLOW THE VALUE
// --------------------------------------------------

/*
  currentStatus

  contains:

  "IN_PROGRESS"


  So:

  statusMessages[currentStatus]


  becomes conceptually:

  statusMessages["IN_PROGRESS"]


  Result:

  "Order is being processed"
*/


// --------------------------------------------------
// 5. FUNCTION EXAMPLE
// --------------------------------------------------

function getStatusMessage(
  status: Status
): string {

  return statusMessages[status];
}


console.log(
  getStatusMessage("NEW")
);


// --------------------------------------------------
// 6. KEY TYPE MATTERS
// --------------------------------------------------

type Role =
  "ADMIN"
  | "USER";


const permissions:
  Record<Role, boolean> = {

  ADMIN: true,
  USER: false
};


function canDelete(
  role: Role
): boolean {

  return permissions[role];
}


console.log(
  canDelete("ADMIN")
);


// --------------------------------------------------
// 7. WRONG KEY
// --------------------------------------------------

/*
  This would be invalid:

  permissions["GUEST"]


  because "GUEST"
  is not part of:

  Role
*/


// --------------------------------------------------
// 8. PRACTICAL EXAMPLE
// --------------------------------------------------

type Priority =
  "LOW"
  | "MEDIUM"
  | "HIGH";


const priorityScores:
  Record<Priority, number> = {

  LOW: 1,
  MEDIUM: 2,
  HIGH: 3
};


function getPriorityScore(
  priority: Priority
): number {

  return priorityScores[
    priority
  ];
}


console.log(
  getPriorityScore("HIGH")
);
// 3


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  DOT NOTATION:

  object.name

  Use it when the property name
  is written directly.


  BRACKET NOTATION:

  object[key]

  Use it when the property name
  comes from a variable.


  Example:

  const status = "NEW";

  messages[status]


  MENTAL MODEL:

  object[key]

  =
  "Take the value inside key
   and use that value
   as the property name."
*/