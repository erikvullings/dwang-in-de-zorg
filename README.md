# [LOCATION REGISTER](https://locatieregister.dwangindezorg.nl)

A web application for storing and searching care provider locations, using:

- A backend service, consisting of:
  - [node.js](https://nodejs.org) and [koa](https://www.npmjs.com/package/koa) as the backend service.
  - [lokijs](http://lokijs.org) as an in-memory database, with a JSON file for persistence.
  - [rest-easy-loki](https://github.com/erikvullings/rest-easy-loki) a REST interface on top of loki, also supporting MongoDB like queries.
- A frontend single-page application (a so-called SPA), using:
  - [mithril](http://mithril.js.org) as JS framework
  - [mithril-ui-form](https://github.com/erikvullings/mithril-ui-form) for creating the forms
  - [mithril-materialized](https://github.com/erikvullings/mithril-materialized) for the Material design
- A [Keycloak](https://www.keycloak.org) identity provider, running in a Docker container. In the `.env` file, the realm settings and application name need to be provided in order for it to work as expected.

## Installation

This application is developed using [node.js](https://nodejs.org) v10 or later, so please install that first if you don't have it.

To install all project dependencies, start the database service and run parcel to bundle your dependencies. You can access the application at [http://localhost:3000](http://localhost:3000).

```bash
pnpm i
npm build:domain
npm run serve
```

## Development

As above, but now run `parcel` in watch mode, and access the application at [http://localhost:3000](http://localhost:1234).

```bash
npm i
npm start
```

## Building a standalone Docker container

During development, I run the backend server on localhost:3030. This is specified in the `packages/app/.env` setting via the `SERVER="http://localhost:3030"` command, as Parcel uses this information and makes it available in the build client. However, during production, the location of the server is based on the location of the application, so if the locations runs at `locatieregister.dwangindezorg.nl`, then the API is found at `locatieregister.dwangindezorg.nl/api`. In order to make this work, the `.env` variable is cleared (commented out).

Please note that the `home-page.ts` also contains a footer text with a reference to the release date. It would be good to update that too.

So after you have commented out the `SERVER` variable in the `packages/app/.env` file, you can now safely run

```bash
npm run docker:local    # to build it
npm run docker:run      # to run it locally and test it
### And if you are happy
docker rm lr            # to remove the container you just created
npm run docker:publish  # to publish it to docker to the minvws organisation
```

### Environment settings

- LOKI_PORT: to change the output port, default 3000, e.g. `set LOKI_PORT=80` to serve it at [http://localhost](http://localhost).
- LOKI_DB: to change the database name.
- LOKI_CORS: to disable CORS.
- LOKI_PRETTY: to show nicely formatted logs.

## Deployment links

To build a Docker container, run `npm run docker:local`. Test it and publish it `npm run docker:publish`. Just make sure that you comment the SERVER setting in the `.env` file in the app package.

Useful links if you have setup a VPN connection with the cloud provider.

- [Access pipelines](https://git.overheid.standaardplatform.rijksapps.nl/vws/locr/hackaton/locatieregister/pipelines)
- [Replacing the database](https://git.overheid.standaardplatform.rijksapps.nl/vws/locr/hackaton/locatieregister/blob/extra-params/db/locatieregister.db) and starting the deployment pipeline
- [Download DB from production](https://git.overheid.standaardplatform.rijksapps.nl/vws/locr/backup-db-prod/pipelines)

## API Query examples

If you run these queries in FireFox, you get a nicely formatted JSON output. To see additional commands you can use, go [here](https://github.com/techfort/LokiJS/wiki/Query-Examples).

### Only get a subset of all properties

To reduce the query size, you can use the `view` path, e.g. to only return the ID and name, use:
[/api/zorgaanbieders/view?props=$loki,naam](https://locatieregister.dwangindezorg.nl/api/zorgaanbieders/view?props=$loki,naam)

### Query all care providers without locations

Use the query `q = {"locaties": { "$size": 0 } }`, e.g.
[/api/zorgaanbieders?q={%22locaties%22:{%22$size%22:0}}](https://locatieregister.dwangindezorg.nl/api/zorgaanbieders?q={%22locaties%22:{%22$size%22:0}})

You can combine this with a `view` filter, e.g. 
[/api/zorgaanbieders/view?props=$loki,naam&q={%22locaties%22:{%22$size%22:0}}](https://locatieregister.dwangindezorg.nl/api/zorgaanbieders/view?props=$loki,naam&q={%22locaties%22:{%22$size%22:0}})
