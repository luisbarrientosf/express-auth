# Express Auth API (DDD, Prisma, PostgreSQL)

A modular, testable authentication API built with Express, TypeScript, and Domain-Driven Design (DDD). Uses Prisma ORM with PostgreSQL, JWT authentication, and robust testing (unit + integration with testcontainers).

## Features
- DDD-inspired folder structure (domain, application, infrastructure, presentation)
- JWT-based authentication
- PostgreSQL with Prisma ORM
- API documentation (Swagger, Postman)
- Unit and integration tests (testcontainers for PostgreSQL)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Docker (for integration tests)
- PostgreSQL (for local development)

### Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Configure your `.env` file with `DATABASE_URL` for your local PostgreSQL instance.
3. Run Prisma migrations:
   ```sh
   npx prisma migrate deploy
   ```
4. Start the server:
   ```sh
   npm run start
   ```

### Testing
- **Unit tests:**
  ```sh
  npx jest
  ```

### API Documentation
- See `docs/swagger.json` for OpenAPI spec.
- See `docs/postman-collection.json` for Postman collection.

## Project Structure
- `src/domain/` - Entities, value objects, domain services
- `src/application/` - Application services, use cases
- `src/infrastructure/` - DB, JWT, repository implementations
- `src/presentation/` - Controllers, routes, DTOs
- `docs/` - API docs, architecture diagrams
- `tests/` - Unit and integration tests

## Coding Standards
See `CODING-STANDARDS.md` for project rules, naming conventions, and DDD boundaries.

