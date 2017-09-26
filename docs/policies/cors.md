---
layout: doc-section
title:  "CORS"
doc-order: 4.4
---

### Description

The CORS Policy Enables Cross-origin resource sharing (CORS) in Express Gateway.
CORS defines a way in which a browser and server can interact and determine whether or not it is safe to allow a cross-origin request.

### Usage

To enable the CORS policy, add `cors` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.
```yaml
policies:
  - cors
  # other policies
```


### Example: excerpt

```yml
...
policies:
  - cors:
      -
        action:
          origin: http://www.example.com
          credentials: true
}
```

### Example: full
```yml
  http:
    port: 9089

  apiEndpoints:
    test_default:

  serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

  pipelines:
    pipeline1:
      apiEndpoints: test_default
      policies:
        -
          cors:
            -
              action:
                origin: 'http://www.example.com'
                methods: 'HEAD,PUT,PATCH,POST,DELETE'
                allowedHeaders: 'X-TEST'
        -
          proxy:
            -
              action:
                serviceEndpoint: example  

```

##### Options Reference

* `origin`:
  - configures the `Access-Control-Allow-Origin` CORS header
  - Boolean: set origin to `true` to reflect the request origin as defined by req.header('Origin'), or set to `false` to disable CORS
  - String: set origin to a specific origin.  example: `http://foobar.com` will allow only requests from "http://foobar.com"
  - Array: set origin to an array of valid origins. Each origin can be a String or RegExp.  example: `[http://foobar1.com", /\.foobar2.com$]` will accept any request from "http://foobar1.com" or from any subdomain of "foobar2.com"
* `methods`:
  - configures the `Access-Control-Allow-Methods` CORS header.
  - expects a comma-delimited string (ex: `'GET,PUT,POST'`) or an array (ex: `['GET', 'PUT', 'POST']`).
* `allowedHeaders`:
  - configures the `Access-Control-Allow-Headers` CORS header.
  - expects a comma-delimited string (ex: `'Content-Type,Authorization'`) or an array (ex: `['Content-Type', 'Authorization']`).
  - if not specified, defaults to reflecting the headers specified in the request's `Access-Control-Request-Headers` header.
* `exposedHeaders`:
  - configures the `Access-Control-Expose-Headers` CORS header.
  - expects a comma-delimited string (ex: `'Content-Range,X-Content-Range'`) or an array (ex: `['Content-Range', 'X-Content-Range']`).
  - if not specified, no custom headers are exposed.
* `credentials`:
  - configures the `Access-Control-Allow-Credentials` CORS header.
  - set to `true` to pass the header, otherwise it is omitted.
* `maxAge`:
  - configures the `Access-Control-Max-Age` CORS header.
  - set to an integer to pass the header, otherwise it is omitted.
* `preflightContinue`:
  - pass the CORS preflight response to the next handler.
* `optionsSuccessStatus`:
  - provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.

The default configuration is the equivalent of:

```yaml
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
