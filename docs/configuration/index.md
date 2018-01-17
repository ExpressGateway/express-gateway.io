---
title: Configuration
layout: doc-section
doc-order: 3.0
---

One key feature of Express Gateway is that configuration is completely separate from the static code used to run the gateway.

All configuration is centralized and can be found in the `/config` directory of the main Express Gateway folder.

Configuration is divided into different levels:

| Level   | Name    | File/Directory             |
| ------- | ------- | -------------------------- |
| 1 (top) | gateway | /config/gateway.config.yml |
| 2       | system  | /config/system.config.yml  |
| 3       | data    | /config/models      |

The levels allow you to configure and manage Express Gateway without having to concern yourself with details that may not be relevant to you as a user, operator, administrator or developer. The lower the level, the higher the complexity.

## Yaml references

The gateway is shipped with `yml` files. However, given that [JSON is YAML][json-is-yaml], you can also provide JSON
files. The gateway will be working correctly.

Also — there are some handy features in yaml that might be handy when managing complex gateway files. One of these
is definitely the [references support][references]

### Examples

Let's say we have two pipelines in our gateway and we want to

* Protect them with a [JWT policy][jwt]
* Rate limit the request coming in using the [rate limit][rate-limit]
* Proxy them to the requested resource

The most naive solution would be to write a configuration file like this:

```yml
http:
  port: 8080
apiEndpoints:
  customers:
    host: customers.company.com
  orders:
    host: orders.company.com
serviceEndpoints:
  customers:
    url: 'http://customers'
  orders:
    url: 'http://orders'
policies:
  - jwt
  - proxy
  - rate-limit
pipelines:
  customers:
    apiEndpoints:
      - customers
    policies:
      - rate-limit:
        - action:
            max: 1
            windowMs: 1000
      - jwt:
        - action:
            secretOrPublicKeyFile: ./key/pubKey.pem
            checkCredentialExistence: false
      - proxy:
          - action:
              serviceEndpoint: customers
              changeOrigin: true
  orders:
    apiEndpoints:
      - orders
    policies:
      - rate-limit:
        - action:
            max: 1
            windowMs: 1000
      - jwt:
        - action:
            secretOrPublicKeyFile: ./key/pubKey.pem
            checkCredentialExistence: false
      - proxy:
          - action:
              serviceEndpoint: orders
              changeOrigin: true
```

There's nothing wrong with this approach. However, when pipelines start to increase it might become very verbose.

Let's leverage the YAML anchors and merge features to DRY this file.

First of all, we're going to put anchors on pieces we want to reference around.

```yml
- rate-limit: &rate-limit
  - action:
      max: 1
      windowMs: 1000
- jwt: &jwt
  - action:
      secretOrPublicKeyFile: ./key/pubKey.pem
      checkCredentialExistence: false
- proxy:
    - action: &proxy
        serviceEndpoint: customers
        changeOrigin: true
```

We can now reference these policies in our second pipeline, instead of copy-paste them around:

```yml
policies:
  - rate-limit: *rate-limit
  - jwt: *jwt
  - proxy:
    - action:
        <<: *proxy
        serviceEndpoint: orders
```

[json-is-yaml]: http://yaml.org/spec/1.2/spec.html#id2759572
[references]: https://camel.readthedocs.io/en/latest/yamlref.html
[jwt]: {{ site.baseurl }}{% link docs/policies/jwt.md %}
[rate-limit]: {{ site.baseurl }}{% link docs/policies/rate-limiter.md %}
