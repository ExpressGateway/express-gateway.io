---
layout: doc-section
title:  "OAuth 2.0"
---
The EG oAuth 2.0 policy follows the RFC-6749 standard: https://tools.ietf.org/html/rfc6749

Currently, Express Gateway (EG) plays the role of both resource server and authorization server. In order to use the basic authentication policy, there must be consumers registered and an oauth credential created for them.

OAuth 2.0 policy will listen on the following endpoints:

* /oauth2/authorize
    * Endpoint to provision authorization codes for the Authorization Code flow, or the access token for the Implicit Grant flow. Only POST is supported.

* /oauth2/token
    * Endpoint to provision access tokens to support the Client Credentials and Password Credentials Grant flows. Only POST is supported.


When a client has been authenticated and authorized, EG will append property and authentication headers to the request before proxying it to the upstream API/Microservice, so that you can identify the consumer and the end-user in your service:

x-consumer-property and x-token-property, where property are the properties associated with the consumer and its token.
Following headers will be passed downstream:
* eg-token-scopes
    * Authorized scopes for the token
* eg-token-redirect-uri
    * Redirect URI associated with the token
* eg-token-id
    * Token ID
* eg-token-expires-at
    * Meta data about when the token expires
* eg-token-created-at
    * Meta data about when the token was created
* eg-token-consumer-id
    * ID of the consumer to whom the token belongs
* eg-token-authenticated-user-id
    * The id of the authenticated user that the client is acting on behalf of
* eg-token-auth-type
    * The type of authentication (oauth, basic-auth, key-auth, etc.)
* eg-consumer-user-id
    * ID if the user that is tied to the application (if consumer is an application)
* eg-consumer-updated-at
    * Meta data about when the consumer was last updated in EG
* eg-consumer-redirect-uri
    * Redirect URI for the credential
* eg-consumer-user-defined-property
    * Any user defined property associated with the consumer
* eg-consumer-is-active
    * A boolean indicating whether the consumer is active
* eg-consumer-id
    * ID of the consumer
* eg-consumer-created-at
    * Meta data about when the consumer was
* eg-consumer-type
    * Type of consumer - application or user

#### OAuth 2.0 Flows
There are 3 distinct entities at play -
1. Client app (client or application that is registered on EG that wants to act on behalf of user)
2. EG’s web UI (can be configured by you)
3. Express Gateway

##### Authorization Code
1. Client is already registered with EG and has an ID, secret and redirect URI in EG.
2. Client app redirects user to the EG’s web UI passing its app_id, response_type and scope
3. UI makes a GET to /oauth2/authorize and EG ensures user is logged in.
4. If user is not logged in, he/she logs in on the EG’s UI. For this login, EG acts as an authorization server for the user.

**Note**: The user will need basic auth credentials to be able to login.

5. EG’s Web app prompts user to allow client access to specific scopes, to which the user grants access.
6. EG’s UI again makes a call to /oauth2/authorize with the following data to request an auth code:
    * Header
        * Authorization: basic clientId:secret
    * body
        * clientId
        * authenticatedUserId
        * redirectUri
        * scopes
        * response_type

7. EG responds back with whether or not the client is authorized. If authorized, it returns an authorization code and redirect_uri.
8. UI redirects the client app to the redirect_uri
9. Client App will exchange the auth_code for an access token by making a POST to /oauth2/token

##### Implicit
Implicit grant is the same as authorization code grant, except we return a token and redirect_uri in step 7, and it doesn’t have steps 8 and 9.

##### Client Credentials
Client credentials grant will follow the standard RFC documentation.

#### oAuth 2.0 Policy configuration example
```
…
pipelines: {
        pipeline1: {
          apiEndpoints: ['authorizedEndpoint'],
          policies: [
            { oauth2: {} },
            { proxy: { action: { serviceEndpoint: 'backend' } } }
          ]
        }
…
```

#### Customizing the UI
The basic implementation of the UI for oAuth 2.0 is found in /lib/polocies/oauth2/views. Here, you can modify the code to suit your needs.
