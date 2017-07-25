---
layout: doc-section
title:  "Load Balancing"
doc-order: 8.0
---

#### Getting started with load balancing

Here are a few steps to enable load balancing in Express Gateway:

##### Set multiple URLs on a single [serviceEndpoint][service-endpoint]

```yaml
serviceEndpoints:
  dogs:
    urls:
      - "http://dogs1.example.com"
      - "http://dogs2.example.com"
```

##### Set a load balancing strategy in the [proxy policy][proxy-policy]

```yaml
pipelines:
  example-pipeline:
    apiEndpoints:
      - api
    policies:
      proxy:
        - action:
            name: proxy
            serviceEndpoint: dogs
            strategy: "round-robin"
```

#### Load balancing strategies

* `round-robin`: This strategy routes each client request to a URL assigned in the `urls` array for a `serviceEndpoint`, starting at the first URL, moving through the last URL, and finally looping back to the start.

*NOTE: More strategies may be implemented in the future.*

[service-endpoint]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/serviceEndpoints.md %}
[proxy-policy]: {{ site.baseurl }}{% link docs/policies/proxy.md %}
