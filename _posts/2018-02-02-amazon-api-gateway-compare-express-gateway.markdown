---
title: "Developer Spotlight: Compare Amazon API Gateway vs Express Gateway"
date: 2018-02-02 00:00:00 Z
categories:
- comparision
layout: post
author: Val Kilmer
---

[Express Gateway](https://www.express-gateway.io/) and [Amazon API Gateway](https://aws.amazon.com/api-gateway/) are two different products for configuring middleware servers that provide services like rate limiting, authentication, and proxying. As a developer, I want to share the major trade-offs between using Amazon API Gateway and Express Gateway across several important dimensions.

<!--excerpt-->

## Pricing

Express Gateway is an open source software project, so the software is free, but you are responsible for hosting and running your Express Gateway server. The cost of hosting an Express Gateway server may vary depending on your use case, but you can run an Express Gateway server [on Amazon EC2's free tier](https://aws.amazon.com/free/).

Amazon API Gateway is a closed-source software-as-a-service (SaaS) product, so there is no way to separate out [hosting costs](https://aws.amazon.com/api-gateway/pricing/) from the cost of the software. Amazon charges you per million API calls, per GB of data transfer, and optionally for caching.

*What you pay:*

* $3.50 per million API calls
* $0.09 / GB for your first 10 TB of data transfer, $0.085 / GB for the next 40 TB, $0.07 / GB for the next 100 TB, and $0.05 for the next 350 TB
* Optionally per hour for caching results. You pay a [different per-hour fee depending on the size of your cache](https://aws.amazon.com/api-gateway/pricing/#Caching), ranging from $0.02 / hour for a 0.5 GB cache to $3.80 / hour for a 237 GB cache.

Amazon API Gateway has a [free tier](https://aws.amazon.com/api-gateway/pricing/#Free_Tier), so you will pay nothing for your first 12 months as long as you are under 1 million API calls per month.

## Built-In Functionality

One of the primary areas I would like to address is built-in functionality. So, below is a quick comparison for Express Gateway and Amazon API Gateway. One of the key differences is that Amazon API Gateway requires you to build your own [OAuth 2 support via custom authorizers](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/)
and general [request transformation](https://docs.aws.amazon.com/lambda/latest/dg/with-on-demand-https-example.html) via [AWS Lambda](https://aws.amazon.com/lambda/). In order to use OAuth 2 with Amazon API Gateway, you need to use Lambda or another API provider to host your OAuth 2 logic.


|         | Express Gateway          | Amazon API Gateway  |
| :-------------: |:-------------:| :-----:|
| Key Authentication      | x | x |
| HTTPS     | x | x |
| CORs | x | x |
| Rate Limiting  | x | x |
| OAuth 2   | x | **No Built in Solution. Need AWS Lambda** |
Request Transformation| x | **No Built in Solution. Need AWS Lambda**



## Building Custom Plugins

When built-in plugins are not enough, both Amazon API Gateway and Express Gateway have a mechanism for extending your gateway with custom functionality. Amazon API Gateway's mechanism relies primarily on [AWS Lambda](https://aws.amazon.com/lambda/). In addition to being able to use API Gateway to proxy requests to AWS Lambda, you can also use [custom authorizers](https://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html) to call AWS Lambda functions.

<center><img src="https://s3.amazonaws.com/awscomputeblogmedia/1_custom-authorizers-flow.png"></center>

By virtue of AWS Lambda, you can build custom logic for Amazon API Gateway in [JavaScript, Python, Java, or C#](https://aws.amazon.com/lambda/faqs). AWS Lambda uses Node.js as its JavaScript runtime,so, like Express Gateway, you can easily leverage [npm packages](https://www.npmjs.com/) in your API gateway.

[Express Gateway plugins](https://www.express-gateway.io/docs/plugins/) are written in JavaScript using the [Express.js framework](https://expressjs.com/). Express Gateway plugins are [analogous to Express middleware](https://www.npmjs.com/package/express-gateway-plugin-example), which makes it easy to reuse the prolific JavaScript ecosystem in your API gateway.

## Deployment and Database Support

[Deploying Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-deploy-api.html) is done via GUI or AWS' CLI. You need to [create a new deployment](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-deployments.html) and a [new stage](https://docs.aws.amazon.com/apigateway/latest/developerguide/stages.html). You can think of a _stage_ as a snapshot of the API configuration, analagous to a [tag in git](https://stackoverflow.com/questions/18216991/create-a-tag-in-github-repository).

Amazon API Gateway doesn't integrate with a database directly. In order to store data like users and API keys, you need to either use [AWS' IAM users and permissions](https://docs.aws.amazon.com/apigateway/latest/developerguide/permissions.html),  or use [custom authorizers and AWS Lambda](https://aws.amazon.com/blogs/compute/introducing-custom-authorizers-in-amazon-api-gateway/). If you choose to use custom authorizers, you will need to set up your own database independent of Amazon API Gateway.

Deploying Express Gateway is very different, because Express Gateway is not a hosted solution. You have numerous options for hosting Express Gateway, including [running Node.js on Amazon EC2](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html) or using [Docker with Amazon ECS](https://aws.amazon.com/getting-started/tutorials/deploy-docker-containers/).

Unlike Amazon API Gateway, Express Gateway can store users in [Redis](https://redis.io/) independent of any centralized auth setup like AWS IAM. Express Gateway can run without a backend data store like Redis, but without a backend data store your users will be lost if your Express Gateway server restarts.

## Development and Maintenance

Amazon API Gateway and Express Gateway have very different models for managing your gateway configuration. Amazon API Gateway is configured and managed through either a [CLI](https://docs.aws.amazon.com/cli/latest/reference/apigateway/index.html)
or [the AWS console GUI](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#api-gateway-overview-developer-experience-managing-api). [Stages](https://docs.aws.amazon.com/apigateway/latest/developerguide/stages.html) serve a similar purpose to releases and allow you to have a separate development API to test against.

You can also manage Amazon API Gateway separately by maintaining a [Swagger configuration in JSON](https://swagger.io/) and [importing the configuration](https://docs.aws.amazon.com/apigateway/latest/developerguide/stages.html) into Amazon API Gateway every time you make a change. This would enable you to track your API gateway configuration in a version control system like git.

Express Gateway's high-level configuration is defined in a [YAML file](https://www.express-gateway.io/docs/configuration/)  that you can track in GitHub. There is also a [CLI](https://www.express-gateway.io/docs/cli/) and [admin RESTful API](https://www.express-gateway.io/docs/admin/) for managing users and credentials, but unfortunately there is no officially supported GUI for the admin API. However, unless you need to create users and credentials, you can configure Express Gateway entirely using a [YAML](https://www.yaml.org/start.html) file. This means tracking your API gateway configuration in a version control system like git is trivial.

Another limitation of Amazon API Gateway is that your gateway has a separate configuration for [each resource](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html#api-gateway-overview-developer-experience-managing-api). There is no way to configure your gateway to handle requests differently based on the request hostname or the IP address of the incoming request and there's no way to share logic between resources, unless you write your own code in AWS Lambda. With Express Gateway, you can turn on features like rate-limiting by hostname or by IP address [with a single line in your config file](https://www.express-gateway.io/docs/policies/rate-limiter#example-specific-api-host), and [policies](https://www.express-gateway.io/docs/policies/) enable you to reuse logic in different [pipelines](https://www.express-gateway.io/docs/core-concepts#pipelines).

## Summary

Amazon API Gateway and Express Gateway both have their strengths and weaknesses. Amazon API Gateway has a compelling case for massively scalable API gateways. Based on the current pricing model, your API gateway can service 1 million requests per day with an average of 10 KB data transfer per request for approximately $125 per month, with no extra operational overhead. With Express Gateway, you are responsible for hosting and running your own API Gateway, which may be more or less expensive depending on your experience and the load on your API Gateway.

In particular, you may need to manage the number of Express Gateway servers you're running and configure a load balancer in front of your gateway servers if your API has sufficient load, which may be cumbersome and expensive.

On the other hand, Amazon API Gateway's documentation is quite cumbersome. A great deal of their documentation goes into excruciating detail on tangential topics without actually telling you how to use the functionality, like [their guide to rate limiting](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html). Setting up rudimentary API gateway tasks, like OAuth2 or key authorization, require plugging in additional AWS services, like Lambda and IAM users, so it is unlikely you'll be able to use Amazon API Gateway independent of the rest of AWS. Express Gateway has [more concise documentation](https://www.express-gateway.io/docs/) and an [active blog with detailed overviews of use cases](https://www.express-gateway.io/blog/). And, if all else fails, you can just read the code because Express Gateway's [source code is available on GitHub](https://github.com/expressgateway/express-gateway).

## Additional Resources

Like more of this content?
 - Have Questions? Head over to [our Gitter channel](https://gitter.im/ExpressGateway/express-gateway) and hit us
   up! We love feedback!

 - Find us on twitter: [@express_gateway](https://twitter.com/express_gateway) for questions
   comments or feedback.

 - [Sign up for our monthly newsletter](https://eepurl.com/cVOqd5) to get the latest updates, news
   and features.