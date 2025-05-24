# FinTrack

## Environment setup

In order to run this project locally, the following tools are required:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en) (see version requirements in package.json)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (see version requirements in package.json)

With everything ready,

1. install the project dependencies

```
yarn
```

2. spin up the docker containers

```
yarn docker:up
```

## Migrations

After performing schema changes (entities), use the following command to generate a new migration:

```bash
$ yarn migration:generate AddUsersTable
```

Inspect the generated code then move it into the migrations folder in case it looks good:

```bash
$ mv 1748044555790-AddUsersTable.ts ./src/entities/migrations/1748044555790-AddUsersTable.ts
```

In case you want to run pending migration without having to spin up the server, use the following command:

```bash
$ yarn migration:run
```

In order to revert a migration, use the following command. Please note that will revert the latest applied migration (running the down method implementation). For production environment, prioritize rollbacks and backups instead.

```bash
$ yarn migration:revert
```
