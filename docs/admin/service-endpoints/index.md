---
title: Service Endpoints
layout: doc-section
doc-order: 10.10
---

### Overview Service Endpoints

This part of Admin API can dynamically register Service Endpoints in the gateway.config file

### Create or Update a Service Endpoint
##### Request: `PUT /service-endpoints/{name}`

`curl 'http://localhost:9876/service-endpoints/api1' \
-X PUT -H 'content-type: application/json' \
--data-binary '{"url":"http://example.com"}`

```json
{
  "url":"http://example.com"
}
```
If you have multiple endpoints that needs to be load balanced use `urls`
```json
{
  "urls":["http://example.com"]
}
```

### Get Service Endpoints

##### Request: 
`GET /service-endpoints/{name}`
`curl localhost:9876/service-endpoints/api1`

##### Response:
```json
{
  "url":"http://example.com"
}
```

### List all service endpoints

##### Request: `GET /service-enpoints`
`curl localhost:9876/service-endpoints`
##### Response: 
```json
{
  "api1": {
    "url": "https://api.ipify.org"
  },
  "api2": {
    "urls": ["https://api.ipify.org"]
  }
}
```

### Delete Service Endpoint

##### Request: `DELETE /service-endpoints/{name}` 
`curl -X DELETE localhost:9876/service-endpoints/api1`
