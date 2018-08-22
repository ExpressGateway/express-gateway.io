---
title: Amazon API Gateway VS. Express Gateway
date: 2018-08-16 07:04:00 Z
categories:
- technology
- comparison
tags:
- api gateway
- aws
layout: post
author: Vincenzo Chianese
---

If you’re curious about how your API Gateway stacks up, now’s the time to listen up because we’re breaking down the differences (and similarities) of the most popular projects for the API Gateway use case.

<!--excerpt-->

First up, we’ve got Amazon API Gateway and we’re going to compare it to Express Gateway, an open source API Gateway built entirely on Express.js.

_TLDR: You can skip ahead to the [deep dive][deep_dive]_


For the rest of you, here’s a quick hype-free run down. If you’re like us and sick of the buzzword salad, then take a look at the real deal and let us know what you think.

### Overview

While it’s true that Amazon (AWS) is ubiquitous across most use cases, it’s important to remember that it may not be right for everything. What do you do? That’s the problem – vendor lock in. Being locked into a vendor costs you money, but more importantly, it costs you time. Think of agility and speed as two of your best tools to be able to respond to the needs of customers or demands of the market.

### Speed = Survival

Hidden fees and the cost of migration at scale can slow you down. There’s more “gotchas” where that came from. For instance,  Did you know that writing to AWS is part of your free Tier Usage but reading is not. What good does that do? AWS Lambda is low cost so you can catch a break there, but you’ve gotta use the Amazon API Gateway to surface AWS lambda natively outside of AWS.

News Flash: it’s **expensive**.

So while we won’t cover those aspects in the comparison between Amazon (AWS) API Gateway and Express Gateway, keep this (and more) in mind when looking at Amazon (AWS) API Gateway.

### Factors to consider when comparing API Gateways

* Elevator Pitches – What’s the short and sweet?
* Features and Architecture – How does that backend look?
* Getting Started, Deployment and Configuration – What does it take to get up and running?
* Administration and Maintenance – How much effort is it on a daily basis?
* Features Comparison – Side by Side showdown of popular features you are already using (or should be)
* Custom Extensions – What does the extension ecosystem look like?

### Why are we talking API Gateways?

In our analysis, we’ll compare the Amazon (AWS) API Gateway and Express Gateway, an API Gateway built entirely on Express.js. We’ll also explain exactly what an API Gateway s, but for now – you need to know that this handy piece of architecture is important if you are working with APIs and Microservices. Two things, we’re obviously passionate about. Think of an API Gateway…like air traffic control. They get that data where it needs to go so even if you think you’ve got it locked down, it never hurts to take a look at the latest and greatest (especially if it’s open source!).

[Checkout the deep dive][deep_dive]

### Moving On

**Disclaimer:** No actual HoneyBadgers were hurt during this comparison. Additionally, if you’re interested in more of these topics, join the live discussion on Twitter [@lunchbadger](https://twitter.com/lunchbadger) or [@express_gateway](https://twitter.com/express_gateway).

[deep_dive]: {{ site.baseurl }}{% link _pages/eg-aws-deep-dive.md %}
