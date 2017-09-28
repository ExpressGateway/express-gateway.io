---
layout: post
title: "Express Gateway and Kubernetes: Part 1"
date:   2017-09-28 12:00:00 -0400
category: announcements
author: "Al Tsang"
#
# Please remember to update ~/_archives-month, ~/_archives-year
# and ~/_categories with any necessary archive needs
#
---
Running your application in the cloud has never been easier. The technology and tooling has gotten better, the patterns and best practices have been sharpened over years within the era of the web itself.

With the advent of cloud native technologes like Docker, the ability to decompose your once monolithic applications into sustainable microservices has never been more tangible.
<!--excerpt-->

### In Pursuit of the Holy Grail - Cloud Native
Ask yourself this rhetorical question - is there anyone out there who _doesn't_ want faster development of features, easier maintability, less accumulation of technical debt, optimized usage and scaling of compute resources and real portability???

These aren't new ideals or concepts. We saw OpenStack.  Much like SOA, OpenStack was a vendor driven initiative and not a grass roots practictioner and developer driven movement like cloud native.

The formation of the [Cloud Native Computing Foundation][cncf] is exciting because it not only instills the mindset that your application needs to strive toward ideals described above - but also provides the technology and know-how to help attain these ideological benefits.

### Cloud Native = Cloud Choice
One of the things I personally like about the cloud native initiative is that it also implies one other thing - choice.  Choice of who's cloud your on.

Choice is something I'm hearing this more and more. Surprisingly more of our users are not just one one cloud - they're on a couple or even more.

Cloud choice is especially important to our users and our own business because the rising cost of running on Amazon Web Services coupled with proprietary interfaes to proprietary technical infrastructure - is a scary thing.

### Containers, Containers Everywhere - Herding Cats


Every day, we talk with businesses both small and large that are taking the plunge in either a) taking baby steps to segregating out a portion of their application into this new architecture or b) starting a greenfield project with microservices from the start.

Microservices are great, and as we talked about in [our previous post][challenges-of-microservices] - this "style" comes with a set of challenges and tradeoffs. More importantly for APIs - it has a major effect on API Design. Fortunately, thanks to the pioneers who've done microservices for a while now, best practices and technical solutions have come evolved to help with that set of challenges.

One of the most obvious challenges moving to microservices is the sheer number of containerized processes that you have to wrangle that once represented your app.  Containerization is a two edged sword.  The portability and isolation means...well.. that your containers are portable and isolated from each other.

<p align="center">
  <img width="425" height="239" src="../assets/img/eg-k8s-part-1-cat-herding.gif">
</p>

This is where a key piece of cloud native technology has come about - the container orchestrator.

The container orchestrator is the "Pied Piper" of containers.  Its job is quite simple - it helps you get your head around describing, categorizing and grouping your containers in a sane way to help you maintain a cloud first operational runtime.

Without the orchestrator, you would be stuck writing a myriad of Dockerfiles, running them and manually keeping track of...
- what containers are running on what host
- what containers are dependent on other containers
- what containers need to be scaled as a group to handle elasticity
- what containers died and need to be restarted
... and the list goes on and on!

### Enter Kubernetes
Three years ago, there were three competing container orchestrators that bubbled to the top of the list - Mesosphere, Docker Swarm and [Kubernetes][kubernetes].

Funny Side Note:
> I once talked to a CTO who said that he and his and development team looked at Kubernetes and thought it was too "academic".  I wasn't exactly sure what that meant. Do you?
> As a naively understand it - Kubernetes was born of the model and thinking behind what Google calls "the Borg" to run their infrastructure.  Running something as large as Google to me is anything but - academic.

<p align="center">
  <img width="500" height="208" src="../assets/img/eg-k8s-part-1-hermione.gif">
</p>

Fast forward three years later - it's pretty clear what the 800 pound gorilla is in the space because all the cloud providers both old and new, big and small are scrambling to have an offering to run Kubernetes.

### Using Kubernetes for Infrastruture
I hear about a lot of cases where so-and-so development team running their application as a set of microservies and how they are taking giant strides in focusing in on optimizing the core of their business logic and getting their new features and functionality out quicker thanks to these cloud native technologies and applying their lessons learned.

Here's something that there hasn't been a lot of light shed on - Kubernetes is _just as powerful_ for your application infrastructure as your application itself.  Remember your application with it's N-tier architecture?  Everything on the backend - wasn't just one big blob - there were tiers!

Each tier - presentation, facade, middleware, persistence has its own separation of concerns within the architecture of your application.  Similarly, the system architecture of your application also has tiers - the edge, web tier, middlware, persistence and caching squeezed in between all of these.

### Express Gateway on Kubernetes
The API Gateway is a key piece of infrastructure at the web tier. Clients connecting to your backend need to go through this key piece of infrastructure for security, instrumentation and quality of service operations that are critical to the client experience.

As you can imagine - this a key piece of infrastructure that can quickly become a bottleneck in your system architecture.  We knew this all along and we were worried about how to provide a scale and elasticity - enter Kubernetes.

> Using Kubernetes to run Express Gateway is like putting your API management muscle on steroids.

... or how about...

> Using Kubernetes to run Express Gateway is like adding nitro to your API management engine.

How many more cheezy analogies do I need to come up with to add the "!" exclamation point?

This past Tuesday, we had the privilege of co-presenting a webinar on running Express Gateway on Kubernetes in [Joyent Triton Cloud][joyent-triton-cloud]. We really liked Joyent's vision for an open cloud backed by open source with _no vendor lock in_ to proprietary tech. Their perfect cloud provider to showcase and open source gateway that originated and is backed by the community.

The webinar was _very_ well received because we were able to show that ANYONE... could have a cloud agnostic, scalable API management layer in literally seconds.

### Coming Up Next
Now that we've covered why we did this past Tuesday's webinar - stay tuned for the second part of this series for a walkthrough on what we did and just how easy it was to stand up Express Gateway in Kubernetes on Triton AND how easy it is to manage it using Kubernetes resources like ConfigMaps, Deployments, Service Discovery and more!

[challenge-of-microservices]: https://www.lunchbadger.com/microservices-and-api-design/
[kubernetes]: https://kubernetes.io/
[cncf]: https://www.cncf.io/
[joyent-triton-cloud]: https://www.joyent.com/why
