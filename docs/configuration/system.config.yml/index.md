---
layout: doc-section
title: system.config.yml
doc-order: 3.2
---
System level configuration for the gateway and global parameters are defined and described in `system.config.yml`.  This config file describes infrastructure settings that are used to run the gateway.

system.config.yml is made up of the following sections:

<nav markdown="1">
- [db][db]
- [crypto][crypto]
- [session][session]
- [accessTokens][accessTokens]
- [refreshTokens][refreshTokens]
- [authorizationCodes][authorizationCodes]
</nav>

Each section declares global settings that are used for the entire Express Gateway instance.

[db]: {{ site.baseurl }}{% link docs/configuration/system.config.yml/db.md %}
[crypto]: {{ site.baseurl }}{% link docs/configuration/system.config.yml/crypto.md %}
[session]: {{ site.baseurl }}{% link docs/configuration/system.config.yml/session.md %}
[accessTokens]: {{ site.baseurl }}{% link docs/configuration/system.config.yml/accessTokens.md %}
[refreshTokens]: {{ site.baseurl }}{% link docs/configuration/system.config.yml/refreshTokens.md %}
[authorizationCodes]: {{ site.baseurl }}{% link docs/configuration/system.config.yml/authorizationCodes.md %}
