---
title: Log
layout: doc-section
doc-order: 5.30
---

### Description

The Log policy provides capability for logging with basic message output. JavaScript
[ES6 template literal syntax][es6-template-literal-syntax] is supported.

This policy allows you to dump any and all parameters of the [EG Context object][eg-context-object]; their

**Note:** The message is logged with level `info`; so if you want to see it, you should make sure to enable such
level when starting the gateway by setting the environment variable `LOG_LEVEL` to `info`

### Usage

To enable the Log policy, add `log` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  - log

```

### Example

```yaml

pipelines:
  api:
    policies:
      log: # policy name
        - action:    # array of condition/actions objects
            message: ${req.method} ${req.originalUrl} # parameter for log action

```

### Options Reference

* `message`:
  - string specifiying the message to log
  - can include placeholders using the JavaScript [ES6 template literal syntax][es6-template-literal-syntax]

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[es6-template-literal-syntax]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[eg-context-object]: {{ site.baseurl }}{% link docs/policies/customization/eg-context.md %}
