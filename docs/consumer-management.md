---
layout: doc-section
title:  "Consumer Management"
doc-order: 6.0
---
Express Gateway comes with a Consumer management system. An API consumer is either a user or application.

#### Users
A user, in its base form, consists of an ID and a username. The user model in `model-configs` directory is schemaless and you define additional user properties.

Example:
```
Config: {
...
  User: {
  ...
    properties: {
      username:   { type: 'string', isMutable: false, isRequired: true}, #default, can be overridden
      firstName:  { type: 'string', isMutable: true, isRequired: true},
      lastName:   { type: 'string', isMutable: true, isRequired: true}
      ...
    }
  }
...
}
```

#### Applications
An Application is another type of API consumer and is always associated to a user. A user may have zero to many applications.

In its base form, an application consists of an Id and userId. The `application` model in `model-configs directory is schemaless and you can define additional application properties.

Example:
```
Config: {
...
  Application: {
  ...
    properties: {
      name:   { type: 'string', isMutable: false, isRequired: true},
      group:  { type: 'string', isMutable: true, isRequired: false},
      ...
    }
  }
...
}
```

New Properties can be defined or some can be removed. Also properties are configurable:   

##### Example
```js
newProperty: { 
    isRequired: true, 
    isMutable: true 
}
```

* `isRequired`
    - If true, CLI and Admin API will force validation if value is not provided

* `isMutable`
    - If true, Express Gateway will not allow modification of this property after creation

References:
* &nbsp; [Admin API](../../admin)
* &nbsp; [CLI](../../cli)