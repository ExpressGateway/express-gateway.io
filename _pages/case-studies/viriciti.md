---
title: "ViriCiti Goes Global With Express Gateway in Production"
permalink: /case-studies/viriciti/
layout: case-study
logo: viriciti
---

### Background

[ViriCiti][viriciti] develops cloud-based energy management software to improve the operation of electric buses and
trucks for EV operators and OEMs. With up to millisecond level accuracy, ViriCiti online energy management represents a
paradigm shift allowing their customers to plan energy consumption in advance. By providing in depth analysis and
monitoring, ViriCiti allows the driver to focus on driving, while the ViriCiti energy management platform ensures
they have enough energy to reach their destination.

ViriCiti is on a mission to be able to influence and adapt vehicle behaviour from the cloud to make vehicles more
efficient, waste less energy with more ambitious route planning while simultaneously maintaining reliability.

Currently, located in Amsterdam, ViriCiti has gained increasing traction in Europe
and is actively expanding globally.

### The Challenge

Throughout their expansion and ongoing development, the ViriCiti engineering team were in the midst of researching
API Gateways. With the bulk of their projects already on Express.js, Express Gateway, an open source API Gateway
built on Express.js seemed like a natural fit.

However; it was time to put that assumption to the test.

So, ViriCiti compared what it takes to implement popular open source API Gateways like Express Gateway, Kong and Tyk.

### The solution

After incorporating all three of these open source projects into a proof of concept, the team concluded that the plugin
framework provided by Express Gateway was perfect for their use case which involved a lot more than 'just typical HTTP
requests'.

In fact, one of the most important requirements was that the API Gateway is fully customizable. ViriCiti invested
significant resources into building multiple custom plugins to handle everything from authentication logic, logging
with [Prometheus][prometheus] and they needed a solution that could make them more agile without the headache of
starting over.

> "One of the most important qualities about Express Gateway was that it is fully customizable. We built custom plugins
and didn’t want to start over. Express Gateway gave us the flexibility we needed."

The cherry on the top was the ability of easily deploy Express Gateway in any cloud environment. The team decided to
deploy Express Gateway as a Docker containers, using [Kubernetes][kubernetes] as orchestrator.

### The impact

At the conclusion of the pilot, the team determined chose Express Gateway as their long term solution. Kong,
Express Gateway and Tyk had unique benefits, but ViriCiti’s current framework and almost all it's microservices are
built in Node.js. Because Express Gateway is built on Express.js, a minimalistic framework for Node.js, it was easier
to include as part of the tech stack that could scale with their ever growing company.

[viriciti]: https://viriciti.com
[prometheus]: https://prometheus.io/
[kubernetes]: https://kubernetes.io/
