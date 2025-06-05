# CODING STANDARDS
This file contains instructions and coding rules to use in this project.

## Naming Conventions
- Use PascalCase for entity, service, and repository filenames and class names (e.g., User.ts, AuthService.ts).
- Use camelCase for utility files (e.g., jwtUtil.ts).
- Use lowercase or kebab-case for folder names (e.g., domain/user).

## Folder Structure
- Use the following DDD-inspired structure:
  - `domain/`: Entities, value objects, domain services
  - `application/`: Application services, use cases
  - `infrastructure/`: DB, JWT, external services, repository implementations
  - `presentation/`: Controllers, routes, DTOs, middleware

### DDD Boundaries
- Domain layer should not depend on infrastructure or presentation.
- Application layer orchestrates domain logic and coordinates infrastructure.
- Infrastructure implements technical details (DB, JWT, etc.).
- Presentation handles HTTP and external interfaces only.

## Coding Style
- Write modular, testable code.
- Use bounded contexts inside any layer to make code modular.
- Keep business logic out of controllers/routes; place it in services/use cases.
- Use dependency injection where possible.
- Use async/await for all asynchronous operations.
- Use named export whenever is possible.
- Add comments only for non-obvious logic.
- Do not add .gitkeep files

## Commit Message Standards
- Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages.
- Example:
  ```
  feat(auth): add JWT login endpoint
  
  - Implements login route and controller
  - Adds JWT generation logic
  ```
- Common types: feat, fix, docs, style, refactor, test, chore
- Scope is optional but recommended (e.g., feat(auth): ...)