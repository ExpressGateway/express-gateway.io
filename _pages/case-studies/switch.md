---
title: Switch Media serves 50k requests per minute with Express Gateway
permalink: /case-studies/switch/
layout: case-study-detail
logo: switch
---

### Background

[Switch Media][switch] is a leading professional services provider for OTT, IPTV and enterprise video content solutions in Australia. In addition to a suite of innovative products, Switch Media works closely with their clients to develop end-to-end solutions that open up new lines of revenue and growth for their customers.

Switch Media joined the Express Gateway Community as early adopters willing to investigate and put Express Gateway [1.2.0][eg-1-2-0] to work. Since this initial trial, the Express Gateway community has implemented so many new features which have expanded the use case for Express Gateway.

### Why Switch Media Cares About Solving Tough Problems In Tech

We caught up with Szabolcs Palmer, a Software Architect at [Switch Media][switch]. Szabolcs is a software development veteran with more than ten years of experience as a developer, Chief Technology Officer and similar hands-on roles.

A core problem throughout his experience in the field is providing one or more multi-tenanted services in a consumer-agnostic way, while having the possibility of introducing consumer-specific customizations.

“The two terms are somewhat contradictory, so resolving this requirement in a clean way is only possible if they are separated on service layer level” .

> ”Express Gateway is a perfect candidate for this use-case, since it provides enough flexibility to be able to each underlying agnostic API ideally via pure configuration, while it allows the use of custom plugins which can take care of the more complex use-cases.”

### Why Switch Media chose Express Gateway As Their Open Source API Gateway

During the evaluation of Express Gateway, the Switch Media team evaluated multiple solutions.

One reason was the Node JS platform. Node.js already has a request handling implementation which favours fulfilling the role of an API Gateway, and also has a smaller footprint than other existing ecosystems.

The second reason was the Express Gateway ecosystem. An Express Gateway container can easily be created in any continuous delivery system and can be deployed with ease, while other solutions were either not easily installable in a container, or needed multiple services up and running in order to operate properly.

Last but not least, the flexible plugin system makes it possible to cater for any kind of unique needs easily, while keeping the common bits agnostic.

### Switch Media Built a Custom OpenAPI 3 Plugin for Express Gateway to Add Velocity to their Development Cycles

As an open source project, Express Gateway’s community is the heart and soul of this project. Switch Media Engineering team needed a plugin with an OpenAPI 3 specification to create a dummy responder. This dummy responder would be used to allow front-end teams to develop a user interface while simultaneously allowing their backend teams to develop the corresponding APIs.

So, they wrote a lightweight custom plugin which generated an Express.js routing - this ,however, unfortunately rendered all other policy configuration useless since as soon as you start tampering with the Express app on this level, the Gateway stops processing the policies in the configuration.

### Conclusion

As more features become available in Express Gateway, the easier it is to modularise the configuration. This allows for multiple gateways to use various underlying services in any combination needed.

[switch]: https://switch.tv
[eg-1-2-0]: https://github.com/ExpressGateway/express-gateway/releases/tag/v1.2.0
