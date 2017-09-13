---
layout: doc-section
title:  "Condition Development guide"
doc-order: 25.4
---


### Declaring Condition
Approach is quite similar to Policy

Code of `url-match` condition:
```js
// content of conditions/url-match.js file
module.exports = {
  name: 'url-match',
  handler: function (req, conditionConfig) {
    return (conditionConfig.expected === req.url);
  }
};
```

- name - Name of the condition, this is how it can be referenced in pipeline
- handler - Function that returns true\false. The function accepts ExpressJS Request object and condition parameters. And conditionParams is all configuration options in the pipeline for this condition

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
```
{
    expected:'/test'
}
```

#### Exporting Condition with plugin
This is done in manifest.js `init` function
```js
module.exports = {
  version: 'v1.0',
  init: function (pluginContext) {
     let condition = require('./conditions/url-match.js') 
     pluginContext.registerCondition(condition) 
  }
}
```




#### Condition registration and execution sequence  

Condition has 2 major components:
- `pluginContext.registerCondition` - to register the condition as part of plugin
- `function (req, conditionConfig) => true/false` - handler function

##### `pluginContext.registerPolicy`  
- Executes at Express Gateway start. Before pipeline engine and before http server start.
- Executes only one time  

##### `function (req, conditionConfig) => true/false` Handler  
- Executes on each request in current pipeline. If not matched will prevent policy from being fired 
