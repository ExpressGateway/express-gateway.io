---
layout: doc-section
title:  "serviceEndpoints"
doc-order: 3.1
list-order: .5
---

### Description

Express Gateway receive API requests on apiEndpoints, process them and then proxy them to downstream microservices. The serviceEndpoints section specifies the URLs of these proxied microservices.

### Usage

```yaml

serviceEndpoints:             # urls to downstream microservices
  cats_service:               # name, used as a reference in pipeline
    url: "http://localhost"
    port: 3000
    paths: /                  # optional, defaults to /
  dogs_service:               # name, used as a reference in pipeline
    url: http://localhost
    port: 4000

```

### Options

| Name    | Description                                    |
|---      |---                                             |
| `url`   | the protocol and hostname to proxy requests to |
| `port`  | the port to send proxied requests to           |
| `paths` | the paths to send proxied requests to          |