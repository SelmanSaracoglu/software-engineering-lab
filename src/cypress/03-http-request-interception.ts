/// <reference types="cypress" />

// HTTP REQUEST INTERCEPTION
//
// cy.intercept() allows Cypress to observe or control HTTP requests made by the application.
// cy.intercept() does NOT create an HTTP request. It registers a rule:
// "If the application sends a matching request, intercept it."

// Imagine the application contains: fetch("/api/users");
// The application itself creates the request.
//
// Cypress can position itself between the frontend and the backend:
//
// Frontend
//    ↓
// Cypress intercept
//    ↓
// Backend


// --------------------------------------------------
// 1. SPYING ON A REQUEST
// --------------------------------------------------
//
// If no response is provided, Cypress observes the matching request
// but allows it to continue to the real backend.

function registerUsersSpy() {
  cy.intercept(
    "GET",
    "/api/users"
  );
}

// Frontend
//    ↓
// GET /api/users
//    ↓
// Cypress sees the request
//    ↓
// request continues
//    ↓
// REAL BACKEND
//    ↓
// real response
//    ↓
// Frontend
//
// This is a SPY.
// Cypress observes the network request, but the real backend is still part of the flow.


// --------------------------------------------------
// 2. STUBBING A RESPONSE
// --------------------------------------------------
//
// If we provide a response to cy.intercept(), Cypress can respond to the request itself.

const testUsers = [
  {
    id: 1,
    name: "Ada"
  },
  {
    id: 2,
    name: "Linus"
  }
];

function registerUsersStub() {
  cy.intercept(
    "GET",
    "/api/users",
    {
      statusCode: 200,
      body: testUsers
    }
  );
}


// Conceptually:
//
// Frontend
//    ↓
// GET /api/users
//    ↓
// Cypress intercepts the request
//    ↓
// Cypress returns:
// 200 + testUsers
//    ↓
// Frontend
//
// The real backend is NOT needed for this matching request.
// This is a STUB.


// --------------------------------------------------
// SPY VS STUB
// --------------------------------------------------
//
// SPY: 
// cy.intercept("GET", "/api/users");
// Request: Frontend → Cypress → Real Backend
// Cypress observes the request.
//
//
// STUB:
// cy.intercept("GET", "/api/users", {
//   statusCode: 200,
//   body: testUsers
// });
//
// Request: Frontend → Cypress
// Cypress supplies the response.
// The real backend does not supply the response.


// --------------------------------------------------
// WHAT IS REAL IN THE STUBBED SCENARIO?
// --------------------------------------------------
//
// Even with a stubbed response, the frontend still runs its real code.
// For example, the application may really execute:
//
// fetch("/api/users");
//
// It still:
//
// 1. creates the request
// 2. waits for a response
// 3. receives response data
// 4. processes that data
// 5. updates the UI
//
// What has been replaced is: the real backend response.
// So we are NOT pretending that the frontend made a request.
// The frontend really makes one.
// Cypress controls what happens after the request reaches the intercept.


// --------------------------------------------------
// WHY STUB A RESPONSE?
// --------------------------------------------------
//
// A frontend test may need to verify:
//
// - successful response
// - empty response
// - 404 response
// - 500 response
// - slow response
//
// Without stubbing, creating those backend conditions may require:
//
// - a running backend
// - specific database records
// - special server configuration
// - intentionally breaking the server
//
// A stub lets the test create the required condition directly.


// --------------------------------------------------
// HTTP METHOD + URL MATCHING
// --------------------------------------------------
//
// This intercept:
//
// cy.intercept(
//   "GET",
//   "/api/users"
// );
//
// matches:
//
// method: GET
// route: /api/users
//
//
// A POST request would not match: POST /api/users
// A different route would not match: GET /api/orders

function registerUserCreationStub() {
  cy.intercept(
    "POST",
    "/api/users",
    {
      statusCode: 201,
      body: {
        id: 3,
        name: "Grace"
      }
    }
  );
}
// The test can therefore control different HTTP interactions independently.

// --------------------------------------------------
// THE MAIN DISTINCTION
// --------------------------------------------------
//
// cy.intercept() itself: -> registers interception behaviour
// application code: -> creates the HTTP request
// spy: -> observes the real request/response flow
// stub: -> replaces the backend response
//
// A useful way to read:
//
// cy.intercept(
//   "GET",
//   "/api/users",
//   {
//     statusCode: 200,
//     body: testUsers
//   }
// );
//
// is:
//
// "If the application sends GET /api/users,
// intercept that request and return this controlled response."