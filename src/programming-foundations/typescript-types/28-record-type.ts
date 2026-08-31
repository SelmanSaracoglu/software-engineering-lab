/*
  RECORD TYPE

  Record helps us describe an object
  whose keys and value types are known.

  General form:

  Record<KeyType, ValueType>
*/


// --------------------------------------------------
// 1. NORMAL OBJECT TYPE
// --------------------------------------------------

type Scores = {
  Alice: number;
  Bob: number;
};


const scores: Scores = {
  Alice: 90,
  Bob: 80
};


// --------------------------------------------------
// 2. SAME IDEA WITH Record
// --------------------------------------------------

type UserScores =
  Record<
    "Alice" | "Bob",
    number
  >;


const userScores: UserScores = {
  Alice: 90,
  Bob: 80
};


/*
  Read:

  Record<
    "Alice" | "Bob",
    number
  >

  as:

  Keys:
  "Alice" or "Bob"

  Values:
  number
*/


// --------------------------------------------------
// 3. MISSING KEY IS AN ERROR
// --------------------------------------------------

/*
const invalidScores: UserScores = {
  Alice: 90
};

Error:

Bob is missing.
*/


// --------------------------------------------------
// 4. WRONG VALUE TYPE IS AN ERROR
// --------------------------------------------------

/*
const invalidScores: UserScores = {
  Alice: 90,
  Bob: "high"
};

Error:

Bob must be a number.
*/


// --------------------------------------------------
// 5. RECORD WITH UNION TYPES
// --------------------------------------------------

type Status =
  "NEW"
  | "IN_PROGRESS"
  | "COMPLETED";


type StatusMessage =
  Record<
    Status,
    string
  >;


const statusMessages:
  StatusMessage = {

  NEW: "Order created",

  IN_PROGRESS:
    "Order is being processed",

  COMPLETED:
    "Order completed"
};


console.log(
  statusMessages.NEW
);


// --------------------------------------------------
// 6. WHY THIS IS USEFUL
// --------------------------------------------------

/*
  Because TypeScript checks
  that every Status exists.

  If we later add:

  "CANCELLED"

  to Status,

  TypeScript can tell us
  that our Record is incomplete.
*/


// --------------------------------------------------
// 7. VALUES CAN ALSO BE ARRAYS
// --------------------------------------------------

type AllowedTransitions =
  Record<
    Status,
    readonly Status[]
  >;


const allowedTransitions:
  AllowedTransitions = {

  NEW: [
    "IN_PROGRESS"
  ],

  IN_PROGRESS: [
    "COMPLETED"
  ],

  COMPLETED: []
};


console.log(
  allowedTransitions.NEW
);


/*
  Here:

  key
  -> Status

  value
  -> readonly Status[]
*/


// --------------------------------------------------
// 8. ACCESSING A RECORD
// --------------------------------------------------

const currentStatus:
  Status = "NEW";


const transitions =
  allowedTransitions[
    currentStatus
  ];


console.log(
  transitions
);


/*
  We can use a variable
  as the key.

  Since currentStatus
  is guaranteed to be Status,

  TypeScript knows
  this access is valid.
*/


// --------------------------------------------------
// 9. PRACTICAL EXAMPLE
// --------------------------------------------------

type Role =
  "ADMIN"
  | "OPERATOR"
  | "VIEWER";


type Permissions =
  Record<
    Role,
    boolean
  >;


const canDelete:
  Permissions = {

  ADMIN: true,
  OPERATOR: false,
  VIEWER: false
};


function canRoleDelete(
  role: Role
): boolean {

  return canDelete[role];
}


console.log(
  canRoleDelete("ADMIN")
);


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  Record<Key, Value>

  describes an object.


  Example:

  Record<
    Status,
    string
  >


  means:

  Every Status must exist
  as a key,

  and every value
  must be a string.


  MENTAL MODEL:

  Record<Key, Value>

  =
  "For every allowed key,
   store a value of this type."
*/