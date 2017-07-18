---
layout: doc-section
title: eg credential:scopes
doc-order: 4.5
---

### Description

Manage scopes for credentials

### Usage

```shell
eg credential:scopes <command> [options]
```

### Child commands

| Command          | Description                                     | Alias |
| ---              | ---                                             | ---   |
| [add][add]       | Add scopes to a credential by id or keyid       |       |
| [remove][remove] | Remove scopes from a credential by id or keyid  |       |
| [set][set]       | Replaces scopes for a credential by id or keyid |       |

[add]: {{ site.baseurl }}{% link docs/cli/credential-scopes/add.md %}
[remove]: {{ site.baseurl }}{% link docs/cli/credential-scopes/remove.md %}
[set]: {{ site.baseurl }}{% link docs/cli/credential-scopes/set.md %}

