---
layout: doc-section
title:  "Doc Styles"
doc-order: 100.0
---

The following is the style guide for writing Express Gateway documentation.

# Heading 1
## Heading Two
### Heading Three
#### Heading Four
##### Heading Five
###### Heading Six

This text is **bold**, this is *italic*, this is an `inline code block`.

All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. This is an [internal link](#error-code-definitions), this is an [external link](http://google.com). The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words

###### .codeHighlight
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you <span class="codeHighlight">var inlineCodeExample = thisStyle(set)</span> need to be sure there isn't anything embarrassing hidden in the middle of text.

<span class="codeHighlight">var inlineCodeExample = thisStyle(set)</span>

> This is a blockquote. It will read centered and full length of the area it resides in.

### List Styles

1. List item one
2. List Item two
    1. nested ordered List
    2. see the nesting
    3. Add Four Spaces To Nest Lists
        - Nested UL
        - Four Spaces
            - Additional list Styles
            - Four Spaces
3. Maybe it works

- Top UL
- Four Spaces
    - Additional list Styles
    - Four Spaces
        - Additional list Styles
        - Four Spaces

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
<li>Nested uL look like this
<ul>
<li>Third level list</li>
<li>Third level list</li>
<li>Third level list
<ul>
<li>Fourth level list</li>
<li>Fourth level list</li>
<li>Fourth level list</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ol>

### Links

This is an [internal link](#error-code-definitions), this is an [external link](http://google.com).

### Warnings and Notifications

<aside class="notice" markdown="1">
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
$(document).ready(function () {

  $(".video-container").click(function () {
    $(this).append('<iframe src="https://player.vimeo.com/video/222" style="position:absolute;top:0;left:0;width:100%;height:100%;"frameborder="0" webkitallowfullscreen ></iframe>');
    $('.moveback').addClass('zindexflat');
    $('#icon-play-button, .video-container, .screencast-feature').addClass('videoplay');
  });


  var $form = $('#mc-embedded-subscribe-form')
  if ($form.length > 0) {
    $('form input[type="submit"]').bind('click', function (event) {
      if (event) event.preventDefault()
      register($form)
    })
  }
})
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

###### shell

```shell
$ bundle exec jekyll build
$ bundle exec jekyll serve
```

### Images

Here comes an inline image ![inline image](/assets/img/lb-logo-mono.png) and here comes a block level image:

Another image:

![inline image](/assets/img/Marchitecture_Express-As-We-Know-it_01.png)

# Gist Example
---
{% gist 14d86198f1c3b42724e262980b22356c %}
