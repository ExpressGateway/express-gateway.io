---
title: eg scopes remove
layout: doc-section
---

### Description

Remove one or more scopes.

### Usage

```shell
eg scopes remove [options] <scope..>
```

### Options

| Name, longform | Type      | Default | Description     |
| ---            | ---       | ---     | ---             |
| `-q, --quiet`  | `boolean` | `false` | Only scope name |

### Examples

#### Remove a scope

```shell
$ eg scopes remove admin:write
✔ Removed admin:write
```

#### Remove multiple scopes

```shell
$ eg scopes remove admin:read admin:write
✔ Removed admin:read
✔ Removed admin:write
```

#### Remove scopes with quiet mode

```shell
$  eg scopes remove admin:read admin:write
admin:read
admin:write
```
