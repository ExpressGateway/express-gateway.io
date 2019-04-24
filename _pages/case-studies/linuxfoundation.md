---
title: Linux Foundation Rolls Out New Digital Services Leveraging Express Gateway
description: The Linux Foundation evaluated Kong, Amazon API Gateway and Express Gateway when they needed to build a complex identity and authorization system. Guess who won?
image: /assets/img/linux-foundation-square.png
permalink: "/case-studies/linuxfoundation/"
layout: case-study-detail
logo: linux-foundation
---

### Background

The [Linux Foundation][linux-foundation] is a major non-profit consortium of many open source projects including [Linux][linux], [Kubernetes][kubernetes], [Node.js][nodejs] as well as their respective project foundations such as [Cloud Native Computing Foundation][cncf], [OpenJS Foundation][openjs], etc.  The Linux Foundation has grown tremendously and to better support its members and the open source community, it has begun a modernization exercise to build out its offerings as a platform of digital services.

### The Challenge

The Linux Foundation needed to build a complex identity and authorization system to front the myriad of supporting systems that make up its platform along with new microservices and serverless functions that will form the basis of new applications as well.

The system would need to be able to passthrough authorization and other artifacts to downstream systems through an API gateway so that member users can authenticate through a centralized SSO provider and then backfill authorizations based on the Foundation's main CRM system.

Although the Linux Foundation has its entire infrastructure hosted in public cloud, they required the following:
- open source that they could easily extend and maintain
- battle proven middleware with rich functionality already available
- enterprise points of integration and protocols
- cloud native operation and runtime

### The Contenders and the Solution

The LF engineering team evaluated Kong, Amazon API Gateway and Express Gateway and found that Express gateway met their criteria above for both their short term requirements and long term needs.

#### JWKS/JWT and Custom Authorization Plugin
A custom authorization plugin was developed along with JWKS capabilities within Express Gateway's [JWT policy][jwt-policy] within a matter of days. The customization work was easily accomplished with Express Gateway's plugin framework and utilized already built [Express.js][expressjs] middleware for other functionality that the team needed.

#### Lambda Plugin
As good stewarts of open source, the LF engineering team worked in conjunction with the Express Gateway maintainers and were able to accelerate a long sought after roadmap feature to have Express Gateway be able to proxy direclty to AWS Lambda functions. The [Lambda plugin][lambda-plugin] was developed within a week, tested in another and ready for integration within days after its development completion.

### The Impact

> "We were able to leverage a vast ecosystem to quickly configure and build an authentication and authorization layer for the LFX platform."

The Linux Foundation avoided having to recreate enterprise functionality that would have locked them into black box solutions from Amazon Cognito or having to learn Lua to build extensively on Kong. With a single developer, they were able to meet their timelines for end to end integration and make iterative adjustments.

[linux-foundation]: https://linuxfoundation.org
[linux]: https://www.linuxfoundation.org/projects/linux
[kubernetes]: https://kubernetes.io
[nodejs]: https://nodejs.org
[cncf]: https://www.cncf.io
[openjs]: https://js.foundation
[jwt-policy]: {{ site.baseurl }}{% link docs/policies/jwt.md %}
[lambda-plugin]: {{ site.baseurl }}{% link docs/policies/lambda.md %}
[expressjs]: https://expressjs.com
