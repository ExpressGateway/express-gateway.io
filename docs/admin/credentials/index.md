---
layout: doc-section
title: Credentials
doc-order: 10.3
---

### Overview Credentials API
Credential is a container for authentican\authorization secrets of API Consumer (User\App)
At this point Credential can store:
- basic-auth (password)
- oauth2 (client secret or user password) [TBD: REF to Oauth2]
- key-auth (key pair id:secret )

Any API Consumer (User\App) can have one credential of `basic-auth` and `oauth2` types and multiple `key-auth`

### Create Credential (basic-auth)
##### Request: `POST /credentials`
```json
{
  "credential": { //optional
    "scopes": [
      "admin"
    ]
  },
  "consumerId": "steve",
  "type": "basic-auth" // or key-auth or oauth2
}
```
##### Response 
```json
 {
  "isActive": true,
  "createdAt": "Tue Jul 18 2017 21:57:16 GMT+0300 (EEST)",
  "updatedAt": "Tue Jul 18 2017 21:57:16 GMT+0300 (EEST)",
  "id": "steve",
  "password": "03cc5161-cf05-4b83-b7a2-f5c81354731f"
}
```

### Create Credential (oauth2)
##### Request: `POST /credentials`
```json
{
  "credential": { //optional
    "scopes": [
      "admin"
    ]
  },
  "consumerId": "steve",
  "type": "oauth2" 
}
```
##### Response 
```json
 {
  "isActive": true,
  "createdAt": "Tue Jul 18 2017 21:57:16 GMT+0300 (EEST)",
  "updatedAt": "Tue Jul 18 2017 21:57:16 GMT+0300 (EEST)",
  "id": "steve",
  "secret": "03cc5161-cf05-4b83-b7a2-f5c81354731f"
}
```

### Create Credential (key-auth)
##### Request: `POST /credentials`
```json
{
  "credential": { //optional
    "scopes": [
      "admin"
    ]
  },
  "consumerId": "steve",
  "type": "key-auth" 
}
```
##### Response 
```json
 {
  "isActive": true,
  "createdAt": "Tue Jul 18 2017 22:39:35 GMT+0300 (EEST)",
  "updatedAt": "Tue Jul 18 2017 22:39:35 GMT+0300 (EEST)",
  "keyId": "6qseFEYL5inVqtLFACSqiC",  // part 1 of API key
  "keySecret": "5uGr8Qqhp1fnpCjiynqNhJ", // part 2 of API key
  "scopes": null,
  "consumerId": "steve"
}
```

### Get Credential by Consumer Id (Username, UserId or AppId)
##### Request: `GET /credentials/{consumerId}`

##### Response:
```json
{
  "credentials": [
    {
      "keyId": "55tEGsilJkhKoWMS3kkipH", // only for key-auth 
      "keySecret": "5BNegGCfqW4rhqqCz3A3sM", // only for key-auth
      "consumerId": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728",
      "password": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728", // for basic-auth
      "secret": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728", // for oauth2
      "type": "basic-auth", //or key-auth or oauth2
      "isActive": true,
      "createdAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)",
      "updatedAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)"
    }
  ],
  "nextKey": 0
}
```

### Get Credential info 
##### Request: `GET /credentials/{type}/{credentialId}`

##### Response:
```json
{
    "keyId": "55tEGsilJkhKoWMS3kkipH", // only for key-auth 
    "keySecret": "5BNegGCfqW4rhqqCz3A3sM", // only for key-auth
    "consumerId": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728",
    "password": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728", // for basic-auth
    "secret": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728", // for oauth2
    "type": "basic-auth", //or key-auth or oauth2
    "isActive": true,
    "createdAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)",
    "updatedAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)"
    
}
```

### Activate/Deactivate Credential
##### Request: `DELETE /credential/{type}/{credentialId}/status`
```json
{
  "status": true  // use false to deactivate
}  
```

##### Response:
```json
{
  "status": "Activated"  // Active, Deactivated, Inactive
}
```


### Set scopes for Credential 
##### Request: `PUT /credentials/{type}/{credentialId}/scopes`
```json
{
  "scopes": [
    "admin"
  ] 
}
```
##### Response: 204

### Add scope to Credential scopes 
##### Request: `PUT /credentials/{type}/{credentialId}/scopes/{scope}`
##### Response: 204

### Remove scope from Credential scopes 
##### Request: `DELETE /credentials/{type}/{credentialId}/scopes/{scope}`
##### Response: 204

### Note: 
`credentialId` for `basic-auth` and `oauth2` is `consumerId` and for `key-auth` it is `keyId`
