---
title: policies
layout: doc-section
doc-order: 3.1
list-order: 0.6
---

### Description

The policies section is a whitelist of enabled policies. Policies that are intended to be used by Express Gateway must be declared here. For all policies supported by Express Gateway please see the [Policy Reference][policy-reference]

### Usage

```yaml
policies:
  - name: 'cors'
  - name: 'rate-limiter'
  - name: 'log'
  - name: 'proxy'
  - name: 'oauth2'
  - name: 'key-auth'
  - name: 'basic-auth'
```

### Options:

| Name   | Description                                                                 |
|---     | ---                                                                         |
| `name` | name of policy, also the corresponding directory name under `/lib/policies` |

[policy-reference]: {{ site.baseurl }}{% link docs/policies/index.md %}
