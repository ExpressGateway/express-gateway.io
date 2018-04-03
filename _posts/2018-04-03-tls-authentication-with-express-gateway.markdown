---
title: TLS authentication with Express Gateway
date: 2018-04-03 12:57:00 Z
categories:
- technology
tags:
- TLS authentication
- Transport Layer Security (TLS) Client Authentication
- client authentication methods
- TLS authentication and IoT
- TLS authentication and Mobile banking
layout: post
---

Express Gateway supports various client authentication methods such as [key auth](https://www.express-gateway.io/docs/policies/key-authorization/),[basic auth](https://www.express-gateway.io/docs/policies/basic-authorization/),[jwt](https://www.express-gateway.io/docs/policies/jwt/). Based on developer community feedback, we’ve included support to Transport Layer Security (TLS) Client Authentication in the latest 1.8.0 release. 

So, we can code up some new and interesting scenarios. Let's dig in!

<!--excerpt-->

## Brief Overview of TLS Client Authentication

In a traditional TLS handshake, the client authenticates the server, and during this process the server doesn’t actually know a lot of information about the client.

TLS Client Authentication is a security protocol that lets the server verify the client identity and then decide what to do based on the result.

TLS Client Authentication is useful in cases, like IoT where a server is keeping track of hundreds of clients. It is also useful in a mobile app with millions of installs exchanging secure information. Let’s take a deeper look at these two examples.

In our first example, an IoT company can issue a unique client certificate per device, and then limit connections to their IoT infrastructure to only their devices by blocking connections where the client doesn’t present a certificate signed by the company’s certificate authority.

In our second example, we’ll use a mobile banking app where the bank wants to ensure customers’ secure financial data doesn’t get stolen by bots spoofing their mobile app. In this example, developers can issue a unique certificate to every app install and validate that the requests are coming from their mobile app in the TLS handshake. Client authentication is also useful for VPNs, enterprise networks or staging sites, where corporations and developers need to lock down connections to only laptops and phones owned by their employees and teammates.

## Getting Started with TLS authentication and Express Gateway

In order to set up TLS client authentication with Express Gateway,make sure it's listening on a secure connection rather than the usual `http`. 
To do that, let's generate a set of certificates:

* Generate a new CA certificate, that'll be the authority signing our client certificates:

```bash
$ openssl genrsa -out rootCA.key 2048
$ openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem
```

* Generate a new server certificate, that'll be used to run Express Gateway on SSL

```bash
$ openssl req -nodes -newkey rsa:2048 -keyout server.key -out server.csr
$ openssl x509 -req -days 365 -in server.csr -CA rootCA.pem -CAkey rootCA.key -set_serial 01 -out server.crt
```

* Generate a client certificate for a device

```bash
$ openssl req -nodes -newkey rsa:2048 -keyout client.key -out client.csr
$ openssl x509 -req -days 365 -in client.csr -CA rootCA.pem -CAkey rootCA.key -set_serial 01 -out client.crt
```

### Install server certificates in Express Gateway

In our `gateway.config.yml`, let's remove the `http` port and replace it with this snippet:

```
"https": {
    "port": 4444,
    "tls": {
      "default": {
        "key": "/var/lib/certs/tls.key",
        "cert": "/var/lib/certs/tls.crt",
        "ca": ["/var/lib/chain/chain.pem"]
      }
    },
    "options": {
      "requestCert": true,
      "rejectUnauthorized": true
    }
  },```

This configuration snippet will make sure Express Gateway will listen for HTTPS connections using the provided certificates. It will also require clients to supply a certificate, and reject the ones that are not authorized.

We can now see that any request done using curl will be refused by the server, because we're not providing any client certificate:
```bash
$ curl https://localhost:4444/users -k
curl: (35) error:14094410:SSL routines:SSL3_READ_BYTES:sslv3 alert handshake failure
```

**Note:** the `-k` flag is to ignore self signed certificates problem, and it should be generally avoided, if you’re not using it for testing purposes. You can also instruct curl to use your chain file so you can avoid this flag while doing requests:

```bash
$ curl https://localhost:4444/users --cacert ./path/to/rootCA.pem
```

Things get better when we provide an approved client certificate with the request:

```bash
$ curl https://localhost:4444/users -ki --key client.key --cert client.crt

HTTP/1.1 200 OK
x-powered-by: Express
content-type: application/json; charset=utf-8
content-length: 24
etag: W/"18-a5uimDcszXcqqnD3edbZl0H8rcw"
date: Mon, 02 Apr 2018 09:38:11 GMT
connection: close
```

## Moving On

In this article we have discovered TLS Authentication as an alternative method to authenticate a client that’s trying to connect to our system. 

You may be thinking - don’t we have API keys for that? 

Client certificates offer a layer of security that API keys cannot provide. If an API key gets compromised mid-connection, it can be reused to fire its own valid, trusted requests to the backend infrastructure. However; the private key of the client certificate is used to create a digital signature in every TLS connection. So even if the certificate is sniffed mid-connection, new requests can’t be instantiated with it. This might be an important requirement for banking applications and IoT devices.

## More Resources

* Learn more about upcoming features and releases by checking out the **[Express Gateway Roadmap](https://github.com/ExpressGateway/express-gateway/milestones)**

* Join the **[Express Gateway Newsletter](https://eepurl.com/cVOqd5)** update list

* **[Follow along on](https://twitter.com/express_gateway)** Twitter

* Have Questions? Head over to **[our Gitter channel](https://gitter.im/ExpressGateway/express-gateway)** and hit us up!
