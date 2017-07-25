---
layout: doc-section
title: Users
doc-order: 10.1
---

### Overview Users

A User is a the main consumer entity in Express Gateway. Typically, it would be used to represent a person in Express Gateway.
User can have multiple Applications  and Credentials.


### Create a User
##### Request: `POST /users`

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

##### Request: `GET /users/{id or username}` 
`GET /users/steve` 

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

##### Request: `GET /users`

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

##### Request: `PUT /users/{id or username}` 
`PUT /users/steve` 
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

### Delete User

##### Request: `DELETE /users/{id or username}` 
`DELETE /users/steve` 

##### Response: 204


### Activate/Deactivate User
##### Request: `PUT /users/{id or username}/status`
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