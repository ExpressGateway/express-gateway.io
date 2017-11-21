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

### Examples

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

#### Creating a Key credential for an application

```shell
$ eg credentials create -t key-auth -c vncz
✔ Created 5Fiun3GPwz5cooOyLXnX0j
{
  "isActive": true,
  "createdAt": "Wed Nov 15 2017 21:48:53 GMT+0100 (CET)",
  "updatedAt": "Wed Nov 15 2017 21:48:53 GMT+0100 (CET)",
  "keyId": "5Fiun3GPwz5cooOyLXnX0j",
  "keySecret": "3iD686jhuOdAyIMzRqMIEV",
  "scopes": null,
  "consumerId": "d91d4bfa-2cf8-4bda-9ad9-cd02fde78edf"
}
```

If required, you can also supply `keyId` and `keySecret` directly. This could be useful when seeding the data for
testing purposes.

```shell
$ eg credentials create -t key-auth -c vncz -p "keyId=tina" -p "keySecret=pacchetella"
✔ Created tina
{
  "isActive": true,
  "createdAt": "Wed Nov 15 2017 21:50:09 GMT+0100 (CET)",
  "updatedAt": "Wed Nov 15 2017 21:50:09 GMT+0100 (CET)",
  "keyId": "tina",
  "keySecret": "pacchetella",
  "scopes": null,
  "consumerId": "d91d4bfa-2cf8-4bda-9ad9-cd02fde78edf"
}
```
