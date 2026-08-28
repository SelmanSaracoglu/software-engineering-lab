# Synchronous, Asynchronous, and Event-Driven Communication

## Why do parts of a system communicate?

A software system often contains several components.

A client communicates with a server. An application communicates with a database. One service may ask another service to perform an operation.

Communication allows these parts to work together.

The team must decide whether the caller should wait for an immediate result or whether the work can continue separately.

This creates two main communication styles:

- synchronous communication,
- asynchronous communication.

Event-driven communication is a common form of asynchronous design.

## What is synchronous communication?

Synchronous communication means that the caller sends a request and waits for a response before continuing.

```text
Caller
→ Request
→ Receiver

Caller waits

Caller
← Response
← Receiver
```

For example, a user opens a request details page.

The client asks the server for the saved information. The client waits for the response because it needs that information to display the page.

This is a synchronous request–response interaction.

## Request and response

A request describes what the caller wants.

A response describes the result.

For example:

```text
Request:
Give me maintenance request 42.

Response:
Here is maintenance request 42.
```

The response may also indicate that the request could not be completed.

```text
Request:
Give me maintenance request 999.

Response:
That request does not exist.
```

The caller normally knows which component it is contacting and expects a response within a reasonable time.

## Benefits of synchronous communication

Synchronous communication is often simple to understand.

The caller asks for something and receives the result directly.

This works well when:

- the result is needed immediately,
- the operation finishes quickly,
- the caller must know whether the operation succeeded,
- the interaction follows a clear request–response flow.

For example, checking sign-in credentials normally requires an immediate result. The application needs to know whether access should be allowed before continuing.

## Problems with synchronous communication

The caller must wait for the receiver.

If the receiver is slow, the caller is also delayed.

If the receiver is unavailable, the operation may fail.

```text
Client
→ Application
→ External Service
```

If the application waits for the external service, a failure in that service can affect the client request.

In a system with several synchronous dependencies, one slow component can create a chain of delays.

This is called a cascading failure when the problem spreads through dependent parts of the system.

Synchronous communication therefore needs controlled timeouts and error handling.

## What is a timeout?

A timeout limits how long the caller waits for a response.

Without a timeout, the caller could wait for a very long time while resources remain occupied.

For example:

> Wait for the external service for up to three seconds. If it does not respond, treat the operation as failed.

A timeout does not solve the original failure.

It prevents the caller from waiting forever and allows the system to choose another response.

## What is asynchronous communication?

Asynchronous communication means that the caller starts or requests work without waiting for the final result to be completed.

The receiver can process the work later.

```text
Producer
→ Message
→ Queue

Producer continues

Queue
→ Message
→ Consumer
```

For example, after saving a maintenance request, the application may place a notification task into a queue.

The user does not need to wait while an email service creates and sends the message.

The application can confirm that the request was saved while notification processing continues separately.

## Acknowledgement and final result

An asynchronous system may immediately acknowledge that work was accepted.

This is not the same as confirming that the final work was completed.

```text
Accepted:
The notification task was received.

Completed:
The notification was successfully sent.
```

This difference is important.

A response such as “accepted for processing” should not be interpreted as proof that processing has already finished.

The system may need another way to track the final result.

## What is a message?

A message is a unit of information sent from one component to another.

A message may contain:

- the type of work,
- an identifier,
- necessary data,
- the time it was created.

For example:

```json
{
  "type": "SEND_NOTIFICATION",
  "requestId": 42
}
```

The producer creates the message.

A consumer receives and processes it.

## What is a queue?

A queue temporarily stores messages until they can be processed.

The producer and consumer do not need to work at exactly the same speed.

```text
Producer
→ Queue
→ Consumer
```

If many tasks arrive quickly, the queue can hold them while the consumer processes them gradually.

This can protect the consumer from sudden workload increases.

However, a growing queue may also indicate that the consumer cannot keep up.

A queue moves waiting work into a managed place. It does not make the work disappear.

## What is an event?

An event is a statement that something has already happened.

Examples include:

- `RequestCreated`
- `PaymentReceived`
- `DocumentApproved`
- `UserRegistered`

An event is normally written in the past tense because it describes a completed fact.

```text
Something happened
→ Event is published
→ Interested consumers react
```

For example, after a maintenance request is successfully stored, the application may publish:

```text
MaintenanceRequestCreated
```

A notification component can react by sending a message.

A reporting component can react by updating statistics.

The component that created the event does not necessarily need to know every consumer.

## What is event-driven communication?

Event-driven communication is an architecture style in which components publish events and other components react to them.

The producer announces what happened.

It does not directly control every action that follows.

```text
Request created
→ Event published
→ Notification reacts
→ Reporting reacts
```

This can reduce direct dependency between components.

The request component does not need to call the notification and reporting components separately.

New consumers may later react to the same event without changing the producer’s main operation.

## Command and event difference

A command asks for an action.

An event reports a fact.

| Command | Event |
|---|---|
| Requests something to happen | Reports that something happened |
| Often directed to a specific receiver | May have several interested consumers |
| Example: `SendNotification` | Example: `RequestCreated` |

A command may be rejected or fail because the requested action has not yet happened.

An event should describe something that has already occurred.

Using clear names helps developers understand the meaning of a message.

## Benefits of asynchronous communication

Asynchronous communication can provide:

- faster response for work that can happen later,
- protection against sudden workload increases,
- less direct timing dependency between components,
- independent processing,
- easier addition of event consumers.

For example, saving a request should not necessarily fail because an email provider is temporarily unavailable.

The request can be saved first, and the notification can be retried separately.

## Problems with asynchronous communication

Asynchronous systems introduce new questions.

A message may be delayed.

The same message may be delivered more than once.

Messages may arrive in an unexpected order.

A consumer may fail after completing only part of its work.

The producer may not immediately know the final result.

The system must therefore consider:

- retries,
- duplicate processing,
- message ordering,
- failed messages,
- monitoring,
- eventual consistency.

Asynchronous communication reduces some forms of dependency but introduces operational complexity.

## What is eventual consistency?

Eventual consistency means that different parts of the system may temporarily show different states, but they are expected to become consistent later.

For example, a request may be created immediately while a reporting total is updated a few seconds later.

During those seconds:

```text
Request system:
Request exists

Reporting system:
Old total is still visible
```

After the event is processed, the reporting system catches up.

This delay may be acceptable for reporting.

It may not be acceptable for an operation that must immediately prevent an invalid payment or state change.

The acceptable amount of delay depends on the requirement.

## Duplicate processing

A message may sometimes be delivered more than once.

For example, a consumer may complete an operation but fail before confirming that the message was processed. The message can then be delivered again.

If processing the same message twice creates two charges or two records, the result may be serious.

Consumers should therefore consider **idempotency**.

An idempotent operation can receive the same request more than once without creating an unintended additional effect.

The detailed design of idempotency belongs to later API and reliability topics. The important point here is that asynchronous delivery may create duplicates and the system must expect them.

## A simple example

Imagine a user creating a maintenance request.

The request creation can be synchronous:

```text
Client
→ Create request
→ Server

Server
→ Request saved
→ Client
```

The client waits because it needs to know whether the request was accepted and saved.

After saving the request, the system can publish an event:

```text
MaintenanceRequestCreated
```

A notification consumer processes this event asynchronously and sends an email.

A reporting consumer may also update its statistics.

```text
RequestCreated event
├── Notification processing
└── Reporting update
```

The user receives the important result immediately: the request was created.

Secondary work can continue independently.

This design is useful only if delayed notification and reporting are acceptable.

## How should the communication style be selected?

Synchronous communication is usually suitable when:

- the caller needs the result immediately,
- the operation is short,
- the success or failure must be known before continuing.

Asynchronous communication is often suitable when:

- the work can finish later,
- the operation may take a long time,
- workload needs buffering,
- temporary receiver unavailability should not block the main operation.

Event-driven communication becomes useful when several components need to react to the same completed fact.

The choice should follow the required behaviour, not a preference for a more advanced architecture.

## Common confusion

### Asynchronous does not automatically mean faster work

The caller may continue sooner, but the total work can still take the same amount of time or longer.

### A queue does not guarantee successful processing

It stores work until a consumer can process it. Consumers, retries, failed messages, and monitoring are still necessary.

### An event is not simply any message

An event describes something that has already happened.

### Event-driven does not mean no coupling

Consumers depend on the meaning and structure of events.

Changing an event carelessly can break them.

### Retries are not always safe

Repeating an operation can create duplicate effects unless the operation is designed to handle repetition.

## Security and operational perspective

Messages can contain sensitive information.

They should include only the data consumers actually need.

Communication boundaries may also require authentication, authorization, encryption, and validation.

Asynchronous processing needs monitoring because failures are not always visible to the original user.

The team should be able to answer:

- Are messages waiting too long?
- Are consumers processing them?
- Which messages repeatedly fail?
- Can an operation be traced across components?

Without this visibility, the system may accept work that silently remains incomplete.

## Testing perspective

Synchronous communication tests can verify requests, responses, timeouts, and controlled dependency failures.

Asynchronous tests need to verify more than message creation.

They may need to show that:

- the correct message is produced,
- the consumer processes it,
- duplicate messages do not create incorrect results,
- failed processing can be retried,
- the final state becomes correct.

Event contract tests can verify that producers and consumers agree on the meaning and structure of an event.

End-to-end tests should focus on important complete workflows rather than trying to test every message combination through the entire system.

## Main idea

**Synchronous communication** makes the caller wait for an immediate response.

**Asynchronous communication** allows work to continue without waiting for the final result.

A **queue** stores messages until consumers can process them.

An **event** describes something that has already happened.

**Event-driven communication** allows other components to react to those events.

The reusable model is:

```text
Does the caller need the result now?
→ Use synchronous communication when immediate knowledge is required

Can the work finish later?
→ Consider asynchronous processing

Do several components need to react to a completed fact?
→ Consider publishing an event
```

The best communication style is not the most complex one.

It is the one that matches the required timing, failure behaviour, and level of independence.