---
title: egContext
layout: doc-section
doc-order: 5.5
list-order: 0.1
---

### Description

The JavaScript sandbox Object that will be used to execute JavaScript code in Conditions, Actions, and the Expression Policy. It can be used to implement non-standard scenarios.

All Node.JS global variables like `process`, `require` etc. will not be available for security reasons.

The egContext contains the following properties that can be used:

* `req`: [ExpressJS Request Object](https://expressjs.com/en/4x/api.html#req)
* `res`: [ExpressJS Response Object](https://expressjs.com/en/4x/api.html#res)
* `apiEndpoint`: Configuration or API Endpoint that is executing.
For example, `apiEndpoint.scopes` will provide all configured scopes for endpoint
* `consumer`: Information about about the current consumer (can be an `app` or an `user`)
* `requestID`: uuid v4 (base62 encoded) identifier of the current request, useful for tracking purposes. If needed, you
can propagate this value down as an header using the [headers][headers] policy.

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
[headers]: {{ site.baseurl }}{% link docs/policies/headers.md %}
