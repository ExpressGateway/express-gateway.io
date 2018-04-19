---
title: Express Gateway 1.6.0 - It’s Payback Time!
date: 2018-01-17 07:09:00 Z
categories:
- technology
tags:
- Node.js
- JSON
- JSON Schema Support
- Node 9
layout: post
author: Dellaena Maliwzesky
---

After all the holidays, it's all about that New Year's resolution, hitting the gym for the brief 2 weeks before you rediscover fast food and, if you're like us, breaking open the laptop and committing that open source code.
<!--excerpt-->

We're back to work on our favorite open source project. Now, it's time to kick off 2018 with a new Express Gateway version! Who’s up for paying down some technical debt?

**Express-Gateway v1.6.0 is here!**

## Release Overview + support for Node.js 9
We took advantage of the holiday slowdown (™) and focused on technical debt this project has been accumulating. Additionally, the most notable changes in Express Gateway 1.6 are that it supports Node.js 9 and comes with JSON Schema support.

As part of extending JSON support, we reworked the homemade [JSONSchemaesque system](https://github.com/ExpressGateway/express-gateway/blob/b5ebbac47f8d50fe95000b3e84f274a62e8bab3c/lib/config/models/users.js) and fully adopted the JSON Schema standard. So, this will let you express complex model constraints as well as additional properties in a standard way.

Thanks to the schema based validation system we discovered two subtle pesky bugs and crushed them. This is a sign we're moving toward the right direction!

In previous releases, we already introduced support for policies, conditions and plugins. So, in Express Gateway 1.6.0, we decided to take this even further with configuration files `system.config`,`gateway.config` and models.

As always, we would love to understand use cases and get feedback.

## Wait!What am I supposed to do with the old .js models?
Old .js models won't be loaded anymore so you should remove them from your `models` directory and replace them with the new JSON Schema based one. DO IT!

We have provided a *migration script* that will go through your current models and transform them into their respective JSON Schema version:
`
`npx migrate --migrations-dir ./node_modules/express-gateway/migrations/ up`

Please note that this script **will run automatically** when you upgrade your Express Gateway version.

## Want to migrate the things by yourself?

In case you didn't modify the schemas at all, this is a really trivial task. You just need to [copy and paste these files](https://github.com/ExpressGateway/express-gateway/tree/master/lib/config/models).
In case you put some custom properties, you'll need to convert them in a JSON Schema property.

This should be extremely easy, though:

This property:

```javascript
module.exports = {
  properties: {
    firstname: {isRequired: true, isMutable: true},
    //…other properties
  }
};
```

Becomes:

```json
"firstname": {
  "type": "string"
},
"required": [
  "username",
  "firstname",
  "lastname"
]
```

BOOM! Done!

Whichever way you decide to venture, once the migration is over and you verified that the gateway is starting correctly, you can safely delete the old `.js` files.

For more information about JSON Schema, [check out their website](http://json-schema.org/).

In case you encounter **any issues during the migration process** or you're in doubt, [feel free to ask for questions in our Gitter channel](https://gitter.im/ExpressGateway/express-gateway).
