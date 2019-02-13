---
title: Terminate
layout: doc-section
doc-order: 5.70
---

### Description

The Terminate policy skips all the successive policies in a pipeline and responds to the current request with a specified
status code and message

### Usage

To enable the terminate policy, add `terminate` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  - terminate
```

### Example

```yaml

pipelines:
  api:
    policies:
      terminate:

```

### Options Reference

* `statusCode`: Status code to return in the response. Defaults to `400`
* `message`: String body to return in the response. Defaults to `Terminated`

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
