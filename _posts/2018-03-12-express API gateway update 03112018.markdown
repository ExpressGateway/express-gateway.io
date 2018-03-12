---
title: Ship, Ship - Hooray! 1.7.3 is here.
date: 2018-03-12 05:31:00 Z
categories:
- announcements
- technology
tags:
- JSON Schema Support
- JSON
- environment variables
- JSON Web Tokens
- API Gateway
- Redis
layout: post
---

It's true, we've slowed down on Express Gateway. Why? We've been pretty busy supporting developers deploying instances of Express Gateway on production environments. We are thrilled at this opportunity, but like any other open source project we've found a few edge cases. So, where to go from here?

<!--excerpt-->

Please welcome Express Gateway 1.7.3 where we have collected some edge cases and put solutions to those edgecases into this release. BOOM!

## JSON Web Tokens (JWT) got an upgrade

Last week we posted all about getting started with JSON Web Tokens, so this release has some extra special love for JSON Web Tokens (JWT).

Now, when you validate an external JWT and `checkCredentialExistence` flag is `false`, the gateway will set the received JWT as the current user object. This makes it easy to directly extract the information you care about instead of creating an anonymous user.

*Information. You. Care. About.*

So, to round out the updates to JWT - you can specify the `algorithm` parameter that the `oAuth2` policy will use to sign the JWT token.

## JSON Schema support still in full swing

We've already announced support for JSON Schema, but we've been working hard on a few updates. For instance, we've enabled the coercing option for Express Gateway's schema validator (`ajv`). So, this means that the Gateway will  convert your data to the correct type. Additionally, this update was required in order to fully support environment variables in JSON configuration files.

Also, we improved JSON Schema for the `serviceEndpoint` with respect to `urls.` Specifically, we replaced some run time checks into the JSON Schema, specified using the right logger (`policy` instead of `logger`). In addition, we rearranged parameters so that the created `balancer` is constant (hopefully immutable).

If that's not enough, we also removed unused parameters in `prepareHeaders` and deleted foreign parameters in `…File `parameters. We're also excited to announce that the balancer strategies do not modify the current object as this was breaking ** All The Things(tm).**

## How We're Making Your Dev Life Easier

In addition to all of the new changes with JWT and JSON schema support, we've added error messages when a policy cannot be loaded. This is to help developers understand what's going on in a faster, more effective way. For instance, when a plugin's JSON schema is wrong or if there are issues while registering it on Express-Gateway, you'll still get the original error message.

Additionally, we've reorganized the [Proxy Policy](https://www.express-gateway.io/docs/policies/proxy/) so it's easier to read and understand. This is an important policy to consider when using Express Gateway because it forwards requests to service endpoints.

[Check out more updates in the official release notes.](https://github.com/ExpressGateway/express-gateway/releases/tag/v1.7.3)

### Reminder: In Production Yet?

If you're currently using Express Gateway in production - [hit us up](mailto:info@express-gateway.io)! We'd love to understand more about your use case, project and see where we could help out.

## More Resources

* Check out the **[Express Gateway roadmap](https://github.com/ExpressGateway/express-gateway/milestones)**

* Join the **[Express Gateway Newsletter](https://eepurl.com/cVOqd5)** update list

* [Follow along on](https://twitter.com/express_gateway) **Twitter**
