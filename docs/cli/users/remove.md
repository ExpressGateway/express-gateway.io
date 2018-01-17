---
title: eg users remove
layout: doc-section
---

### Description

Remove one or more users.

### Usage

```shell
eg users remove [options] <user_id|user_name..>
```

### Options

| Name, longform | Type      | Default | Description       |
| ---            | ---       | ---     | ---               |
| `-q, --quiet`  | `boolean` | `false` | Only show user ID |

### Examples

#### Remove a single user

```shell
$ eg users remove jdoe
✔ Removed jdoe
```

#### Remove multiple users

```shell
$ eg users remove jdoe ksmith
✔ Removed jdoe
✔ Removed ksmith
```

#### Remove using quiet mode

```shell
$ eg users remove -q jdoe ksmith
5fc0001d-9e8f-44ce-bbee-838b4d5008ee
02d4de9e-c602-43d5-a180-2ab6d6bdeeb4
```
