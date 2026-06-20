# Prisma Database Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database configuration:
```
DATABASE_URL="postgresql://username:password@localhost:5432/naconek_db"
```

### 3. Create PostgreSQL Database
```bash
# Create the database
createdb naconek_db

# Or using psql
psql -U postgres -c "CREATE DATABASE naconek_db;"
```

### 4. Generate Prisma Client
```bash
npm run prisma:generate
```

### 5. Run Migrations
```bash
npm run db:migrate
```

This will:
- Create all database tables
- Set up relationships and constraints
- Create indexes for performance

### 6. Seed Initial Data
```bash
npm run db:seed
```

This populates the database with:
- 7 user roles (Super Administrator, Asset Manager, etc.)
- 20 permissions
- 12 regions with counties
- 5 departments
- HQ location
- 11 asset categories with subcategories
- 2 suppliers
- 4 test users
- 5 sample assets
- System configuration

## Database Tables (43+)

### Authentication & Authorization (4 tables)
- `User` - System users
- `Account` - OAuth accounts
- `Session` - User sessions
- `VerificationToken` - Email verification tokens

### Roles & Permissions (3 tables)
- `Role` - User roles
- `Permission` - System permissions
- `RolePermission` - Role-permission mappings

### Organization (4 tables)
- `Region` - NACONEK regions (12 total)
- `County` - Counties within regions
- `Department` - Organizational departments
- `Location` - Physical locations (HQ, offices, schools, etc.)

### Asset Management (6 tables)
- `AssetCategory` - Asset categories (ICT, Furniture, Vehicles, etc.)
- `AssetSubcategory` - Asset subcategories
- `Supplier` - Asset suppliers
- `Asset` - Main asset registry
- `AssetTag` - QR/Barcode tags
- `AssetImage` - Asset photos
- `AssetDocument` - Asset documents

### Audit Management (3 tables)
- `AuditCampaign` - Audit campaigns
- `AuditAssignment` - Auditor assignments
- `AuditRecord` - Individual audit records
- `AuditFinding` - Audit findings

### Verification (4 tables)
- `VerificationCampaign` - Verification campaigns
- `VerificationAssignment` - Auditor assignments
- `VerificationSession` - Verification sessions
- `VerificationFinding` - Verification findings
- `VerificationPhoto` - Session photos
- `VerificationGpsLog` - GPS logs

### Asset Operations (6 tables)
- `RetaggingRequest` - Asset retagging requests
- `AssetTransfer` - Asset transfers
- `MaintenanceRecord` - Maintenance records
- `DepreciationRecord` - Depreciation records
- `DisposalRecord` - Asset disposal records
- `MissingAssetCase` - Missing asset cases

### System (4 tables)
- `Notification` - System notifications
- `ActivityLog` - Audit trail
- `ImportJob` - Bulk import jobs
- `SystemConfig` - System configuration

## Default Test Users

After seeding, the following users are available:

### Super Administrator
- Email: `admin@naconek.org`
- Password: `NACONEK2026!`
- Role: Super Administrator

### Asset Manager
- Email: `manager@naconek.org`
- Password: `NACONEK2026!`
- Role: Asset Manager

### Asset Auditor
- Email: `auditor@naconek.org`
- Password: `NACONEK2026!`
- Role: Asset Auditor

### Executive Manager
- Email: `executive@naconek.org`
- Password: `NACONEK2026!`
- Role: Executive Management

## Common Prisma Commands

### Generate Prisma Client
```bash
npm run prisma:generate
```

### Create Migration
```bash
npm run db:migrate
```

### View Database in Prisma Studio
```bash
npx prisma studio
```

### Reset Database (⚠️ Deletes all data)
```bash
npx prisma db push --force-reset
```

### Check Database Schema
```bash
npx prisma db execute --stdin < schema.sql
```

## Database Relationships

### Key Relationships

**User → Role**
- Many-to-One: Multiple users can have the same role

**Asset → Category**
- Many-to-One: Multiple assets can be in the same category

**Asset → Subcategory**
- Many-to-One: Multiple assets can have the same subcategory

**Asset → Location**
- Many-to-One: Multiple assets can be at the same location

**AuditCampaign → AuditAssignment**
- One-to-Many: One campaign has multiple assignments

**AuditAssignment → AuditRecord**
- One-to-Many: One assignment has multiple records

**Asset → Transfers**
- One-to-Many: One asset can have multiple transfer records

**Asset → MaintenanceRecord**
- One-to-Many: One asset can have multiple maintenance records

## Performance Optimization

### Indexes
Database indexes are created for:
- User email (unique)
- Asset tag (unique)
- Category code (unique)
- Role name (unique)
- Foreign keys
- Status fields
- Timestamp fields

### Query Optimization
- Use `include` for relations in queries
- Use `select` to fetch only needed fields
- Use pagination for large datasets
- Cache frequently accessed data

## Backup & Recovery

### Backup Database
```bash
pg_dump -U username -d naconek_db > backup.sql
```

### Restore Database
```bash
psql -U username -d naconek_db < backup.sql
```

## Troubleshooting

### Connection Issues
```bash
# Test database connection
psql -U username -h localhost -d naconek_db -c "SELECT 1;"
```

### Migration Issues
```bash
# Reset migrations (development only)
npx prisma migrate reset
```

### Prisma Cache
```bash
# Clear Prisma cache
rm -rf node_modules/.prisma
npm run prisma:generate
```

## Environment Variables

Required `.env.local` variables:

```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/naconek_db"

# NextAuth
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Application
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NODE_ENV="development"
```

## Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure environment: `cp .env.example .env.local`
3. ✅ Create database: `createdb naconek_db`
4. ✅ Run migrations: `npm run db:migrate`
5. ✅ Seed data: `npm run db:seed`
6. ✅ Start development: `npm run dev`
7. 📝 Open http://localhost:3000 and login with default credentials

---

**For more information, see [Prisma Documentation](https://www.prisma.io/docs/)**
