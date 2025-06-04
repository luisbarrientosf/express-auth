# AGENT_INSTRUCTIONS.md

This file contains instructions and coding rules for GitHub Copilot as the coding agent in this project.

## Main Rules
- Always use short answers and the minimal info to understand the changes.
- Always suggest another alternatives of implementations. Be simple on this suggestions and priorize best alternative.
- Always show a readable and specific list of changes to be made.
- Always show me what bounded context are we changing
- Do not make changes unless explicitly accepted by the user.

## Naming Conventions
- Use PascalCase for entity, service, and repository filenames and class names (e.g., User.ts, AuthService.ts).
- Use camelCase or kebab-case for utility files (e.g., jwtUtil.ts or jwt-util.ts).
- Use lowercase or kebab-case for folder names (e.g., domain/user, application/auth).

## Folder Structure
- Use the following DDD-inspired structure:
  - `domain/`: Entities, value objects, domain services
  - `application/`: Application services, use cases
  - `infrastructure/`: DB, JWT, external services, repository implementations
  - `presentation/`: Controllers, routes, DTOs, middleware
- Place docs/ and tests/ folders at the project root.

## Coding Style
- Keep business logic out of controllers/routes; place it in services/use cases.
- Use dependency injection where possible.
- Write modular, testable code.

## DDD Boundaries
- Domain layer should not depend on infrastructure or presentation.
- Application layer orchestrates domain logic and coordinates infrastructure.
- Infrastructure implements technical details (DB, JWT, etc.).
- Presentation handles HTTP and external interfaces only.

## Bounded Contexts
- We'll use bounded contexts inside any layer to make code more modular.

## Other Rules
- Use async/await for all asynchronous operations.
- Add comments for non-obvious logic.
- Implement json returns imitating working flow as default operations
- Do not add .gitkeep files
- Do not add a comment on the first line of each file


---
Update this file as needed to refine agent behavior and project standards.
