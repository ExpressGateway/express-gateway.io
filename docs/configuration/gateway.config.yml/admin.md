---
layout: doc-section
title:  "admin"
doc-order: 3.1
list-order: .3
---

### Description

The admin section is a internal endpoint for the Admin REST API. Express Gateway will listen on the specified host and port for internal API requests.

### Usage:

```yaml

admin:
    host: 
    port: 9080            # EG will listen for http requests on port 9080

```

### Options:

| Name   | Description                        |
|---     |---                                 |
| `host` | the hostname to accept requests on |
| `port` | the port to listen on              |