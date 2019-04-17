---
title: CLI Reference
description: Command line interface reference for Express Gateway.
layout: doc-section
doc-order: 4.0
---

### Overview of eg

`eg` is a command-line interface (CLI) for executing commands against an Express Gateway instance.

### Syntax

The `eg` CLI uses the following syntax to run commands:

```shell
eg [TYPE] [command] [flags]
```

* `TYPE`: An entity type, such as `users`, `apps`, or `scopes`.
* `command`: A command to execute against the entity type, such as `create`, `info`, or `remove`.
* `flags`: Flags can be optional or required depending on the command.  See the individual command's help text or documentation.

If help is needed, just run `eg -h` from your terminal.

### Admin API Connection
CLI uses Admin API to execute commands. 

`system.config.yml` contains url that points to Admin API

##### Default CLI config:
```yml
cli:   
  url: http://localhost:9876
```
##### Environment variable 
Alternative is to set `EG_ADMIN_URL` env variable to Admin API URL

#### Troubleshooting
Use `-v` flag for verbose output. It will show Method, URL, HTTP headers, body that is sent to Admin API 

