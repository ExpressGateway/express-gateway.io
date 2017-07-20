---
layout: doc-section
title:  "Expression"
doc-order: 4.80
---

### Description

The Expression policy allows you to execute JavaScript code.

### Usage

To enable the Expression policy, add `expression` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  - name: expression

```

#### egContext Object
egContext is a special sandbox that can be used to implement non-standard scenarios.
It contains the following properties that can be used:

* `req`:  
  -  &nbsp; [ExpressJS Request Object](https://expressjs.com/en/4x/api.html#req)
* `res`:  
  -  &nbsp; [ExpressJS Response Object](https://expressjs.com/en/4x/api.html#res)
* `apiEndpoint`
  - Configuration or API Endpoint that is executing 
  - For example, `apiEndpoint.scopes` will provide all configured scopes for endpoint 
* `user`
  - Information about authenticated and authorized user

### Example

```yml
pipelines:
  api:
    policies:
      -
        expression: # policy name
          - action:    # array of condition/actions objects
              jscode: 'req.url = "/new/url"; ' #  code to execute against EG Context
```

### Options Reference
* `jscode`:
  - Valid JS code to execute. Note that EgContext will be used as global object for code. All Node.JS global variables like `process`, `require` etc. will not be available for security reasons

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
