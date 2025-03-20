# TODO API

This project is an API for managing todos  and features for testing, linting, and coverage.

## Prerequisites

- Docker (compatible with Colima on macOS/Linux)
- Node.js 18+
- npm or Yarn
- Valid environment configuration

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/megalcastro/product-api.git
   cd product-api
   ```

## Environment Variables

Create a `.env` file in the root of the project with the following variables , you should create a database locally on your PC, name tasks_db :

```env
DB_HOST='localhost'
DB_PORT='5432'
DB_USER=''
DB_PASSWORD=''
DB_NAME='tasks_db'
```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```


2. Start the application:

   ```bash
   npm run start:dev
   # or
   yarn start:dev
   ```

## Running Unit Tests

To run unit tests and get coverage metrics:

```bash
npm run test
npm run test:cov
```

## Validate Linters

Ensure the code adheres to linter rules:

```bash
npm run lint
```
---

Thank you for using Product API! If you have questions or suggestions, feel free to open an issue in the repository.

