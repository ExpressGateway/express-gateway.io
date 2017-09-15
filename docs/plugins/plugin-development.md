---
layout: doc-section
title:  "Plugin Development"
doc-order: 25.2
---
### Background Resources
Many Express Gateway plugins will be built utilizing [Express Middleware][express-middleware] as a starting point. Express Gateway is built using [ExpressJS][expressjs] and borrows many concepts from it. Building familiarity with it, especially the concept of [Middleware][express-middleware] will help with understanding Express Gateway plugin development.

To understand how different entities within a plugin are registered and loaded checkout the [Express Gateway Boot Sequence]({{ site.baseurl}} {% link docs/runtime/boot-sequence.md %}).

Plugins extend Express Gateway entities as points of extension. These extension points and the plugin framework development plan are specified within the [Express Gateway Plugin Specification](https://docs.google.com/document/d/1jSDul2n_xbeKNtnek69M79-geur6aTWShAcBZ9evD0E/edit).

### The Express Gateway Example Plugin
The Express Gateway Plugin Example [npm package][express-gateway-plugin-example-npm] and its [code on GitHub][express-gateway-plugin-eaxmple-github] serves as a guide for how plugins are structured.  The example contains examples of all extension points supported at the time of the [plugin framework development plan][plugin-development-plan-post].

#### Manually Installing the Example plugin
Express Gateway plugins are automatically istalled using the CLI.  Normally, this example plugin would be installed using the command `eg plug install example`. For the purpose of getting a better understanding of the mechanics, this section walks through what is normally automated.

[Install][express-gateway-installation] Express Gateway

run the CLI command `eg gateway create` to create Express Gateway instance

```
> eg gateway create
? What's the name of your Express Gateway? example-gateway
? Where would you like to install your Express Gateway? example-gateway
? What type of Express Gateway do you want to create? Basic (default pipeline with proxy)
```

- go to the instance folder
- npm install the example package
- edit the `./config/system.config.yml` file and enable the plugin

```
cd example-gateway
npm i --save express-gateway-plugin-example
```

Now edit the `./config/system.config.yml` file

Find the following section:

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
If your configuration is specified in JSON, the equivalent JSON configuration would look like the following:
```json
"plugins": {
    "express-gateway-plugin-example": {
        "param1": "param from system.config"
    }
}
```

#### Running the Example plugin

Run Express Gateway with debugging turned on
```
LOG_LEVEL=debug npm start
```

The output provided by the debugging flag should somethig like the following:

```
Loading plugins. Plugin engine version: 1.2.0
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
### Example Plugin Package Overview
The `express-gateway-plugin-example` plugin is an npm package.

Its Main components are:
- manifest.js file - contains and exports plugin definition
- package.json - contains plugin name and dependencies

All the rest is completely optional. Still, some structure may help. That is why the example plugin contains individual folders for each extension type

Note: `manifest.js` naming is just a convention used to be more descriptive. The name of this file is configured in `main` property of `package.json`. Node.js standard naming is index.js.

#### Manifest.js File overview (Plugin Manifest)
An example of the plugin manifest is provided below:
```js
module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    // pluginContext.registerX calls
  },
  policies:['example'],
  options:{
    param1: {
      type: 'string',
      required: true
    }
  }
}
```
- version - Hint for the Plugin System how to process plugin, '1.2.0' only at this point
- init - Function that will be called right after Express Gateway will `require` the plugin package
- policies - list of policies to be added to the whitelist (requires confirmation from user)
- options - JSON schema for support plugin options. Will be used for prompting during CLI execution. Note: at this point only simple types: `boolean`, `string` and `number` are supported. Full featured JSON Schema validation is planned for future releases

### Events
Express Gateway exposes several events that plugins can subscribe to to cooordinate loading.

#### Example
```js
module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.eventBus.on('hot-reload', function ({ type, newConfig }) {
      // "type" is gateway or system
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
### Extension Entities Development Guides
The following guides describe how to create Express Gateway entities that can be bundled into a plugin to extend Express Gateway:
<nav markdown="1">
- [Policy Development guide]({{ site.baseurl}} {% link docs/plugins/policy-development.md %})
- [Condition Development guide]({{ site.baseurl}} {% link docs/plugins/condition-development.md %})
- [Route Development guide]({{ site.baseurl}} {% link docs/plugins/route-development.md %})
</nav>

[express-gateway-installation]: {{ site.baseurl }}{% link docs/installation.md %}
[express-gateway-plugin-example-npm]: https://npmjs.com/express-gateway-plugin-example
[express-gateway-plugin-example-github]: https://github.com/ExpressGateway/express-gateway-plugin-example
[expressjs]: http://www.expressj.com
[express-middleware]: http://expressjs.com/en/guide/writing-middleware.html
[plugin-development-plan-post]: {{ site.baseurl }}/plugin-development-plan
