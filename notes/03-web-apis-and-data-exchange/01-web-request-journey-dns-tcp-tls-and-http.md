# Web Request Journey: DNS, TCP, TLS, and HTTP

## What happens when we open a website?
Imagine entering this address into a browser: https://example.com/requests/42
The browser cannot immediately send an HTTP request to the words `example.com`.
It first needs to discover where the server is, establish communication with it, and create a protected connection.

A common HTTPS request follows this simplified journey:
``` URL → DNS → TCP → TLS → HTTP request → HTTP response → Browser rendering ```
Each step solves a different problem.

## Understanding the URL
A URL identifies a resource and explains how it should be accessed.
https://example.com/requests/42 

**| Part      | Value             | Meaning                                       |**
| Scheme    | `https`           | Use HTTP through a protected TLS connection   |
| Host      | `example.com`     | The domain name of the destination            |
| Path      | `/requests/42`    | The requested resource                        |
| Port      | Usually `443`     | The network entry point used by HTTPS         |

The port is normally not written because browsers already know the default ports.

HTTP commonly uses port `80`.
HTTPS commonly uses port `443`.

## Step 1: DNS finds the destination

DNS means **Domain Name System**.

People prefer names such as:

```text
example.com
```

Network communication uses IP addresses such as:

```text
203.0.113.10
```

DNS connects these two forms.

```text
example.com
→ DNS lookup
→ IP address
```

DNS does not download the website.

It only helps the browser find an IP address associated with the host name.

## How does DNS resolution work?

The browser first checks whether it already knows the answer.

The address may exist in:

- the browser cache,
- the operating-system cache,
- a local network cache.

If no cached answer is available, the system asks a DNS resolver.

The resolver may contact other DNS servers until it finds the authoritative answer for the domain.

The result is returned and usually cached for a limited time.

The simplified flow is:

```text
Browser or operating system
→ DNS resolver
→ DNS hierarchy
→ IP address
```

Caching avoids repeating the complete lookup for every request.

## Domain name and IP address

A domain name does not always identify one physical server.

One domain can point to several IP addresses.

The selected address may lead to:

- a load balancer,
- a reverse proxy,
- a content delivery network,
- an application server.

Several domain names can also use the same IP address.

DNS tells the client where to begin network communication. It does not explain the complete internal architecture behind that address.

## Step 2: TCP creates a connection

After finding an IP address, the client needs a communication connection.

For common HTTP/1.1 and HTTP/2 communication, this connection is usually created with TCP.

TCP means **Transmission Control Protocol**.

TCP provides an ordered and reliable stream of data between two endpoints.

It helps ensure that:

- missing data is detected,
- data is placed in the correct order,
- damaged data is not silently accepted,
- transmission can be retried when necessary.

TCP does not understand web pages, JSON, or HTTP methods.

It only transports bytes reliably.

## The TCP handshake

Before sending application data, the client and server establish a TCP connection.

This commonly uses a three-step handshake:

```text
Client → SYN → Server
Client ← SYN-ACK ← Server
Client → ACK → Server
```

The names describe control messages used to establish the connection.

At a beginner level, the important idea is:

```text
Client asks to connect
→ Server accepts
→ Client confirms
```

After this handshake, both sides have an established TCP connection.

## IP address and port

The IP address identifies the destination on the network.

The port identifies the expected service on that destination.

```text
IP address:
Which destination?

Port:
Which network service?
```

A server can run several services on the same machine using different ports.

For example:

```text
203.0.113.10:443
```

This means communication with port `443` at that IP address.

If no application is accepting connections on that port, the connection may be refused.

If the destination cannot be reached, the connection may time out.

## Step 3: TLS protects the connection

Because the URL uses `https`, the browser and server establish TLS protection before exchanging HTTP data.

TLS means **Transport Layer Security**.

TLS provides three important protections:

- encryption,
- integrity,
- server authentication.

**Encryption** prevents observers from easily reading the transmitted content.

**Integrity** helps detect whether the transmitted data was changed.

**Server authentication** helps the browser confirm that it is communicating with the expected domain.

## The TLS handshake

During the TLS handshake, the browser and server agree on how to protect the communication.

The simplified process is:

1. The browser starts a secure connection.
2. The server sends its certificate.
3. The browser validates the certificate.
4. Both sides establish encryption keys.
5. Protected communication begins.

```text
TCP connection
→ TLS handshake
→ Encrypted channel
```

The real cryptographic process contains more detail, but this model is sufficient for understanding the web request journey.

## What is a certificate?

A TLS certificate connects a domain name with a cryptographic identity.

The browser checks conditions such as:

- Is the certificate valid for this domain?
- Has it expired?
- Was it issued through a trusted certificate chain?
- Is the connection using acceptable protection?

If validation fails, the browser may show a security warning or refuse the connection.

A valid certificate does not prove that the website is honest or free from application vulnerabilities.

It shows that the protected connection is associated with the stated domain according to the certificate system.

## What does HTTPS protect?

HTTPS is HTTP communication protected by TLS.

```text
HTTP + TLS = HTTPS
```

HTTPS protects information while it travels between the communicating endpoints.

It does not automatically protect against:

- insecure application logic,
- a compromised server,
- a compromised user device,
- incorrect authorization,
- malicious information submitted by an authorized user.

TLS protects the communication channel.

The application must still protect its behaviour and data.

## Step 4: HTTP describes the request

After the protected connection is ready, the browser can send an HTTP request.

HTTP means **Hypertext Transfer Protocol**.

HTTP defines how clients and servers describe requests and responses.

A request contains information such as:

- an HTTP method,
- a path,
- headers,
- sometimes a body.

A simplified request might look like this:

```http
GET /requests/42 HTTP/1.1
Host: example.com
Accept: application/json
```

This means:

> Retrieve the resource at `/requests/42` from `example.com`. JSON is an acceptable response format.

## HTTP methods

The method describes the intended operation.

Common methods include:

| Method | General purpose |
|---|---|
| `GET` | Retrieve information |
| `POST` | Submit information or create something |
| `PUT` | Replace a resource representation |
| `PATCH` | Partially update something |
| `DELETE` | Request removal |

The method communicates intent.

The server still decides whether the request is valid and authorized.

## HTTP headers

Headers provide metadata about the request or response.

They can describe:

- accepted content types,
- authentication information,
- caching rules,
- content length,
- browser information,
- the format of the body.

Headers are part of the HTTP message, but they are different from the main body.

## HTTP body

The body carries the main content of some requests and responses.

For example, a `POST` request may contain JSON:

```json
{
  "equipmentId": "EQ-42",
  "description": "The display does not start."
}
```

A `GET` request usually does not need a request body.

A response body may contain HTML, JSON, an image, or another type of data.

HTTP can transfer many content formats. It is not limited to HTML.

## Step 5: The server processes the request

The server receives and interprets the HTTP request.

Depending on the system, it may:

- match the path to a route,
- authenticate the caller,
- check authorization,
- validate input,
- apply business rules,
- read or change stored data,
- create a response.

The server may also communicate with databases or other services before returning the result.

These internal operations are not performed by HTTP itself.

HTTP carries the request and response between the communicating components.

## Step 6: The server returns an HTTP response

An HTTP response contains:

- a status code,
- headers,
- sometimes a body.

A simplified response might look like this:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 42,
  "status": "OPEN"
}
```

The status code gives a general description of the result.

Examples include:

| Status | General meaning |
|---|---|
| `200 OK` | The request succeeded |
| `201 Created` | A new resource was created |
| `400 Bad Request` | The request was invalid |
| `401 Unauthorized` | Authentication is required or invalid |
| `403 Forbidden` | The caller is not allowed |
| `404 Not Found` | The requested resource was not found |
| `500 Internal Server Error` | The server encountered an unexpected failure |

The response body can provide the actual content or a controlled error description.

## Step 7: The browser handles the response

If the response contains HTML, the browser parses it and creates the visible page.

The HTML may refer to additional resources:

- CSS files,
- JavaScript files,
- images,
- fonts.

The browser sends additional requests for these resources.

Therefore, opening one page may create many HTTP requests.

```text
Initial HTML
├── CSS request
├── JavaScript request
├── Image request
└── Font request
```

A client-side application may also send later API requests to retrieve or modify data.

## The complete simplified journey

The complete process can now be read as:

```text
1. The browser reads the URL.
2. DNS resolves the host name to an IP address.
3. TCP establishes a reliable connection.
4. TLS creates a protected channel.
5. The browser sends an HTTP request.
6. The server processes the request.
7. The server sends an HTTP response.
8. The browser displays or processes the result.
```

Each layer has a different responsibility.

| Technology | Main responsibility |
|---|---|
| DNS | Find an IP address for a domain |
| TCP | Create reliable, ordered communication |
| TLS | Protect data in transit and authenticate the server |
| HTTP | Describe web requests and responses |

## Connections can be reused

The browser does not always repeat every step for every resource.

DNS answers can be cached.

TCP and TLS connections can often be reused for several HTTP requests.

HTTP caching may allow the browser to reuse an earlier response.

These optimizations reduce repeated work and improve performance.

The conceptual layers remain useful even when browsers combine, reuse, or optimize the operations.

## Where can the journey fail?

Different failures belong to different stages.

| Failure | Likely stage |
|---|---|
| Domain cannot be resolved | DNS |
| Destination cannot be reached | Network or TCP |
| Connection is refused | TCP or server availability |
| Certificate warning | TLS |
| Request is rejected as invalid | HTTP or application |
| Resource is not found | HTTP or application |
| Page loads but shows incorrect information | Application behaviour |

Understanding the stage helps avoid incorrect conclusions.

A `404 Not Found` response means that network communication and HTTP communication already succeeded.

The application could not find the requested resource.

A certificate error happens before the protected HTTP exchange can continue.

## A note about HTTP/3

This note describes the common HTTPS journey used with HTTP/1.1 and HTTP/2:

```text
DNS → TCP → TLS → HTTP
```

HTTP/3 uses QUIC instead of TCP.

QUIC runs over UDP and includes TLS protection as part of its connection process.

The details are different, but the same high-level questions remain:

- Where is the destination?
- How is communication established?
- How is it protected?
- How are requests and responses represented?

The simplified TCP-based model is still useful for learning the foundational responsibilities.

## Common confusion

### DNS does not connect to the application

DNS returns addressing information. Another protocol establishes the connection.

### TCP does not encrypt the data

TCP provides reliable and ordered delivery. TLS provides encryption and integrity.

### TLS does not define the web operation

TLS protects the channel. HTTP explains whether the client wants to retrieve, create, update, or delete something.

### HTTP and HTML are not the same

HTTP is a communication protocol.

HTML is one possible content format transported through HTTP.

### An HTTP error does not always mean a network failure

A controlled `400` or `404` response shows that the server received the HTTP request and produced a response.

### One URL does not always mean one server

Load balancers, proxies, and content delivery networks may exist behind the domain.

## Engineering and testing perspective

Understanding the request journey helps developers and testers identify the correct failure boundary.

If a name cannot be resolved, testing the application route is not yet possible.

If TLS validation fails, the protected HTTP request may never reach the application.

If the server returns a controlled error, the network may be working correctly while the application rejects the operation.

Different tests provide evidence about different layers:

- connectivity checks show that a destination can be reached,
- TLS checks examine the protected connection,
- API tests examine HTTP requests and responses,
- integration tests examine server dependencies,
- full-stack tests examine the complete user journey.

A useful investigation asks:

> At which stage did the expected journey stop?

## Main idea

A web request is not one single action.

It is a sequence of responsibilities:

```text
DNS:
Where is the destination?

TCP:
Can we establish reliable communication?

TLS:
Can we protect and authenticate the connection?

HTTP:
What does the client request, and what does the server return?
```

The reusable model is:

```text
Resolve
→ Connect
→ Protect
→ Request
→ Respond
→ Render
```

Understanding these layers makes web behaviour, failures, performance, security, and testing easier to reason about.