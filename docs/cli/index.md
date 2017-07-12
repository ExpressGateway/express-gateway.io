---
layout: doc-section
title: CLI Reference
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
