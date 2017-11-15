---
layout: doc-section
title: eg apps update
---

### Description

Update a single app.

### Usage

```shell
eg apps update <app_id|app_name> [options]
```

### Options

| Name, longform   | Type      | Default | Description                             |
| ---              | ---       | ---     | ---                                     |
| `-p, --property` | `string`  |         | App property in the form [-p 'foo=bar'] |
| `-q, --quiet`    | `boolean` | `false` | Only show app ID                        |

### Extended description

The properties associated with an app are specified in the model config.
See detailed description here:
[Consumer Management](../../consumer-management)

### Examples

#### Update an app with prompts

```shell
$ eg apps update cb6864b8-66e1-4bab-a8ea-c8e6ca606c08
? Enter name [required]: appy2
? Enter redirectUri: https://appy2.example.com/cb
✔ Updated cb6864b8-66e1-4bab-a8ea-c8e6ca606c08
```

#### Create an app with properties

```shell
$ eg apps update cb6864b8-66e1-4bab-a8ea-c8e6ca606c08 -p 'name=appy2'
✔ Updated cb6864b8-66e1-4bab-a8ea-c8e6ca606c08
```

#### Update an app with quiet mode

```shell
$ eg apps update cb6864b8-66e1-4bab-a8ea-c8e6ca606c08 -p 'name=appy2' -q
cb6864b8-66e1-4bab-a8ea-c8e6ca606c08
```
