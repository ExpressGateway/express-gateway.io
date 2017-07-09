---
layout: doc-section
title:  "apiEndpoints"
---
Express Gateway exposes microservices as APIs through URLs known as apiEndpoints. API consumers may API requests through the API endpoints.

```yaml

apiEndpoints:
  help:                 # name, used as reference in pipeline
    host: '*'           # optional, by default accepts all hosts, same as '*'
    paths: /help        # optional, by default will serve all requests - same as *

  api:                  # name, used as reference in pipeline
    host: '*.com'       # wildcard pattern support
    paths:
      - '/v1/*'         # string or array of strings
      - '/v2/*'

  example:              # name, used as reference in pipeline
    host: 'example.com'
    paths: /v2/*        # string or array of strings

```
