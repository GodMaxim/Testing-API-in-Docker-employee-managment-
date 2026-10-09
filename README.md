# Employee Management API — Testing & CI/CD Guide
```text
A professional suite of smoke and integration tests for the employee-management-api-app backend application built with Node.js, Express, Sequelize, and PostgreSQL, running in an isolated Docker environment.
```

 ## 🛠 Tech Stack
* Runtime: Node.js
* Database: PostgreSQL & Sequelize ORM
* Testing Framework: Mocha, Chai, Supertest
* Environment: Docker & Docker Compose, Windows/WSL2

 ## 📂 Test Structure
The main integration and smoke tests are located in the tests/ directory:

* smoke.test.js — Covers backend health checks (/health), Swagger documentation access (/api-docs/), sorting users by registration date, deleting users by ID fetched dynamically from the database, and validating non-Latin/multilingual characters.

## 🚀 Local Test Execution (Inside Docker)
To run the tests in the exact same environment as production or CI, use Docker:

1. Execute a specific test file inside the running container:
- docker exec -it my_app npx mocha tests/smoke.test.js

2. Or run the entire test suite via the npm script:
- docker exec -it my_app npm test

## CI/CD (GitHub Actions)
The project features an automated CI/CD pipeline (.github/workflows/test.yml) triggered on every push or Pull Request to the main and develop branches.

* Pipeline Workflow:
- Sets up environment files (.env and .env.test).
- Runs tests in an isolated environment using Docker Compose (--profile ci).
- Upon successful test completion on the main branch, automatically builds and deploys the updated Swagger documentation to GitHub Pages.