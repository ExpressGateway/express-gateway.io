---
layout: doc-section
title: db
doc-order: 3.2
list-order: 0.1
---

This section defines how Express Gateway stores it data.

Two ways possible for now: In Memory and Redis.

### In Memory database:

- Data is reset on each process restart
- Data is intact during Hot Reload operation
- No need for Redis instance
- Ideal for development
- Should not be used in production

```yml
db:
  redis:
    emulate: true
```

### Redis database:

- Persistant way of storing data
- Requires Redis running
- It should be used in production scenarios

```yml
db:
  redis:
    host: localhost
    port: 6379
    namespace: EG

```

All options available are listed here:
[Redis Connection Options](https://www.npmjs.com/package/redis#options-object-properties)
