# System Context and Client–Server Architecture

## Why do we need a system view?
A software system does not exist alone. People use it. 
Other systems exchange information with it. Devices, databases, external services, and organizations may depend on it.
Before examining the internal code, we should first understand:

- who uses the system,
- what the system is responsible for,
- which external systems it communicates with,
- what remains outside its responsibility.

This outside view is called the **system context**.

## What is a system?
A system is a group of connected parts that work together for a purpose. 

A software system may include:
- a user interface,
- application logic,
- stored data,
- background processes,
- connections to external services.

The word “system” does not always mean one application or one server. A system may be a small program running on one computer or a large collection of applications and services.
The important point is its purpose and boundary.

## What is a system boundary?
A system boundary separates what belongs to the system from what exists outside it. Imagine a maintenance request system.

Its responsibility may include:
- receiving maintenance requests,
- storing them,
- showing them to coordinators,
- tracking their status.

The people who use the system are outside the boundary. An external identity service used for sign-in is also outside the boundary.
The maintenance database may be considered inside the boundary if it is owned and operated as part of the system.

The boundary helps answer: > What can this system control directly?
It also prevents the team from treating an external dependency as if it were an internal component.

## What is system context?
System context describes the system from the outside.

It usually shows:
- the system being studied,
- the people or roles that use it,
- the external systems it depends on,
- the main information exchanged between them.

A context view does not explain every internal module, class, or database table. 
Its purpose is to show the system’s place in its environment.

Employee
→ submits request
→ Maintenance System
→ checks identity
→ Identity Service

From this view, we can understand that the maintenance system serves an employee and depends on an external identity service.
We do not yet need to know how its internal code is organized.

## Why is system context useful?
System context creates a shared understanding before detailed design begins. 

It helps the team identify:
- users and external actors,
- ownership boundaries,
- external dependencies,
- important information flows,
- possible failure points,
- areas that require integration testing.

For example, if sign-in depends on an external identity service, the system cannot fully control whether that service is available.
That dependency affects reliability, testing, and error handling. A system context makes this relationship visible.

## What is client–server architecture?

Client–server architecture divides communication into two main roles.

A **client** requests information or asks for an operation.
A **server** receives the request, processes it, and returns a response.

Client
→ Request
→ Server

Client
← Response
← Server


For example, a browser may request a list of maintenance records. The server retrieves the relevant information and sends a response.
The browser then displays that information to the user.

## What is a client?
A client is software that communicates with a server to use a capability or retrieve information.

Common clients include:
- web browsers,
- mobile applications,
- desktop applications,
- command-line programs,
- other backend systems.

A client is defined by its role in the communication. It sends a request to another system.
A backend application can therefore be a server for a browser and a client of another service at the same time.

Browser
→ Application Server
→ Payment Service

The application server acts as a server for the browser. It acts as a client when communicating with the payment service.

## What is a server?
A server is software that listens for requests and provides responses or operations.

It may:
- validate incoming information,
- apply business rules,
- check permissions,
- read or change stored data,
- communicate with other systems,
- return a result or an error.

A server is not only a physical machine. The word can describe the software process that provides a service.
A laptop can run server software during development. A powerful machine may also run several different server processes.

## Why separate the client and server?
The separation allows each side to focus on different responsibilities. The client usually focuses on interaction with the user.
It displays information, collects input, and provides feedback. 

The server usually protects shared rules and data. It validates requests, applies important business rules, controls access, and manages persistence.

**| Client responsibility | Server responsibility |**
| Display information           | Provide trusted information   |
| Collect user input            | Validate incoming data        |
| Manage interaction            | Apply business rules          |
| Send requests                 | Authorize operations          |
| Present results and errors    | Read or modify shared data    |

This separation also allows several clients to use the same server. A web application and a mobile application may both communicate with the same backend.

## How does a request work?
Suppose a user submits a maintenance request through a web application.

The interaction may follow these steps:
1. The client collects the form information.
2. The client sends a request to the server.
3. The server receives and validates the information.
4. The server applies the relevant rules.
5. The server stores the request.
6. The server returns a response.
7. The client shows the result to the user.

The client does not directly decide that the operation is valid. It asks the server to perform the operation.
The server returns the authoritative result.

## Client validation and server validation
A client may validate input to help the user. For example, it can immediately show that a required field is empty. 
This improves the user experience, but it does not protect the server. Client software operates outside the server’s trusted boundary. 
Requests can be modified or sent without using the official user interface.
The server must therefore validate important information again.

Client validation: Helps the user
Server validation: Protects system rules and data

The same rule may appear on both sides for different reasons.

## Where does state belong?
State is information that can change over time.

The client may hold temporary interface state, such as:
- the currently selected filter,
- whether a dialog is open,
- text that has not yet been submitted.

The server usually owns shared and persistent state, such as:
- saved requests,
- user permissions,
- current workflow status.

This distinction matters because the client’s view may become outdated. 
If another user changes a request, the first client may need to request the latest state from the server.
The server remains the authoritative source for shared information.

## Does every application need a server? No.
A standalone calculator may perform all of its work on one device. 
A personal text editor may store files locally without communicating with a central server.

Client–server architecture becomes useful when the system needs capabilities such as:
- shared information,
- central rules,
- multiple users or devices,
- controlled access,
- integration with other systems.

Other architectural models also exist, including peer-to-peer and event-driven systems.
Client–server is common, but it should be selected because it fits the problem.

## Common confusion

### The client is not always a browser
A mobile application, another server, or a command-line program can also be a client.

### The server is not the same as the database
A server may communicate with a database, but they have different responsibilities.
The application server processes requests and rules. The database stores and retrieves data.

### The server is not always trusted automatically
Server code can contain mistakes and insecure behaviour.
The server is the place where authoritative controls should be enforced, but those controls must still be designed and tested correctly.

### Client–server does not require the public internet
A client and server can communicate inside a local network or even on the same computer.

### A successful response does not always mean successful behaviour
A server may return a response while still providing incorrect data or applying the wrong business rule.
Testing must examine the meaning of the result, not only whether communication occurred.

## Engineering and testing perspective
The client–server boundary creates several areas to test.
Client tests can verify that information is displayed correctly and user actions create the expected requests.
Server tests can verify validation, business rules, permissions, and data handling.
Integration tests can verify that the server works with real dependencies such as a database.
Full-stack tests can verify that a user action passes through the client and server and produces the expected final result.
The system context also shows which external dependencies cannot be controlled completely.
Tests may need to examine what happens when an external system responds slowly, rejects a request, returns invalid information, or becomes unavailable.
Understanding the boundary helps the team choose the correct test level and failure scenarios.

## Main idea
A **system context** shows a system, its users, its external dependencies, and the information exchanged with them.
A **system boundary** separates what the system controls from what exists outside it.
A **client** sends requests.
A **server** processes those requests and returns authoritative results.

The reusable model is:

Understand the system’s purpose
→ Identify its boundary
→ Identify users and external systems
→ Follow requests and responses
→ Decide where responsibilities belong

Before studying the internal code, first understand where the system begins, where it ends, and how it communicates with the world around it.