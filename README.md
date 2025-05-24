# FinTrack

## Environment setup

In order to run this project locally, the following tools are required:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en) (see version requirements in package.json)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (see version requirements in package.json)

With everything ready,

1. install the project dependencies

```bash
yarn
```

2. spin up the docker containers

```bash
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

## Testing

To run the tests suite, use the following command

```bash
$ yarn test
```

## Architecture decisions

### Code organization

This project is inspired by Clean Architecture principles but doesn’t follow them strictly. Here’s how it aligns and differs:

#### Alignment with Clean Architecture

- Dependency Inversion: Interfaces define domain contracts, supported by dependency injection.
- Use Cases: Business logic resides in dedicated use-case classes.
- Entity Layer: Core business entities are separated from infrastructure.
- Repository Pattern: Data access is abstracted through repository interfaces.

#### Key Differences

1. Framework-Centric Structure

   - Clean Architecture: Organized by layers (entities, use-cases, adapters, frameworks).
   - This Project: Organized by NestJS modules and business features (transactions/, users/).

2. Simplified Layer Boundaries

   - Clean Architecture: Enforces strict layer dependencies.
   - This Project: Prioritizes maintainability with more flexible layering.

3. Directory Structure

   ```perl
   src/
   ├── entities/         # Business entities + TypeORM mapping
   ├── transactions/     # Feature module
   │   ├── domains/      # Interface contracts + Business entities
   │   ├── use-cases/    # Orchestration logic
   │   ├── controllers/  # Web adapters
   │   └── dtos/         # Data transfer objects
   ├── infrastructure/   # Framework config and repositories
   └── utils/            # Shared utilities
   ```

4. Entity Design
   - Clean Architecture: Pure business entities without infrastructure ties.
   - This Project: Entities decorated with TypeORM annotations, blending logic and persistence.

#### Reasons for These Choices

I made these decisions to optimize both productivity and maintainability. Using NestJS modules allows me to streamline feature delivery and roll out new functionality more efficiently. I also find that strict adherence to Clean Architecture can introduce unnecessary complexity, so I prefer a more pragmatic approach that keeps the project maintainable. Additionally, by leveraging NestJS and TypeORM, I can reduce boilerplate and focus more on building meaningful features instead of writing repetitive code.

### Authentication

This project does not implement a real authentication flow, as it was requested. However, it simulates how a real implementation would look like.

For the user to be considered authenticated on this application, the user id must be provided through the request header. The `AuthenticationMiddleware` validates it and tries to find the user in the database to ensure the provided id is valid. The middleware is applied to all routes.

To take advantage of this user loading process, the `LoggedUser` was introduced to make the user information available to any endpoint that uses it so the use cases don't need to load it again.

### Balance consolidation

The system uses events and queues to update the user balance whenever a new transaction is created. This asynchronous approach ensures that:

- Failed updates can be retried automatically.
- Balance calculations don’t add overhead when fetching user information, preventing server overload when multiple users access the system simultaneously.
- Users receive a fast response when creating transactions.

## Self-critique

- Leverage a better logging strategy to improve the solution observability and maintainability. Tools like Datadog could be used as they enable easy log checking and monitors creation so I got notified when something goes wrong
- I'd probably rename the repositories contracts from `domain` to something else to avoid confusion with business entities
- Improve the response the create transaction endpoints return. It exposes pretty much all the properties the transaction entity has, which is bad since we can expose data we don't want users to see
- Improve code formatting automation to better format imports, introducing a pattern to be followed by all files automatically

## Scaling

- Implement common security practices such as CORS to restrict access to authorized origins, CSP to ensure that only approved scripts can run, and rate limiting to mitigate the risk of DDoS attacks
- Introduce oAuth to handle user authentication and use JWT tokens to store the user information rather than sending the user id in the request header
- Introduce a role-based authorization system to control access to different features based on user roles. This could also serve as a potential strategy for monetizing the app
- Leverage Redis for caching the most accessed data such as the transactions of the previous 30, 60, and 90 days so the server can respond quickly, based on users usage
- Introduce more async processing and indexes as new features are introduced. Indexes must be carefully evaluated as they have a clear drawback which is impact the database write operations
- Run multiples containers in production to spread the load between them using a load balancing. A dedicated container for handling async processes could be considered, mainly if they start consuming lots of resources. This way, we ensure users will have a good experience interacting with the app while resource-heavy background jobs are isolated
- Put the app behind a CDN if users from different places of the world start using it, aiming at improving latency and availability
