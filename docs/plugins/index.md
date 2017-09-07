---
layout: doc-section
title:  "Plugins"
doc-order: 25.0
---
### Plugins

Express Gateway comes with a plugin framework used to extend the Express Gateway core. 
While some policies are currently bundled into the core itself we intend to release future policies as plugins. Also with growing community support it should be a lot of new plugins in the nearest future  

### General Plugin Installation

Plugins are bundled as [Node](http://www.nodejs.org) modules and installed through from [npm](https://www.npmjs.com). 

After that plugin have to be declared in [system.config.yml](./configuration/system.config.yml) in order to be used. 

Express Gateway CLI is a convenient way to install and enable plugin. 
`eg plugin install __name__`
TBD: actual CLI command 

The alternative is manual installation:

1. `npm install __name__ --save`
2. open config/system.config.yml 
3. find `plugins:` section
4. add your plugin name under it 
5. provide global plugin parameters 

In case you have plugin named `express-gateway-plugin-example` the result will be:

```yml
plugins:
   example: # "express-gateway-plugin-" part will be added automatically
      param1: 'global per plugin param1'
```

We recommend calling plugins with prefix `express-gateway-plugin-` so other people can find and use it. 

Should you decide to name the package differently there is `package` property to override name. 

```yml
plugins:
    example:  # if has no "package" property is loaded as express-gateway-plugin-example
        package: company-example # anything that npm can install, like git url etc.
        # parameters required by plugin 
        param1: 'p1'
        # other parameters 

```

### Developing a plugin

REF to boot sequence 
developing guide 

link to example plugin 


### Plugin Structure

An Express Gateway plugin contains entities and allows event subscription. You can think of a plugin as a container of Express Gateway entities that extend the core and event handlers.

A plugin can contain one or more of the following:
* Policies ([Policy Reference](./policies))
* Conditions ([Pipeline and Conditions Reference](./configuration/policies))
* Custom route and middlewares for admin and gateway servers

Also it exposes Event Bus that can be used for subscription 