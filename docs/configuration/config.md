---
layout: doc-section
title:  "gateway.config.yml"
---
### gateway.config.yml
All of the gateway's functionality is defined and described in `gateway.config.yml`.  This config file describes the entire gateway's microservices and API operations at a glance.

gateway.config.yml is made up of the following sections:

- http
- https
- apiEndpoints
- serviceEndpoints
- policies
- pipelines

Each section declares globally named entities. These entities are then referenced within the pipeline section.
