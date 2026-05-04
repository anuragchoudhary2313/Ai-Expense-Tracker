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
