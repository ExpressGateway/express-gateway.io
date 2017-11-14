---
layout: doc-section
title: session
doc-order: 3.2
list-order: 0.3
---

OAuth 2.0 related config.

Express Gateway does not need session to work. The only part that requires it is Authorization Code flow of OAuth 2.0 built in server. 

```yml
session: 
  secret: keyboard cat # replace with secure key that will be used to sign session cookie
  resave: false
  saveUninitialized: false
```
