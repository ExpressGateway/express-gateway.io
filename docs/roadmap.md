---
title: Project Roadmap
layout: doc-section
doc-order: 31.0
---


The Express Gateway roadmap consists of three parts:
1. features request and feedback in [Express Gateway Feathub](https://feathub.com/ExpressGateway/express-gateway)
2. this document that captures all features under considered at the epic level
3. the [Waffle.io task board](https://waffle.io/ExpressGateway/express-gateway) that the Express Gateway contributors use to prioritize feature for the next release

## Timeframes
The timeframes for consideration to implement new features

| Timeframe   | Description                                                |
|---          | ---                                                        |
| Backlog     | immediately being considered or worked on for next release |
| Short Term  | a few minor releases out                                   |
| Medium Term | several minor releases out                                 |
| Long Term   | not until the next major release                           |

## New Features


### Backlog (Next Few Minors)
* OpenAPI Support
  - ingest OpenAPI spec and scaffold EG configuration
  - federate OpenAPI over EG instances
  - create spec
  - spike
  - story prefix "OpenAPI:" in Waffle.io task board
* OpenID 1.0 Policy
  - create spec
  - spike
  - story prefix "OpenID:" in Waffle.io task board
* Plugin Framework - Iteration 2
  - [spec](https://docs.google.com/document/d/1jSDul2n_xbeKNtnek69M79-geur6aTWShAcBZ9evD0E/edit)
  - [development plan](https://docs.google.com/document/d/1nVQIL4A_oJ1wy1XdXBSX7uX27A5tDD62n_4GvpuWCk8/edit)
  - new credential types
  - new services
  - new models
  - CLI (additional Yeoman generators)
  - decouple CLI from config files (use Admin API only)
  - story prefix "Plugin Framework:" in Waffle.io task board
* Microservice/Service discovery and orchestration
  - [spec](https://docs.google.com/document/d/1wkpcVGAnI2rQzetMJ6QVHUrE9TBXf0YvxqYAWUsCerY/edit)
  - spike
  - story prefix "Service Discovery:" in Waffle.io task board
* High Availability through Clustering
  - create spec
  - spike
  - story prefix "Clustering:" in Waffle.io task board

### Short Term (Several Minors Out)
* Core: Response object interceptor
* Refactor OAuth2 out as plugin
* Refactor JWT out as a plugin
* Advanced Logging format
* CLI Interface Enhancements
* API (group of API endpoints)
* Microservice (group of service endpoints)
* (TBD from perf testing)
* soap2json Policy (outbound)
* json2soap Policy (inbound)
* Websocket support

### Medium Term (Several Minors Out)
* Datastore - Postgres
* Serverless Integration (Lambda)
* Serverless Integration (OpenWhisk)
* Express Middleware to EG Policy transformer/converter
* Caching Policy
* Quota Policy
* OAuth2 Introspection (Resource server only)
* RBACL Plugin
* Bot Detection Policy
* Logging - statsd Policy
* Logging - syslog Policy

### Long Term (Next Major)
* GraphQL
* SAML Policy (see Auth Integration)
* LDAP Policy (see Auth Integration)
* HMAC Policy


## Completed Features

See our [Changelog](https://github.com/ExpressGateway/express-gateway/releases)
