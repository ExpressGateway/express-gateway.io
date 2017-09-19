---
layout: post
title: "Part1: Anatomy of a Plugin"
date:   2017-09-19 12:00:00 -0400
category: guides
author: "Serhii Kuts"
#
# Please remember to update ~/_archives-month, ~/_archives-year
# and ~/_categories with any necessary archive needs
#
---
_“Give a man a fish, and you feed him for a day. Teach a main to fish, and you feed him for a lifetime.”_

This old saying is the premise behind what we were thinking of building next based on community feedback of what we had released initially with Express Gateway.
<!--excerpt-->

For the past few weeks, we’ve been completing the first iteration of the plugin framework.  For more information about the plugin framework in general and the development plan, please check out our previous post that provides an [overview][plugin-dev-overview].

We just release Express Gateway 1.2.0 with the new plugin engine that allows anyone to add their own extension entities within a plugin and have it installed and utilized within Express Gateway dynamically.

This is the first part of a series going over plugins and the plugin framework in more detail.

### Plugin Anatomy: The Basics
An Express Gateway plugin acts as a container and has three key things:
* Package.json
* A folder for each entity extension
* Manifest.js

The package.json declares all dependencies that the plugin requires, just like any Node modules.

#### Entity Extension Point Folders
Although completely optional, a folder containing the JS files that corresponds to each entity type has been created for better organization.

The entities that are supported in the first iteration of the plugin are as follows:
* conditions
* policies
* routes

Example:

Within the express-gateway-plugin-example, there are three folders representing three entity types:
```
.
├── routes
├── conditions
└── policies
```


#### Manifest.js
The `manifest.js` is the main file within the plugin.  It’s the same thing as any other index.js file within a Node module. It’s just been renamed to be more descriptive on it’s purpose and it’s the `main` property in the `package.json`.

The manifest has two main parts:
* An init function that registers each of the entities within the folders into the PluginContext and fires of any relevant events.
* Metadata about each of the entities in the form of an options JSON schema so that the CLI can perform prompting for input to configure the plugin as well as validation.

The PluginContext is a special initialization object that will be provided to plugin during Express Gateway start.
It’s primary tasks are:
* Collect information about entities in the plugin, through several register methods
* Provide plugin with information about Express Gateway such as configuration, events, consumer management etc.

### PluginContext Example

```
module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    pluginContext.registerPolicy(require('./policies/example-policy'));
    pluginContext.registerCondition(require('./conditions/url-match'));
    pluginContext.registerGatewayRoute(require('./routes/hello-eg'));
    pluginContext.registerAdminRoute(require('./routes/hello-admin'));

    pluginContext.eventBus.on('hot-reload', function ({ type, newConfig }) {
      console.log('hot-reload', type, newConfig);
    });
    pluginContext.eventBus.on('http-ready', function ({ httpServer }) {
      console.log('http ready');
    });
    pluginContext.eventBus.on('https-ready', function ({ httpsServer }) {
      console.log('https ready');
    });
    pluginContext.eventBus.on('admin-ready', function ({ adminServer }) {
      console.log('admin ready');
    });
  },
  policies:['example'], // this is for CLI to automatically add to "policies" whitelist in gateway.config
  options: {  // This is for CLI to ask about params 'eg plugin configure example'
    baseUrl: {
      title: 'Base Url',
      description: 'the base url to initialize',
      type: 'string',
      required: true
    },
    maxRequestsPerSecond: {
      title: 'Max Requests per second',
      description: 'the max rps value',
      type: 'number'
    }
  }
};
```


### Plugin Installation

Plugins are installed and configured using the Express Gateway CLI.

There are two commands for the plugin CLI subcommand
<nav markdown="1">
- [install][eg-plugin-install]
- [configure][eg-plugin-configure]
</nav>

The CLI automates a series of transparent tasks that one can execute manually:
- prompts for any options as part of the configuration process specified within the manifest.js, this is the same as running `configure`
- npm install --save: installs the node module and updates the package.json adding the module as a dependency
- adds an entry into the plugins: section of the [system.config.yml][system-config-yml]
- under the plugin entry writes any global parameters that pertain to the plugin that were specified in the configuration process

If the plugin contains a policy, the policy is also declared within the `policies:` section of the [gateway.config.yml][gateway-config-yml] ready to be utilized within a policy.

#### Plugin Installation Example

```
➜ eg plugin install express-gateway-plugin-example
? Set value for baseUrl: http://example.com
? Set value for maxRequestsPerSecond: 100
? Would you like to enable this plugin in system config? Yes
? Would you like to add new policies to gateway config? Yes
Plugin installed!
```
inside the [system.config.yml][system-config-yml], a plugin entry with parameters will be written

```
plugins:
  example:
    package: express-gateway-plugin-example
    baseUrl: 'http://httpbin.org'
    maxRequestsPerSecond: 100
```

the Express Gateway plugin example comes with an example policy that is also entered within the [gateway.config.yml][gateway-config-yml]

```
policies:
  - cors
  - log
  - proxy
  - rate-limit
  - expression
  - basic-auth
  - key-auth
  - oauth2
  - example  # this is the new entry entered by the CLI
```

[plugin-dev-overview]: http://www.express-gateway.io/plugin-development-plan
[gateway-config-yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[system-config-yml]: {{ site.baseurl }}{% link docs/configuration/system.config.yml/index.md %}
[eg-plugin-install]: {{ site.baseurl }}{% link docs/cli/plugins/install.md %}
[eg-plugin-configure]: {{ site.baseurl }}{% link docs/cli/plugins/configure.md %}
