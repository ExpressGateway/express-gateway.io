---
layout: doc-section
title: JWT verification
doc-order: 5.11
---

### Description

The JWT policy can verify requests containing HS256 or RS256 signed JSON Web Tokens (as specified in
[RFC 7519][rfc-jwt])

Each of your Consumers will have JWT credentials (public and secret keys) which must be used to sign their JWTs.

A token can then be passed through the Authorization header or in the request's URI or even in the body and the gateway
will either proxy the request to your upstream services if the token's signature is verified, or discard the request if not.

Express Gateway can also verify on some of the registered claims of RFC 7519 (`exp` and `nbf`).

### Usage

In order to use the JWT policy, consumers must have a `jwt` credential associated with them.

To create consumers (user and apps): use the [CLI][cli] and [create user][users-create] or [create app][apps-create] command.
To create a `jwt` credential for an user or app: use the [CLI][cli] and [create credential][credentials-create]
command with type `jwt`. You can also use the [Admin API][admin_api] to do the same thing

To enable the JWT policy, add `jwt` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml
policies:
  - jwt
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
      jwt: # secure API with key auth
        - action:
      proxy: # name of the policy
        - action:
            serviceEndpoint: example # reference to serviceEndpoints Section

```

Express Gateway supports several ways to locate your Json Web Token in your request.

### Locating the JWT token

#### Using Authorization header (recommended)
By default the `Authorization` header with `Bearer` is used to locate your token.

The JWT scheme and header are not standardized, therefore they can be overriden if required.

#### Other strategies

- `authBearer`: (default), extracts the token from the `Authorization` header with `Bearer` scheme.
- `authScheme`: extracts the token from the `Authorization` header with the specified scheme.
- `header`: extracts the token from the specified header.
- `query`: extracts the token from the a specified query parameter

*Note: extracting the JWT from a query parameter is usually discouraged for security purposes, as those might get caught by your logging system, disclosing potentially sensitive informations.*

##### Options Reference

* `secret`:
  - the secret used to verify the incoming token
  - required unless `secretFile` is provided
* `secretFile`:
  - a public key file used to verify the token signature. This can be provided from a thirty party service as well.
  - required unless `secret` is provided
* `jwtExtractor`:
  - the strategy used to extract the token from the request
  - default value: `authBearer`
  - possible values: `['authBearer', 'authScheme', 'header', 'query']`
* `jwtExtractorField`:
  - The field to check, according to the selected extraction strategy.
  - Not required for `authBearer` strategy
* `audience`:
  - if provided, the `aud` claim will be verified against this value

### A complete flow example


[rfc-jwt]: https://tools.ietf.org/html/rfc7519
[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[admin_api]: {{ site.baseurl }}{% link docs/admin/index.md %}
[cli]: {{ site.baseurl }}{% link docs/cli/index.md %}
[users-create]: {{ site.baseurl }}{% link docs/cli/users/create.md %}
[apps-create]: {{ site.baseurl }}{% link docs/cli/apps/create.md %}
[credentials-create]: {{ site.baseurl }}{% link docs/cli/credentials/create.md %}
