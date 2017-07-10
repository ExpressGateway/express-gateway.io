---
layout: doc-section
title: eg scopes create
---

### Description

Create one or more scopes.

### Usage

```shell
eg scopes create [options] <scope..>
```

### Options

None.

### Examples

#### Create a scope

```shell
$ eg scopes create admin:write
✔ Created admin:write
```

#### Create multiple scopes

```shell
$ eg scopes create admin:read admin:write
✔ Created admin:read
✔ Created admin:write
```
