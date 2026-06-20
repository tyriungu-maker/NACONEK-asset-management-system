# NACONEK Enterprise Asset Management & Verification System (NEAMVS)

A production-ready, enterprise-grade, fully responsive, secure, scalable asset management platform for the National Council for Nomadic Education in Kenya.

## 🎯 Project Overview

NACONEK Enterprise Asset Management System is designed to:

- **Maintain** a centralized asset register
- **Track** all NACONEK assets across Kenya
- **Conduct** nationwide asset audits and verification campaigns
- **Manage** asset retagging, transfers, maintenance, and disposal
- **Support** real-time asset visibility with GIS mapping
- **Generate** compliance reports and analytics
- **Improve** accountability and governance

## 🏗️ System Architecture

### Technology Stack

**Frontend**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 3
- ShadCN UI
- TanStack Query
- Recharts
- Leaflet

**Backend**
- Next.js API Routes & Server Actions
- Prisma ORM
- PostgreSQL
- Auth.js (NextAuth)

**File Storage**
- Cloudinary (Production)
- Local Storage (Development)

**Deployment**
- Vercel (Production)
- GitHub (Source Control)

## 📋 Features

### Core Modules
1. **Asset Register Management** - Centralized digital asset register
2. **Asset Tagging** - QR Code and Barcode generation
3. **Audit Management** - Campaign creation and execution
4. **Mobile Audit Application** - QR scan and offline capabilities
5. **Retagging Management** - Track retagging workflows
6. **Asset Transfers** - Department and regional transfers
7. **Maintenance Management** - Preventive and corrective maintenance
8. **Asset Depreciation** - Straight Line and Reducing Balance methods
9. **Asset Disposal** - Disposal request and approval workflow
10. **GIS Asset Mapping** - Interactive Kenya map visualization
11. **Executive Dashboard** - KPI cards and metrics
12. **Reporting Engine** - Multi-format reports
13. **Notification Center** - Email and in-app notifications
14. **Bulk Import & Cleansing** - Data validation and migration
15. **Campaign Management** - Nationwide verification campaigns

## 🔐 Security Features

- JWT Authentication
- Multi-Factor Authentication (MFA)
- Role-Based Access Control (RBAC)
- Password policies
- Data encryption
- Comprehensive audit trail
- Activity logging

## 👥 User Roles

1. **Super Administrator** - Full system control
2. **Asset Manager** - Asset operations
3. **Asset Auditor** - Verification and audits
4. **Procurement Officer** - Asset acquisition
5. **Finance Officer** - Valuation and depreciation
6. **Department Custodian** - Asset accountability
7. **Executive Management** - Dashboard access

## 📦 Installation

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- PostgreSQL 15+
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/tyriungu-maker/NACONEK-asset-management-system.git
cd NACONEK-asset-management-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration

4. **Set up PostgreSQL database**
```bash
# Create database
createb naconek_db

# Run migrations
npm run db:migrate

# Generate Prisma Client
npm run prisma:generate
```

5. **Start development server**
```bash
npm run dev
```

Access the application at `http://localhost:3000`

## 🚀 Development Workflow

```bash
npm run dev              # Start development server
npm test                 # Run tests
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run type-check       # TypeScript type checking
npm run db:migrate       # Database migrations
```

## 🎨 Design System

### Primary Colors
- Golden Yellow: `#C9A227`
- Dark Brown: `#5A3E1B`

### Secondary Colors
- Muted Gold: `#D6B75A`
- Olive Green: `#6B7A2F`

### Design Inspiration
- ServiceNow
- Notion
- Linear
- Microsoft Dynamics 365

## 📈 Performance Targets

- Support 100,000+ Assets
- 1,000+ Concurrent Users
- <2s page load time
- <500ms API response time
- 99.9% uptime SLA

## 🚢 Deployment

Automatically deployed on push to main branch via Vercel.

## 📚 Documentation

See [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) for implementation phases and timeline.

## 📝 License

Proprietary - National Council for Nomadic Education in Kenya

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

---

**Built with ❤️ for NACONEK**
