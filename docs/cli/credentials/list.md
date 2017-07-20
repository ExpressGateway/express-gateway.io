---
layout: doc-section
title: eg credentials list
---

### Description

Show all credential for consumer

### Usage

```shell
eg credentials list -c <consumerId> [options]
```

### Options

| Name, longform | Type       | Default | Description                                                               |
| ---            | ---        | ---     | ---                                                                       |
| `-q, --quiet`  | `boolean`  | `false` | Only show major pieces of output                                          |
| `-c, --consumerId`   | `required` |         | User Id or App Id or User username |

### Examples

#### Show details for all credential of consumer

```shell
$ eg credentials list -c oauth2 2e90e145-bc4b-4ff1-a63a-a097644ba360
{
  "createdAt": "Thu Jul 20 2017 15:31:00 GMT+0300 (EEST)",
  "isActive": true,
  "password": "$2a$10$MUsD3XDWYvRONZJYR1R.xuD7jt7qg7VdYoIKfUK0C52WheV/bqkq6",
  "updatedAt": "Thu Jul 20 2017 15:31:00 GMT+0300 (EEST)",
  "type": "basic-auth"
}
{
  "consumerId": "test",
  "createdAt": "Thu Jul 20 2017 15:30:52 GMT+0300 (EEST)",
  "isActive": true,
  "keyId": "0brdq8DPToB2c2GuJ9wHiI",
  "keySecret": "2HqtSc4zEXZ4H1gq54zhOf",
  "scopes": "null",
  "updatedAt": "Thu Jul 20 2017 15:30:52 GMT+0300 (EEST)",
  "type": "key-auth"
}
```


