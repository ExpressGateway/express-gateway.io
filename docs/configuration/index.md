---
layout: doc-section
title:  "Configuration"
doc-order: 3.0
---
One key feature of Express Gateway is that configuration is completely separate from the static code used to run the gateway.

All configuration is centralized and can be found in the `/config` directory of the main Express Gateway folder.

Configuration is divided into different levels:

| Level   | Name    | File/Directory             |
| ------- | ------- | -------------------------- |
| 1 (top) | gateway | /config/gateway.config.yml |
| 2       | system  | /config/system.config.yml  |
| 3       | data    | /config/models      |

The levels allow you to configure and manage Express Gateway without having to concern yourself with details that may not be relevant to you as a user, operator, administrator or developer. The lower the level, the higher the complexity.
