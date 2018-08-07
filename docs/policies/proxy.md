---
title: Proxy
layout: doc-section
doc-order: 5.6
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
* `strategy`:
  - Assigns a load-balancing strategy for `serviceEndpoint` declarations that have more than one URL, defaults to `round-robin`.
* `proxyUrl`:
  - Address of the intermediate proxy. Example: `http://corporate.proxy:3128`. See more details below.
* `target`:
  - url string to be parsed with the url module
* `forward`:
  - url string to be parsed with the url module
* `agent`:
  - object to be passed to http(s).request (see Node's [https agent](https://nodejs.org/api/https.html#https_class_https_agent) and [http agent](https://nodejs.org/api/http.html#http_class_http_agent) objects)
* `ssl`:
  - object to be passed to https.createServer()
* `ws`:
  - true/false, if you want to proxy websockets
* `xfwd`:
  - true/false, adds x-forward headers
* `secure`:
  - true/false, if you want to verify the SSL Certs
* `toProxy`:
  - true/false, passes the absolute URL as the `path` (useful for proxying to proxies)
* `prependPath`:
  - true/false, Default: true - specify whether you want to prepend the target's path to the proxy path
* `ignorePath`:
  - true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request (note: you will have to append / manually if required).
* `localAddress`:
  - Local interface string to bind for outgoing connections
* `changeOrigin`:
  - true/false, Default: true - changes the origin of the host header to the target URL
* `preserveHeaderKeyCase`:
  - true/false, Default: false - specify whether you want to keep letter case of response header key
* `auth`:
  - Basic authentication i.e. 'user:password' to compute an Authorization header.
* `hostRewrite`:
  - rewrites the location hostname on (201/301/302/307/308) redirects.
* `autoRewrite`:
  - rewrites the location host/port on (201/301/302/307/308) redirects based on requested host/port. Default: false.
* `protocolRewrite`:
  - rewrites the location protocol on (201/301/302/307/308) redirects to 'http' or 'https'. Default: null.
* `cookieDomainRewrite`:
  - rewrites domain of `set-cookie` headers. Possible values:
    * `false` (default): disable cookie rewriting
    * String: new domain, for example `cookieDomainRewrite: "new.domain"`. To remove the domain, use `cookieDomainRewrite: ""`.
    * Object: mapping of domains to new domains, use `"*"` to match all domains.
      For example keep one domain unchanged, rewrite one domain and remove other domains:
      ```javascript
      cookieDomainRewrite: {
        "unchanged.domain": "unchanged.domain",
        "old.domain": "new.domain",
        "*": ""
      }
      ```
* `headers`:
  - object with extra headers to be added to target requests.
* `proxyTimeout`:
  - timeout (in millis) when proxy receives no response from target

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

### Service Endpoints options

There might be cases where a set of Proxy options is valid for an entire service endpoint. If you have, for example,
a service endpoint on an `host` and then multiple pipelines based on a `path` — you might end up setting the same
options per each pipeline. In that case, you can either use [yaml references][yaml_references], or set the `proxyOptions`
parameter on the `serviceEndpoint` directly.

```yaml
serviceEndpoints:             # downstream microservices
  cats:                       # name, used as a reference in pipeline
    url: "http://cats1.example.com"
    proxyOptions:
      changeOrigin: false
      xfwd: true
```

The `proxyOptions` object will be forwarded to the [node-http-proxy](https://github.com/nodejitsu/node-http-proxy) middleware.

### Service Endpoints behind intermediate proxy
Some corporation allow access to internet only through proxy.
In this case you need to specifically tell Express-Gateway to use proxy to forward requests

Request flow will look like this:

Request -> Express Gateway with Proxy policy -> Corporate proxy -> Target Service Endpoint

This can be done done using `http_proxy` or `HTTP_PROXY` env variable.

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
[yaml_references]: {{ site.baseurl }}{% link docs/configuration/index.md%}#yaml-references
