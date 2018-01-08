---
layout: doc-section
title: FAQ
doc-order: 30.0
---

### Why did we build Express Gateway?

Because everyone was already doing so - rolling their own static version.  One of the leading use cases for using
Express and it’s rich ecosystem of middleware was to use it to build and manage APIs.

### How does it work?

A typical Express Gateway setup is made of two main components:
* Express and Express middleware
* YAML/JSON based config files that are used parameterize the middleware dynamically

### What is a pipeline?

A pipeline is a set of policies that are chained together in a specific for processing API requests and their
corresponding responses

### What is a policy?

A policy is a conditional action and a set of parameters that intercepts the API request or response through Express
middleware to do some sort of processing.

### Which data stores are supported?

Express Gateway currently supports Redis as both its primary and distributed data store.

### Where are the config files?

Express Gateway config files are easy to modify and maintain as flat files in the `/config` directory.

### How can I add authentication to a microservice/API?

Express Gateway has many authentication and authorization policies:

* OAuth 2.0
* Basic Authorization
* Key Authorization

and more on the roadmap coming soon!

To utilize these policies, you declare them as the first policy within your pipeline that has the API you are trying
to protect.

### Can the Express Gateway run clustered?

Not fully. Express Gateway can run clustered, but not all capabilities are cluster aware. For example, there are no
global counters. On the other hand, given it utilizes Redis as a distributed data store, all application data can be
namespaced globally across all Express Gateway instances.
We're working on making the config the same way. Once we do so, we’ll be adding in the capability to cluster Express
Gateway instances horizontally.

### Can I easily deploy a Gateway instance on the web without having to set up my own server or pay for it?

Yes! Express Gateway is a Javascript application running on Node, so you can leverage any hosted system to run a live
instance.

[Glitch](https://glitch.com) is one of those. It lets you deploy a gateway instance in seconds for free. You can find
a live example [here](https://glitch.com/edit/#!/express-gateway-test)

Note: Glitch is _usually_ listening on port `3000`. However, this port is passed by an _environment variable_, so it
could differ. As Express Gateway cannot use environment variables on configuration files yet, you'll need to discover
the port first, and then hard code it into the `gateway.config.yml` file.

### Where can I get help?

Express Gateway is a community driven and supported project. Check out the resources section of the website for more
information on how to engage.
