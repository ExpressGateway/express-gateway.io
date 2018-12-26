---
title: Switch Media Fulfills Complex Requirements through Express Gateway
permalink: "/case-studies/switchmedia/"
layout: case-study-detail
logo: switchmedia
---

### Background

[Switch Media][switchmedia], is a leading professional services provider for OTT, IPTV and enterprise video content solutions in Australia. In addition to a suite of innovative products, Switch Media works closely with their clients to develop end-to-end solutions that open up new lines of revenue and growth for their customers.

### Solving Tough Problems in Tech

We caught up with Szabolcs Palmer, a Software Architect at Switch Media. Szabolcs is a software development veteran with more than ten years of experience as a developer, Chief Technology Officer and similar hands-on roles.

A core problem throughout his experience in the field is providing one or more multi-tenanted services in a consumer-agnostic way, while having the possibility of introducing consumer-specific customizations.

>The two terms are somewhat contradictory, so resolving this requirement in a clean way is only possible if they are separated on service layer level. Express Gateway is a perfect candidate for this use-case, since it provides enough flexibility to be able to each underlying agnostic API ideally via pure configuration, while it allows the use of custom plugins which can take care of the more complex use-cases.


### Why Switch Media Chose Express Gateway as their Open Source API Gateway

During the decision making process, the Switch Media team evaluated multiple solutions for an API Gateway.

There were multiple reasons why Express Gateway was selected. Here are three key reasons why the team chose Express Gateway:

1. Built on a Node JS platform. Node.js already has a request handling implementation which favours fulfilling the role of an API Gateway, and also has a smaller footprint than other existing ecosystems.
2. The Express Gateway ecosystem. An Express Gateway container can easily be created in any continuous delivery system and can be deployed with ease, while other solutions were either not easily installable in a container, or needed multiple services up and running in order to operate properly.
3. [Plugin Framework][plugin-framework]. The flexible plugin system makes it possible to cater for any kind of unique needs easily, while keeping the common bits agnostic.

### Conclusion

Switch Media joined the Express Gateway Community as early adopters willing to investigate and put Express Gateway 1.2.0 to work. Since this initial trial, the Express Gateway community has implemented so many new features which have expanded the use case for Express Gateway. As more features become available in Express Gateway, the easier it is to modularize the configuration. This allows for multiple gateways to use various underlying services in any combination needed.

[switchmedia]: https://www.switch.tv
[plugin-framework]: {{ site.baseurl }}{% link docs/plugins/index.md %}
