---
layout: post
title: "Implementing Key Authentication in Express Gateway"
date:   2017-08-08 12:00:00 -0400
category: guides
author: "Jordan Kasper"
#
# Please remember to update ~/_archives-month, ~/_archives-year
# and ~/_categories with any necessary archive needs
#
---
You've probably used it before: key authentication. The basic idea is simple, to authenticate your app or client with a given service you send a key to identify (and authorize) yourself. This is not intended for individual users necessarily, but rather for systems talking to each other. (Just to be clear, for users authenticating themselves you might want to look into OAuth2, something Express Gateway also offers.)

<!--excerpt-->

_Originally posted on [www.lunchbadger.com](https://www.lunchbadger.com)._

![Implementing Key Authentication in Express Gateway](/assets/img/implement-key-auth.png)

You've probably used it before: key authentication. The basic idea is simple, to authenticate your app or client with a given service you send a key to identify (and authorize) yourself. This is not intended for individual users necessarily, but rather for systems talking to each other. (Just to be clear, for users authenticating themselves you might want to look into OAuth2, something Express Gateway also offers.)

In this article I'll be showing you how to get up and running with key authentication quickly and easily with Express Gateway (EG). We'll talk about setting up and configuring your gateway, creating credentials, and sending authenticated requests. This is a brief introduction, so be sure to read the documentation and test things before you deploy your API gateway!

### Creating and Configuring the Gateway

Your first step might be to generate a new Express Gateway instance. (Feel free to skip this step if you've already done this.) You'll want to first install the `express-gateway` package and then generate a new gateway:

```
~$ npm i -g express-gateway
```

```
~$ eg gateway create
? What's the name of your Express Gateway? widget-factory
? Where would you like to install your Express Gateway? widget-factory
? What type of Express Gateway do you want to create? Getting Started with Express Gateway
    created package.json
    created server.js

    ...

To start widget-factory, run the following commands:
    cd widget-factory && npm start
```

Great! Before we start up our gateway for the first time, let's go ahead and configure it.

##### Gateway Configuration

Express Gateway has two primary configuration files (plus model configuration) in the `/config` directory of your new project: the `gateway.config.yml` file and the `system.config.yml` file. The system config file is where you will set up things like database access (for the gateway, not your individual microservices) and certain security settings for things like OAuth2. We won't be working in that file today (which also means our **users and credentials will not be saved** for this example).

The gateway configuration file is where you configure HTTP, endpoints, policies (like key authentication), and pipelines (which are just a series of policies applied to some endpoints). The default generated config file creates one API endpoint for the gateway at `/ip` and proxies those requests to <https://httpbin.org/ip> - you'll want to change that later, but we'll leave it for now. What we need to do is add a policy to the "api-basic" pipeline (the only one in there).

Find your "pipelines" block in the `gateway.config.yml` file and make it look like this:

```
pipelines:
  - name: api-basic
    apiEndpoints:
      - api
    policies:
      - key-auth:  ### This line is new!!
      - proxy:
        - action:
            serviceEndpoint: httpbin
            changeOrigin: true
```

Notice that we added our "key-auth" policy **before** the "proxy" policy. The policies in each pipeline are _ordered_, so be sure to put them in the order you want them to execute. In our case, we should _not_ proxy the API request if the authentication fails.

Believe it or not, that's the _only_ change you need to make to our demo gateway to enable key authentication! You can test this out by starting up the gateway and making a simple `GET` request to `/ip` (or any other endpoint really):

```
~/widget-factory$ npm start
```

You can test the HTTP request using cURL, or a tool like [Postman](https://www.getpostman.com/) (which I highly recommend for API development). Here is the response you might get using cURL:

```
~$ curl -D - "http://localhost:8080/ip"
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 9
ETag: W/"9-PatfYBLj4Um1qTm5zrukoLhNyPU"
Date: Sun, 16 Jul 2017 19:37:52 GMT
Connection: keep-alive

Forbidden
```

Notice that our response code was `401` because we did _not_ send an API key. We'll talk more about these status codes later, but for now let's make an API key.

##### Generating Key Credentials

Our first step to create an API key is to create a "user" in the system. Open up another terminal window and navigate to your gateway project directory. Now we can use the same `eg` command we used to generate the gateway to create credentials:

```
~/widget-factory$ eg users create
? Enter username [required]: jordan
? Enter firstname [required]: Jordan
? Enter lastname [required]: Kasper
? Enter email: jordan@widgets-r-us.com
? Enter redirectUri:
✔ Created jordan
```

I've left the `redirectUri` blank here because we are not using it in key authentication, but you might need for other schemes. Now that we have a user, can either create an "app" for that user and then "credentials", or we can just create the "credentials" for the user themselves. I'll do the second option for now:

```
~/widget-factory$ eg credentials create -c jordan -t key-auth
✔ Created
 {
  "isActive": true,
  "createdAt": "Sun Jul 16 2017 15:48:48 GMT-0400 (EDT)",
  "updatedAt": "Sun Jul 16 2017 15:48:48 GMT-0400 (EDT)",
  "keyId": "0J6961Lhn8JgxYybTXFdRg",
  "keySecret": "23BfI6QVqgdxP3ty8F4Jx3",
  "scopes": null,
  "consumerId": "jordan"
}
```

That's it! Notice that the output above shows us out `"keyId"` and `"keySecret"`. These two pieces together create our final API key for the system.

### Sending Authenticated Requests

Now that we have some credentials we can send some more requests to our API (through our gateway).

```
~$ curl -H "Authorization: apiKey 0J6961Lhn8JgxYybTXFdRg:23BfI6QVqgdxP3ty8F4Jx3" -I "http://localhost:8080/ip"
HTTP/1.1 200 OK
x-powered-by: Flask
connection: close
server: meinheld/0.6.1
date: Sun, 16 Jul 2017 19:54:49 GMT
content-type: text/html; charset=utf-8
content-length: 12793
access-control-allow-origin: *
access-control-allow-credentials: true
x-processed-time: 0.00561594963074
via: 1.1 vegur
```

There are two points of note above: first, we got a `200` response! That's great, that means our auth check passed! So how did we do that? We sent the `Authorization` header with our key in it. Remember, our key is made up of two parts. So you can see above that the `Authorization` header value is actually two pieces of information separated by a colon (":"). Additionally, we prefix that value with our header scheme: "apiKey".

```
Authorization: apiKey 0J6961Lhn8JgxYybTXFdRg:23BfI6QVqgdxP3ty8F4Jx3

 header name : scheme        keyId          :      keySecret
```

##### Status Codes

As you see above, we got a `200` response status code, meaning success! That status code actually came from our API service (in this case httpbin.org) _not_ from our gateway. If you request a resource that doesn't exist on that service you should receive a `404`, for example. The gateway will send back a `401` when the key is not authenticated - or missing entirely. But it could also send back a `403` if the user is authenticated, but not authorized for the given resource. This could happen if you are using "scopes".

### What's a Scope?

We won't get deep into scopes in this blog post, but the scopes are the main entities for specifying authorizations within Express Gateway. A scope is simply a pre-defined string added to your gateway configuration (both on an API endpoint and then again on a policy in a pipeline for that endpoint). API endpoints are secured by specifying scopes. To be authorized for an API endpoint that is secured by a scope, a consumer must have a credential containing the scope listed on the API endpoint. In other words, the scopes on the endpoint have to match the scopes on the user's (or app's) key credentials.

### Additional Configuration

There are more options you can add to your gateway "key-auth" policy to secure it further or simply customize it. For example, by default the gateway will accept keys in both the headers and query string as well. You can easily disable this with the `disableQueryParam` option:

```
pipelines:
  - name: api-basic
    apiEndpoints:
      - api
    policies:
      - key-auth:
        - disableQueryParam: true  ### Disable API keys in the query string
      - proxy:
        - action:
            serviceEndpoint: httpbin
            changeOrigin: true
```

You can also change the header used for authentication (although this would break with current standards) or the scheme used:

```
pipelines:
  - name: api-basic
    apiEndpoints:
      - api
    policies:
      - key-auth:
        - apiKeyHeader: "X-My-Auth-Header"
        - apiKeyHeaderScheme: "key-pair"
      - proxy:
        - action:
            serviceEndpoint: httpbin
            changeOrigin: true
```

If you used the configuration above you would need to modify the header you send in all authenticated API requests like so:

```
~$ curl -H "X-My-Auth-Header: key-pair 0J6961Lhn8JgxYybTXFdRg:23BfI6QVqgdxP3ty8F4Jx3" -I "http://localhost:8080/ip"
```

### Managing Key Credentials

Our last topic for this post has to do with managing those keys you've generated. You will probably find a time when you need to deactivate a user's access. This is easily accomplished on the command line by deactivating their credentials:

```
~$ eg credentials deactivate -t key-auth 0J6961Lhn8JgxYybTXFdRg
✔ Deactivated 0J6961Lhn8JgxYybTXFdRg
```

After performing this action, the given `keyId` will no longer be authenticated in the gateway. This is _not_ a permanent action, and the credentials can easily be reactivated with the companion `activate` sub command:

```
~$ eg credentials activate -t key-auth 0J6961Lhn8JgxYybTXFdRg
✔ Activated 0J6961Lhn8JgxYybTXFdRg
```

### Wrapping Up

One of the biggest things an API gateway can do for you is centralize the authentication for your various microservices. And Express Gateway makes this process extremely straight forward. Take a look at the [documentation](http://www.express-gateway.io/docs) and give it a try!
