> **Note:** This project is based on the [Employee Management CRM](https://github.com/dreamquality/employee-management-crm) repository. The original README file is available in `readme.original.md`.

# Employee Management API — Testing & CI/CD Guide
A professional suite of smoke, integration, and E2E tests for the employee-management-api application (backend Node.js/Express/Sequelize/PostgreSQL and frontend UI), running in an isolated Docker environment.


 ## 🛠 Tech Stack
- **Runtime:** Node.js
- **Database:** PostgreSQL & Sequelize ORM
- **Backend Testing:** Mocha, Chai, Supertest
- **Frontend / E2E Testing:** Playwright (with Page Object Model pattern)
- **Environment:** Docker & Docker Compose, Windows/WSL2

 ## 📂 Test Structure
The test suite is divided into backend and frontend components:

- **Backend Integration & Smoke Tests (`tests/`):**
  - `smoke.test.js` — Covers backend health checks (`/health`), Swagger documentation access (`/api-docs/`), sorting users by registration date, deleting users by ID fetched dynamically from the database, and validating non-Latin/multilingual characters.

- **Frontend E2E & UI Tests (`frontend/tests/`):**
  - `spec/auth.spec.js` — Tests authentication and registration flows using Playwright and the Page Object Model (`LoginPage`, `RegisterPage`). It validates form elements visibility, page titles, and navigation links between login and registration views.

## 🚀 Local Test Execution

### 1. Inside Docker (Production/CI Parity)
To run the tests in the exact same environment as production or CI, use Docker:

- **Backend Tests:**
  - Execute a specific test file inside the running container:
    `docker exec -it my_test npx mocha tests/smoke.test.js`
  - Or run the entire backend test suite via the npm script:
    `docker exec -it my_test npm test`

- **Frontend E2E Tests (Playwright):**
  - Run the E2E UI tests in an isolated Docker container using the `e2e` profile:
    `docker compose --profile e2e up --abort-on-container-exit --exit-code-from playwright`

### 2. Locally (Directly on Host)
If you want to run frontend tests directly from your local environment (e.g., inside `frontend/` directory):
- Navigate to the frontend directory: `cd frontend`
- Install dependencies: `npm install`
- Run Playwright tests: `npm test` (or `npx playwright test`)

## CI/CD (GitHub Actions)
The project features an automated CI/CD pipeline (`.github/workflows/tests.yml`) triggered on every push or Pull Request to the `main` and `develop` branches.

- **Pipeline Workflow:**
  - Sets up environment files (`.env` and `.env.test`).
  - Runs both backend and frontend E2E tests in an isolated environment using Docker Compose (`--profile ci --profile e2e`).
  - Upon successful test completion on the `main` branch, automatically builds and deploys the updated Swagger documentation to GitHub Pages.