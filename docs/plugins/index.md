---
layout: doc-section
title:  "Plugins"
doc-order: 25.0
---

Express Gateway v1.2.0+ comes with a plugin framework used to extend the Express Gateway core.
The plugin framework enables anyone to take Express middleware and integrate them into Express Gateway as plugins. Express Gateway provides a declarative way to take advantage of Express middleware to be driven centrally and executed dynamically.

Note: Existing policies within the Express Gateway core will be evntually refactored out of the core into Express Gateway plugins using this framework.

### Plugin Structure

An Express Gateway plugin contains entities and allows event subscription. You can think of a plugin as a container of Express Gateway entities that extend the core and by adding entities and providing event handlers.

In the first iteration of the plugin framework, the following entities are supported:

* [Policies][policies]
* [Conditions][conditions]
* Custom routes and middleware for admin and gateway servers

For all extension points under consideration please refer to the [Express Gateway Plugin Specification](https://docs.google.com/document/d/1jSDul2n_xbeKNtnek69M79-geur6aTWShAcBZ9evD0E/edit).

The plugin framework exposes an Event Bus and can react to events in the Express Gateway lifecycle.

### Automated Plugin Installation

Plugins are bundled as [Node](https://www.nodejs.org) modules and distributed through [npm](https://www.npmjs.com).
The Express Gateway [CLI][cli] is used to [install][plugin-install] and [configure][plugin-configure] plugins.

Installed plugins are declared in the [system.config.yml][system-config-yml] and are then ready to be used.
Express Gateway CLI is a convenient way to install and enable plugins.
`eg plugin install __name__`
[Plugins CLI commands]({{ site.baseurl}} {% link docs/cli/plugins/index.md %})

#### Example
The Express Gateway Plugin Example has a npm package name of [express-gateway-plugin-example][express-gateway-plugin-example-npm].
After installing the example plugin, the [system.config.yml][system-config-yml] will contain a new entry for the example plugin under the [plugins][plugins-section] as shown:

```yml
plugins:
   example: # "express-gateway-plugin-example"
      param1: 'global per plugin param1'
```

Parameters for plugins that are specified within this section are global to the entire gateway instance.

### Manually Plugin Installation
Plugins can also be installed manually by following the steps outlined below:

1. `npm install __name__ --save`
2. open [config/system.config.yml][system-config-yml]
3. find `plugins:` section
4. add your plugin name under it
5. provide global plugin parameters (if applicable)

### Plugin Naming Convention
Express Gateway will load pugins by convention using the prefix `express-gateway-plugin-` within the npm package module name. Plugins that do not follow this convention can still be loaded by specifying the package name within the `package` property.

#### Example
The Acme Corp SSO Plugin has a npm package name `acme-corp-sso-eg-plugin` and resides on a [private npm registry][private-npm-registry]

After installing the plugin, the [system.config.yml][system-config-yml] will contain the following:

```yml
plugins:
    acme-sso:  # the plugin name is specified within the plugin manifest
        package: 'acme-corp-sso-eg-plugin'
        # parameters required by plugin
        param1: 'p1'
        # other parameters

```

### Developing a plugin
Express Gateway is a thin layer on top of ExpressJS Node.JS framework and uses a lot of concepts from it. So it is good to have some idea of it, especially the [Middleware](https://expressjs.com/en/guide/writing-middleware.html)

To understand when different parts of plugin are registered and loaded check the [Express Gateway Boot Sequence explanation]({{ site.baseurl}} {% link docs/runtime/boot-sequence.md %})

All extension points are covered in the
[Development Guide]({{ site.baseurl}} {% link docs/plugins/plugin-development.md %})

Here is [Example Plugin](https://github.com/ExpressGateway/express-gateway-plugin-example) with all extension points utilized

And if you want to write only custom policy this is [Policy Developing Guide]({{ site.baseurl}} {% link docs/plugins/policy-development.md %})

[cli]: {{ site.baseurl }}{% link docs/cli/index.md %}
[policies]: {{ site.baseurl }}{% link docs/policies/index.md %}
[conditions]: {{ site.baseurl }}{% link docs/policies/index.md %}
[system-config-yml]: {{ site.baseurl }}{% link docs/configuration/system.config.yml/index.md %}
[plugins-section]: {{ site.basurl }}{% link docs/configuration/system.config.yml/plugins.md %}
[plugin-install]: {{ site.baseurl }}{% link docs/cli/plugins/install.md %}
[plugin-configure]: {{ site.baseurl }}{% link docs/cli/plugins/configure.md %}
[express-gateway-plugin-example-npm]: https://npmjs.com/package/express-gateway-plugin-example
[private-npm-registry]: https://docs.npmjs.com/misc/registry#can-i-run-my-own-private-registry
