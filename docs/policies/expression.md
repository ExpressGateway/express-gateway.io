---
layout: doc-section
title:  "Expression"
doc-order: 5.70
---

### Description

The Expression policy allows you to execute arbitrary JavaScript code in secured shared memory or "sandbox".

### Usage

To enable the Expression policy, add `expression` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml
policies:
  - expression
  # other policies
```

### Example

```yml
pipelines:
  api:
    policies:
      -
        expression: # policy name
          - action:    # array of condition/actions objects
              jscode: 'req.url = "/new/url"; ' #  code to execute against EG Context
```

### Options Reference
* `jscode`:
  - Valid JS code to execute. Note that [egContext object][eg-context] will be used as global object for code. All Node.JS global variables like `process`, `require` etc. will not be available for security reasons

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[eg-context]: {{ site.baseurl }}{% link docs/policies/customization/eg-context.md %}
