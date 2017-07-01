---
layout: documentation
title: FAQ
permalink: /faq/

---

## Express Gateway FAQ

### Why did we build Express Gateway?

Because everyone was already doing so  rolling their own static version.  One of the leading use cases for using Express and it’s rich ecosystem of middleware was to use it to build and manage APIs.  For building APIs - be sure to check out LunchBadger and LoopBack (a service and OSS framework for buiding APIs powered on top of Express)

### How does it work?

A typical Express Gateway setup is made of two main components:
* Express and Express middleware
* JSON config files that are used parameterize the middleware dynamically

A typical Express Gateway  installation can be summed up with the following picture:

### What is a pipeline?

A pipeline is a set of policies that are chained together in a specific for processing API requests and their corresponding responses

### What is a policy?

A policy is a conditional action and a set of parameters that intercepts the API request or response through Express middleware to do some sort of processing.

### Which datastores are supported?

Express Gateway config files are easy to modify and maintain as flat files in the `/config` directory.
Note: in the future Express Gateway configuration will be able to be stored in a distributed datastore like Redis

### How can I add authentication to a microservice/API?

Some placeholder text

### Can the Express Gateway run clustered?

Not yet. The roadmap has plans to add distributed datastore support. Once we do so, we’ll be adding in the capability to cluster Express Gateway instances horizontally.

### Where can I get help?

You can read the official documentation or ask any question to the community and the core mantainers on our official chat on Gitter.
