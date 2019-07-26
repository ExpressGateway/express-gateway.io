---
title: http
layout: doc-section
doc-order: 3.1
list-order: 0.1
---

### Description

The http section is used to configure HTTP. Express Gateway will listen on  the specified port for HTTP requests.

### Usage:

```yaml

http:
    port: 9080            # EG will listen for http requests on port 9080
    hostname: localhost
```

### Options:

| Name   | Description           |
|---     |---                    |
| `port` | the port to listen on |
| `hostname` | the hostname to listen on |
