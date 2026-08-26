/// <reference types="cypress" />

import { mount } from "cypress/react";

// COMPONENT MOUNTING
//
// A component test needs to render the component before Cypress can interact with it.
// In React Component Testing, mount() places a React component into the Cypress browser test environment.

function WelcomeMessage() {
  return <h1>Welcome</h1>;
}

describe("Component mounting", () => {
  it("mounts a React component", () => {
    mount(<WelcomeMessage />);
  });
});


// mount(...) is a function call.
// The argument: <WelcomeMessage /> is the React component that should be rendered.
//
// So: mount(<WelcomeMessage />);
// means: "Render WelcomeMessage inside the component test environment."


// A component can receive props normally.
type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <p>Hello {name}</p>;
}

describe("Mounting with props", () => {
  it("mounts a component with input data", () => {
    mount(
      <Greeting name="Selman" />
    );
  });
});


// Component mounting does not change how React components work.
// This: <Greeting name="Selman" /> is the same component usage we already know.
// mount() only provides the environment where Cypress can render and test it.


// Some components depend on surrounding infrastructure.
//
// Example:
//
// function Profile() {
//   const user = useUserContext();
//
//   return <p>{user.name}</p>;
// }
//
// Mounting only: mount(<Profile />);
// would not be enough if Profile requires a UserContext provider.
//
// The required environment must also be mounted:
//
// mount(
//   <UserProvider>
//     <Profile />
//   </UserProvider>
// );
//
// The same principle applies to:
//
// - React Router
// - Context providers
// - Redux providers
// - theme providers
// - other required wrappers



// IMPORTANT:
//
// mount() does not start the entire application.
// It renders the component tree that we explicitly provide.
//
// Example:
//
// mount(
//   <SomeProvider>
//     <ComponentUnderTest />
//   </SomeProvider>
// );
//
// The test therefore controls how much surrounding application infrastructure is included.



// PROJECT CONNECTION
//
// In many Cypress React projects you will see: cy.mount(<Component />);
// instead of: mount(<Component />);
//
// cy.mount() is usually a custom Cypress command configured in the project's support files.
//
// The underlying idea is still the same:
// render the React component tree inside the Cypress component test environment.