---
layout: doc-section
title:  "Policy Development"
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
This is done in manifest.js `init` function
```js
module.exports = {
  version: '1.2.0',
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

### Use cases

#### Rewrite Policy 
Let say you want to change urls that will be proxied to downstream services. 

Incoming: `/api/users`
Result: `/api/v2/users`
```js
// content of potential ./policies/rewrite-policy.js file
module.exports = {
  name: 'rewrite',
  policy: (actionParams) => {
    return (req, res, next) => {
      req.url = req.url.replace('/api/', '/api/v2/');
      next() // calling next policy
    };
  }
};
```
It is reasonable to make those magic strings configurable 
```js
module.exports = {
  name: 'rewrite',
  policy: (actionParams) => {
    return (req, res, next) => {
      req.url = req.url.replace(actionParams.search, actionParams.replace);
      next() // calling next policy
    };
  }
};
```
Now in the pipeline configuration:
```yml
apiPipeline:
  policies:
    - rewrite:   # this is policy declaration
        - action:   # policy can have multiple steps (condition/action pairs) 
            search: /api/   # goes as "actionParams.search"
            replace: /api/v2/ # becomes "actionParams.replace"
        - action:   # step 2 
            search: /old-api/
            replace: /api/v1/ 
    - proxy:
        - action:
              serviceEndpoint: backend
```
