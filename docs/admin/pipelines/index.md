---
title: Pipelines
layout: doc-section
doc-order: 10.12
---

### Overview Pipelines

This part of Admin API can dynamically register pipelines in the gateway.config file

### Create or Update a Pipeline
##### Request: `PUT /pipelines/{name}`

`curl 'http://localhost:9876/pipelines/pipeline1' \
-X PUT -H 'content-type: application/json' \
--data-binary '{"apiEndpoints":["API1"], "policies":[{"proxy":[{"action":{"changeOrigin":true, "serviceEndpoint":"service1"}}]}]}' `

```json
{
  "apiEndpoints":["API1"],
  "policies":[{
    "proxy":[{
      "action":{
        "changeOrigin":true,
        "serviceEndpoint":"service1"
        }
    }]
  }]
}
```

### Get Pipelines

##### Request: 
`GET /pipelines/{name}`
`curl localhost:9876/pipelines/pipeline1`

##### Response:
```json
{
  "apiEndpoints":["API1"],
  "policies":[{
    "proxy":[{
      "action":{
        "changeOrigin":true,
        "serviceEndpoint":"service1"
        }
    }]
  }]
}
```

### List all api endpoints

##### Request: `GET /api-enpoints`
`curl localhost:9876/pipelines`
##### Response: 
```json
{
  "pipeline1":{
    "apiEndpoints":["API1"],
    "policies":[{
      "proxy":[{
        "action":{
          "changeOrigin":true,
          "serviceEndpoint":"service1"
          }
      }]
    }]
  }
}
```

### Delete Pipeline

##### Request: `DELETE /pipelines/{name}` 
`curl -X DELETE localhost:9876/pipelines/pipeline1`
