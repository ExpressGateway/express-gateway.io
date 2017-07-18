---
layout: doc-section
title: eg tokens revoke
---

### Description

Revoke one or more tokens

### Usage

```shell
eg tokens revoke [options] <tokens..>
```

### Options

| Name, longform | Type       | Default | Description                                                               |
| ---            | ---        | ---     | ---                                                                       |
| `-q, --quiet`  | `boolean`  | `false` | Only show major pieces of output                                          |

### Examples

#### Revoking a token

```shell
$ eg tokens revoke "093fbc48eca8420f966be24160d7b2b2|ee09d40c665c4126a4033da3109824bc" 
✔ Access token has been revoked: 093fbc48eca8420f966be24160d7b2b2|ee09d40c665c4126a4033da3109824bc
```
