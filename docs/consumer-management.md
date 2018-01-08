---
layout: doc-section
title: Consumer Management
doc-order: 6.0
---
Express Gateway comes with a Consumer management system with three fundamental parts in game: **Users**,
**Applications** and **Credentials**.

An API consumer is either a _user_ or _application_.

In order to ensure flexibility in your system, models are defined through [JSON Schema][json-schema]

#### Users
A user, in its base form, consists of an ID and a username. The user model in `models` directory is schemaless and you
define additional user properties.

Example:
```
Config: {
...
  User: {
  ...
    properties: {
      username:   { isMutable: false, isRequired: true}, #default, can be overridden
      firstName:  { isMutable: true, isRequired: true},
      lastName:   { isMutable: true, isRequired: true}
      ...
    }
  }
...
}
```

Note:
`username` property is used by Express Gateway. Please avoid changing it since it may cause unexpected behaviour

#### Applications
An Application is another type of API consumer and is always associated to a user.

An user may have zero to many applications, whose names must be unique among the same user. This does not prevent
having multiple applications, all with the same names, but bound to different users.

In its base form, an application consists of an Id and userId. The `application` model in `models` directory is schemaless and you can define additional application properties.

Example:
```
Config: {
...
  Application: {
  ...
    properties: {
      name:   { isMutable: false, isRequired: true},
      group:  { isMutable: true, isRequired: false},
      ...
    }
  }
...
}
```

#### Credentials
A Credential is a container for secret authentication info. Always associated to a Consumer (User or App)

```js
{
  'basic-auth': {
    passwordKey: 'password',
    autoGeneratePassword: true,
    properties: {
      scopes: { isRequired: false }
    }
  },
  'key-auth': {
    properties: {
      scopes: { isRequired: false }
    }
  },
  oauth2: {
    passwordKey: 'secret',
    autoGeneratePassword: true,
    properties: {
      scopes: { isRequired: false }
    }
  }
}
```

Note:
`scopes` property is used by Express Gateway Autorization engine. Please avoid changing it since it may cause Autorization to work incorrectly

#### Customizing the models

Model properties can be introduced or removed. The full [JSON Schema][json-schema] specification is supported, so you
different validation rules such as [required fields][required] or [property dependencies][dependencies].

##### Example

```json
"secondaryEmail": {
    "type": "string",
    "format": "email"
}
```
References:
* [Admin API][admin]
* [CLI][cli]

[cli]: {{ site.baseurl }}{% link docs/cli/index.md %}
[admin]: {{ site.baseurl }}{% link docs/admin/index.md %}
[json-schema]: http://json-schema.org/
[dependencies]: http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.7
[required]: http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.3