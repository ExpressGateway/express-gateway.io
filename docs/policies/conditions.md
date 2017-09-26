---
layout: doc-section
title:  "Conditions"
doc-order: 4.5
---


#### Action Conditions

Each Policy Action in a pipeline can be gated with a condition specification. Each
condition specification is in the format:

##### Usage

```yaml
  condition:
    name: condition-name # examples: always; never;
    some-param-1: p1 # if condition requires parameters they are listed here
    some-param-2: p1 #
```
##### Full Example
```yml
pipelines:
  default:
    apiEndpoints:
      - api
    policies:
      -
        simple-logger: # policy name
          -   # array of Actions optionally gated by a condition
            condition: # this action is executed only if path is exactly /v1
              name: pathExact
              path: /v1
            action:
              message: "V1: ${req.originalUrl}"
          -  # executed only after previous action is completed   
            condition: # this action is executed only if path is exactly /v2
              name: pathExact
              path: /v2
            action:
              message: "V2: ${req.originalUrl}"
          -  # executed only after previous two actions are completed   
            action: # no condition, always executed
              message: "GENERIC: ${req.method}"
      -  
        proxy: # policy name
          -    # array of objects with condition\action properties
            action:
              serviceEndpoint: example 
```
### Conditions Reference
##### pathExact
Matches if the request's path is equal to `path` parameter.
```yaml
  condition:
    name: pathExact
    path: "/foo/bar"
```

##### pathMatch
Matches if the request's path matches the given regular expression parameter.
```yml
  condition:
    name: pathMatch
    path: "/foo(/bar)?"
```

##### method 
Matches if the request's method matches the `methods` parameter.
The parameter can be either a string (e.g. 'GET') or an array of such strings.
```yml
  condition:
    name: method
    methods: GET
```
```yml
  condition:
    name: method
    methods: 
      - GET
      - POST
```

##### hostMatch
Matches if the `Host` header passed with the request matches the parameter.
Parameter `pattern` should be a wildcard\string expression. 
```yml
  condition:
    name: hostMatch
    pattern: '*.example.com' 
```

##### expression 
Matches execution result of JS code provided in `expression` property.
Code is executed in limited space that has access only to egContext. 


  ```yaml
    condition:
      name: expression
      expression: "req.url.length>5"
      # will match for for path /long_path
      # will not match /a
  ```
See more info about [egContext][egcontext]
Also check [Expression policy][expressionpolicy]


In addition, several Conditions are provided that allow you to create logical
combinations of conditions. The parameters to these conditions should be other
condition statements:

##### allOf
Matches only if all of its parameters match.

```json
{
  "condition":{
    "name": "allOf",
      "conditions": [
        {"name":"pathExact", "path": "/foo/bar"},
        { "name":"not",
          "condition":{ "name":"method", "methods": ["POST", "HEAD"]}
        }
      ]
  }
}
```

```yml
condition:
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

##### oneOf
Matches if at least one of its parameters matches.

```json
{
  "condition":{
    "name": "oneOf",
      "conditions": [
        {"name":"pathExact", "path": "/foo/bar"},
        { "name":"not",
          "condition":{ "name":"method", "methods": ["POST", "HEAD"]}
        }
      ]
  }
}
```

```yml
condition:
  name: oneOf
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

The above will match  if the exact request path is "/foo/bar" or the
request is *not* a POST or HEAD.

##### not
Invert condition result
```yml 
condition:
  name: not
    condition: # negates the condition
        name: method
        methods:
            - POST
            - HEAD
```
Will match only if method is other than POST and HEAD

#### Best Practice Note
While it is possible to build quite complicated condition tree, huge trees could greatly affect readability of your EG configuration. In such cases it could be better to have multiple api endpoints and pipelines

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
    host: '*'
    paths: 
      - /admin
      - /staff

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
              path: /admin
            action:
              serviceEndpoint: admin # see declaration above
          -
            condition:
              name: pathExact
              path: /staff
            action:
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
    host: '*'
    paths: /admin
  staff:
    host: '*'
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



[gateway.config.yml]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/index.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}

[expressionpolicy]: {{ site.baseurl }}{% link docs/policies/expression.md %}
[egcontext]: {{ site.baseurl }}{% link docs/policies/eg-context.md %}