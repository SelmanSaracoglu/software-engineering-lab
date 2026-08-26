/// <reference types="cypress" />

// ALIASES AND REQUEST SYNCHRONIZATION
//
// Cypress aliases give important test resources a name that can be referenced later.
// With network requests, aliases are especially useful for synchronizing the test with real application behaviour.

describe("Aliases and request synchronization", () => {
  it("waits for a specific request to complete", () => {
    // Register an intercept and give it an alias.
    // The alias name is: getUsers

    cy.intercept(
      "GET",
      "/api/users",
      {
        statusCode: 200,
        body: [
          { id: 1, name: "Ada" },
          { id: 2, name: "Linus" }
        ]
      }
    ).as("getUsers");


    // #### IMPORTANT ###
    //
    // .as("getUsers") does NOT send the request.
    // It only gives the matching intercepted request a name that Cypress can reference later.

    // Imagine that some user action or component behaviour now causes the application to send:
    // GET /api/users
    // For example: cy.get("button").click();

    // The alias is referenced with @.
    cy.wait("@getUsers");

    // cy.wait("@getUsers") means:
    // "Wait until the request matching the getUsers intercept has completed."
  });
});

// --------------------------------------------------
// ALIAS CREATION VS ALIAS USAGE
// --------------------------------------------------
// Alias creation: .as("getUsers")
// Alias usage: "@getUsers"
// The @ symbol means: "Use the resource named getUsers."

// --------------------------------------------------
// WHY WAIT FOR THE REQUEST?
// --------------------------------------------------
// Consider this flow:
// User action
//     ↓
// HTTP request starts
//     ↓
// response arrives
//     ↓
// UI updates
//
// If the next assertion depends on the response, the test should synchronize with that real event.

// ### Fragile approach: cy.wait(1000);
//
// This means: 
// "Wait one second and hope the request has finished by then."
//
// Problems: The request might finish in:
// 100 ms
// 500 ms
// 1500 ms
//
// One second has no real connection to the behaviour being tested.

// ### Better approach: cy.wait("@getUsers");
//
// This means:
// "Continue when this specific request/response cycle completes."
// Now the test waits for an event, not an arbitrary amount of time.

// --------------------------------------------------
// AN ALIAS CONNECTS TEST SETUP TO TEST FLOW
// --------------------------------------------------
//
// Setup:
// 
// cy.intercept(
//   "GET",
//   "/api/users"
// ).as("getUsers");
//
// Application behaviour: GET /api/users
//
// Synchronization: cy.wait("@getUsers");
//
// The connection is:
//
// intercept rule
//      ↓
// .as("getUsers")
//      ↓
// application sends matching request
//      ↓
// Cypress tracks it as @getUsers
//      ↓
// cy.wait("@getUsers")
//      ↓
// test continues after completion

// --------------------------------------------------
// WAIT CAN ALSO GIVE INFORMATION ABOUT THE REQUEST
// --------------------------------------------------
//
// cy.wait("@getUsers") does more than pause the test.
// It yields information about the intercepted request and response.

describe("Inspecting an intercepted request", () => {
  it("can inspect the completed request", () => {
    cy.intercept(
      "GET",
      "/api/users",
      {
        statusCode: 200,
        body: []
      }
    ).as("getUsers");

    // After the application triggers the request, Cypress can expose information about it.
    cy.wait("@getUsers")
      .its("response.statusCode")
      .should("eq", 200);
  });
});

// Here:
// cy.wait("@getUsers") waits for the matching request.
// .its("response.statusCode")
// reads a property from the intercepted request/response information.
// .should("eq", 200) verifies the value.
// We will study assertions separately later.

// --------------------------------------------------
// ALIAS DOES NOT HAVE TO MEAN A STUB
// --------------------------------------------------
// Aliases work with both intercepted spies and intercepted stubs.

// Spy:
function registerUsersSpy() {
  cy.intercept(
    "GET",
    "/api/users"
  ).as("getUsers");
}
// The request continues to the real backend, but Cypress can still: cy.wait("@getUsers");

// Stub:
function registerUsersStub() {
  cy.intercept(
    "GET",
    "/api/users",
    {
      statusCode: 200,
      body: []
    }
  ).as("getUsers");
}
// Cypress supplies the response, and the same alias can still be used:
// cy.wait("@getUsers");


// --------------------------------------------------
// MAIN IDEA
// --------------------------------------------------
// .as("name") gives an important Cypress resource a name. --> "@name"
// refers to that named resource later. --> cy.wait("@name")
// synchronizes the test with the completion of that specific request.
// So instead of: "wait some amount of time"
// we prefer: "wait for the behaviour the test actually depends on."