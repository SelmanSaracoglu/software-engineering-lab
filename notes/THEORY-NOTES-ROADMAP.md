# Theory Notes Roadmap

## Purpose

This roadmap turns `notes/` into a decision-oriented Software Engineering and
Test Engineering knowledge base.

The roadmap is driven by transferable career capability, not by the current
product, repository, or technology stack. Its goal is to build the reasoning
needed to choose between valid engineering options and understand their security,
performance, reliability, testing, operational, complexity, and cost effects.

## Scope boundary

This track covers concepts and engineering decisions.

It does not teach framework syntax, walk through project files, or attempt to
complete a full TypeScript, React, backend, database, or testing-tool curriculum.
Those belong to the separate code-based practical track.

## Learning stages

| Stage | Focus | Status |
| --- | --- | --- |
| A | Software Engineering foundations and system design | Active |
| B | Quality, reliability, performance, delivery, and operations | Planned |
| C | Secure SDLC, application security, and detection-ready design | Deferred until the core foundation is complete |

Security effects are considered throughout Stages A and B. Stage C provides the
dedicated security depth after the engineering foundation exists.

---

# Stage A — Software Engineering Foundations

## 1. Product & Engineering Decisions

Directory: `notes/01-product-and-engineering-decisions/`

1. `01-product-problem-user-need-and-capability-boundary.md`
2. `02-functional-non-functional-requirements-and-quality-attributes.md`
3. `03-trade-offs-prioritization-and-constraints.md`
4. `04-mvp-vertical-slices-and-incremental-delivery.md`
5. `05-yagni-abstraction-and-reversible-decisions.md`
6. `06-adrs-acceptance-evidence-rollback-and-review.md`

Outcome: distinguish problems from requested solutions, define useful capability
boundaries, express quality expectations, and make reviewable engineering
decisions without unnecessary complexity.

## 2. System Architecture

Directory: `notes/02-system-architecture/`

1. `01-system-context-and-client-server-architecture.md`
2. `02-layers-separation-of-concerns-and-dependency-direction.md`
3. `03-monolith-modular-monolith-and-microservices.md`
4. `04-synchronous-asynchronous-and-event-driven-communication.md`
5. `05-spa-mpa-and-server-side-rendering.md`
6. `06-monorepo-polyrepo-workspaces-and-service-boundaries.md`

Outcome: identify system boundaries, choose an architecture proportional to the
problem, and understand how coupling, deployment, ownership, and failure modes
change with each option.

## 3. Web Foundations, APIs & Data Exchange

Directory: `notes/03-web-apis-and-data-exchange/`

1. `01-web-request-journey-dns-tcp-tls-and-http.md`
2. `02-http-https-and-web-security-properties.md`
3. `03-why-apis-exist-and-what-an-api-contract-means.md`
4. `04-rest-rpc-graphql-and-grpc.md`
5. `05-http-methods-status-codes-errors-and-idempotency.md`
6. `06-json-xml-form-data-and-protocol-buffers.md`
7. `07-compatibility-versioning-and-contract-evolution.md`
8. `08-trust-boundaries-server-authority-and-runtime-validation.md`

Outcome: understand the full request path, select communication and data formats,
design evolvable contracts, and treat external input as untrusted at runtime.

## 4. Technology & Repository Decisions

Directory: `notes/04-technology-and-repository-decisions/`

1. `01-runtime-compiler-library-framework-build-tool-and-platform.md`
2. `02-javascript-and-typescript-selection.md`
3. `03-backend-runtime-selection-and-the-nodejs-event-loop.md`
4. `04-minimal-and-opinionated-backend-frameworks.md`
5. `05-frontend-ui-approaches-and-react.md`
6. `06-build-tools-development-tooling-and-vite.md`
7. `07-package-management-dependency-ownership-and-workspaces.md`

Outcome: explain what each part of a stack does, compare alternatives by system
needs, and avoid choosing technologies only because they are familiar or popular.

## 5. Data & Databases

Directory: `notes/05-data-and-databases/`

1. `01-persistence-and-database-models.md`
2. `02-relational-modelling-entities-keys-and-relations.md`
3. `03-postgresql-and-database-selection.md`
4. `04-normalization-and-denormalization.md`
5. `05-constraints-and-validation-boundaries.md`
6. `06-transactions-acid-and-isolation.md`
7. `07-race-conditions-concurrency-and-locking.md`
8. `08-parameterized-sql-and-injection-prevention.md`
9. `09-schema-migrations-and-data-change.md`
10. `10-numeric-types-stored-and-calculated-values.md`
11. `11-indexes-query-plans-and-pagination.md`
12. `12-connections-pooling-and-database-capacity.md`

Outcome: select a data model, protect invariants at the correct boundaries,
reason about concurrent changes, and understand the operational cost of data
access.

---

# Stage B — Quality and Production Engineering

## 6. Reliability & Performance

Directory: `notes/06-reliability-and-performance/`

1. `01-failure-models-safe-errors-and-information-boundaries.md`
2. `02-timeouts-retries-idempotency-and-duplicate-operations.md`
3. `03-rate-limits-resource-limits-and-abuse-resistance.md`
4. `04-latency-throughput-resource-usage-and-measurement.md`
5. `05-bottlenecks-indexes-and-cache-invalidation.md`
6. `06-vertical-horizontal-scaling-and-capacity.md`
7. `07-background-jobs-queues-and-backpressure.md`

Outcome: design for expected failure, measure before optimizing, and select
resilience or scaling mechanisms only when the observed problem justifies them.

## 7. Testing & Quality Engineering

Directory: `notes/07-testing-and-quality/`

1. `01-test-strategy-and-risk-based-selection.md`
2. `02-test-levels-and-boundaries.md` — review and extend the existing note; do not duplicate it
3. `03-test-doubles-mocks-and-real-dependencies.md`
4. `04-integration-contract-component-and-full-stack-e2e-testing.md`
5. `05-test-data-isolation-lifecycle-and-cleanup.md`
6. `06-failure-rollback-and-concurrency-testing.md`
7. `07-type-checking-linting-and-static-analysis.md`
8. `08-ci-quality-gates-and-evidence.md`

Outcome: choose tests from risk rather than habit, place each check at the most
useful boundary, and produce reliable evidence without making the suite
needlessly slow or fragile.

## 8. Delivery & Operations

Directory: `notes/08-delivery-and-operations/`

1. `01-build-time-runtime-and-environments.md`
2. `02-containers-virtual-machines-and-serverless.md`
3. `03-docker-compose-and-local-environment-parity.md`
4. `04-ci-cd-and-deployment-strategies.md`
5. `05-database-deployment-migration-and-rollback.md`
6. `06-backup-restore-rpo-and-rto.md`
7. `07-health-readiness-and-liveness-checks.md`
8. `08-logs-metrics-traces-and-observability.md`
9. `09-audit-logging-retention-and-privacy.md`

Outcome: understand how software becomes a running service, how change is
controlled, how recovery is planned, and what evidence is required to operate a
system responsibly.

---

# Stage C — Secure Software and Detection

## 9. Secure SDLC & Detection-Ready Design

Directory: `notes/09-secure-sdlc-and-detection/`

1. `01-authentication-authorization-and-least-privilege.md`
2. `02-sessions-cookies-and-token-models.md`
3. `03-cors-csrf-xss-and-browser-trust.md`
4. `04-secrets-configuration-and-secure-defaults.md`
5. `05-threat-modelling-attack-surfaces-and-trust-boundaries.md`
6. `06-sast-dast-sca-and-secret-scanning.md`
7. `07-vulnerability-management-and-security-quality-gates.md`
8. `08-security-relevant-logging-and-telemetry.md`
9. `09-detection-ready-application-design.md`
10. `10-incident-investigation-and-telemetry-quality.md`
11. `11-prevention-detection-response-and-security-automation.md`

Outcome: connect software design and delivery decisions to abuse cases, security
testing, telemetry, investigation, detection engineering, and response.

---

# Standard Note Structure

Each note should answer the following questions when applicable:

1. What is the problem?
2. How does the concept work?
3. What options exist?
4. What are the selection criteria?
5. What are the security effects?
6. What are the performance and scalability effects?
7. What are the reliability and operational effects?
8. What are the complexity and cost effects?
9. What are the common mistakes, failure points, and attack points?
10. Under which conditions is the choice no longer correct?

Each note should also contain:

- a concise definition,
- important distinctions,
- at least one generic example,
- a decision checklist,
- and a short summary of the transferable idea.

The structure is a decision framework, not a demand for equal-length sections.

---

# Progress Rules

- Work on one subject at a time.
- Check existing notes before creating a new one.
- Improve rather than duplicate existing material.
- Use generic and transferable examples.
- Update this roadmap when a subject is completed.
- Do not use the roadmap as a session history; Git records completed increments.
- Do not enter the code-based practical track while the current theory increment
  is active.

## Current position

Stage A → Product & Engineering Decisions →
`01-product-problem-user-need-and-capability-boundary.md`

