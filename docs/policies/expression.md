---
layout: doc-section
title:  "Expression"
doc-order: 4.9
---
Execute JS code against EGContext.

Example:
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

##### Options Reference TODO
* `jscode`:
