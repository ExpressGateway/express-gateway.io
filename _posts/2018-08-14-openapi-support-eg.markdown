---
title: Plan OpenAPI 3.0 support in Express Gateway
date: 2018-08-14 07:04:00 Z
categories:
- technology
tags:
- openapi
layout: post
author: Vincenzo Chianese
---

Help us build the OpenAPI scaffolding support for Express Gateway

<!--excerpt-->

Express Gateway has an [open and transparent roadmap][roadmap], where you can track what's going on as well what we're
going to be working in the short future.

If you took some time to look at it, you probably noticed that the next item on the list is the OpenAPI 3.0 support, and
we want your feedback on that.

### What's OpenAPI about

[OpenAPI][openapi] is a specification defining a standard, programming language-agnostic interface description for REST APIs.

Such document contains important information about your API. In particular:

- Generic information about the API (version, support contact, license)
- Connectivity information to a target server
- The available paths and operations for the API
- Security mechanisms that can be used across the API

### What can Express Gateway do with an OpenAPI file

We've been exploring the OpenAPI spec for a while and we've been trying to understand what Express Gateway could do
when such file is provided by the user. In particular, we have identified different touching points

#### Connectivity information

We can use the connectivity information for server target to configure the host of all the [apiEndpoints][apiEndpoints]. In this way we can make sure Express Gateway will receive connections exclusively when received on the specified host.

#### Paths

We can use all the avaiable paths and operations to create more precise [apiEndpoints][apiEndpoints], down to path and method
level as well. Furthermore, based on the various [components][components], we can put policies that can ensure conditions
are held.

For example, if the [requestBody][requestBody] or [responses][responses] are provided in a particular operation and the
`Content-Type` header is set to `application/json`, we could put a JSON Validator policy during the way so that the gateway
could refuse the requests that do not conform to the schema, ahead of the time.

#### Security

Security definitions can be both applied to an entire API section up to individual endpoints as well. By analyzing these,
we found we're able to provide support for `apiKey`, `http` and `oauth2`. We're missing support for `openIdConnect` but again,
by looking at our roadmap you can definitely see that its support is on the way and won't pass that much time before we have
such policy in Express Gateway.

### Help us

We're not there yet. We're still reviewing the document and we have different open questions that the team is looking into.

That's where you can help us tremendously.

In case you're interested the complete specs we're building as well as the opened questions and the discussion we're
having on the feature are live on on our [living document][google-doc-spec]. You're more than welcomed to add your
comments and/or suggestions.

[roadmap]: ({{ site.baseurl}} {% link docs/roadmap.md %})
[openapi]: https://www.openapis.org/
[google-doc-spec]: https://docs.google.com/document/d/12OsuoxjrFqJeNQbxkCeSLLrIR6PG6QMyHHrIkAHk1fc/edit?usp=sharing
[apiEndpoints]: ({{ site.baseurl}} {% link docs/configuration/gateway.config.yml/apiEndpoints.md %})
[components]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#componentsObject
[requestBody]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#requestBodyObject
[responses]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#responseObject
