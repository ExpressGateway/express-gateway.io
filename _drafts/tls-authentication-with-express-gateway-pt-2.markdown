---
title: TLS Authentication with Express Gateway Pt. 2
date: 2018-04-03 13:16:00 Z
---

## Revoke a client certificate

In case the client certification is tampered with or you just do not trust the owner anymore, it is possible to revoke a client certificate. Just like with other policies like  `JWT`, `key-auth`, it is possible to revoke a credential.

There are multiple ways to revoke a client certificate depending on the configuration of your CA. When choosing your client certificate revocation strategy, you should also think about is whether or not you have [transitioned from CRL to OCSP.](https://www.maikel.pro/blog/current-state-certificate-revocation-crls-ocsp/)

## Require a client certificate just for a specific path?

No problem! Let’s look into how you can require a client certificate only for a particular path, rather than for the entire API.

Normally, TLS authentication must happen at the edge of your server and — it's something that happens at TCP level rather than at HTTP level. Therefore, you might want to use two separate domains to handle where you need the TLS Authentication and where not. Something such as `https://api.domain.com` and `https://api.client.domain.com` might do the job.

However, if this is only a single case scenario, then you can move the TLS check on the HTTP level by making few modifications to your Express Gateway configuration:

```
"https": {
    "port": 4444,
    "tls": {
      "default": {
        "key": "/var/lib/certs/tls.key",
        "cert": "/var/lib/certs/tls.crt",
        "ca": ["/var/lib/chain/chain.pem"]
      }
    },
    "options": {
      "requestCert": true,
-      "rejectUnauthorized": true
+      "rejectUnauthorized": false
    }
  },
```

We have modified our HTTPS server configuration so that the server will ask for a client certificate, but it will let the connection happen even if no certificate has been provided. Let’s move the client certificate. 

Check on the pipeline level using an [adhoc condition](https://www.express-gateway.io/docs/policies/customization/conditions/#tlsclientauthenticated)
`
pipelines:
  default:
    apiEndpoints:
      - clientAuthEndpoint
    policies:
      - terminate:
        - condition:
            name: not
            condition:
              name: tlsClientAuthenticated
          action:
            statusCode: 403
      - proxy:
        - action:
            serviceEndpoint: backend`

In the case when `tlsClientAuthenticated` is not true—that is, the client didn't provide a certificate or the provided one is invalid—the request will be terminated with `403`. 

If it passes, the pipeline continues and the proxy action will be performed.
