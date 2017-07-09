---
layout: doc-section
title:  "CORS"
---
Enables Cross-origin resource sharing (CORS) in EG. 
CORS defines a way in which a browser and server can interact to determine whether or not it is safe to allow the cross-origin request

Example: simple
```yml
...
policies:
  - cors:
      -
        action:
          name: cors
          origin: http://www.example.com
          credentials: true
}
```

Example: full
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
                name: cors
                origin: 'http://www.example.com'
                methods: 'HEAD,PUT,PATCH,POST,DELETE'
                allowedHeaders: 'X-TEST'
        -
          proxy:
            -
              action:
                name: proxy  
                serviceEndpoint: example  

```

##### Options Reference 
* `origin`: Configures the `Access-Control-Allow-Origin` CORS header. Possible values:
  + Boolean - set origin to true to reflect the request origin, as defined by req.header('Origin'), or set it to false to disable CORS.
  + String - set origin to a specific origin. For example if you set it to "http://example.com" only requests from "http://example.com" will be allowed.
  + Array - set origin to an array of valid origins. Each origin can be a String or a RegExp. For example ["http://example1.com", /\.example2\.com$/] will accept any request from "http://example1.com" or from a subdomain of "example2.com".
* `methods`: Configures the `Access-Control-Allow-Methods` CORS header. Expects a comma-delimited string (ex: `'GET,PUT,POST'`) or an array (ex: `['GET', 'PUT', 'POST']`).
* `allowedHeaders`: Configures the `Access-Control-Allow-Headers` CORS header. Expects a comma-delimited string (ex: `'Content-Type,Authorization'`) or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's `Access-Control-Request-Headers` header.
* `exposedHeaders`: Configures the `Access-Control-Expose-Headers` CORS header. Expects a comma-delimited string (ex: `'Content-Range,X-Content-Range'`) or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.
* `credentials`: Configures the `Access-Control-Allow-Credentials` CORS header. Set to true to pass the header, otherwise it is omitted.
* `maxAge`: Configures the `Access-Control-Max-Age` CORS header. Set to an integer to pass the header, otherwise it is omitted.
* `preflightContinue`: Pass the CORS preflight response to the next handler.
* `optionsSuccessStatus`: Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.

The default configuration is the equivalent of:

```
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```
