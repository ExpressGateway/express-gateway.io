---
layout: documentation
title: Documentation
permalink: /api/
links:
  - display: Installing
    link: installing
  - display: Getting Started
    link: getting-started
  - display: Core Concepts Explained
    link: core-concepts-explained
  - display: Configuring
    link: configuring
---

## Documentation

Welcome to Express Gateway! The documentation for Express Gateway is written using Jekyll and Markdown. If you'd like to contribute, please see our [Github website repo](https://github.com/expressgateway/express-gateway.io)

### Installing and Getting Started

Express Gateway runs on Node.js. To get Node.js please visit the [Node.js Downloads Page](https://nodejs.org/en/download/).

Once you have Node.js installed, check out the dedicated [Getting Started Guide]


### Core Concepts 

To better understand what Express Gateway is and how it works, check out the [About] page that provides the big picture. 

### Configuration

One of the key features of Express Gateway is that configuration is completely separate from static code used to run the gateway.  

All configuration is driven centrally and can be found in the `/config` directory of the main Express Gateway folder.

Configuration is divided into different levels:

- application configuration: `gateway.config.yml`
- system level configuration: `system.config.yml`
- metadata configuration: `model-configs`

The levels allow you to configure and manage Express Gateway without having to concern yourself with details that may not be relevant to you as a user, operator, administrator or developer.

#### gateway.config.yml
All of the application functionality is embodied in the [gateway.config.yml].  This config file describes the entire gateway's microservices and API operations at a glance.

gateway.config.yml is made up of the following:

- http/https
- apiEndpoints
- serviceEndpoints
- policies enabled
- pipelines