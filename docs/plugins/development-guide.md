---
layout: doc-section
title:  "Development guide"
doc-order: 25.2
---
## Development guide 

### Example

Here is [Example Plugin](https://github.com/ExpressGateway/express-gateway-plugin-example) with all extension points utilized. 

#### Installing Example plugin 

Install Express Gateway (TBD link to install guide) 

run CLI command `eg gateway create` to create Express Gateway instance 

``` 
> eg gateway create
? What's the name of your Express Gateway? example-gateway
? Where would you like to install your Express Gateway? example-gateway
? What type of Express Gateway do you want to create? Basic (default pipeline with proxy)
```
While CLI command (`eg plugin install example`) can speedup installation of the plugin, let's do it in 'manual' way to understand mechanics: 
- go to instance folder
- npm install the example package
- edit `./config/system.config.yml` file and enable plugin

```
cd example-gateway
npm i --save express-gateway-plugin-example
```

Now edit the `./config/system.config.yml` file

You should find the following section: 
```yml
plugins:
  # express-gateway-plugin-example:
  #   param1: 'param from system.config' 
```
Uncomment the `express-gateway-plugin-example` plugin declaration

```yml
plugins:
    express-gateway-plugin-example:
        param1: 'param from system.config' 
```
Equivalent JSON configuration is: 
```json
"plugins": {
    "express-gateway-plugin-example": {
        "param1": "param from system.config"
    }
} 
```

#### Run with Example plugin 

Run Express Gateway 
```
LOG_LEVEL=debug npm start
```

Here are some of output lines we expect to see if everything is ok. 

```
Loading plugins. Plugin engine version: v1.0
...
Loaded plugin express-gateway-plugin-example using from package express-gateway-plugin-example
...
registering policy example
...
registering gatewayExtension
...
registering condition url-match
...

```
### Package overview
The `express-gateway-plugin-example` plugin is an npm package.

Main components are:
index.js file - contains and exports plugin definition 
package.json - contains plugin name and dependencies 

All the rest is completely optional. Still, some structure may help. That is why the example plugin contains individual folders for each extension type 

#### Index.js File overview
In a nutshell the plugin interface is straight forward 
```js
module.exports = {
  version: 'v1.0',
  init: function (pluginContext) {
    // pluginContext.registerX calls 
  }
}
```
- version - Hint for the Plugin System how to process plugin, 'v1.0' only at this point
- init - Function that will be called right after Express Gateway will `require` the plugin package

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
This is done in index.js `init` function
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

### Route and Middleware extension for Admin API and Gateway
Express Gateway runs 2 ExpressJS applications:
- Admin API
- Gateway

You can add Standard ExpressJS middleware or route to any of those applications.

#### Declaration of Gateway Extension 
```js
// content of gateway-extensions/hello-eg.js file 
module.exports = function (gatewayExpressApp) {
  gatewayExpressApp.get('/hello', (req, res) => {
    res.json({hello: 'Express-Gateway'});
  });
};
```
It exports a function that accepts ExpressJS application. 
Treat it like regular ExpressJS project (`.get`, `.use`, `.all`, etc. methods are there)

#### Exporting Gateway Extension to plugin

```js
module.exports = {
  version: 'v1.0',
  init: function (pluginContext) {
    pluginContext.registerGatewayExtension(require('./gateway-extensions/hello-eg'));
  }
}
```
#### Declaration of Admin API Extension 
Same as for Gateway Extension 

#### Exporting Admin Extension to plugin

```js
module.exports = {
  version: 'v1.0',
  init: function (pluginContext) {
    pluginContext.registerAdminExtension(require('./admin-extensions/hello-eg'));
  }
}
```

### Events 
Express Gateway exposes several events. 
This is how to subscribe: 

```js
module.exports = {
  version: 'v1.0',
  init: function (pluginContext) {
    pluginContext.eventBus.on('hot-reload', function ({ type, newConfig }) {
      // type is gateway or system
      // depends on what file was changed 

      // newConfig - is newly loaded configuration of ExpressGateway  
      console.log('hot-reload', type, newConfig);
    });
    pluginContext.eventBus.on('http-ready', function ({ httpServer }) {
      console.log('http server is ready', httpServer.address());
    });
    pluginContext.eventBus.on('https-ready', function ({ httpsServer }) {
      console.log('https server is ready', httpsServer.address());
    });
    pluginContext.eventBus.on('admin-ready', function ({ adminServer }) {
      console.log('admin server is ready', adminServer.address());
    });
  }
}
``` 