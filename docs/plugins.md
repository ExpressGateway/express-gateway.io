---
layout: doc-section
title:  "Plugins"
doc-order: 25.0
---
### Plugins (Coming soon)

Express Gateway comes with a plugin framework used to extend the Express Gateway core. As of this version, all existing policies are currently bundled within the Express Gateway core, but have already been separated structurally as plugins within the internal directory structure.

The extraction of the existing plugins and the enablement of the plugin framework is a top priority on the [Roadmap](https://waffle.io/ExpressGateway/express-gateway).

### Plugin Structure

An Express Gateway plugin contains entities. You can think of a plugin as a container of Express Gateway entities that extend the core and dynamically installed.

A plugin can contain one or more of the following:
* Policies ([Policy Reference](./policies))
* Conditions ([Pipeline and Conditions Reference](./configuration/policies))
* Models for new Entities ([Consumer Management](./consumer-management))
* Custom route handlers

### General Plugin Installation

Plugins are bundled as [Node](http://www.nodejs.org) modules and installed through [npm](https://www.npmjs.com).

Plugins are installed for the entire Express Gateway instance and declared within the [system.config.yml](./configuration/system.config.yml).

Plugin parameters can be specified as part of the plugin declaration.

#### Example
The [system.config.yml](./configuration/system.config.yml) lists the following:
```yml

plugins:
    - 
        package: loadbalanced-proxy # anything that npm can install, like git url etc.
        # parameters required by plugin 
        discoveryEndpoint: '10.10.10.10'
        healthCheckInterval: 30
        # other parameters 

```
Express Gateway will automatically run `npm i loadbalanced-proxy` and configure the plugin with the specified parameters.

### Installing policies as plugins

Express Gateway policies are bundled and installed as plugins. In Express Gateway, policies that are declared in the [Policies section](./configuration/policies) of the [gateway.config.yml](.configuration/gateway.config.yml) are automatically installed by the plugin framework, without needing knowledge of system level configuration.

The plugin framework will try to find and install policy plugin package using the convention `express-gateway-plugin-${policy_name}`.

##### Example

The [gateway.config.yml](./configuration/gateway.config.yml) lists the following:
```yml 

policies:
    - key-auth
    - proxy 
    - xml-json

```

The `xml-json` has been recently added. Upon startup, Express Gateway plugin framework will automatically execute `npm i express-gateway-plugin-xml-json` and enable it.

### Development Guide (Coming Soon)
