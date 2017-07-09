---
layout: doc-section
title:  "Core Concepts"
---
For an overview of Express Gateway and how it works, check out the [About](/about) page to familiarize yourself with the core entities within Express Gateway and how they are utilized.

Express Gateway comes with the following core entities:

- endpoints (API and service)
- policies
- pipelines
- consumers (users and apps)
- credentials

### endpoints
Endpoints are URLs. Express Gateway has two different types of endpoints:
* API endpoints
* Service endpoints

Express Gateway expose APIs through API endpoints. As a gateway, it proxies API requests from API endpoints to microservices referenced in service endpoints.

### policies
A policy is a set of conditions, action and parameters that are evaluated and act on the API request and response flow within Express Gateway. Policies within Express Gateway utilize [Express middleware](http://expressjs.com/en/guide/using-middleware.html).

### pipelines
A pipeline is a set of policies linked to a set of API endpoints. Policies within a pipeline are evaluated and executed sequentially. An API request is received by the API endpoint and routed through the pipeline for policy execution. The last policy within a pipeline is often a proxy policy that will routes the request to a service endpoint.

### consumers
A consumer makes API requests and consumes API responses. In Express Gateway, consumers are users and their applications (apps). Express Gateway comes with a highly flexible [Consumer Management](#Consumer Management) module.

### credentials
Credentials are types of authentication and authorizations. In Express Gateway, a consumer may be assigned one or more credentials. Each credential specifies a set of [scopes](#scopes) that are used for authorizations. Express Gateway comes with a simple yet powerful [Credential Management](#Credential Management) module.
