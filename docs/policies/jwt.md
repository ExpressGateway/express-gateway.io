---
title: JWT verification
layout: doc-section
doc-order: 5.11
---

### Description

The JWT policy can verify requests containing HS256 or RS256 signed JSON Web Tokens (as specified in
[RFC 7519][rfc-jwt])

Each of your Consumers will have JWT credentials (public and secret keys) which must be used to sign their JWTs.

A token can then be passed through the Authorization header or in the request's URI or even in the body and the gateway
will either proxy the request to your upstream services if the token's signature is verified, or discard the request if
not.

Express Gateway can also verify on some of the registered claims of RFC 7519 (such as `exp` and `nbf`).

### Usage

There are two modalities the JWT policy can verify your token: the **Controlled** or **Uncontrolled**. The
modality is driven by the value of `checkCredentialExistence` value; `true` for the former, `false` for the
latter.

##### Controlled modality

In order to use the JWT policy in controlled modality, consumers must have a `jwt` credential associated with them.

To create consumers (user and apps): use the [CLI][cli] and [create user][users-create] or [create app][apps-create]
command.

To create a `jwt` credential for an user or app: use the [CLI][cli] and [create credential][credentials-create]
command with type `jwt`. You can also use the [Admin API][admin_api] to do the same thing

Once you create a token, you will get a key pair: `keyId` and `keySecret`.

`keyId` **must** be placed in the `sub` field of your JWT. Otherwise, the Gateway will not be able to verify
the consumer bound to it, and it will refuse the request, regardless of the token validity.

`keySecret` is a suggested password you can use to sign your tokens — so you should put this one in your policy
configuration. Anyway, you're free to select your own `secret`, if required.

**Note:** you can bind scopes to a JWT credential.

##### Uncontrolled modality

The uncontrolled modality might be useful in case you want to bypass Express Gateway Identity services. In such case
you don't need to create any credential in the system.

The gateway will still verify the token validity and the standard claims, but won't do any further checks and simply
set its decoded content as the current user.

**Note:** As there's no standardized way to express scopes in JWT, these won't be checked on the token. You can easily
do that using a custom plugin to put after this policy. For an example, see this [repository][jwtz]

#### Using RS256

You can also use a public/private key and leverage RS256 to sign and verify your tokens.

First of all, generate a new public/private key using openssl:

```shell
$ openssl genrsa -out private.pem 2048
```

Keep the private key in a super-secure place (under your bed might be a good place) in your system.

Then extract the public key from it:
```shell
$ openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

Now you have the public key in `public.pem` and the private one in `private.pem`.

Use the private key to sign your tokens, and give the public key to Express Gateway using the `secretOrPrivateKeyFile`
parameter, so it can verify your tokens are correct.

#### Verify external tokens

You don't have to be the one issuing and signin the tokens. You can also leverage thirthy party providers, such as
[Auth0](https://auth0.com) or [oAuth.io](https://oauth.io) by downloading their public certificate and provide them
to the gateway.

#### Installation

To enable the JWT policy, add `jwt` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml
policies:
  - jwt
  # other policies
```

#### Example

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

* `secretOrPublicKey`:
  - the secret used to verify the incoming token
  - required unless `secretOrPublicKeyFile` is provided
* `secretOrPublicKeyFile`:
  - a public key file used to verify the token signature. This can be provided from a thirty party service as well.
  - required unless `secretOrPublicKey` is provided
* `jwtExtractor`:
  - the strategy used to extract the token from the request
  - default value: `authBearer`
  - possible values: `['authBearer', 'authScheme', 'header', 'query']`
* `jwtExtractorField`:
  - The field to check, according to the selected extraction strategy.
  - Not required for `authBearer` strategy
* `audience`:
  - if provided, the `aud` claim will be verified against this value
* `checkCredentialExistence`:
  - determines whether the gateway should check for the credential existence in the system, looking at the `sub` claim.
  - default value: `true`
* `passThrough`:
  - determines whether the gateway should execute the successive policy in case the auth process fails. If set to false,
    the gateway will return an `Unauthorized` response.
  - default value: `false`


[rfc-jwt]: https://tools.ietf.org/html/rfc7519
[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[admin_api]: {{ site.baseurl }}{% link docs/admin/index.md %}
[cli]: {{ site.baseurl }}{% link docs/cli/index.md %}
[users-create]: {{ site.baseurl }}{% link docs/cli/users/create.md %}
[apps-create]: {{ site.baseurl }}{% link docs/cli/apps/create.md %}
[credentials-create]: {{ site.baseurl }}{% link docs/cli/credentials/create.md %}
[jwtz]: https://github.com/XVincentX/apigateway-playground/blob/microservice-gateway-hypermedia-kubernetes/gateway/jwtScopes.js