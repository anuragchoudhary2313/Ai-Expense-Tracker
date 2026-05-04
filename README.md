<div align="center"><a name="readme-top"></a>

<img src="public/logo/512.png" alt="AI Expense Tracker" width="256">

<br>

# AI Expense Tracker

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)

</div>

## 📋 Overview

AI Expense Tracker (aka TaxHacker) is a self-hosted, intelligent expense management application for freelancers, startups, and small businesses. It automates receipt processing, transaction management, and provides financial insights using AI.

### Highlights

- AI-powered receipt & invoice extraction
- Multi-currency support with historical rates
- Custom categories, fields, and projects
- Dashboard charts, reports, and GST support
- Flexible LLM integrations (OpenAI, Google, Mistral, local)

---

## 🚀 Quick Start

Prerequisites: Node.js 18+, PostgreSQL 12+, npm/pnpm, and an LLM API key (optional).

1. Clone and install:

```bash
git clone https://github.com/anuragchoudhary2313/Ai-Expense-Tracker.git
cd "Ai-Expense-Tracker"
npm install
```

2. Copy and edit environment file:

```bash
cp .env.example .env.local
# edit .env.local (DATABASE_URL, BETTER_AUTH_SECRET, LLM keys)
```

3. Start Postgres (Docker or local) and run migrations:

```bash
npx prisma migrate deploy
npx prisma generate
```

4. Run development server:

```bash
npm run dev
```

Visit: http://localhost:7331

---

## 📁 Project Structure (short)

Key folders:

- `app/` — Next.js app routes and pages
- `components/` — React components and widgets
- `lib/` — utilities (auth, db, LLM providers)
- `prisma/` — schema and migrations
- `public/` — static assets and logos

---

## 🎯 Features (overview)

- Receipt & invoice OCR and structured extraction
- Transaction CRUD with custom fields and categories
- Bulk operations, CSV import/export
- Dashboard, charts, and monthly comparisons
- GST and tax-aware fields (India features included)

---

## 📝 Environment Variables (example)

Set these in `.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/expense_tracker
BETTER_AUTH_SECRET=your-40-char-secret
# LLM (choose one)
OPENAI_API_KEY=sk-...
# GOOGLE_API_KEY=...
# MISTRAL_API_KEY=...
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/xyz`)
3. Commit and push
4. Open a Pull Request

Follow TypeScript strict mode and add tests for new features.

---

## 📄 License

This project is licensed under the MIT License — see [LICENSE](LICENSE).

---

## 📞 Contact

Open an issue or discussion on GitHub for questions or feature requests.

<div align="center">Made with ❤️</div>

- PostgreSQL 17+ database (or connect to your existing database)
- Automatic database migrations on startup
- Volume mounts for persistent data storage
- Production-ready configuration

New Docker images are automatically built and published with every release. You can use specific version tags (e.g., `v1.0.0`) or `latest` for the most recent version.

For advanced setups, you can customize the Docker Compose configuration to fit your infrastructure. The default configuration uses the pre-built image from GitHub Container Registry, but you can also build locally using the provided [Dockerfile](./Dockerfile).

Example custom configuration:

```yaml
services:
  app:
    image: ghcr.io/vas3k/taxhacker:latest
    ports:
      - "7331:7331"
    environment:
      - SELF_HOSTED_MODE=true
      - UPLOAD_PATH=/app/data/uploads
      - DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taxhacker
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

### Environment Variables

Configure TaxHacker for your specific needs with these environment variables:

| Variable             | Required | Description                                                                                  | Example                                      |
| -------------------- | -------- | -------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `UPLOAD_PATH`        | Yes      | Local directory for file uploads and storage                                                 | `./data/uploads`                             |
| `DATABASE_URL`       | Yes      | PostgreSQL connection string                                                                 | `postgresql://user@localhost:5432/taxhacker` |
| `PORT`               | No       | Port to run the application on                                                               | `7331` (default)                             |
| `BASE_URL`           | No       | Base URL for the application                                                                 | `http://localhost:7331`                      |
| `SELF_HOSTED_MODE`   | No       | Set to "true" for self-hosting: enables auto-login, custom API keys, and additional features | `true`                                       |
| `DISABLE_SIGNUP`     | No       | Disable new user registration on your instance                                               | `false`                                      |
| `BETTER_AUTH_SECRET` | Yes      | Secret key for authentication (minimum 16 characters)                                        | `your-secure-random-key`                     |

## ⌨️ Local Development

We use:

- **Next.js 15+** for the frontend and API
- **Prisma** for database models and migrations
- **PostgreSQL** as the database (PostgreSQL 17+ recommended)
- **Ghostscript and GraphicsMagick** for PDF processing (install on macOS via `brew install gs graphicsmagick`)

Set up your local development environment:

```bash
# Clone the repository
git clone https://github.com/vas3k/TaxHacker.git
cd TaxHacker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env with your configuration
# Make sure to set DATABASE_URL to your PostgreSQL connection string
# Example: postgresql://user@localhost:5432/taxhacker

# Initialize the database
npx prisma generate && npx prisma migrate dev

# (Optional) Enable/disable canary features
# NEXT_PUBLIC_FEATURE_DASHBOARD_V2=true
# NEXT_PUBLIC_FEATURE_INDIAN_FEATURES=true

# Start the development server
npm run dev
```

If you are upgrading an existing database, create and apply a migration after pulling latest changes:

```bash
npx prisma migrate dev --name indian_expense_features
npx prisma generate
```

Visit `http://localhost:7331` to see your local TaxHacker instance in action.

For a production build, instead of `npm run dev` use the following commands:

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 🤝 Contributing

No AI-slop PRs. Please open a new Issue and discuss the details with maintainers before sending new changes.

## 📄 License

TaxHacker is licensed under the [MIT License](LICENSE).
