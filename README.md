# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
#   s e c r e t t r i p . i d 

#Setup Secrettrip.id1. clone for this repository
2. import database to local server (secrettrip_id.sql)
3. setup your .env file for connect to mysql
4. add in your .env file : ASSET_URL=http://${HOST}:${PORT}/assets
2. open root folder adonis in cli or git
3. adonis serve --dev (for development mode)