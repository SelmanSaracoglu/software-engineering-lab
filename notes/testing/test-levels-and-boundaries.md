# Test Levels and Boundaries
Software tests should not all verify the same thing.

Different test levels exist because different kinds of failures need to be detected at different boundaries.

A useful question for every test is:
>>> What part of the system is this test responsible for proving? <<<

The goal is not to make every test verify the entire application.
The goal is to combine several focused test levels so that together they provide confidence in the system.


## Unit Tests
A unit test verifies a small piece of logic in isolation.

Typical examples:

* a function
* validation logic
* calculations
* transformations
* small business rules

A unit test usually avoids external dependencies such as databases, HTTP servers, or browser behaviour.

The main question is:

> Does this small piece of logic behave correctly?

Unit tests are usually very fast and make failures easy to locate.

Their limitation is that they do not prove that different system components work correctly together.

---

## Component Tests

A component test verifies the behaviour of a UI component or a small UI area.

The component may still need some supporting infrastructure such as routing or context providers, but the test does not need to start the complete application.

In the Boutique Order App, the `OrderDetailDialog` Cypress tests are component tests.

The frontend really performs its normal behaviour:

```text
render component
→ make request
→ process response
→ update UI
```

However, the backend response is controlled with Cypress.

For example:

```text
API returns 200
→ detail should render

API returns 404
→ "Order not found" should appear

API returns 500
→ controlled error state should appear

API response is delayed
→ loading state should appear
```

The component test is therefore answering:

> If the frontend receives this condition, does the UI behave correctly?

It is **not** proving that the real backend actually produces that response.

That belongs to another test boundary.

---

## Integration Tests

An integration test verifies that multiple real parts of the system work together correctly.

For example:

```text
HTTP route
+
request validation
+
service logic
+
database
```

In the Boutique Order App, the backend API integration tests verify behaviours such as:

```text
POST /api/orders
GET /api/orders
GET /api/orders/:id
validation
database persistence
transaction rollback
404 behaviour
controlled server errors
```

Here the important question is:

> Do these real system components integrate correctly?

Unlike the frontend component test, the backend integration test does not simply assume that the API works correctly.

It exercises the actual API implementation and database behaviour.

Integration tests catch problems that isolated unit or component tests cannot detect.

---

## End-to-End Tests

An end-to-end test verifies a real user flow across the complete system.

Conceptually:

```text
User
↓
Frontend
↓
HTTP API
↓
Backend
↓
Database
↓
Response
↓
Frontend
```

For example, an E2E order flow could verify:

```text
User opens the application
→ creates an order
→ order is persisted
→ dashboard displays it
→ user opens the order detail
→ persisted data is displayed correctly
```

This type of test can catch integration failures between frontend and backend that isolated tests may miss.

For example, imagine the frontend expects:

```text
customerName
```

but the backend accidentally changes the API contract to:

```text
customer_name
```

A component test using a controlled response with `customerName` could still pass.

A backend integration test could also pass because the backend is internally behaving as implemented.

But an E2E test exercising the real frontend and real backend together could expose the contract mismatch.

---

## Test Boundaries

The most important concept is the **test boundary**.

Every test chooses which parts of the system are real and which parts are outside its responsibility.

For the `OrderDetailDialog` component test:

```text
REAL

React component
React Router behaviour
frontend request logic
loading logic
error handling
rendering
user interaction

CONTROLLED

backend response
database state
server behaviour
```

For a backend integration test:

```text
REAL

Express route
validation
application logic
database operations
transaction behaviour

OUTSIDE THE TEST

browser UI
React
user interaction
```

For an E2E test:

```text
REAL

frontend
backend
API contract
database
routing
user workflow
```

As the test boundary grows, the test provides broader confidence but usually becomes slower, more expensive, and harder to diagnose when it fails.

---

## Why Not Use Only E2E Tests?

If E2E tests exercise the whole system, it may seem logical to use them for everything.

But this creates problems.

A failed E2E test may involve:

```text
frontend
backend
database
network
test data
environment configuration
```

Finding the actual cause can therefore be harder.

E2E tests are also generally slower and require more infrastructure.

Smaller tests provide faster and more precise feedback.

That is why a healthy test strategy uses different test levels rather than trying to make one level prove everything.

---

## Why Controlled Responses Are Useful

When Cypress intercepts an API request and returns a controlled response, the test is not pretending that the frontend made a request.

The frontend still performs its real request behaviour.

What Cypress removes from the test boundary is the dependency on the real backend.

This allows difficult conditions to be reproduced intentionally:

```text
404
500
slow response
empty response
retry sequence
```

Without network control, producing these conditions reliably against a real backend could require special database state, server configuration, or intentional failures.

The component test instead asks:

> Given this backend condition, does the frontend respond correctly?

---

## Boutique Order App Testing Model

A useful model for the project is:

```text
Unit Tests
↓
small logic is correct

Component Tests
↓
frontend behaviour is correct under controlled conditions

Backend Integration Tests
↓
API + validation + database behaviour is correct

E2E Tests
↓
real frontend and backend work together through important user flows
```

No single layer provides complete confidence.

The confidence comes from the layers complementing each other.

---

## Main Principle

A good test should have a clear responsibility.

Do not ask every test to prove the entire system.

Instead:

```text
small tests
→ locate logic problems precisely

integration tests
→ verify real components work together

E2E tests
→ verify critical complete workflows
```

The key engineering decision is therefore not simply:

> What test framework should we use?

It is:

> What boundary should this test own, and what failure is it intended to detect?
