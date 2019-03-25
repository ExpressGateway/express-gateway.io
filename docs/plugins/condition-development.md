---
title: Condition Development
layout: doc-section
doc-order: 25.4
---

### Declaring Condition
Approach is quite similar to Policy

Code of `url-match` condition:

```js
// content of conditions/url-match.js file
module.exports = {
  name: 'url-match',
  schema: {
    $id: 'http://express-gateway.io/schemas/conditions/url-match.json',
    type: 'object',
    properties: {
      expected: {
        type: 'string'
      }
    },
    required: ['expected']
  },
  handler: conditionConfig => req => conditionConfig.expected === req.url)
};
```

- `name` - Name of the condition, this is how it can be referenced in pipeline
- `schema` - JSON Schema of the condition; it will be used to validate the data passed in.
- `handler` - Function that returns true\false. The function accepts ExpressJS Request object and condition parameters.
And conditionParams is all configuration options in the pipeline for this condition

#### Condition Params
Let say you have pipeline defined as:
```yml
pipelines:
  apiPipeline:
    apiEndpoints:
      - api
    policies:
      - example:
          -
            condition:
                name: 'url-match'
                expected: '/test'
            action:  # everything under the action will be actionParams
              baseUrl: 'https://example.com'
```
In this case during request example policy will only be executed in `url-match` condition is met. And inside the condition `conditionParams` will be
```json
{
    "expected": "/test"
}
```

#### Exporting Condition with plugin
This is done in manifest.js `init` function

```js
module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
     const condition = require('./conditions/url-match.js')
     pluginContext.registerCondition(condition)
  }
}
```

#### Condition registration and execution sequence

Condition has 2 major components:
- `pluginContext.registerCondition` - to register the condition as part of plugin
- `function (req, conditionConfig) => true/false` - handler function

##### `pluginContext.registerCondition`
- Executes at Express Gateway start. Before pipeline engine and before http server start.
- Executes only one time

##### `function (req, conditionConfig) => true/false` Handler
- Executes on each request in current pipeline. If not matched will prevent policy from being fired
