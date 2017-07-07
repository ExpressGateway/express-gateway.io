---
layout: doc-section
title:  "Pipelines"
---
#### Pipelines
The pipelines section specify the core Express Gateway's operations by tying  together all entities declared in the sections above, through the request and response flow.

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

Condition and actions each have their own list of parameters. Condition/action pairs are made unique with their own list of parameters.
