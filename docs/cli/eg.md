---
layout: doc-section
title: eg (base command) 
doc-order: 4.1
---

### Description

The base command for the Express Gateway CLI.

### Usage

```shell
eg <command>
```

### Child commands

| Command                                | Description                   | Alias            |
| ---                                    | ---                           | ---              |
| [users][users]                         | Manage users                  | user             |
| [apps][apps]                           | Manage apps                   | app              |
| [scopes][scopes]                       | Manage scopes                 | scope            |
| [credentials][credentials]             | Manage credentials            | credential       |
| [credential:scopes][credential:scopes] | Manage scopes for credentials | credential:scope |
| [tokens][tokens]                       | Manage tokens                 | token            |

[users]: {{ site.baseurl }}{% link docs/cli/users/index.md %}
[apps]: {{ site.baseurl }}{% link docs/cli/apps/index.md %}
[scopes]: {{ site.baseurl }}{% link docs/cli/scopes/index.md %}
[credentials]: {{ site.baseurl }}{% link docs/cli/credentials/index.md %}
[credential:scopes]: {{ site.baseurl }}{% link docs/cli/credential-scopes/index.md %}
[tokens]: {{ site.baseurl }}{% link docs/cli/tokens/index.md %}
