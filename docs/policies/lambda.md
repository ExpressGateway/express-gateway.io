---
title: Lambda
layout: doc-section
doc-order: 5.30
---

### Description

The Lambda Policy can be used to proxy AWS Lambda Functions

### Usage

To enable it, you need to install its plugin first:

`eg plugins install express-gateway-plugin-lambda`

Then add `lambda` in [gateway.config.yml][gateway.config.yml] in the [policies][policies] section.

```yaml

policies:
  - lambda-proxy
```

### Example

```yaml

pipelines:
  default:
    policies:
      - lambda-proxy:
          -
            condition:
              name: pathExact
              match: /foo/bar # Express Path
            action:
              functionName: process-list
          -
            condition:
              name: regexpmatch
              match: ^/js/(.*)$
            action:
              functionName: send-file
```

### Reference

#### Condition

* `pathExact`: [Express Path](https://expressjs.com/en/guide/routing.html#route-paths) corresponding to the url pattern to look for
* `regexpmatch`: RegExp corresponding to the url pattern to look for

#### Options

##### Policy Settings

* `functionName`:
  - [(required)] - Specify the Lambda function name or ARN
* `qualifier`:
  - [(optional)] - Specify a Lambda function version or alias name
* `ignorePath`:
  - [true / false (default), (optional, only valid when using Proxy Integration)] - Don't proxy to the incoming request's URL path
* `stripPath`:
  - [true / false (default), (optional, only valid when using Proxy Integration)] - Strip the API Endpoint path prefix from the forwarded URL path

##### Plugin Settings

* `invocationType`:
  - [`RequestResponse` _(default)_ [`Event` / `DryRun`]] - AWS Lambda invocation type.
* `logType`:
  - [`None` _(default)_ / `Tail`] - AWS Lambda log type.
* `unhandledStatus`:
  - [default: `500`] - When the Lambda function returns with an unhandled error, usually due to an absence of available resources, this status code will be returned to the client.
* `useCustomIntegration`:
  - [true / false _(default)_] - Use a custom integration as specified by the `req.egContext.lambda` object.
* `maxJSONParseLength`:
  - [_(default: 5 * 1.049e+6, 5MiB)_] - Maximum number of bytes to allow for parsing responses as JSON in an attempt to guess the MIME type.

### Integration Modes
#### Proxy Integration

Proxy Integration mode sends the Lambda function an event that looks similar to an AWS API Gateway event.  The response is expected to be in the same format as the AWS API Gateway Lambda response.

##### Proxy Integration Lambda Event

With Proxy Integration mode, the HTTP request gets turned into a JSON object that gets invoked with the Lambda function.

Here's an example:

```json
{
  "httpMethod": "POST",
  "path": "/California?name=Kevin",
  "resource": "/:proxy",
  "queryStringParameters": {
    "name": "Kevin"
  },
  "pathParameters": {
    "proxy": "California"
  },
  "headers": {
    "host": "localhost:60852",
    "user-agent": "curl/7.51.0",
    "accept": "*/*",
    "content-type": "application/json",
    "day": "Thursday",
    "content-length": "18"
  },
  "requestContext": {
    "apiEndpoint": {
      "apiEndpointName": "default",
      "host": "*",
      "path": "/:proxy",
      "paths": "/:proxy",
      "scopes": []
    },
    "resourcePath": "/:proxy",
    "httpMethod": "POST",
    "requestId": "3SpeBYb8SK6CvH7Ipx56pK"
  },
  "isBase64Encoded": false,
  "body": "{\"time\":\"morning\"}"
}
```

##### Proxy Integration Lambda Response

The Lambda response must use the following JSON structure:

```json
{
    "isBase64Encoded": true|false,
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "body": "..."
}
```

If no `Content-Type` header is provided, this plugin will take a buest guess at the MIME type before sending the response to the client.  It is recommended to always include a `Content-Type` header.

#### Custom Integration

Requires the setting `useCustomIntegration` to equal `true`.

Custom Integration Mode takes a look at the `egContext.req.lambda` object and forwards that as the incoming event to the AWS Lambda function.  The response is taken, the content type is guessed, and it finally returns to the client.

If the `egContext.req.lambda` object is not populated, a default event structure will be sent to the AWS Lambda function.  Example:

```json
{
  "method": "POST",
  "path": "/California?name=Kevin",
  "headers": {
    "host": "localhost:61636",
    "user-agent": "curl/7.51.0",
    "accept": "*/*",
    "content-type": "application/json",
    "day": "Thursday",
    "content-length": "18"
  },
  "body": "{\"time\":\"morning\"}"
}
```

This plugin will attempt a best guess at the `Content-Type` of the response.  It is recommended to use Proxy Integration whenever possible.

## Credentials & Config

This plugin follows conventions for credentials defined by the AWS Node.js SDK. See [Setting Credentials in Node.js][aws-sdk-creds] for more information.

When using your shared, local AWS config file (for `region` etc.), make sure you set the `AWS_SDK_LOAD_CONFIG` environment variable to a truthy value. Also, see [Configuration and Credential Files][aws-sdk-config]

Example:

```
AWS_SDK_LOAD_CONFIG=true npm start
```
---
### Debugging:
If you get `Internal Server Error` from plugin, you can see the extended logs by doing:
```
DEBUG=express-gateway-plugin-lambda:* npm start
```

[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[aws-sdk-creds]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[aws-sdk-config]: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html
[plugin-install-guide]: https://www.express-gateway.io/docs/cli/plugins/install/#description
