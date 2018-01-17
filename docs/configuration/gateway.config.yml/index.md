---
title: gateway.config.yml
layout: doc-section
doc-order: 3.1
---

All of the gateway's functionality is defined and described in `gateway.config.yml`.  This config file describes the entire gateway's microservices and API operations at a glance.

gateway.config.yml is made up of the following sections:

<nav markdown="1">
- [http][http]
- [https][https]
- [admin][admin]
- [apiEndpoints][apiEndpoints]
- [serviceEndpoints][serviceEndpoints]
- [policies][policies]
- [pipelines][pipelines]
</nav>

Each section declares globally named entities. These entities are then referenced within the pipeline section.

[http]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/http.md %}
[https]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/https.md %}
[admin]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/admin.md %}
[apiEndpoints]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/apiEndpoints.md %}
[serviceEndpoints]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/serviceEndpoints.md %}
[policies]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/policies.md %}
[pipelines]: {{ site.baseurl }}{% link docs/configuration/gateway.config.yml/pipelines.md %}
