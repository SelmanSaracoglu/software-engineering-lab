/// <reference types="cypress" />

// DYNAMIC NETWORK SCENARIOS AND RETRY TESTING
//
// A static intercept always returns the same response.
//
// cy.intercept("GET", "/api/report", {
//   statusCode: 200,
//   body: { status: "ready" }
// });
//
// Sometimes a test needs the same request to behave differently over time.
//
// Example:
// first request -> server error
// second request -> success
// For this, cy.intercept() can receive a callback function.

describe("Dynamic network scenarios", () => {
  it("fails first and succeeds after retry", () => {
    let requestCount = 0;

    cy.intercept(
      "GET",
      "/api/report",
      (request) => {
        requestCount += 1;

        if (requestCount === 1) {
          request.reply({
            statusCode: 500,
            body: {
              error: "Temporary failure"
            }
          });

          return;
        }

        request.reply({
          statusCode: 200,
          body: {
            status: "ready"
          }
        });
      }
    ).as("getReport");

    // The application triggers the first request. GET /api/report
    // Cypress calls the intercept callback.
    // requestCount becomes: 1
    // Therefore Cypress replies with: 500

    cy.wait("@getReport");

    // Imagine the UI now shows an error and provides a Retry button.

    cy.contains("button", "Retry")
      .click();

    // The application sends the same request again. GET /api/report
    // Cypress calls the SAME intercept callback again.
    // requestCount becomes: 2
    // The first condition is now false, so Cypress replies with: 200

    cy.wait("@getReport");

    cy.contains("Report ready")
      .should("be.visible");
  });
});

// --------------------------------------------------
// THE CALLBACK CONNECTION
// --------------------------------------------------
// This:
// (request) => {
//   ...
// }
// is a callback function.
//
// We already know the general pattern:
//
// function receives another function
//      ↓
// receiving system calls it later
//
// Here:
// cy.intercept(..., callback) --> Cypress receives the callback.
// When a matching HTTP request happens, Cypress calls that callback.

// --------------------------------------------------
// WHERE DOES "request" COME FROM?
// --------------------------------------------------
// In:
// (request) => {
//   ...
// }
// we do not create the request argument ourselves.

// Cypress supplies it when the callback runs.
// This is the same callback principle seen in:
//
// array.map((item) => {
//   ...
// });
//
// map() supplies: item
// cy.intercept() supplies: request


// --------------------------------------------------
// request.reply()
// --------------------------------------------------
//
// request.reply()
//
// lets the intercept callback decide how Cypress should respond to
// the current HTTP request.

function registerSuccessResponse() {
  cy.intercept(
    "GET",
    "/api/status",
    (request) => {
      request.reply({
        statusCode: 200,
        body: {
          status: "ok"
        }
      });
    }
  );
}
// The callback can therefore contain logic before deciding which response to return.


// --------------------------------------------------
// STATEFUL TEST SCENARIOS
// --------------------------------------------------
//
// requestCount stores state between matching requests:
//
// let requestCount = 0;
//
// first request: requestCount = 1
// second request: requestCount = 2
// third request: requestCount = 3
//
// This lets the test model behaviour that changes over time.

function registerTemporaryFailure() {
  let requestCount = 0;

  cy.intercept(
    "GET",
    "/api/status",
    (request) => {
      requestCount += 1;

      if (requestCount < 3) {
        request.reply({
          statusCode: 503
        });

        return;
      }

      request.reply({
        statusCode: 200,
        body: {
          status: "ok"
        }
      });
    }
  );
}

// --------------------------------------------------
// WHY TEST RETRY BEHAVIOUR?
// --------------------------------------------------
//
// Testing only: success -> success UI
// does not prove that retry behaviour works.
// A retry flow contains several behaviours:
//
// request fails
//      ↓
// application handles the failure
//      ↓
// user retries
//      ↓
// application sends another request
//      ↓
// second response succeeds
//      ↓
// application recovers correctly
//
// The test needs control over the sequence of responses to verify that complete flow.

// --------------------------------------------------
// STATIC VS DYNAMIC INTERCEPT
// --------------------------------------------------
//
// STATIC:
// cy.intercept(
//   "GET",
//   "/api/status",
//   {
//     statusCode: 200
//   }
// );
//
// Every matching request receives the predefined response.
//
// DYNAMIC:
// cy.intercept(
//   "GET",
//   "/api/status",
//   (request) => {
//     // decide response here
//   }
// );
//
// Cypress calls our callback for every matching request.
// Our test logic can decide what response that request receives.


// --------------------------------------------------
// MAIN IDEA
// --------------------------------------------------
//
// Dynamic intercepts are useful when the behaviour being tested depends on
// a sequence of network conditions.
// This allows tests to model scenarios such as:
//
// failure -> retry -> success
// unavailable -> unavailable -> available
// first response -> different second response