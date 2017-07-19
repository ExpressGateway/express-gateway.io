---
layout: doc-section
title:  "Key Authorization"
doc-order: 4.2
---

### Description

The Key Authorization policy is an efficient way of securing restricting access to your API endpoints for applications.
Keys are generated for apps or users using the Express Gateway [CLI][cli] by [creating a credential][create-credential] of type `key-auth`.

The Express Gateway API key is a key pair separated by colon.

Example:
`1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA`

The pair is a UUID of the identity concatenated with a secret.

### Usage

To enable the Key Authorization policy, add `key-auth` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  -name: cors

```

### Example

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
            apiKeyHeader: COMPANY-CUSTOM-API-KEY-HEADER # custom header name
            disableHeadersScheme: true # will accept "key:secret" format instead of "scheme key:secret"
      proxy: # name of the policy
        -   # list of actions
          action:
            name: proxy # proxy policy has one action - "proxy"
            serviceEndpoint: example # reference to serviceEndpoints Section
```

Express Gateway supports several ways to authenticate with API keys. By default, Express Gateway will look for API keys in both the HTTP headers and query parameters.

#### Using header (recommended)
By default the `Authorization` header is used with an enforced Schema - `apiKey`

##### Example:
`'Authorization':'apiKey 1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'`

The API key scheme and header are not standardized and can be overriden.

* To define another scheme
  - `apiKeyHeaderScheme: 'my-scheme'`
  - 'Authorization':'my-scheme 1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'

* To disable the use of a scheme
  - `apiKeyHeaderScheme:''`
  - 'Authorization':'1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'

* To change the HTTP header
  - `apiKeyHeader:'MY-KEY-HEADER'`
  - 'MY-KEY-HEADER'1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'


#### Using query parameter
Keys may also be passed as a query parameter. Using a query parameter to specify the API key is a common approach for browser apps to avoid CORS Options request.

##### Example:
- define `?apiKey=key:secret` as a query parameter in the URL.
- 'https://example.com?q=search&apiKey=1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'


##### Options Reference

* `apiKeyheader`:
  - 'Authorization'
  - the name of the header that should contain the API key
* `apiKeyHeaderScheme`:
  - 'apiKey'
  - the enforced schema in the header

```yml
apiKeyHeader: 'Authorization', # name of the header that should contain api key
apiKeyHeaderScheme: 'apiKey', # Enforce schema in header.
disableHeaders: false # disable apikey lookup in headers
disableHeadersScheme: false # disable verification of Scheme in header
apiKeyField: 'apiKey', # name of field to check in query parameter
disableQueryParam: false # set to true to disable api key lookup in query string
```

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[cli]: {{ site.baseurl }}{% link docs/cli/credentials/create.md %}
[credentials-create]: {{ site.baseurl }}{% link docs/cli/index.md %}