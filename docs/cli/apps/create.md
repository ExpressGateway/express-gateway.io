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
