# UI Test Architecture

## Selectors, Helpers, Custom Commands, and Page Objects

UI tests often begin as simple sequences:

```ts
cy.get('[data-testid="email"]').type("ada@example.com");
cy.get('[data-testid="password"]').type("secret");
cy.get('[data-testid="sign-in"]').click();
```

This is easy to understand while the test suite is small.

As the suite grows, the same selectors and interactions may appear in multiple tests. The natural reaction is to move everything into separate files, helper functions, custom commands, or page objects.

However, abstraction is not automatically an improvement.

A useful abstraction should:

- reduce meaningful duplication,
- make the test easier to understand,
- provide one clear place for related changes,
- preserve the behaviour and reliability of the test,
- hide irrelevant UI mechanics without hiding the purpose of the test.

The goal is not to remove every repeated line.

The goal is to make tests readable, maintainable, and trustworthy.

---

## Selector Strategy and Test Architecture Are Different Decisions

Two separate questions are often mixed together:

1. How should the test locate an element?
2. Where should the interaction code live?

A selector answers the first question:

```ts
'[data-testid="save-profile"]';
```

A helper, custom command, or page object answers the second:

```ts
function saveProfile() {
  return cy.get('[data-testid="save-profile"]').click();
}
```

Moving a weak selector into a page object does not make it reliable.

Similarly, using a good selector does not determine whether the interaction belongs directly in the test, inside a helper, or inside a page object.

Selector stability and code organization should therefore be evaluated separately.

---

# 1. Selectors

A selector describes how the test finds an element in the rendered interface.

## Brittle Selectors

A selector is brittle when it depends on presentation details that may change without changing the behaviour of the application.

```ts
cy.get(".form-container > div:nth-child(3) > button");
```

This selector depends on:

- CSS classes,
- DOM structure,
- element position,
- implementation details unrelated to behaviour.

A harmless layout or styling change may break the test.

The failure would not indicate broken user behaviour. It would only indicate that the test was coupled too closely to the current markup.

## Stable Selectors

Dedicated `data-*` attributes provide an explicit contract between the application and its tests.

```html
<button data-testid="save-profile">Save</button>
```

```ts
cy.get('[data-testid="save-profile"]').click();
```

The selector is independent of:

- CSS classes,
- visual styling,
- DOM position,
- surrounding elements.

A project may use names such as:

```text
data-testid
data-cy
data-test
```

The exact name is less important than using one convention consistently.

## User-Facing Selectors

Sometimes visible content is the behaviour being tested.

```ts
cy.contains("button", "Delete account").click();
```

This can be appropriate when the test intentionally verifies that the user sees and can use a button with that label.

However, visible text may change because of:

- copy changes,
- translation,
- capitalization,
- dynamic content.

Text selectors should therefore be used when the text itself is relevant to the test—not merely because it is convenient.

## Selector Guideline

Prefer selectors that express a stable testing contract.

Use presentation-dependent selectors only when presentation is intentionally part of the behaviour under test.

---

# 2. Selector Collections

Selectors can be stored in an object:

```ts
const profileSelectors = {
  displayName: '[data-testid="display-name"]',
  saveButton: '[data-testid="save-profile"]',
  successMessage: '[data-testid="save-success"]',
};
```

The test can then use them:

```ts
cy.get(profileSelectors.displayName).type("Ada");

cy.get(profileSelectors.saveButton).click();
```

This centralizes selector values, but it does not yet create a behavioural abstraction.

The test still needs to know:

- which field must be used,
- how the field is completed,
- which button must be clicked,
- in which order the operations happen.

A selector collection is therefore not the same as a page object.

It may still be useful when multiple tests genuinely need access to the same selectors. However, moving every selector into a separate file can add indirection without improving readability.

The following code:

```ts
cy.get(profileSelectors.saveButton).click();
```

is not necessarily clearer than:

```ts
cy.get('[data-testid="save-profile"]').click();
```

Selector collections should solve an actual maintenance problem rather than being created automatically.

---

# 3. Local Helper Functions

A helper function groups a meaningful sequence of actions.

```ts
function updateDisplayName(name: string) {
  cy.get('[data-testid="display-name"]').clear().type(name);

  return cy.get('[data-testid="save-profile"]').click();
}
```

The test can focus on behaviour:

```ts
it("updates the display name", () => {
  cy.visit("/profile");

  updateDisplayName("Ada");

  cy.get('[data-testid="save-success"]').should("be.visible");
});
```

The helper hides the mechanical details of updating the form while leaving the expected outcome inside the test.

## When a Local Helper Is Appropriate

Use a local helper when:

- the same interaction appears multiple times in one spec,
- the interaction has a meaningful name,
- extracting it makes the scenario easier to read,
- it is not yet needed throughout the whole test suite.

A function used by only one spec usually does not need to become a global Cypress command.

Keeping it close to the tests also makes it easier to understand and change.

## Helpers Should Describe Behaviour

A helper such as:

```ts
function clickButton(selector: string) {
  return cy.get(selector).click();
}
```

provides little value.

It replaces:

```ts
cy.get(selector).click();
```

with another way of writing the same instruction.

A more useful helper expresses intent:

```ts
function submitProfileChanges() {
  return cy.get('[data-testid="save-profile"]').click();
}
```

The name explains why the action is performed, not only how Cypress performs it.

---

# 4. Shared Helper Functions

A local helper may later become useful in several spec files.

It can then be moved into an imported module:

```ts
// support/profile-actions.ts

export function updateDisplayName(name: string) {
  cy.get('[data-testid="display-name"]').clear().type(name);

  return cy.get('[data-testid="save-profile"]').click();
}
```

```ts
import { updateDisplayName } from "../support/profile-actions";
```

A shared helper remains a normal TypeScript function.

Its advantages include:

- explicit imports,
- normal function typing,
- clear dependencies,
- no modification of Cypress's global API,
- use in only the specs that need it.

A shared helper is often sufficient when behaviour must be reused but does not need to feel like a built-in Cypress command.

---

# 5. Cypress Custom Commands

A custom command extends the Cypress command API:

```ts
Cypress.Commands.add("loginByApi", (email: string, password: string) => {
  return cy.request("POST", "/api/session", {
    email,
    password,
  });
});
```

It can then be used through `cy`:

```ts
cy.loginByApi("ada@example.com", "secret");
```

In a TypeScript project, the new command must also be added to the Cypress `Chainable` interface.

## When a Custom Command Is Appropriate

A custom command is useful when an operation:

- is required throughout the test suite,
- is closely connected to Cypress behaviour,
- represents a stable and commonly understood test action,
- benefits from Cypress command chaining,
- should be available through the global `cy` interface.

Common examples include:

- authentication setup,
- application-wide test setup,
- a shared component mount command,
- a reusable domain-level Cypress operation.

## Why Not Make Everything a Custom Command?

Custom commands are globally available.

If every small interaction becomes a command:

```ts
cy.openProfile();
cy.enterDisplayName("Ada");
cy.clickSaveButton();
cy.checkSuccessMessage();
```

the test may appear readable at first, but understanding it requires searching through several global command implementations.

Excessive custom commands can produce:

- a crowded global API,
- hidden test behaviour,
- unclear dependencies,
- additional TypeScript declarations,
- abstractions that are difficult to remove or change.

If an operation is only used in one spec, a local function is usually simpler.

If an operation belongs to a specific page or component, an imported page or component object may provide clearer ownership.

---

# 6. Page Object Model

The Page Object Model is a test design pattern.

It is not exclusive to:

- Selenium,
- Java,
- object-oriented test frameworks.

A page object provides an interface to a page or another cohesive part of the user interface.

Instead of exposing every selector to the test, it exposes the behaviours that the interface offers.

A page object does not have to be implemented as a class.

```ts
export const profilePage = {
  open() {
    cy.visit("/profile");
  },

  updateDisplayName(name: string) {
    cy.get('[data-testid="display-name"]').clear().type(name);

    return cy.get('[data-testid="save-profile"]').click();
  },
};
```

The test uses the page through its behaviours:

```ts
it("updates the display name", () => {
  profilePage.open();

  profilePage.updateDisplayName("Ada");

  cy.get('[data-testid="save-success"]').should("be.visible");
});
```

The page object knows how the interface is operated.

The test remains responsible for describing the scenario and verifying the expected result.

## Page Objects Should Expose Services, Not Only Selectors

A weak page object may only expose element locations:

```ts
class ProfilePage {
  displayNameInput = '[data-testid="display-name"]';

  saveButton = '[data-testid="save-profile"]';
}
```

The test still performs all UI mechanics:

```ts
cy.get(profilePage.displayNameInput).type("Ada");

cy.get(profilePage.saveButton).click();
```

This is effectively a selector collection placed inside a class.

A more useful page object exposes behaviour:

```ts
class ProfilePage {
  updateDisplayName(name: string) {
    cy.get('[data-testid="display-name"]').clear().type(name);

    return cy.get('[data-testid="save-profile"]').click();
  }
}
```

The value comes from the interface it provides—not from using the `class` keyword.

## Do Not Store Cypress Elements Too Early

Cypress commands are queued and their queries are retried.

A page object should normally query an element when the related method is called:

```ts
class ProfilePage {
  saveButton() {
    return cy.get('[data-testid="save-profile"]');
  }
}
```

It should not create and store Cypress chains as permanent page state:

```ts
class ProfilePage {
  saveButton = cy.get('[data-testid="save-profile"]');
}
```

The second version can execute at the wrong time and does not represent a permanent element reference.

The page object should store selector strings or expose methods that perform fresh Cypress queries.

## Keep Expected Outcomes Visible

Page objects may hide interaction details, but they should not hide the purpose of the test.

This test is easy to understand:

```ts
profilePage.updateDisplayName("Ada");

cy.get('[data-testid="save-success"]').should("be.visible");
```

The action and its expected outcome remain visible.

If every assertion is hidden inside a page object method, the test may no longer clearly communicate what behaviour it verifies.

A page object may verify that its page loaded successfully, but scenario-specific assertions usually belong in the test.

---

# 7. Component Objects

Modern interfaces are often composed of reusable components rather than completely independent pages.

Examples include:

- navigation menus,
- dialogs,
- tables,
- filter panels,
- forms,
- notification areas.

Creating one large object for an entire page can produce a class with too many responsibilities.

A smaller component object may be more appropriate:

```ts
export const confirmationDialog = {
  confirm() {
    return cy.get('[data-testid="confirm-action"]').click();
  },

  cancel() {
    return cy.get('[data-testid="cancel-action"]').click();
  },
};
```

Component objects can be reused wherever the same interface component appears.

The underlying principle is the same as POM: create an interface around a cohesive UI responsibility.

The abstraction boundary does not always need to match a URL or a complete page.

---

# 8. Selenium-Style POM and Cypress

POM is strongly associated with Selenium because Selenium is often used with object-oriented languages such as Java.

A traditional Selenium architecture commonly uses:

- page classes,
- element locators,
- WebDriver references,
- explicit interaction methods,
- shared base page classes.

Cypress has a different execution model:

- commands are queued,
- queries and assertions are automatically retried,
- commands are chained,
- JavaScript and TypeScript functions are first-class abstractions,
- tests can use imported modules without class hierarchies.

This changes which abstractions feel natural, but it does not make POM invalid.

A Cypress suite may use:

- direct commands for simple scenarios,
- local functions for spec-specific repetition,
- shared functions for imported behaviours,
- custom commands for suite-wide Cypress operations,
- page or component objects for cohesive UI interfaces.

The correct question is not:

> Does Cypress use POM?

The more useful question is:

> Which abstraction makes this behaviour easiest to understand and maintain?

---

# 9. Choosing the Right Abstraction

| Situation                                                 | Appropriate starting point        |
| --------------------------------------------------------- | --------------------------------- |
| A simple interaction appears once                         | Keep it directly in the test      |
| An element needs a stable testing contract                | Add a dedicated `data-*` selector |
| A sequence repeats inside one spec                        | Create a local helper             |
| The same behaviour is imported by several specs           | Create a shared helper            |
| A Cypress-specific operation is used throughout the suite | Create a custom command           |
| Several behaviours belong to one cohesive UI surface      | Create a page or component object |
| Only selector values need to be shared                    | Consider a selector collection    |
| No meaningful duplication exists yet                      | Avoid premature abstraction       |

These are guidelines rather than rigid rules.

A helper may later become a shared helper.

A group of shared helpers may later reveal a coherent page or component object.

A repeated suite-wide operation may later justify a custom command.

Abstractions can emerge as the test suite reveals real maintenance needs.

---

# 10. Common Anti-Patterns

## Abstracting Every Command

```ts
function typeText(selector: string, value: string) {
  return cy.get(selector).type(value);
}
```

This adds another layer without expressing domain or user intent.

## Creating a Selector Warehouse

A single file containing every selector in the application may become difficult to navigate and may combine unrelated responsibilities.

Selectors should remain close to the behaviour or UI surface that owns them.

## Creating a Giant Page Object

A page object that manages forms, navigation, dialogs, API setup, fixtures, and assertions has too many responsibilities.

Split it around cohesive behaviours or components.

## Hiding All Assertions

A test should communicate what result it verifies.

Assertions hidden behind broad methods can make failures and test intent difficult to understand.

## Building Deep Inheritance Hierarchies

A universal `BasePage` can accumulate unrelated behaviour used by only some pages.

Composition and small imported modules are often easier to understand than multiple levels of inheritance.

## Creating Abstractions Before They Are Needed

A one-line interaction does not need a separate helper, command, and page object.

The cost of an abstraction includes:

- naming it,
- locating it,
- understanding it,
- maintaining it,
- changing all of its consumers safely.

Duplication can sometimes be cheaper than the wrong abstraction.

---

# 11. Practical Decision Process

Before extracting test code, ask:

1. Is the current selector stable?
2. Is this code genuinely repeated?
3. Does the repeated code represent one meaningful behaviour?
4. Is the behaviour local to one spec or shared across the suite?
5. Does it belong to a specific page or component?
6. Is it closely tied to Cypress and useful globally?
7. Will extracting it make the test easier to understand?
8. Will a future reader know where to find its implementation?

The answers determine the appropriate abstraction.

The choice should not be based only on the number of repeated lines.

---

# Conclusion

Page Object Model is neither mandatory nor forbidden in Cypress.

It is one possible abstraction among several.

The available choices solve different problems:

- selectors create stable connections to UI elements,
- selector collections centralize element locations,
- local helpers remove spec-specific behavioural repetition,
- shared helpers provide explicit reusable modules,
- custom commands extend Cypress with suite-wide operations,
- page and component objects model cohesive UI interfaces.

Good test architecture uses the smallest abstraction that clearly solves the current problem.

The goal is not to hide Cypress commands.

The goal is to let each test clearly communicate:

- what the user does,
- what behaviour is being verified,
- why the result matters.
