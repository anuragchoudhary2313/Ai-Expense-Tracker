<div align="center"><a name="readme-top"></a>

<img src="public/logo/512.png" alt="AI Expense Tracker" width="256">

<br>

# AI Expense Tracker

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org)

</div>

## 📋 Overview

AI Expense Tracker is a **self-hosted, intelligent expense management application** designed for freelancers, startups, and small businesses. It automates expense and income tracking with AI-powered workflows, automatic receipt processing, and smart financial insights.

### Key Capabilities

✅ **AI-Powered Receipt Scanning** - Extract data from photos and PDFs automatically  
✅ **Multi-Currency Support** - Convert expenses with historical exchange rates  
✅ **Transaction Management** - Organize with custom categories, projects, and fields  
✅ **GST Tracking** - Built-in support for tax calculations  
✅ **Financial Insights** - Dashboard charts and monthly comparisons  
✅ **Flexible LLM Support** - OpenAI, Google Gemini, Mistral, or local models  
✅ **Self-Hosted** - Full data control and privacy  
✅ **Export/Import** - Excel-compatible data export

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ or higher
- **PostgreSQL** 12+ (local or Docker)
- **npm** or **pnpm**
- LLM API key (OpenAI, Google, Mistral, or local endpoint)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ai-expense-tracker.git
   cd ai-expense-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and set:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/expense_tracker"

   # Auth
   BETTER_AUTH_SECRET="your-secret-key-min-32-chars"

   # LLM Choice (pick one)
   OPENAI_API_KEY="sk-..."
   # OR
   GOOGLE_API_KEY="AIza..."
   # OR
   MISTRAL_API_KEY="..."

   # Optional: Local LLM endpoint
   # LLM_ENDPOINT="http://localhost:1234/v1"
   ```

4. **Setup PostgreSQL**

   **Option A: Docker**

   ```bash
   docker run -d --name postgres \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=expense_tracker \
     -p 5432:5432 \
     postgres:16
   ```

   **Option B: Local Installation**

   ```bash
   # macOS
   brew install postgresql@16
   brew services start postgresql@16

   # Linux
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

5. **Run database migrations**

   ```bash
   npm run prisma:deploy
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

   Visit: **http://localhost:7331**

---

## 📁 Project Structure

```
ai-expense-tracker/
├── app/                    # Next.js app directory
│   ├── (app)/             # Protected routes (dashboard, transactions)
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API endpoints
│   └── docs/              # Documentation pages
├── components/            # React components
│   ├── dashboard/         # Dashboard widgets
│   ├── forms/             # Form components
│   ├── transactions/      # Transaction table & forms
│   ├── sidebar/           # Navigation
│   └── ui/                # UI primitives
├── lib/                   # Utilities
│   ├── auth.ts           # Authentication setup
│   ├── db.ts             # Database client
│   └── llm-providers.ts  # LLM configuration
├── models/                # Data models & queries
├── prisma/                # Database schema
│   ├── schema.prisma     # Prisma schema
│   └── migrations/       # Schema migrations
├── public/                # Static assets
│   ├── logo/             # Application logos
│   └── landing/          # Landing page assets
└── forms/                 # Form validation schemas
```

---

## 🎯 Features

### 1. **Receipt & Invoice Processing**

- Upload photos, PDFs, or documents
- AI-powered data extraction (amounts, dates, merchants, items)
- Automatic categorization
- Item-level splitting for complex invoices

### 2. **Transaction Management**

- Full CRUD operations
- Custom categories, projects, and fields
- Multi-project support
- Advanced filtering and search
- Bulk operations

### 3. **Financial Insights**

- Dashboard summary (income, expenses, balance)
- Category breakdown charts
- Monthly comparison graphs
- GST tracking and reporting
- Custom date ranges

### 4. **Currency & Tax**

- Support for 170+ currencies
- Crypto conversion (BTC, ETH, etc.)
- Historical exchange rates
- GST percentage and amount extraction
- Payment method tracking (UPI, Card, Cash)

### 5. **Data Management**

- Export to Excel/CSV
- Import from CSV
- Bulk file uploads
- Document storage
- Audit logs

---

## 🛠 Tech Stack

| Layer          | Technology                                               |
| -------------- | -------------------------------------------------------- |
| **Frontend**   | Next.js 15, React 19, TypeScript, Tailwind CSS, Radix UI |
| **Backend**    | Next.js API Routes, Node.js                              |
| **Database**   | PostgreSQL, Prisma ORM                                   |
| **AI/ML**      | LangChain, OpenAI, Google Gemini, Mistral                |
| **Charts**     | Recharts                                                 |
| **Auth**       | BetterAuth                                               |
| **Validation** | Zod                                                      |
| **Build**      | Turbopack                                                |

---

## 📖 Usage

### Upload & Process Receipts

1. Go to **Upload** section
2. Select receipt image or PDF
3. AI automatically extracts data
4. Review and confirm extraction
5. Transaction saved to database

### Manage Transactions

1. View all transactions in **Transactions**
2. Filter by date, category, project, payment method
3. Edit or delete individual transactions
4. Export data as Excel/CSV

### View Insights

1. **Dashboard** - Overview of income/expenses
2. **Reports** - Charts and comparisons
3. **Monthly View** - Track spending trends

---

## 🔒 Security & Privacy

- **Self-hosted** - All data stays on your server
- **PostgreSQL** - Industry-standard database
- **BetterAuth** - Secure authentication
- **Environment variables** - Sensitive config not in code
- **HTTPS ready** - Deploy with SSL

---

## 🚢 Deployment

### Docker Deployment

```bash
docker build -t expense-tracker .
docker run -p 7331:7331 expense-tracker
```

### Railway, Vercel, or Heroku

1. Connect your GitHub repo
2. Set environment variables
3. Deploy

---

## 📝 Environment Variables

Required variables (copy to `.env.local`):

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/expense_tracker

# Auth Secret (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
BETTER_AUTH_SECRET=your-40-char-secret-key-here

# LLM Provider (choose one)
OPENAI_API_KEY=sk-...
OPENAI_MODEL_NAME=gpt-4o-mini

# Or
GOOGLE_API_KEY=AIza...
GOOGLE_MODEL_NAME=gemini-2.5-flash

# Or
MISTRAL_API_KEY=...
MISTRAL_MODEL_NAME=mistral-medium-latest

# Optional
REVISENAND_API_KEY=  # for email notifications
STRIPE_SECRET_KEY=   # for subscription features
```

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Add tests for new features
- Update README for significant changes
- Use conventional commit messages

---

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 🙏 Support

If this project helps you, please:

- ⭐ Star this repository
- 🐛 Report bugs via Issues
- 💡 Suggest features via Discussions
- 📢 Share with friends

---

## 📞 Contact

Questions or suggestions? Open an issue or discussion on GitHub.

---

<div align="center">
  Made with ❤️ for expense tracking
</div>

Adapt TaxHacker to your unique needs with unlimited customization options. Create custom fields, projects, and categories that better suit your specific needs, idustry standards or country.

- **Custom categories and projecst**: Create your own categories and projects to group your transactions in any convenient way
- **Custom fields**: You can create unlimited number of custom fields to extraxt more information from your invoices (it's like creating extra columns in Excel)
- **Full-text search**: Search through the actual content of recognized documents
- **Advanced filtering**: Find exactly what you need with search and filter options
- **AI-powered extraction**: Write your own prompts to extract any custom information from documents
- **Bulk operations**: Process multiple documents or transactions at once

### `5` Customize any LLM prompt. Even system ones

![Custom Categories](public/landing/custom-llm.webp)

Take full control of how TaxHacker's AI processes your documents. Write custom AI prompts for fields, categories, and projects, or modify the built-in ones to match your specific needs.

- **Customizable system prompts**: Modify the general prompt template in settings to suit your business
- **Field or project-specific prompts**: Create custom extraction rules for your industry-specific documents
- **Full control**: Adjust field extraction priorities and naming conventions to match your workflow
- **Industry optimization**: Fine-tune the AI to understand your specific type of business documents
- **Full transparency**: Every aspect of the AI extraction process is under your control and can be changed right in settings

TaxHacker is 100% adaptable and tunable to your unique requirements — whether you need to extract emails, addresses, project codes, or any other custom information from your documents.

### `6` Flexible data filtering and export

![Data Export](public/landing/export.webp)

Once your documents are processed, easily view, filter, and export your complete transaction history exactly how you need it.

- **Advanced filtering**: Filter by date ranges, categories, projects, amounts, and any custom fields
- **Flexible exports**: Export filtered transactions to CSV with all attached documents included
- **Tax-ready reports**: Generate comprehensive reports for your accountant or tax advisor
- **Data portability**: Download complete data archives to migrate to other services—your data stays yours

### `7` Self-hosted mode for data privacy

![Self-hosting](docs/screenshots/exported_archive.png)

Keep complete control over your financial data with local storage and self-hosting options. TaxHacker respects your privacy and gives you full ownership of your information.

- **Home server ready**: Host on your own infrastructure for maximum privacy and control
- **Docker native**: Simple setup with provided Docker containers and compose files
- **Data ownership**: Your financial documents never leaves your control
- **No vendor lock-in**: Export everything and migrate whenever you want
- **Transparent operations**: Full access to source code and complete operational transparency

## 🛳 Deployment and Self-hosting

TaxHacker can be easily self-hosted on your own infrastructure for complete control over your data and application environment. We provide a [Docker image](./Dockerfile) and [Docker Compose](./docker-compose.yml) setup that makes deployment simple:

```bash
curl -O https://raw.githubusercontent.com/vas3k/TaxHacker/main/docker-compose.yml

docker compose up
```

The Docker Compose setup includes:

- TaxHacker application container
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

## ❤️ Support the Project

If TaxHacker has helped you save time or manage your finances better, consider supporting its development! Your donations help us maintain the project, add new features, and keep it free and open source. Every contribution helps ensure we can keep improving and maintaining this tool for the community: <https://vas3k.com/donate/>

[![Thank the TaxHacker devs](https://img.shields.io/badge/❤️-donate%20to%20Taxhacker%20devs-f08080?labelColor=black&style=for-the-badge)](https://vas3k.com/donate/)

## 📄 License

TaxHacker is licensed under the [MIT License](LICENSE).
