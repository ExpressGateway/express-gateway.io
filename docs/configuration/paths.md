---
layout: doc-section
title:  "Paths"
---
#### Paths
Paths can be either a string or array of strings.  Wildcard patterns are supported.  Paths follow the ExpressJS routes conventions - [https://expressjs.com/en/4x/api.html#router](https://expressjs.com/en/4x/api.html#router)

Examples:

Exact String Match
```yaml
paths: /admin           
```

- match: /admin only
- 404:
- /admin/bob; /admin/charlie/1; /staff

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
