---
layout: doc-section
title: eg credentials info
---

### Description

Show details for a single credential

### Usage

```shell
eg credentials info <id|keyid> [options]
```

### Options

| Name, longform | Type       | Default | Description                                                               |
| ---            | ---        | ---     | ---                                                                       |
| `-q, --quiet`  | `boolean`  | `false` | Only show major pieces of output                                          |
| `-t, --type`   | `required` |         | Type of credential: can be one of: oauth2, basic-auth, key-auth  [string] |

### Examples

#### Show details for a single credential

```shell
$ eg credentials info -t oauth2 2e90e145-bc4b-4ff1-a63a-a097644ba360
{
  "createdAt": "Mon Jul 17 2017 16:11:14 GMT-0700 (PDT)",
  "isActive": true,
  "updatedAt": "Mon Jul 17 2017 16:19:35 GMT-0700 (PDT)"
}
```


