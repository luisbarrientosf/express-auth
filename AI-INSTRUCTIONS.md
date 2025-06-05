# AI-INSTRUCTIONS.md

This file provides guidelines and instructions for AI tools and agents in this project.

## General Principles
- AI should never do automatic code changes, always should ask explicit user confirmation.
- AI should provide a list of file changes with short informative descriptions.
- AI should determine what bounded contexts will be affected and why.
- AI should recommend good alternatives on every answer.

## Coding Standards
- AI should follow `CODING-STANDARDS.md` instructions.
- AI should respect pre-existent file/folder structures and functions.

## Documentation
- AI should ask to add new routes to `docs/postman-collection.json` and `swagger.json` when is possible.
- AI should reflect bounded contexts as folders on postman and tags on swagger.

## Other Rules
- When a controller is created, should use try-catch
