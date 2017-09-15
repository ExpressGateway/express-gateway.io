---
layout: doc-section
title: eg plugin configure
---
### Description
Configure a plugin.
### Usage
```shell
eg plugin configure [options] <package>
```
Notes:
- CLI will try to resolve the package name by convention (prefixing `express-gateway-plugin-`), for example `example` -> `express-gateway-plugin-example` and will fallback to the provided name by itself (`example`) should that package not exist.
### Options
None.
### Examples
#### Configure the "express-gateway-plugin-example" plugin
```shell
$ eg plugin configure example  # same as eg configure express-gateway-plugin-example
? Set value for baseUrl: test
? Set value for maxRequestsPerSecond: 3434
Plugin configured!
```
