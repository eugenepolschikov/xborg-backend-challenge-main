# XBorg Tech Challenge

## Submission Requirements

- Unit Tests
- Integration Tests
- E2E Testing
- Testing Performance benchmarks
- Clearly document strategies via effective testing and in the Submission Documentation section of the ReadMe

Implementation should be submitted via a public GitHub repository, or a private repository with collaborator access granted to the provided emails.

## Architecture

- Language - Typescript
- Monorepo - Turborepo
- Client - NextJs
- Api - NestJs
- DB - SQLite

## Apps and Packages

- `client`: [Next.js](https://nextjs.org/) app
- `api`: [Nestjs](https://nestjs.com) app
- `tsconfig`: Typescript configuration used throughout the monorepo

## Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Husky](https://typicode.github.io/husky/) for Git hooks

## Steps to run app

#### Install Metamask [link](https://chromewebstore.google.com/detail/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=item-share-cb)

#### Run commands in order

```bash
# Enter all commands from the project root

# Start the infrastructure (Requires Docker)
$ yarn start:local:infra

# Install dependencies
$ yarn install

 # Build the app including the lib
$ yarn build

# Migrate the DB
$ cd apps/api && yarn migrate:local

 # Run the application stack in dev
 $ yarn dev
```

## Additional Commands

```bash
# Run tests in all apps
$ yarn test

# Run linter in all apps
$ yarn lint

# Format code in all apps
$ yarn format

```

## Submission Documentation...

Created the unit tests for both the UserController and the UserService.

Added:
For `UserService`:

1. Enhanced the existing signup test with more assertions
2. Added test for error handling when repository create fails
3. Added test for handling missing optional fields
4. Added logging verification
5. Added proper cleanup in afterEach

For `UserController`

1. Created new test file with complete test coverage
2. Added tests for getUser by both id and address
3. Added error handling tests
4. Added tests for signup functionality
5. Added logging verification
6. Added proper cleanup in afterEach

Tests cover:

- Happy paths (successful operations)
- Error scenarios
- Edge cases (missing optional fields)
- Logging verification
- Proper dependency injection
- Proper mocking of dependencies

To run these tests,

> yarn test

The tests use:

- Jest as the testing framework
