---
layout: doc-section
title:  "http"
---
The https section is used to configure HTTPS. Express Gateway will listen on the specified port for HTTPS requests.

Options:
- `port:` the port to listen on
- `tls:` a list of certificates

Express Gateway supports TLS, including SNI (domain specific TLS certificates). Each `tls` key can have a host domain specified.  Wildcards are supported for host domain matching. Paths to the TLS keys and certificates are specified in the `key` and `cert` keys as pairs.

The `default` key will be used if none of the other `tls` domain entries are matched or if SNI is not being used by the client.

Usage:
```yaml

https:
  port: 9443                        # EG will listen for https requests on port 9443
  tls:
    - "*.demo.io":                  # will match any subdomain for demo.io
        key: keys/demo.io.key.pem
        cert: keys/demo.io.cert.pem
    - "api.acme.com":               # will only match api.acme.com
        key: keys/acme.com.key.pem
        cert: keys/acme.com.cert.pem
    - "default":                    # will be used if no match above or if SNI is not used
        key: keys/eg.io.key.pem
        cert: keys/eg.io.cert.pem

```
