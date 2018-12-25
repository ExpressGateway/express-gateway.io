---
title: Coozy Innovates with Microservices Using Express Gateway
permalink: "/case-studies/coozzy/"
layout: case-study-detail
logo: coozzy
---

### Background

[Coozzy AG](https://coozzy.ch/) was founded 2016 with the goal to digitalize the real estate market. Coozzy’s platform allows landlords and caretakers to find their desired tenant. In contrast to other offerings, Coozzy is also used by tenants once they find their ideal flat or house. A key feature within Coozzy’s platform is the automation of processes between landlords and tenants. Coozzy’s unique capabilities include a simple chat interface with communications and interactions including:

- easily managing and signing contracts
- reporting and resolving damages of property
- connecting a tenant with other tenants in the same property

### The Challenge

As a startup, Coozzy experienced hypergrowth. As their users grew, Coozzy and its platform needed to grow as well in features and scale to keep up with demand.

To keep up with product demands and to utilize the talent and knowledge of each team member to their fullest, the team decided to develop many microservices in different languages aside from maintaining their single big monolith.


### Gateway Evaluation

The team searched and compared several different solutions that can route traffic and perform common gateway functionality like authentication. Other found solutions were Kong, Traefik and a custom implementation. The Enterprise version of Kong was very expensive and many enterprise features are only available in the enterprise version. Traefik did not support many authentication methods (except for forwarding authentication to another service).  A custom solution would require a lot of time to implement even basic features.


### The Solution

Coozzy is running a Kubernetes cluster with HAProxy for SSL termination in front of the cluster to have a routing mesh.  HAProxy routes everything to Express Gateway instances that form the point of ingress into the cluster.

The main purpose of the gateway is to route inbound traffic to the correct microservices. This is especially useful for development, because each microservices gets its own DNS entry on staging and production environment. Express Gateway routes traffic according to the subdomain.

When developing microservice A locally that depends on microservice B, the developer can simply use the current staging version B by referencing it with its subdomain. When introducing a new microservice the team only has to add simple rules to the gateway configuration and everything is setup quickly and dynamically.


### The Impact

The Coozzy team continued leveraging Express Gateway and its capabilities by utilizing the [CORS][cors] and [JWT][jwt] policy. The latter two became critical since recently rolling out their internal admin panel to production which is a client-side application. The admin panel makes several CORS requests to microservices/endpoints that are protected with authentication through JWT tokens. Further integration of authentication with Auth0 was also extremely easy.

In addition, the team utilized the [Terminate][terminate] policy as an effective way to block select endpoints of a microservice from external access, because it should only be used by cluster internal communication.

The simplicity of Express Gateway's [configuration file][gateway-config-yml] is powerful, compared to Kong and Traefik. The configuration can easily be versioned with git and is truly cloud native and cloud ready.

The Coozzy platform continues to grow and Express Gateway is utilized to quickly build and expose microservices while allowing the team to innovate quickly to keep up with opportunity and demand.

[coozzy]: https://coozzy.ch
[cors]: {{ site.baseurl }}{% link docs/policies/cors.md %}
[jwt]: {{ site.baseurl }}{% link docs/policies/jwt.md %}
[terminate]: {{ site.baseurl }}{% link docs/policies/terminate.md %}
[gateway-config-yml]: {{ site.baseurl }}{% link docs/configuration/index.md %}
