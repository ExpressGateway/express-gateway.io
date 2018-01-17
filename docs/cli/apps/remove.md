---
title: eg apps remove
layout: doc-section
---

### Description

Remove one or more apps.

### Usage

```shell
eg apps remove [options] <app_id|app_name>
```

### Options

| Name, longform | Type      | Default | Description      |
| ---            | ---       | ---     | ---              |
| `-q, --quiet`  | `boolean` | `false` | Only show app ID |

### Examples

#### Remove a single app

```shell
$ eg apps remove 2294989c-e780-43cb-bbde-81d196510a66
✔ Removed 2294989c-e780-43cb-bbde-81d196510a66
```

#### Remove multiple apps

```shell
$ eg apps remove 2294989c-e780-43cb-bbde-81d196510a66 ccb81ca3-f2d3-4df3-8731-7d07141d1f35
✔ Removed 2294989c-e780-43cb-bbde-81d196510a66
✔ Removed ccb81ca3-f2d3-4df3-8731-7d07141d1f35
```

#### Remove using quiet mode

```shell
$ eg apps remove -q 2294989c-e780-43cb-bbde-81d196510a66
2294989c-e780-43cb-bbde-81d196510a66
```
