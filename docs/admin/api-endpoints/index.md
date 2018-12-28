---
title: API Endpoints
layout: doc-section
doc-order: 10.11
---

### Overview API Endpoints

This part of Admin API can dynamically register API Endpoints in the gateway.config file

### Create or Update a API Endpoint
##### Request: `PUT /api-endpoints/{name}`

`curl 'http://localhost:9876/api-endpoints/users' \
-X PUT -H 'content-type: application/json' \
--data-binary ''"host":"*","paths":["/v1/api/users*"]}`

```json
{
  "host":"*",
  "paths":["/v1/api/users*"]
}
```

### Get API Endpoints

##### Request: 
`GET /api-endpoints/{name}`
`curl localhost:9876/api-endpoints/users`

##### Response:
```json
{
  "host":"*",
  "paths":["/v1/api/users*"]
}
```

### List all api endpoints

##### Request: `GET /api-enpoints`
`curl localhost:9876/api-endpoints`
##### Response: 
```json
{
  "users": {
    "host":"*",
    "paths":["/v1/api/users*"]
  }
}
```

### Delete API Endpoint

##### Request: `DELETE /api-endpoints/{name}` 
`curl -X DELETE localhost:9876/api-endpoints/users`
