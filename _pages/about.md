---
layout: page
title: About
permalink: /about/
---

<section class="page-section-normal">
<div class="wrapper" markdown="1">
##### Introduction

APIs and microservices are an architectural style that’s grabbing a lot of attention due an emphasis on sustainable development. There is no silver bullet to achieving the paradigm and benefits described in this architectural style.

> At the heart of the microservices architecture is the API Gateway.

Express Gateway is a microservices API Gateway built on Express.js.

For a deeper looks at microservices and the role of the API Gateway within microservices check out Martin Fowler’s breakdown.
</div>
</section>

<section class="page-section-blue">
<div class="wrapper" markdown="1">

##### Why Express Gateway?

If you’ve used Node.js, you’ve almost certainly come across Express.js.  Express.js (Express) remains the largest, most widely adopted, open source project in the Node ecosystem. As an added advantage, Express is maintained by seasoned industry veterans. Bugs get fixed, issues get addressed and as more developers discover Express, we believe it could present a competitive asset in the future.

> Express’ greatest strengths are its simplicity and flexibility

Simplicity means that, as a minimalist, general purpose, framework that is familiar to every Node developer out there you can get started rapidly and continue that velocity throughout the API Development Lifecycle.

By being flexible, an Express based API Gateway will help the entire ecosystem take a leap forward by accelerating ease of use and iteration. Whether you roll your own or use out of the box solutions, there is a baseline of specific functionality that applications share. By addressing both the shared and unique development aspects, we believe that an Express based API Gateway will be a powerful tool to empower developers to sustainably build better, faster and more scalable applications.
</div>
</section>

<section class="page-section-white">
<div class="wrapper" markdown="1">

##### What exactly is Express Gateway?

Express based API Gateway (Express Gateway) is a bunch of components which declaratively build around Express to meet the API Gateway use case. The Express Gateway harnesses the simplicity and the rich technology ecosystem around Express middleware.

*Let’s take a closer look underneath the hood...*

###### Express as we know it, today

The main component within Express is its Router. The Router matches URLs and routes them to modules known as “middleware”.  The large ecosystem of Express middleware makes it easier for developers to quickly, easily and securely connect their components. Each module acts on a request coming into Express through the router. Then it does some logic and passes it onto the next piece of middleware as a chain.  This request, response and “next” flow is the foundation.

##### Express Gateway Core

Express Gateway uses Express dynamically as a runtime engine.  This is easier than hardcoding routes, for example, statically through Express’ API. We’re passing those values as parameters.

Additionally, we’ve added core components within Express Gateway to make Express more dynamic and declarative.

##### Centralized Declarative Config (YAML/JSON)

Express Gateway centralizes all of the app configuration for the API use case into one YAML file.  Within the YAML file is an easy to understand, simple and straightforward description of how and what is configured. Through its core components and middleware, Express Gateway is configured with Express to behave like an API Gateway.   

Additionally, we’ve added the following components:

1. Persistent Data Store:

* Express Gateway stores application data which can live centrally or through a distributed network. This allows the data to be accessed globally and, in turn, developers can build to scale with multiple instances of Express Gateway.

2. Consumer Management Module:

* The consumer management module is a foundational component that describes the consumers (users and apps) of APIs hosted by Express Gateway. Express Gateway serves up APIs and is positioned at the top layer of your microservices. This module serves primarily as an identity and authorization system.

3. Plugin System:

* Express Gateway entities, like policies, pipelines, conditions, and actions, wrap around Express and make it dynamic.  These entities bundled with Express middleware create an extension also known as a plugin.
</div>
</section>

<section class="page-section-primary">
<div class="wrapper" markdown="1">

#### How does Express Gateway work? <span>Now that we’ve described what’s in Express Gateway and how it relates to Express, let’s go over how it works:</span>

Express Gateway YAML is read.
​
Config parameters initialize Express and its middleware.
​
A request comes in through an API endpoint and is received by the Router.
​
The Router connects the API endpoint to a pipeline.
​
Within each pipeline is a set of policies.

Each policy has a set of conditions dynamically injected from the Centralized Config.

If the set of conditions are met, a new process begins. An action is taken by the Express middleware at the heart of the Express Gateway policy. The request is passed onto the next policy within the pipeline and the process repeats for every policy within the pipeline.


After all of the policies in the pipeline are passed, the request is proxied to an underlying microservice which applies the business logic and sends out the response to the API consumer .
​
Policies can act on that response before it's forwarded to the API consumer.
</div>
</section>
