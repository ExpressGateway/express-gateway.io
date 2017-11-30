---
title: Now Presenting Express Gateway Release 1.4.0!
layout: post
date: 2017-11-24 00:00:00 +0000
author: Al Tsang
categories:
- announcements
- technology
---
Always be shipping code! Open source projects are no exception. In the latest 1.4.0 release, we’ve got a set of brand new features and crushed some pesky bugs. In case you’ve been following along at home, you’ll notice that several of the features and bugs that have been included were direct recommendations or contributions from the community. Thank you for the ongoing support. <!--excerpt-->

**_Now — on to the good stuff!_**

### Less time on errands and more time on code!

In this release, we wanted to focus on making Express Gateway and automating our deployment pipeline. Now, every time a new tag is pushed on Github, our lovely Continuous Integration system will publish the package on[npm](https://npmjs.org/packages/express-gateway) as well as update all of the [Express Gateway Docker images](https://www.lunchbadger.com/official-docker-images-for-express-gateway/).

### New Migration Framework

Express Gateway is equipped with a new migration framework,[ node-migrate](https://github.com/tj/node-migrate), an abstract migration framework for Node.js. Small, lightweight and perfect for our use case. We want to build this open source project with a go-forward perspective. This means that we need to acknowledge that, someday, different parts of the codebase may need to be refactored and we might need to move the data.

### Eliminating Barriers for Contributors

In addition to ease of use, we wanted to make it easier to contribute to the project. So, we added the schema definition to our Typescript definition file. If you’re writing a plugin using Typescript, you’ll get full type checking and autocomplete for JSONSchema.

Additionally, we wanted to give back to our community of supporters and project contributors that would make their life a little easier when they commit code. So, we have added _lint-staged_ to check and fix all code before it’s committed to the git repository. This makes it easier for the supporters and contributors of Express Gateway who are making the code magic happen.

We have replaced our internal Redis client from node-redis to ioredis. This brings to us a lot of improvements (for example, it’s Promise based by default so we do not have to monkey patch its methods) and it also supports a lot of features the community has been asking for, such as Sentiel (Redis’ built in high availabilty solution) and cluster connections. Please refer to our[**documentation**](https://www.express-gateway.io/docs/configuration/system.config.yml/db) to learn how to leverage those changes.

### More Authentication in that Framework

The community has been asking for long time for some improvements to our story around the authentication. We’re happy to announce that some of these have been addressed.

First of all, our authentication policies have now an additional \`passthrough\` parameter. When this is set to true, if an user does not pass the authentication stage for any reason it won’t stop the pipeline process anymore (returning 401 or 403), but it will continue into the next policy as unauthenticated request.Moreover, different behaviors have been unified and placed in a common core piece. Therefore now all the credential types should behave in a coherent way.We’ve added 2 new conditions, \`authenticated\` and \`anonymous\` to the core in order to support new scenarios (such as rate-limiting unauthenticated requests).

In order to support followup of unauthenticated requests, a new \`terminate\` policy has been added to the core. You can use this one to stop the request from being processed under some determinate conditions.

A new policy called \`header\` has been added into the core. This will let you forward as headers some parts of the gateway that you feel they’re important for your application. You can find further information in the [documentation section](https://www.express-gateway.io/docs/).We still want to improve the story around the authentication/authorization part so we’ll work with the community to focus more on consumer management and the credential extensions in the short term future.

### Upgrades

We’ve updated the proxy policy to allow users to pass a complete set of[options](https://github.com/nodejitsu/node-http-proxy#options) that the underlying middleware is offering. Before this update, you had no way at all to specify these options, and this was preventing some use cases, such as set certificate and keyfiles in the proxies. With this new change, you have full control over the passed options.

We’ve also supercharged the **_key-auth policy_** so you can now provide **_keyId and keySecret parameters_** when creating a new credential. This might be helpful when recreating the gateway and you want to preserve the keys around.

Keep it up with all the amazing ideas, feedback and we’re looking forward to making more upgrades in the next release.

### Crushing Bugs

Spring cleaning, ya’ll! We’ve spent some time examining any bug fixes that could be impactful for developers and the community.

First up, we’ve fixed credentials in the Admin API (and, by cascade, the CLI experience).Now an operation performed on an user by **ID** is going to be the same as if it would have been performed by **name** and will now look and act on the same user.

eg credentials create -c username

eg credentials create -c user-id

In previous releases, they were treated as two different entities which causing a few hiccups during login.

Last, but certainly not least — There is a migration script to adjust all the data in your system which means you can _run npx migrate before starting Express Gateway after it’s been updated._

### Top Contributions

In this release we have received multiple external contributions from you, our amazing community. As an open source project, this is a huge milestone in the project.

We have acknowledged all of them in our changelog, however we want to praise them here as well:

[\*\*@stipsan \*\*](https://github.com/stipsan)— for improving his library (that’s a dependency for the gateway) and being extremely responsive on our requests

[**@srcnix**](https://github.com/srcnix) — provided the support for certificate and key files for the Redis connector

[**@dotBits**](https://github.com/dotBits) — drafted the initial implementation for auto checking code styles for all our files.

Thanks so much for your support and we look forward to building more amazing tech and solving hard problems with you!

### Moving On

What’s next for **1.5.0**? [_We’re so glad you asked._](https://github.com/ExpressGateway/express-gateway/milestone/6)

We would [love your support in making it happen](https://github.com/ExpressGateway/express-gateway) and if you’re interested in becoming a maintainer or contributor, now’s the time! [Hit up Gitter](https://gitter.im/ExpressGateway/express-gateway) and join the conversation and community.

**_Not quite ready? That’s ok!_**

You can [**upvote features on Feathub**](https://feathub.com/ExpressGateway/express-gateway). Then, we roll up the most popular or interesting features ([Docker images \*nudge\*nudge\*](https://www.lunchbadger.com/official-docker-images-for-express-gateway/)) will then make it over to the [**Express Gateway roadmap**](https://github.com/ExpressGateway/express-gateway/milestones). So even if you don’t have the time or bandwidth to be a contributor or maintainer, you can still make your voice heard. Loudly.