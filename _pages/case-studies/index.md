---
permalink: /case-studies/
layout: case-studies
---

Read successful stories of companies using Express Gateway in production. Do you want to tell us your story and get
featured on this page? Get in touch with [us][egMail]. We'll be more than happy to work with you on your use case
and craft a story to be published here.

[egMail]: mailto:vincenzo@express-gateway.io

<div class="case-study-links">
{% for page in site.pages %}
  {% if page.path contains 'case-studies' %}
    {% unless page.path contains 'index' %}
{% include case-study-link.html addLink='true' %}
    {% endunless %}
  {% endif %}
{% endfor  %}
</div>
