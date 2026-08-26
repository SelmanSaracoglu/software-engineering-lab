/// <reference types="cypress" />

// ASSERTIONS AND BEHAVIOUR VERIFICATION
//
// A test should not only perform actions.
// It must verify that the expected behaviour actually happened.
// In Cypress, one of the main assertion commands is:
// .should(...)


// --------------------------------------------------
// BASIC ASSERTION
// --------------------------------------------------
// cy.get(".success-message")
//   .should("be.visible");
//
// Read this as:
// 1. Find .success-message
// 2. Verify that it is visible

describe("Basic assertions", () => {
  it("verifies expected UI behaviour", () => {
    cy.get(".success-message")
      .should("be.visible");
  });
});

// --------------------------------------------------
// EXISTENCE VS VISIBILITY
// --------------------------------------------------
// These assertions do NOT prove the same thing.
// EXISTS IN THE DOM

cy.get(".notification")
  .should("exist");

// VISIBLE TO THE USER

cy.get(".notification")
  .should("be.visible");


// An element can exist in the DOM while still being hidden.

// Therefore: should("exist")
// answers: "Is this element present?"
// while: should("be.visible"?
// answers: "Can the user currently see this element?"

// --------------------------------------------------
// NEGATIVE ASSERTIONS
// --------------------------------------------------
// We can also verify that something should NOT be present.
cy.get(".loading-spinner")
  .should("not.exist");
// Or that an existing element should not be visible.
cy.get(".menu")
  .should("not.be.visible");
// Again, these represent different requirements.
// Choose the assertion based on the behaviour the application promises.


// --------------------------------------------------
// TEXT ASSERTIONS
// --------------------------------------------------
// We can verify displayed text.
cy.get(".status")
  .should("have.text", "Completed");
// If the requirement is that the element contains particular text:
cy.get(".message")
  .should(
    "contain.text",
    "Order saved"
  );
// The important question is:
// Do we require the complete text to match exactly?
// or
// Do we only require a particular piece of text to be present


// --------------------------------------------------
// ATTRIBUTE ASSERTIONS
// --------------------------------------------------
// Assertions can verify HTML attributes.

cy.get("dialog")
  .should(
    "have.attr",
    "aria-labelledby",
    "dialog-title"
  );
// This is especially useful for:
//
// - accessibility attributes
// - href values
// - disabled states
// - input attributes
// - data attributes


// --------------------------------------------------
// COLLECTION ASSERTIONS
// --------------------------------------------------
// A Cypress query can return more than one element.
// We can verify how many were found.
cy.get(".product-card")
  .should("have.length", 3);
// This proves: exactly three matching elements exist.


// --------------------------------------------------
// FOCUS ASSERTIONS
// --------------------------------------------------
// Some behaviour is not about visible text.
// Example: after opening a dialog, a particular control may need focus.

cy.focused()
  .should(
    "contain.text",
    "Close"
  );

// cy.focused()
// queries the element that currently has browser focus.
// The assertion then verifies something about that element.


// --------------------------------------------------
// ASSERTIONS FOLLOW THE REQUIREMENT
// --------------------------------------------------
// Imagine a requirement: "After saving, the success message must be visible."
//
// Weak assertion:
// cy.get(".success-message")
//   .should("exist");
//
// This only proves that the element exists somewhere in the DOM.
//
// Stronger assertion for this requirement:
// cy.get(".success-message")
//   .should("be.visible");
//
// The assertion should prove what the requirement actually says.


// --------------------------------------------------
// CYPRESS RETRY-ABILITY
// --------------------------------------------------
// Modern UIs do not always update immediately.
//
// user clicks Save
//      ↓
// request is sent
//      ↓
// response arrives
//      ↓
// React updates the UI
//      ↓
// success message appears
//
// Cypress queries and assertions are designed to handle this asynchronous behaviour.

cy.get(".success-message")
  .should("be.visible");

// Cypress does not necessarily perform this check only once.
// If the linked query/assertion has not passed yet, 
// Cypress can retry the query chain
// until the assertion passes or the timeout is reached.

// query DOM
//    ↓
// assertion passes?
//
// YES
// → continue test
//
// NO
// → query again
// → assert again
//
// until timeout

// This is one reason we usually do not need:
// cy.wait(1000);
// before every UI assertion.


// --------------------------------------------------
// ACTIONS AND ASSERTIONS HAVE DIFFERENT JOBS
// --------------------------------------------------

cy.get("button")
  .contains("Save")
  .click();

// This performs behaviour.
// But clicking successfully does NOT prove that the application reacted correctly.
// We still need verification:

cy.get(".success-message")
  .should("be.visible");

// ACTION -> do something
// ASSERTION -> prove the expected result


// --------------------------------------------------
// MULTIPLE ASSERTIONS
// --------------------------------------------------
// More than one property of the same subject can be verified.

cy.get("button")
  .should("be.visible")
  .and("have.attr", "type", "submit");

// .and()
// is an alias for another assertion in the same chain.


// --------------------------------------------------
// CHOOSING THE RIGHT ASSERTION
// --------------------------------------------------
//
// Requirement: "The dialog is open."
// Possible verification:
// cy.get("dialog")
//   .should("have.attr", "open");
//
// Requirement: "The error is visible to the user."
// Possible verification:
// cy.contains("Something went wrong")
//   .should("be.visible");
//
// Requirement: "The optional field must not be rendered."
// Possible verification:
// cy.contains("Optional note")
//   .should("not.exist");
//
// Requirement: "Exactly two rows should be displayed."
// Possible verification:
// cy.get(".row")
//   .should("have.length", 2);


// --------------------------------------------------
// MAIN IDEA
// --------------------------------------------------
// Assertions should not be chosen simply because they make the test pass.
// Start from the behaviour: "What exactly should be true?"
// Then choose the assertion that proves that condition.
//
// A good assertion verifies behaviour, not implementation details that do not matter to the requirement.