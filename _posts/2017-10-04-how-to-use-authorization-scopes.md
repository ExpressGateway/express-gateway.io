---
title: How to Use Scopes to Secure Your API
date: 2017-10-04 16:00:00 Z
categories:
- guides
layout: post
author: Valeri Karpov
---

[Express Gateway](https://www.npmjs.com/package/express-gateway) has built-in support for numerous authentication mechanisms,
like [OAuth2](https://www.lunchbadger.com/how-to-implement-oauth-in-express-gateway/) and
[key auth](https://www.lunchbadger.com/implement-key-authentication-express-gateway/). On top of these authentication
mechanisms, Express Gateway supports restricting access to certain endpoints to certain users using the notion of
[scopes](https://www.express-gateway.io/docs/credential-management#scopes). In this article, I'll provide a "Hello, World"
example of using scopes and then dive into a more realistic example of using scopes to protect access to an external API.
<!--excerpt-->

Hello, Scopes
-------------

To get started, let's create a gateway with two endpoints, one of which is accessible to all logged in users and
one of which is only accessible to users we've designated as admins. First, make sure you've installed
Express Gateway and created a new gateway called 'scopes':


```
~$ npm i -g express-gateway
```

```
~$ eg gateway create
? What's the name of your Express Gateway? scopes
? Where would you like to install your Express Gateway? scopes
? What type of Express Gateway do you want to create? Getting Started with Express Gateway
    created package.json
    created server.js

    ...

To start widget-factory, run the following commands:
    cd scopes && npm start
```

Next, do `cd scopes` and change the `config/gateway.config.yml` file to the below. This config file defines 2
API endpoints that both proxy out to [httpbin.org](https://httpbin.org/): one called 'ip' that gets your IP address,
and one called 'get' that gets your IP address and whatever headers your browser sent. These endpoints are not
very useful or sophisticated, but they're sufficient for this rudimentary exercise. The 'get' endpoint has an
associated list of scopes that contains one element, 'admin'. This means that only users that are admins based on
[key-auth](https://www.express-gateway.io/implementing-key-auth) will be able to access this endpoint.

```yml
http:
  port: 8080
admin:
  port: 9876
  hostname: localhost
apiEndpoints:
  # Two endpoints, first one that gets the current IP...
  ip:
    host: localhost
    paths: '/ip'
  # And a second endpoint that gets your IP, headers, etc.
  get:
    host: localhost
    paths: '/get'
    # Only users with the 'admin' scope will be able to access
    # this endpoint
    scopes:
      - 'admin'
serviceEndpoints:
  httpbin:
    url: 'https://httpbin.org'
policies:
  - basic-auth
  - cors
  - expression
  - key-auth
  - log
  - oauth2
  - proxy
  - rate-limit
pipelines:
  default:
    # This pipeline operates on both API endpoints
    apiEndpoints:
      - ip
      - get
    policies:
      # First, this pipeline enforces that the user must be logged in
      # This will also check scopes
      - key-auth:
      # And if the user got past the key-auth policy, we'll proxy them to the correct endpoint
      - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true
```

Now that you've configured the gateway, make sure you run `npm start`, and then run `eg users create` to create a new user.

```
$ eg users create
? Enter username [required]: val
? Enter firstname [required]: val
? Enter lastname [required]: karpov
? Enter email: val@karpov.io
? Enter redirectUri:
✔ Created 9b06d8c8-ba46-49c7-a3be-2ef65298de5b
{
  "firstname": "val",
  "lastname": "karpov",
  "email": "val@karpov.io",
  "isActive": true,
  "username": "val",
  "id": "9b06d8c8-ba46-49c7-a3be-2ef65298de5b",
  "createdAt": "Wed Sep 20 2017 17:58:31 GMT-0700 (PDT)",
  "updatedAt": "Wed Sep 20 2017 17:58:31 GMT-0700 (PDT)"
}
```

Next, let's create a scope. You can think of a scope as Express Gateway's equivalent to a user role in
frameworks like [LoopBack](https://loopback.io/doc/en/lb2/Defining-and-using-roles.html). A scope is what grants a
user access to a protected resource. Creating a new scope called 'admin' is easy, just run `eg scopes create admin`.

```
$ eg scopes create admin
✔ Created admin
```

The key difference between scopes and the user roles you might be used to in other frameworks is that scopes are
associated with **credentials**, not **users**. In Express Gateway, a user has one or more
[credentials](https://www.express-gateway.io/docs/credential-management) that enable them to authenticate against
the gateway using different mechanisms, like OAuth2 or key auth. A credential then has one or more scopes. This means
that a user may have access to different endpoints based on which key they use or whether they logged in with OAuth2 or not.

Run `eg credentials create` to create a credential for the user 'val' with the scope 'admin':

```
$ eg credentials create -c val -t key-auth -p "scopes=admin"
✔ Created 0J6jIYDCbmLF4UBpKAk549
{
  "isActive": true,
  "createdAt": "Wed Sep 20 2017 21:35:08 GMT-0700 (PDT)",
  "updatedAt": "Wed Sep 20 2017 21:35:08 GMT-0700 (PDT)",
  "keyId": "0J6jIYDCbmLF4UBpKAk549",
  "keySecret": "0LDD2FJ1WHA57vqcF25vrs",
  "scopes": [
    "admin"
  ],
  "consumerId": "val"
}
$
```

Great, now you have a user 'val' that should have access to both the 'ip' and 'get' endpoints. Let's create
another user that does not have the 'admin' scope, and therefore only has access to the 'ip' endpoint.

```
$ eg users create
? Enter username [required]: foo
? Enter firstname [required]: foo
? Enter lastname [required]: bar
? Enter email: foo@bar.baz
? Enter redirectUri:
✔ Created b72ee69b-178b-411d-aa8a-10f066929580
{
  "firstname": "foo",
  "lastname": "bar",
  "email": "foo@bar.baz",
  "isActive": true,
  "username": "foo",
  "id": "b72ee69b-178b-411d-aa8a-10f066929580",
  "createdAt": "Wed Sep 20 2017 18:05:53 GMT-0700 (PDT)",
  "updatedAt": "Wed Sep 20 2017 18:05:53 GMT-0700 (PDT)"
}
$ eg credentials create -c foo -t key-auth
✔ Created 2gnzY5H8s8vrGJIASH0NOD
{
  "isActive": true,
  "createdAt": "Wed Sep 20 2017 18:05:59 GMT-0700 (PDT)",
  "updatedAt": "Wed Sep 20 2017 18:05:59 GMT-0700 (PDT)",
  "keyId": "2gnzY5H8s8vrGJIASH0NOD",
  "keySecret": "1fb7Pn0YlfPppAu1rTLHoA",
  "scopes": null,
  "consumerId": "foo"
}
$
```

Now, if you send an HTTP request to '/get' using the 'foo' user's keys using the
[Postman chrome extension](https://www.getpostman.com/), you'll get an error message
that says you're unauthorized. Remember that, by default, key auth in Express Gateway checks the HTTP authorization
header and expects credentials to be in the format `apiKey ${keyId}:${keySecret}` where `keyId` and `keySecret` are
as shown in the output of `eg credentials create` above.

<img src="https://i.imgur.com/DnUyPI6.png">

You can access '/ip' endpoint with the 'foo' user's key though:

<img src="https://i.imgur.com/mwBf547.png">

If you use the 'val' user's key, you can access the '/get' endpoint:

<img src="https://i.imgur.com/etwW6kq.png">

Controlling KeenIO API Access
-----------------------------

[KeenIO's REST API](https://keen.io/docs/api/) is a good example of what you can do with Express Gateway. Their API
has a [powerful role-based access control mechanism](https://keen.io/docs/access/), but suppose you're responsible for
maintaining roles and permissions for hundreds of developers on dozens of APIs. Maintaining integrations with each API's access control paradigm would drive you nuts. Enter Express Gateway. Let's say you want any logged in user to run ad-hoc queries on KeenIO, but only admins can modify saved queries.

The config for restricting access to the saved queries portion of the KeenIO API is below. To use it, you would have
to replace 'MY_PROJECT_ID' with your KeenIO project ID and 'MY_READ_KEY' with your KeenIO read key. The key insight
is that order matters in the `apiEndpoints` property, so if `/queries/saved` comes before `/queries/*` every endpoint under
`/queries/saved` will require 'admin' scope, but `/queries/count` will not.

```
http:
  port: 8080
admin:
  port: 9876
  hostname: localhost
apiEndpoints:
  saved:
    host: localhost
    # This endpoint is the base endpoint for interacting with saved queries
    paths: '/queries/saved'
    # Require the 'admin' scope
    scopes:
      - 'admin'
  adhoc:
    host: localhost
    # The `paths` key can be a list of endpoints, and can include '*' as a
    # wildcard. Note that **order matters** with `apiEndpoints`, if `saved`
    # was listed after `adhoc` this config wouldn't block non-admins from
    # accessing the `saved` endpoint.
    paths:
      - '/queries/*'
serviceEndpoints:
  keen:
    # Replace with your KeenIO Project ID.
    url: 'https://api.keen.io/3.0/projects/MY_PROJECT_ID'
policies:
  - basic-auth
  - cors
  - expression
  - key-auth
  - log
  - oauth2
  - proxy
  - rate-limit
pipelines:
  default:
    apiEndpoints:
      - saved
      - adhoc
    policies:
      - key-auth:
      # Custom expression, replace 'MY_READ_KEY' with your KeenIO read key.
      # More about expressions:
      # https://www.lunchbadger.com/expressions-expressjs-in-express-gateway/
      - expression:
          - action:
              jscode: >
                  req.headers.authorization = 'MY_READ_KEY';
      - proxy:
          - action:
              serviceEndpoint: keen
              changeOrigin: true
```

With this config, a user without admin scope can query to count the number of events that have been tracked to the 'opened post' collection in the last 7 days:

<img src="https://i.imgur.com/Vu32BlW.png">

But they get an 'Unauthorized' error when they try to list the saved queries.

<img src="https://i.imgur.com/WVX7waf.png">

Moving On
---------

Express Gateway's authentication methods and proxying ability are indispensible for centralized access to APIs. You can
generate one API key for every employee and use Express Gateway to proxy their requests with the correct credentials.
No need to worry about rotating keys when an employee leaves or scratch your head wondering who's blowing through the free
tier on your development sandbox account. Scopes give you even more fine grained control, letting you do role-based access
control through a centralized tool rather than dealing with API providers directly. Stop worrying about provider-specific
access control and get started with Express Gateway!
