---
layout: doc-section
title: migrate
doc-order: 4.99
---

### Description

Executes all the pending migrations since the last time this command has been ran.

### Usage

```shell
npx migrate --migrations-dir ./node_modules/express-gateway/migrations/ up
```

Or, if your NodeJS version is ancient like my grandfather:

```shell
./node_modules/.bin/migrate --migrations-dir ./node_modules/express-gateway/migrations/ up
```

### Notes

Migrations are scripts provided with some Express Gateway releases that move your data in order to ensure consistency
as the product is evolving, using the [node-migrate](https://github.com/tj/node-migrate) framework.

It has a built in mechanism to avoid to run the same migration twice: therefore running the command multiple times
will **not** repeat the migration. It might be important, if you're deploying the Gateway on a second new
server/container/whatever to make sure to keep a copy of the `.migrate` file.

Usually you should not care about this command at all, but make sure to run it everytime it is stated in the release
notes after an upgrade.
