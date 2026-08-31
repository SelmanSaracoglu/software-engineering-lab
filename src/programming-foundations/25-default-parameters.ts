/*
  DEFAULT PARAMETERS

  A function parameter normally gets its value
  from the argument passed during the function call.

  But sometimes we want a parameter to have
  a fallback value when no argument is provided.
*/


// --------------------------------------------------
// 1. NORMAL PARAMETER
// --------------------------------------------------

function greet(
  name: string
): string {

  return "Hello " + name;
}


console.log(
  greet("Alice")
);


// greet();
// Error: name is required.


// --------------------------------------------------
// 2. DEFAULT PARAMETER
// --------------------------------------------------

function greetUser(
  name: string = "Guest"
): string {

  return "Hello " + name;
}


console.log(
  greetUser("Alice")
);
// Hello Alice


console.log(
  greetUser()
);
// Hello Guest


/*
  name: string = "Guest"

  means:

  If an argument is provided,
  use that argument.

  Otherwise,
  use "Guest".
*/


// --------------------------------------------------
// 3. FOLLOW THE VALUE
// --------------------------------------------------

greetUser("Bob");

/*
  name = "Bob"

  -> "Hello Bob"
*/


greetUser();

/*
  no argument

  -> name = "Guest"

  -> "Hello Guest"
*/


// --------------------------------------------------
// 4. MULTIPLE PARAMETERS
// --------------------------------------------------

function calculatePrice(
  price: number,
  quantity: number = 1
): number {

  return price * quantity;
}


console.log(
  calculatePrice(50)
);
// 50


console.log(
  calculatePrice(50, 3)
);
// 150


/*
  price is required.

  quantity has a default value.

  So:

  calculatePrice(50)

  behaves like:

  calculatePrice(50, 1)
*/


// --------------------------------------------------
// 5. DEFAULT VALUE CAN BE A BOOLEAN
// --------------------------------------------------

function createMessage(
  text: string,
  important: boolean = false
): string {

  if (important) {
    return "IMPORTANT: " + text;
  }

  return text;
}


console.log(
  createMessage("Order created")
);
// Order created


console.log(
  createMessage(
    "Payment failed",
    true
  )
);
// IMPORTANT: Payment failed


// --------------------------------------------------
// 6. DEFAULT PARAMETER VS OPTIONAL PARAMETER
// --------------------------------------------------

function exampleOne(
  value?: string
): string {

  /*
    value is:

    string | undefined
  */

  return value ?? "Default";
}


function exampleTwo(
  value: string = "Default"
): string {

  /*
    Inside this function,
    value is already a string.
  */

  return value;
}


console.log(
  exampleOne()
);

console.log(
  exampleTwo()
);


/*
  These can produce similar results,
  but they express different ideas.

  value?: string

  -> value may be undefined inside the function.


  value: string = "Default"

  -> if no value is provided,
     the default is used automatically.
*/


// --------------------------------------------------
// 7. PRACTICAL EXAMPLE
// --------------------------------------------------

type Status =
  "NEW"
  | "IN_PROGRESS"
  | "COMPLETED";


function createStatusMessage(
  status: Status,
  prefix: string = "Order"
): string {

  if (status === "NEW") {
    return prefix + " is new";
  }

  if (status === "IN_PROGRESS") {
    return prefix + " is being processed";
  }

  return prefix + " is completed";
}


console.log(
  createStatusMessage("NEW")
);
// Order is new


console.log(
  createStatusMessage(
    "COMPLETED",
    "Customer order"
  )
);
// Customer order is completed


// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  REQUIRED PARAMETER

  function greet(
    name: string
  )


  The caller must provide name.


  DEFAULT PARAMETER

  function greet(
    name: string = "Guest"
  )


  The caller may provide name.

  If not:

  name becomes "Guest".


  MENTAL MODEL:

  argument provided?
        |
     yes|no
      /   \
     /     \
 argument  default
     \     /
      \   /
    parameter value
*/