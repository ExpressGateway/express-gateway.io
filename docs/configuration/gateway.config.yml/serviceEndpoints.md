---
title: serviceEndpoints
layout: doc-section
doc-order: 3.1
list-order: 0.5
---

### Description

Express Gateway receive API requests on apiEndpoints, process them and then proxy them to downstream microservices. The serviceEndpoints section specifies the URLs of these proxied microservices.

### Usage

```yaml

serviceEndpoints:             # downstream microservices
  cats:                       # name, used as a reference in pipeline
    url: "http://cats1.example.com"
  dogs:                       # name, used as a reference in pipeline
    urls:                     # multiple urls can be used with load balancing
      - "http://dogs1.example.com"
      - "http://dogs2.example.com"
```

### Options

| Name           | Description                                                                                 |
|----------------|---------------------------------------------------------------------------------------------|
| `url`          | the protocol and hostname to proxy requests to                                              |
| `urls`         | an array of URLs, used with load balancing                                                  |
| `proxyOptions` | options to be used when calling the [proxy policy](proxy_policy) with this service endpoint |

### Description

A `serviceEndpoint` must have either a `url` property with a single string or a `urls` property with an array of strings.

[proxy_policy]: {{ site.baseurl }}{% link docs/policies/proxy.md %}
