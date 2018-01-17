---
title: crypto
layout: doc-section
doc-order: 3.2
list-order: 0.2
---

Express gateway does not store passwords in plain text. It converts hashes them.
This section controlls how passwords are converted.
``` yml
crypto:
  cipherKey: sensitiveKey
  algorithm: aes256
  saltRounds: 10
```

More Information: 
[bcrypt](https://www.npmjs.com/package/bcrypt)