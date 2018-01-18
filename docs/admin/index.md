---
title: Admin API Reference
layout: doc-section
doc-order: 10.0
---

### Overview

The Express Gateway Admin API is an HTTP interface for administration purposes.

This API is designed for internal use and provides a certain degree of control over Express-Gateway, so its public
exposure is not usually a great idea. If you really have to, you should really make sure it is properly secured. You can
find one way later in this document.

Note: in the future the Admin API will also allow configuration of gateway entities such as pipeline and policy
configuration dynamically.

The Express Gateway [CLI][cli] utilizes the Admin API.

### Core Entities

##### API Consumer
An API Consumer is a User or an Application. Generic term that represent some client of API endpoints exposed by Express Gateway.

##### User
A User is a the main consumer entity in Express Gateway. Typically, it would be used to represent a person in Express Gateway.
User can have multiple Applications and Credentials.

##### Application (App)
An App is a API Consumer entity designed to represent non human consumers of API endpoints, such as mobile application.
Apps always belong to a User.

##### Credential
A container for authentican\authorization secrets of API Consumer (Users/Apps)
There are three credential types provided by the Express Gateway authorization policies:
- basic-auth (password)
- key-auth (key pair id:secret)
- oauth2 (client secret or user password) — [OAuth 2.0 policy][oauth2]

Any API Consumer (Users/Apps) can have only one credential of type `basic-auth` and `oauth2`. However, an API Consumer
may have multiple `key-auth` credentials.

##### Scope
Express Gateway utilizes scopes for permissions and basic authorization.
A scope is a tag you can use to mark API Endpoints and matching Consumer credentials.
Scopes can be used within any credential types. [Credentials and Scopes Management][credential_management]
describes how scopes are declared within credentials.

##### Schema
Express Gateway utilizes schemas to validate all the options provided by the configurations files. This mechanism prevents
the gateway from starting if some required parameters are missing or incorrect. You can query the schemas through the
API and provide new ones using [plugins][plugins]

##### Token (OAuth 2.0 specific)
Express Gateway supports access and refresh tokens as part of the OAuth 2.0 standard.

### Default Configuration
By default, the Admin API starts on port 9876 using HTTP protocol.
This can be changed in the [gateway.config.yml][gw_config]

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

### Secure Admin API with Express Gateway

Change the `gateway.config.yml` like in the following example:

##### Example `gateway.config.yml` with temporary disabled key-auth

```yml

apiEndpoints:
  adminAPI:
    host: 'admin.domain.com' # domain where admin API is exposed

https:  #  run Express Gateway in HTTPS mode
  port: 8443
  tls:
    'domain.com':
        key: './path/to/key.pem',
        cert: './path/to/cert.pem',
admin:
  port: 9876
  hostname: localhost  # listening on localhost only

serviceEndpoints:
  adminBackend:
    url: 'http://localhost:9876' # this is EG admin API
policies: # whitelist of policies allowed to use in pipelines
  - proxy
  - key-auth
pipelines:
  - name: adminAPI
    apiEndpoints:
      - adminAPI
    policies:
    #  - key-auth: # this is intentionaly disabled to allow temporary access
      - proxy:
          - action:
              serviceEndpoint: adminBackend

```

#### Accessing Protected Admin API with CLI
Express Gateway CLI uses special config section in system.config.yml

##### Default CLI config:
```yml
cli:
  url: http://localhost:9876
```

##### Config to point CLI to Secured Admin API
```yml
cli:
  url: https://admin.domain.com:8443  # domain name of exposed API
```

#### Create Key-auth Credentials
This is why we have `key-auth` policy disabled for now. We need create user and credential

##### Start Express Gateway
`npm start`

##### Create admin User
`eg user create`

Follow the promts and check the output
```
? Enter username [required]: admin
? Enter firstname [required]: admin
? Enter lastname [required]: admin
? Enter email:
? Enter redirectUri:
```
`✔ Created 048e4213-8493-401a-b814-e4107c39ec39`

```json
{
  "firstname": "admin",
  "lastname": "admin",
  "isActive": true,
  "username": "admin",
  "id": "048e4213-8493-401a-b814-e4107c39ec39",
  "createdAt": "Fri Jul 28 2017 16:56:48 GMT+0300 (EEST)",
  "updatedAt": "Fri Jul 28 2017 16:56:48 GMT+0300 (EEST)"
```
##### Create key-auth credential for admin user
`eg credentials create -c admin -t key-auth`
```json
✔ Created 2YvpwOURTnNB0mDFhOpnxj
{
  "isActive": true,
  "createdAt": "Fri Jul 28 2017 16:58:28 GMT+0300 (EEST)",
  "updatedAt": "Fri Jul 28 2017 16:58:28 GMT+0300 (EEST)",
  "keyId": "2YvpwOURTnNB0mDFhOpnxj",
  "keySecret": "08o0ZHLD1pGAIiG61tXc9S",
  "scopes": null,
  "consumerId": "admin"
}
```

##### Enable Key Auth
Now we have user and credential.
Turn on Key Auth by uncommenting line

`- key-auth: # this is intentionaly disabled to allow temporary access`

NOTE: Express Gateway will hot-reload so no need for restart.
This is especially important if you run not Redis but InMemory datastore. In this case restart will clear all users and
credentials.

```yml
pipelines:
  - name: adminAPI
    apiEndpoints:
      - adminAPI
    policies:
      - key-auth:
      - proxy:
          - action:
              serviceEndpoint: adminBackend
```

##### Check that acess is not allowed
`eg users list`

It should return Unauthorized error

##### Add HTTP Header to get access to Admin API
In previous steps we have generated key-auth credential for user

It has important part:
```json
  "keyId": "2YvpwOURTnNB0mDFhOpnxj",
  "keySecret": "08o0ZHLD1pGAIiG61tXc9S"
```
These properties combined using colon ('keyId:keySecret') are an API key required buy Key Auth

run

`eg users list -H "Authorization:apikey 2YvpwOURTnNB0mDFhOpnxj:08o0ZHLD1pGAIiG61tXc9S"`

```json
{
  "createdAt": "Fri Jul 28 2017 16:56:48 GMT+0300 (EEST)",
  "firstname": "admin",
  "id": "048e4213-8493-401a-b814-e4107c39ec39",
  "isActive": true,
  "lastname": "admin",
  "updatedAt": "Fri Jul 28 2017 16:56:48 GMT+0300 (EEST)",
  "username": "admin"
}
```

[cli]: {{ site.baseurl }}{% link docs/cli/index.md %}
[oauth2]: {{ site.baseurl }}{% link docs/policies/oauth2.md %}
[credential_management]: {{ site.baseurl }}{% link docs/credential-management.md %}
[consumer_management]: {{ site.baseurl }}{% link docs/consumer-management.md %}
[gw_config]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[plugins]: {{ site.baseurl }}{% link docs/plugins/index.md %}
