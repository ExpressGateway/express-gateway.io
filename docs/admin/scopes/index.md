---
layout: doc-section
title: Scopes
doc-order: 10.4
---

### Overview Scopes API
Permission system in Express Gateway is based on scopes. 
Scope is a tag you can use to mark API Endpoint and tag Consumers with.
Scopes can be used with any credential types

This API is for Creation Scopes in Express Gateway, so they can be referenced in credentials
[Credentials and Scopes Management](../../credential-management)

### Create Scopes
##### Request: `POST /scopes`
```json
{
  "scopes": [
    "admin"
  ]
}
```
##### Response: 201

### Get All Scopes
##### Request: `GET /scopes`

##### Response: 200
```json
{
  "scopes": [
    "admin"
  ]
}
```

### Get a Scope (Check exists)
##### Request: `GET /scopes/{scope}`

##### Response: 200
```json
{
  "scopes": "admin"
}
```
### Delete a Scope (Check exists)
##### Request: `DELETE /scopes/{scope}`

##### Response: 204

### Create a Scope
##### Request: `POST /scopes/{scope}`
##### Response: 201