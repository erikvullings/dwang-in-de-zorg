# Backend service for the location register
[Query on care provider name](http://test.locatieregister.dwangindezorg.nl/api/zorgaanbieders?q={%22naam%22:{%22$regex%22:[%22Parna%22,%20%22i%22]}})
- [Generic query on name, postal code, kvk etc](http://test.locatieregister.dwangindezorg.nl/api/zorgaanbieders?q={"target":{"$contains":"ar"}})
The backend service offers a simple REST interface on top of the in-memory database, lokijs, and the functionality it offers is described [here](https://github.com/erikvullings/rest-easy-loki).

Additionally, it serves as a proxy to the Dutch Chamber of Commerce (NHR or KvK), so the browser can query the KvK too.

## Installation

```console
npm i
npm start
```

## Requirements

The proxy to the KVK requires an API key, `KVK_API_KEY`, so please provide it via the environment or an `.env` file.

## API examples

The API is built on top of [REST-EASY-LOKI](https://github.com/erikvullings/rest-easy-loki), which in turn provides a REST interface for the in-memory database [LokiJS](https://github.com/techfort/LokiJS). Please consult them to see the main functionality. Below are some examples related to the current implementations.

- [Query a care provider by id](http://test.locatieregister.dwangindezorg.nl/api/zorgaanbieders/15)
- [Query for care providers that are Wzd accommodations and the location contains 'parn'](http://test.locatieregister.dwangindezorg.nl/api/zorgaanbieders?q={"$and":[{"locaties.isWzdAcco":true},{"locaties.target":{"$contains":"parn"}}]})
- [Query locations on the map](http://test.locatieregister.dwangindezorg.nl/api/zorgaanbieders?q={"$and":[{"locaties.lat":{"$between":[5.5,5.51]}},{"locaties.lon":{"$between":[50,55]}}]})
- [Description of the models that are used](https://github.com/erikvullings/dwang-in-de-zorg/blob/master/packages/common/src/models/care-provider.ts)
- [Determine whether a location is active](https://github.com/erikvullings/dwang-in-de-zorg/blob/dd11c9b46696d02e280ecf10186a902bebc8f4ca/packages/common/src/utils/index.ts#L70-L82)
- [Query on care provider name](http://test.locatieregister.dwangindezorg.nl/api/zorgaanbieders?q={%22naam%22:{%22$regex%22:[%22Parna%22,%20%22i%22]}})
- [Generic query on name, postal code, kvk etc](http://test.locatieregister.dwangindezorg.nl/api/zorgaanbieders?q={"target":{"$contains":"ar"}})
- [Query locations by postal code](http://test.locatieregister.dwangindezorg.nl/api/zorgaanbieders?q={"locaties.pc": "2033 PZ"})
