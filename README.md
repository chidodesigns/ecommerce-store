# Nodejs & React Ecommerce Store

A basic ecommerce store that enables users to buy products. 

## Table of Contents

- [Installation](#installation)

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

## Notes
- To access the Admin back office of the application [initial user]
- Register a new user to the application
- log into your Mongo DB environment/collection
- Go to users table and you will find newly registered USER 
- Edit the user model info 'isAdmin' and change its value to 'true' *default is false*
- Log back into app and you will have access to the admin panel/backoffice
