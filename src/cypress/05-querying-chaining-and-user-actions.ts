/// <reference types="cypress" />

// QUERYING, COMMAND CHAINING AND USER ACTIONS
//
// find something
//      ↓
// continue with that subject
//      ↓
// perform an action
//
// cy.get("button")
//   .click();

// --------------------------------------------------
// cy.get()
// --------------------------------------------------
// cy.get() finds elements using a CSS selector.

describe("Querying elements", () => {
  it("finds a button by CSS selector", () => {
    cy.get("button");
  });
});

// cy.get("#save-button"); -> element with id="save-button"
// cy.get(".product-card"); -> elements with class="product-card"
// cy.get('[data-testid="submit"]'); -> element with: data-testid="submit"

// --------------------------------------------------
// cy.contains()
// --------------------------------------------------
// cy.contains() finds an element using visible text.

describe("Finding elements by text", () => {
  it("finds visible text", () => {
    cy.contains("Save");
  });
});

// We can also combine a selector and text: cy.contains("button", "Save");
// This means: find a button whose visible text contains "Save".

// --------------------------------------------------
// COMMAND CHAINING
// --------------------------------------------------
// Cypress commands can be chained.

describe("Command chaining", () => {
  it("finds an element and performs an action", () => {
    cy.get(".toolbar")
      .contains("button", "Save")
      .click();
  });
});

// Read the chain from top to bottom:
// cy.get(".toolbar") -> find the toolbar
// .contains("button", "Save") -> inside the current subject, find a Save button
// .click() -> click that button

// The important idea is: each command works with the result produced by the previous command.

// --------------------------------------------------
// SUBJECT
// --------------------------------------------------
//
// In Cypress terminology, the value currently flowing through a command chain is often called the subject.
//
// Example: cy.get(".user-card")
// current subject: .user-card element
// Then: .contains("Edit") works relative to that subject.

describe("Working with a subject", () => {
  it("narrows the search", () => {
    cy.get(".user-card")
      .contains("button", "Edit")
      .click();
  });
});

// This is different from: cy.contains("button", "Edit").click();
// The second version searches more broadly.
// The chained version first finds: .user-card
// and then looks for the Edit button in that context.

// --------------------------------------------------
// USER ACTIONS
// --------------------------------------------------
// Cypress can perform browser interactions on the current subject.
//
// Common examples:
//
// .click()
// .type()
// .check()
// .uncheck()
// .select()
// .focus()
// .blur()


describe("User actions", () => {
  it("performs actions on form controls", () => {
    cy.get("#email")
      .type("user@example.com");

    cy.get("#terms")
      .check();

    cy.get("button")
      .contains("Submit")
      .click();
  });
});

// Here: cy.get("#email") finds the input.
// .type("user@example.com") simulates typing into that input.

// --------------------------------------------------
// CHAINING DOES NOT MEAN NORMAL JAVASCRIPT VALUES
// --------------------------------------------------
// Cypress commands look similar to normal JavaScript method chaining:
// object.method().method() 
// but Cypress manages its own command queue.
//
// cy.get("button")
//   .click();
//
// should be read as:
// queue:
// 1. find the button
// 2. click the resulting subject
// Cypress controls when these commands execute.

// Therefore this is NOT the same idea as:
// const button = cy.get("button");
// and then treating "button" like a normal DOM element immediately.
// Cypress commands are designed to stay inside the Cypress command chain.

// --------------------------------------------------
// WHY CHAINING IS USEFUL
// --------------------------------------------------
//
// Consider a page containing several cards:
//
// <div class="user-card">
//   <span>Ada</span>
//   <button>Edit</button>
// </div>
//
// <div class="user-card">
//   <span>Linus</span>
//   <button>Edit</button>
// </div>
//
// We do not simply want: "some Edit button"
// We may want: "the Edit button related to Ada"
// Cypress allows us to narrow the context.

describe("Narrowing a query", () => {
  it("finds an action inside a specific result", () => {
    cy.contains(".user-card", "Ada")
      .contains("button", "Edit")
      .click();
  });
});

// Read it: 
// cy.contains(".user-card", "Ada") -> find a user-card containing Ada
// .contains("button", "Edit")-> inside that card, find Edit
// .click() -> click it

// --------------------------------------------------
// QUERY + ACTION PATTERN
// --------------------------------------------------
//
// A large amount of Cypress code can be read as:
//
// query
//   ↓
// narrow
//   ↓
// action
//
// cy.get(".product")
//   .contains("button", "Add")
//   .click();


// This is easier to understand if we separate:
// WHAT are we finding?
// from:
// WHAT are we doing to it?

// --------------------------------------------------
// CONNECTION TO REAL TESTS
// --------------------------------------------------
//
// When you see code like:
// cy.contains(".order-row", "#101")
//   .contains("View")
//   .click();
//
// read it as:
// 1. Find the order row containing "#101".
// 2. Inside that result, find the element containing "View".
// 3. Click it.
//
// The specific application can change. The Cypress pattern does not:
//
// locate relevant UI
//      ↓
// narrow the target
//      ↓
// perform user action


// --------------------------------------------------
// MAIN IDEA
// --------------------------------------------------
// Cypress UI interaction often follows:
//
// QUERY -> find something
// CHAIN -> continue with the current subject
// ACTION -> interact with it
//
// cy.get(".panel")
//   .contains("button", "Open")
//   .click();
//
// Different projects may contain completely different HTML and components.
// The reusable skill is recognizing:
//
// query
//      ↓
// subject
//      ↓
// chained command
//      ↓
// user action