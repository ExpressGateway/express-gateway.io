---
layout: doc-section
title:  "plugins"
doc-order: 3.2
list-order: .1
---

This section defines plugins for Express Gateway.
If you are installing\managing plugins with EG CLI this section will be taken care of.

YML
```yml
plugins:
  example:
    description: some helpful information for yml file maintainer
    param1: 'this is plugin initialization parameter'
```

JSON
```json
{
    "plugins":{
        "example":{
            "description": "JSON has no comments, this is a field for helpful info",
            "param1": "this is plugin initialization parameter"
        }
    }
}
```
General Information about plugins:
[Plugin Installation Guide]({{ site.baseurl}} {% link docs/plugins/index.md %})

And Plugin Development guide:
[Development Guide]({{ site.baseurl}} {% link docs/plugins/development-guide.md %})