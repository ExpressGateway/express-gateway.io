---
layout: documentation
title: Documentation
permalink: /docs-themes/
links:
  - display: Configuration
    link: configuration
  - display: CLI Reference
    link: cli-reference
  - display: Admin API Reference
    link: admin-api-reference
  - display: Proxy Reference
    link: proxy-reference
---
##### github
<div markdown="1" class="github">
Consider example to rate-limit based on passed host:
###### JSON
```json
{
  "name" :"allOf",
    "conditions": [
      {"name":"pathExact", "path": "/foo/bar"},
      { "name":"not",
        "condition":{ "name":"method", "methods": ["POST", "HEAD"]}
      }
    ]
}
```
###### YAML
```yaml
apiEndpoints:
  example:
    host: '*'
serviceEndpoints:
  backend:
    url: 'http://www.example.com'
pipeline1:
    apiEndpoints:
      - 'example',
    policies:
      - rate-limit:
        -
          action:
            name: 'rate-limit'
            max: 10
            rateLimitBy: "${req.host}"
      - proxy:
        -
          action:
            name: proxy
            serviceEndpoint: backend
```

The preceding example will impose a rate limit by the calling host.  If the hosts calling the API endpoint are "partnerApp.amce.org" and "partnerApp.widget.com" then each host will be limited to 10 requests per (what's the internval???)
</div>

##### Base16 Monokai Light
<div markdown="1" class="base16monokailight">
Consider example to rate-limit based on passed host:
###### JSON
```json
{
  "name" :"allOf",
    "conditions": [
      {"name":"pathExact", "path": "/foo/bar"},
      { "name":"not",
        "condition":{ "name":"method", "methods": ["POST", "HEAD"]}
      }
    ]
}
```

###### YAML
```yaml
apiEndpoints:
  example:
    host: '*'
serviceEndpoints:
  backend:
    url: 'http://www.example.com'
pipeline1:
    apiEndpoints:
      - 'example',
    policies:
      - rate-limit:
        -
          action:
            name: 'rate-limit'
            max: 10
            rateLimitBy: "${req.host}"
      - proxy:
        -
          action:
            name: proxy
            serviceEndpoint: backend
```

The preceding example will impose a rate limit by the calling host.  If the hosts calling the API endpoint are "partnerApp.amce.org" and "partnerApp.widget.com" then each host will be limited to 10 requests per (what's the internval???)
</div>

##### gruvboxlight
<div markdown="1" class="gruvboxlight">
Consider example to rate-limit based on passed host:
###### JSON
```json
{
  "name" :"allOf",
    "conditions": [
      {"name":"pathExact", "path": "/foo/bar"},
      { "name":"not",
        "condition":{ "name":"method", "methods": ["POST", "HEAD"]}
      }
    ]
}
```
###### JavaScript
```js
// let say we have incomming request
req = { method:'GET', originalUrl:'/v1' }
// will log "[EG:log-policy] GET /v1"
```
###### YAML
```yaml
apiEndpoints:
  example:
    host: '*'
serviceEndpoints:
  backend:
    url: 'http://www.example.com'
pipeline1:
    apiEndpoints:
      - 'example',
    policies:
      - rate-limit:
        -
          action:
            name: 'rate-limit'
            max: 10
            rateLimitBy: "${req.host}"
      - proxy:
        -
          action:
            name: proxy
            serviceEndpoint: backend
```

The preceding example will impose a rate limit by the calling host.  If the hosts calling the API endpoint are "partnerApp.amce.org" and "partnerApp.widget.com" then each host will be limited to 10 requests per (what's the internval???)
</div>
