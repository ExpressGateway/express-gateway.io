---
layout: doc-section
title: eg apps list
---

### Description

List apps.

### Usage

```shell
eg apps list [options]
```

### Options

| Name, longform | Type      | Default | Description      |
| ---            | ---       | ---     | ---              |
| `-q, --quiet`  | `boolean` | `false` | Only show app ID |

### Examples

#### List apps

```shell
$ eg apps list
[ { createdAt: 'Mon Jul 10 2017 11:10:31 GMT-0700 (PDT)',
    id: 'f9e5378b-7ad5-473b-ae67-19ac09474a41',
    isActive: true,
    name: 'appy',
    redirectUri: 'https://appy.example.com/cb',
    updatedAt: 'Mon Jul 10 2017 11:10:31 GMT-0700 (PDT)',
    userId: 'ksmith' },
  { createdAt: 'Mon Jul 10 2017 11:10:43 GMT-0700 (PDT)',
    id: '8ae740bb-92f4-42c0-b34b-4b0e299eafb2',
    isActive: true,
    name: 'rad-app',
    redirectUri: 'https://rad-app.example.com/cb',
    updatedAt: 'Mon Jul 10 2017 11:10:43 GMT-0700 (PDT)',
    userId: 'ksmith' } ]
```

#### List apps with quiet mode

```shell
[ 'f9e5378b-7ad5-473b-ae67-19ac09474a41',
  '8ae740bb-92f4-42c0-b34b-4b0e299eafb2' ]
```
