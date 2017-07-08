---
layout: doc-section
title: eg apps activate
---

### Description

Activate one or more apps.

### Usage

```shell
eg apps activate [options] <app_id..>
```

### Options

| Name, longform | Type      | Default | Description      | Required |
| ---            | ---       | ---     | ---              | ---      |
| `-q, --quiet`  | `boolean` | `false` | Only show app ID | Optional |

### Examples

#### Activate a single app

```shell
$ eg apps activate 2294989c-e780-43cb-bbde-81d196510a66
✔ Activated 2294989c-e780-43cb-bbde-81d196510a66
```

#### Activate multiple apps

```shell
$ eg apps activate 2294989c-e780-43cb-bbde-81d196510a66 ccb81ca3-f2d3-4df3-8731-7d07141d1f35
✔ Activated 2294989c-e780-43cb-bbde-81d196510a66
✔ Activated ccb81ca3-f2d3-4df3-8731-7d07141d1f35
```

#### Activate using quiet mode

```shell
$ eg apps activate -q 2294989c-e780-43cb-bbde-81d196510a66
2294989c-e780-43cb-bbde-81d196510a66
```
