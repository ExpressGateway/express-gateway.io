---
layout: doc-section
title: Admin API Reference
doc-order: 10.0
---

### Overview Admin API

Express Gateway Admin API is a RESTful interface to manage resourses such as Users, Applications, Credenitials, Scopes, Oauth2 tokens and relation between them  

CLI is using Admin API

### Core Entities

##### User
Main item in the system. Typically would be used to represent a person in Express Gateway.
User can have multiple Applications (Apps) and Credentials

In minimal configuration you would need User with Credential to secure endpoints 

##### App (Application)
This entity is designed to represent non human consumers of API endpoints, such as mobile application

##### API Consumer
Consumer is User or App. Generic term that represent some client of API endpoints exposed by Express Gateway.     

##### Credential
A container for authentican\authorization secrets of API Consumer (User\App)
At this point Credential can store:
- basic-auth (password)
- oauth2 (client secret or user password) [TBD: REF to Oauth2]
- key-auth (key pair id:secret )

Any API Consumer (User\App) can have one credential of `basic-auth` and `oauth2` types and multiple `key-auth`

##### Scope
Permission system in Express Gateway is based on scopes. 
Scope is a tag you can use to mark API Endpoint and tag Consumers with.
Scopes can be used with any credential types
[TBD More Details about Security]

##### Token (OAuth 2.0 specific)
Standard access token you would expect from OAuth 2.0

### Default Configuration
By Default Admin API starts on port 9876 using HTTP protocol.
This can be changed in the gateway.config.yml 

```yml
admin:
  port: 9876
  hostname: localhost
```

### Security
To disable Admin API remove `admin` section from the `gateway.config.yml`

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