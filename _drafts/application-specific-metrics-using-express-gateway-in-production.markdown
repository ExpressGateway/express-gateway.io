---
title: Application Specific Metrics Using Express Gateway in Production
date: 2018-03-13 01:57:00 Z
---

**Put It In Production**

We have our plugin ready to be used. Now we have to install it in the Gateway and enabled it.

Express Gateway plugins are nothing more than NPM packages, so we can simply publish our package to the registry and then install it using the command line.

For this tutorial, I've already published a plugin with the exact same code we saw above as `express-gateway-prometheus-metrics-example`.

Hence, we can install the plugin directly by simply typing:

`eg plugins install express-gateway-prometheus-metrics-example`

*Note:* Express Gateway can also load [plugins inline](https://github.com/XVincentX/express-gateway-prometheus-metrics-example/blob/master/gateway/config/system.config.yml#L9). This is useful when you want to test them before publishing them. In this case, you could point the `package` property to our `index.js` file.

Now let's modify our [gateway.config](https://www.express-gateway.io/docs/configuration/gateway.config.yml/) and configure a policy that will take advantage of this policy:

`http:
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
              changeOrigin: true`

## It's alive! 

Let's spin up the gateway and throw some requests to it:

    $ ab -n 20 http://localhost:8080/

Once the command is terminated, we can now query our metrics endpoint to see what happened with the requests:

`$ curl http://localhost:9876/metrics
# HELP status_codes status_code_counter
# TYPE status_codes counter
status_codes{type="FAILED",status_code="502",consumer="anonymous",apiendpoint="api"} 15
status_codes{type="SUCCESS",status_code="200",consumer="anonymous",apiendpoint="api"} 5`

So now, you can see we received the Prometheus metrics with all of the data we collected.

**There's more! Use JSON Schema to Validate Your Parameters**

Express Gateway relies on JSON Schemas to make sure all the configurations that goes in its funnel it's correct.

You can leverage the same mechanism to specify the required parameters, good defaults and validation rules for your plugin.

For instance, in our example, it's pretty clear that the [Admin API](https://www.express-gateway.io/docs/admin/#markdown) path where the metrics will be exposed is mandatory. So, we might want to configure the header where the consumer id information is stored.

With these two requirements in mind, we can write something like this:

`module.exports = {
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
};`

Thanks to this small addition, the Gateway will validate the provided parameters against the JSON Schema and will refuse to load the plugin if the validation does not pass.