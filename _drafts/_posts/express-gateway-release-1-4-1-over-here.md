---
title: Express Gateway Release 1.4.1 over here!
layout: post
date: 2017-11-29 00:00:00 +0000
author: Al Tsang
categories:
- announcements
- technology
---
# Express Gateway Release 1.4.1 over here!

<excerpt--->We're back with brand new fixes, changes, updates and..PROGRESS! Who's ready for 1.4.1? Let's kick it off! <---/excerpt>

## An Update with all the Fixins'

Can you handle it? Well, now the API Gateway correctly handles [the HTTP_PROXY environment variable](https://www.express-gateway.io/docs/policies/proxy#service-enpoints-behind-intermediate-proxy). This fix allows developers to use service endpoints behind a corporate proxy. 

Hang tight, we're still working on having good standards for that code style such as more rules around enforcing consistent code formatting. It's internal to the codebase so there's no real impact on users. However; we wanted to share because this project is maturing and transparency is important to us and to our community, like you.

Additionally, we've updated [ioredis-mock](https://www.npmjs.com/package/ioredis-mock) to the latest version(**3.4.2** ). So this version adds a layer of polish and shine. We had to workaround a few areas in the previous release in order to complete the client switch. Now it's fired up and ready to go so definitely worth checking out.

In addition to fixing, we've also be reformatting.

_They go together, right?_

We've just updated our [ESLint version](https://www.npmjs.com/package/eslint) and made it scan the whole codebase. In case you are not sure what ESLint is all about, it's a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. You may have already seen JSLint and JSHint, but there are some exceptions with how ESLint works.

* ESLint uses [**Espree**](https://github.com/eslint/espree) for JavaScript parsing and an AST to evaluate patterns in code.
* ESLint is completely pluggable, every single rule is a plugin and you can add more at runtime.

In addition to all of this, we also took some time to kick the crap out of a small bug that triggered hot reloading mechanism twice on gateway start. However; no files were changed because the root problem was a misconfiguration in chokidar.

#### More info and breakdown on all of this in the [**shiny documentation section**](https://www.express-gateway.io/docs/)**.**

## Ch-Ch-Changes

**Big Change.** _Small Release._ In an effort to help developers, we lowered the minimal level of severity for a log in order to be printed on the standard output. We lowered it from error to warn. This should (hopefully) help you to reveal issues at a more granular level. When something is going sideways, now you can understand what's going on in a more clear and concise way.

### Moving On

_Ooooooo!_ **1.5.0** is almost here. [_We’re excited_](https://github.com/ExpressGateway/express-gateway/milestone/6)_. Check out why!_

We would [love your support in making it happen](https://github.com/ExpressGateway/express-gateway) and if you’re interested in becoming a maintainer or contributor, now’s the time!

[Hit up Gitter](https://gitter.im/ExpressGateway/express-gateway) and join the rest of the developer community.

**_Not quite ready? That’s ok!_**

* [**Upvote features on Feathub**](https://feathub.com/ExpressGateway/express-gateway). Then, we roll up the most popular or interesting features ([Docker images \*nudge\*nudge\*](https://www.lunchbadger.com/official-docker-images-for-express-gateway/)) will then make it over to the [**Express Gateway roadmap**](https://github.com/ExpressGateway/express-gateway/milestones).
* Join the [**Express Gateway Newsletter**](http://eepurl.com/cVOqd5 ) update list
* [Follow along on **Twitter**](https://twitter.com/express_gateway)