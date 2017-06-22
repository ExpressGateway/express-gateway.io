---
layout: documentation
title: Getting Started
class: getting-started
permalink: /getting-started/
links:
  - display: Installation
    link: installation
  - display: Five-Minute Quickstart
    link: five-minute-quickstart
---

## Installation

1. Clone Express Gateway Repo &#10230; <span class="codeHighlight">git clone git@github.com:LunchBadger/express-gateway.git</span>
2. Install the dependencies
  Make sure you have git
  Express Gateway runs with Node.js.  If you haven’t already installed Node.js, you can get it from their downloads page
3. Install Express Gateway
  <span class="codeHighlight">git clone git@github.com:LunchBadger/express-gateway.git</span>
  <span class="codeHighlight">cd express-gateway</span>
  <span class="codeHighlight">npm install</span>
4. Run Express Gateway
  <span class="codeHighlight">npm start</span>

  (The EG should have some kind of default test or something that runs)

## Five-Minute Quickstart

<span>Before you start: Make sure you've [installed the Express Gateway](#install) — It should only take a minute!</span>

In this quickstart guide, you’ll get the Express Gateway up and running and then…

1. Specify a microservice and expose as an API
2. Define an API consumer
3. Secure the API with Key Authorization

### Specify a microservice

#### Step 1

We’re going to specify an existing service[a] to proxy and manage as if it were our own originating from within the firewall. The service allows users to search for blah and returns back a JSON string as output. It’s freely public and we’re going to showcase the capabilities of the Express Gateway

1. Curl - https://service-url
2. (JSON output in a codebox)/

#### Step 2

The microservice will be specified as a service endpoint in the default pipeline in Express Gateway.  A pipeline is a set of policies.  One of the policies that Express Gateway supports is a proxy policy.  Using the proxy policy within the default pipeline, the gateway will now sit in front of the API and route external requests to the API

1. go to /config
2. (modify JSON codeblock)

#### Step 3

We’re going to expose the microservice as an API endpoint. When the microservice is made public through a API endpoint, the API can be accessed externally.

1. Goto /config
2. (modify JSON codeblock)

#### Step 4

Now that we have a API endpoint surfaced, we should be able to access it.

1. Type in public endpoint URL
2. Access JSON


### DEFINE API CONSUMER

#### Step 1

To manage our API, we’re going to define authorized users known as “Consumers” that are allowed to utilize the API.

1. Curl - https://service-url
2. (JSON output in a codebox)/

#### Step 2

The service will be specified as a private endpoint in the default pipeline in Express Gateway.  A pipeline is a set of policies.  One of the policies that Express Gateway supports is a proxy policy.  Using the proxy policy within the default pipeline, the gateway will now sit in front of the API and route external requests to the API

1. go to /config
2. (modify JSON codeblock)
