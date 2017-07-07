---
layout: doc-section
title:  "Host"
---
#### Host

The `host` value is a string that will be matched against the 'HOST' header of the request.

Examples:

Any Domain and Path
```yaml
apiEndpoints:
  help:
    host: '*'            
    paths: /help
```

Match: cdn.test.example.com/help, example.com/help, no HOST header
404: cdn.test.example.com, example.com/admin

One Domain with No Subdomains and Path
```yaml
apiEndpoints:
  help:
    host: 'example.com'            
    paths: /help
```

Match: example.com/help
404: test.example.com/help, example.com

Any 1st Level Subdomain of One Domain and Path
```yaml
apiEndpoints:
  help:
    host: '*.example.com'            
    paths: /help
```

Match: test.example.com/help, foo.example.com/help, bar.example.com/help
404: example.com, cdn.test.example.com/help, test.example.com

Any 2nd Level Subdomain of One Domain and Path
```yaml
apiEndpoints:
  help:
    host: '*.*.example.com'            
    paths: /help
```

Match: cdn.test.example.com/help
404: example.com/help, test.example.com/help

Express Gateway utilizes the "vhost" npm module for host resolution. For more examples, please refer to [https://www.npmjs.com/package/vhost](https://www.npmjs.com/package/vhost)
