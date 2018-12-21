---
title: https
layout: doc-section
doc-order: 3.1
list-order: 0.2
---

### Description

The https section is used to configure HTTPS. Express Gateway will listen on the specified port for HTTPS requests.

### Usage:

```yaml

https:
  port: 9443
  hostname: localhost
  tls:
    "*.demo.io":
        key: example/keys/demo.io.key.pem
        cert: example/keys/demo.io.cert.pem
    "api.acme.com":
        key: example/keys/acme.com.key.pem
        cert: example/keys/acme.com.cert.pem
    "default":
        key: example/keys/eg.io.key.pem
        cert: example/keys/eg.io.cert.pem

```

### Options:

| Name   | Description                |
|---     |---                         |
| `port` | the port to listen on      |
| `hostname` | the hostname to listen on |
| `tls`  | keys and certificate pairs |

Express Gateway supports TLS, including SNI (domain specific TLS certificates). Each `tls` key can have a host domain specified.  Wildcards are supported for host domain matching. Paths to the TLS keys and certificates are specified in the `key` and `cert` keys as pairs.

The `default` key will be used if none of the other `tls` domain entries are matched or if SNI is not being used by the client.


