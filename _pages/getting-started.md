---
layout: page
title: Getting Started
class: getting-started
permalink: /getting-started/
---
<section class="screencast-feature">
  <div class="video-aspect-ratio">
    <div class="video-border moveback">
    </div>
    <div class="video-container">
    {% include video_atrest.svg %}
    </div>
    {% include icon-play-button.svg %}
  </div>
  {% include wave-video-bg.svg %}
  {% include wave-video-single-bg.svg %}
</section>

<article class="getting-started-wrapper">
<section class="page-section-normal shape-style flex-column pseudo-wrapper" markdown="1">

## Installation

Installing Express Gateway is a simple 4-step process.

1. ##### Install Express Gateway
    <span class="codeHighlight">npm install -g express-gateway</span>
2. ##### Create an Express Gateway
  <span class="codeHighlight"> $ eg gateway create</span>
3. ##### Follow the prompts and choose the Getting Started server template

    ```shell
    ➜ eg gateway create
    ? What is the name of your Express Gateway? my-gateway
    ? Where would you like to install your Express Gateway? my-gateway
    ? What type of Express Gateway do you want to create? (Use arrow keys)
    ❯ Getting Started with Express Gateway
      Basic (default pipeline with proxy)
    ```

4. ##### Run Express Gateway
  <span class="codeHighlight">cd my-gateway && npm start</span>


</section>
<div class="svg-fix wave-1">{% include wave-1.svg %}</div>
<section class="page-section-blue flex-column pseudo-wrapper quickstart" markdown="1">

## 5-minute Getting Started Guide

Before you start: Make sure you've [installed the Express Gateway](#installation) and have it up running with the Getting Started server template.

In this quick start guide, you’ll...

1. Specify a microservice and expose as an API
2. Define a consumer of your API
3. Secure the API with Key Authorization

Note: Express Gateway comes with an in-memory database.  All config file changes done as part of the guide will not require you to restart Express Gateway.  The [hot reload feature]({{ site.baseurl }}{% link docs/runtime.md %}) will take of this automatically without a restart.
</section>
<div class="svg-fix wave-2">{% include wave-2.svg %}</div>

<section class="page-section-normal shape-style shape-style-large flex-column pseudo-wrapper" markdown="1">

1. ##### Specify a microservice and expose as an API
    - ###### Step 1
      - We’re going to specify an existing service - [http://httpbin.org/ip](http://httpbin.org/ip) to proxy and manage as if it were our own originating from within the firewall. The service allows users to do get a GET and returns back a JSON string as output. It’s freely available and we’re going to showcase the capabilities of the Express Gateway

      1. <p>open another terminal window
      2. <p><span class="codeHighlight">curl http://httpbin.org/ip</span></p>

          ```shell
          {
            "origin": "73.92.47.31" # this will be your own IP address
          }
          ```

    - ###### Step 2
    - {% include getting-started/gs-1-2.svg %}
    - The service will be specified as a service endpoint in the default pipeline in Express Gateway.  A pipeline is a set of policies.  Express Gateway has a proxy policy.  Using the proxy policy within the default pipeline, the gateway will now sit in front of the [http://httpbin/ip](http://httpbin/ip) service and route external requests to it as a service endpoint
      1. <p><span class="codeHighlight">cd my-gateway/config</span></p>
      2. <p>open <span class="codeHighlight">gateway.config.yml</span> and find the <span class="codeHighlight"> serviceEndpoints</span> section where a service endpoint named <span class="codeHighlight">httpbin</span> has been defined</p>

          ```yaml
          serviceEndpoints:
            httpbin:
              url: 'https://httpbin.org'
          ```

      3. <p>next find the <span class="codeHighlight">httpbin serviceEndpoint</span> in the <span class="codeHighlight">proxy</span> policy of the <span class="codeHighlight">default</span> pipeline</p>

          ```yaml
          ...
            - proxy:
            - action:
                serviceEndpoint: httpbin
                changeOrigin: true
          ...
          ```

    -  ###### Step 3
      - {% include getting-started/gs-1-3.svg %}
      - We’re going to expose the httpbin service as an API endpoint through Express Gateway. When an API is made public through an API endpoint, the API can be accessed externally.
      1. <p>open <span class="codeHighlight">gateway.config.yml</span></p>
      2. <p>find the <span class="codeHighlight"> apiEndpoints</span> section where an API endpoint named "api" has been defined</p>

          ```yaml
          apiEndpoints:
            api:
              host: 'localhost'
              paths: '/ip'
          ```

    Note: the path of the API request is appended to the service endpoint by default by the proxy policy

    - ###### Step 4
      - {% include getting-started/gs-1-4.svg %}
      - Now that we have a API endpoint surfaced, we should be able to access the API through Express Gateway.
      - `curl http://localhost:8080/ip`

2. ##### Define API Consumer
    - ###### Step 1
    - To manage our API, we’re going to define authorized users known as “Consumers” that are allowed to utilize the API.
      1. <p><span class="codeHighlight">cd my-gateway</span></p>
          - {% include getting-started/gs-2-2.svg %}
      2. <p><span class="codeHighlight">eg users create</span></p>

          ```shell
          $ eg users create
          ? Enter username [required]: bob
          ? Enter firstname [required]: Bob
          ? Enter lastname [required]: Smith
          ? Enter email:
          ? Enter redirectUri:
          ✔ Created bob
          ```

3. ##### Secure the API with Key Authorization
    - ###### Step 1
      - Right now the API is fully exposed and accessible via its API endpoint. We’re now going to secure it with key authorization. To do so we’ll add the key authorization policy to the default pipeline.
      - In <span class="codeHighlight">gateway.config.yml</span> find the <span class="codeHighlight"> pipelines</span> section where the "default" pipeline has been defined

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

    - ###### Step 2
      - {% include getting-started/gs-3-3.svg %}
      - Assign the key credential to Bob
      - `eg credentials create -c bob -t key-auth -q`

          ```shell
          $ eg credentials create -c bob -t key-auth -q
          0Er0Ldv5EHSUE364Dj9Gv:2Yzq1Pngs1JYaB2my9Ge4u
          ```

      - Note: the -q option above, limits the output to just the API key, making it easier for copying and pasting.

    - ###### Step 3
      - {% include getting-started/gs-3-4.svg %}
      - <p>Curl API endpoint without credentials - FAIL</p>
      - <p><span class="codeHighlight">curl http://localhost:8080/ip</span></p>

          ```shell
          $ curl http://localhost:8080/ip
            Forbidden
          ```

    - ###### Step 4
      - {% include getting-started/gs-3-5.svg %}
    - <p>Curl API endpoint as Bob with key credentials - SUCCESS!</p>
    - <p><span class="codeHighlight">curl -H "Authorization: apiKey ${keyId}:${keySecret}" http://localhost:8080/ip</span></p>

        ```shell
        $ curl -H "Authorization: apiKey 0Er0Ldv5EHSUE364Dj9Gv:2Yzq1Pngs1JYaB2my9Ge4u" http://localhost:8080/ip
        {
          "origin": "73.92.47.31"
        }
        ```

</section>
</article>
