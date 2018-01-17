---
title: Policies
layout: doc-section
doc-order: 10.6
---

### Overview Policies API

Express Gateway's Admin API supports querying, enabling and disabling available policies in the configuration.

### Get enabled policies

##### Request: `GET /policies`

#### Example

##### Request: `GET /policies`

##### Response: 200

```json
[
	"proxy",
	"key-auth"
]
```

### Enables a policy

##### Request: `PUT /policies/:policy`

#### Example

##### Request: `PUT /policies/proxy`

##### Response: 200

```json
{
	"status": "ok"
}
```

### Get enabled policies

##### Request: `DELETE /policies/:policy`

#### Example

##### Request: `DELETE /policies/proxy`

##### Response: 204
