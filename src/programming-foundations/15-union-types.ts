/*
  UNION TYPES

  Until now, we often used one type at a time:
  string
  number
  boolean

  But sometimes a value is allowed to have more than one possible type.
  TypeScript lets us describe this with: |
*/

// --------------------------------------------------
// 1. SIMPLE UNION TYPE
// --------------------------------------------------

let value:
  string | number;

value = "Hello";
console.log(value);

value = 42;
console.log(value);

/*
  This variable may contain:
  string OR number
  The | symbol means: OR
*/

let userId:
  string | number;

userId = 1001;
userId = "USER-1001";
console.log(userId);

// --------------------------------------------------
// 2. UNION TYPE IN A FUNCTION PARAMETER
// --------------------------------------------------

function printId(
  id: string | number
): void {

  console.log(id);
}

printId(101);
printId("ABC-101");

/*
  Both calls are valid.
  Because id accepts: string OR number
*

// UNION DOES NOT MEAN ANYTHING

/*
  string | number does NOT mean:    "any type is allowed"
  It means exactly:                 string OR number
*/

// --------------------------------------------------
// 3. THE PROBLEM: WHICH TYPE IS IT RIGHT NOW?
// --------------------------------------------------

function showValue(
  value: string | number
): void {

  console.log(value);
}

/*
  Inside the function, TypeScript knows:
  value could be: string OR number

  But it does not know which one until our code checks.
*/

// --------------------------------------------------
// 4. typeof WITH UNION TYPES
// --------------------------------------------------

function describeValue(
  value: string | number
): void {

  if (
    typeof value === "string"
  ) {

    console.log(
      value.toUpperCase()
    );

    return;
  }

  console.log(
    value * 2
  );
}

describeValue("hello"); // HELLO
describeValue(10); // 20

/*
  This is called narrowing.

  At first: value is: string | number
  Then: typeof value === "string"
  If true: TypeScript knows value is a string.
  Otherwise: TypeScript knows value must be a number.
*/

// --------------------------------------------------
// 5. UNION OF SPECIFIC STRING VALUES
// --------------------------------------------------

type Status =
  "NEW"
  | "IN_PROGRESS"
  | "COMPLETED";

/*
  This is also a union type.
  But now we are not saying: any string
  We are saying: ONLY these exact string values are allowed.
*/

let currentStatus: Status;

currentStatus = "NEW";
currentStatus = "IN_PROGRESS";
currentStatus = "COMPLETED";

console.log(currentStatus);

/*
  This would be incorrect: 
  currentStatus = "WAITING";
  Because "WAITING" is not part of the Status union.
*/

// --------------------------------------------------
// 6. STRING VS STRING LITERAL UNION
// --------------------------------------------------

let looseStatus: string;

looseStatus = "NEW";
looseStatus = "HELLO";
looseStatus = "ANYTHING";

let strictStatus: "NEW" | "COMPLETED";

strictStatus = "NEW";
strictStatus = "COMPLETED";

// This type allows only these exact two strings.

// --------------------------------------------------
// 7. UNION TYPE IN AN OBJECT
// --------------------------------------------------

type Order = {
  id: number;

  status:
    "NEW"
    | "IN_PROGRESS"
    | "COMPLETED";
};

const orderOne: Order = {
  id: 1,
  status: "NEW"
};


const orderTwo: Order = {
  id: 2,
  status: "COMPLETED"
};

console.log(orderOne);
console.log(orderTwo);


// --------------------------------------------------
// 8. STATUS CHECK
// --------------------------------------------------

function printOrderStatus(
  order: Order
): void {

  if (
    order.status === "NEW"
  ) {
    console.log(
      "Order is new"
    );

    return;
  }

  if (
    order.status === "IN_PROGRESS"
  ) {
    console.log(
      "Order is being processed"
    );

    return;
  }

  console.log(
    "Order is completed"
  );
}

/*
  Because the type only allows:
  NEW
  IN_PROGRESS
  COMPLETED

  after checking the first two, the remaining possibility is:
  COMPLETED
*/

printOrderStatus(orderOne);

// --------------------------------------------------
// 9. UNION TYPE AS A NAMED TYPE
// --------------------------------------------------

type Role =
  "ADMIN"
  | "USER"
  | "SUPPORT";

const roleOne: Role = "ADMIN";
const roleTwo: Role = "USER";

console.log(roleOne);
console.log(roleTwo);

//  Named union types make code easier to read and reuse.

// --------------------------------------------------
// 10. UNION TYPE IN FUNCTION PARAMETER
// --------------------------------------------------

function canEdit(
  role: Role
): boolean {

  return (
    role === "ADMIN" ||
    role === "SUPPORT"
  );
}

console.log(
  canEdit("ADMIN")
); // true

console.log(
  canEdit("USER")
); // false


// --------------------------------------------------
// 11. UNION WITH NUMBER LITERALS
// --------------------------------------------------

type Rating =
  1 | 2 | 3 | 4 | 5;

let rating: Rating;
rating = 5;
rating = 3;

console.log(rating);

// --------------------------------------------------
// 12. UNION WITH BOOLEAN-LIKE STATES
// --------------------------------------------------

type LoadingState =
  "IDLE"
  | "LOADING"
  | "SUCCESS"
  | "ERROR";


let loadingState:
  LoadingState =
  "IDLE";
console.log(loadingState);

loadingState = "LOADING";
console.log(loadingState);

// --------------------------------------------------
// 12. UNION TYPE WITH OPTIONAL PROPERTY
// --------------------------------------------------

type User = {
  name: string;

  role?:
    "ADMIN"
    | "USER";
};

const userOne: User = {
  name: "Alice"
};

const userTwo: User = {
  name: "Bob",
  role: "ADMIN"
};

console.log(userOne);
console.log(userTwo);

/*
  role is optional.
  So its possible states are conceptually: 
  "ADMIN" OR "USER" OR undefined
*/

// --------------------------------------------------
// 13. CHECKING OPTIONAL UNION PROPERTY
// --------------------------------------------------

function printUserRole(
  user: User
): void {

  if (
    user.role === undefined
  ) {
    console.log(
      "No role"
    );

    return;
  }

  console.log(
    user.role
  );
}

printUserRole(userOne); // No role
printUserRole(userTwo); // ADMIN


// --------------------------------------------------
// 14. ARRAY OF UNION VALUES
// --------------------------------------------------

type Action =
  "CREATE"
  | "UPDATE"
  | "DELETE";


const actions: Action[] = [
  "CREATE",
  "UPDATE",
  "DELETE"
];

console.log(actions);

/*
  Action[] means:
  an array where every item must match the Action union.
*/


// --------------------------------------------------
// 15. FILTERING UNION VALUES
// --------------------------------------------------

const safeActions =
  actions.filter(
    (action: Action) =>
      action !== "DELETE"
  );
console.log(safeActions); // ["CREATE", "UPDATE"]

// --------------------------------------------------
// 22. MAP WITH UNION VALUES
// --------------------------------------------------

const actionLabels =
  actions.map(
    (action: Action) => {

      if (
        action === "CREATE"
      ) {
        return "Create item";
      }

      if (
        action === "UPDATE"
      ) {
        return "Update item";
      }

      return "Delete item";
    }
  );

console.log(actionLabels);

// --------------------------------------------------
// 23. UNION TYPE CAN COMBINE OBJECT TYPES
// --------------------------------------------------

type SuccessResult = {
  success: true;
  data: string;
};

type ErrorResult = {
  success: false;
  message: string;
};

type Result =
  SuccessResult
  | ErrorResult;

/*
  Result can be: one object shape OR another object shape.
*/

// --------------------------------------------------
// 24. USING THE OBJECT UNION
// --------------------------------------------------

const successResult: Result = {
  success: true,
  data: "Saved"
};


const errorResult: Result = {
  success: false,
  message: "Something went wrong"
};

console.log(successResult);
console.log(errorResult);


// --------------------------------------------------
// 25. NARROWING OBJECT UNION
// --------------------------------------------------

function printResult(
  result: Result
): void {

  if (
    result.success
  ) {

    console.log(
      result.data
    );

    return;
  }


  console.log(
    result.message
  );
}

/*
  If: result.success === true

  TypeScript knows: result is SuccessResult

  Otherwise: result is ErrorResult
*/

printResult(successResult);
printResult(errorResult);

// --------------------------------------------------
// 26. COMPLETE EXAMPLE
// --------------------------------------------------

type OrderStatus =
  "NEW"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

type CustomerOrder = {
  id: number;
  status: OrderStatus;
  note?: string;
};

const orders: CustomerOrder[] = [
  {
    id: 1,
    status: "NEW"
  },
  {
    id: 2,
    status: "COMPLETED",
    note: "Delivered"
  },
  {
    id: 3,
    status: "IN_PROGRESS"
  }
];

const openOrders =
  orders.filter(
    (order: CustomerOrder) =>
      order.status === "NEW" ||
      order.status === "IN_PROGRESS"
  );

console.log(openOrders);

/*
  OrderStatus prevents values like:

  "hello"
  "waiting"
  "something"

  Only the known status values are accepted.
  Then our filter works with a controlled set of possibilities.
*/

// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  UNION TYPE: A type with more than one allowed possibility.

  LITERAL UNION: "NEW" | "COMPLETED";
  ONLY: "NEW" OR "COMPLETED"

  NARROWING: If a value may have multiple types, 
  we often need to check which one we currently have.
*/