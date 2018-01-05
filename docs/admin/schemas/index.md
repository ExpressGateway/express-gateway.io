---
layout: doc-section
title: Schemas
doc-order: 10.5
---

### Overview Schemas API
Express Gateway utilizes schemas to validate all the options provided by the configurations files. This mechanism prevents
the gateway from starting if some required parameters are missing or incorrect. You can query the schemas through the
API and provide new ones using [plugins][plugins]

Express Gateway ships with some built-in schemas for [policies][policies], [conditions][conditions] — [plugins][plugins]
can eventually define other personal schemas to validate the provided options.

### Get Schemas (All, by id)
##### Request: `GET /schemas/:id`

* `id` - optional parameter. ID of the desidered schema definition. If not provided, all will be returned

#### Example: Get all the schemas registered

##### Request: `GET /schemas/`

##### Response: 200

```json
[
	{
		"type": "model",
		"schema": {
			"$id": "http://express-gateway.io/models/applications.json",
			"type": "object",
			"properties": {
				"name": {
					"type": "string"
				},
				"redirectUri": {
					"type": "string",
					"format": "uri"
				}
			},
			"required": [
				"name"
			]
		}
	},
	{
		"type": "policy",
		"schema": {
			"$id": "http://express-gateway.io/schemas/policies/basic-auth.json",
			"type": "object",
			"properties": {
				"passThrough": {
					"type": "boolean",
					"default": false
				}
			}
		}
	},
]
```

#### Example: Get the schema for user model

##### Request: `GET /schemas/http%3A%2F%2Fexpress-gateway.io%2Fmodels%2Fapplications.json`

Note: Remember to always encode URL values.

##### Response: 200

```json
{
	"schema": {
		"$id": "http://express-gateway.io/models/applications.json",
		"type": "object",
		"properties": {
			"name": {
				"type": "string"
			},
			"redirectUri": {
				"type": "string",
				"format": "uri"
			}
		},
		"required": [
			"name"
		]
	}
}
```


[plugins]: {{ site.baseurl }}{% link docs/plugins/index.md %}
[policies]: {{ site.baseurl }}{% link docs/policies/index.md %}
[conditions]: {{ site.baseurl }}{% link docs/policies/customization/conditions.md %}
