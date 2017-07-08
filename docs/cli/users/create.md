---
layout: doc-section
title: eg users create
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
