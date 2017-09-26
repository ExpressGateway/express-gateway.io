---
layout: doc-section
title:  "Simple Logger"
doc-order: 4.6
---
### Description

The Simpler Logger policy provides capability for logging with basic message output. JavaScript [ES6 template literal syntax][es6-template-literal-syntax] is supported.

This policy allows you to dump any and all parameters of the [EG Context object][eg-context-object].

### Usage

To enable the Simple Logger policy, add `log` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  - log

```

### Example

```yaml

pipelines:
  api:
    policies:
      simple-logger: # policy name
        - action:    # array of condition/actions objects
            message: ${req.method} ${req.originalUrl} # parameter for log action

```

### Options Reference

* `message`: 
  - string specifiying the message to log
  - can include placeholders using the JavaScript [ES6 template literal syntax][es6-template-literal-sytnax]

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[es6-template-literal-syntax]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[eg-context-object]: {{ site.baseurl }}{% link docs/policies/expression.md %}#eg-context-object