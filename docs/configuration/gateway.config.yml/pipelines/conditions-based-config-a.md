---
layout: doc-section
title:  "Conditions Based Config A"
---
```yaml
serviceEndpoints:
  admin: # will be referenced in proxy policy
    url: 'http://admin.com'
  staff: # will be referenced in proxy policy
    url: 'http://staff.com'

apiEndpoints:
  api:
    paths: \*

pipelines:
  api:
    apiEndpoints:
      - api
    policies:
      -
        proxy:
          -
            condition:
              name: pathExact
              paths: /admin
            action:
              name: proxy
              serviceEndpoint: admin # see declaration above
          -
            condition:
              name: pathExact
              paths: /staff
            action:
              name: proxy
              serviceEndpoint: staff # see declaration above
```
