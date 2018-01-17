---
title: Customization
layout: doc-section
doc-order: 5.1
---

The dynamic capabilities of Express Gateway stem from a rich set of customization capabilities that utilize Express.js middleware in combination with expressions and logic that can be specified using plain JavaScript.

### Conditions
[Conditions][core-conditions] control the execution flow of Express Gateway's operations. Express Gateway provides a rich set of core conditions that can be used with any policy in Express Gateway. Application data that is shared throughout all of Express Gateway is stored within JavaScript objects and can be evaluted with JavaScript expressions and functions.

### Express Gateway Context Object (egContext)
State and other application data and metadata are stored within the Express Gateway context object or [egContext object][eg-context].  The context object and its associated properties change depending on the scope of execution.

#### Example
In Pipeline 1, a user invoking an API Endpoint will have their user id data set within `egContext.user.id` that is different than another user invoking the same API Endpoint. Although it is the same object, the runtime context create different instances of the same object and data.

[core-conditions]: {{ site.baseurl }}{% link docs/policies/customization/conditions.md %}
[eg-context]: {{ site.baseurl }}{% link docs/policies/customization/eg-context.md %}
