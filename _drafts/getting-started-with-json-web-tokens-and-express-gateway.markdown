---
title: Getting Started with JSON Web Tokens and Express Gateway
date: 2018-03-08 04:27:00 Z
---

In case you missed the important news - we released an update to Express Gateway with support for JSON Web Tokens (JWT). Now, we’d like to take a moment and go into more depth on how you can get started with JWT and Express Gateway.

##Intro: API Gateways are at the heart of microservices

You’re probably wondering what is an API Gateway and why does it matter.

*TLDR: It’s kind of a big deal.*

Here’s a little secret on why: it straddles both the business side and technical side of your business. An API Gateway, by definition,  is considered “middleware” because it sits between backend services, web and other external clients. The API Gateway executes this via a set of protocols and through a set of RESTful APIs.

So, it moves almost all of the the required logic from the client into the gateway which makes it much simpler to develop, secure, manage, and scale endpoints.

## Security, Authorization and the API Gateway
If you’re like Netflix or Google, the move to Microservices may not have been easy, but you can recognize the benefits of breaking down monolithic architecture into smaller, more manageable pieces. Your architecture would look a little something like this:

![Microservice Diagram.png](/uploads/Microservice%20Diagram.png)

