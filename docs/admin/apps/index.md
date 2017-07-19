---
layout: doc-section
title: Apps
doc-order: 10.2
---

### Overview Apps API

This part of the API is responsible for managing Apps entities 
User is the main entity. User can have multiple Apps
Main purpose of App is to be container for Credentials

### Create an App
##### Request: `POST /apps`

```json
{
  "userId": "steve",
  "name": "my-app",
  "redirectUri": "http://example.com"
}
```
##### Response:
```json
{
  "name": "my-app",
  "id": "0e13a310-0319-4780-bf66-d10788e08d8a",
  "userId": "steve",
  "isActive": true,
  "redirectUri": "http://example.com",
  "createdAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)",
  "updatedAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)"
}
```

### View App info

##### Request: `GET /apps/{id}` 
`GET /apps/0e13a310-0319-4780-bf66-d10788e08d8a` 

##### Response:
```json
{
  "name": "my-app",
  "id": "0e13a310-0319-4780-bf66-d10788e08d8a",
  "userId": "steve",
  "isActive": true,
  "redirectUri": "http://example.com",
  "createdAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)",
  "updatedAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)"
}
```

### List all Apps

##### Request: `GET /apps`

##### Response: 
```json
{
  "apps": [  // Array of apps
    {
      "name": "my-app",
      "id": "0e13a310-0319-4780-bf66-d10788e08d8a",
      "userId": "steve",
      "isActive": true,
      "redirectUri": "http://example.com",
      "createdAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)",
      "updatedAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)"
    }
  ],
  "nextKey": 0  
}
```

### Update App info

##### Request: `PUT /apps/{id}` 
`PUT /apps/0e13a310-0319-4780-bf66-d10788e08d8a` 
```json
{
  "name": "my-app-2",
  "redirectUri": "http://example.com"
}
```

##### Response:
```json
{
  "name": "my-app-2",
  "id": "0e13a310-0319-4780-bf66-d10788e08d8a",
  "userId": "steve",
  "isActive": true,
  "redirectUri": "http://example.com",
  "createdAt": "Tue Jul 18 2017 17:04:06 GMT+0300 (EEST)",
  "updatedAt": "Tue Jul 18 2017 17:34:07 GMT+0300 (EEST)"
}
```

### Delete App

##### Request: `DELETE /apps/{id}` 
`DELETE /apps/0e13a310-0319-4780-bf66-d10788e08d8a` 

##### Response: 204

### Activate/Deactivate App
##### Request: `PUT /apps/{id}/status`
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