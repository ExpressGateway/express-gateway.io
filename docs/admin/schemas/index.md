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

### Get Schemas (All, by type, by type and name)
##### Request: `GET /schemas/:type/:name`

#### Example: Get the `endOf` schema in the `condition` group

##### Request: `GET /schemas/condition/oneOf`

##### Response: 200

```json
{
  "type": "condition",
  "name": "oneOf",
  "schema": {
    "$id": "http://express-gateway.io/schemas/oneOf.json",
    "type": "object",
    "properties": {
      "conditions": {
        "type": "array",
        "items": {
          "$ref": "defs.json#/definitions/condition"
        }
      }
    },
    "required": [
      "conditions"
    ]
  }
}
```

[plugins]: {{ site.baseurl }}{% link docs/plugins/index.md %}
[policies]: {{ site.baseurl }}{% link docs/policies/index.md %}
[conditions]: {{ site.baseurl }}{% link docs/policies/customization/conditions.md %}
