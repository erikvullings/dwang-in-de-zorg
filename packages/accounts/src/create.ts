import * as fs from 'fs';
import KcAdminClient from 'keycloak-admin';
import * as Papa from 'papaparse';
import * as path from 'path';

const filename = path.resolve(process.cwd(), process.env.USERS || './users.csv');

interface IImportedData {
  naam: string;
  kvk: string;
  pwd: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const create = async () => {
  const kcAdminClient = new KcAdminClient({
    // Mount the pod:
    // oc login https://k8s-test.overheid.standaardplatform.rijksapps.nl:8443
    // locally kubectl -n vws-locr-tst port-forward pod/jboss-keycloak-deployment-765d77d4f6-swtsj 8080
    baseUrl: 'https://login.locatieregister.dwangindezorg.nl/auth',
    // baseUrl: 'http://localhost:8765/auth',
    realmName: 'master',
  });
  await kcAdminClient.auth({
    username: 'admin',
    password: process.env.ADMIN_PWD || 'aaquaekecigaiNool4chee2fe5oo',
    grantType: 'password',
    clientId: 'admin-cli',
  }).catch(e => {
    console.error(e);
    process.exit(1);
   });

  fs.readFile(filename, 'utf8', async (err, csv) => {
    if (err) {
      throw err;
    }
    const data = Papa.parse(csv.replace(/^\uFEFF/, ''), {
      delimiter: ';',
      header: true,
      trimHeaders: true,
      transform: v => v.trim()
    }).data as IImportedData[];

    for (const cur of data) {
      const { naam, kvk, pwd } = cur;
      const user = {
        firstName: 'Beheerder',
        enabled: process.env.USERS_ENABLED === 'true',
        lastName: naam,
        username: kvk,
        credentials: [{ type: 'password', value: pwd, temporary: true }],
        realmRoles: ['user', 'offline_access']
      };
      await kcAdminClient.users.create({
        realm: 'vws',
        ...user,
      }).catch(e => {
        console.error((e.response.data.errorMessage || JSON.stringify(e.response.data)) + `: ${kvk}, ${naam}!`);
      });
      await sleep(10);
    }
  });
};

create();
