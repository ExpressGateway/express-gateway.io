---
title: Express Gateway vs AWS API Gateway Detailed Comparison
description: A detailed comparison guide between Express Gateway and Amazon AWS API Gateway comparing features, pricing and more.
image: /assets/img/Express Gateway vs Amazon API Gateway.png
permalink: "/eg-vs-amazon-aws-api-gateway/"
layout: page
---

<div class="generic-page">
<section class="page-section-normal">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">

## API Gateway: Express Gateway vs Amazon API Gateway

We’ve created this comparison page to make it easy to understand the major differences (and similarities) between two popular projects for the API Gateway use case. In this review we’ll be comparing **Express Gateway** and **Amazon API Gateway** across multiple dimensions, “at-a-glance.”

![][api-gw-role]

## What is an API Gateway?

An API Gateway is “middleware” that makes available backend services to mobile, web and other external clients via a set of protocols and commonly through a set of RESTful application programming interfaces (APIs). An API Gateway makes it much simpler to develop, secure, manage, and scale endpoints by moving most of the required logic from the client, into the gateway.

Further reading: [microservices.io](https://microservices.io)

</div>
</div>
</div>
</section>

<section class="page-section-white">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">

## Elevator Pitches

</div>
</div>
</div>
</section>

<div class="wrapper border-top-blue flex-row flex-center whatiseg with-graphics with-graphics" markdown="1">
<div class="flex-column" markdown="1">

### Express Gateway

Express Gateway is an API Gateway that can sit at the heart of any microservices architecture, regardless of what language or platform you’re using. Express Gateway secures your microservices and exposes them through APIs using Node.js, ExpressJS and Express middleware.

[Learn more about Express Gateway](https://docs.express-gateway.io)

</div>
<div class="flex-column" markdown="1">

### Amazon API Gateway

Amazon’s API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale. With a few clicks you can create an API that acts as a “front door” for applications to access data, business logic, or functionality from your back-end services, such as workloads running on Amazon Elastic Compute Cloud (Amazon EC2), code running on AWS Lambda, or any Web application. Amazon API Gateway handles all the tasks involved in accepting and processing up to hundreds of thousands of concurrent API calls, including traffic management, authorization and access control, monitoring, and API version management.

[Learn more about AWS API Gateway](https://aws.amazon.com/api-gateway/)

</div>
</div>

<section class="page-section-white">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">

## Features & Architecture

</div>
</div>
</div>
</section>

<div class="wrapper border-top-blue flex-row flex-center whatiseg with-graphics with-graphics" markdown="1">
<div class="svg-fix svg-about-1 svg-diagram">{% include quickstart/egcore.svg %}</div>
<div class="flex-column" markdown="1">

### Express Gateway Architecture

Express Gateway is an open source API Gateway written in Node.js and built on top of Express.js and Express Middleware. Express.js is the most popular framework for Node.js applications. Express Gateway is Apache 2.0 licensed with commercial support available from LunchBadger.

* Features include:
* Simple configuration via a YAML file
* Plugin architecture
* Extensible with over 3,000 modules and growing
* Runs anywhere (Docker, private or public cloud)
* Auto-detects and hot-reload of configuration changes
* Define multiple policy sets (pipeline) per API endpoint
* Supports any language
* Supports any framework
* Supports many microservice use cases, patterns and designs
* Works with any orchestrator
* Works with any service mesh
* Plugs directly into existing DevOps tooling and pipelines
* Further reading: Express Gateway GitHub repository


</div>
</div>


<div class="wrapper border-top-blue flex-row flex-center whatiseg with-graphics with-graphics" markdown="1">
<div class="flex-column" markdown="1">

<img src="{{ site.baseurl }}{% link assets/img/aws-architecture.png %}" style="width:100%"/>

</div>

<div class="flex-column" markdown="1">

### Amazon API Gateway Architecture

Amazon API Gateway is a closed-source software-as-a-service (SaaS) product written in Node.js available only on AWS. Amazon API Gateway can be considered a backplane in the cloud to connect AWS services and other public or private websites. It provides consistent RESTful application programming interfaces (APIs) for mobile and web applications to access AWS services. Together with AWS Lambda, API Gateway forms the app-facing part of the AWS serverless infrastructure. For an app to call publicly available AWS services, you can use Lambda to interact with the required services and expose the Lambda functions through API methods in API Gateway. AWS Lambda runs the code on a highly available computing infrastructure. It performs the necessary execution and administration of the computing resources. To enable the serverless applications, API Gateway supports streamlined proxy integrations with AWS Lambda and HTTP endpoints.

Features include:

* Build, deploy and manage APIs
* Resiliency
* API lifecycle management
* SDK generation
* API operations monitoring
* AWS authorization
* API keys for third-party developers

</div>
</div>

<section class="page-section-white">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">

It should be noted that with Amazon API Gateway there is no way to separate out hosting costs from the cost of the software. Amazon charges you per million API calls, per GB of data transfer, and optionally for caching. You can find pricing information here. Amazon API Gateway does have a free tier, so you will pay nothing for your first 12 months as long as you are under 1 million API calls per month.

## Getting Started, Deployment and Configuration

### Express Gateway

Deploying Express Gateway is going to be very different from Amazon API Gateway because it is not a hosted solution. You have numerous options for hosting Express Gateway, including running Node.js on Amazon EC2 or using Docker with Amazon ECS. Unlike Amazon API Gateway, Express Gateway can store users in Redis, independent of any centralized auth setup like AWS IAM. Express Gateway can also run without a backend data store, but it should be noted that without a backend data store your users will be lost if your Express Gateway server restarts.

Getting started with Express Gateway is very easy because all you need is Node.js and an optional backend data store. Getting up and running with Express Gateway is a simple, four step process executed at the command-line (detailed here.)

#### Installation:

* Installing Express Gateway via npm
* Creating an Express Gateway
* Following the command-line prompts to configure the gateway from the available templates
* Running Express Gateway


If you choose to get started using Docker, all you need is a Node.js Docker image. You can even compile your gateway into a standalone executable using pkg. By default, Express Gateway uses a built-in, in-memory data store. As mentioned, if a persistent backed is desired, Express Gateway supports Redis. Express Gateway stores most of its configuration in a YAML configuration file. Express Gateway only stores transactional data, like user information and access tokens, in its data store. This means if you are just using Express Gateway for just rate limiting and header transformation, you don’t need a data store at all.

### Amazon API Gateway

Deploying Amazon API Gateway is done via GUI or AWS’ CLI. You need to create a new deployment and a new stage. You can think of a stage as a snapshot of the API configuration, analogous to a tag in git. It should be noted that Amazon API Gateway doesn’t integrate with a database directly. In order to store data like users and API keys, you need to either use AWS’ IAM users and permissions, or use custom authorizers and AWS Lambda. If you choose to use custom authorizers, you will need to set up your own database independent of Amazon API Gateway.

You can find the complete details concerning how to get started with Amazon API Gateway in their documentation.

## Administration and Maintenance

### Express Gateway

Amazon API Gateway and Express Gateway have very different models for managing their gateway configuration. Express Gateway’s high-level configuration is defined in a human-readable YAML file that you can easily track in GitHub. There is also a CLI and admin API for managing users and credentials. At the moment there is no officially supported GUI for the Admin API. However, unless you need to create users and credentials, you can configure Express Gateway entirely using a YAML file.

Scaling and load-balancing Express Gateway is done via Kubernetes. Check out this demo, with source code, to understand how to set-up Express Gateway using Kubernetes.


### Amazon API Gateway

Amazon API Gateway is configured and managed through either a CLI or the AWS console GUI. Stages serve a similar purpose to releases and allow you to have a separate development API to test against. You can also manage Amazon API Gateway separately by maintaining a Swagger configuration in JSON and importing the configuration into Amazon API Gateway every time you make a change. This would enable you to track your API gateway configuration in a version control system like git.

A limitation of Amazon API Gateway is that your gateway has a separate configuration for each resource. There is no way to configure your gateway to handle requests differently based on the request hostname or the IP address of the incoming request and there’s no way to share logic between resources, unless you write your own code in AWS Lambda. With Express Gateway, you can turn on features like rate-limiting by hostname or by IP address with a single line in your config file, and policies enable you to reuse logic in different pipelines.

## Features Comparison

|                                     	|  Express Gateway  	| Amazon API Gateway 	|
|-------------------------------------	|:-----------------:	|:------------------:	|
| Public or Private Cloud             	|         ✅         	|          ⚠️         	|
| On Premise                          	|         ✅         	|          ❌         	|
| Configuration & Administration      	| YAML, CLI and API 	|  CLI, GUI and JSON 	|
| Database (Persistent Storage)       	|       Redis       	|        ❌ **1       	|
| Key Authentication                  	|         ✅         	|          ✅         	|
| HTTPS                               	|         ✅         	|          ✅         	|
| CORS                                	|         ✅         	|          ✅         	|
| oAuth2                              	|         ✅         	|        ⚠️**2        	|
| Finegrain Access Control            	|         ✅         	|          ✅         	|
| Rate Limiting                       	|         ✅         	|          ✅         	|
| Request Transformation              	|         ✅         	|        ❌**3        	|
| Pipeline Driven Conditional Actions 	|         ✅         	|        ❌**4        	|
| Pipeline Driven Expressions         	|         ✅         	|        ❌**4        	|

1. _Amazon only._
2. _Each resource requires its own configuration_
3. _If you choose to use custom authorizers, you will need to set up your own database independent of Amazon API Gateway._
4. _No built-in solution. Requires implementation through AWS Lambda._

## Custom Extensions

When built-in plugins are not enough, both Amazon API Gateway and Express Gateway have a mechanism for extending your gateway with custom functionality. Amazon API Gateway’s mechanism relies primarily on AWS Lambda. In addition to being able to use API Gateway to proxy requests to AWS Lambda, you can also use custom authorizers to call AWS Lambda functions.

### Express Gateway

Express Gateway plugins are written in JavaScript using the Express.js framework. Express Gateway plugins are analogous to Express middleware, which makes it easy to reuse the prolific JavaScript ecosystem in your API gateway.

### Amazon API Gateway

By combining Amazon API Gateway with AWS Lambda, you can build custom logic  in JavaScript, Python, Java, or C#. AWS Lambda uses Node.js as its JavaScript runtime, so, like Express Gateway, you can easily leverage npm packages in your API gateway. However, this requires a substantial investment in coding and configuration to get comparable functionality to just a few commands and configuration parameters when extending Express Gateway.

</div>
</div>
</div>
</section>

<section class="page-section-white">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">

### Quick Reference Links

</div>
</div>
</div>
</section>

<section class="page-section-white">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">

#### Amazon API Gateway

- [Documentation](https://www.google.it)
- [Installation and Getting Started](https://www.google.it)
- [Commercial Support](https://www.google.it)

</div>
<div class="flex-column" markdown="1">

#### Express Gateway

- [Github Repository](https://www.google.it)
- [Documentation](https://www.google.it)
- [Installation and Getting Started](https://www.google.it)
- [Plugins](https://www.google.it)
- [Commercial Support](https://www.google.it)

</div>
</div>
</div>
</section>

<section class="page-section-white">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column" markdown="1">

## Summary

**Amazon API Gateway** and **Express Gateway** both have their strengths and weaknesses. Amazon API Gateway has a compelling case for massively scalable API gateways at a competitive price point. With Express Gateway, you are responsible for hosting and running your own API Gateway, which may be more or less expensive depending on your experience and the load on your API Gateway. In particular, you may need to manage the number of Express Gateway servers you’re running and configure a load balancer in front of your gateway servers if your API has sufficient load, which may be cumbersome and expensive.


On the other hand, Amazon API Gateway’s documentation is quite cumbersome. A great deal of their documentation goes into excruciating detail on tangential topics without actually telling you how to use the functionality, like their guide to rate limiting. Setting up rudimentary API gateway tasks like OAuth2 or key authorization, require plugging in additional AWS services, like Lambda and IAM users, so it is unlikely you’ll be able to use Amazon API Gateway independent of the rest of AWS. Express Gateway has more concise documentation, greater ease-of-use, built-in functionality that just works “out-of-the-box”, and an active blog with detailed overviews of use cases. If all else fails, you can just read the source code because Express Gateway is open source and available on GitHub.

</div>
</div>
</div>
</section>
</div>
[api-gw-role]: {{ site.baseurl }}{% link assets/img/api-gw-role.png %}
