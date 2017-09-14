---
layout: doc-section
title:  "Boot Sequence"
doc-order: 20.10
---

The following depiction provides a high level overview of the initializaiton and bootstrap process within Express Gateway and its extension points made possible through plugins.

Note: the plugin framework described here is coming in the `1.2.0` release

<img src="../../assets/img/boot-sequence-eg-diagram.png" />

## Initial phase
#### Config Loading
Express Gateway loads config files (gateway.config.yml, system.config.yml etc).
#### Plugin registration 
Based on “plugins” section in [system.config.yml]({{ site.baseurl}} {% link docs/configuration/system.config.yml/index.md %}) Express Gateway builds a list of plugins to load.

Each plugins it loaded using the Node.JS `require` function.

The actual require statement is `require('plugin-name')(pluginContext)`.
As the result Express Gateway will know about all extensions (policies, conditions etc.) plugin provides

Plugins provide a list of contents through the `PluginContext`. 

*Note:* At this stage no policies or conditions or middlewares are executed. As well as there are no http servers that can accept connections. Express Gateway is just collecting information about extensions.

## Gateway initialization 
#### Gateway ExpressJS server initialize
Creates ExpressJS instance that will handle all requests to Express Gateway
#### Loading extensions for Gateway
Conditions, Policies, Routes and Middlewares registered in the system have now been initialized and can be used during request processing.

For example:
- Routes and Middlewares are mounted onto ExpressJS Gateway application.
- Conditions and Policies are registered in the pipeline engine

#### Pipeline engine initialization
All defined pipelines are now transformed into ExpressJS routes and registered in ExpressJS Gateway application. 
#### Gateway Server start
Finally ExpressJS applications is starting and is exposed by 2 node.js servers: HTTP and HTTPS. Express Gateway start listening on configured ports. 
#### Events  
- `http-ready` - emitted once HTTP server starts listening on port 
- `https-ready` - emitted once HTTPS server starts listening on port 

## Admin API initialization 
#### Admin ExpressJS server initialize
Creates ExpressJS application that will handle all requests to Express Gateway Admin API. 
#### Loading extensions for Admin API
Admin Routes and middlewares registered in the system are now initialized and can be used during request processing. 
#### Admin Server start
Admin ExpressJS application is now exposed by node.js servers and start listening on configured port. Admin API is now ready to process requests
#### Events  
- `admin-ready` - emitted once Admin API server starts listening on the port 
