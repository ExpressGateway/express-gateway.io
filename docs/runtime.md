---
layout: doc-section
title:  "Runtime"
doc-order: 20.0
---
#### Hot Reload vs Manual Restart
Express gateway automatically monitors changes of the config file provided at start.
Once the change is detected the system automatically reconfigures without shutdown and dropping requests.

Set `EG_DISABLE_CONFIG_WATCH` env variable to false to disable Hot Reload

Hot Reload will work for:
* API Endpoints
* Service Endpoints
* Pipeline

Manual Restart is required for changes in:
* http section (port)
* https section (port and certificates)
* system.config.yml
* model changes in `model-configs`


#### Troubleshooting
set env variable ```LOG_LEVEL=debug``` to see full logging

#### Build and run

```bash
# build
npm run build

# start
npm start

# test
npm test

# create Docker container
docker build -t gateway .
```

#### Configuration Loading and Override
The config files must be in one directory and this is how to point EG to it:

**Default**
If nothing is provided EG will use config in local config /lib/config

use `npm start` to start Express-gateway

**EG_CONFIG_DIR**
Location to config folder in env variable EG\_CONFIG\_DIR
example:
EG\_CONFIG\_DIR=/some/path/config  npm start
