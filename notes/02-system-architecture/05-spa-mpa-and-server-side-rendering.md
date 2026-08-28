# SPA, MPA, and Server-Side Rendering

## What happens when a browser opens a website?

When a user enters a web address, the browser sends a request to a server.

The server returns an HTML document.

The browser reads the HTML and displays the page.

The page may also load:

- CSS for appearance,
- JavaScript for behaviour,
- images and fonts,
- data from an API.

Web applications differ in how they create pages and what happens when the user navigates to another page.

SPA, MPA, and server-side rendering describe different parts of this behaviour.

## What is an MPA?

MPA means **Multi-Page Application**.

In an MPA, navigating to another page normally causes the browser to request a new HTML document from the server.

```text
Browser requests /requests
→ Server returns the requests page

User opens /reports
→ Browser requests /reports
→ Server returns the reports page
```

The browser replaces the current document with the new document.

This is often called a full-page navigation or page reload.

An MPA can still use JavaScript for forms, menus, validation, or interactive components. It does not mean that the application contains no JavaScript.

The main characteristic is that the server provides a new page document for different navigations.

## Benefits of an MPA

An MPA can be easier to understand because each URL represents a page that the server can produce directly.

It can work well for:

- content-focused websites,
- public information pages,
- documentation,
- websites where pages are mostly independent,
- applications that need limited client-side interaction.

The browser receives meaningful HTML for each page.

This can support search engines and users even when JavaScript loads slowly or fails.

The browser’s standard navigation behaviour also works naturally.

## Costs of an MPA

Moving between pages usually reloads the complete document.

This can feel slower than updating only part of the current page.

Information held only in the current browser page may also be lost during navigation unless it is stored somewhere else.

Highly interactive workflows can require more server requests and full-page transitions.

An MPA is not automatically slow or outdated. Its suitability depends on the type of interaction the product needs.

## What is an SPA?

SPA means **Single-Page Application**.

In a typical SPA, the browser loads an initial HTML document and a JavaScript application.

After that, JavaScript controls much of the navigation and page rendering.

```text
Initial request
→ HTML, CSS, and JavaScript load

Later navigation
→ JavaScript changes the visible view
→ Data may be requested from an API
```

The browser usually does not replace the complete document during every navigation.

Instead, the client-side application updates the relevant part of the page.

This can create a smooth experience similar to a desktop application.

## Does an SPA have only one screen?

No.

“Single-page” does not mean that the application has only one view or one URL.

An SPA may contain:

- a dashboard,
- a detail view,
- a settings page,
- a creation form.

A client-side router connects URLs to these views.

For example:

```text
/requests
→ Request list

/requests/42
→ Request details

/requests/new
→ New request form
```

The application changes the visible content without requesting a completely new HTML document for every route.

Good SPA routing should still use meaningful URLs so that browser history, bookmarks, and direct links work correctly.

## What is client-side rendering?

Client-side rendering means that JavaScript in the browser creates or updates much of the visible HTML.

A typical client-rendered SPA begins with a small HTML document.

JavaScript then:

1. starts the application,
2. requests necessary data,
3. creates the visible interface,
4. responds to user actions.

```text
Server sends application files
→ Browser runs JavaScript
→ JavaScript creates the page
```

This gives the client significant responsibility.

The browser must download, parse, and execute the application code before some content becomes usable.

## Benefits of an SPA

An SPA can be suitable for highly interactive applications.

It can provide:

- smooth navigation,
- rich user interaction,
- reusable interface state,
- updates without full-page reloads,
- clear separation between a frontend application and an API.

Examples may include operational dashboards, editors, messaging interfaces, and complex internal tools.

After the initial application files are loaded, later navigation may require only data rather than a complete new page.

## Costs of an SPA

An SPA introduces more client-side complexity.

The application may need to manage:

- routing,
- loading states,
- client state,
- API errors,
- outdated data,
- authentication state,
- browser history.

The initial JavaScript bundle may also be large.

Users may wait while the browser downloads and runs the code.

If JavaScript fails, important content may not appear.

The frontend and backend also need a clear API contract.

An SPA is therefore useful when its interaction benefits justify its additional complexity.

## What is server-side rendering?

Server-side rendering, usually called **SSR**, means that the server creates the HTML for a page before sending it to the browser.

```text
Browser requests a page
→ Server creates the HTML
→ Browser receives visible content
```

The browser can display the returned content without first creating the entire page through client-side JavaScript.

This can improve the first visible result, especially for public pages or slower devices.

It can also help systems that need meaningful HTML to be available to search engines and link-preview services.

## SSR and MPA are not the same thing

MPA describes how page navigation is organized.

SSR describes where HTML is created.

A traditional MPA often uses server-side rendering, but SSR can also be combined with an SPA.

For example:

1. The server renders the first page as HTML.
2. The browser displays it.
3. JavaScript loads.
4. The page becomes an interactive client-side application.
5. Later navigation behaves like an SPA.

This process is commonly called **hydration**.

## What is hydration?

Hydration is the process in which client-side JavaScript connects interactive behaviour to HTML that was already created by the server.

```text
Server:
Creates visible HTML

Browser:
Displays the HTML

JavaScript:
Adds interactive behaviour
```

Before hydration, the user may already see the content.

After hydration, buttons, forms, and client-side navigation can behave as part of the JavaScript application.

Hydration combines benefits from server and client rendering, but it also adds complexity.

The server-created HTML and the client-created result must agree.

## Comparing the approaches

| Approach | Main behaviour |
|---|---|
| MPA | The server provides a new document for page navigation |
| SPA | JavaScript updates views without replacing the complete document |
| Client-side rendering | The browser creates much of the visible page |
| Server-side rendering | The server creates HTML before sending it |
| Hydration | JavaScript adds interaction to server-rendered HTML |

These concepts are related, but they do not describe exactly the same decision.

SPA and MPA mainly describe navigation and application structure.

Client-side and server-side rendering describe where the page content is produced.

## Performance differences

Performance depends on the application, network, device, and implementation.

A client-rendered SPA may have a slower first load because the browser must download and execute JavaScript.

After that, navigation can feel fast because only data or smaller code sections are loaded.

An MPA may provide useful HTML quickly, but each navigation may require a new document.

SSR can improve the first visible content, but the server must perform rendering work for requests.

Caching can reduce this work for pages that do not change frequently.

There is no single approach that is always fastest.

The team should measure the user experience that matters.

## Security boundaries

Changing the rendering approach does not change the basic trust boundary.

Client-side code and browser input cannot be trusted to enforce important rules.

Whether the application is an SPA, MPA, or server-rendered system, the server must still validate requests and authorize important operations.

Server-side rendering also requires care because user-controlled information may be included in generated HTML.

Output must be handled safely to prevent script injection.

The architecture changes where work happens, but it does not remove the need for secure boundaries.

## A simple example

Imagine a public maintenance information website and an internal maintenance dashboard.

The public website mainly contains guidance and contact information.

An MPA or server-rendered approach may be suitable because pages are content-focused and should load directly from their URLs.

The internal dashboard contains filters, dialogs, status updates, and frequent interaction.

An SPA may provide a smoother experience because the interface can update without full-page navigation.

A mixed approach is also possible.

The public pages may use server rendering while the interactive dashboard uses client-side behaviour.

The team does not need to select one approach for every part of every system.

## Common confusion

### SPA does not mean one URL

An SPA can and should use several meaningful routes.

### MPA does not mean no JavaScript

An MPA can include interactive JavaScript components.

### SSR does not remove JavaScript

A server-rendered page may still load JavaScript for interaction.

### SSR is not automatically faster

It may improve initial content delivery, but it also creates server work and may still require hydration.

### An SPA does not automatically need microservices

A frontend SPA can communicate with one monolithic backend.

Frontend architecture and backend service architecture are separate decisions.

### Search engine visibility is not the only decision criterion

Public content may need search visibility, but internal tools may prioritize interaction and operational workflow instead.

## How should the approach be selected?

An MPA or server-rendered approach may be suitable when:

- content is the main focus,
- direct page delivery is important,
- limited JavaScript is preferred,
- each page is relatively independent.

An SPA may be suitable when:

- users perform many interactions without leaving the workflow,
- interface state must remain available,
- partial page updates are frequent,
- the product behaves more like an interactive application.

A combined approach may be suitable when the product needs both strong initial HTML and rich client-side interaction.

The choice should begin with user needs, not with framework popularity.

## Testing perspective

An MPA test often verifies navigation between server-provided pages, form submissions, and server responses.

An SPA test must also consider client-side routing, loading states, API failures, stale data, and browser history.

An SSR application needs evidence that:

- the server returns correct HTML,
- the client can hydrate it correctly,
- the page still behaves as expected after hydration,
- server and client rendering do not disagree.

Full-stack tests should verify important user journeys.

Smaller component and integration tests should verify the many interface states without requiring the complete system for every case.

## Main idea

An **MPA** loads a new document from the server during page navigation.

An **SPA** uses client-side JavaScript to change views inside the current document.

**Client-side rendering** creates much of the page in the browser.

**Server-side rendering** creates HTML on the server.

**Hydration** adds client-side interaction to server-rendered HTML.

The reusable model is:

```text
Understand the user interaction
→ Decide how navigation should work
→ Decide where initial content should be rendered
→ Consider loading, failure, and complexity
→ Test the complete user experience
```

These approaches are not levels of maturity.

They are different ways to divide responsibility between the browser and the server.