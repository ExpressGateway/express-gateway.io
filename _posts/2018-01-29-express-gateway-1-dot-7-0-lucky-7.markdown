---
title: Express Gateway 1.7.0 - Lucky 7
date: 2018-01-29 16:50:00 Z
tags:
- environment variables
- Docker Yaml
- Docker
---

We love open source and we especially love feedback from our community. It’s not even February yet, and we’ve been busy jamming out the features developers, like you, have been requesting including Node.js 9, JSON Schemas and more. If you’ve tried out Express Gateway, you’re in the right place because this next feature in Express Gateway 1.7.0 is small, but mighty. Join us in exploring environment variables in both configuration stacks.

<!--excerpt-->
 
In case you have not worked with environment variables in the past: 
 
*An environment variable is a variable with a name and a value. The value of an environmental variable can for example be the location of all files of a certain type in the file system, a default editor that should be used, or similar data.* 
 
Learn more  as we share how to get started with environment variables in the latest Express Gateway release 1.7.0.
 
## Haven’t Downloaded yet?
Curious about how to put an open source API Gateway to work in your tech stack? We’ve all got to get started sometime! Before venturing further - check out the [getting started section](https://www.express-gateway.io/getting-started/) and download Express Gateway right away. 
 
`npm install -g express-gateway`
 
 
## RELEASE OVERVIEW + SUPPORT FOR ENV 
Before we get too deep, we should talk about syntax. This will be the foundation of being able to use environment variables in Express Gateway. If you’re already familiar with syntax of [Docker Compose YAML](https://docs.docker.com/compose/environment-variables/) files, environment variables in configuration files follow the same syntax. This is particularly useful to remember when you want to keep secrets or hidden data separate from the configuration files. 
 
Importantly, with containers, you want it to be: 
* Secure - Your images with embedded secrets will not be secure.
* Reusable - Containers with a built-in secrets are not portable and therefore not reusable.
* Enterprise Compatible - Built in configs will require that your enterprise users have to also create a private image. So those best practices you put into all of your work go right out the window.
 
So, those are just a few factors to consider. Additionally, you can safely check these in your source control management system; or also when some providers are dictating the `HTTP` port to listen through an environment variable, such as **Heroku** or **Glitch**.

## Syntax Overview

Here is a quick overview of the syntax for reference.
`
${ENV_VARIABLE_NAME:-DEFAULT_VALUE}`
* `ENV_VARIABLE_NAME`: environment variable which you want the value tol be put in the config file.
* `DEFAULT_VALUE`: use this one in case the environment variable is not defined.

## How to Getting Started Example
In order to help you get started, we’ve put together a quick example and getting started sequence so you can understand more about working with environment variable support with Express Gateway.
 
Example:

```http:
  port: ${HTTP_PORT:-8080}
apiEndpoints:
customers:
    host: customers.company.com
 orders:
    host: orders.company.com`
```

First the system will check for an environment variable called `HTTP_PORT` before it loads the gateway and the configuration files are validated with their JSON Schema. In [our last release (1.6.0)](https://www.express-gateway.io/express-gateway-1.6.0-playback-time) we shared some great information about the new JSON Schema support.
 
If the environment variable is found, the value will be replaced in the configuration file. Conversely, If the environment variable is not found, a specified default value (`8080`) will be used. 
 
*ICYMI - Default values aren’t mandatory.*
 
In case your specified env variable does not exist and  you have not provided a default value, the system will assume “null” as the value. You will also get a warning as well. So while default values are not mandatory, it’s important to understand what happens next. 
 
## [Check out the rest of the documentation](https://www.express-gateway.io/docs/configuration/#environment-variables-in-configuration-files) 
 
## Configuration Changes
Another day - another refactor! Yes, you guessed it - we refactored the configuration handler. We were noticing there was a bunch of duplication and this was providing a poor experience and we wanted to squash this bug before it got out of hand. So, we also made a few more changes: 
 
* Removed `loadSystemConfig` and `loadGatewayConfig` in favor of `loadConfig(type)` function
* Removed the two watcher in favor of a single one
* Emit the `hot-reload` event only if the file has been correctly reloaded

Additionally, we added single `chokidar` watcher for hot reload feature. While this is a change most people won’t care about - we think it’s nifty to clean up technical debt and make everything nice and clean.
 
So many new changes, if you have not already checked it out, now’s the time to hop on it!
 
 
**Additional Resources**
* Have Questions? Head over to  [our Gitter channel](https://gitter.im/ExpressGateway/express-gateway) and hit us up!
* We love feedback! Find us on twitter: [@express_gateway](https://twitter.com/express_gateway) for questions comments or feedback.
* [Sign up for our monthly newsletter](http://eepurl.com/cVOqd5) to get the latest updates, news and features.

