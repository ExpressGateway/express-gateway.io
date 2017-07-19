---
layout: doc-section
title: eg credentials create
---

### Description

Create credentials

### Usage

```shell
eg credentials create [options]
```

### Options

| Name, longform   | Type      | Default | Description                                                       |
| ---              | ---       | ---     | ---                                                               |
| `-q, --quiet`    | `boolean` | `false` | , --quiet  Only show major pieces of output                       |
| `-c, --consumer` | `string`  |         | Consumer ID: can be User ID or username or app ID                 |
| `-p, --property` | `string`  |         | App property in the form [-p 'foo=bar']                           |
| `--stdin`        | `boolean` | `false` | Import newline-delimited JSON via standard input                  |
| `-t, --type`     | `string`  |         | Type of credential: can be one of: oauth2, basic-auth, key-auth   |

### Example

#### Creating an OAuth2 credential for an app

```shell
$ eg credentials create -c 2e90e145-bc4b-4ff1-a63a-a097644ba360 -t oauth2
✔ Created 
 {
  "isActive": true,
  "createdAt": "Mon Jul 17 2017 16:11:14 GMT-0700 (PDT)",
  "updatedAt": "Mon Jul 17 2017 16:11:14 GMT-0700 (PDT)",
  "id": "2e90e145-bc4b-4ff1-a63a-a097644ba360",
  "secret": "edc4ce2a-330f-4232-9bb8-c3998f8e7c7a"
}
```
