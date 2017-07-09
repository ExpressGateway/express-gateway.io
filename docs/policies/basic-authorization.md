---
layout: doc-section
title:  "Basic Authorization"
---
The EG Basic Authentication policy follows the RFC 7617 standard: https://tools.ietf.org/html/rfc7617

In order to use the basic authentication policy, there must be consumers registered and a basic-auth credential created for them.

From the RFC standard, if a user agent wishes to send the user-id "Aladdin" and password "open sesame", it would use the following header field:
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

#### Basic Auth Policy configuration example
```
…
pipelines: {
        pipeline1: {
          apiEndpoints: ['authorizedEndpoint'],
          policies: [
            { basic-auth: {} },
            { proxy: { action: { serviceEndpoint: 'backend' } } }
          ]
        }
…
```