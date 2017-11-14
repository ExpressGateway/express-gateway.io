---
layout: doc-section
title: apiEndpoints
doc-order: 3.1
list-order: 0.4
---

### Description

Express Gateway exposes microservices as APIs through URLs known as apiEndpoints. API consumers may make API requests
through the API endpoints.

### Usage

```yaml

apiEndpoints:
  help:                 # name, used as reference in pipeline
    host: '*'           # required, '*' will not check for host name
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

### Options

| Name    | Description                        |
|---      |---                                 |
| `host`  | the hostname to accept requests on |
| `paths` | an array of paths                  |

#### Host
The `host` value is a string that will be matched against the 'HOST' header of the request.

##### Examples:

Any Domain and Path
```yaml
apiEndpoints:
  help:
    host: '*'
    paths: /help
```

Match: cdn.test.example.com/help, example.com/help, no HOST header
404: cdn.test.example.com, example.com/admin

One Domain with No Subdomains and Path
```yaml
apiEndpoints:
  help:
    host: 'example.com'
    paths: /help
```

Match: example.com/help
404: test.example.com/help, example.com

Any 1st Level Subdomain of One Domain and Path
```yaml
apiEndpoints:
  help:
    host: '*.example.com'
    paths: /help
```

#### Paths
Paths can be either a string or array of strings.  Wildcard patterns are supported.  Paths follow the ExpressJS routes conventions - [https://expressjs.com/en/4x/api.html#router](https://expressjs.com/en/4x/api.html#router)

##### Examples:

Exact String Match
```yaml
paths: /admin
```

- match: /admin only
- 404: /admin/bob; /admin/charlie/1; /staff

---

Deep Level Match without Parent
```yaml
paths: /admin/*
```

- match: /admin/bob; /admin/charlie/1
- 404: /admin

---

Deep Level Match with Parent
```yaml
paths: ['/admin','/admin/*']
```

- match: /admin; /admin/bob; /admin/charlie/1
- 404: /staff

---

One Level Match without Parent with Variable Assignment
```yaml
paths: '/admin/:id'
```

- match: /admin/bob; /admin/charlie
- id: bob; charlie
- 404: /admin; /staff

---

Multi level Sub Dir Match without Parent with Variable Assignments
```yaml
paths: '/admin/:group/:id'
```
- match: /admin/ops/bob
- group: ops
- id: bob
- 404: /admin; /admin/bob; /admin/alex/bob/charlie

---

Multi Multiple Level Sub Dir Match without Parent
```yaml
paths: ['/student/*', '/teacher/*','/admin/*']
```
- match:
      - /admin/... multi-level
      - /student/... multi-level
      - /teacher/... multi-level
- 404:
      - /
      - /admin; /teacher; /student
      - /staff

---

#### Overlapping
The order of the API endpoints specified matters. It is possible to specifiy overlapping patterns through wildcards. More specific patterns should be specified first for prioritized evaluation before more general matching.

Example:
```yaml

apiEndpoints:
  tabby:
    host: '*.tabby.cat.com'
    paths: '*'                # optional, if not specified will default to *
  cat:
    host: '*.cat.com'
  com:
    host: '*.com'

```
