---
title: OAuth 2.0 Introspection
layout: doc-section
doc-order: 5.5
---

### Description

The OAuth 2.0 Introspection policy implements a client leveraging the Introspection extension for the oAuth 2.0
authorization protocol as defined in the [RFC-6772 standard][rfc-6772-standard].

Express Gateway plays the role of a resource server, which can be configured to query the defined **introspection**
endpoint and based on its response, let the request continue its flow or stop it if required.

When a client's token has been verified, Express Gateway will append property and authentication headers to
the request before proxying it to the downstream service, so that you can identify the consumer and the end-user in
your service.

Moreover, the decrypted token response will be placed as the current `req.user`. In case you need to pass some additional
values to your downstream services (such as a custom property in the `user` object) you can use the [headers][headers] policy.

### Usage

To enable the OAuth2 Introspection policy, add `oauth2-introspect` in [gateway.config.yml][gateway.config.yml] in the
[policies][policies] section.

```yaml

policies:
  - oauth2-introspect
```

### Example

```yaml

pipelines:
  pipeline1:
    apiEndpoints:
      - authorizedEndpoint
    policies:
      - oauth2-introspect:
          - action:
              endpoint: 'https://authorization.cloud.server/introspect'
              authorization_value: 'YXBpMTpzZWNyZXQ=',
              ttl: 400
      - proxy:
          - action:
              serviceEndpoint: backend
```

##### Options Reference

* `endpoint`
  - The endpoint implementing the introspection RFC.
  - required
* `authorization_value`:
  - the value to append to the Authorization header when requesting the introspection endpoint. This depends on your oAuth2
    server implementation. Most of the times, it's nothing more than your `clientId:clientSecret` base64 encoded.
  - required
* `ttl`:
  - the TTL in seconds for the introspection response. Whithin this time, the same token will be take as valid and the
    cached response will be returned directly without querying the authorization server. Set to `0` to disable the expiration.
  - required, default value: `60`
* `passThrough`:
  - determines whether the gateway should execute the successive policy in case the auth process fails. If set to false,
    the gateway will return an `Unauthorized` response.
  - default value: `false`

[rfc-6772-standard]: https://tools.ietf.org/html/rfc7662
[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[headers]:{{ site.baseurl }}{% link docs/policies/headers.md %}
