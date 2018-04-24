---
title: Service Mesh, Service Discovery and API Gateways
date: 2018-04-24 07:04:00 Z
categories:
- technology
tags:
- How to build microservices
- Service Mesh
- What is a Service Mesh?
- Why is a service mesh important?
- Monolith architecture and service mesh
- service to service communication
- What is an API Gateway
layout: post
---

We have seen through multiple articles how an API Gateway can help you in the difficult task of providing an uniform API regardless of the underlying set of microservices. However, we haven't been exploring another set of problems that arise in case you want to go with such architecture.
<!--excerpt-->

## Let's start with Service to Service communication

### Case 1: How about Monolithic applications?

Even in a monolithic application, you probably have some _service_ concepts, such as `User` service, `Invoicing` service and so on; they are basically isolated classes/libraries that live in the same codebase.

Now — the way you make multiple services communicate is most likely through a *function call*. 

Suppose you receive a request to get all the invoices for a particular user: you have an API Gateway checking the authentication/authorization as well as routing the request to your application. The request then gets routed by your framework where the **Invoice** service will probably need to call the **User** service in order to get the user related informations. All this happened within your monolith boundary.

### Case 2: What about Microservices?

In case you're in a service architecture it is possible that, according to your boundary strategy, the **User** and **Invoice** services are two separate entities, so you can't make them communicate through a simple function call, but you'll need to use the interface the services are providing: you need to make an API Call.

In this case, there are some additional considerations to keep in mind:

* The network is now part of the game, with all its complexity and unreliability. We often make some assumptions that aren't true:

  * The network is reliable
  * Latency is zero
  * Bandwidth is infinite
  * The network is secure
  * Topology doesn’t change
  * There is one administrator
  * Transport cost is zero
  * The network is homogeneous

* A service might be down for some reason, so it won't be able to fulfill the request
* In case you have multiple service replicas, how do you know what's the right service instance to contact?
* How can a service announce to the cluster that a new replica has been deployed?

The last two points actually point toward the _service discovery_ topic

## What is Service Discovery?

Service discovery is the process of automatically finding what instances of service fulfil a given query. You will invoke some service discovery process which will return a list of suitable servers.

In more distributed environments, the task starts to get more complex, and services that previously could blindly trust on their DNS lookups to find dependencies now have to deal with things like client-side load-balancing, multiple different environments (e.g. staging vs. production), geographically distributed servers, etc.

If before all you needed was a single line of code to resolve hostnames, now your services need many lines of boilerplate to deal with various corner cases introduced by higher distribution.


## A solution: client libraries

The first organisations building systems based on microservices decided to handle all this added complexity directly in the service's code. This means that the responsibility of dealing with the requirements listed above was left to the engineer writing the services.

The following step was to tear out this code into a shared client library that could be used across multiple services.

While this can solve the problem, it is very easy to mess it up. Think about making sure that all the services have the latest client version installed: this requires a new deployment of each single service. Think also to the fact you might need to write the same client multiple times, because your stack has multiple programming languages.

It would be highly desirable to extract the microservices features required by massively distributed services into an underlying platform we don't have to care about.

It turns out this has already been accomplished. Today, people write very sophisticated applications and services using higher level protocols like HTTP without even thinking about how TCP controls the packets on their network.

This situation is what we need for microservices, where engineers working on services can focus on their business logic and avoid wasting time in writing their own services infrastructure code or managing libraries and frameworks across the whole fleet.

Similarly to what we saw in the networking stack, it would be highly desirable to extract the features required by massively distributed services into an underlying platform.

## What is a Service Mesh solution?

A service mesh solution is a dedicated infrastructure layer for handling service-to-service communication, responsible for the reliable delivery of requests through the complex topology of services that comprise a cloud application.

A service mesh solution typically dynamic service discovery, load balancing, TLS termination, HTTP/2 & gRPC proxying, circuit breakers, health checks, staged rollouts with %-based traffic split, fault injection, and rich metrics.

There are a number of solutions out there on the web. Worth mentioning are [Istio](https://istio.io), [Conduit](https://conduit.io/) and [Linkerd](https://linkerd.io/)

They all provide a set of common and unique features, but they all share the basic implementation principle.

The service mesh is typically implemented as an array of lightweight network proxies that are deployed alongside application code, without the application needing to be aware. This proxy is then responsible of routing the request to the right service instance, making sure to retry the request for a number of times if it fails, but also ensuring limited timeouts, enablig circuit breaker when it makes sense and so on.

## What about Kubernetes?

How does this solution behave in a Kubernetes Cluster?

It turns out every node in a Kubernetes cluster runs a `kube-proxy`. `kube-proxy` is responsible for implementing a form of virtual IP for Services and, depending on the configuration mode, it can also listen to all the incoming and outcoming connections to each pod in your cluster.

Moreover, a Kubernetes service has as well an associated array of endpoints, representing all the pods associated with that service.

Basically Kubernetes is offering the right primitives to implement a service mesh solution and basic service discovery mechanism — but we still need an high level solution to handle all the use cases accordingly.

[Istio](https://github.com/istio/istio), for example, is leveraging low level primitives to offer a service mesh solution in your cluster.

## Express Gateway plays nicely with service mesh solutions.

We've seen in previous articles how to put Express Gateway as a `DaemonSet` in Kubernetes in order to put an edge gate in the cluster.

Express Gateway can also be deployed per each service using a sidecar container (this pattern is usually called microgateway) so you can handle different concerns at HTTP level rather than TCP/UPD level.  

**What does this actually mean?**

As you may already know, API gateways protect, enrich, and control access to API services. Developers can use API Gateways to architect applications in a way that provides clear separation between the business and security logic. 

So, think of it this way: while API Gateways expose API/Edge services, a service mesh serves an inter-service communication infrastructure with no real business notion of your solution. 

There are some overlapping capabilities. However; the real important thing to remember is that API Gateways, like Express Gateway, can serve to provide management of your APIs with inter-service communication of an API Gateway or it's also possible to use an API Gateway to can call downstream services via service mesh by sending application network functions to service mesh. 

## Moving On
If you're already working with service mesh solutions and have questions about how you can put an API Gateway to work, [hit us up on our Gitter channel](https://gitter.im/ExpressGateway/express-gateway). We are always very interested to learn more about use cases for open source API Gateways. 
