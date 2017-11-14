---
layout: doc-section
title: FAQ
doc-order: 30.0
---

### Why did we build Express Gateway?

Because everyone was already doing so - rolling their own static version.  One of the leading use cases for using Express and it’s rich ecosystem of middleware was to use it to build and manage APIs.

### How does it work?

A typical Express Gateway setup is made of two main components:
* Express and Express middleware
* YAML/JSON based config files that are used parameterize the middleware dynamically

### What is a pipeline?

A pipeline is a set of policies that are chained together in a specific for processing API requests and their corresponding responses

### What is a policy?

A policy is a conditional action and a set of parameters that intercepts the API request or response through Express middleware to do some sort of processing.

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

To utilize these policies, you declare them as the first policy within your pipeline that has the API you are trying to protect.

### Can the Express Gateway run clustered?

Not yet. Expres Gateway utilizes Redis as a distributed datastoret. All application data can be namespaced globally across all Express Gateway instances.  We're working on making the config the same way. Once we do so, we’ll be adding in the capability to cluster Express Gateway instances horizontally.

### Where can I get help?

Express Gateway is a community driven and supported project. Check out the resources section of the website for more information on how to engage.
