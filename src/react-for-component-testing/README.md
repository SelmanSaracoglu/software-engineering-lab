# React for Component Testing

This stage teaches only the React knowledge required to read component code and
design Cypress Component Tests. It is not a complete frontend-development
course.

The central reading model is:

```text
props + state -> rendered output
user event -> state or callback change -> new rendered output
```

Component tests later control the left side and observe the right side.

## Running the examples

Install the dependencies recorded by the repository:

```bash
npm install
```

Run the first React runtime check:

```bash
npm run react-foundations:01
```

Run every completed React foundation check:

```bash
npm run react-foundations
```

Run TypeScript verification:

```bash
npm run typecheck
```

The runtime check uses React server rendering to verify the initial element
tree. It does not replace a browser component test and cannot perform clicks or
observe browser lifecycle behaviour.

## Curriculum status

- [x] Function components, JSX, props, and composition
- [ ] State, event handling, conditional rendering, and forms
- [ ] `useState` and controlled inputs
- [ ] `useEffect` and lifecycle from a testing perspective
- [ ] Context and provider boundaries
- [ ] Router state and route-driven rendering
- [ ] Integrated React-reading closure check

## Files

- `01-component-jsx-and-props.tsx` contains the typed Order Card component and
  the complete concept explanation.
- `01-component-jsx-and-props.check.tsx` renders realistic prop variations and
  verifies the resulting HTML.

## First increment result

After this increment, a component can be read as a typed input-output boundary:

- props are inputs owned by the parent,
- JSX describes output,
- curly braces contain JavaScript expressions,
- a capitalized JSX name represents another component,
- composition divides UI responsibilities,
- visible and semantic output is the future test target.

State and user interaction are intentionally deferred to the next increment.
