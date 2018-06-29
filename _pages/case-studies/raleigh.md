---
title: "City of Raleigh protects its services with Express Gateway"
permalink: /case-studies/CORaleigh/
layout: case-study
logo: raleigh
---

### Background

[Raleigh][raleigh] is the capital of the state of North Carolina and the seat of Wake County in the United States. Raleigh is the second-largest city in the state of North Carolina, known as the "City of Oaks" for its many oak trees, which line the streets in the heart of the city.

### The Challenge

As it happen usually with public administration, they have a lot of legacy software accumulated over the years; in particular the system they were dealing with didn't have any story around security, making its direct exposure on the public internet not an option. It required some custom code to catch all the requests and check the authentication/authorization status.

### The solution

Express Gateway was a simple to use and production ready solution for the team to quickly allow public traffic to access their internal (behind the firewall) API's. The stability, security and ease of implementation allowed them to focus on the web application, created with the help of Angular, instead of the devops logistics of limiting access to certain internal systems.

They're using the [key auth policy][key-auth] in the header of all requests and Redis to store the credentials.

### The impact

The team was really satisfied with both the quality of the result and more importantly the time to go in production.

> Anytime we need to expose something to the outside we will use this technique again going forward.

[raleigh]: https://www.raleighnc.gov/
[key-auth]: {{ site.baseurl }}{% link docs/policies/key-authorization.md %}
