---
title: What's inside Express Gateway 1.8.0
date: 2018-03-27 07:56:00 Z
categories:
- technology
tags:
- JSON Schema
- HTTP Proxy
- CLI
- JWT
- JSON Web Tokens
- Docker
- Docker images
layout: post
---

We've come a long way! With over 13,000 downloads and almost 800 stars on Github, Express Gateway is becoming more popular every single day thanks to our amazing community of developers, gazers and contributors. 

In this release, we're bringing two new features and crushing a few pesky bugs. Also, based on community feedback, we've done a little code reorganization. If you're interested in contributing, we'd love to connect. In the meantime, learn more about what's inside Express Gateway 1.8.0!
<!--excerpt-->

## New Condition 
We added a new condition called `tlsClientAuthenticated` which is useful when you'd like to get down to a policy level to check whether or not the client provided a valid client certificate. So, this means you can react faster now that it's more transparent. For more information, we've put together some additional [documentation](provide-link). Stay tuned because we're putting together a great use case of this new feature and can't wait to share it with you.

## New Gateway + Gitter = FTW
In addition to the new condition, we also added a handy new little feature. When you create a new gateway, you'll notice that a new URL pointing you to our Community driven Gitter channel. This provides easier access to our community level support where you can ask tough questions, gain valuable insight and discuss this project or similar topics like API Gateways with other developers who have implemented Express Gateway. If you're looking for [paid commercial level support](mailto: info@express-gateway.io), hit us up! 


## Proxy Policy Refactor
In its current state, the Proxy Policy was just a mashup of requirements that have changed over the time. So, that made hard to look critically through the code and see a clear path to change, growth and scaling. While this was just a small refactor, we hope it make the Proxy Policy more readable. It's one of the main policies users might want to use, so we're going to come back to it again in future releases. We'd love to get your feedback on how to make it even better.

One immediate opportunity to give back was to bring support for both `http_proxy` and `HTTP_PROXY` environment variables. We asked around and, although we know that *usually* environment variables are upper case, for this one in particular the community seems to be divided — hence our decision. Be divided no more and enjoy both lowercase, uppercase and get coding!

## Docker, Simplified
Whelp, the time has come for us to fancy up the [Express Gateway Docker images](https://hub.docker.com/r/expressgateway/express-gateway/). Previously, we had two docker images which were based on the templates from the CLI. However; after we examined it further, this was not compliant with Docker guidelines. *Oops!* 

So, we reviewed the [Docker guidelines and best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) to update Express Gateway resulting in consolidation down to a single docker image. We've also submitted our docker images to be part of the [official images program](https://docs.docker.com/docker-hub/official_repos/). It will take a while, but we're excited to get this process started.


## So, what else?
We wanted to get a jump on spring cleaning, which means a little bit of updating. We updated all of Express Gateway's dependencies to the latest version. Additionally, the JWT JSON Schema has been updated to contain some parameters that were missing, like the alg parameter.

## Moving On
One of the last items on our to-do list was actually pretty important. We've fixed the internal error you receive when a JSON Schema registration fails in the system. Now it's correctly propagated back to the user so it's easier to understand what it happening. In addition to this fix, we're excited to learn that more community members are [joining out Gitter channel](https://gitter.im/ExpressGateway/express-gateway), engaging and building production environments with Express Gateway. 

In addition to all of the other [amazing pieces of this open source project](https://www.express-gateway.io/blog/), we rely on your feedback to help set the roadmap.[ So, even if you're not ready to contribute - upvote your favorite features!](https://feathub.com/ExpressGateway/express-gateway) 

## More Resources

* Learn more about upcoming features and releases by checking out the **[Express Gateway Roadmap](https://github.com/ExpressGateway/express-gateway/milestones)**

* Join the **[Express Gateway Newsletter](https://eepurl.com/cVOqd5)** update list

* **[Follow along on](https://twitter.com/express_gateway)** Twitter

* Have Questions? Head over to **[our Gitter channel](https://gitter.im/ExpressGateway/express-gateway)** and hit us up!