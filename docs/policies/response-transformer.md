---
title: Response Transformer
layout: doc-section
doc-order: 5.9
---

### Description

The Request Transformer policy allows to modify the response sent by the server on the fly on Express Gateway, before returning it back to the client

It can currently **add/remove** HTTP headers to the current response and **add/remove** properties to the response body, as long it's JSON. It will skip the body modification in case the parsing operation does not succeed, sending the response to the client server untouched.

### Usage

To enable the Response Transformer policy, add `response-transformer` in [gateway.config.yml][gateway.config.yml] in the [policies][policies]
section.

```yaml

policies:
  - response-transformer
```

### Example

```yaml
pipelines:
  pipeline1:
    apiEndpoints:
      - sampleEndpoint
    policies:
      - response-transformer:
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

The value of the properties can also be a Javascript expression which will be run in the same context of the [expression policy][expression] so all its limitations apply. An example could be:

```yaml
pipelines:
  pipeline1:
    apiEndpoints:
      - sampleEndpoint
    policies:
      - response-transformer:
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
