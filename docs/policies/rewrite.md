---
layout: doc-section
title:  "Rewrite"
doc-order: 5.80
---

### Description

The Rewrite policy can rewrite the requested url or eventually redirect the current request with a specified
status code.

This type of policy should generally be placed first in the policies list within a pipeline.

### Usage

To enable the Rewrite policy, add `rewrite` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  - rewrite

```

### Example

```yaml

policies:
  -
    rewrite:
      -
        condition:
          name: pathmatch
          match: /tina/:code # Express Path
        action:
          rewrite: /status/:code
          redirect: 302
      -
        condition:
          name: regexpmatch
          match: ^/js/(.*)$
        action:
          rewrite: /src/js/$1
```

### Reference

#### Condition

* `pathmatch`: [Express Path](https://expressjs.com/en/guide/routing.html#route-paths) corresponding to the url pattern to look for
* `regexpmatch`: RegExp corresponding to the url pattern to look for

#### Policy

* `rewrite`:
  - [Express Path](https://expressjs.com/en/guide/routing.html#route-paths) or RegExp corresponding to the url pattern to rewrite.
    The format should match the one used in the condition.
* `redirect`:
   - When set to a number, it'll redirect the request with the provided status code. If omitted, a rewrite action will
   be performed. You're responsibile for the returned status code - there's no validation.

### Notes

In case you're using Express Path as expression, you can use
[route parameters](http://expressjs.com/en/guide/routing.html#route-parameters) as well as multi segment matches: they
will be forwarded correctly.

```yaml
policies:
  -
    rewrite:
      -
        condition:
          name: pathmatch
          match: /api/:route*
        action:
          rewrite: /api/v1/:route
          redirect: 302
```

In this example, if the gateway is hit with an url such as `/api/users/nick`, the user will be redirected to
`/api/v1/users/nick`

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
