---
layout: doc-section
title:  "Policy Conditions"
---

Each Policy in a pipeline can be gated with a condition specification. Each
condition specification is in the format:

Usage
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

    Example:
    ```yaml
      condition:
        name: pathExact
        path: "/foo/bar"
    ```
  - `pathMatch`. Matches if the request's path matches the given regular
    expression parameter.

    Example:
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

Examples:

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
