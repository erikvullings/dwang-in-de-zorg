# Creating user accounts

The Keycloak needs user accounts for the locations that have already been imported. Each user account has a username, which is the KVK number, and a randomly generated password. To generate this password in Excel, you can use a formula like the following:

```console
=CHAR(RANDBETWEEN(65;90))&CHAR(RANDBETWEEN(65;90))&RANDBETWEEN(100;999)&CHAR(RANDBETWEEN(65;90))
```

## REST endpoint

The REST API is documented [here](https://www.keycloak.org/docs-api/7.0/rest-api/index.html#_users_resource).
Basically, you just need to POST a user object to `http://login-test.locatieregister.dwangindezorg.nl/auth/{REALM}/users`.

## Installation

```bash
npm i
npm start
```

## Running

```bash
set USERS="./users.csv" # Point to file with usernames and pwd, relative to current working direcotry
set ADMIN_PWD="" # Specify the Keycloak admin pwd
npm run create
```
