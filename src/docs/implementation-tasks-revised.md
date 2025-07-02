# MTB Wiki - Revised Implementation Plan

## 📋 Overview

Simplified AWS infrastructure using modern, cost-effective technologies:
- **Single AWS Account**: Beta (staging) + Prod environments
- **Tech Stack**: Lambda + API Gateway + RDS PostgreSQL + GitHub Actions
- **Focus**: MVP validation first, then scale

## 🛠️ Technology Changes

### API Layer: AppSync → Lambda + API Gateway
**Benefits**:
- Better TypeScript support with full business logic control
- Easier debugging and testing
- Standard REST/GraphQL patterns
- No VTL complexity

### Database: Aurora → RDS PostgreSQL
**Benefits**:
- 60-70% cost reduction
- Simpler setup and management
- Easy upgrade path to Aurora later
- Same PostgreSQL features

### CI/CD: CodePipeline → GitHub Actions
**Benefits**:
- Faster setup and iteration
- Better integration with GitHub
- Free for public repos, cheap for private
- Extensive marketplace of actions

### Environments: 4 → 2
**Simplified Flow**:
```
Code → GitHub Actions → Beta → Prod
```

## 🎯 Revised Task Breakdown

### Phase 1: Local Development Setup
- [ ] **1.1** Create repository structure
- [ ] **1.2** Setup Docker Compose (PostgreSQL + Redis)
- [ ] **1.3** Create Express API with TypeScript
- [ ] **1.4** Setup Prisma ORM
- [ ] **1.5** Create basic CRUD operations
- [ ] **1.6** Setup Jest testing framework

### Phase 2: Core Features & Validation
- [ ] **2.1** Commit current models to git
- [ ] **2.2** Implement database schema with Prisma
- [ ] **2.3** Create seed data (systems, routes, trails)
- [ ] **2.4** Build discovery algorithm
- [ ] **2.5** Create GraphQL API with Apollo Server
- [ ] **2.6** Test core user flows locally

### Phase 3: AWS Infrastructure (CDK)
- [ ] **3.1** Create VPC stack (single account)
- [ ] **3.2** Setup RDS PostgreSQL (Beta)
- [ ] **3.3** Setup RDS PostgreSQL (Prod)
- [ ] **3.4** Create Lambda functions for API
- [ ] **3.5** Setup API Gateway
- [ ] **3.6** Configure secrets management

### Phase 4: CI/CD with GitHub Actions
- [ ] **4.1** Create GitHub Actions workflows
- [ ] **4.2** Setup automated testing pipeline
- [ ] **4.3** Configure deployment to Beta
- [ ] **4.4** Setup production deployment with approval
- [ ] **4.5** Add database migration automation
- [ ] **4.6** Configure monitoring and alerts

### Phase 5: Admin Web Interface
- [ ] **5.1** Create Next.js admin application
- [ ] **5.2** Setup environment switching (Beta/Prod)
- [ ] **5.3** Build CRUD interfaces for all data models
- [ ] **5.4** Implement navigation with hyperlinks between records
- [ ] **5.5** Add data validation and error handling
- [ ] **5.6** Create bulk import/export functionality
- [ ] **5.7** Deploy admin app to Vercel/Netlify

### Phase 6: Production Readiness
- [ ] **6.1** Security hardening
- [ ] **6.2** Performance optimization
- [ ] **6.3** Backup strategies
- [ ] **6.4** Monitoring dashboards
- [ ] **6.5** Error tracking (Sentry)
- [ ] **6.6** Documentation and runbooks

## 📁 Updated Repository Structure

```
MTBWiki/
├── packages/
│   ├── api/                         # Lambda API functions
│   │   ├── src/
│   │   │   ├── handlers/            # Lambda handlers
│   │   │   ├── services/            # Business logic
│   │   │   ├── graphql/             # GraphQL schema & resolvers
│   │   │   └── utils/               # Utilities
│   │   ├── tests/                   # API tests
│   │   └── package.json
│   │
│   ├── database/                    # Database layer
│   │   ├── prisma/                  # Prisma schema & migrations
│   │   ├── seeds/                   # Data seeding
│   │   ├── src/                     # Database client
│   │   └── tests/                   # Database tests
│   │
│   ├── admin-web/                   # Admin web interface
│   │   ├── src/
│   │   │   ├── components/          # React components
│   │   │   ├── pages/               # Next.js pages
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── services/            # API client services
│   │   │   └── utils/               # Frontend utilities
│   │   ├── public/                  # Static assets
│   │   ├── styles/                  # CSS/styling
│   │   └── package.json
│   │
│   └── shared/                      # Shared TypeScript types
│       ├── types/                   # Core data models
│       └── utils/                   # Shared utilities
│
├── infrastructure/                  # CDK stacks
│   ├── lib/
│   │   ├── vpc-stack.ts            # VPC configuration
│   │   ├── database-stack.ts       # RDS PostgreSQL
│   │   ├── api-stack.ts            # Lambda + API Gateway
│   │   └── monitoring-stack.ts     # CloudWatch + alerts
│   │
│   ├── bin/                        # CDK apps
│   │   ├── beta-app.ts             # Beta environment
│   │   └── prod-app.ts             # Production environment
│   │
│   └── config/                     # Environment configs
│
├── .github/
│   └── workflows/                  # GitHub Actions
│       ├── test.yml                # Run tests on PR
│       ├── deploy-beta.yml         # Deploy to beta
│       └── deploy-prod.yml         # Deploy to production
│
├── scripts/                        # Utility scripts
│   ├── local-setup.sh             # Local development setup
│   ├── deploy.sh                  # Deployment helper
│   └── migrate.sh                 # Database migrations
│
├── docker-compose.yml             # Local development
├── README.md
└── package.json                   # Root package.json
```

## 🏗️ Infrastructure Architecture

### Single Account, Two Environments

```typescript
// Beta Environment (Staging)
VPC: mtb-wiki-vpc
RDS: mtb-wiki-beta-db (db.t3.micro)
Lambda: mtb-wiki-beta-api
API Gateway: mtb-wiki-beta-gateway
Domain: api-beta.mtbwiki.com

// Production Environment
VPC: mtb-wiki-vpc (shared)
RDS: mtb-wiki-prod-db (db.t3.small)
Lambda: mtb-wiki-prod-api  
API Gateway: mtb-wiki-prod-gateway
Domain: api.mtbwiki.com
```

### Networking
```typescript
// Single VPC with public/private subnets
VPC: 10.0.0.0/16
Public Subnets: 10.0.1.0/24, 10.0.2.0/24 (ALB)
Private Subnets: 10.0.11.0/24, 10.0.12.0/24 (RDS)
Lambda Subnets: 10.0.21.0/24, 10.0.22.0/24 (Lambda)
```

## 💰 Revised Cost Analysis

### Monthly AWS Costs (Single Account)

```typescript
// Beta Environment
RDS PostgreSQL (db.t3.micro): ~$15/month
Lambda (low usage): ~$5/month
API Gateway: ~$3/month
VPC (shared): $0
CloudWatch: ~$5/month
Beta Subtotal: ~$28/month

// Production Environment  
RDS PostgreSQL (db.t3.small): ~$30/month
Lambda (moderate usage): ~$15/month
API Gateway: ~$10/month
VPC (shared): $0
CloudWatch: ~$10/month
Production Subtotal: ~$65/month

// Shared Resources
VPC NAT Gateway: ~$45/month (single NAT)
Route53: ~$1/month
Secrets Manager: ~$2/month
Shared Subtotal: ~$48/month

Total Monthly Cost: ~$141/month
```

### Cost Comparison
```typescript
// Original Plan: ~$570-1020/month
// Revised Plan: ~$141/month
// Savings: ~$429-879/month (75-85% reduction)
```

### Additional Costs
```typescript
// External Services
GitHub Actions: Free for public repos
Sentry (error tracking): Free tier available
Domain registration: ~$12/year
SSL certificates: Free (AWS Certificate Manager)

// Development Tools
Prisma: Free for development
Apollo Server: Free
TypeScript: Free
```

## 🖥️ Admin Web Interface

### Features & Functionality

#### Environment Switching
```typescript
// Environment selector component
const EnvironmentSwitcher = () => {
  const [environment, setEnvironment] = useState<'beta' | 'prod'>('beta');
  
  const apiEndpoints = {
    beta: 'https://api-beta.mtbwiki.com/graphql',
    prod: 'https://api.mtbwiki.com/graphql'
  };
  
  return (
    <select onChange={(e) => setEnvironment(e.target.value)}>
      <option value="beta">Beta Environment</option>
      <option value="prod">Production Environment</option>
    </select>
  );
};
```

#### Data Management Pages
```typescript
// Main navigation structure
/admin/
├── /systems/                    # System management
│   ├── /                       # List all systems
│   ├── /new                    # Create new system
│   ├── /[id]                   # View/edit system
│   └── /[id]/routes            # Routes for this system
│
├── /routes/                     # Route management
│   ├── /                       # List all routes
│   ├── /new                    # Create new route
│   ├── /[id]                   # View/edit route
│   └── /[id]/trails            # Trails in this route
│
├── /trails/                     # Trail management
│   ├── /                       # List all trails
│   ├── /new                    # Create new trail
│   └── /[id]                   # View/edit trail
│
├── /guides/                     # Guide management
│   ├── /                       # List all guides
│   ├── /new                    # Create new guide
│   └── /[id]                   # View/edit guide
│
└── /discovery/                  # Test discovery algorithm
    ├── /                       # Discovery interface
    └── /results                # View discovery results
```

#### Hyperlinked Navigation
```typescript
// Example: System detail page with related links
const SystemDetailPage = ({ system }) => {
  return (
    <div>
      <h1>{system.name}</h1>
      <p>{system.description}</p>
      
      {/* Related Routes */}
      <section>
        <h3>Routes in this System</h3>
        {system.routes.map(route => (
          <Link key={route.id} href={`/admin/routes/${route.id}`}>
            <div className="route-card">
              <h4>{route.name}</h4>
              <p>{route.tagline}</p>
              <span>Difficulty: {route.difficulty.overall_rating}</span>
            </div>
          </Link>
        ))}
        <Link href={`/admin/routes/new?system_id=${system.id}`}>
          + Add New Route
        </Link>
      </section>
      
      {/* Related Trails */}
      <section>
        <h3>Trails in this System</h3>
        {system.trails.map(trail => (
          <Link key={trail.id} href={`/admin/trails/${trail.id}`}>
            <span className="trail-link">{trail.name}</span>
          </Link>
        ))}
      </section>
      
      {/* External Links */}
      <section>
        <h3>External References</h3>
        {system.external_links.trailforks && (
          <a href={system.external_links.trailforks} target="_blank">
            View on Trailforks ↗
          </a>
        )}
      </section>
    </div>
  );
};
```

#### Bulk Operations
```typescript
// Bulk import/export functionality
const BulkOperations = () => {
  return (
    <div className="bulk-operations">
      <h3>Bulk Operations</h3>
      
      {/* Import */}
      <div>
        <h4>Import Data</h4>
        <input type="file" accept=".json,.csv" />
        <button>Import Systems</button>
        <button>Import Routes</button>
        <button>Import Trails</button>
      </div>
      
      {/* Export */}
      <div>
        <h4>Export Data</h4>
        <button>Export All Systems</button>
        <button>Export All Routes</button>
        <button>Export All Trails</button>
      </div>
      
      {/* Seed Data */}
      <div>
        <h4>Development Tools</h4>
        <button>Generate Sample Data</button>
        <button>Reset Database</button>
        <button>Run Migrations</button>
      </div>
    </div>
  );
};
```

### Technology Stack
```json
{
  "next": "^14.x",
  "react": "^18.x",
  "typescript": "^5.x",
  "@apollo/client": "^3.x",
  "graphql": "^16.x",
  "tailwindcss": "^3.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@tanstack/react-table": "^8.x"
}
```

### Deployment
```typescript
// Deploy to Vercel with environment variables
// vercel.json
{
  "env": {
    "NEXT_PUBLIC_BETA_API_URL": "https://api-beta.mtbwiki.com/graphql",
    "NEXT_PUBLIC_PROD_API_URL": "https://api.mtbwiki.com/graphql"
  },
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

## 🚀 Deployment Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy MTB Wiki

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint

  deploy-beta:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Beta
        run: npm run deploy:beta

  deploy-prod:
    needs: deploy-beta
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to Production
        run: npm run deploy:prod
```

### Stage Gates
```typescript
// Beta Deployment (Automatic)
- All tests pass
- Code quality checks pass
- Deploy to beta environment
- Run integration tests
- Notify team of beta deployment

// Production Deployment (Manual Approval)
- Beta tests pass
- Manual approval required
- Deploy to production
- Run smoke tests
- Monitor for issues
```

## 📦 Technology Stack

### Backend
```json
{
  "@aws-cdk/core": "^2.x",
  "@aws-cdk/aws-lambda": "^2.x", 
  "@aws-cdk/aws-apigateway": "^2.x",
  "@aws-cdk/aws-rds": "^2.x",
  "prisma": "^5.x",
  "@prisma/client": "^5.x",
  "apollo-server-lambda": "^3.x",
  "graphql": "^16.x"
}
```

### Testing & DevOps
```json
{
  "jest": "^29.x",
  "@types/jest": "^29.x",
  "supertest": "^6.x",
  "testcontainers": "^10.x",
  "@aws-sdk/client-rds": "^3.x"
}
```

## 🎯 Success Metrics

### Phase 1-2 Complete When:
- [ ] Local development environment works
- [ ] Core CRUD operations functional
- [ ] Discovery algorithm returns relevant results
- [ ] GraphQL API working locally

### Phase 3-4 Complete When:
- [ ] Beta environment deployed and accessible
- [ ] GitHub Actions pipeline working
- [ ] Database migrations automated
- [ ] API endpoints returning expected data

### Phase 5 Complete When:
- [ ] Admin web interface deployed
- [ ] Can switch between Beta/Prod environments
- [ ] All data models have CRUD interfaces
- [ ] Navigation between related records works
- [ ] Data validation and error handling functional

### Phase 6 Complete When:
- [ ] Production environment stable
- [ ] Monitoring and alerts configured
- [ ] Performance meets requirements
- [ ] Documentation complete

## 🚀 Next Steps

1. **Start with Phase 1**: Local development setup
2. **Validate core features** before cloud deployment
3. **Deploy to Beta** for initial testing
4. **Iterate based on feedback**
5. **Production deployment** when stable

This revised plan is **75-85% cheaper**, **significantly simpler**, and provides a **faster path to validation** while maintaining scalability for future growth. 