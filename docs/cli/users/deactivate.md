---
layout: doc-section
title: eg users deactivate
---

### Description

Deactivate one or more users.
### Usage

```shell
eg users deactivate [options] <user_id|user_name..>
```

### Options

| Name, longform | Type      | Default | Description       |
| ---            | ---       | ---     | ---               |
| `-q, --quiet`  | `boolean` | `false` | Only show user ID |

### Examples

#### Deactivate a single user

```shell
$ eg users deactivate jdoe
✔ Deactivated jdoe
```

#### Deactivate multiple users

```shell
$ eg users deactivate jdoe ksmith
✔ Deactivated jdoe
✔ Deactivated ksmith
```

#### Deactivate using quiet mode

```shell
$ eg users deactivate -q jdoe ksmith
5fc0001d-9e8f-44ce-bbee-838b4d5008ee
02d4de9e-c602-43d5-a180-2ab6d6bdeeb4
```
