---
title: Express Gateway Release 1.4.1 over here!
layout: post
date: 2017-11-29 00:00:00 +0000
author: insert author here
categories:
- announcements
- technology
---
# Express Gateway Release 1.4.1 over here!
<excerpt--->We're back with brand new fixes, changes, updates and..PROGRESS! Who's ready for 1.4.1?
<---/excerpt>

## All the Fixins' 
The gateway is now correctly handling the HTTP_PROXY environment variable to allow usage service endpoints that are behind corporate proxy #552. You can find further informations on our documentation page
We're still working on having a good code style standards. We've just updated our ESLint version and made it scan the whole codebase, resulting in an huge reformat. #541
We have fixed a small bug where hot reloading mechanism was triggered twice on gateway start, although no file was changed. This was a misconfiguration in chokidar. #563
We have updated ioredis-mock to the latest version. This let us polish couple of things we had to workaround in the previous release in order to complete the client switch. #565
Changed
## Ch-Ch-Changes 
We have lowered the minimal level of severity for a log in order to be printed on the standard output from error to warn. This should hopefully help you to reveal some situation where the gateway might be acting in the way you specified because of some things.

