---
layout: post
title: Intro to the Rate Limiting Policy
date: 2017-10-19 16:00:00 +0000
author: Valeri Karpov
categories: guides
---

[Express Gateway](https://www.express-gateway.io/) has a lot of powerful features beyond just
[auth](https://www.express-gateway.io/getting-started-with-oauth2). Another important feature is
[rate limiting](https://www.express-gateway.io/docs/policies/rate-limiter), which throttles requests to one or more
endpoints. Express Gateway has a lot of tuneable options for configuring throttling: you can throttle requests on a
per user, per endpoint, or per pipeline basis. In this article, I'll walk you through a "Hello, World" example of
using Express Gateway's rate limiting policy, and then show a practical use case of rate limiting based on user API keys.
<!--excerpt-->

Intro to the Rate Limiting Policy
---------------------------------

To get started, let's create a gateway with one endpoint that prints out the requesting user's IP address that we'll
throttle to one request per second. First,
make sure you've installed Express Gateway and created a new gateway called 'scopes':


```
~$ npm i -g express-gateway
```

```
~$ eg gateway create
? What's the name of your Express Gateway? rate-limit
? Where would you like to install your Express Gateway? rate-limit
? What type of Express Gateway do you want to create? Getting Started with Express Gateway
    created package.json
    created server.js

    ...

To start widget-factory, run the following commands:
    cd rate-limit && npm start
```

Next, cd into expression-test and modify the `gateway.config.yml` file. This is the file that controls your
gateway's behavior. Here's the config file for a simple gateway that throttles a pipeline to 1 request per second.

```
http:
  port: 8080
admin:
  port: 9876
  hostname: localhost
apiEndpoints:
  api:
    host: localhost
    paths: '/ip'
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
    apiEndpoints:
      - api
    policies:
      - rate-limit:
          - action:
              # Limit to 1 per second
              max: 1
              windowMs: 1000
      - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true
```

As a refresher, an [endpoint](https://www.express-gateway.io/docs/core-concepts#endpoints) is a URL
that your gateway makes available, a [policy](https://www.express-gateway.io/docs/core-concepts#policies) is an
action you can take on a request, and a [pipeline](https://www.express-gateway.io/docs/core-concepts#pipelines)
combines multiple endpoints and multiple policies to determine what your gateway will do with a given request.

With this config, if you `curl http://localhost:8080/ip` twice at the same time you'll get an
[HTTP 429 "Too Many Requests" error](https://httpstatuses.com/429). The HTTP body will contain the error
"Too many requests, please try again later."

```
$ curl http://localhost:8080/ip & curl http://localhost:8080/ip
[1] 1654
Too many requests, please try again later.$ {
  "origin": "67.169.10.113"
}

[1]+  Done                    curl http://localhost:8080/ip
$
```

You can configure the HTTP error status and error message using the `statusCode` and `message` options to the
`rate-limit` policy:

```
pipelines:
  default:
    apiEndpoints:
      - api
    policies:
      - rate-limit:
          - action:
              # Limit to 1 per second
              max: 1
              windowMs: 1000
              statusCode: 400
              message: Can't let you do that, Star Fox!
      - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true
```

```
$ curl http://localhost:8080/ip & curl http://localhost:8080/ip
[1] 1768
Can't let you do that, Star Fox!$ {
  "origin": "67.169.10.113"
}
^C
[1]+  Done                    curl http://localhost:8080/ip
$
```

As configured, this gateway will only allow 1 request per second to the `/ip` endpoint. So even if two different
users on two different machines make a request at roughly the same time, you'll get the "Too Many Requests" error.
This may be correct depending on your use case, but more likely you actually want to throttle per-IP or per-user. The
`rateLimitBy` option takes a template string, so you can easily throttle per-IP, per-user, per-host, or any combination
of these. Here's an example of throttling by hostname.

```
http:
  port: 8080
admin:
  port: 9876
  hostname: localhost
apiEndpoints:
  api:
    # Make this endpoint accessible from any host
    host: '*'
    paths: '/ip'
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
    apiEndpoints:
      - api
    policies:
      - rate-limit:
          - action:
              # Limit to 1 per 10 seconds based on the hostname
              max: 1
              windowMs: 10000
              rateLimitBy: "${req.hostname}"
      - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true
```

Here's how you can test this using curl. The first 2 requests go through because they're for different hostnames,
`localhost` vs `127.0.0.1`. The 3rd request gets rejected because `localhost` is throttled.

```
$ curl http://localhost:8080/ip & curl http://127.0.0.1:8080/ip
[1] 2541
{
  "origin": "67.169.10.113"
}
$ {
  "origin": "67.169.10.113"
}
^C
[1]+  Done                    curl http://localhost:8080/ip
$ curl http://localhost:8080/ip
Too many requests, please try again later.
$
```

You can get more sophisticated and throttle by both hostname and IP address. Automatically testing throttling by
IP is tricky because spoofing an IP address is difficult. But throttling by IP address is similar to throttling
by request headers, just replace `req.headers.test` with `req.ip`.

```
http:
  port: 8080
admin:
  port: 9876
  hostname: localhost
apiEndpoints:
  api:
    # Make this endpoint accessible from any host
    host: '*'
    paths: '/ip'
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
    apiEndpoints:
      - api
    policies:
      - rate-limit:
          - action:
              # Limit to 1 per 10 seconds based on the hostname
              max: 1
              windowMs: 10000
              rateLimitBy: "${req.hostname} ${req.headers.test}"
      - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true
```

```
$ curl -H "test=hi" http://localhost:8080/ip
{
  "origin": "67.169.10.113"
}
$ curl -H "test=hi" http://localhost:8080/ip
Too many requests, please try again later.
$
```

There's also a `headers` option available for the `rate-limit` policy. This option will add 2 headers,
`X-RateLimit-Limit` and `X-RateLimit-Remaining`. These headers will show how many requests are allowed and,
more importantly, the number of requests they have left before they start getting throttled.

```
      - rate-limit:
          - action:
              # Limit to 1 per 10 seconds based on the hostname
              max: 1
              windowMs: 10000
              rateLimitBy: "${req.hostname} ${req.headers.test}"
              # Adds the following headers:
              #   X-RateLimit-Limit (# of requests allowed)
              #   X-RateLimit-Remaining (# of requests before hitting limit)
              headers: true
```

```
$ curl -i http://localhost:8080/ip
HTTP/1.1 200 OK
x-powered-by: Flask
X-RateLimit-Limit: 1
X-RateLimit-Remaining: 0
connection: close
server: meinheld/0.6.1
date: Wed, 11 Oct 2017 19:37:12 GMT
content-type: application/json
access-control-allow-origin: *
access-control-allow-credentials: true
x-processed-time: 0.000524997711182
content-length: 31
via: 1.1 vegur

{
  "origin": "174.214.6.51"
}
$
```


Throttling Based on Users
-------------------------

[Open Exchange Rates](https://openexchangerates.org/signup) is a popular API for getting up-to-date exchange rates. If
your app needs to display prices in USD as well as [GBP](https://www.dailyfx.com/gbp) and
[EUR](https://www.dailyfx.com/eur), you can use Open Exchange Rates to get up-to-date ratios, like how 1 EUR = 1.17
USD at the time of this writing.

However, Open Exchange Rates' free tier is limited to a very stringent 1000 requests. Let's say you want to let a team
of 10 devs experiment with Open Exchange Rates without signing up for a paid plan and without letting any one developer
blow through the entire team's free tier. 1 request per 6 hours per developer adds up to 1200 requests per 30 days,
which seems reasonable, so let's configure Express Gateway to have a
[separate API key](https://www.lunchbadger.com/implement-key-authentication-express-gateway/) for each developer and
rate limit each developer to 1 request every 6 hours.

Here's the gateway config. First, note that the `rate-limit` policy uses `req.user.id` for `rateLimitBy`. That's the
id of the user. Also, note that there's an `expression` policy that attaches the actual secret key for Open Exchange
Rates to the request, so developers don't have access to the actual Open Exchanges Rates key, only their Express
Gateway key. [Read more about Express Gateway expressions here](https://www.express-gateway.io/docs/policies/expression).

```
http:
  port: 8080
admin:
  port: 9876
  hostname: localhost
apiEndpoints:
  latestRates:
    host: localhost
    paths: '/latest.json'
serviceEndpoints:
  openexchangerates:
    url: 'https://openexchangerates.org/api'
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
      - latestRates
    policies:
      - key-auth:
      # Then, use a custom expression to set the app id
      - expression:
          - action:
              # Replace 'MY_APP_ID' with your open exchange rates app id
              jscode: >
                  req.url = req.url.replace('APP_ID', 'MY_APP_ID');
      - rate-limit:
          - action:
              # Limit to 1 per 6 hours based on user id
              max: 1
              windowMs: 21600000
              rateLimitBy: "${req.user.id}"
```

Now, create a new user with username 'val' and a new [credential](https://www.express-gateway.io/docs/core-concepts#credentials) with key auth:

```
$ eg users create
? Enter username [required]: val
? Enter firstname [required]: val
? Enter lastname [required]: karpov
? Enter email: val@karpov.io
? Enter redirectUri:
✔ Created a430b589-6d9c-4f9f-ad0a-64f324182c0c
{
  "firstname": "val",
  "lastname": "karpov",
  "email": "val@karpov.io",
  "isActive": true,
  "username": "val",
  "id": "a430b589-6d9c-4f9f-ad0a-64f324182c0c",
  "createdAt": "Wed Sep 27 2017 09:13:56 GMT-0700 (PDT)",
  "updatedAt": "Wed Sep 27 2017 09:13:56 GMT-0700 (PDT)"
}
$ eg credentials create -c val -t key-auth
✔ Created 6pSLQztfyTXxJQM3UAsjjZ
{
  "isActive": true,
  "createdAt": "Wed Sep 27 2017 09:14:02 GMT-0700 (PDT)",
  "updatedAt": "Wed Sep 27 2017 09:14:02 GMT-0700 (PDT)",
  "keyId": "6pSLQztfyTXxJQM3UAsjjZ",
  "keySecret": "4gGSmFPqyPZhHA0GSRINUW",
  "scopes": null,
  "consumerId": "val"
}
$
```

Now, if you make an HTTP request to the server using this API key, you'll get rate limited after your 2nd request.

```
$ curl -H "Authorization: apiKey 6pSLQztfyTXxJQM3UAsjjZ:4gGSmFPqyPZhHA0GSRINUW" http://localhost:8080/latest.json?app_id=APP_ID
{
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  ...
$ curl -H "Authorization: apiKey 6pSLQztfyTXxJQM3UAsjjZ:4gGSmFPqyPZhHA0GSRINUW" http://localhost:8080/latest.json?app_id=APP_ID
Too many requests, please try again later.
$
```

But, if you create a 2nd user named 'val2' and use that user's key, you'll be able to make another request successfully.

```
$ eg users create
? Enter username [required]: val2
? Enter firstname [required]: val
? Enter lastname [required]: karpov
? Enter email: val@karpov.io
? Enter redirectUri:
✔ Created 51394975-f0bb-4392-adcd-2cb79f7e732d
{
  "firstname": "val",
  "lastname": "karpov",
  "email": "val@karpov.io",
  "isActive": true,
  "username": "val2",
  "id": "51394975-f0bb-4392-adcd-2cb79f7e732d",
  "createdAt": "Wed Sep 27 2017 09:20:12 GMT-0700 (PDT)",
  "updatedAt": "Wed Sep 27 2017 09:20:12 GMT-0700 (PDT)"
}
$ eg credentials create -c val2 -t key-auth
✔ Created 0LqYRAypB49f4W61p0APqa
{
  "isActive": true,
  "createdAt": "Wed Sep 27 2017 09:20:18 GMT-0700 (PDT)",
  "updatedAt": "Wed Sep 27 2017 09:20:18 GMT-0700 (PDT)",
  "keyId": "0LqYRAypB49f4W61p0APqa",
  "keySecret": "3zkOtlmd2LAwHF2qvnTVwm",
  "scopes": null,
  "consumerId": "val2"
}
$ curl -H "Authorization: apiKey 0LqYRAypB49f4W61p0APqa:3zkOtlmd2LAwHF2qvnTVwm" http://localhost:8080/latest.json?app_id=APP_ID
{
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  ...
$
```

A final note: throttling is currently ephemeral, so if the user 'val' makes a request and then Express Gateway restarts,
the user will be able to make another request inside of 6 hours.

Moving On
---------

Rate limiting is just one more powerful feature in Express Gateway. Combined with
[expressions](https://www.lunchbadger.com/expressions-expressjs-in-express-gateway/) and
[key auth](https://www.lunchbadger.com/implement-key-authentication-express-gateway/), you can use rate limiting
to define access control and throttling for all your APIs from one central config file. Check out the
[rate limiting docs](https://www.express-gateway.io/docs/policies/rate-limiter) and get started with Express Gateway!
