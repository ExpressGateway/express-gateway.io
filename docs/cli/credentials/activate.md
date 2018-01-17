---
title: eg credentials activate
layout: doc-section
---

### Description

Activate one or more credentials

### Usage

```shell
eg credentials activate [options] <id|keyid..>
```

### Options

| Name, longform | Type       | Default | Description                                                               |
| ---            | ---        | ---     | ---                                                                       |
| `-q, --quiet`  | `boolean`  | `false` | Only show major pieces of output                                          |
| `-t, --type`   | `required` |         | Type of credential: can be one of: oauth2, basic-auth, key-auth  [string] |

### Examples

#### Activate a credential

```shell
$ eg credentials activate -t oauth2 2e90e145-bc4b-4ff1-a63a-a097644ba360   
✔ Active 2e90e145-bc4b-4ff1-a63a-a097644ba360
```
