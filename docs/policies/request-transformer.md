---
title: Request Transformer
layout: doc-section
doc-order: 5.9
---

### Description

The Request Transformer policy allows to modify the request sent by a client on the fly on Express Gateway, before hitting the downstream server.

It can currently **add/remove** HTTP headers to the current request and **add/remove** properties to the request body, as long it's JSON or URL Encoded. It will skip the body modification in case the parsing operation does not succeed, sending the request to the downstream server untouched.

### Usage

To enable the Request Transformer policy, add `request-transformer` in [gateway.config.yml][gateway.config.yml] in the [policies][policies]
section.

```yaml

policies:
  - request-transformer
```

### Example

```yaml
pipelines:
  pipeline1:
    apiEndpoints:
      - sampleEndpoint
    policies:
      - request-transformer:
        - action:
            body:
              add:
                hello: "'world'"
            headers:
              add:
                r-test: "'header value'"
      - proxy:
          - action:
              serviceEndpoint: backend
```

The value of the properties can also be a JavaScript expression which will be run in the same context of the [expression policy][expression] so all its limitations apply. An example could be:

```yaml
pipelines:
  pipeline1:
    apiEndpoints:
      - sampleEndpoint
    policies:
      - request-transformer:
        - action:
            body:
              add:
                hello: req.consumerId
            headers:
              add:
                r-test: req.requestId
      - proxy:
          - action:
              serviceEndpoint: backend
```

**Note:** Mind the difference between an _expression_ and a _constant string value_. A constant string value must be quoted, so for example `"'world'"` is a constant string value. An expression doesn't need that: `req.consumerId` is an expression.

##### Options Reference

* `headers`
  - specification for the modifications to apply to the HTTP headers.
* `body`:
  - specification for the modifications to apply to the HTTP body.

At least one of *headers* and *body* is required.

*headers* and *body* are defined as follows:

* `add`
  - an object describing the name and the value of the properties to add to the headers/body collection. The value can be an [expression][expression], so you can add values at runtime
* `remove`:
  - an array of properties that should be removed from the headers/body collection


[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[expression]: {{ site.baseurl }}{% link docs/policies/expression.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
