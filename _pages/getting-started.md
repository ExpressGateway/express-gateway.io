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
<!--
  div spaced 4 characters to render inside list.
  code whitespace removed to avoid whitespace in snippet
-->
    <div class="codeHighlight" markdown="1">
```shell
➜ eg gateway create
? What is the name of your Express Gateway? cool-gateway
? Where would you like to install your Express Gateway? cool-gateway
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
We’re going to specify an existing service - <a href="http://httpbin.org/get" _target="new">http://httpbin.org/get</a> to proxy and manage as if it were our own originating from within the firewall. The service allows users to do get a GET and returns back a JSON string as output. It’s freely public and we’re going to showcase the capabilities of the Express Gateway
<ol>
<li markdown="1">
<span class="codeHighlight">curl -i -X GET --url http://httpbin.org/get</span>
```shell
HTTP/1.1 200 OK
Connection: keep-alive
Server: meinheld/0.6.1
Date: Mon, 17 Jul 2017 03:59:33 GMT
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
X-Powered-By: Flask
X-Processed-Time: 0.000699996948242
Content-Length: 212
Via: 1.1 vegur

{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Connection": "close",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.51.0"
  },
  "origin": "73.92.47.31",
  "url": "http://httpbin.org/get"
}
```
</li>
</ol>

###### Step 2
![Specify Microservice]({{ site.baseurl }}/assets/img/Marchitecture_Specify-Microservice-Step-2.png "Specify Microservice")
The service will be specified as a private endpoint in the default pipeline in Express Gateway.  A pipeline is a set of policies.  One of the policies that Express Gateway supports is a proxy policy.  Using the proxy policy within the default pipeline, the gateway will now sit in front of the API and route external requests to the API
<ol>
<li><span class="codeHighlight">cd my-gateway/config</span></li>
<li><p>in <span class="codeHighlight">gateway.config.yml</span> find the <span class="codeHighlight"> serviceEndpoints</span> section where a service endpoint named "httpbin" has been defined</p></li>
<li markdown="1">
```yaml
serviceEndpoints:
  httpbin:
    url: 'https://httpbin.org'
```
</li>
<li><p>in <span class="codeHighlight">gateway.config.yml</span> find the "httpbin" serviceEndpoint in the proxy policy of the default pipeline</p></li>
<li markdown="1">
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
<li><p>in <span class="codeHighlight">gateway.config.yml</span> find the <span class="codeHighlight"> apiEndpoints</span> section where an API endpoint named "api" has been defined</p></li>
<li markdown="1">
```yaml
apiEndpoints:
  api:
    host: '*'
```
</li>
</ol>

###### Step 4
![Access API]({{ site.baseurl }}/assets/img/Marchitecture_Specify-Microservice-Step-4.png "Access API")
Now that we have a API endpoint surfaced, we should be able to access the API through Express Gateway.
1. <span class="codeHighlight">curl -i -X GET --url http://localhost/api</span>
</div>
</li>
<li>
<div class="shape-style-large-container" markdown="1">

##### Define API Consumer
###### Step 1


To manage our API, we’re going to define authorized users known as “Consumers” that are allowed to utilize the API.

INSERT NEW BOB DIAGRAM HERE

<ol>
<li><span class="codeHighlight">cd my-gateway</span></li>
<li><span class="codeHighlight">eg user create</span></li>
<li markdown="1">
```shell
? insert create user output here
```
</li>
</ol>
</div>
</li>

<li>
<div class="shape-style-large-container" markdown="1">

##### Secure the API with Key Authorization

Right now the API is fully exposed and accessible via its API endpoint. We’re now going to secure it with key authorization. To do so we’ll add the key authorization policy to the default pipeline.

<ol>
<li><p>in <span class="codeHighlight">gateway.config.yml</span> find the <span class="codeHighlight"> pipelines</span> section where the "default" pipeline  has been defined</p></li>
<li markdown="1">
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
</li>
<li markdown="1" class="flex-column">
![secure-1]({{ site.baseurl }}/assets/img/secure-1.png "Secure-1")
<p>Assign the key credential to Bob
<span class="codeHighlight">eg credential bob --type key</span></p>
</li>
<li markdown="1" class="flex-column">
![secure-2]({{ site.baseurl }}/assets/img/secure-2.png "Secure-2")
<p>Curl API endpoint as Bob without credentials - FAIL
<span class="codeHighlight">curl -i -X GET --url http://localhost/api</span></p>
</li>
<li markdown="1" class="flex-column">
![secure-3]({{ site.baseurl }}/assets/img/secure-3.png "Secure-3")
<p>Curl API endpoint as Bob with key credentials - SUCCESS!
<span class="codeHighlight">curl -i -X GET --url http://localhost/api</span></p>
</li>
</ol>
</div>
</li>
</ol>

</div>
</div>
</div>
</section>
