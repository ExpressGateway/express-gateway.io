---
title: 'Express Gateway and Kubernetes: Part 1'
date: 2017-09-28 16:00:00 Z
categories:
- announcements
layout: post
author: Al Tsang
---

It's no secret that cloud native applications are designed to maximize resilience through predictable behaviors.  Several factors, including API exposure and application design, play key roles in the successful deployment of cloud native applications.
For instance, API exposure and providing internal or external access via standardized methods can fundamentally change your growth trajectory. You can create new services, integrations and expose customer insights.
As an important area of growth, designing your application also plays a critical role. Are you designing with microservices in mind? Breaking down monolithic applications with containers? For example, cloud native technologies like Docker give you the ability to decompose your once monolithic applications into sustainable microservices.  If you're building the next generation of cloud native applications, where what does that roadmap look like?
Let's break it down.
<!--excerpt-->
### Herding the Container Cats
Microservices "style" comes with a set of challenges and has a major effect on application design including the sheer number of containerized processes that you have to wrangle.
<p align="center">
  <img width="425" height="239" src="../assets/img/eg-k8s-part-1-cat-herding.gif">
</p>
By now, you have noticed that containerization is a two edged sword - portability and isolation. Everything is portable, but it's also isolated.
In order to solve this,  there is a key piece of cloud native technology called the container orchestrator.
The container orchestrator is the Pied Piper of containers.  Its job is quite simple - it helps you describe, categorize and group your containers in a sane way to help you maintain a cloud first operational runtime.
Without the orchestrator, you would be stuck writing a myriad of Dockerfiles, running them and manually keeping track of:
 - what containers are running on what host
 - what containers are dependent on other containers
 - what containers need to be scaled as a group to handle elasticity
 - what containers died and need to be restarted

... and the list goes on and on!
### Enter Kubernetes
Three years ago, there were three top competing container orchestrators: Mesosphere, Docker Swarm and [Kubernetes][kubernetes].
Funny Side Note:
> I once talked to a CTO who said that he and his and development team looked at Kubernetes and thought it was too "academic".  I wasn't exactly sure what that meant. Do you?
> As a naively understand it - Kubernetes was born of the model and thinking behind what Google calls "the Borg" to run their infrastructure.  Running something as large as Google to me is anything but - academic.
<p align="center">
  <img width="500" height="208" src="../assets/img/eg-k8s-part-1-hermione.gif">
</p>
It's pretty clear what the 800 pound gorilla is. All the cloud providers are scrambling to have an offering running Kubernetes.
### Kubernetes as Infrastruture
Everyday we talk to practitioners, like you, who share their experiences with developing cloud native applications. It's clear that cloud native technologies play an important role in optimizing the core business logic, deploying new features, and iterating faster.
Kubernetes is _just as powerful_ for your application infrastructure as your application itself.
Remember your application with it's N-tier architecture?  Everything on the backend - wasn't just one big code blob™ - there were tiers! Each tier (presentation, facade, middleware, persistence) has its own separation of concerns within the architecture of your application.  Similarly, the system architecture of your application also has tiers edge, web tier, middleware, persistence and caching (squeezed in among all of them).
The API Gateway is a key piece of infrastructure at the web tier.
### Express Gateway on Kubernetes
Express Gateway, an open source API gateway built entirely on Express.js, coupled with Kubernetes gives you a powerful combination of open source tooling. Clients connecting to your backend need to go through the API Gateway for security, instrumentation and quality of service operations that are critical to the client experience. Conversely, this key piece of infrastructure that can quickly become a bottleneck in your system architecture.
We knew this all along and we were worried about how to provide a scale and elasticity, so this is why combining Kubernetes and Express Gateway makes so much sense.
We had the privilege of presenting a webinar on how to run Express Gateway on Kubernetes in [Joyent Triton Cloud][joyent-triton-cloud]. As cosponsors of Express Gateway, we loved Joyent's vision for an open cloud backed by open source with _no vendor lock in_ to proprietary tech. As such, they're the perfect cloud provider to showcase and open source API gateway that originated and is backed by the community.
In our demo, we demonstrated how to deploy a cloud agnostic, scalable API management layer in seconds.
### Coming Up Next - Demo Tear Down
Stay tuned for the second part of this series where we walkthrough a step by step demo on how to deploy Express Gateway in Kubernetes on Triton manage it using Kubernetes resources like ConfigMaps, Deployments, Service Discovery. We'll provide code snippets, advice and answer the tough questions.

[challenges-of-microservices]: https://www.lunchbadger.com/microservices-and-api-design/
[kubernetes]: https://kubernetes.io/
[cncf]: https://www.cncf.io/
[joyent-triton-cloud]: https://www.joyent.com/why
