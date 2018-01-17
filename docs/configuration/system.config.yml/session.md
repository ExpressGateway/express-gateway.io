---
title: session
layout: doc-section
doc-order: 3.2
list-order: 0.3
---

OAuth 2.0 related config.

Express Gateway does not need session to work. The only part that requires it is Authorization Code flow of OAuth 2.0 built in server. 

Session support for OAuth2 code Grant is based on express-session npm module

By default it uses in memory session provider. 

```yml
session: 
  secret: keyboard cat # replace with secure key that will be used to sign session cookie
  resave: false
  saveUninitialized: false
```

However for production usage, especially cluster variants consider configuring session storage  
This is the list of [express-session](https://github.com/expressjs/session#compatible-session-stores) compatible session providers.  
Or you can write your own if it is really required.



#### Redis based session store 

**Important! Your actual provider must be npm installed.**

`npm i connect-redis`

##### Example config
```yml
session: 
  storeProvider: connect-redis
  storeOptions:
    host: localhost
    port: 6379
  secret: keyboard cat # replace with secure key that will be used to sign session cookie
  resave: false
  saveUninitialized: false
```
