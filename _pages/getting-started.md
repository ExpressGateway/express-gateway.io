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
3. <span class="li-main">Follow the prompts and choose the Getting Started server template</span>
<!--
  div spaced 4 characters to render inside list.
  code whitespace removed to avoid whitespace in snippet
-->
    <div class="codeHighlight" markdown="1">
```shell
$ test
➜ eg gateway create
? What is the name of your Express Gateway? my-gateway
? Where would you like to install your Express Gateway? my-gateway
? What type of Express Gateway do you want to create? (Use arrow keys)
❯ Getting Started with Express Gateway
  Basic (default pipeline with proxy)
```
    </div>
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

Before you start: Make sure you've [installed the Express Gateway](#installation) and have it up running with the Getting Started server template — It should only take a minute!

In this quick start guide, you’ll...

1. Specify a microservice and expose as an API
2. Define a consumer of your API
3. Secure the API with Key Authorization

Note: Express Gateway comes with an in-memory database.  All config file changes done as part of the guide will not require you to restart Express Gateway.  The [hot reload feature]{{ site.baseurl }}{% link docs/runtime.md %} will take of this automatically without a restart.

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
We’re going to specify an existing service - [http://httpbin.org/ip](http://httpbin.org/ip) to proxy and manage as if it were our own originating from within the firewall. The service allows users to do get a GET and returns back a JSON string as output. It’s freely available and we’re going to showcase the capabilities of the Express Gateway
<ol>
<li markdown="1">
<span class="codeHighlight">curl http://httpbin.org/ip</span>
```shell
{
  "origin": "73.92.47.31" # this will be your own IP address
}
```
</li>
</ol>

###### Step 2
![Specify Microservice]({{ site.baseurl }}/assets/img/Marchitecture_Specify-Microservice-Step-2.png "Specify Microservice")
The service will be specified as a service endpoint in the default pipeline in Express Gateway.  A pipeline is a set of policies.  Express Gateway has a proxy policy.  Using the proxy policy within the default pipeline, the gateway will now sit in front of the [http://httpbin/ip](http://httpbin/ip) service and route external requests to it as a service endpoint
<ol>
<li><span class="codeHighlight">cd my-gateway/config</span></li>
<li markdown="1">
<p>open <span class="codeHighlight">gateway.config.yml</span> and find the <span class="codeHighlight"> serviceEndpoints</span> section where a service endpoint named <span class="codeHighlight">httpbin</span> has been defined</p>
```yaml
serviceEndpoints:
  httpbin:
    url: 'https://httpbin.org'
```
</li>
<li markdown="1">
<p>next find the <span class="codeHighlight">httpbin serviceEndpoint</span> in the <span class="codeHighlight">proxy</span> policy of the <span class="codeHighlight">default</span> pipeline</p>
```yaml
...
 - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true
...
```
</li>
</ol>

###### Step 3
![Expose API]({{ site.baseurl }}/assets/img/Marchitecture_Specify-Microservice-Step-3.png "Expose API")
We’re going to expose the httpbin service as an API endpoint through Express Gateway. When an API is made public through an API endpoint, the API can be accessed externally.

<ol>
<li><p>open <span class="codeHighlight">gateway.config.yml</span></p></li>
<li markdown="1">find the <span class="codeHighlight"> apiEndpoints</span> section where an API endpoint named "api" has been defined
```yaml
apiEndpoints:
  api:
    host: 'localhost'
    paths: '/ip'
```

Note: the path of the API request is appended to the service endpoint by default by the proxy policy
</li>
</ol>

###### Step 4
![Access API]({{ site.baseurl }}/assets/img/Marchitecture_Specify-Microservice-Step-4.png "Access API")
Now that we have a API endpoint surfaced, we should be able to access the API through Express Gateway.
<p><span class="codeHighlight">curl http://localhost:8080/ip</span>
</div>
<li>

<div class="shape-style-large-container" markdown="1">

##### Define API Consumer
###### Step 1


To manage our API, we’re going to define authorized users known as “Consumers” that are allowed to utilize the API.

INSERT NEW BOB DIAGRAM HERE

<ol>
<li><span class="codeHighlight">cd my-gateway</span></li>
<li markdown="1"><span class="codeHighlight">eg user create</span>
```shell
$ eg users create
? Enter username [required]: bob
? Enter firstname [required]: Bob
? Enter lastname [required]: Smith
? Enter email:
? Enter redirectUri:
✔ Created bob
```
</li>
</ol>
</div>
</li>

<li>
<div class="shape-style-large-container" markdown="1">

##### Secure the API with Key Authorization
###### Step 1
Right now the API is fully exposed and accessible via its API endpoint. We’re now going to secure it with key authorization. To do so we’ll add the key authorization policy to the default pipeline.

<p>In <span class="codeHighlight">gateway.config.yml</span> find the <span class="codeHighlight"> pipelines</span> section where the "default" pipeline  has been defined</p>
```yaml
pipelines:
  - name: getting-started
    apiEndpoints:
      - api
    policies:
      - key-auth:
      - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true
```

###### Step 2
![secure-1]({{ site.baseurl }}/assets/img/secure-1.png "Secure-1")
<p>Assign the key credential to Bob</p>
<p><span class="codeHighlight">eg credential -c bob -t key-auth -q</span></p>
```shell
$ output of the key
```

###### Step 3
![secure-2]({{ site.baseurl }}/assets/img/secure-2.png "Secure-2")
<p>Curl API endpoint without credentials - FAIL</p>
<p><span class="codeHighlight">curl http://localhost:8080/ip</span></p>
```shell
$ output of the failed url
```

###### Step 4
![secure-3]({{ site.baseurl }}/assets/img/secure-3.png "Secure-3")
<p>Curl API endpoint as Bob with key credentials - SUCCESS!</p>
<p><span class="codeHighlight">curl `-H "Authorization: apiKey ${keyId}:${keySecret}"` http://localhost:8080/ip</span></p>
```shell
{
  "origin": "73.92.47.31"
}
```
</div>
</li>
</ol>

</div>
</div>
</div>
</section>
