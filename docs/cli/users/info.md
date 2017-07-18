---
layout: doc-section
title: eg users info
doc-order: 4.2
---

### Description

Show details for a single user.

### Usage

```shell
eg users info <user_id|user_name> [options]
```

### Options

| Name, longform | Type      | Default | Description       |
| ---            | ---       | ---     | ---               |
| `-q, --quiet`  | `boolean` | `false` | Only show user ID |


### Examples

#### Show details for a single user

```shell
$ eg users info ksmith
{
  "createdAt": "Sun Jul 09 2017 16:54:18 GMT-0700 (PDT)",
  "email": "ksmith@example.com",
  "firstname": "Kate",
  "id": "010566fb-6cf5-4bce-a7b1-1be85fb0969a",
  "isActive": true,
  "lastname": "Smith",
  "redirectUri": "https://ksmith.example.com/cb",
  "updatedAt": "Sun Jul 09 2017 16:54:18 GMT-0700 (PDT)",
  "username": "ksmith"
}
```
