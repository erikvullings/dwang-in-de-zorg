import Koa from 'koa';
import proxy from 'koa-proxies';
import { createApi, db } from 'rest-easy-loki';

export const collectionName = 'documents';

const port = process.env.LOKI_PORT || '3030';
const dbName = process.env.LOKI_DB || './db/locatieregister.db';
const cors = (process.env.LOKI_CORS || 'true') === 'true';
const sizeLimit = process.env.LOKI_SIZE_LIMIT || '250mb';

const apiKey = process.env.KVK_API_KEY;
const kvkDefaultQueryParams = `?user_key=${apiKey}&legalPerson=false&`;
const kvkUri = 'https://api.kvk.nl/api/v2/profile/companies';

export const startService = () => {
  db.startDatabase(dbName, () => {
    const api = createApi({ cors, sizeLimit }) as Koa;

    // Proxy to KVK
    api.use(
      proxy('/search/kvk', {
        target: kvkUri,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/search\/kvk\?/, kvkDefaultQueryParams),
        logs: true,
      })
    );

    api.listen(port);
    console.log(`Server running on port ${port}.`);
  });
};
startService();
