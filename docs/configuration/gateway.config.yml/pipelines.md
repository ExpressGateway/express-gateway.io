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
  pipeline_1:                   # name of pipeline
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
              path: /v1
            action:
              message: "${req.method} ${req.originalUrl}"
      -
        proxy: # policy name
          -    # array of objects with condition\action properties
            action:
              serviceEndpoint: example # see declaration above
```

### Condition/Action Objects in Policy

Policy contains a list of actions with parameters. Each action can be gated by a  condition.

| Name         | Required | Description                                                                                                             |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `condition ` | Optional | A rule that must be satisfied to trigger its corresponding action                                                       |
| `action `    |          | Action Parameters for for this specific step  |


[Condition][conditions] and actions each have their own list of parameters.
Each Condition/action pair is executed independently of others.
The order of execution is the same as declaration in policy

#### Example
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


[conditions]: {{ site.baseurl }}{% link docs/policies/customization/conditions.md %}
