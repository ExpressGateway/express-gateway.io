---
title: Key Authorization
layout: doc-section
doc-order: 5.3
---

### Description

The Key Authorization policy is an efficient way of securing restricting access to your API endpoints for applications through API keys.
The Express Gateway API key is a key pair separated by colon. The first part of the key pair is a UUID representing the identity of the consumer.
The second part of the key pair is a UUID representing the secret.

Example: `1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA`


### Usage

In order to use the Key Authorization policy, consumers must be created and `key-auth` credentials created for them.

To create consumers (user and apps): use the [CLI][cli] and [create user][users-create] or [create app][apps-create] command.
To create a `key-auth` credential for an user or app: use the [CLI][cli] and [create credential][credentials-create] command with type `key-auth`.

To enable the Key Authorization policy, add `key-auth` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml
policies:
  - key-auth
  # other policies
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
      key-auth: # secure API with key auth
        -
          action:
            apiKeyHeader: COMPANY-CUSTOM-API-KEY-HEADER # custom header name
            disableHeadersScheme: true # will accept "key:secret" format instead of "scheme key:secret"
      proxy: # name of the policy
        -   # list of actions
          action:
            serviceEndpoint: example # reference to serviceEndpoints Section

```

Express Gateway supports several ways to authenticate with API keys. By default, Express Gateway will look for API keys in both the HTTP headers and query parameters.

#### Using header (recommended)
By default the `Authorization` header is used with an enforced authorization scheme - `apiKey`

##### Example:
`'Authorization':'apiKey 1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'`

The API key scheme and header are not standardized and can be overriden.

* To define another scheme
  - `apiKeyHeaderScheme: 'my-scheme'`
  - 'Authorization':'my-scheme 1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'

* To disable the use of a scheme
  - `apiKeyHeaderScheme:''`
  - 'Authorization':'1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'

* To change the HTTP header used for authorization
  - `apiKeyHeader:'MY-KEY-HEADER'`
  - 'MY-KEY-HEADER'1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'


#### Using query parameter
Keys may also be passed as a query parameter. Using a query parameter to specify the API key is a common approach for browser apps to avoid a CORS Options request.

##### Example:
- define `?apiKey=key:secret` as a query parameter in the URL.
- 'https://example.com?q=search&apiKey=1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'


##### Options Reference

* `apiKeyheader`:
  - default value: `Authorization`
  - the name of the header that should contain the API key
* `apiKeyHeaderScheme`:
  - default value: `apiKey`
  - the enforced scheme in the header
* `apiKeyHeader`:
  - default value: `Authorization`
  - name of the header that should contain api key
* `disableHeaders`:
  - default value: `false`
  - disable apikey lookup in headers
* `disableHeadersScheme`:
  - default value: `false`
  - disable verification of scheme in header
* `apiKeyField`:
  - default value: `apiKey`
  - name of field to check in query parameter
* `disableQueryParam`:
  - default value: `false`
  - set to true to disable api key lookup in query string
* `passThrough`:
  - determines whether the gateway should execute the successive policy in case the auth process fails. If set to false,
    the gateway will return an `Unauthorized` response.
  - default value: `false`

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[cli]: {{ site.baseurl }}{% link docs/cli/index.md %}
[users-create]: {{ site.baseurl }}{% link docs/cli/users/create.md %}
[apps-create]: {{ site.baseurl }}{% link docs/cli/apps/create.md %}
[credentials-create]: {{ site.baseurl }}{% link docs/cli/credentials/create.md %}
