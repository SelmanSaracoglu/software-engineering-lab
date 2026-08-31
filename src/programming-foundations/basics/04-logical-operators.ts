/*
  LOGICAL OPERATORS

  In the previous lesson, we learned that conditions produce boolean values:
  true
  false

  Real programs often need to evaluate more than one condition at the same time.

  For this we use logical operators:
  &&   AND
  ||   OR
  !    NOT
*/

// --------------------------------------------------
// 1. AND: &&
// --------------------------------------------------

const age = 25;
const isActive = true;
const canEnter =
  age >= 18 && isActive;

console.log(canEnter); // true

// --------------------------------------------------
// 2. AND WITH A FALSE CONDITION
// --------------------------------------------------

const userAge = 16;
const accountIsActive = true;
const hasAccess =
  userAge >= 18 && accountIsActive;

console.log(hasAccess); // false

// if even one condition is false, the final result is false.

// --------------------------------------------------
// 3. AND TRUTH TABLE
// --------------------------------------------------

console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false

// --------------------------------------------------
// 4. USING && INSIDE IF
// --------------------------------------------------

const stock = 5;
const productIsActive = true;

if (stock > 0 && productIsActive) {
  console.log("Product can be sold");
}

// --------------------------------------------------
// 5. OR: ||
// --------------------------------------------------

const isAdmin = false;
const isManager = true;

const canManageUsers =
  isAdmin || isManager;

console.log(canManageUsers); // true

// --------------------------------------------------
// 6. OR TRUTH TABLE
// --------------------------------------------------

console.log(true || true); // true
console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false

/*
  || --> if at least one side is true, the result is true.
  Only: false || false --> produces false.
*/

// --------------------------------------------------
// 7. USING || WITH STATUS VALUES
// --------------------------------------------------
const orderStatus = "NEW";

const isOpenOrder =
  orderStatus === "NEW" ||
  orderStatus === "IN_PROGRESS";

console.log(isOpenOrder); // true

// --------------------------------------------------
// 8. THIS PATTERN APPEARS OFTEN
// --------------------------------------------------

const secondStatus = "IN_PROGRESS";

if (
  secondStatus === "NEW" ||
  secondStatus === "IN_PROGRESS"
) {
  console.log("Order is still open");
}

/*
  This is a common pattern. We are asking: 
  Is the status NEW -- OR -- is the status IN_PROGRESS?
*/

// --------------------------------------------------
// 9. NOT: !
// --------------------------------------------------

const isCompleted = false;
const isNotCompleted = !isCompleted;

console.log(isNotCompleted); // true

/*
  ! means NOT. It reverses a boolean value.

  !true -> false
  !false -> true
*/

// --------------------------------------------------
// 10. NOT EXAMPLES
// --------------------------------------------------

console.log(!true); // false
console.log(!false); // true


// --------------------------------------------------
// 11. NOT INSIDE IF
// --------------------------------------------------

const isValid = false;

if (!isValid) {
  console.log("Input is invalid");
}

// --------------------------------------------------
// 12. READ ! CAREFULLY
// --------------------------------------------------

const paymentCompleted = false;

if (!paymentCompleted) {
  console.log("Payment is still required");
}

/*
  Read: 
  !paymentCompleted

  as:
  "paymentCompleted is NOT true"
  or more naturally:
  "payment is not completed"
*/

// --------------------------------------------------
// 13. COMPARISON VS NOT
// --------------------------------------------------

const status = "NEW";

const firstCheck =
  status !== "COMPLETED";

const secondCheck =
  !(status === "COMPLETED");

console.log(firstCheck); // true
console.log(secondCheck); // true


/*
  These expressions produce the same result.

  status !== "COMPLETED"        -->     status is not equal to COMPLETED.
  !(status === "COMPLETED")     -->     status is not equal to COMPLETED.

  first compare:        status === "COMPLETED" -> false
  then reverse it:      !false -> true

  Usually the first version is easier to read.
*/

// --------------------------------------------------
// 14. COMBINING && AND ||
// --------------------------------------------------

const role = "OPERATOR";
const enabled = true;
const emergencyAccess = false;

const accessAllowed =
  (role === "OPERATOR" && enabled) ||
  emergencyAccess;

console.log(accessAllowed); // true


/*
  Parentheses help us show the intended grouping.

  First:
  role === "OPERATOR" -> true
  enabled -> true

  true && true -> true


  Then:
  true || emergencyAccess

  true || false -> true
*/

// --------------------------------------------------
// 15. PARENTHESES IMPROVE CLARITY
// --------------------------------------------------

const customerAge = 20;
const hasPermission = true;
const isAdministrator = false;

const allowed =
  (customerAge >= 18 && hasPermission) ||
  isAdministrator;

console.log(allowed); // true

// --------------------------------------------------
// 16. GUARD CLAUSE WITH !
// --------------------------------------------------

function processInput(
  valid: boolean
): string {

  if (!valid) {
    return "Invalid input";
  }

  return "Processing started";
}

console.log(processInput(false)); // Invalid input
console.log(processInput(true)); // Processing started

// This pattern is common: if something is NOT valid, stop early.

// --------------------------------------------------
// 17. MULTIPLE VALIDATION CONDITIONS
// --------------------------------------------------

function canCreateItem(
  price: number,
  quantity: number
): boolean {

  return (
    price > 0 &&
    quantity > 0
  );
}
console.log(canCreateItem(20, 2)); // true
console.log(canCreateItem(20, 0)); // false
console.log(canCreateItem(-5, 2)); // false

// --------------------------------------------------
// 18. COMPLETE EXAMPLE
// --------------------------------------------------

function canProcessOrder(
  status: string,
  paymentReceived: boolean
): boolean {

  const orderIsOpen =
    status === "NEW" ||
    status === "IN_PROGRESS";

  return (
    orderIsOpen &&
    paymentReceived
  );
}

console.log(
  canProcessOrder("NEW", true)
); // true

console.log(
  canProcessOrder(
    "IN_PROGRESS",
    false
  )
); // false

console.log(
  canProcessOrder(
    "COMPLETED",
    true
  )
); // false