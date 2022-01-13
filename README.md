# Nodejs & React Ecommerce Store

A basic ecommerce store that enables users to buy products. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

After cloning repo:

```sh
npm install [root dir - installs node modules for server]
cd frontend
npm install [install node modules for client]
cd ..
npm run-script dev [this command runs both server and client] [using npm pck 'concurrently']
```

## Environment Variables Required

- Mongo DB [MONGO_URI]
- JWT [JWT_SECRET]
- [NODE_ENV] = development
- Paypal[PAYPAL_CLIENT_ID]
- port  [PORT] *only for local*

