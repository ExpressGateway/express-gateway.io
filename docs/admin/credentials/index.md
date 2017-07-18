---
layout: doc-section
title: Credentials API Reference
doc-order: 4.3
---

### Overview Credentials API
Credential is a container for authentican\authorization secrets of API Consumer (User\App)
At this point Credential can store:
- basic-auth (password)
- oauth2 (client secret or user password) [TBD: REF to Oauth2]
- key-auth (key pair id:secret )

Any API Consumer (User\App) can have one credential of `basic-auth` and `oauth2` types and multiple `key-auth`

