# express-gateway.io

This is the repository of the website [express-gateway.io](http://express-gateway.io). It is hosted directly from the repository as a [GitHub Pages](https://pages.github.com/) website.

## Local Setup

To run website locally:

1. Install [Ruby and Bundler](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/) if you don't have them already.

Note: highly recommend installing [rvm](https://rvm.io/rvm/install) to install and manage Ruby 

2. `cd` to the repository directory and run the following command:

```
$ bundle exec jekyll build
```

3. Run Jekyll using the following command:

```
$ bundle exec jekyll serve
```

4. You'll need to override `_config.yml` with the `baseUrl` set to "/"

5. Load [http://localhost:4000/](http://localhost:4000/) on your browser.

## Formatting

Jekyll uses a variant of Markdown known as [Kramdown](http://kramdown.gettalong.org/quickref.html).

Jekyll uses the [Liquid template engine](http://liquidmarkup.org/) for templating.

You can use [GFM](http://kramdown.gettalong.org/parser/gfm.html) fenced code blocks.

Examples:

```js
var express = require('express')
var app = express()
app.listen(3000)
```

```yaml
apiEndpoints:
  help:
    host: '*.example.com'            
    paths: /help
```

## Contributing

Please see the [Contributors' Guide](CONTRIBUTING.md) for more information on contributing to the documentation.