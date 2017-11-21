---
layout: doc-section
title: eg apps create
---

### Description

Create one or more apps.

### Usage

```shell
eg apps create [options]
```

### Options

| Name, longform   | Type      | Default | Description                                      |
| ---              | ---       | ---     | ---                                              |
| `-u, --user`     | `string`  |         | User ID or username associated with the app      |
| `-p, --property` | `string`  |         | App property in the form [-p 'foo=bar']          |
| `--stdin`        | `boolean` | `false` | Import newline-delimited JSON via standard input |
| `-q, --quiet`    | `boolean` | `false` | Only show app ID                                 |
| `--no-color`     | `boolean` | `false` | Disable color in prompts                         |

### Extended description

Either the `-u, --user` option or the `--stdin` option is required to run this command.

Multiple applications with the same name can exist — as long these are all bound to different users.

The properties associated with an app are specified in the model config.
See detailed description here:
[Consumer Management](../../consumer-management)

### Examples

#### Create an app with prompts

```shell
$ eg apps create -u ksmith
? Enter name [required]: appy
? Enter redirectUri: https://appy.example.com/cb
✔ Created ca2ff018-65c1-4555-b6a8-f8e16638b27f
```

#### Create an app with properties

```shell
$ eg apps create -u ksmith -p 'name=appy' -p 'redirectUri=https://appy.example.com/cb'
✔ Created e1107337-8a09-447d-8a44-020846bb4353
```

#### Import users with newline-delimited JSON

```shell
$ cat /tmp/apps.jsonl
{ "user": "ksmith", "name": "appy", "redirectUri": "https://appy.example.com/cb" }
{ "user": "ksmith", "name": "rad-app", "redirectUri": "https://rad-app.example.com/cb" }
$ cat /tmp/apps.jsonl | eg apps create --stdin
✔ Created 85759944-9c65-4609-93d0-b84e4946888e
✔ Created 8b298010-f1fa-45eb-9b18-548965886048
```

#### Create an app with quiet mode

```shell
$ eg apps create -u ksmith -p 'name=appy' -p 'redirectUri=https://appy.example.com/cb'  -q
e1107337-8a09-447d-8a44-020846bb4353
```
