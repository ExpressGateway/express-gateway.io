---
title: Consumer Management
description: Express Gateway consumer management.
layout: doc-section
doc-order: 6.0
---

Express Gateway comes with a Consumer management system with three fundamental parts in game: **Users**,
**Applications** and **Credentials**.

An API consumer is either a _user_ or _application_.

In order to ensure flexibility in your system, models are defined through [JSON Schema][json-schema]

#### Users
A user, in its base form, consists of an ID and a username. The user model in `models` directory has some basic
properties. You can enrich it to meet your needs.

```json
{
  "$id": "http://express-gateway.io/models/users.json",
  "type": "object",
  "properties": {
    "firstname": {
      "type": "string"
    },
    "lastname": {
      "type": "string"
    },
    "username": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "redirectUri": {
      "type": "string",
      "format": "uri"
    }
  },
  "required": [
    "username",
    "firstname",
    "lastname"
  ]
}
```

Note:
`username` property is used by Express Gateway. Please avoid changing it since it may cause unexpected behaviour.

#### Applications
An Application is another type of API consumer and is always associated to a user.

An user may have zero to many applications, whose names must be unique among the same user. This does not prevent
having multiple applications, all with the same names, but bound to different users.

In its base form, an application consists of an Id and userId. The `application` model in `models` directory provides
some basic properties. You can enrich it to meet your needs.

Example:

```json
{
  "$id": "http://express-gateway.io/models/applications.json",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "redirectUri": {
      "type": "string",
      "format": "uri"
    }
  },
  "required": [
    "name"
  ]
}
```

#### Credentials
A Credential is a container for secret authentication info. Always associated to a Consumer (User or App).
We do support the following credential types:

- `basic-auth`: UserID and Password tuple
- `key-auth`: An API Key identifying the consumer that is usually placed in an _HTTP Header_
- `oauth2`: A _ClienID_ and _ClientSecret_ tuple that identifies the client willing to connect. Users will be
            recognised using `basic-auth`
- `jwt`: A _KeyID_ and _KeySecret_ that are used to identify a JWT Issuer

If you're interested to learn more about these, check out their respective pages in the *Policies* documentation section.

Credentials are also defined with a JSON Schema, but there are not customization options for that. In other word,
modifying the schema and add a new credential type or even a property won't work, as the gateway would need to be changed
in order to handle the new credential. You can modify the existing properties, though.

We are working on this in order to plug your own credential type.

#### Accessing consumer information from a service endpoint

Express Gateway will add the `eg-consumer-id` header to the proxied requests based on the authenticated user. In case
there's none, its value will be `anonymous`. Using that ID, your service can query the [Admin API][admin] to retrieve
more information.

In case you want to downstream more information, you can put a [headers][headers] policy just after the authentication
steps of your pipeline.

#### Customizing the models

Model properties can be introduced or removed. The full [JSON Schema][json-schema] specification is supported, so you
different validation rules such as [required fields][required] or [property dependencies][dependencies].

##### Example

Let's say we want to add an optional secondary email to our user model. We just need to past this in the `properties`
object.

```json
"secondaryEmail": {
    "type": "string",
    "format": "email"
}
```

Now the gateway is aware of this property and will be prompted in the CLI as well as validated when inserted in the
system.

References:
* [Admin API][admin]
* [CLI][cli]

[cli]: {{ site.baseurl }}{% link docs/cli/index.md %}
[admin]: {{ site.baseurl }}{% link docs/admin/index.md %}
[headers]: {{ site.baseurl }}{% link docs/policies/headers.md %}
[json-schema]: https://json-schema.org/
[dependencies]: https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.7
[required]: https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.5.3
