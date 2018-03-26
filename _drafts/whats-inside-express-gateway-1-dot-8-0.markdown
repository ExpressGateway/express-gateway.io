---
title: What's inside Express Gateway 1.8.0
date: 2018-03-26 19:56:00 Z
categories:
- announcements
tags:
- JSON Schema
- HTTP Proxy
- CLI
- JWT
- JSON Web Tokens
layout: post
---

We've come a long way! With over 13,000 downloads and almost 800 stars on Github, Express Gateway is becoming more popular every single day thanks to our amazing community of developers, gazers and contributors. 

In this release, we're bringing two new features and crushing a few pesky bugs. Also, based on community feedback, we've done a little code reorganization. If you're interested in contributing, we'd love to connect. In the meantime, learn more about what's inside Express Gateway 1.8.0!

## New Condition 
We added a new condition called `tlsClientAuthenticated`. This condition can be useful when you'd like to check, on policy level, if the client provided a valid client certificate, and react accordingly. For more informations, check out our [documentation](provide-link). Check out our blog as well to understand a good use case for it #674 
* When a new gateway has been created, you'll now see a nice url that'll point you directly to our Gitter channel #676 

## Changed
* All the project's dependencies have been updated to the last current version #668
* The JWT Json Schema has been updated to contain some parameters that were missing #662
* We have reorganized the Proxy policy a bit. In the current state, the policy was the result of a bad accumulation of requirements that changed over the time. That made a bit hard to reason about the code and understand where to change the things. This small refactor should hopefully make it more readable. As it's the main policy you might want to use, we'll probably work on it again in one of the following releases #661
* After a long discussion, we decided to bring to the Proxy policy the support to both `http_proxy` and `HTTP_PROXY` environment variables. We have looked around and, although we know that usually environment variables are upper case, for this one in particular the community seems to be divided — hence our decision #661
* We have revamped our Docker images. We were previously offering two Docker images based on the templates that the CLI is offering. However, this was not exactly compliant with the Docker guidelines. So we made several changes and followed the official guidelines. The result is that now we provide a single docker image. You'll then provide the configuration files via a volume mount. Given our work, we've also submitted our docker images to be part of the [official images program](https://docs.docker.com/docker-hub/official_repos/). The process will take a while, but our final aim is to be part of it. #628

## Fixed
* The internal error, when a JSON Schema registration fails in the system, is now correctly propagated back to the user so it's easier to know what's going on #664