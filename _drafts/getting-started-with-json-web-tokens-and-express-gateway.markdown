---
title: Getting Started with JSON Web Tokens and Express Gateway
date: 2018-03-08 04:27:00 Z
---

In case you missed the important news - we released an update to Express Gateway with support for JSON Web Tokens (JWT). Now, we’d like to take a moment and go into more depth on how you can get started with JWT and Express Gateway.

<!--excerpt-->

\##Intro: API Gateways are at the heart of microservices

You’re probably wondering what is an API Gateway and why does it matter.

*TLDR: It’s kind of a big deal.*

Here’s a little secret on why: it straddles both the business side and technical side of your business. An API Gateway, by definition,  is considered “middleware” because it sits between backend services, web and other external clients. The API Gateway executes this via a set of protocols and through a set of RESTful APIs.

So, it moves almost all of the the required logic from the client into the gateway which makes it much simpler to develop, secure, manage, and scale endpoints.

## Security, Authorization and the API Gateway

If you’re like Netflix or Google, the move to Microservices may not have been easy, but you can recognize the benefits of breaking down monolithic architecture into smaller, more manageable pieces. Your architecture would look a little something like this:

![Microservice Diagram.png](/uploads/Microservice%20Diagram.png)

As you may already notice, it’s already messy and (at least on paper) looks a lot less secure and more difficult to connect to external resources given so many different touchpoints and complicated information routing.

Also, who wants to deal with all of that, when a major benefit of moving over to microservices was to make life easier and more flexible, yet secure at the same time?

This question touches on a very important point about strategies for growth at enterprise scale. Having a mess of microservices connecting at every touchpoint doesn’t meet typical enterprise criteria of building in a secure way. More touchpoints, more to monitor. More to monitor, more resources spent doing duplicative work that should just be straight forward. So what now?

By adding an API gateway, you can reorganize this relationship with external touchpoints, apps and APIs.  Essentially, Secure your microservices in a way that allows you to build on your business logic at the same time as making life easier for engineers.

![Microservices with API Gateway.png](/uploads/Microservices%20with%20API%20Gateway.png)

This new relationship is underscored by a single touchpoint, that you can secure, monitor and extend. As a basic industry standard, API Gateways handle authentication and authorization from the external APIs.

*Scalable, efficient - what’s not to love about JSON Web Tokens (JWT) and OAuth?*

However; there is more than one way to orchestrate this.

## 2 sides to everything, even JWT support.

Another important aspect to JSON Web Tokens (JWT) is how you plan to initiate them. One side is to support JSON Web Tokens initiated by other identity servers, like Auth0.The other side is to actually initiate and manage the JWTs through our Identity Server. This is just as much about your security strategy as it is about your technical approach.

While there is no silver bullet, there are some advantages to the integration approach. There's an excellent [getting started story in setting up identity with Auth0 and plugging in to Express Gateway](https://auth0.com/blog/apigateway-microservices-superglue/).

## Why Managing your own identity server blows

This is why we baked one into Express Gateway from the start. So, there’s more opportunity to get started right out of the box without having to sign up for extra services. Additionally, Express Gateway can interface with your existing JWT provider as well.

Let’s just face some cold hard facts.  Chiefly, no business requirements doc is going to say "set up an identity server that supports JWT." The feedback we have gotten from the developer community is that most of the time, we all just imagine it already exists. So, if you’re working on a project and don’t have one...developers have to scramble to make some magic happen.

Also, it’s worth noting that reading the OAuth2 spec is...hard. Which also means that getting all the right details is an amazing feat which is not insurmountable, but takes time. When speed and agility matter, slowing down can make it seem worse.

It's why there's an entire product segment around this.

No, seriously. There is an entire set of products and companies that will knock this out of the park for you such as [Ping Identity](https://www.pingidentity.com/), [Okta](www.okta.com), and (our favorite) [Auth0](https://auth0.com/). [Learn more about Auth0 and Express Gateway.](https://auth0.com/blog/apigateway-microservices-superglue/)

*Still not feeling it?*

We’ve had those in-between moments of realization where you just need to get it done. That's where the internal support for JSON Web Tokens (JWT) will can come in handy. To help get you started, we’ve put together a video tutorial on setting up JSON Web Tokens initiated by other identity servers, like Auth0, and when you actually initiate and manage the JWTs through an Identity Server.

Get started with JSON Web Token Support in Express Gateway with this easy-to-follow How-To Video:

<iframe width="420" height="315" src="https://vimeo.com/manage/259108554/embed" frameborder="0" allowfullscreen></iframe>

OR: You can also check out the more [technical getting started guide](https://www.express-gateway.io/express-gateway-release-1-5-0-with-jwt-support/) in the release post detailing the latest updates.