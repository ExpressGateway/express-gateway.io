---
layout: doc-section
title:  "Plugins"
doc-order: 25.0
---
### Plugins (Coming soon)

Plugin is the way Express Gateway can be extended. 
This feature has a top priority in our [Roadmap](https://waffle.io/ExpressGateway/express-gateway).

### Plugin Structure
At this point we have all policies, condition etc. built into Express Gateway core. 

So Plugin can have all or some of those:
* Policies (&nbsp; [Policy Reference](./policies))
* Conditions [Pipeline and Conditions Reference](./configuration/policies))
* Models for new Entities &nbsp; [Consumer Management](./consumer-management))
* Custom route handlers 
* Authentication\Authorization providers


### Installing a Plugin (Draft)

#### Well known plugin 

In Express Gateway you need to whitelist policies that are allowed to use in pipelines.
[Policies Configuration](./configuration/policies)

With plugin System Express Gateway will try to find and install package that follows convention `express-gateway-plugin-${policy_name}` 

##### Example installing well known plugin:
Let say in gateway.config.yml we have 
```yml 
policies:
    - key-auth
    - proxy 
    - xml-json
```

`xml-json` is not built into Core. 


Express Gateway will automatically do `npm i express-gateway-plugin-xml-json` and enable it.

### Custom plugins
In case you need parameters for your plugin it will be advanced format declaring plugins

##### Example: Advanced plugin
in system.config.yml it will be 
```yml
plugins:
    - 
        package: loadbalanced-proxy # anything that npm can install, like git url etc.
        # parameters required by plugin 
        discoveryEndpoint: '10.10.10.10'
        healthCheckInterval: 30
        # other parameters 
``` 
Express Gateway will do `npm i loadbalanced-proxy` and run it with all paramters configured for this plugin.

### Development Guide (Coming Soon)




