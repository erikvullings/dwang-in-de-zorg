# LOCATION REGISTER, part of [dwangindezorg.nl](dwangindezorg.nl)

A web application for storing and searching locations, using:

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

This application is developed using [node.js](https://nodejs.org) v10, so please install that first if you don't have it.

To install all project dependencies, start the database service and run parcel to bundle your dependencies. You can access the application at [http://localhost:3000](http://localhost:3000).

```bash
pnpm i
npm build:domain
npm run serve
```

## TODO

- CSV: Slaan we alle aantekeningen op, of alleen de huidige. Laatste...
- Date picker modals worden teveel aangemaakt - bug in mithril-materialized
- Mutaties opslaan
- Locatie wijzigingen van een datumstempel voorzien
- Repeat items: wat als er 1200 locaties zijn? Pagination + filter
- KvK koppeling
- PDOK koppeling
- Docker versie bouwen
  - locatieregister.db in volume data (Kubernetics: persistent volume cache oid pvc)

## Development

As above, but now run `parcel` in watch mode, and access the application at [http://localhost:3000](http://localhost:1234).

```bash
npm i
npm start
```

### Environment settings

- LOKI_PORT: to change the output port, default 3000, e.g. `set LOKI_PORT=80` to serve it at [http://localhost](http://localhost).
- LOKI_DB: to change the database name.
- LOKI_CORS: to disable CORS.
- LOKI_PRETTY: to show nicely formatted logs.

### Activities

1. Ik heb al een ingangsdatum, maar nog geen einddatum of een einddatum in de toekomst (van de laatste aantekening)
  Pas de ingangsdatum aan => pas de laatste aantekening aan (ingangsdatum)
  Pas de einddatum aan => pas de laatste aantekening aan (einddatum)
2. Ik heb al een ingangsdatum en ook een einddatum in het verleden (van de laatste aantekening).
  Maak een nieuwe aantekening aan, nog zonder ingangsdatum.
3. Ik heb nog geen ingangsdatum (van de laatste aantekening).
  Biedt een date picker aan om de ingangsdatum in te stellen

Hoe los ik op:

- Einddatum moet groter zijn dan ingangsdatum.
- Ingangsdatum in het verleden mag je niet meer aanpassen.
