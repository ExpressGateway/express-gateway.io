---
layout: doc-section
title:  "Policies"
---
#### Policies
The policies section is a whitelist of enabled policies. Policies that are intended to be used by Express Gateway must be declared here. For all policies supported by Express Gateway please see the [Policy Reference](Policy Reference)

*Coming Soon*: auto install new policies through plugin system


Usage:
```yaml
policies:
  - name: 'cors'
  - name: 'rate-limiter'
  - name: 'simple-logger'
  - name: 'proxy'
  - name: 'oauth2'
```
