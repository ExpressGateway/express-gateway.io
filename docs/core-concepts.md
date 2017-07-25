---
layout: doc-section
title:  "Core Concepts"
doc-order: 2.0
---
For an overview of Express Gateway and how it works, check out the [About](/about) page to familiarize yourself with the core entities within Express Gateway and how they are utilized.

Express Gateway comes with the following core entities:

- [endpoints (API and service)](#endpoints)
- [policies](#policies)
- [pipelines](#pipelines)
- [consumers (users and apps)](#consumers)
- [credentials](#credentials)
- [scopes](#scopes)

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
A consumer makes API requests and consumes API responses. In Express Gateway, consumers are users and their applications (apps). Express Gateway comes with a highly flexible [Consumer Management](#Consumer Management) module. An app must belong to a user.

### credentials
Credentials are types of authentication and authorizations. In Express Gateway, a consumer (a user or an app) may be assigned one or more credentials. Users can have a set of credentials.  Apps can have their own set of credentials that are separate from their associated user. 

Each credential specifies a set of [scopes](#scopes) that are used for authorizations. Express Gateway comes with a simple yet powerful [Credential Management](#Credential Management) module. 

### scopes
Scopes are labels used to assign authorizations. Scopes are defined globally and then assigned to API endpoints and credentials. If an API Consumer tries to acccess an API endpoint tagged with a scope, the authorization policy protecting the endpoint looks up the credentials to make sure the consumer has the corresponding scope.
