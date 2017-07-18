---
layout: doc-section
title: Admin API Reference
doc-order: 4.1
---

### Overview Admin API

Express Gateway Admin API is a RESTful interface to manage resourses such as Users, Applications, Credenitials, Scopes, Oauth2 tokens and relation between them  

CLI is using Admin API

### Default Configuration
By Default Admin API starts on port 9876 using HTTP protocol.
This can be changed in the gateway.config.yml 

```yml
admin:
  port: 9876
  hostname: localhost
```

### Security
The raw Admin API should not be publically available for security reasons.

If you decide to expose Admin API you need to secure it. 
One of the ways is to use Express Gateway.

Example Config 
```yml
apiEndpoints:
  api:
    host: '*'

https:  #  run Express Gateway in HTTPS mode
  port: 8443
  tls: 
    'domain.com': 
        key: './path/to/key.pem', 
        cert: './path/to/cert.pem',
admin:
  port: 9876
  hostname: localhost

serviceEndpoints:
  backend:
    url: 'http://localhost:9876' # this is EG admin API
policies: # whitelist of policies allowed to use in pipelines
  - proxy
  - key-auth
pipelines:
  - name: adminAPI
    apiEndpoints:
      - api
    policies:
      - key-auth:
      - proxy:
          - action:
              serviceEndpoint: backend

```