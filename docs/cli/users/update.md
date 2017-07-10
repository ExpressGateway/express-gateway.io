---
layout: doc-section
title: eg users update
---

### Description

Update a single user.

### Usage

```shell
eg users update <user_id|user_name> [options]
```

### Options

| Name, longform   | Type      | Default | Description                              |
| ---              | ---       | ---     | ---                                      |
| `-p, --property` | `string`  |         | User property in the form [-p 'foo=bar'] |
| `-q, --quiet`    | `boolean` | `false` | Only show user ID                        |

### Examples

#### Update a user with prompts

```shell
$ eg users update ksmith
? Enter a value for firstname: Karen
? Enter a value for lastname: Smith
? Enter a value for email: ksmith1@example.com
? Enter a value for redirectUri: https://ksmith.example.com/cb
✔ Updated ksmith
```

#### Update a user with properties

```shell
$ eg users update ksmith -p 'firstname=Karen' -p 'email=ksmith1@example.com'
✔ Updated ksmith
```

#### Update a user with quiet mode

```shell
$ eg users update ksmith -p 'firstname=Karen' -p 'email=ksmith1@example.com' -q
010566fb-6cf5-4bce-a7b1-1be85fb0969a
```
