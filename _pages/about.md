---
title: About
permalink: "/about/"
layout: page
---

<section class="page-section-normal">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">
## Introduction

Developing monolithic applications doesn't work. Monolithic applications are being broken down into microservices. These microservices expose the application as set of APIs that can be consumed by anyone.

Microservices and APIs is an architectural style that’s grabbing a lot of attention due an emphasis on sustainable development.

> At the heart of the microservices architecture is the API Gateway.

Express Gateway is a microservices API Gateway built on Express.js.

For a deeper look at microservices and the role of the API Gateway check out [Martin Fowler’s breakdown](https://martinfowler.com/articles/serverless.html) in and the [API gateway pattern](https://microservices.io/patterns/apigateway.html) described on Chris Richardson's site.
</div>
</div>
</div>
</section>
<div class="svg-fix wave-1">{% include wave-1.svg %}</div>
<section class="page-section-blue">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">

## Why Express Gateway?

If you’ve used Node.js, you’ve almost certainly come across Express.js.  Express.js (Express) remains one of the largest, most widely adopted, open source projects in the world.

> Express’ greatest strengths are its simplicity and flexibility

Simplicity means that, as a minimalist, general purpose, framework that is familiar to every Node developer out there you can get started rapidly and continue that velocity throughout the API Development Lifecycle.

There's really nothing _new_ about an API Gateway built on top of Express.  In fact, one of the key reasons why Express Gateway was built was because we heard countless times of folks rolling their own API Gateway to deal with the inflexible and opaque solutions out there. All we did was codify and package it for the community.

We believe that an Express based API Gateway will be a powerful enabler for developers to sustainably build better, faster and more scalable applications.
</div>
</div>
</div>
</section>
<div class="svg-fix wave-2">{% include wave-2.svg %}</div>

<section class="page-section-white">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">
## What exactly *is* Express Gateway?

Express Gateway is a bunch of components which declaratively build around Express to meet the API Gateway use case. Express Gateway's power is harnessed the rich ecosystem around Express middleware.

*Let’s take a closer look underneath the hood...*

</div>
</div>
</div>

<div class="wrapper border-top-blue flex-row flex-center whatiseg with-graphics with-graphics" markdown="1">
<div class="svg-fix svg-about-1 svg-diagram">{% include quickstart/whatiseg.svg %}</div>
<div class="flex-column" markdown="1">
### Express as we know it, today

Within Express is its Router. The Router matches URLs and routes them to modules known as “middleware”.  Each middleware acts on a request coming into Express through the router and passes it onto the next piece of middleware as a chain.  This request, response and “next” flow is the foundation of how Express works and its simplicity is why its so popular.
</div>
</div>
<div class="wrapper border-top-blue flex-row flex-row-reverse with-graphics" markdown="1">

<div class="svg-fix svg-about-2 svg-diagram">{% include quickstart/egcore.svg %}</div>
<div class="wrapper" markdown="1">

### Express Gateway Core
Express Gateway transforms Express into a dynamic runtime engine.  For example - you can easily hardcode routes statically through Express’ API. In Express Gateway, however, those values can continually change and are dynamically injected as parameters without having to alter the underlying code.

Essentially, all of the core components within Express Gateway make Express more dynamic and declarative.
</div>
</div>
<div class="wrapper border-top-blue" markdown="1">
### Core Components

<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column shape-style full-width" markdown="1">
1. <span class="li-main">Centralized Declarative Config</span>
  - Express Gateway centralizes all of the application configuration for the API use case into one YAML(or JSON) file.  Within the YAML file is an easy to understand description of how and what is configured. Express Gateway utilizes this config to run Express as an API Gateway dynamically.

2. <span class="li-main">Consumer and Credentials Management Module</span>
  - Express Gateway comes with a component that registers consumers (users and apps) of APIs hosted by Express Gateway. This component is a highly extensible identity and authorization system out of the box for APIs. It can also be easily integrated with existing IAM service providers and systems of record. Consumers may have multiple credentials types and new credential types can be easily added to the system (e.g. SAML, Kerberos).

3. <span class="li-main">Distributed Persistent Data Store</span>
  - Express Gateway stores application data centrally in a traditional or distributed data store. This component allows the data to be accessed globally and, in turn, developers can build to scale with multiple instances of Express Gateway. The data store can also be used to centralize application configuration across a cluster of Express Gateways.

4. <span class="li-main">Plugin System</span>
  - Express Gateway entities, like policies, pipelines, conditions, and  actions, wrap around Express middleware to make it dynamic.  These entities are bundled as an extension also known as a plugin. Any Express middleware can now be plugged into Express Gateway to take advantage of its dynamic capabilities.
</div>
</div>
</div>
</div>
</section>

<div class="svg-fix wave-1">{% include wave-1.svg %}</div>
<section class="page-section-blue">
<div class="wrapper">
<div class="flex-column infographics" markdown="1">

## How does Express Gateway work?
Now that we’ve described what’s in Express Gateway and how it relates to Express, let’s go over how it works:
<div class="wrapper flex-row with-graphics" markdown="1">
<div class="svg-fix svg-about-3 svg-diagram">{% include quickstart/qs-1.svg %}</div>
1. Express Gateway YAML is read.
2. Config parameters initialize Express and its middleware.
3. A request comes in through an API endpoint and is received by the Router.
4. The Router connects the API endpoint to a pipeline.
5. Within each pipeline is a set of policies.
</div>
<div class="wrapper flex-row with-graphics" markdown="1">

<div class="svg-fix svg-about-4 svg-diagram">{% include How-does-Express-Gateway-Work-Part-2.svg %}</div>

1. Each policy has a set of conditions dynamically injected from the Centralized Config.
2. If a condition is met its correponding action is taken by the Express middleware at the heart of the Express Gateway policy. The request is passed onto the next policy within the pipeline and the process repeats for every policy within the pipeline.
</div>
<div class="wrapper flex-row with-graphics" markdown="1">

<div class="svg-fix svg-about-5 svg-diagram">{% include How-does-Express-Gateway-Work-Part-3.svg %}</div>

1. After all of the policies in the pipeline are passed, the request is usually proxied to an underlying microservice which applies the business logic and sends out the response to the API consumer
2. Policies can act on that response before it's forwarded to the API consumer.
</div>
</div>
</div>
<div class="svg-fix wave-bottom">{% include wave-bottom-2.svg %}</div>

</section>
