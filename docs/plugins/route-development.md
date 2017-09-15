---
layout: doc-section
title:  "Route Development"
doc-order: 25.5
---

### Routes for Admin API and Gateway Instances
Express Gateway runs 2 ExpressJS applications:
- Admin API
- Gateway

You may add routes to both of these Express instances.

#### Declaration of Route
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

Routes can be exported for regisration by either the Admin API or Gateway instance as show below.

#### Exporting Gateway Routes to plugin

```js
module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.registerGatewayRoute(require('./gateway-extensions/hello-eg'));
  }
}
```
#### Exporting Admin Routes to plugin

```js
module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.registerAdminRoute(require('./admin-extensions/hello-eg'));
  }
}
```
