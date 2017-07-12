---
layout: doc-section
title:  "Key Authorization"
doc-order: 4.2
---
Key auth is an efficient way of securing your API.
Keys are generated for apps or users using CLI tool.

Sample use case:
Restricting access to api endpoints for applications

The Express Gateway API key has format of a key pair separated by colon: `1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA`

The pair is a UUID of the identity concatenated with a secret.

Express Gateway supports several ways to authenticate with api key:

##### Using header (recommended)
By default Authorization header is used and enforced Schema is `apiKey`

Example:
`'Authorization':'apiKey 1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'`

Since api key scheme and header is not standardised you can override them

You can define another Scheme name using `apiKeyHeaderScheme`  
'Authorization':'my-scheme 1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'

and to disable set
`apiKeyHeaderScheme:''`

This will make EG accept that format:
'Authorization':'1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'

It is also possible to change header name use `apiKeyHeader:'MY-KEY-HEADER'`  


##### Using query parameter
Using a query parameter to specify the API key is a common approach for browser apps to avoid CORS Options request.

`?apiKey=key:secret` is specified as a query parameter in the URL.

Example:
`https://example.com?q=search&apiKey=1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA`

##### Using in JSON body
```json
{
  "name":"eg-customer",
  "apiKey":"1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA"
}

```

##### Options Reference
```yml
apiKeyHeader: 'Authorization', # name of the header that should contain api key
apiKeyHeaderScheme: 'apiKey', # Enforce schema in header.
disableHeaders: false # disable apikey lookup in headers
disableHeadersScheme: false # disable verification of Scheme in header
apiKeyField: 'apiKey', # name of field to check in query param or body
disableQueryParam: false # set to true to disable api key lookup in query string
disableBody: false # set to true to disable api key lookup in body
```


Example:
```yaml
http:
  port: 8790
serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

apiEndpoints:
  api:
    path: '*'

pipelines:
  example-pipeline:
    apiEndpoints:   # process all request matching "api" apiEndpoint
      - api
    policies:
      keyauth: # secure API with key auth
        -
          action:
            name: keyauth
            disableBody: true # do not look for api key in body
            apiKeyHeader: COMPANY-CUSTOM-API-KEY-HEADER # custom header name
            disableHeadersScheme: true # will accept "key:secret" format instead of "scheme key:secret"
      proxy: # name of the policy
        -   # list of actions
          action:
            name: proxy # proxy policy has one action - "proxy"
            serviceEndpoint: example # reference to serviceEndpoints Section
```
