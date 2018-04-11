---
title: Orchestrating Kubernetes and Express Gateway
date: 2018-04-10 18:00:00 Z
categories:
- technology
tags:
- How to build microservices
- Hyper Media APIS
- How to orchestrate Kubernetes
- Kubernetes
- Open Source API Gateway and Kubernetes
- open source
- Express.js
- JavaScript Object
layout: post
---

Express Gateway is [cloud native software](https://pivotal.io/cloud-native), meaning that it integrates easily with Kubernetes or any other container orchestration solution.

Let’s explore an interesting use case where you can use Express Gateway with Kubernetes to provide a graceful degradation for clients in case some of its managed services are down.
<!--excerpt-->

## The scenario
For our example, let's suppose we have two services in JavaScript and running on Node.js — one handling `Customers` and another one handling `Invoices`. Also, we have a command line client that uses these APIs to service the user experience.

**Uh oh! Our `Customer` service has crashed.**

Although Kubernetes is trying to restore it by creating new pods (probably because of the `ReplicaSet` setting), the service is still down. This can happen, for instance, when any third party dependencies — even one that is not in your cluster — is down for reasons beyond your control.

How do we make sure the client does not break when trying to perform actions that are strongly dependent on the required (and down) service?

The general accepted solution is to **handle the errors accordingly** and show **friendly error messages** explaining what's going on to the users.

However, there's another approach that might be worth exploring:
* container orchestrator notifies a subscriber that a particular service is down
* any subscriber to such information could then react to this news by modifying the way the API is offered to the clients 

In this proactive scenario, the client would be smart enough to understand the availability of API services on which it depends.

Let's see how the **Kubernetes APIs** and a **hypermedia driven API** can help us in implementing this workflow.

## Concepts

### Kubernetes API

Kubernetes provides an HTTP API that plays a central role in the system. All operations and communications between components are API calls handled by the Kubernetes API Server, including external user commands. Consequently, everything in the Kubernetes platform is treated as an API object and has a corresponding entry in the API. As an example, `kubectl` —the Kubernetes CLI—is using the API for all the operations it offers.

Among the various possible operations using the API, most resources provide a [watch](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.10/#read) endpoint that will stream all the changes that are happening on a particular resource. It's basically like a _callback_ that gets called whenever a resource gets created, deleted or modified.

Things start to get interesting when, reading the documentation, you realize it's possible to [access the API from a pod](https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/#accessing-the-api-from-a-pod). This means that Express Gateway, one or more pods in your cluster, can access this API provide interesting integrations with our system.

The end goal of our experiment is to make Express Gateway listen for specific changes we're interested in and modify the Gateway configuration accordingly.

### Hypermedia APIs

[Hypermedia APIs](https://smartbear.com/learn/api-design/what-is-hypermedia/) have been with us since forever. They can offer the resiliency we need on the client side to gracefully degrade the experience. This is because we're decoupling the client code from the server implementation details such as URL and required parameters. Now, we can focus on the hands-on code.

In case you're not familiar with hypermedia APIs, [check out Glenn Block’s excellent talk.](https://www.youtube.com/watch?v=vp-Na5wKlig)

## Putting Express Gateway and Kubernetes to work

Express Gateway does not offer a Kubernetes specific feature out of the box. However, we can extend it [using its plugin system](https://www.express-gateway.io/docs/plugins/plugin-development/). Now — we've already treated this topic in previous articles, so I'm not going to go a lot into details into [how to write a plugin](https://www.express-gateway.io/docs/plugins/plugin-development/).

Let's start by [scaffolding a new plugin](https://www.express-gateway.io/docs/plugins/plugin-development/) and install a Kubernetes client for JavaScript. 

There are so many choices on how to get this done. So, today we're going to go with the one provided by [the GoDaddy team](https://github.com/godaddy/kubernetes-client).

`$ npm install kubernetes-client`

Connecting to the Kubernetes API from a pod is easy. Kubernetes mounts the necessary certificates in the container in well-known directories and injects the API Url/Port as environment variables. Additionally, the client we just installed is able to grab this data and use it to create a working client with a single line:

`const client = new Client({ config: config.getInCluster(), 
version: '1.9' });`

This example has been written with the API Version 1.9. However, Kubernetes and the API are evolving rapidly.

**Note:** You can also use `config.fromKubeConfig()`; that'll read your `kubectl` configuration file. This allows you to test your integration on a local installation such as `minikube` or any other Kubernetes cluster while making the development locally on your computer.

Now that we have a client, let's set it up to notify us when something is happening [to our deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/):

```javascript
  const namespace = client.apis.apps.v1.watch.namespaces('default'); // Change this with your target namespace
  const customers = namespace.deployments('customers');
  const invoices = namespace.deployments('invoices');

  const streams = [customers.getStream().pipe(JSONStream.parse()), invoices.getStream().pipe(JSONStream.parse())]

  streams.forEach((stream) => stream.on('data', onStreamData));
```

**Note** we had to use JSONStream library to parse the stream returned by the watch endpoint to a JavaScript Object.

Ultimately, we can define what we want to do when one of these actions are happening:

`function onStreamData(deploymentInfo) {
  if (deploymentInfo.type === 'MODIFIED') {
    const availableReplicas = deploymentInfo.object.status.availableReplicas;
    const deploymentName = deploymentInfo.object.metadata.name;`

    `if (!!!availableReplicas || availableReplicas === 0) {
      console.log(`The service ${deploymentName} seems to be down. Removing affordances.`)
      currentActions[deploymentName] = [];
    }
    else {
      console.log(`The service ${deploymentName} seems to be up. Adding affordances.`)
      currentActions[deploymentName] = JSON.parse(JSON.stringify(avaiableActions[deploymentName]));
    }
 }
}`


Where currentActions is an object where we keep track of the possible actions

`const avaiableActions = {
  customers: [
    { url: 'http://customers.apitest.lan/', value: 'listCustomer' },
    { url: 'http://customers.apitest.lan/', value: 'createCustomer' },
  ],
  invoices: [
    { url: 'http://invoices.apitest.lan/{customerId}/invoices/', value: 'listInvoice' },
    { url: 'http://invoices.apitest.lan/{customerId}/invoices/', value: 'createInvoice' },
  ]
};`

That gets then returned when the client is doing the first request to the `/apiroot` endpoint of our service:

`app.get('/apiroot', (req, res) => res.json({
   url: '/',
   actions[
...currentActions.customers,...currentActions.invoices]
}));`

## Moving On
The end goal of our experiment is to make Express Gateway listen for specific changes we're interested in and modify the Gateway configuration accordingly. In case you're interested the final result would look like, you can [see it in action here](https://youtu.be/004Uhxo0xd4). Additionally, the [source code is available on Github if you’d like to give it a try](https://github.com/XVincentX/apigateway-playground/tree/microservice-gateway-hypermedia-kubernetes). 

## More Resources

* Learn more about upcoming features and releases by checking out the **[Express Gateway Roadmap](https://github.com/ExpressGateway/express-gateway/milestones)**

* Join the **[Express Gateway Newsletter](https://eepurl.com/cVOqd5)** update list

* **[Follow along on](https://twitter.com/express_gateway)** Twitter

* Have Questions? Head over to **[our Gitter channel](https://gitter.im/ExpressGateway/express-gateway)** and hit us up!