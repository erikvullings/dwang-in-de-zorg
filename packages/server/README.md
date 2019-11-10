# Backend service for the location register

The backend service offers a simple REST interface on top of the in-memory database, lokijs, and the functionality it offers is described [here](https://github.com/erikvullings/rest-easy-loki).

Additionally, it serves as a proxy to the Dutch Chamber of Commerce (NHR or KvK), so the browser can query the KvK too.

## Installation

```console
npm i
npm start
```

## Requirements

The proxy to the KVK requires an API key, `KVK_API_KEY`, so please provide it via the environment or an `.env` file.
