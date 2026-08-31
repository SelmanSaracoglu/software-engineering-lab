/*
  CONDITIONALS AND CONTROL FLOW

  Until now, our code mostly ran from top to bottom. But real programs need to make decisions.

  Examples:
  - Is the user active?
  - Is there enough stock?
  - Is the order completed?
  - Is the entered value valid?

  Conditional statements allow the program to run different code depending on a condition.

*/

// --------------------------------------------------
// 1. NORMAL TOP-TO-BOTTOM EXECUTION
// --------------------------------------------------

console.log("First");
console.log("Second");
console.log("Third");

/*
  Normally JavaScript executes these statements from top to bottom.

  Output:

  First
  Second
  Third
*/

// --------------------------------------------------
// 2. IF
// --------------------------------------------------

const isActive = true;

if (isActive) {
  console.log("User is active");
}

/*
  Read this as:
  IF isActive is true, run the code inside the block.

  The block is: { console.log("User is active"); }
*/


// --------------------------------------------------
// 3. IF WITH FALSE
// --------------------------------------------------

const isDeleted = false;

if (isDeleted) {
  console.log("User was deleted");
}

/*
  Nothing is printed.
  Why? Because the condition is false.
  The program skips the code inside the if block.
*/

// --------------------------------------------------
// 4. COMPARISON AS A CONDITION
// --------------------------------------------------

const age = 25;

if (age >= 18) {
  console.log("Adult");
}

/*
  First evaluate:
  age >= 18
  25 >= 18
  -> true

  So JavaScript effectively sees:
  if (true) { console.log("Adult"); }
*/


// --------------------------------------------------
// 5. THE CONDITION IS AN EXPRESSION
// --------------------------------------------------

const stock = 3;
const hasStock = stock > 0;

console.log(hasStock); // true

if (hasStock) {
  console.log("Product is available");
}

//  We could also write the expression directly:

if (stock > 0) {
  console.log("Product is available");
}

/*
  These two approaches use the same idea.
  stock > 0
  produces a boolean value.
*/

// --------------------------------------------------
// 6. IF / ELSE
// --------------------------------------------------

const userAge = 15;

if (userAge >= 18) {
  console.log("Access allowed");
} else {
  console.log("Access denied");
}

/*
  if handles the true case.
  else handles the false case.

  So the else block runs.
*/

// --------------------------------------------------
// 7. EXACTLY ONE BRANCH RUNS
// --------------------------------------------------

const paymentCompleted = true;

if (paymentCompleted) {
  console.log("Prepare shipment");
} else {
  console.log("Wait for payment");
}

// --------------------------------------------------
// 8. USING === IN A CONDITION
// --------------------------------------------------

const status = "NEW";

if (status === "NEW") {
  console.log("This is a new item");
}

/*
  First: status === "NEW"
  becomes: "NEW" === "NEW"
  -> true

  Then the if block runs.
*/

// --------------------------------------------------
// 9. IF / ELSE IF / ELSE
// --------------------------------------------------

const score = 75;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 60) {
  console.log("Passed");
} else {
  console.log("Failed");
}


/*
  JavaScript checks the conditions in order.

  First:
  score >= 90
  -> false

  Then:
  score >= 60
  -> true

  So: Passed is printed.

  After a matching branch is found, the remaining branches are skipped.
*/

// --------------------------------------------------
// 10. ORDER MATTERS
// --------------------------------------------------

const temperature = 35;

if (temperature >= 30) {
  console.log("Hot");
} else if (temperature >= 20) {
  console.log("Warm");
} else {
  console.log("Cold");
}


/*
  35 >= 30
  -> true

  So "Hot" is printed.
  JavaScript does NOT continue checking the remaining branches.
*/

// --------------------------------------------------
// 11. RETURNING DIFFERENT VALUES
// --------------------------------------------------

function getAccessMessage(age: number) {
  if (age >= 18) {
    return "Access allowed";
  }

  return "Access denied";
}

console.log(getAccessMessage(25)); // Access allowed
console.log(getAccessMessage(15)); // Access denied

/*
  The function takes a number. Then it makes a decision.
  If the condition is true, it returns one value.
  Otherwise it reaches the second return.
*/

// --------------------------------------------------
// 12. RETURN STOPS THE FUNCTION
// --------------------------------------------------

function getStatusMessage(status: string) {
  if (status === "COMPLETED") {
    return "Work finished";
  }
  console.log("Function continues");

  return "Work still active";
}

console.log(getStatusMessage("COMPLETED"));

/*
  When status is COMPLETED: return "Work finished";
  ends the function immediately.
  The lines below that return are not executed.
*/

// --------------------------------------------------
// 13. GUARD CLAUSE
// --------------------------------------------------

function processQuantity(quantity: number) {
  if (quantity <= 0) {
    return "Invalid quantity";
  }

  return "Quantity accepted";
}

console.log(processQuantity(-1)); // Invalid quantity
console.log(processQuantity(3)); // Quantity accepted

/*
  This pattern is very common. First check for a problem.
  If there is a problem: return early.
  Otherwise the function continues.
  This is often called a guard clause.
*/


// --------------------------------------------------
// 14. WHY GUARD CLAUSES ARE USEFUL
// --------------------------------------------------

function calculateTotal(
  price: number,
  quantity: number
) {
  if (price <= 0) {
    return 0;
  }

  if (quantity <= 0) {
    return 0;
  }

  return price * quantity;
}

console.log(calculateTotal(20, 3)); // 60
console.log(calculateTotal(20, 0)); // 0

/*
  Instead of putting the main logic inside many nested if blocks, we reject invalid
  situations first.

  Then the normal logic remains simple: return price * quantity;
*/

// --------------------------------------------------
// 15. CONTROL FLOW
// --------------------------------------------------
const availableStock = 5;

console.log("Start");

if (availableStock > 0) {
  console.log("Stock available");
}

console.log("End");


/*
  Control flow means: the order in which the program executes code.

  Normally: top -> bottom

  But constructs such as:
  if
  else
  return

  can change that flow.
*/

// --------------------------------------------------
// 16. COMPLETE EXAMPLE
// --------------------------------------------------

function getOrderMessage(
  status: string
): string {

  if (status === "NEW") {
    return "Order has not started yet";
  }

  if (status === "IN_PROGRESS") {
    return "Order is being processed";
  }

  if (status === "COMPLETED") {
    return "Order is complete";
  }

  return "Unknown status";
}
console.log(getOrderMessage("NEW"));
console.log(getOrderMessage("IN_PROGRESS"));
console.log(getOrderMessage("COMPLETED"));
