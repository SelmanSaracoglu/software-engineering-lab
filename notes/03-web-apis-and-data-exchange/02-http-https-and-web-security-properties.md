# HTTP, HTTPS, and Web Security Properties

## What is HTTP?

HTTP means **Hypertext Transfer Protocol**.

It is an application-level protocol used by clients and servers to exchange requests and responses.

A client may be:

- a browser,
- a mobile application,
- another server,
- a command-line tool.

The client sends an HTTP request.

The server processes it and sends an HTTP response.

```text
Client
→ HTTP request
→ Server

Client
← HTTP response
← Server
```

HTTP defines the structure and meaning of this communication.

It describes concepts such as methods, paths, headers, bodies, and status codes.

## Why is HTTP used?

Different clients and servers need a shared communication language.

Without an agreed protocol, every application would need its own private message format and behaviour.

HTTP provides common rules for questions such as:

- Which resource is being requested?
- What operation is intended?
- What information is being sent?
- Did the operation succeed?
- What type of content was returned?
- Can the response be cached?

Because these rules are widely understood, clients, servers, proxies, browsers, testing tools, and monitoring systems can work together.

HTTP can transfer many kinds of content, including:

- HTML,
- JSON,
- images,
- video,
- documents,
- binary files.

The name contains “Hypertext,” but modern HTTP is not limited to web pages.

## HTTP is a protocol, not a server

HTTP does not store data or apply business rules.

It describes communication.

An application server receives an HTTP request and decides what to do with it.

For example:

```text
HTTP request:
POST /requests

Application behaviour:
Validate the input
Check permission
Create the request
Store the data

HTTP response:
201 Created
```

HTTP carries the request and response.

The application defines the actual behaviour.

## HTTP is stateless

HTTP is described as a stateless protocol.

This means that each request is independent from the protocol’s point of view.

The server does not automatically remember earlier requests simply because they came from the same client.

```text
Request 1
→ Server

Request 2
→ Server
```

If the second request needs information about the first one, the application must provide a state mechanism.

Common mechanisms include:

- cookies,
- session identifiers,
- access tokens,
- information stored on the server.

Stateless HTTP does not mean that web applications cannot have state.

It means that state management must be designed above the basic HTTP protocol.

## What is plain HTTP?

Plain HTTP sends its request and response information without TLS protection.

A simplified journey is:

```text
Client
→ HTTP data
→ Server
```

Someone able to observe the network path may be able to read or modify the communication.

This can expose information such as:

- submitted form values,
- authentication data,
- returned content,
- session identifiers.

For this reason, plain HTTP is not suitable for protecting real web application communication.

## What is HTTPS?

HTTPS means HTTP communication protected by TLS.

```text
HTTP
+
TLS protection
=
HTTPS
```

The HTTP message still contains methods, paths, headers, and bodies.

TLS protects those messages while they travel between the TLS endpoints.

HTTPS is therefore not a separate replacement for HTTP semantics.

It is HTTP using a protected communication channel.

## The main security properties of HTTPS

HTTPS provides three main security properties:

| Property | Meaning |
|---|---|
| Confidentiality | Other parties should not be able to read the content in transit |
| Integrity | Changes to the transmitted content should be detected |
| Authentication | The client can verify the identity connected to the certificate |

These properties protect data while it travels across the network.

## Confidentiality

Confidentiality means that the transmitted content is encrypted.

Without encryption, a network observer may be able to read:

```text
username=alex
password=example-password
```

With HTTPS, the HTTP content is encrypted during transmission.

An observer can see encrypted data but should not be able to understand the protected HTTP content without the required cryptographic keys.

Confidentiality is important even when the application does not appear to handle secret information.

Pages may contain:

- personal details,
- internal identifiers,
- session cookies,
- user activity,
- operational information.

## Integrity

Integrity means that unauthorized changes to the transmitted data can be detected.

Without protected integrity, an attacker on the communication path might modify:

- the server’s response,
- submitted form data,
- downloaded JavaScript,
- links or payment information.

TLS protects the communication so that modified data is not silently accepted as valid.

This matters because changing application code during delivery can be as dangerous as reading private information.

## Server authentication

During the TLS handshake, the server presents a certificate.

The browser checks whether the certificate is valid for the requested domain and connected to a trusted certificate chain.

This helps the browser answer:

> Am I creating the protected connection with the expected domain?

HTTPS commonly authenticates the server to the client.

It does not normally authenticate the human user.

User authentication still requires an application mechanism such as a session, token, or another identity process.

```text
TLS certificate:
Authenticates the server identity

Application sign-in:
Authenticates the user
```

These are different security responsibilities.

## A certificate does not prove that a website is safe

A valid certificate shows that a protected connection was established with the certified domain.

It does not prove that:

- the organization is trustworthy,
- the application has no vulnerabilities,
- the content is honest,
- a purchase is safe,
- the server has not been compromised.

A phishing website can also obtain a valid certificate for its own domain.

The browser may show a protected connection even though the website itself is malicious.

The lock or connection indicator should be understood as:

> The connection to this domain is protected.

It should not be understood as:

> Everything this website does is safe.

## What HTTPS protects against

HTTPS helps protect against network attackers who try to:

- read transmitted content,
- change responses in transit,
- steal session information from unencrypted traffic,
- impersonate the expected domain without a valid certificate.

For example, someone using the same public network should not be able to read the protected HTTP content simply by observing network traffic.

This protection depends on correct TLS and certificate validation.

## What HTTPS does not protect against

HTTPS does not solve every security problem.

It does not automatically prevent:

- broken authentication,
- incorrect authorization,
- SQL injection,
- cross-site scripting,
- cross-site request forgery,
- unsafe file uploads,
- insecure business rules,
- information stored insecurely,
- sensitive information written to logs,
- malicious browser extensions,
- compromised client or server devices,
- denial-of-service attacks.

HTTPS protects the communication channel.

It does not verify that the application handles the information correctly after receiving it.

## Data in transit and data at rest

HTTPS primarily protects **data in transit**.

Data in transit is information moving between communicating endpoints.

Data at rest is information stored in places such as:

- databases,
- files,
- backups,
- logs.

```text
Data travelling across the network
→ Protection in transit

Data stored in a database
→ Protection at rest
```

HTTPS does not continue protecting information after the server decrypts and stores it.

Stored information needs separate controls such as appropriate permissions, secure storage, backup protection, and sometimes encryption at rest.

## Some metadata may remain visible

HTTPS protects HTTP content, but it does not make all network activity invisible.

Observers may still learn information such as:

- the destination IP address,
- connection times,
- approximate traffic size,
- sometimes information related to the requested domain.

They should not normally be able to read the protected path, headers, body, or response content.

HTTPS provides protected communication, not complete network anonymity.

## HTTP redirects do not protect the first request

A website may receive a plain HTTP request and redirect it to HTTPS.

```text
http://example.com
→ Redirect
→ https://example.com
```

The later HTTPS request is protected.

However, the initial HTTP request occurred before the redirect and was not protected by TLS.

Applications should use HTTPS URLs directly rather than depending only on redirection.

## What is HSTS?

HSTS means **HTTP Strict Transport Security**.

A server can use an HSTS response header to tell compatible browsers:

> For a defined period, connect to this domain only through HTTPS.

After learning this rule, the browser can replace future HTTP attempts with HTTPS before sending an unprotected request.

HSTS helps reduce downgrade risks.

It must be configured carefully because an incorrect long-lived policy can make a domain difficult to access until the policy expires.

## What is mixed content?

Mixed content occurs when an HTTPS page loads another resource through plain HTTP.

For example:

```text
HTTPS page
→ HTTP JavaScript file
```

The main page has a protected connection, but the JavaScript resource does not.

An attacker may be able to change that script and affect the protected page.

Modern browsers block many dangerous mixed-content requests.

All important page resources should use HTTPS.

## HTTPS and APIs

APIs require HTTPS for the same reasons as browser pages.

An API request may contain:

- authentication tokens,
- personal information,
- internal records,
- commands that change data.

Even if an API is not directly visible to users, its communication still crosses a trust boundary.

A JSON response requires the same transport protection as an HTML page.

The content format does not change the need for HTTPS.

## TLS termination

In some systems, TLS ends at a reverse proxy or load balancer.

```text
Client
→ HTTPS
→ Reverse proxy
→ Application server
```

This is called TLS termination.

The proxy decrypts the request and forwards it to the application.

The team must still consider how the internal connection is protected.

An internal network is not automatically safe merely because users cannot access it directly.

The important question is:

> Between which endpoints is the information protected?

## Secure cookies and HTTPS

Cookies may contain session identifiers.

A cookie marked with the `Secure` attribute is sent by the browser only through protected HTTPS connections, with limited localhost behavior depending on the browser.

This helps prevent the cookie from being transmitted through plain HTTP.

The `Secure` attribute does not encrypt the cookie inside the application or prevent every cookie-related attack.

Other controls, such as `HttpOnly`, `SameSite`, correct expiration, and server-side session handling, solve different problems.

## Common confusion

### HTTPS does not mean the application is secure

It protects network communication. Application vulnerabilities can still exist.

### HTTPS does not authenticate the user

The server certificate identifies the server. User sign-in is a separate process.

### Encryption does not validate business data

An encrypted invalid request is still invalid.

The server must validate it.

### Internal traffic is not automatically trusted

Communication between internal services may still require authentication, authorization, validation, and encryption.

### A successful TLS connection does not mean a successful HTTP operation

TLS may work correctly while the application returns `400`, `403`, `404`, or `500`.

### Stateless HTTP does not mean stateless applications

Applications can maintain sessions and stored data using additional mechanisms.

## Engineering and testing perspective

Testing should separate transport protection from application behaviour.

TLS-related checks can examine:

- whether HTTPS is available,
- whether certificates are valid,
- whether plain HTTP is handled safely,
- whether mixed content exists,
- whether secure transport policies are correct.

Application tests can examine:

- authentication,
- authorization,
- validation,
- business rules,
- safe error responses.

A passing HTTPS check does not replace application security tests.

An application security test does not prove that transport configuration is correct.

Each layer needs evidence that matches its responsibility.

## Main idea

**HTTP** defines the request–response communication model used by web clients and servers.

**HTTPS** uses TLS to protect HTTP communication.

HTTPS mainly provides:

```text
Confidentiality
→ Prevent unauthorized reading in transit

Integrity
→ Detect unauthorized changes in transit

Server authentication
→ Verify the certificate identity of the destination
```

HTTPS protects the communication channel.

The application must still protect authentication, authorization, validation, business logic, stored data, and operational behaviour.

The reusable question is:

```text
What is protected?
→ HTTP content while travelling between TLS endpoints

What is not automatically protected?
→ The complete application, devices, stored data, and user behaviour
```

Understanding this boundary prevents both underestimating and overestimating what HTTPS provides.