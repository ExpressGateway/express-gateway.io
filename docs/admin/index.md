---
layout: doc-section
title: Admin API Reference
doc-order: 10.0
---

### Overview 

The Express Gateway Admin API is a REST interface to manage internal entities such as Users, Applications, Credenitials, Scopes, OAuth2 tokens and the relationships among such entities.

Note: in the future the Admin API will also allow configuration of gateway entities such as pipeline and policy configuration dynamically.

The Express Gateway [CLI](./cli) utilizes the Admin API.

### Core Entities

##### API Consumer
An API Consumer is a User or an Application. Generic term that represent some client of API endpoints exposed by Express Gateway.

##### User
A User is a the main consumer entity in Express Gateway. Typically, it would be used to represent a person in Express Gateway.
User can have multiple Applications  and Credentials.

##### Application (App)
An App is a API Consumer entity designed to represent non human consumers of API endpoints, such as mobile application. Apps always belong to a User.

##### Credential
A container for authentican\authorization secrets of API Consumer (Users/Apps)
There are three credential types provided by the Express Gateway authorization policies:
- basic-auth (password)
- key-auth (key pair id:secret )
- oauth2 (client secret or user password)    &nbsp; [OAuth 2.0 policy](../../policies/oauth2)

Any API Consumer (Users/Apps) can have only one credential of type `basic-auth` and `oauth2`. However, an API Consumer may have multiple `key-auth` credentials.

##### Scope
Express Gateway utilizes scopes for permissions and basic authorization.
A scope is a tag you can use to mark API Endpoints and matching Consumer credentials.
Scopes can be used within any credential types. [Credentials and Scopes Management](../../credential-management) describes how scopes are declared within credentials.

##### Token (OAuth 2.0 specific)
Express Gateway supports access and refresh tokens as part of the OAuth 2.0 standard.

### Default Configuration
By default, the Admin API starts on port 9876 using HTTP protocol.
This can be changed in the [gateway.config.yml](./configuration/gateway.config.yml)

```yml

admin:
  port: 9876
  hostname: localhost

```

### Security Measures
To disable Admin API remove `admin` section from `gateway.config.yml`

The raw Admin API should not be publically available for security reasons.

Should you decide to expose Admin API you should secure it.
One of the ways is to use Express Gateway.

#### Example `gateway.config.yml`

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