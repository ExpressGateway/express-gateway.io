---
layout: doc-section
title:  "Rate Limiter"
doc-order: 4.5
---
The rate limiter policy is used to limit the number of requests received and processed by the API endpoint. Limits are useful to prevent your system from being overwhelmed in both benign and malevolent situations where the number of requests processed can overwhelm your underlying APIs and supporting services. Rate limits are also useful to control the amount of API consumption to a known capacity of quantity.

Sample use cases:

- Use to limit repeated requests to public APIs and/or endpoints such as password reset.
- Limit access by host name in order to provide different service plans for customers.

Example:

Rate-limit across all API hosts to 10 requests per 2 minutes interval:

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
      - rate-limit:
        -
          action:
            name: 'rate-limit'
            max: 10
            windowMs: 120000
            rateLimitBy: "${req.hostname}"
      - proxy:
        -
          action:
            name: proxy
            serviceEndpoint: backend

```


Example:

Rate-limit established on a specific API host example.com for 500 requests per minute.

```yml
policies:
  -
    rate-limiter:
      -
        condition: # will execute action only for host matching example.com
          name: hostMatch,
          pattern: example.com
        action:
          name: rate-limit
          max: 500 # limit to 500 req per default period windowMs=60000 (1 minute)
```

Example:

TODO: Rate-limit established by user
TODO: Rate-limit established by application

##### Options Reference

* `rateLimitBy`: The criteria that is used to limit the number of requests by. By default will limit based on IP address. Use JS template string to configure. Example "${req.ip}", "${req.hostname}" etc.
* `windowMs`: milliseconds - how long to keep records of requests in memory. Defaults to 60000 (1 minute).
* `max`: max number of connections during windowMs milliseconds before sending a 429 response. Defaults to 5. Set to 0 to disable.
* `message`: Error message returned when max is exceeded. Defaults to 'Too many requests, please try again later.'
* `statusCode`: HTTP status code returned when max is exceeded. Defaults to 429.
* `headers`: Enable header to show request limit and current usage
* `delayAfter`: max number of connections during windowMs before starting to delay responses. Defaults to 1. Set to 0 to disable delaying.
* `delayMs`: milliseconds - how long to delay the response, multiplied by (number of recent hits - delayAfter). Defaults to 1000 (1 second). Set to 0 to disable delaying.
