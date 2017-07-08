---
layout: doc-section
title: eg users activate
---

### Description

Activate one or more users.

### Usage

```shell
eg users activate [options] <user_id|user_name..>
```

### Options

| Name, longform | Type      | Default | Description       |
| ---            | ---       | ---     | ---               |
| `-q, --quiet`  | `boolean` | `false` | Only show user ID |

### Examples

#### Activate a single user

```shell
$ eg users activate jdoe
✔ Activated jdoe
```

#### Activate multiple users

```shell
$ eg users activate jdoe ksmith
✔ Activated jdoe
✔ Activated ksmith
```

#### Activate using quiet mode

```shell
$ eg users activate -q jdoe ksmith
5fc0001d-9e8f-44ce-bbee-838b4d5008ee
02d4de9e-c602-43d5-a180-2ab6d6bdeeb4
```
