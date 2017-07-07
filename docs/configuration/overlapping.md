---
layout: doc-section
title:  "Overlapping"
---
##### Overlapping
The order of the API endpoints specified matters. It is possible to specifiy overlapping patterns through wildcards. More specific patterns should be specified first for prioritized evaluation before more general matching.

Example:
```yaml

apiEndpoints:
  tabby:
    host: '*.tabby.cat.com'
    paths: '*'                # optional, if not specified will default to *
  cat:
    host: '*.cat.com'
  com:
    host: '*.com'

```
