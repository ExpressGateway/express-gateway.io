---
layout: doc-section
title:  "egContext"
doc-order: 4.80
---

### Description

The JavaScript sandbox Object that will be used to execute JavaScript code in Expression Policy and Condition. It can be used to implement non-standard scenarios.

All Node.JS global variables like `process`, `require` etc. will not be available for security reasons

It contains the following properties that can be used:

* `req`: [ExpressJS Request Object](https://expressjs.com/en/4x/api.html#req)
* `res`: [ExpressJS Response Object](https://expressjs.com/en/4x/api.html#res)
* `apiEndpoint`: Configuration or API Endpoint that is executing.  
For example, `apiEndpoint.scopes` will provide all configured scopes for endpoint 
* `user`: Information about authenticated and authorized user 

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

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
