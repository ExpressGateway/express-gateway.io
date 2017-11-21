---
layout: doc-section
title: eg apps info
doc-order: 4.3
---

### Description

Show details for a single app.

### Usage

```shell
eg apps info [options] <app_id|app_name>
```

### Options

None.

### Examples

#### Show details for a single app

```shell
$ eg apps info cb6864b8-66e1-4bab-a8ea-c8e6ca606c08
{
  "createdAt": "Sun Jul 09 2017 17:03:23 GMT-0700 (PDT)",
  "id": "cb6864b8-66e1-4bab-a8ea-c8e6ca606c08",
  "isActive": true,
  "name": "appy",
  "redirectUri": "https://appy.example.com/cb",
  "updatedAt": "Sun Jul 09 2017 17:03:23 GMT-0700 (PDT)",
  "userId": "jdoe"
}
```
