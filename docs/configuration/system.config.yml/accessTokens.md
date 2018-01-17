---
title: accessTokens
layout: doc-section
doc-order: 3.2
list-order: 0.4
---

OAuth 2.0 related config.

This section controls Lifetime of Access Tokens issued by built in OAuth 2.0 server at during one of authorization
flows as well as the type of token to be issued.

``` yml
accessTokens:
  timeToExpiry: 7200000
  tokenType: 'jwt'
  issuer: 'express-gateway'
  audience: 'something'
  subject: 'somebody'
  secretOrPrivateKey: 'ssssst'
```

## Parameters

* `timeToExpiry`: Expiration time for the token
* `tokenType`: Token type to be issued. It can be `opaque` or `jwt`
* `issuer`: Ignored when tokenType is `jwt`. Defines the issuer to be sent in the token
* `audience`: Ignored when tokenType is `jwt`. Defines the audience to be sent in the token
* `secretOrPrivateKey`: Ignored when tokenType is `jwt`. Defines the secret or private key used to sign the token
* `secretOrPrivateKeyFile`: Ignored when tokenType is `jwt`. Defines the file where the secret or private key used to
sign the token is stored