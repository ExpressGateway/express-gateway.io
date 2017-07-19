---
layout: doc-section
title:  "Proxy"
doc-order: 4.8
---
Forwards the request to a service endpoint.
Accepts serviceEndpoint parameter that can be one of the names of serviceEndpoints section

This type of policy should generally be placed last in the policies list within a pipeline.

Example:
```yaml
http:
  port: 9091

apiEndpoints:
  api:
    path: '*'

serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

pipelines:
  example-pipeline:
    apiEndpoints:   # process all request matching "api" apiEndpoint
      - api
    policies:
      proxy: # name of the policy
        -   # list of actions
          condition:
            name: pathExact
            path: /admin
          action:
            name: proxy # proxy policy has one action - "proxy"
            serviceEndpoint: example # reference to serviceEndpoints Section
```

##### Options Reference
- `serviceEndpoint`: the name of the service endpoint to forward to.
