---
layout: documentation
title: Guide
permalink: /guide/
links:
  - display: Installing
    link: installing
  - display: Getting Started
    link: getting-started
  - display: Core Concepts Explained
    link: core-concepts-explained
  - display: Configuring
    link: configuring
---

# Guide

Welcome to Express Gateway! The documentation for Express Gateway is written using Jekyll and Markdown. If you'd like to contribute, please see our [Github website repo](https://github.com/expressgateway/express-gateway.io)

### Installing

Express Gateway runs on Node.js. To get Node.js please visit the [Node.js Downloads Page](https://nodejs.org/en/download/).

Once you have Node.js, check out the [Getting Started](/getting-started) page on how to install Express Gateway and the 5-Minute Quick Start for a brief introduction on using it.

---

### Core Concepts

For an overview of Express Gateway and how it works, check out the [About](/about) page for a brief introduction.

Express Gateway comes with the following core entities:

- endpoints (API and service)
- policies
- pipelines
- consumers (users and apps)
- credentials

#### endpoints
Endpoints are URLs. Express Gateway exposes APIs through API endpoints. As a gateway, it proxies to microservices referenced in service endpoints.

#### policies
A policy is a set of conditions, action and parameters that are evaluated and act upon the API request and response flow within Express Gateway. Policies within Express Gateway utilize [Express middleware](http://expressjs.com/en/guide/using-middleware.html) at their core.

#### pipelines
A pipeline is a set of policies. Policies within a pipeline are evaluated and executed sequentially. API endpoints are linked to pipelines. An API request is received by the API endpoint and routed through the pipeline for policy execution. The last policy within a pipeline is often a proxy policy that will then ultimately route the request to a service endpoint.

#### consumers
A consumer makes API requests and consumes API responses. In Express Gateway, consumers are users and their apps.

#### credentials
Credentials are types of authentication and authorizations. In Express Gateway, a consumer may be assigned one or more credentials. Each credential specifies a set of scopes that are used for authorizations.

---

### Configuration

One of the key features of Express Gateway is that configuration is completely separate from static code used to run the gateway.  

All configuration is centralized and can be found in the `/config` directory of the main Express Gateway folder.

Configuration is divided into different levels:

Level          | Name           | File/Directory
-------------- | -------------- | --------------
1 (top)        | gateway        | /config/gateway.config.yml
2              | system         | /config/system.config.yml
3              | data           | /config/model-configs

The levels allow you to configure and manage Express Gateway without having to concern yourself with details that may not be relevant to you as a user, operator, administrator or developer. The lower the level, the higher the complexity.

#### gateway.config.yml
All of the application functionality is embodied in gateway.config.yml.  This config file describes the entire gateway's microservices and API operations at a glance.

gateway.config.yml is made up of the following sections:

- http
- https
- apiEndpoints
- serviceEndpoints
- policies 
- pipelines

Each section declares global named entities. These entities are then referenced within the pipeline section.

#### http
The http section is used to configure HTTP. Express Gateway will listen on  the specified port for HTTP requests.

Options:
- `port:` the port to listen on

Usage:
```yaml

http:
    port: 9080            # EG will listen for http requests on port 9080

```

#### https
The https section is used to configure HTTPS. Express Gateway will listen on the specififed port for HTTPS requests.

Options:
- `port:` the port to listen on
- `tls:` a list of certificates

Express Gateway supports TLS, including SNI (domain specific TLS certificates). Each `tls` key can have a host domain specified.  Wildcards are supported for host domain matching. Paths to the TLS keys and certificates are specified in the `key` and `cert` keys as pairs.

The `default` key will be used if none of the other `tls` domain entries are matched or if SNI is not being used by the client.

Usage:
```yaml

https:
  port: 9443                        # EG will listen for https requests on port 9443
  tls:
    - "*.demo.io":                  # will match any subdomain for demo.io
        key: keys/demo.io.key.pem
        cert: keys/demo.io.cert.pem
    - "api.acme.com":               # will only match api.acme.com
        key: keys/acme.com.key.pem
        cert: keys/acme.com.cert.pem
    - "default":                    # will be used if no match above or if SNI is not used
        key: keys/eg.io.key.pem
        cert: keys/eg.io.cert.pem

```

#### apiEndpoints
API Endpoints are URLs that are exposed by the Express Gateway to listen to API requests.  They are specified in conjunction with the [http](#http) and [https](#https) sections.

Usage: minimum
```yaml

apiEndpoints:
  api:                  # the name of the API endpoint

```

Usage:
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

#### Host

The `host` value is a string that will be matched against the 'HOST' header of the request.

Host examples: <TODO make this collapsible>
```yaml
apiEndpoints:
  help:
    host: '*'            # will match any domain or if not HOST is provided
                        # match: cdn.test.example.com test.example.com, example.com. 
    paths: /help
```

- \* - any domain will match cdn.test.example.com, test.example.com, example.com, etc. Will also work if no HOST header is provided
- example.com - one domain match, will not match subdomains
- \*.example.com -
    - any subdomain will match. test.example.com
    - example.com will not match
    - deeper levels will not match cdn.test.example.com
- \*.*.example.com
    - will match 2nd level subdomains like cdn.test.example.com
    - will not match example.com host
    - will not match test.example.com host

For host resolution Express Gateway relies on the "vhost" npm module. For more examples please see please refer to [https://www.npmjs.com/package/vhost](https://www.npmjs.com/package/vhost)

#### Paths
Paths can be either a string or array of strings.  Wildcard patterns are supported.  Paths follow the ExpressJS routes conventions - [https://expressjs.com/en/4x/api.html#router](https://expressjs.com/en/4x/api.html#router)

Path examples:

```yaml
paths: /admin           # exact string match
                        #
                        # match: /admin only
                        # 404: /admin/new; /admin/new/1; staff ; etc...
```

description         | match examples | 404 (non-match) examples
------------------- | -------------- | ------------------------
exact string match  | /admin         | /admin
                    |                | /admin/new
                    |                | /admin/new/1

```yaml
paths: /admin/*         # deep level sub directory matching, but does not 
                        # match the parent dir
                        #
                        # match: /admin/new /admin/new/1
                        # 404: /admin
```

* paths: ['/admin', '/admin/\*']  - deep level sub directory matching and directory itself
  + match: /admin/new /admin/new/1 /admin

* paths: '/admin/:id' - one level sub directory matching without directory itself
  + match: /admin/new /admin/1 /admin/some-guid-here
  + 404: /admin; /admin/1/test; /admin/a/b/c;

* paths: '/admin/:group/:id' - two level sub directory matching without directory itself
  + match: /admin/eg/12
  + 404: /admin; /admin/1; /admin/a/b/c;

* paths: ['/student/\*', '/teacher/\*','/admin/\*']
  + match:
      - /admin/... multi-level
      - /student/... multi-level
      - /teacher/... multi-level
  + 404:
      - /
      - /admin; /teacher; /student
      - /random etc.

#### Overlapping
The order of the API endpoints specified matters. It is possible to specifiy overlapping patterns through wildcards. More specific patterns should be specified first for evaluation before more general matching.

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

#### serviceEndpoints
Express Gateway receive API request on apiEndpoints, process them and then proxy them to the underlying microservices. The serviceEndpoints section specifies the URLs of these proxied microservices.

Usage:
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
