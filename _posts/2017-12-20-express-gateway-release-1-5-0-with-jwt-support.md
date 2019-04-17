---
title: Express Gateway Release 1.5.0 with JWT support
description: Express Gateway, the microservices and serverless API gateway built on Express.js, version 1.5.0 is now released. Now comes with JWT feature as requested.
date: 2017-12-20 00:00:00 Z
categories:
- announcements
- technology
layout: post
author: Al Tsang
---

You asked - we listened. That's what open source projects should be all about. In the latest release of Express Gateway 1.5.0, we've included support for  JSON Web Tokens (JWT). Let's go! <!--excerpt-->

## What is a JSON Web Token?

A JSON Web Token (JWT)  was the most requested feature from the Express Gateway community on Feathub.

Described as "an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object."  This info can be verified and you can trust it because it is signed digitally.

_How do JWTs get signed digitally?_

JWTs are signed using a secret key pair (with the HMAC algorithm) or you can also use a public/private key pair using RSA, a public-key cryptosystem that is widely used for secure data transmission.

## A sneek peek at the JWT policy in Express Gateway

The JWT policy can verify requests containing HS256 or RS256 signed JSON Web Tokens (as specified in [RFC 7519](https://tools.ietf.org/html/rfc7519))

**_Important:_** _Each of your Consumers will have JWT credentials (public and secret keys) which must be used to sign their JWTs._

Then a token can be passed through the Authorization header or in the request's URI or even in the body and the Gateway. This policy will either proxy the request to your upstream services if the token's signature is verified, or discard the request if not.

Additionally, Express Gateway can also verify on some of the registered claims of RFC 7519 (`exp` and `nbf`).

## Get Started with the JWT Policy in Express Gateway

In order to use the JWT policy, consumers must have a `jwt` credential associated with them. In order to create consumers (user and apps): use the [CLI ](https://www.express-gateway.io/docs/cli/)and [create user](https://www.express-gateway.io/docs/cli/credentials/create) or create app command.

Then, to create a `jwt` credential for an user or app: use the [CLI ](https://www.express-gateway.io/docs/cli/)and [create credentials](https://www.express-gateway.io/docs/cli/credentials/create)

Use command with type `jwt`. You can also use the [Admin API ](https://www.express-gateway.io/docs/admin/)to do the same thing

Next, enable the JWT policy: add `jwt` in [gateway.config.yml](https://www.express-gateway.io/docs/configuration/gateway.config.yml/) in the [policies](https://www.express-gateway.io/docs/configuration/gateway.config.yml/policies) section.

```yaml
policies:
  - jwt
```

## Quick Example

```yaml
http:
  port: 8790
serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'
apiEndpoints:
  api:
    path: '/*'
pipelines:
  example-pipeline:
    apiEndpoints:   # process all request matching "api" apiEndpoint
      - api
    policies:
      - jwt:
        - action:
            secretOrPublicKeyFile: '/app/key.pem'
      - proxy:
        - action:
            serviceEndpoint: example # reference to serviceEndpoints Section
```

Express Gateway supports several ways to locate your JSON Web Token in your request.

Check out [more documentation right over here](https://www.express-gateway.io/docs/policies/jwt#markdown).

## D is for Demo

We've recorded a special demo to help you get started with the JWT support in Express Gateway.  Presented by Vincenzo Chianese, Engineer at LunchBadger and maintainer of Express Gateway.

[Check it out](https://www.youtube.com/watch?v=1tjzFVzk24s)!

### Moving On

_What's up next? So kind of you to ask!_ Check out the [rest of the project milestones](https://github.com/ExpressGateway/express-gateway/milestones)

We would [**love your support in making it happen**](https://github.com/ExpressGateway/express-gateway) and if you’re interested in becoming a maintainer or contributor, now’s the time!

[**Hit up Gitter**](https://gitter.im/ExpressGateway/express-gateway) and join the rest of the developer community.

**_Not quite ready? That’s ok!_**

* [**Upvote features on Feathub**](https://feathub.com/ExpressGateway/express-gateway). Then, we roll up the most popular or interesting features ([Docker images](https://www.lunchbadger.com/official-docker-images-for-express-gateway/)) will then make it over to the  [**Express Gateway roadmap**](https://github.com/ExpressGateway/express-gateway/milestones).
* Join the  [**Express Gateway Newsletter**](https://eepurl.com/cVOqd5) update list
* [Follow along on **Twitter**](https://twitter.com/express_gateway)