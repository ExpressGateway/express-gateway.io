---
layout: doc-section
title:  "Credential Management"
doc-order: 6.0
---
Express Gateway comes with a rich Credential Management module that provides a complete authentication and authorization system. The Credential Management module can also work alongside existign Authorization systems and providers. The system associates consumers (apps and user) with their set of credentials.

A credential is created for a consumer and its authentication and authorization type is set by one of the supported policies within Express Gateway (e.g. OAuth2, Key Auth, etc...)

Credentials may include username/password, id/secret and/or API-Key.

Credentials are used by authentication and authorization policies within Express Gateway.

Bob is a user in Express Gateway.  Bob is associated with an app that he has created called "Dumb Ways to Code".

Example:
Bob as a Express Gateway `user` can have...
- a basic challenge credential
- an OAuth 2 credential
associated with his userid.

"Dumb Ways to Code", an Expresss Gateway application, may also have its own set of credentials...
- a Key Auth credential
- an OAuth2 credential

All credential types are capable of specifiying authorization by using scopes.

#### Scopes
Scopes are the main entities for specifing authorizations within Express Gateway. A scope is a pre-defined string. API endpoints are secured by specifying scopes. To be authorized for an API endpoint that is secured by a scope, a consumer must have a credential containing the scope listed on the API endpoint.

Example:
1. Express Gateway exposes an "admin" API endpoint. The "admin" API endpoint has a scope "superuser" associated to it.
2. The "admin" endpoint is linked and processed by the "default" pipeline that has a Key auth policy enabled.
3. Bob, an Express Gateway user attempts to access the "admin" API endpoint passing an API key.
4. The Consumer Management module identifies Bob.  Bob's credentials are searched for a Key auth credential matching the key passed by Bob.
5. Bob's key auth credential contains a list of scopes and "superuser" is one of them.
6. Bob is granted access to the "admin" API endpoint and further processing of his request continues.
