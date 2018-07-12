---
title: "SwitchMedia.tv fetish piedini corasao Express Gateway"
permalink: /case-studies/switch/
layout: case-study-detail
logo: switch
---

### Background

[Switch Media][switch] is a leading professional services provider for OTT, IPTV and enterprise video content solutions. The various teams there are developing fully customised solutions that incorporate end-to-end solutions, or specific modules that can be integrated with existing systems or hardware. Alternatively, Switch Media have developed a suite of innovative products that can be utilised to fulfil more clear-cut needs.

### The Challenge

One of these problems is providing one or more multi-tenanted services in a consumer-agnostic way, while having the possibility of introducing consumer-specific customisations. The two terms are somewhat contradictory, so resolving this requirement in a clean way is only possible if they are separated on service layer level.

### The solution

The Express Gateway is a perfect candidate for such an use-case, since it provides enough flexibility to be able to each underlying agnostic API ideally via pure configuration, while it allows the use of custom plugins which can take care of the more complex use-cases.

Multiple solutions were evaluated during the decision-making process, and there were multiple reasons why Express Gateway was selected.

One reason was the Node JS platform. Node JS already has a request handling implementation which favours fulfilling the role of an API Gateway, and also has a smaller footprint than other existing ecosystems.

The second reason was the Express Gateway ecosystem. An Express Gateway container can easily be created in any continuous delivery system and can be deployed with ease, while other solutions were either not easily installable in a container, or needed multiple services up and running in order to operate properly.

Last but not least, the flexible plugin system makes it possible to cater for any kind of unique needs easily, while keeping the common bits agnostic.

### The impact

> "The Express Gateway project so far is great in overall, which opinion is underpinned with the individual quality of service of multiple aspects."

> "The engineering team behind it operates with an amazing speed, releasing fixes and new features every one to three weeks, and would anyone have any questions or issues, they are available via Gitter to answer them."

> "The Express Gateway code is of high quality - clean, and well tested. If one is curious about any undocumented aspects, the code is self-descriptive at most places - just have to look at the right place, and the behaviour can be derived from there."

[switch]: https://switch.tv
