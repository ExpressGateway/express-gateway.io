---
title: "Case Study: Musement creates a unified API with Express Gateway"
permalink: /case-studies/musement/
layout: case-study
---

Launched in Milan in 2013, [Musement][musement] is a travel discovery and booking service that allows users to get the best from their travel destinations. With tickets to tours and top attractions, its offering has grown to cover over 1000 destinations in 70 different countries – making it a **leading** platform for booking travel activities around the world.

As part of this expansion, [Musement acquired Triposo][triposo-acquisition] to open up new lines of revenue and create all inclusive offerings for their users.

Now comes the dilemma of how to merge these two successful companies without impacting users. Many partners requested to use one single API and directly access to both content and transactional features to be integrated on their platform,
including having a single documentation that's easier to access.

Moreover, since the acquisition, the team noticed a growing API usage pattern that led the team to put efforts in an API monetization strategy project. In this perspective, they decided to give their API more importance and after an internal research, the team come out with the result that they need an API Gateway.

Such solution was a perfect fit to Musement because:

- Easy to maintain
- Easy to document
- Development workflow integration
- Ready for all developers (JS)

The team started with the Apigee Gateway solution but they found difficult to debug and maintain endpoints. In particular, Apigee's solution was lacking of SCM integration for custom scripts, preventing the team from sharing and synchronizing the custom logic with other teams and deployment resources, as well as difficulties during the integration into their actual development workflow. Caching strategies, also, weren't so easy to manage.

After investigating it further, the team had no choice to switch to an in-house solution. Like many developers we’ve encountered, the team was heads down writing a pipeline of middlewares from scratch, leveraging their NodeJS internal
expertise.

During the process of building their own in-house middleware, the Musement team realized that someone else could have already figured this out with an easier solution. It wasn’t long before they found Express Gateway, an open source API Gateway, and decided to give it a try.

> We were looking for a fast, robust and easy to maintain Node.js software middleware.

The simple fact that Express Gateway is built on [Express.js][expressjs] meant a lot because the team is familiar with this technology. Also, the ability to easily inspect the source code in case they were struggling with something was a key
factor for their decision. In particular, the team appreciated a lot the following unique features of Express Gateway:

- Leverage Express Middlewares: easily plug in any express middleware as a [policy][policy] in any pipeline
- Pipelines: A super flexible selector engine that goes down to `METHOD` level
- Declarative and dynamic: The gateway configuration is versionable.

Impact: Musement was attracted to Express Gateway for their API proxy project use case because of the broad range of clients they handle (website, mobile apps, partners integrations etc.)  Each client can have its own format and logic for request and response.

Therefore, a middleware handler for their API Gateway became a key use case for Express Gateway. By using Express Gateway the team was able to save time, without having  to devote engineering time to building this important piece of their tech stack while simultaneously mitigating the risk to their users.

> In one week we’ve been able to deploy something valuable for our company without impacting previous process but create something on top!

By using Express Gateway, Musement saved time and developer resources.

[policy]: {{ site.baseurl }}{% link docs/policies/index.md %}
[musement]: https://musement.com
[triposo-acquisition]: https://www.musement.com/us/musement-acquires-triposo-in-move-to-create-an-all-inclusive-in-destination-experiences-platform-p/
[expressjs]: https://expressjs.com
