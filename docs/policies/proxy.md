---
title: Proxy
layout: doc-section
doc-order: 5.9
---

### Description

The Proxy policy forwards the request to a service endpoint.

This type of policy should generally be placed last in the policies list within a pipeline.

### Usage

To enable the Proxy policy, add `proxy` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  - proxy

```

### Example

```yaml

http:
  port: 9091

apiEndpoints:
  api:
    path: '*'

serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

pipelines:
  example-pipeline:
    apiEndpoints:   # process all request matching "api" apiEndpoint
      - api
    policies:
      proxy: # name of the policy
        -   # list of actions
          condition:
            name: pathExact
            path: /admin
          action:
            serviceEndpoint: example # reference to serviceEndpoints Section

```

### Options Reference

* `serviceEndpoint`:
  - the name of the service endpoint to forward to
  - the path of the API endpoint is appended to the path of the serviceEndpoint host and path automatically
  - example: API endpoint - "http://api.foobar.com/api" proxied to a service endpoint defined as "http://internal.api.lan:8080/" will have "/api" appended to it to become "http://internal/api/lan:8080/api"
* `changeOrigin`:
  - Changes the origin of the host header to the target URL, defaults to `true`.
* `strategy`:
  - Assigns a load-balancing strategy for `serviceEndpoint` declarations that have more than one URL, defaults to `round-robin`.
* `proxyUrl`:
  - Address of the intermediate proxy. Example: `http://corporate.proxy:3128`. See more details below.

#### Load balancing strategies

* `round-robin`: This strategy routes each client request to a URL assigned in the `urls` array for a `serviceEndpoint`, starting at the first URL, moving through the last URL, and finally looping back to the start.

```yaml
serviceEndpoints:
  backend: # will be referenced in proxy policy
    urls:
      - http://srv1.example.com
      - http://srv2.example.com

pipelines:
  example-pipeline:
    apiEndpoints:
      - api
    policies:
      proxy:
        - action:
            serviceEndpoint: backend
```

*More strategies may be implemented in the future.*

Note: more complex proxy rules will be introduced to do wilcard based matching similar to Express routing rules


### Service Enpoints behind intermediate proxy
Some corporation allow access to internet only through proxy.
In this case you need to specifically tell Express-Gateway to use proxy to forward requests

Request flow will look like this:

Request -> Express Gateway with Proxy policy -> Corporate proxy -> Target Service Endpoint

This can be done done using `http_proxy` env variable.

`http_proxy=http://corporate.proxy:3128 npm start`

Another way is to set `proxyUrl` in the proxy policy itself
```yaml
pipelines:
  example-pipeline:
    apiEndpoints:   # process all request matching "api" apiEndpoint
      - api
    policies:
      proxy: # name of the policy
        - action:
            serviceEndpoint: example
            proxyUrl: http://corporate.proxy:3128
```

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
