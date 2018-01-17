---
title: eg gateway create
layout: doc-section
---

### Description

Create a new Express Gateway.

### Usage

```shell
eg gateway create [options]
```

### Options

| Name, longform | Type                                | Default | Description                                           |
| ---            | ---                                 | ---     | ---                                                   |
| `-q, --quiet`  | `boolean`                            | `false` | Only show major pieces of output                      |
| `-n, --name`   | `string`                             |         | Name of the Express Gateway                           |
| `-d, --dir`    | `string`                             |         | Directory where the Express Gateway will be installed |
| `-t, --type`   | choices: "basic", "getting-started" |         | Type of Express Gateway template to generate          |

### Examples

#### Creating a gateway with prompts

```shell
$ eg gateway create
? What's the name of your Express Gateway? my-gateway
? Where would you like to install your Express Gateway? my-gateway
? What type of Express Gateway do you want to create? Getting Started with Express Gateway
   create package.json
   create server.js
   create config/gateway.config.yml
   create config/models/applications.js
   create config/models/credentials.js
   create config/models/users.js
   create config/system.config.yml
<... npm install express-gateway ...>

To start my-gateway, run the following commands:
    cd my-gateway && npm start
```
