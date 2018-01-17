---
title: db
layout: doc-section
doc-order: 3.2
list-order: 0.1
---

This section defines how Express Gateway stores it data.

Two ways possible for now: In Memory and Redis.

## Choosing the connection type

### In Memory database:

- Data is reset on each process restart
- Data is intact during Hot Reload operation
- No need for Redis instance
- Ideal for development and demos
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
[Redis Connection Options](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options)

## Sentinel and Clusters

We're using [ioredis](https://github.com/luin/ioredis/) to connect to your Redis instance, which supports connecting
to a [Cluster](https://github.com/luin/ioredis#cluster) and [Sentinel](https://github.com/luin/ioredis#sentinel).

We don't support connecting to a Cluster yet; on the other hand, you can easily connect to a Sentinel instance just
modifying the configuration file a bit:

```yml
db:
  redis:
    sentinels:
      - host: 'localhost'
        port: 26379

      - host: 'localhost'
        port: 26380

    name: mymaster
    namespace: EG
```
