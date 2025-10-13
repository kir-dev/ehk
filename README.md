## Project Setup Guide

This guide will help you set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v16 or higher)
- Yarn (v1.22.22 or higher)
- Docker

### Installation Steps

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   ```

3. **Set up environment variables:**
    - Copy the `.env.example` file to `.env`:

    - Update the `.env` file with your specific values if necessary.

4. **Start the PostgreSQL database using Docker:**
   ```sh
   docker-compose up -d
   ```

5. **Run the development server:**
   ```sh
   yarn dev
   ```

### Additional Commands

- **Build the project:**
  ```sh
  yarn build
  ```

- **Start the production server:**
  ```sh
  yarn start
  ```

- **Lint the project:**
  ```sh
  yarn lint
  ```

### Migrations (Payload + Postgres)

This project uses Payload's migrate CLI wired to the Postgres adapter. Migration files live in `./src/migrations` and are indexed by `./src/migrations/index.ts`.

Common tasks:

- Create a new migration (auto-generates a timestamped file):
  ```sh
  yarn migrate:create <name>
  # example
  yarn migrate:create add_regulations_file_eng
  ```
  Options:
  - `--skip-empty` to avoid creating an empty migration when nothing changed

- Apply pending migrations (up):
  ```sh
  yarn migrate
  ```

- Show migration status:
  ```sh
  yarn migrate:status
  ```

- Roll back the last batch:
  ```sh
  yarn migrate:down
  ```

- Reset/refresh (use with care):
  ```sh
  yarn migrate:reset     # run all downs
  yarn migrate:refresh   # run downs then ups
  yarn migrate:fresh     # drops DB and runs ups (requires --yes already in script)
  ```

Typical workflow:
1) Modify your Payload collections/config.
2) Generate a migration: `yarn migrate:create meaningful_name`.
3) Review the generated file in `src/migrations/` (it uses Postgres SQL via `db.execute(sql\`...\`)`).
4) Run `yarn migrate` to apply.

Notes:
- The CLI auto-updates `src/migrations/index.ts`. Avoid manual edits unless you know what you're doing.
- Ensure database env vars (e.g., `DATABASE_URL`) are set. For `migrate:create`, Payload initializes without DB connect; for running migrations, DB must be reachable.
- Scripts are available in `package.json` under `scripts`.

### Notes

- Ensure Docker is running before starting the development server.
- The database connection string and other secrets are managed in the `.env` file.
- The project uses Tailwind CSS for styling and Payload CMS for content management.