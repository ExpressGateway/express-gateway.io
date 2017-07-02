---
layout: documentation
title: Documentation
permalink: /docs-example/
links:
  - display: Configuration
    link: configuration
  - display: CLI Reference
    link: cli-reference
  - display: Admin API Reference
    link: admin-api-reference
  - display: Proxy Reference
    link: proxy-reference
---
# Heading 1
## Heading Two
### Heading Three
#### Heading Four
##### Heading Five
###### Heading Six

This text is **bold**, this is *italic*, this is an `inline code block`.

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.

> This is a blockquote. It will read centered and full length of the area it resides in.

All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. This is an [internal link](#error-code-definitions), this is an [external link](http://google.com). The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words

### List Styles

1. List item one
2. List Item two
    1. nested ordered List
    2. see the nesting
    3. Add Four Spaces To Nest Lists
        - Nested UL
        - Four Spaces
3. Maybe it works

#### Hexagon Lists require HTML

<ol class="hexagon-list" markdown="1">
<li>Top Level Lists get Hexagon indication
<ol>
<li>Nested OL look like this</li>
<li>Nested OL look like this</li>
</ol>
</li>
<li>Top Level Lists get Hexagon indication
<ul>
<li>Nested uL look like this</li>
<li>Nested uL look like this</li>
</ul>
</li>
</ol>

### Links

This is an [internal link](#error-code-definitions), this is an [external link](http://google.com).

### Warnings and Notifications

<aside class="notice" mardown="1">
File `meowmeowmeow.exe` is updating.
</aside>

<aside class="warning" mardown="1">
Overwrite file `meowmeowmeow.exe`?
</aside>

<aside class="error" mardown="1">
File `meowmeowmeow.exe` has crashed.
</aside>

<aside class="success" mardown="1">
File `meowmeowmeow.exe` is purring.
</aside>

### Tables

Table Header 1 | Table Header 2 | Table Header 3
-------------- | -------------- | --------------
Row 1 col 1 | Row 1 col 2 | Row 1 col 3
Row 2 col 1 | Row 2 col 2 | Row 2 col 3

### Code Snippets

###### javascript

```javascript
var rawr = ["r", "a", "w", "r"];
function thishasareallylongnamesoleck(){
  const that
}
function this(){
  const that
}
function this(){
  const that
}
```

###### YAML

```yaml
--- !clarkevans.com/^invoice
invoice: 34843
date   : 2001-01-23
bill-to: &id001
    given  : Chris
    family : Dumars
    address:
        lines: |
            458 Walkman Dr.
            Suite #292
        city    : Royal Oak
        state   : MI
        postal  : 48046
ship-to: id001
product:
    - sku         : BL394D
      quantity    : 4
      description : Basketball
      price       : 450.00
    - sku         : BL4438H
      quantity    : 1
      description : Super Hoop
      price       : 2392.00
tax  : 251.42
total: 4443.52
comments: >
    Late afternoon is best.
    Backup contact is Nancy
    Billsmer @ 338-4338.
```

```shell
$ bundle exec jekyll build
$ bundle exec jekyll serve
```

### Images

Here comes an inline image ![inline image](/assets/img/lb-logo-mono.png) and here comes a block level image:

Another image:

![inline image](/assets/img/Marchitecture_Express-As-We-Know-it_01.png)

# Example Documentation
---

## Rate-limit
The rate limiter policy is used to limit the number of requests received and processed by the API endpoint. Limits are useful to prevent your system from being overwhelmed in both benign and malevolent situations where the number of requests processed can overwhelm your underlying APIs and supporting services. Rate limits are also useful to control the amount of API consumption to a known capacity of quantity.

Example use case:
Use to limit repeated requests to public APIs and/or endpoints such as password reset.

#### Reference
conditions: (list all valid conditions)
action parameters:
`max`
`rateLimitBy`
`windowMs`


`max` - maximum number of requests

`rateLimitBy` - the criteria that is used to limit the number of requests by
The rate limit policy, by default will limit based on client IP address (req.ip).

valid values: username, appID, etc...

#### Usage Example


Consider example to rate-limit based on passed host:
{% highlight yaml linenos %}
apiEndpoints:
  example:
    host: '*'
serviceEndpoints:
  backend:
    url: 'http://www.example.com'
pipeline1:
    apiEndpoints:
      - 'example',
    policies:
      - rate-limit:
        -
          action:
            name: 'rate-limit'
            max: 10
            rateLimitBy: "${req.host}"
      - proxy:
        -
          action:
            name: proxy
            serviceEndpoint: backend
{% endhighlight %}

The preceding example will impose a rate limit by the calling host.  If the hosts calling the API endpoint are "partnerApp.amce.org" and "partnerApp.widget.com" then each host will be limited to 10 requests per (what's the internval???)
