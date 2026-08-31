/*
  VALUES, VARIABLES AND BASIC TYPES

  Before understanding objects, arrays, functions, conditions, APIs or databases, we need to understand:
  - what a value is
  - why we give values names
  - what const and let do
  - what assignment means
  - what basic value types are
*/

// --------------------------------------------------
// 1. VALUES
// --------------------------------------------------

/*
  A value is a piece of data. 
  These are three different values:

  "Hello" -> string
  42      -> number
  true    -> boolean
*/

// --------------------------------------------------
// 2. VARIABLES
// --------------------------------------------------

/*  Programs become difficult to understand if we use raw values everywhere.
    We therefore give values meaningful names. */

const username = "selman"
const age = 32
const isActive = true

// Read: Create a variable called username and give it the value "selman".

// --------------------------------------------------
// 3. VARIABLE NAME AND VALUE ARE DIFFERENT
// --------------------------------------------------

const price = 50

/*
  price -> variable name
  50 -> value
  The variable name helps us refer to the value.
*/
console.log(price)

// --------------------------------------------------
// 4. ASSIGNMENT
// --------------------------------------------------

const quantity = 3 // assign the value 3 to the variable quantity.

// --------------------------------------------------
// 5. VALUES CAN BE USED TO CREATE NEW VALUES
// --------------------------------------------------

const unitPrice = 25
const itemQuantity = 4
const total = unitPrice * itemQuantity

console.log(total) // 100


/*
  The program already knows:
  unitPrice    -> 25
  itemQuantity -> 4

  unitPrice * itemQuantity
  produces: 100

  That new value is assigned to: total
*/

// --------------------------------------------------
// 6. STRING
// --------------------------------------------------

// A string represents text. Strings are normally written inside quotes.

const productName = "Blue Shirt"
const city = "Duisburg"
const status = "ACTIVE"

console.log(productName)
console.log(city)
console.log(status)


// --------------------------------------------------
// 7. NUMBER
// --------------------------------------------------

const productPrice = 49.99
const stock = 10
const discount = 5

/*
  number represents numeric values. It can contain whole numbers: 10
  or decimal numbers: 49.99
*/

console.log(productPrice)
console.log(stock)
console.log(discount)

// --------------------------------------------------
// 8. BOOLEAN
// --------------------------------------------------

const hasStock = true
const isDeleted = false

/*
  A boolean can contain only: true or false
  Booleans are extremely important because programs constantly need to make decisions.
  Later we will use boolean values with conditions.
*/

console.log(hasStock)
console.log(isDeleted)

// --------------------------------------------------
// 9. SAME APPEARANCE, DIFFERENT TYPE
// --------------------------------------------------

const numericId = 101
const textId = "101"

/*
  These are NOT the same kind of value.

  101 -> number
  "101" -> string
*/

console.log(numericId)
console.log(textId)


// --------------------------------------------------
// 10. TYPE AFFECTS BEHAVIOR
// --------------------------------------------------
//  The TYPE of a value affects what operations mean.

const firstNumber = 10
const secondNumber = 20

console.log(firstNumber + secondNumber) // 30

const firstText = "10"
const secondText = "20"

console.log(firstText + secondText) // 1020

// --------------------------------------------------
// 11. CONST
// --------------------------------------------------

const country = "Germany"

/*
  const creates a variable that cannot later be reassigned to another value.
  This would be an error: country = "Italy"
*/

console.log(country)


// --------------------------------------------------
// 12. LET
// --------------------------------------------------
//  let allows reassignment. The variable still exists, but the value assigned to it changes.

let score = 0
console.log(score) // 0

score = 10 
console.log(score) // 10

score = 20
console.log(score) // 20

// --------------------------------------------------
// 13. CONST VS LET
// --------------------------------------------------

const customerName = "Ayse"

let currentStep = 1
currentStep = 2
currentStep = 3

console.log(customerName)
console.log(currentStep)

/*
  General rule:
  Prefer const when reassignment is not necessary.
  Use let when the variable genuinely needs to receive another value later.
*/


// --------------------------------------------------
// 14. TYPESCRIPT TYPES
// --------------------------------------------------

/*
  TypeScript lets us describe the expected type
  explicitly.

  : string
  : number
  : boolean
*/

const language: string = "TypeScript"
const year: number = 2026
const isLearning: boolean = true

console.log(language)
console.log(year)
console.log(isLearning)


// --------------------------------------------------
// 15. TYPE INFERENCE
// --------------------------------------------------

/*
  We did not write:
  : string
  : number
  : boolean

  But TypeScript can understand the types from the values.
  This is called type inference.
*/

const inferredName = "Alex"
const inferredAge = 25
const inferredActive = false

console.log(inferredName)
console.log(inferredAge)
console.log(inferredActive)

// --------------------------------------------------
// 16. READ A LINE OF CODE
// --------------------------------------------------

const finalPrice = 80

/*
  const -> create a variable that will not be reassigned
  finalPrice -> variable name
  = -> assignment
  80 -> value
  number -> type of that value
*/

// --------------------------------------------------
// 17. SMALL COMPLETE EXAMPLE
// --------------------------------------------------

const itemName = "Keyboard"
const itemPrice = 60
const orderedQuantity = 2
const available = true
const orderTotal = itemPrice * orderedQuantity

console.log(itemName)
console.log(itemPrice)
console.log(orderedQuantity)
console.log(available)
console.log(orderTotal)

// --------------------------------------------------
// CORE IDEA
// --------------------------------------------------

/*
  VALUE         -->     The actual data.
  VARIABLE      -->     A meaningful name used to refer to a value.
  TYPE          -->     Describes what kind of value we have.
  ASSIGNMENT    -->     =   -->     assigns a value to a variable.
  CONST         -->     Used when the variable does not need reassignment.
  LET           -->     Used when the variable needs reassignment.
*/