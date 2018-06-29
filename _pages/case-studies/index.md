---
permalink: /case-studies/
layout: case-study
---

Read successful stories of companies using Express Gateway in production. Do you want to tell us your story and get
featured on this page? Get in touch with [us][egMail]. We'll be more than happy to work with you on your use case
and craft a story to be published here.

[egMail]: mailto:vincenzo@express-gateway.io

{% for page in site.pages %}
  {% if page.path contains 'case-studies' %}
{% include case-study-link.html logo=page.logo url=page.url %}
  {% endif %}
{% endfor  %}
