---
layout: doc-section
title: eg apps deactivate
---

### Description

Deactivate one or more apps.

### Usage

```shell
eg apps deactivate [options] <app_id..>
```

### Options

| Name, longform | Type      | Default | Description      |
| ---            | ---       | ---     | ---              |
| `-q, --quiet`  | `boolean` | `false` | Only show app ID |

### Examples

#### Deactivate a single app

```shell
$ eg apps deactivate 2294989c-e780-43cb-bbde-81d196510a66
✔ Deactivated 2294989c-e780-43cb-bbde-81d196510a66
```

#### Deactivate multiple apps

```shell
$ eg apps deactivate 2294989c-e780-43cb-bbde-81d196510a66 ccb81ca3-f2d3-4df3-8731-7d07141d1f35
✔ Deactivated 2294989c-e780-43cb-bbde-81d196510a66
✔ Deactivated ccb81ca3-f2d3-4df3-8731-7d07141d1f35
```

#### Deactivate using quiet mode

```shell
$ eg apps deactivate -q 2294989c-e780-43cb-bbde-81d196510a66
2294989c-e780-43cb-bbde-81d196510a66
```
