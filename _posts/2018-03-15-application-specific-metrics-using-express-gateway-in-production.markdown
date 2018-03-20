---
title: Application Specific Metrics Using Express Gateway in Production
date: 2018-03-15 01:57:00 Z
categories:
- guides
- announcements
tags:
- how to create a Plugin for Express Gateway
- Express.js
- Express Middleware
- Express.js middleware
- JSON Schema
- Admin API
layout: post
---

As a follow up to [our last post on how you can get started](https://www.express-gateway.io/application-specific-metrics-using-express-gateway/) with application specific metrics using Express Gateway, we'd love to show you a real time example that you can use. By the end of this post, you'll have everything you need to start building your own plugins and getting metrics on information you care about.

<!--excerpt-->

## Plugging in to Production

By now, if you've been following along you have created your plugin and it's ready to be used. So, we have to install it in the Gateway and enabled it.

Express Gateway plugins are nothing more than NPM packages, so we can simply publish our package to the registry and then install it using the command line.

For this tutorial, I've already published a plugin with the exact same code we saw above as `express-gateway-prometheus-metrics-example`.

Hence, we can install the plugin directly by simply typing:

`eg plugins install express-gateway-prometheus-metrics-example`

*Note:* Express Gateway can also load [plugins inline](https://github.com/XVincentX/express-gateway-prometheus-metrics-example/blob/master/gateway/config/system.config.yml#L9). This is useful when you want to test them before publishing them. In this case, you could point the `package` property to our `index.js` file.

Now let's modify our [gateway.config](https://www.express-gateway.io/docs/configuration/gateway.config.yml/) and configure a policy that will take advantage of this policy:

```
http:
  port: 8080
admin:
  port: 9876
apiEndpoints:
  api:
    host: '*'
serviceEndpoints:
  httpbin:
    url: 'http://httpbin.org'
policies:
  - proxy
  - metrics
pipelines:
  - name: basic
    apiEndpoints:
      - api
    policies:
      - metrics:
      - proxy:
          - action:
              serviceEndpoint: httpbin
              changeOrigin: true
```


## It's alive. Now, let's test it!

Let's spin up the gateway and throw some requests to it:
```
    $ ab -n 20 http://localhost:8080/
```
Once the command is terminated, we can now query our metrics endpoint to see what happened with the requests:

```
$ curl http://localhost:9876/metrics
# HELP status_codes status_code_counter
# TYPE status_codes counter
status_codes{type="FAILED",status_code="502",consumer="anonymous",apiendpoint="api"} 15
status_codes{type="SUCCESS",status_code="200",consumer="anonymous",apiendpoint="api"} 5
```

So now, you can see we received the Prometheus metrics with all of the data we collected.

**There's more! Use JSON Schema to Validate Your Parameters**

Express Gateway relies on JSON Schemas to make sure all the configurations that goes in its funnel it's correct.

You can leverage the same mechanism to specify the required parameters, good defaults and validation rules for your plugin.

For instance, in our example, it's pretty clear that the [Admin API](https://www.express-gateway.io/docs/admin/#markdown) path where the metrics will be exposed is mandatory. So, we might want to configure the header where the consumer id information is stored.

With these two requirements in mind, we can write something like this:

```
module.exports = {
  version: '1.0.0',
  policies: ['metrics'],
  schema: {
    $id: 'http://express-gateway.io/plugins/metrics.json',
    type: 'object',
    properties: {
      endpointName: {
        type: 'string',
        default: '/metrics'
      }
    }, required: ['endpointName']
  },
  init: function (pluginContext) {
    pluginContext.registerAdminRoute((app) => {
      // admin route code
    });

    pluginContext.registerPolicy({
      name: 'metrics',
      schema: {
        $id: 'http://express-gateway.io/policies/metrics.json',
        type: 'object',
        properties: {
          consumerIdHeaderName: {
            type: 'string',
            default: 'eg-consumer-id'
          }
        }, required: ['consumerIdHeaderName']
      },      
      policy: ({ consumerIdHeaderName }) => (req, res, next) => {
        // policy code
      }
    });
  }
};

```

Thanks to this small addition, the Gateway will validate the provided parameters against the JSON Schema and will refuse to load the plugin if the validation does not pass.

## Moving On

Now that you've gotten a first hand look at getting application specific metrics using Express Gateway with a easy-to-follow example, it's time to go build it! 

## More Resources

* Learn more about upcoming features and releases by checking out the **[Express Gateway Roadmap](https://github.com/ExpressGateway/express-gateway/milestones)**

* Join the **[Express Gateway Newsletter](https://eepurl.com/cVOqd5)** update list

* **[Follow along on](https://twitter.com/express_gateway)** Twitter

* Have Questions? Head over to **[our Gitter channel](https://gitter.im/ExpressGateway/express-gateway)** and hit us up!