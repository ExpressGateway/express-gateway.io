---
layout: doc-section
title:  "Basic Authorization"
doc-order: 4.1
---

### Description

The Basic Authorization policy follows the [RFC-7617 standard][rfc-7617-standard].
From the standard, if a user agent wanted to send the user-id "Aladdin" and password "open sesame", it would use the following HTTP header.

Example: `Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`

### Usage

In order to use the Basic Authorization policy, consumers must be created and `basic-auth` credentials created for them.

To create consumers (users and apps): use the [CLI][cli] and [create user][users-create] or [create app][apps-create] command.
To create a `basic-auth` credential for an app or user: use the [CLI][cli] and [create credential][credentials-create] command with type `basic-auth`.

To enable the Basic Authorization policy, add `basic-auth` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  -name: basic-auth

```

### Example

```yaml

pipelines:
 pipeline1:
  apiEndpoints:
    - authorizedEndpoint
  policies:
    -
      basic-auth:
    -
      proxy:
        action:
          serviceEndpoint: backend

```

[rfc-7617-standard]: https://tools.ietf.org/html/rfc7617
[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[cli]: {{ site.baseurl }}{% link docs/cli/index.md %}
[user-create]: {{ site.baseurl }}{% link docs/cli/users/create.md %}
[app-create]: {{ site.baseurl }}{% link docs/cli/apps/create.md %}
[credentials-create]: {{ site.baseurl }}{% link docs/cli/credentials/create.md %}
