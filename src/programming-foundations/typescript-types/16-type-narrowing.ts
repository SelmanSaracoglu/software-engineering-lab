/*
  TYPE NARROWING

  A union type can describe several possible values.

  Type narrowing means:
  using a check to discover which type or value we actually have.
*/


// --------------------------------------------------
// 1. WHY NARROWING EXISTS
// --------------------------------------------------

function printValue(
  value: string | number
): void {

// Here TypeScript only knows: string | number
  
  if (typeof value === "string") {
    console.log(
      value.toUpperCase()
    );
  } else {
    console.log(
      value * 2
    );
  }
}
printValue("hello");
printValue(10);

// --------------------------------------------------
// 2. NARROWING WITH LITERAL UNIONS
// --------------------------------------------------

type Status =
  "NEW"
  | "IN_PROGRESS"
  | "COMPLETED";


function getStatusMessage(
  status: Status
): string {

  if (status === "NEW") {
    return "Order is new";
  }

  if (status === "IN_PROGRESS") {
    return "Order is being processed";
  }

  return "Order is completed";
}

/*
  After the first checks fail,
  TypeScript knows the remaining
  possible value.
*/


// --------------------------------------------------
// 3. OPTIONAL VALUE
// --------------------------------------------------

function printUsername(
  username?: string
): void {

  /*
    username is:
    string | undefined
  */

  if (username === undefined) {
    console.log(
      "Username missing"
    );

    return;
  }

  /*
    After the guard clause:
    username is string
  */

  console.log(
    username.toUpperCase()
  );
}
printUsername("alice");
printUsername();


// --------------------------------------------------
// 4. DISCRIMINATED UNION
// --------------------------------------------------

type Result =
  | {
      success: true;
      data: string;
    }
  | {
      success: false;
      error: string;
    };

function printResult(
  result: Result
): void {

  if (result.success) {
    console.log(
      result.data
    );

    return;
  }

  console.log(
    result.error
  );
}

/*
  result.success tells TypeScript
  which object shape we have.
*/

// --------------------------------------------------
// 5. PRACTICAL EXAMPLE
// --------------------------------------------------

type User = {
  name: string;
  phone?: string;
};


function getPhoneMessage(
  user: User
): string {

  if (user.phone === undefined) {
    return "No phone number";
  }

  return (
    "Phone: " +
    user.phone
  );
}


console.log(
  getPhoneMessage({
    name: "Alice",
    phone: "12345"
  })
);


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  Before a check: 
  string | number

  After: 
  typeof value === "string"

  TypeScript narrows it to: string


  MENTAL MODEL:

  broad possibilities
        ↓
      check
        ↓
  fewer possibilities
*/