---
layout: page
title: Getting Started
class: getting-started
permalink: /getting-started/
---
<section class="screencast-feature">
<div class="video-border moveback">
</div>
<div class="video-container">
</div>
{% include icon-play-button.svg %}
</section>
<section class="page-section-normal">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column shape-style" markdown="1">
## Installation

Installing Express Gateway is a simple 4-step process.

1. <span class="li-main">Install Express Gateway</span><span class="codeHighlight">npm install -g express-gateway</span>
2. <span class="li-main">Create an Express Gateway</span>
  <span class="codeHighlight"> $ eg gateway create</span>
3. <span class="li-main">Follow the prompts and choose key authorization</span>
  <span class="codeHighlight" markdown="1">
  ```shell
  ? What is the name of your Express Gateway? my-gateway
  ? What directory would you like to install your Express Gateway? my-gateway
  ? What type of Express Gateway do you want to create? (Use arrow keys)
    Getting Started Demo
    Gateway with Key Authorization
    Gateway with Basic Authorization
    Gateway with OAuth2 Authorization
    Basic Gateway Configuration
  ```
4. <span class="li-main">Run Express Gateway</span>
  <span class="codeHighlight">cd my-gateway</span>
  <span class="codeHighlight">npm start</span>
</div>
</div>
</div>
</section>

<div class="svg-fix">{% include wave-1.svg %}</div>
<section class="page-section-blue">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column quickstart" markdown="1">

## 5-minute Getting Started Guide

Before you start: Make sure you've [installed the Express Gateway](#installation) and have it up running — It should only take a minute!

In this quick start guide, you’ll...

1. Specify a microservice and expose as an API
2. Define a consumer of your API
3. Secure the API with Key Authorization

</div>
</div>
</div>
<div class="svg-fix">{% include wave-2.svg %}</div>
</section>

<section class="page-section-normal">
<div class="wrapper-flex">
<div class="wrapper">
<div class="flex-column shape-style shape-style-large" >

<ol class="">
<li>
<div class="shape-style-large-container" markdown="1">
##### Specify a microservice and expose as an API
###### Step 1
We’re going to specify an existing service to proxy and manage as if it were our own originating from within the firewall. The service allows users to search for blah and returns back a JSON string as output. It’s freely public and we’re going to showcase the capabilities of the Express Gateway
<ol>
<li>Curl - https://service-url</li>
<li markdown="1">
```javascript
var rawr = ["r", "a", "w", "r"];
function thishasareallylongnamesoleck(){
  const that
}
function this(){
  const that
}
function this(){
  const that
}
```
</li>
</ol>

###### Step 2
![Specify Microservice]({{ site.baseurl }}/assets/img/Marchitecture_Specify-Microservice-Step-2.png "Specify Microservice")
The service will be specified as a private endpoint in the default pipeline in Express Gateway.  A pipeline is a set of policies.  One of the policies that Express Gateway supports is a proxy policy.  Using the proxy policy within the default pipeline, the gateway will now sit in front of the API and route external requests to the API
<ol>
<li>go to /config</li>
<li markdown="1">
```javascript
var rawr = ["r", "a", "w", "r"];
function thishasareallylongnamesoleck(){
  const that
}
function this(){
  const that
}
function this(){
  const that
}
```
</li>
</ol>

###### Step 3
![Expose API]({{ site.baseurl }}/assets/img/Marchitecture_Specify-Microservice-Step-3.png "Expose API")
We’re going to expose the API as a public endpoint. When an API is made public through a public endpoint, the API can be accessed externally.
<ol>
<li>Goto /config</li>
<li markdown="1">
```javascript
var rawr = ["r", "a", "w", "r"];
function thishasareallylongnamesoleck(){
  const that
}
function this(){
  const that
}
function this(){
  const that
}
```
</li>
</ol>

###### Step 4
![Access API]({{ site.baseurl }}/assets/img/Marchitecture_Specify-Microservice-Step-4.png "Access API")
Now that we have a public endpoint surfaced, we should be able to access the API.
1. Type in public endpoint URL
2. Access JSON
</div>
</li>
<li>
<div class="shape-style-large-container" markdown="1">

##### Define API Consumer
###### Step 1


To manage our API, we’re going to define authorized users known as “Consumers” that are allowed to utilize the API.

<ol>
<li>Goto /config</li>
<li markdown="1">
```javascript
var rawr = ["r", "a", "w", "r"];
function thishasareallylongnamesoleck(){
  const that
}
function this(){
  const that
}
function this(){
  const that
}
```
</li>
</ol>

###### Step 2

The service will be specified as a private endpoint in the default pipeline in Express Gateway.  A pipeline is a set of policies.  One of the policies that Express Gateway supports is a proxy policy.  Using the proxy policy within the default pipeline, the gateway will now sit in front of the API and route external requests to the API

<ol>
<li>Curl - https://service-url</li>
<li markdown="1">
```javascript
var rawr = ["r", "a", "w", "r"];
function thishasareallylongnamesoleck(){
  const that
}
function this(){
  const that
}
function this(){
  const that
}
```
</li>
</ol>
</div>
</li>
<li>
<div class="shape-style-large-container" markdown="1">

##### Secure the API with Key Authorization

Right now the API is fully exposed and accessible via its public endpoint. We’re now going to secure it with key authorization. To do so we’ll add the key authorization policy to the default pipeline.

<ol>
<li>Goto /config</li>
<li markdown="1">
```javascript
var rawr = ["r", "a", "w", "r"];
function thishasareallylongnamesoleck(){
  const that
}
function this(){
  const that
}
function this(){
  const that
}
```
</li>
<li markdown="1">Assign the key credential to Bob (eg create key bob)
![secure-1]({{ site.baseurl }}/assets/img/secure-1.png "Secure-1")
</li>
<li markdown="1">Curl API endpoint without credentials - FAIL
![secure-2]({{ site.baseurl }}/assets/img/secure-2.png "Secure-2")
</li>
<li markdown="1">Curl API endpoint with Bob and key credentials - SUCCESS!
![secure-3]({{ site.baseurl }}/assets/img/secure-3.png "Secure-3")
</li>
</ol>
</div>
</li>
</ol>

</div>
</div>
</div>
</section>
