---
layout: doc-section
title: Policies Reference
doc-order: 5.0
---
Policies are building blocks of functionality within Express Gateway. Policies can be thought of as wrappers around Express middleware that add dynamic evaluation and executional behavior through:
- a condition
- an action
- parameters

A policy can have one or many conditions and action pairs.  A condition and an action can each have their own set of unique parameters that make the pair unique.

Policies can be highly customized with using JavaScript objects and functions exposed by Express Gateway. JavaScript objects and functions can be specified within conditions, action and parameters to dynamically execute logic.

See the [Policy Customization Reference][policy-customization] for how to specify logic within conditions, actions and policies such as the [Expression policy][expression-policy].

[policy-customization]: {{ site.baseurl }}{% link docs/policies/customization/index.md %}
[expression-policy]: {{ site.baseurl }}{% link docs/policies/expression.md %}
