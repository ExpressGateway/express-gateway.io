---
layout: doc-section
title: eg credential:scopes set
---

### Description

Replaces scopes for a credential by id or keyid

### Usage

```shell
eg credential:scopes set [options] <scopes..>
```

### Options

| Name, longform | Type       | Default | Description                                                               |
| ---            | ---        | ---     | ---                                                                       |
| `-q, --quiet`  | `boolean`  | `false` | Only show major pieces of output                                          |
| `-t, --type`   | `required` |         | Type of credential: can be one of: oauth2, basic-auth, key-auth  [string] |
| `--id`         | `required` |         | Id or keyId of credential to set scopes from [string]                  |

### Examples

#### Set scopes for a credential

```shell
$ eg credential:scopes set -t oauth2 --id 2e90e145-bc4b-4ff1-a63a-a097644ba360 read
✔ Scopes read set for 2e90e145-bc4b-4ff1-a63a-a097644ba360
```
