---
title: Plugin Framework Overview and Plan
description: Express Gateway plugins extend Express Gateway and allow ANY Express middleware to be taken and rolled into Express Gateway.
date: 2017-09-07 16:00:00 Z
categories:
- announcements
layout: post
author: Al Tsang
---

One of the key reason why we built Express Gateway on ExpressJS is because of an existing rich ecosystem of 3,000+ middleware modules that is already being used out of the box with Express.  Not all Express modules are relevant to the API gateway use case - but many are. Said a different way - almost all API gateway use cases can be covered by utilizing an existing Express module.
<!--excerpt-->

In fact, that’s exactly what happened - all initial features supported by Express Gateway were entirely built using existing Express middleware as a starting point.

Doing this has realized the following benefits:
not having to start from scratch - speeding up to time to value
building on something that is already familiar in the community - simplicity through familiarity

### Express Gateway Plugins
Express Gateway Plugins extend Express Gateway.  They are the vehicle by which ANY Express middleware can be taken and rolled into Express Gateway.

At the time of releasing Express Gateway, all features were bundled as part of the core offering.  Instead of refactoring the features into separate plugins. We built the plugin foundation first and decided to bundle everything as part of the core along with the the plugin foundation to get the Express Gateway out sooner.

### Plugin Extension Points
The Plugin Framework will support the following extension points for Express Gateway entities:
* Conditions
* Policies
* Routes
* Services + DAO for supporting database other than redis
* Credential types
* Models
* Admin REST API routes
* HTTP and HTTPS servers routes
* HTTP and HTTPS servers custom events (like upgrade for websockets)
* CLI

As you can see from above - the plugin capabilities are extensive - and it's taking the team time to doing it right.

Below is an overview of the iterative development planning going into the Express Gateway Plugin Framework as well as future plugins.

### Iteration 1: A Plugin Example
In the first iteration, the team is going to do complete three things:

* enable the base plugin framework within Express Gateway
* enable extension points for the first three entities: conditions, policies and routes
* provide a reference example of a plugin (express-gateway-plugin-example) that the plugin framework will be able to install to illustrate the mechanics of how a plugin extends Express Gateway
* provide a reference example walkthrough with new Express policy - express-gateway-plugin-rewrite

The plugin framework will allow Express middleware to be incorporated into Express Gateway and take advantage of existing services, models and metadata.

### Iteration 2: More Extension Points
At this point, plugins can be installed that utilize existing Express Gateway entities. The next iteration will extend the plugin framework to address the next three extension points:
* new services
* new credential types
* new models
* CLI (additional Yeoman generators)

By enabling these extension points, more complex plugins can add functionality and data that is not included as part of the EG core.

### Iteration 3: Real Middleware Plugin Example
After the community has seen the reference example for a plugin, the team will take an existing Express middleware that has been highly sought after - JWT Authentication and chronicle a “how to” of taking a middleware and transforming it into an Express Gateway plugin.

### Wrapping Up
Have an Express middleware that you'd like to see "plugged" into Express Gateway to take advantage of it dynamically? [Come join us](https://www.express-gateway.io/resources/#community) - we're looking for contributors and could use all the help we can get!

_Originally posted on [www.lunchbadger.com](https://www.lunchbadger.com)._


