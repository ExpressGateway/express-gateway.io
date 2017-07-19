---
layout: doc-section
title:  "pipelines"
doc-order: 3.1
list-order: .7
---

### Description

The pipelines section specify the core Express Gateway's operations by tying  together all entities declared in the sections above, through the request and response flow.

Pipelines are an ordered list of policies that are executed for requests received from all linked apiEndpoints.

### Usage

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

### Example

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

### Options

| Name         | Required | Description                                                                                                             |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `condition ` | Optional | A rule that must be satisfied to trigger its corresponding action                                                       |
| `action `    |          | The name of the action to be executed, usually this is the main module of the Express middleware used within the policy |

Each policy in the pipeline can have a list of condition/action objects

Condition and actions each have their own list of parameters. Condition/action pairs are made unique with their own list of parameters.

#### Policy Conditions

Each Policy in a pipeline can be gated with a condition specification. Each
condition specification is in the format:

##### Usage

```yaml
  condition:
    name: condition-name # examples: always; never;
    some-param-1: p1 # if condition requires parameters they are listed here
    some-param-2: p1 #
```

The `name` specifies a condition function. This can be one of the following:

  - `always`: Always matches. If the condition is missing, it will default to
    this.
  - `never`: Never matches.
  - `pathExact`: Matches if the request's path is an exact match for the
    parameter.

##### Example

    ```yaml
      condition:
        name: pathExact
        path: "/foo/bar"
    ```

  - `pathMatch`. Matches if the request's path matches the given regular
    expression parameter.

##### Example

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

##### Example

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

##### Examples

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

Best Practice Note: While it is possible to build quite complicated condition tree, huge trees could greatly affect readability of your EG configuration. In such cases it could be better to have multiple api endpoints and pipelines

The following two configs are equivalent, however we believe variant B is easier to read.

##### Conditions Based Config - Variant A

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

##### Conditions Based Config - Variant B

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


