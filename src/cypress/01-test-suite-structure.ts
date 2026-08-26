/// <reference types="cypress" />

// CYPRESS TEST SUITE STRUCTURE
//
// describe()
// beforeEach()
// it()
//
// These functions define the structure and lifecycle of a test suite.

describe("Calculator", () => {

  // beforeEach() runs before every test inside this describe block.

  beforeEach(() => {
    console.log("Prepare test");
  });

  // it() defines one test case.
  // First argument: -> description of the expected behaviour
  // Second argument: -> callback containing the test steps

  it("adds two numbers", () => {
    const result = 2 + 3;

    expect(result).to.equal(5);
  });


  it("subtracts two numbers", () => {
    const result = 10 - 4;

    expect(result).to.equal(6);
  });

});


// Execution order:
//
// beforeEach
// ↓
// first it()
//
// beforeEach
// ↓
// second it()


// describe() --> Groups related tests together.
// beforeEach() --> Defines setup that should happen before every test in the suite.
// it() --> Defines one behaviour that should be independently verified.

// CALLBACK CONNECTION
// All three functions receive callbacks.

describe("Example", () => {

  beforeEach(() => {
    // callback
  });

  it("does something", () => {
    // callback
  });

});

// The callback concept is the same one used elsewhere in JavaScript:
//
// function execute(callback: () => void) {
//   callback();
// }
//
// The important difference is that Cypress controls when each callback is executed.