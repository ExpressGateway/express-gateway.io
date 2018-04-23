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
author: Dellaena Maliwzesky
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

Also, we improved JSON Schema for the `serviceEndpoint` with respect to `urls.` Specifically, we replaced some run time checks into the JSON Schema. In addition, we rearranged parameters such as: removing unused parameters in `prepareHeaders` , deleting foreign parameters in `…File `parameters. Additionally, we also focused on other aspects of  the Proxy Policy like using the right logger (`policy` instead of `logger`) and creating most of the proxy options upfront.

We can't wait to get your feedback on the changes from this release and if you have questions - you can join us  on **[our Gitter channel.](https://gitter.im/ExpressGateway/express-gateway)**

## [Check out more updates in the official release notes.](https://github.com/ExpressGateway/express-gateway/releases/tag/v1.7.3)

### Reminder: In Production Yet?

If you're currently using Express Gateway in production - [hit us up](mailto:info@express-gateway.io)! We'd love to understand more about your use case or project and see where we could help out.
