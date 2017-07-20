---
layout: doc-section
title:  "Expression"
doc-order: 4.80
---

### Description

The Expression policy allows you to execute JavaScript code.

### Usage

To enable the Expression policy, add `expression` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  -name: expression

```

#### egContext Object
TODO

### Example

```yml
pipelines:
  api:
    policies:
      -
        expression: # policy name
          - action:    # array of condition/actions objects
              name: expression # action name
              jscode: 'req.url = "/new/url"; ' #  code to execute against EG Context
```

### Options Reference
* `jscode`:

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
