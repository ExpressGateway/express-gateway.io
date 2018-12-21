---
title: Scopes
layout: doc-section
doc-order: 10.4
---

### Overview Scopes API
Express Gateway utilizes scopes for permissions and basic authorization.
A scope is a tag you can use to mark API Endpoints and matching Consumer credentials.
Scopes can be used within any credential type. [Credentials and Scopes Management](../../credential-management) describes how scopes are declared within credentials

Scopes must be declared within Express Gateway before they are used by credentials or specified on API endpoints.

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
