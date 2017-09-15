---
layout: doc-section
title:  "Gateway and Admin Extensions Development guide"
doc-order: 25.5
---

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
  version: '1.2.0',
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
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.registerAdminExtension(require('./admin-extensions/hello-eg'));
  }
}
```