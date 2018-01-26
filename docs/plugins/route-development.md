---
title: Route Development
layout: doc-section
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

Routes can be exported for registration by either the Admin API or Gateway instance as show below.

#### Exporting Gateway Routes to plugin

```js
module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.registerGatewayRoute(require('./gateway-routes/hello-eg'));
  }
}
```
#### Exporting Admin Routes to plugin

```js
module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.registerAdminRoute(require('./admin-routes/hello-eg'));
  }
}
```

### Use cases

#### OAuth2 server plugin
Express Gateway can be an [OAuth2][oauth2] provider.
At this point this functionality is bundled into core.
Let say we want to extract it as a plugin.

There are 2 major components here:
- validate tokens or credentials during request
- issue tokens

##### Part 1: validation of tokens and credentials
Tokens and credentials validation is a clear use case for the Policy.
See [Policy Development guide][policy]

##### Part 2
You will need custom routes for OAuth2 server implementation.
Here is routes and middlewares that Express Gateway core internally uses in current version to run OAuth2.
The code is wrapped in plugin declaration for demonstration purpose.

```js
// excerpt from manifest.js file in potential OAuth2 plugin
pluginContext.registerGatewayRoute(app => {
  app.set('view engine', 'ejs');

  const middlewares = [
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    session(config.systemConfig.session),
    passport.initialize(),
    passport.session()
  ];

  app.get('/login', site.loginForm); // render login page
  app.post('/login', middlewares, site.login); // parse form to get credentials
  app.get('/logout', site.logout); // logout page

  app.use('/oauth2', middlewares); // middlewares mounted specifically for "/oauth2" routes
  app.get('/oauth2/authorize', oauth2Server.authorization); // oauth2 server specific handlers
  app.post('/oauth2/authorize/decision', oauth2Server.decision);
  app.post('/oauth2/token', oauth2Server.token);
});

```
###### Best Practices Notes:

- Plugin in most of the cases should **NOT** register per app middleware like `app.use(middleware)`. Most likely this is
functionality for [Policy][policy] or it is per path segment registration like `app.use('/oauth2', middlewares);`.
In the example above the Gateway should not do form parsing and should not have session support. It is only OAuth2
server requirements.
- It could be that those routes are a separate application. In OAuth2 example it is absolutely possible that `server`
part is out of gateway. And Express Gateway will just proxy requests to it, this is something pipeline functionality
will cover perfectly.

[oauth2]: {{ site.baseurl}} {% link docs/policies/oauth2.md %}
[policy]: {{ site.baseurl}} {% link docs/plugins/policy-development.md %}