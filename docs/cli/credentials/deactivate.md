---
layout: doc-section
title: eg credentials deactivate
---

### Description

Deactivate one or more credentials

### Usage

```shell
eg credentials deactivate [options] <id|keyid..>
```

### Options

| Name, longform | Type       | Default | Description                                                               |
| ---            | ---        | ---     | ---                                                                       |
| `-q, --quiet`  | `boolean`  | `false` | Only show major pieces of output                                          |
| `-t, --type`   | `required` |         | Type of credential: can be one of: oauth2, basic-auth, key-auth  [string] |

### Examples

#### Deactivate a credential

```shell
$ eg credentials deactivate -t oauth2 2e90e145-bc4b-4ff1-a63a-a097644ba360   
✔ Deactivated 2e90e145-bc4b-4ff1-a63a-a097644ba360
```

