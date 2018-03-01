---
title: eg users create
layout: doc-section
---

### Description

Create one or more users.

### Usage

```shell
eg users create [options]
```

### Options

| Name, longform   | Type      | Default | Description                                      |
| ---              | ---       | ---     | ---                                              |
| `-p, --property` | `string`  |         | User property in the form [-p 'foo=bar']         |
| `--stdin`        | `boolean` | `false` | Import newline-delimited JSON via standard input |
| `-q, --quiet`    | `boolean` | `false` | Only show user ID                                |

### Extended description

The properties associated with a user are specified in the model config.
See detailed description here:
[Consumer Management][consumer-management]

### Examples

#### Create a user with prompts

```shell
$ eg users create
? Enter username [required]: ksmith
? Enter firstname [required]: Kate
? Enter lastname [required]: Smith
? Enter email: ksmith@example.com
? Enter redirectUri: https://ksmith.example.com/cb
✔ Created ksmith
```

#### Create a user with properties

```shell
$ eg users create -p 'username=ksmith' -p 'firstname=Kate' -p 'lastname=Smith'
✔ Created ksmithshell
```

#### Import users with newline-delimited JSON

```shell
$ cat ./users.jsonl
{ "username": "ksmith", "firstname": "Kate", "lastname": "Smith" }
{ "username": "jdoe", "firstname": "Jane", "lastname": "Doe" }
$ cat ./users.jsonl | eg users create --stdin
✔ Created ksmith
✔ Created jdoe
```

#### Create a user with quiet mode

```shell
$ eg users create -p 'username=ksmith' -p 'firstname=Kate' -p 'lastname=Smith' -q
fa56250a-ede5-4002-9889-57df92b1e407
```

[consumer-management]: {{ site.baseurl }}{% link docs/consumer-management.md %}
