---
title: eg users list
layout: doc-section
---

### Description

List users.

### Usage

```shell
eg users list [options]
```

### Options

| Name, longform | Type      | Default | Description       |
| ---            | ---       | ---     | ---               |
| `-q, --quiet`  | `boolean` | `false` | Only show user ID |

### Examples

#### List users

```shell
$ eg users list
[ { createdAt: 'Sun Jul 09 2017 16:54:18 GMT-0700 (PDT)',
    email: 'ksmith@example.com',
    firstname: 'Kate',
    id: '010566fb-6cf5-4bce-a7b1-1be85fb0969a',
    isActive: true,
    lastname: 'Smith',
    redirectUri: 'https://ksmith.example.com/cb',
    updatedAt: 'Sun Jul 09 2017 16:55:26 GMT-0700 (PDT)',
    username: 'ksmith' },
  { createdAt: 'Sun Jul 09 2017 16:55:50 GMT-0700 (PDT)',
    email: 'jdoe@example.com',
    firstname: 'John',
    id: 'a0c300c1-ad01-444e-88f9-1feb980d342d',
    isActive: true,
    lastname: 'Doe',
    redirectUri: 'https://jdoe.example.com/cb',
    updatedAt: 'Sun Jul 09 2017 16:55:50 GMT-0700 (PDT)',
    username: 'jdoe' } ]
```

#### List users with quiet mode

```shell
$ eg users list -q 
[ '010566fb-6cf5-4bce-a7b1-1be85fb0969a',
  'a0c300c1-ad01-444e-88f9-1feb980d342d' ]
```
