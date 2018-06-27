---
title: Rate Limiter
layout: doc-section
doc-order: 5.7
---

### Description

The Rate Limiter policy is used to limit the number of requests received and processed by the API endpoint. Limits are useful to prevent your system from being overwhelmed in both benign and malevolent situations where the number of requests processed can overwhelm your underlying APIs and supporting services. Rate limits are also useful to control the amount of API consumption to a known capacity of quantity.

Sample use cases:

- Use to limit repeated requests to public APIs and/or endpoints such as password reset.
- Limit access by host name in order to provide different service plans for customers.

### Usage

To enable the Rate Limiter policy, add `rate-limit` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  - rate-limit

```

### Example: all hosts

Rate-limit across all API hosts to 10 requests per 2 minutes interval:

```yaml

http:
  port: 9090
apiEndpoints:
  example:
    host: '*'
serviceEndpoints:
  backend:
    url: 'http://www.example.com'
pipeline1:
    apiEndpoints:
      - 'example',
    policies:
      - rate-limit:
        -
          action:
            max: 10
            windowMs: 120000
            rateLimitBy: "${req.hostname}"
      - proxy:
        -
          action:
            serviceEndpoint: backend

```

### Example: specific API host

Rate-limit established on a specific API host example.com for 500 requests per minute.

```yaml

policies:
  -
    rate-limiter:
      -
        condition: # will execute action only for host matching example.com
          name: hostMatch,
          pattern: example.com
        action:
          max: 500 # limit to 500 req per default period windowMs=60000 (1 minute)

```


### Example: Ratelimit by authenticated users

```yml
http:
  port: 9090
apiEndpoints:
  example:
    host: '*'
serviceEndpoints:
  backend:
    url: 'http://www.example.com'
pipeline1:
    apiEndpoints:
      - 'example',
    policies:
      - key-auth:   # force key-auth for all requests in this pipeliene
      - rate-limit:
        -
          action:                         # allow
            max: 10                       # max 10 request
            windowMs: 120000              # per 120 seconds
            rateLimitBy: "${req.user.id}" # EgContext.req.user.id
      - proxy:
        -
          action:
            serviceEndpoint: backend
```

### Options Reference

* `rateLimitBy`: The criteria that is used to limit the number of requests by. By default will limit based on IP address. Use JS template string to configure. Example "${req.ip}", "${req.hostname}" etc.
* `windowMs`: milliseconds - how long to keep records of requests in memory. Defaults to 60000 (1 minute).
* `max`: max number of connections during windowMs milliseconds before sending a 429 response. Defaults to 5. Set to 0 to disable.
* `message`: Error message returned when max is exceeded. Defaults to 'Too many requests, please try again later.'
* `statusCode`: HTTP status code returned when max is exceeded. Defaults to 429.
* `headers`: Enable header to show request limit (`X-RateLimit-Limit`) and current usage (`X-RateLimit-Remaining`) headers
* `delayAfter`: max number of connections during windowMs before starting to delay responses. Defaults to 1. Set to 0 to disable delaying.
* `delayMs`: milliseconds - how long to delay the response, multiplied by (number of recent hits - delayAfter). Defaults to 1000 (1 second). Set to 0 to disable delaying.

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
