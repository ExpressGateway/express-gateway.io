---
layout: documentation
title: Guide
permalink: /guide/
links:
  - display: Installing
    link: installing
  - display: Getting Started
    link: getting-started
  - display: Core Concepts Explained
    link: core-concepts-explained
  - display: Configuring
    link: configuring
---

# Guide

Welcome to Express Gateway! The documentation for Express Gateway is written using Jekyll and Markdown. If you'd like to contribute, please see our [Github website repo](https://github.com/expressgateway/express-gateway.io)

### Installing

Express Gateway runs on Node.js. To get Node.js please visit the [Node.js Downloads Page](https://nodejs.org/en/download/).

Once you have Node.js, check out the [Getting Started](/getting-started) page on how to install Express Gateway and the 5-Minute Quick Start for a brief introduction on using it.

---

### Core Concepts

For an overview of Express Gateway and how it works, check out the [About](/about) page for a brief introduction.

Express Gateway comes with the following core entities:

- endpoints (API and service)
- policies
- pipelines
- consumers (users and apps)
- credentials

#### endpoints
Endpoints are URLs. Express Gateway exposes APIs through API endpoints. As a gateway, it proxies to microservices referenced in service endpoints.

#### policies
A policy is a set of conditions, action and parameters that are evaluated and act upon the API request and response flow within Express Gateway. Policies within Express Gateway utilize [Express middleware](http://expressjs.com/en/guide/using-middleware.html) at their core.

#### pipelines
A pipeline is a set of policies. Policies within a pipeline are evaluated and executed sequentially. API endpoints are linked to pipelines. An API request is received by the API endpoint and routed through the pipeline for policy execution. The last policy within a pipeline is often a proxy policy that will then ultimately route the request to a service endpoint.

#### consumers
A consumer makes API requests and consumes API responses. In Express Gateway, consumers are users and their apps.

#### credentials
Credentials are types of authentication and authorizations. In Express Gateway, a consumer may be assigned one or more credentials. Each credential specifies a set of scopes that are used for authorizations.

---

### Configuration

One of the key features of Express Gateway is that configuration is completely separate from static code used to run the gateway.  

All configuration is centralized and can be found in the `/config` directory of the main Express Gateway folder.

Configuration is divided into different levels:

Level          | Name           | File/Directory
-------------- | -------------- | --------------
1 (top)        | gateway        | /config/gateway.config.yml
2              | system         | /config/system.config.yml
3              | data           | /config/model-configs

The levels allow you to configure and manage Express Gateway without having to concern yourself with details that may not be relevant to you as a user, operator, administrator or developer. The lower the level, the higher the complexity.

#### gateway.config.yml
All of the application functionality is embodied in gateway.config.yml.  This config file describes the entire gateway's microservices and API operations at a glance.

gateway.config.yml is made up of the following sections:

- http
- https
- apiEndpoints
- serviceEndpoints
- policies 
- pipelines

Each section declares global named entities. These entities are then referenced within the pipeline section.

#### http
The http section is used to configure HTTP. Express Gateway will listen on  the specified port for HTTP requests.

Options:
- `port:` the port to listen on

Usage:
```yaml

http:
    port: 9080            # EG will listen for http requests on port 9080

```

#### https
The https section is used to configure HTTPS. Express Gateway will listen on the specififed port for HTTPS requests.

Options:
- `port:` the port to listen on
- `tls:` a list of certificates

Express Gateway supports TLS, including SNI (domain specific TLS certificates). Each `tls` key can have a host domain specified.  Wildcards are supported for host domain matching. Paths to the TLS keys and certificates are specified in the `key` and `cert` keys as pairs.

The `default` key will be used if none of the other `tls` domain entries are matched or if SNI is not being used by the client.

Usage:
```yaml

https:
  port: 9443                        # EG will listen for https requests on port 9443
  tls:
    - "*.demo.io":                  # will match any subdomain for demo.io
        key: keys/demo.io.key.pem
        cert: keys/demo.io.cert.pem
    - "api.acme.com":               # will only match api.acme.com
        key: keys/acme.com.key.pem
        cert: keys/acme.com.cert.pem
    - "default":                    # will be used if no match above or if SNI is not used
        key: keys/eg.io.key.pem
        cert: keys/eg.io.cert.pem

```

#### apiEndpoints
API Endpoints are URLs that are exposed by the Express Gateway to listen to API requests.  They are specified in conjunction with the [http](#http) and [https](#https) sections. An API endpoint can only be associated with one [pipeline](#pipeline) at time.

Usage: minimum
```yaml

apiEndpoints:
  api:                  # the name of the API endpoint

```

Usage:
```yaml

apiEndpoints:
  help:                 # name, used as reference in pipeline
    host: '*'           # optional, by default accepts all hosts, same as '*'
    paths: /help        # optional, by default will serve all requests - same as *

  api:                  # name, used as reference in pipeline
    host: '*.com'       # wildcard pattern support
    paths:
      - '/v1/*'         # string or array of strings
      - '/v2/*'

  example:              # name, used as reference in pipeline
    host: 'example.com'
    paths: /v2/*        # string or array of strings

```

#### Host

The `host` value is a string that will be matched against the 'HOST' header of the request.

Host examples: <TODO make this collapsible>
```yaml
apiEndpoints:
  help:
    host: '*'            # will match any domain or if not HOST is provided
                        # match: cdn.test.example.com test.example.com, example.com. 
    paths: /help
```

- \* - any domain will match cdn.test.example.com, test.example.com, example.com, etc. Will also work if no HOST header is provided
- example.com - one domain match, will not match subdomains
- \*.example.com -
    - any subdomain will match. test.example.com
    - example.com will not match
    - deeper levels will not match cdn.test.example.com
- \*.*.example.com
    - will match 2nd level subdomains like cdn.test.example.com
    - will not match example.com host
    - will not match test.example.com host

For host resolution Express Gateway relies on the "vhost" npm module. For more examples please see please refer to [https://www.npmjs.com/package/vhost](https://www.npmjs.com/package/vhost)

#### Paths
Paths can be either a string or array of strings.  Wildcard patterns are supported.  Paths follow the ExpressJS routes conventions - [https://expressjs.com/en/4x/api.html#router](https://expressjs.com/en/4x/api.html#router)

Examples:

__Exact String Match__
```yaml
paths: /admin           
```

- __match__: /admin only
- __404__: 
- /admin/bob; /admin/charlie/1; /staff 

---

__Deep Level Match without Parent__
```yaml
paths: /admin/*        
```

- __match__: /admin/bob; /admin/charlie/1
- __404__: /admin

---

__Deep Level Match with Parent__
```yaml
paths: ['/admin','/admin/*']   
```

- __match__: /admin; /admin/bob; /admin/charlie/1
- __404__: /staff

---

__One Level Match without Parent with Variable Assignment__
```yaml
paths: '/admin/:id'  
```

- __match__: /admin/bob; /admin/charlie
- __id__: bob; charlie
- __404__: /admin; /staff

---

__Multi level Sub Dir Match without Parent with Variable Assignments__
```yaml
paths: '/admin/:group/:id' 
```
- __match__: /admin/ops/bob
- __group__: ops
- __id__: bob
- __404__: /admin; /admin/bob; /admin/alex/bob/charlie

---

__Multi Multiple Level Sub Dir Match without Parent__
```yaml
paths: ['/student/*', '/teacher/*','/admin/*']
```
- __match__:
      - /admin/... multi-level
      - /student/... multi-level
      - /teacher/... multi-level
- __404__:
      - /
      - /admin; /teacher; /student
      - /staff

---

#### Overlapping
The order of the API endpoints specified matters. It is possible to specifiy overlapping patterns through wildcards. More specific patterns should be specified first for evaluation before more general matching.

Example:
```yaml

apiEndpoints:
  tabby:
    host: '*.tabby.cat.com'
    paths: '*'                # optional, if not specified will default to *
  cat:
    host: '*.cat.com'
  com:
    host: '*.com'

```

#### serviceEndpoints
Express Gateway receive API request on apiEndpoints, process them and then proxy them to the underlying microservices. The serviceEndpoints section specifies the URLs of these proxied microservices.

Usage:
```yaml

serviceEndpoints:             # urls to downstream microservices
  cats_service:               # name, used as a reference in pipeline
    url: "http://localhost"
    port: 3000
    paths: /                  # optional, defaults to /
  dogs_service:               # name, used as a reference in pipeline
    url: http://localhost
    port: 4000

```

#### Policies
The policies section is a whitelist of enabled policies. Policies that are intended to be used by Express Gateway must be declared here. For all policies supported by Express Gateway please see the [Policy Reference](Policy Reference)

*Coming Soon*: auto install new policies through plugin system


Usage:
```yaml
policies:
  - name: 'cors'
  - name: 'rate-limiter'
  - name: 'simple-logger'
  - name: 'proxy'
  - name: 'oauth2'
```

#### Pipelines
The pipelines section are the heart of Express Gateway's operations that tie together all entities declared in the sections above. 

Pipelines are an ordered list of policies that are executed for requests received from all linked apiEndpoints.

Usage:
```yaml
pipelines:
  pipeline_1                   # name of pipeline
    apiEndpoints:              # API endpoints referenced by name
      - api1                   # example apiEndpoint names
      - api2
      - api3
    policies:
      -
        - policy_1
          -
            #condition/action
          -
            #condition/action
        - policy_2
          -
            #condition/action
          -
            #condition/action
  pipeline_2
  .
  .
  .
```

Example:

Below is a `gateway.config.yml` that will start Express Gateway on `http` port 3000. It exposes an single apiEndpoint named 'api' that listens on all hosts at the root (/) path. There is one pipeline named 'default' that will process all requests for the 'api' 
```yaml
http:
  port: 3000

serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

apiEndpoints:
  api:
    host: '*'
    paths: /

pipelines:
  default:
    apiEndpoints:
      - api
    policies:
      -
        simple-logger: # policy name
          -   # array of objects with condition\action properties
            condition: #optional,; defaults to always execute
              name: pathExact
              paths: /v1
            action:
              name: log
              message: "${method} ${originalUrl}"
      -  
        proxy: # policy name
          -    # array of objects with condition\action properties
            action:
              name: proxy
              serviceEndpoint: example # see declaration above
```

Each policy in the pipeline can have a list of condition/action objects:

- `condition` - Optional. This condition is a rule that must be satisfied to trigger its corresponding action.
- `action` - the name of the action to be executed.  This is the main module name of the Express middleware used within the policy.

Each policy in the policies can have a list of condition\action objects: 

- `condition`. Optional. This condition is a check rule that must be satisfied to trigger the action.
- `action`. The name of the action to execute.

### Policy conditions

Each Policy in a pipeline can be gated with a condition specification. Each
condition specification is in the format:

```yaml
  condition:
    name: condition-name # examples: proxy; log;
    some-param-1: p1 # if condition requires parameters this is where to put them
    some-param-2: p1 #
```

The name specifies a condition function. This can be one of the following:

  - `always`: Always matches. If the condition is missing, it will default to
    this.
  - `never`: Never matches.
  - `pathExact`: Matches if the request's path is an exact match for the
    parameter. Example:
```yaml
  condition:
    name: pathExact
    path: "/foo/bar"
```
  - `pathMatch`. Matches if the request's path matches the given regular
    expression parameter. Example:
```yaml
  condition:
    name: pathMatch
    path: "/foo(/bar)?"
```

  - `method`. Matches if the request's method matches the `methods` parameter.
    Accepts can be either a string (e.g. 'GET') or an array of such strings.
  - `hostMatch`. Parameter should be a regular expression. Matches if the
    `Host` header passed with the request matches the parameter.
  - `expression`. Matches execution result of JS code provided in `expression` property. Code is executed in limited space that has access only to egContext
  Example:
```yaml
  condition:
    name: expression
    expression: "req.url.length>5"
    # will match for for path /long_path
    # will not match /a
```

In addition, several functions are provided that allow you to create logical
combinations of conditions. The parameters to these functions should be other
condition statements:

  - `allOf`: Matches only if all of its parameters match.
  - `oneOf`: Matches if at least one of its parameters matches.
  - `not`: Matches only if its parameter does not.

Example:

```json
{
  "name" :"allOf",
    "conditions": [
      {"name":"pathExact", "path": "/foo/bar"},
      { "name":"not",
        "condition":{ "name":"method", "methods": ["POST", "HEAD"]}
      }
    ]
}
```
```yml
name: allOf
conditions:
    - 
        name: pathExact
        path: /foo/bar
    - 
        name: not
        condition:
            name: method
            methods:
                - POST
                - HEAD

```

The above will match only if the exact request path is "/foo/bar" and the
request is *not* a POST or HEAD.

Best Practise Note: While it is possible to build quite complicated condition tree, huge trees could greatly affect readability of your EG configuration. In such cases it could be better to have multiple api endpoints and pipelines

The following two configs are equivalent, however we believe variant B is easier to read

##### Condition based config (variant A)
```yaml
serviceEndpoints:
  admin: # will be referenced in proxy policy
    url: 'http://admin.com'
  staff: # will be referenced in proxy policy
    url: 'http://staff.com'

apiEndpoints:
  api:
    paths: \*

pipelines:
  api:
    apiEndpoints:
      - api
    policies:
      -
        proxy:
          -
            condition:
              name: pathExact
              paths: /admin
            action:
              name: proxy
              serviceEndpoint: admin # see declaration above
          -
            condition:
              name: pathExact
              paths: /staff
            action:
              name: proxy
              serviceEndpoint: staff # see declaration above
```

##### Api Endpoint based config (variant B)
```yaml
serviceEndpoints:
  admin: # will be referenced in proxy policy
    url: 'http://admin.com'
  staff: # will be referenced in proxy policy
    url: 'http://staff.com'

apiEndpoints:
  admin:
    paths: /admin
  staff:
    paths: /staff

pipelines:
  admin:
    apiEndpoints:
      - admin
    policies:
      proxy:
        -   # note: no condition at all
          action:
            name: proxy
            serviceEndpoint: admin
  staff:
    apiEndpoints:
      - staff
    policies:
      -
        proxy:
          -   # note: no condition at all
            action:
              name: proxy
              serviceEndpoint: staff
```


### Policies

Several Policies are available. Please note that the order of Policies
is important.

#### Rate-limit
The rate limiter policy is used to limit the number of requests received and processed by the API endpoint. Limits are useful to prevent your system from being overwhelmed in both benign and malevolent situations where the number of requests processed can overwhelm your underlying APIs and supporting services. Rate limits are also useful to control the amount of API consumption to a known capacity of quantity.

##### Example use case:
Use to limit repeated requests to public APIs and/or endpoints such as password reset.
Limit access by host name in order to provide different service plans for customers. 

#### Reference

* `rateLimitBy`: The criteria that is used to limit the number of requests by. By default will limit based on IP address. Use JS template string to configure. Example "${req.ip}", "${req.hostname}" etc.
* `windowMs`: milliseconds - how long to keep records of requests in memory. Defaults to 60000 (1 minute).
* `max`: max number of connections during windowMs milliseconds before sending a 429 response. Defaults to 5. Set to 0 to disable.
* `message`: Error message returned when max is exceeded. Defaults to 'Too many requests, please try again later.'
* `statusCode`: HTTP status code returned when max is exceeded. Defaults to 429.
* `headers`: Enable header to show request limit and current usage
* `delayAfter`: max number of connections during windowMs before starting to delay responses. Defaults to 1. Set to 0 to disable delaying.
* `delayMs`: milliseconds - how long to delay the response, multiplied by (number of recent hits - delayAfter). Defaults to 1000 (1 second). Set to 0 to disable delaying.



#### Usage Example

#####Consider full example to rate-limit based on passed host to 10 requests per 2 minutes interval:

```yml
http:
  port: 9090
apiEndpoints:
  example:
    host: '*'
serviceEndpoints:
  backend:
    url: 'http://www.example.com'
pipeline1:
    apiEndpoints:
      - 'example',
    policies:
      - rate-limit:
        -
          action:
            name: 'rate-limit'
            max: 10
            windowMs: 120000 
            rateLimitBy: "${req.hostname}"
      - proxy:
        -
          action:
            name: proxy
            serviceEndpoint: backend

```

###### Here is policy configuration only for specific domain to allow up to 500 requests per minute
```yml
policies:
  -
    rate-limiter:
      -
        condition: # will execute action only for host matching example.com
          name: hostMatch, 
          pattern: example.com
        action:
          name: rate-limit
          max: 500 # limit to 500 req per default period windowMs=60000 (1 minute)
```



#### Key Auth
Key auth is efficient way of securing your API. 
Keys are generated for apps or users using CLI tool.

##### Example Use case:
Restricting access to api endpoints for applications


EG API key has format of a key pair separated by colon: `1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA` 

EG supports several ways to authenticate with api key:
##### Using header (recommended)
By default Authorization header is used and enforsed Schema is `apiKey`
Example:
`'Authorization':'apiKey 1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'`

Since api key scheme and header is not standardised you can override them

You can define another Scheme name using `apiKeyHeaderScheme`  
'Authorization':'my-scheme 1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'

and to disable set 
`apiKeyHeaderScheme:''`

This will make EG accept that format:
'Authorization':'1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA'

You And to change header name use `apiKeyHeader:'MY-KEY-HEADER'`  


##### Using query paramter (common approach for browser apps to avoid CORS Options request)
add `?apiKey=key:secret` to query params in url and it will be read by EG

`https://example.com?q=search&apiKey=1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA` 

##### Using in JSON body
```json
{
  "name":"eg-customer",
  "apiKey":"1fa4Y52SWEhii7CmYiMOcv:4ToXczFz0ZyCgLpgKIkyxA"
}

```

##### Reference 
```yml
apiKeyHeader: 'Authorization', # name of the header that should contain api key 
apiKeyHeaderScheme: 'apiKey', # Enforce schema in header.
disableHeaders: false # disable apikey lookup in headers 
disableHeadersScheme: false # disable verification of Scheme in header 
apiKeyField: 'apiKey', # name of field to check in query param or body
disableQueryParam: false # set to true to disable api key lookup in query string
disableBody: false # set to true to disable api key lookup in body
```


Config Example
```yaml
http:
  port: 8790
serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

apiEndpoints:
  api:
    path: '*'

pipelines:
  example-pipeline:
    apiEndpoints:   # process all request matching "api" apiEndpoint
      - api
    policies:
      keyauth: # secure API with key auth
        -
          action:
            name: keyauth
            disableBody: true # do not look for api key in body
            apiKeyHeader: COMPANY-CUSTOM-API-KEY-HEADER # custom header name 
            disableHeadersScheme: true # will accept "key:secret" format instead of "scheme key:secret"
      proxy: # name of the policy
        -   # list of actions
          action:
            name: proxy # proxy policy has one action - "proxy"
            serviceEndpoint: example # reference to serviceEndpoints Section
```

#### Proxying

Forwards the request to a service endpoint.
Accepts serviceEndpoint parameter that can be one of the names of serviceEndpoints section

- `serviceEndpoint`: the name of the service endpoint to forward to.

This Policy type should generally be placed last in the list.
```yaml
http: 
  port: 9091

apiEndpoints:
  api:
    path: '*'

serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

pipelines:
  example-pipeline:
    apiEndpoints:   # process all request matching "api" apiEndpoint
      - api
    policies:
      proxy: # name of the policy
        -   # list of actions
          condition:
            name: pathExact
            path: /admin
          action:
            name: proxy # proxy policy has one action - "proxy"
            serviceEndpoint: example # reference to serviceEndpoints Section
```

#### CORS
Enables Cross-origin resource sharing (CORS) in EG. 
CORS defines a way in which a browser and server can interact to determine whether or not it is safe to allow the cross-origin request

##### Config Example:

```yml
...
policies:
  - cors:
      -
        action:
          name: cors
          origin: http://www.example.com
          credentials: true
}
```
##### Full config example 
```yml 
  http: 
    port: 9089

  apiEndpoints: 
    test_default:
  
  serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

  pipelines: 
    pipeline1: 
      apiEndpoints: test_default
      policies: 
        - 
          cors:
            -
              action: 
                name: cors
                origin: 'http://www.example.com'
                methods: 'HEAD,PUT,PATCH,POST,DELETE'
                allowedHeaders: 'X-TEST'
        -
          proxy:
            -
              action:
                name: proxy  
                serviceEndpoint: example  

```

##### Reference 
* `origin`: Configures the `Access-Control-Allow-Origin` CORS header. Possible values:
  + Boolean - set origin to true to reflect the request origin, as defined by req.header('Origin'), or set it to false to disable CORS.
  + String - set origin to a specific origin. For example if you set it to "http://example.com" only requests from "http://example.com" will be allowed.
  + Array - set origin to an array of valid origins. Each origin can be a String or a RegExp. For example ["http://example1.com", /\.example2\.com$/] will accept any request from "http://example1.com" or from a subdomain of "example2.com".
* `methods`: Configures the `Access-Control-Allow-Methods` CORS header. Expects a comma-delimited string (ex: `'GET,PUT,POST'`) or an array (ex: `['GET', 'PUT', 'POST']`).
* `allowedHeaders`: Configures the `Access-Control-Allow-Headers` CORS header. Expects a comma-delimited string (ex: `'Content-Type,Authorization'`) or an array (ex: `['Content-Type', 'Authorization']`). If not specified, defaults to reflecting the headers specified in the request's `Access-Control-Request-Headers` header.
* `exposedHeaders`: Configures the `Access-Control-Expose-Headers` CORS header. Expects a comma-delimited string (ex: `'Content-Range,X-Content-Range'`) or an array (ex: `['Content-Range', 'X-Content-Range']`). If not specified, no custom headers are exposed.
* `credentials`: Configures the `Access-Control-Allow-Credentials` CORS header. Set to true to pass the header, otherwise it is omitted.
* `maxAge`: Configures the `Access-Control-Max-Age` CORS header. Set to an integer to pass the header, otherwise it is omitted.
* `preflightContinue`: Pass the CORS preflight response to the next handler.
* `optionsSuccessStatus`: Provides a status code to use for successful `OPTIONS` requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.

The default configuration is the equivalent of:

```
{
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}
```

#### Expression
Execute JS code against EGContext.
```yml
pipelines:
  api:
    policies:
      -
        expression: # policy name
          - action:    # array of condition/actions objects
              name: expression # action name
              jscode: 'req.url = "/new/url"; ' #  code to execute against EG Context
```

#### Logging

Provides capability for simple logging. The only parameter is `message`, with
a string specifying the message to log. This can include placeholders using
the JavaScript [ES6 template literal syntax](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals).

It will allow dumping all parameters of EG Context object

Example:
```yml
pipelines:
  api:
    policies:
      simple-logger: # policy name
        - action:    # array of condition/actions objects
            name: log
            message: ${req.method} ${req.originalUrl} # parameter for log action
```

```js
// let say we have incomming request
req = { method:'GET', originalUrl:'/v1' }
// will log "[EG:log-policy] GET /v1"
```

### Full config example

```yaml
http:
  port: 3000
serviceEndpoints:
  example: # will be referenced in proxy policy
    url: 'http://example.com'

apiEndpoints:
  api:
    host: '*'
    paths: '*'

pipelines:
  api:
    apiEndpoints:
      - api
    policies:
      simple-logger:
        - action:
            name: log
            message: "${req.method} ${req.originalUrl}"
      proxy:
        -
          action:
            name: proxy
            serviceEndpoint: example # see declaration above

```

In the above example, a request to `http://127.0.0.1:3000/example` will be
forwarded to `http://www.example.com`, while a request to
`http://127.0.0.1:3000/google` will be forwarded to `http://www.google.com`.


API Consumer Management
-------------
Consumer management consists of managing users and applications.

### Users
A user, in its base form, consisits of an ID and a username. You define additional user properties in the configuration like below:

```
Config: {
...
  User: {
  ...
    properties: {
      username:   { type: 'string', isMutable: false, isRequired: true}, #default, can be overridden
      firstName:  { type: 'string', isMutable: true, isRequired: true},
      lastName:   { type: 'string', isMutable: true, isRequired: true}
      ...
    }
  }
...
}
```

### Applications
An Application is another type of API consumer and is tied to a user.
In its base form, an application consists of an Id and userId. You can define additional application perperties in configuration like below:

```
Config: {
...
  Application: {
  ...
    properties: {
      name:   { type: 'string', isMutable: false, isRequired: true},
      group:  { type: 'string', isMutable: true, isRequired: false},
      ...
    }
  }
...
}
```

API Credential Management
-------------
Credential management consists of managing credentials associated with users and applications.
Types of credentials may include username/password, id/secret and API-Key.

Any type of credential can be associated with a user or application.

### Scope
Scope is a pre-defined string that is used to associate a user's or application's permission to use an api endpoint.

Scopes are assigned to credentials and need to be pre-defined before assignment.

Hot Reload vs Manual Restart
-------------
Express gateway automatically monitors changes of the config file provided at start.
Once the change is detected the system automatically reconfigures without shutdown and dropping requests.

TBD: how to disable

Hot Reload will work for:
* Api Endpoints
* Service Endpoints
* Pipeline
* Plugins  (TBD: review after plugins impl)
  + Custom Policy registration
  + Plugin Configuration changes
  + Enable/Disable

Manual Restart is required for changes in:
* http section (port)
* https section (port and certificates)
* consumer management configuration (schema, connection string details)


Troubleshooting
---------------
set env variable ```LOG_LEVEL=debug``` to see full logging

Build and run
-------------

```bash
# build
npm run build

# start
npm start

# test
npm test

# create Docker container
docker build -t gateway .
```

Providing Configuration
-----------------
Express-Gateway requires application configuration to be passed during start.
YML and JSON formats are supported.

There are 2 main config files for main setup. And model configurations for fine-tuning:
#### Gateway Config
The config file where you define endpoints, pipelines, port settings for gateway

#### System Config
Here you can define dabase connections, custom schemes for user\application entities
For the most cases default settings are good enough

The config files must be in one directory and this is how to point EG to it:

##### Default
If nothing is provided EG will use config in local config /lib/config

use `npm start` to start Express-gateway

##### Location to config folder in env variable EG\_CONFIG\_DIR
example:
EG\_CONFIG\_DIR=/some/path/config  npm start