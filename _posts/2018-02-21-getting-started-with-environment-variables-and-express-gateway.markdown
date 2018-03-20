---
title: Getting Started with Environment Variables and Express Gateway
date: 2018-02-21 07:02:00 Z
categories:
- guides
layout: post
---

There are a lot of resources out there when it comes to exploring the ins-n-outs of environment variables. Recently, we added support for environment variables in Express Gateway as a response to request we received from developers who are using Express Gateway in production right now. So, we’d like to take a moment and go into more depth on how you can get started with Environment Variables and Express Gateway.


<!--excerpt-->

## Intro: The skinny on Environment Variables

You’re probably wondering what an environment variable is in Express Gateway or maybe you have never thought about them at all. Let’s take a quick review of Environment Variables.

An environment variable is:

* A dynamic-named value

* Part of the environment in which a process runs,and

* this process can affect the way other processes will behave

That is an overly broad way to simply say that these are variables that you can set at the user or the system level which describe the current working directory or where the temporary files are stored. There are two types - user and system environment variables.

**User environment variables** contain values that differ from user to user.

**System variables are “global”** meaning that they are the same for all users.

For Express Gateway this is not important, but it’s good to understand basic concepts.

## Environment Variables & Express Gateway

Express Gateway is driven by a YAML file which now accepts variables for things like hostnames, ports paths or practically anything. This is important because can dynamically set those variable values in your environment. It can also be scripted so that you send those variables to the `/YAML` and they will be filled in dynamically.

Let’s face it - *hard coding config variables is a pain.*

Dynamically configuring variables is much more useful. For example, when you are building different configurations for different environments like testing versus production.

## Working with Environment Variables

Environment Variables can be employed in the configuration files of Express Gateway. A key feature of the configuration file is that it is completely separate from the static code that you use to run the API Gateway. So in order to get started with Environment Variables, we should take a look at the configuration files and understand more about how they’re set up.

You can find all of the necessary configuration centralized in the `/config` directory of the main Express Gateway directory. Additionally, configuration is divided into the following levels:

| Level   | Name    | File/Directory               |
|---------|:---------:|:------------------------------:|
| 1 (top) | gateway |  /config/gateway.config.yml  |
| 2       | system  |  /config/system.config.yml   |
| 3       | data    |  /config/models              |

By separating out configuration into these levels, you can configure and manage Express Gateway without having to concern yourself with details that may not be relevant to you as a user, operator, administrator or developer.

TLDR: lower level, higher complexity.

So, now that we’ve covered the configuration piece, it’s worth reviewing the syntax, an important aspect to working with environment variables.

## Two Things Are Certain: Death and Syntax

When we thought about it long and hard, we realized that we needed to make environment variables easy to use and that means using a well recognized syntax. So, we chose the [Docker Compose YAML files](https://docs.docker.com/engine/reference/builder/#environment-replacement).

What’s covered:
Substituting environment variables
Setting environment variables
Passing environment variables through
Setting default values in the “.env” file

Syntax sample:
`${ENV_VARIABLE_NAME:-DEFAULT_VALUE}`
`ENV_VARIABLE_NAME`: environment variable whose value will be put in the
config file.
`DEFAULT_VALUE`: fallback value, in case the environment variable is not defined.

If you’re ready to get started with Environment Variables in Express Gateway with this easy-to-follow How-To Video:

<iframe src="https://player.vimeo.com/video/256160092" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/256160092">How To Use Environment Variables In Express Gateway</a> with Vincenzo Chianese on <a href="https://vimeo.com/altsang">Vimeo</a>.</p>
