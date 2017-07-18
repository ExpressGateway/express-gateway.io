---
layout: doc-section
title: Apps
doc-order: 4.1
---

### Overview Apps API

This part of the API is responsible for managing User entities 

### Create an App
##### Request: `POST /apps`

```json
{
  "username": "steve",    //Unique identifier of user
  "firstname": "Steve", // required by default 
  "lastname": "Brown",  // required by default 
  "email": "steve@example.com", // optional
  "redirectUri": "http://example.com" // optional, Oauth2 related  
}
```
##### Response:
```json
{
  "username": "steve",
  "id": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728", // Unique identifier, 1-1 relation to username
  "email": "steve@example.com",
  "firstname": "Steve",
  "lastname": "Brown",
  "isActive": true, 
  "redirectUri": "http://example.com",
  "createdAt": "Sun Jul 16 2017 00:06:17 GMT+0300 (EEST)",
  "updatedAt": "Sun Jul 16 2017 00:06:17 GMT+0300 (EEST)"
}
```

### View User info

##### Request: `GET /apps/{id}` 
`GET /apps/steve` 

##### Response:
```json
{
  "username": "steve",
  "id": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728", 
  "email": "steve@example.com",
  "firstname": "Steve",
  "lastname": "Brown",
  "isActive": true, 
  "redirectUri": "http://example.com",
  "createdAt": "Sun Jul 16 2017 00:06:17 GMT+0300 (EEST)",
  "updatedAt": "Sun Jul 16 2017 00:06:17 GMT+0300 (EEST)"
}
```

### List all Users

##### Request: `GET /apps`

##### Response: 
```json
{
  "users": [  // Array of users
    {
      "username": "steve",  
      "id": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728",
      "email": "steve@example.com",
      "firstname": "Steve",
      "lastname": "Brown",
      "isActive": "true or false",
      "redirectUri": "http://example.com",
      "createdAt": "Sun Jul 16 2017 00:06:17 GMT+0300 (EEST)",
      "updatedAt": "Sun Jul 16 2017 00:06:17 GMT+0300 (EEST)"
    }
  ],
  "nextKey": 0  
}
```

### Update User info

##### Request: `PUT /apps/{id|username}` 
`PUT /apps/steve` 
```json
{
  "email": "steve.brown@example.com",
  "firstname": "Steve",
  "lastname": "Brown",
  "redirectUri": "http://example.com"
}
```

##### Response:
```json
{
  "username": "steve",
  "id": "47bc9fa2-f245-4b47-9cb4-29b8ccb49728", 
  "email": "steve.brown@example.com",
  "firstname": "Steve",
  "lastname": "Brown",
  "isActive": true, 
  "redirectUri": "http://example.com",
  "createdAt": "Sun Jul 16 2017 00:06:17 GMT+0300 (EEST)",
  "updatedAt": "Sun Jul 16 2017 00:06:17 GMT+0300 (EEST)"
}
```

### Delete App

##### Request: `DELETE /apps/{id}` 
`DELETE /apps/steve` 

##### Response: 200 (204)

### Activate/Deactivate App
##### Request: `DELETE /apps/{id}/status`
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