---
layout: doc-section
title:  "Policy Development guide"
doc-order: 25.3
---

### Declaring policy 

The policy is a wrapper around ExpressJS middleware

```js
// content of ./policies/example-policy.js file
module.exports = {
  name: 'example',
  policy: (actionParams) => {
    return (req, res, next) => {
      console.log('executing policy-from-example-plugin with params', actionParams);
      next() // calling next policy
      // or write response:  res.json({result: "this is the response"})
    };
  }
};
```

- name - Name of the policy, this is how it can be referenced in pipeline
- policy - Function that returns ExpressJS middleware. The function accepts actionParams. And actionParams is all configuration options in the pipeline for this policy

#### Action Params
Let say you have pipeline defined as:
```yml
pipelines:
  apiPipeline:
    apiEndpoints:
      - api
    policies:
      - example:
          - action:  # everything under the action will be actionParams
              baseUrl: 'https://example.com'
```   
In this case when pipeline will be constructed your policy will have `actionParams` as 
```
{
    baseUrl:'https://example.com'
}
```
#### Exporting Policy with plugin
Now it is time to register the policy during plugin initialization: 
This is done in index.js `init` function
```js
module.exports = {
  version: 'v1.0',
  init: function (pluginContext) {
     let policy = require('./policies/example-policy') 
     pluginContext.registerPolicy(policy) 
  }
}
```
#### Policy registration and execution sequence  

Combined we see 3 major components of policy in the plugin:
- `pluginContext.registerPolicy` - to register the policy as part of plugin
- `(actionParams) => ExpressJS_Middleware_Function` - wrapper to provide parameters from pipeline config
- `(req,res,next) => { ... }` - Standard ExpressJS middleware

The main difference is when these parts are executed:

##### `pluginContext.registerPolicy`  
- Executes at Express Gateway start. Before pipeline engine and before http server start.
- Executes only one time  

##### `(actionParams) => ExpressJS_Middleware_Function` Wrapper  
- Executes when the Pipeline Engine is converting yml to ExpressJS middlewares. 
- Executes on each configuration change (hot-reload of gateway.config file)  

##### `(req,res,next) => { ... }` Middleware
- Executes on each request in current pipeline


 