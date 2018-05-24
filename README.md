# express-gateway.io

This is the repository of the website [express-gateway.io](https://express-gateway.io). It is hosted directly from the repository as a [GitHub Pages](https://pages.github.com/) website.

The main branch for this repository is `dev`.

The live site is published off `gh-pages`.

Please note: we use [siteleaf.com](https://siteleaf.com) as a CMS around this jekyll based site, changes that are committed to `dev` may be published automatically through content pushes through [siteleaf.com](https://siteleaft.com) to the `gh-pages` branch.

## Local Setup

To run website locally:

1. Install [Ruby and Bundler](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/) if you don't have them already.

Note: highly recommend installing [rvm](https://rvm.io/rvm/install) to install and manage Ruby

2. Install Jekyll and other important Gems. `cd` to the repository directory and run the command:

```
$ bundle install
```

3. Now do a build (this is only needed if pushing to GH pages)

```
$ bundle exec jekyll build
```

4. Run Jekyll using the following command:

```
$ bundle exec jekyll serve
```

5. You'll need to override `_config.yml` with the `baseUrl` set to "/"

6. Load [http://localhost:4000/](https://localhost:4000/) on your browser.

## Auto Regeneration

By default, Jekyll will auto-regenerate the static pages if you change files through a built in filewatcher. You can simply refresh your browser to see the updates.

## Formatting

Jekyll uses a variant of Markdown known as [Kramdown](https://kramdown.gettalong.org/quickref.html).

Jekyll uses the [Liquid template engine](https://liquidmarkup.org/) for templating.

You can use [GFM](https://kramdown.gettalong.org/parser/gfm.html) fenced code blocks.

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
## Algolia Index

[Docsearch](https://community.algolia.com/docsearch/) is crawling our website every day in order to generate our
search index.
