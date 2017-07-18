---
layout: doc-section
title: eg credential:scopes add
---

### Description

Add scopes to a credential by id or keyid

### Usage

```shell
eg credential:scopes add [options] <scopes..>
```

### Options

| Name, longform | Type       | Default | Description                                                               |
| ---            | ---        | ---     | ---                                                                       |
| `-q, --quiet`  | `boolean`  | `false` | Only show major pieces of output                                          |
| `-t, --type`   | `required` |         | Type of credential: can be one of: oauth2, basic-auth, key-auth  [string] |
| `--id`         | `required` |         | Id or keyId of credential to add scopes to [string]                       |

### Examples

#### Add a scope to a credential

```shell
$ eg credential:scopes add -t oauth2 --id 2e90e145-bc4b-4ff1-a63a-a097644ba360 read
✔ Scope read added from 2e90e145-bc4b-4ff1-a63a-a097644ba360k
```
