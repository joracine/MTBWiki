# MTB Wiki - Execution Plan
*Ultra-Low-Cost Architecture ($17/month Year 1, $35/month Year 2+)*

## 🎯 **Project Overview**
TypeScript-based wiki for mountain bikers focused on discovery and curation. Emphasizes local knowledge, regional difficulty calibration, and helping riders find the right trails when traveling.

**Key Innovation**: 3-axis difficulty system + regional calibration context

## 🏗️ **Final Architecture Decision**
- **Database**: Aurora Serverless v2 (PostgreSQL) - Perfect for relational data & complex discovery queries
- **API**: GraphQL via Lambda + API Gateway (public subnets, no VPC)
- **Frontend**: Next.js with Apollo Client → S3 + CloudFront (static hosting)
- **Documentation**: Auto-generated from source (TypeDoc + GraphQL schema + Prisma)
- **CI/CD**: GitHub Actions with integrated doc generation
- **Cost**: $17/month (Year 1), $35/month (Year 2+)

## 🔧 **Technical Architecture Details**

### **GraphQL API Strategy**
```typescript
// Single GraphQL endpoint for all operations
POST /graphql

// Complex discovery query example:
query DiscoverTrails($preferences: UserPreferences!) {
  discover(preferences: $preferences) {
    systems {
      id
      name
      routes {
        id
        name
        difficulty {
          technicalClimbing
          descentTechnical
          flowJump
          regionalCalibration
        }
        trails {
          id
          name
          characterTags
        }
      }
    }
  }
}
```

### **Auto-Documentation Strategy**
```yaml
# Documentation Pipeline:
1. Code → TypeDoc → docs/generated/code/
2. GraphQL Schema → GraphQL Docs → docs/generated/api/
3. Prisma Schema → Prisma Docs → docs/generated/database/
4. Context Files → Git → docs/context/
5. All docs → S3 → CloudFront (public access)
```

### **Context Tracking Integration**
```bash
# Git hooks automatically:
1. Update PROGRESS_LOG.md on commits
2. Generate documentation on push
3. Track architectural decisions
4. Maintain session continuity
```

### **Infrastructure as Code Strategy**
```yaml
# Everything defined as code for reproducibility:
Infrastructure: CDK TypeScript stacks
CI/CD Pipelines: GitHub Actions YAML workflows
Database Schema: Prisma schema files
Environment Config: TypeScript configuration files
Build Processes: npm scripts and Docker configurations
Documentation: Auto-generated from source code
```

**Benefits:**
- ✅ **Version controlled**: All infrastructure changes tracked in git
- ✅ **Reproducible**: Identical environments across Beta/Prod
- ✅ **Auditable**: Complete history of infrastructure changes
- ✅ **Rollback capable**: Easy to revert to previous versions
- ✅ **Team collaboration**: Infrastructure changes via pull requests

## 📋 **Implementation Phases**

### **Phase 1: Local Development Setup** ⏱️ *Week 1*
**Goal**: Working local development environment

#### **1.1 Repository Structure**
```
MTBWiki/
├── packages/
│   ├── api/                 # GraphQL Lambda functions
│   ├── database/            # Prisma schema & migrations  
│   ├── admin-web/           # Next.js admin interface (GraphQL client)
│   └── shared/              # TypeScript types (generated from GraphQL)
├── infrastructure/          # CDK Infrastructure as Code
│   ├── bin/                # CDK app entry points
│   ├── lib/                # CDK stack definitions
│   │   ├── core-stack.ts   # Aurora + VPC + Security Groups
│   │   ├── api-stack.ts    # Lambda + API Gateway
│   │   ├── frontend-stack.ts # S3 + CloudFront + Route53
│   │   └── docs-stack.ts   # Documentation hosting
│   ├── config/             # Environment configurations
│   │   ├── beta.ts         # Beta environment config
│   │   └── prod.ts         # Production environment config
│   └── cdk.json            # CDK configuration
├── .github/
│   ├── workflows/          # GitHub Actions (Infrastructure as Code)
│   │   ├── api-deploy.yml  # API deployment pipeline
│   │   ├── admin-web-deploy.yml # Frontend deployment pipeline
│   │   ├── docs-deploy.yml # Documentation pipeline
│   │   ├── infrastructure-deploy.yml # CDK deployments
│   │   ├── database-migrate.yml # Database migrations
│   │   └── qa.yml          # Quality assurance pipeline
│   └── hooks/              # Git hooks for context tracking
├── tests/                   # Integration tests
├── docs/                    # Architecture & context docs
│   ├── generated/           # Auto-generated documentation
│   │   ├── api/            # GraphQL schema docs
│   │   ├── code/           # TypeDoc generated docs
│   │   └── database/       # Prisma schema docs
│   ├── architecture/        # Manual architecture docs
│   └── context/            # Session context and decisions
├── EXECUTION_PLAN.md        # This file (tracked in git)
├── PROGRESS_LOG.md          # Daily progress tracking (tracked in git)
├── docker-compose.yml       # Local development
└── package.json             # Workspace configuration
```

#### **1.2 Core Setup Tasks**
- [ ] Create monorepo structure with workspaces
- [ ] Setup Docker Compose (PostgreSQL + Redis)
- [ ] Initialize Prisma with normalized schema and enumerations
- [ ] Create shared TypeScript types package
- [ ] **Define initial GraphQL schema and data model**
- [ ] **Testing**: Set up Jest for unit tests in all packages
- [ ] **Testing**: Add initial integration test for local stack (API + DB)
- [ ] **Testing**: Add code coverage reporting (target: 70%+ for all packages)
- [ ] **Dev Experience**: Add a single command for local dev setup (`npm run dev:all`)
- [ ] **Dev Experience**: Document how to run and test each service locally in README
- [ ] **Monitoring**: Integrate basic logging (e.g., Winston/Pino) in API and admin-web
- [ ] **Monitoring**: Set up local error tracking (e.g., Sentry SDK for local errors)

**Deliverable**: `npm run dev` starts full local stack with GraphQL playground and tests passing

### **Phase 2: Parallel API & Admin Interface Development** ⏱️ *Weeks 2-3*
**Goal**: Develop GraphQL API and Admin Interface in parallel, with iterative feedback

#### **2.1 GraphQL API Development**
- [ ] Implement normalized Prisma schema with enumeration tables
- [ ] Create database migrations for all tables and foreign keys
- [ ] Seed enumeration tables (countries, regions, difficulty ratings, character tags, etc.)
- [ ] Add sample data for 3-5 trail systems using normalized model
- [ ] Implement regional difficulty calibration with proper foreign keys
- [ ] Implement GraphQL API (Apollo Server) for all core entities
- [ ] Expose CRUD and discovery queries/mutations
- [ ] Auto-generate GraphQL schema documentation
- [ ] **Testing**: Add contract tests for GraphQL schema (using GraphQL Codegen or similar)
- [ ] **Testing**: Add integration tests for API endpoints (target: 80%+ coverage)
- [ ] **Testing**: Add e2e tests for discovery queries

#### **2.2 Admin Interface Development**
- [ ] Scaffold Next.js admin interface with Apollo Client
- [ ] Implement environment switcher (Beta/Prod)
- [ ] Build CRUD interfaces for all data models (using GraphQL API)
- [ ] Implement navigation with hyperlinks between records
- [ ] Add data validation and error handling
- [ ] Add i18n support from the start (Next.js i18n routing)
- [ ] Add language field to all user-facing content tables
- [ ] **Testing**: Add unit tests for all components (target: 70%+ coverage)
- [ ] **Testing**: Add integration tests for GraphQL queries/mutations
- [ ] **Testing**: Add e2e tests for main user flows (CRUD, navigation)

#### **2.3 Iterative Feedback Loop**
- [ ] Weekly review checkpoint: Sync API and admin UI progress
- [ ] Review test coverage and contract test results
- [ ] Adjust GraphQL schema and admin UI based on feedback
- [ ] Ensure type safety and codegen are up-to-date
- [ ] **Review Checklist**: 
  - API schema consistency
  - Admin UI functionality
  - Data integrity (sample data)
  - Unit test pass/coverage
  - Integration test pass/coverage

#### **2.4 Data Migration & Versioning**
- [ ] **Data Versioning**: Implement a versioning mechanism for enumeration seed data
- [ ] **Migration Scripts**: Create and maintain migration scripts for schema changes and enum updates
- [ ] **Versioning Policy**: Document data schema versioning policy (how to bump, how to migrate)
- [ ] **Impact Analysis**: Define process for analyzing impact of schema changes on existing data

**Deliverable**: Working API and admin interface, both consuming the same schema and data model, with feedback-driven improvements and passing tests

### **Phase 3: AWS Infrastructure** ⏱️ *Week 4*
**Goal**: Production-ready AWS infrastructure

#### **3.1 Aurora Serverless v2 Setup**
- [ ] Aurora Serverless v2 cluster (PostgreSQL)
- [ ] Configure auto-pause (5 minutes)
- [ ] Setup Data API for Lambda access
- [ ] Database migrations in AWS
- [ ] **Testing**: Add integration tests for DB migrations and seed data
- [ ] Configure AWS Secrets Manager for database credentials
- [ ] Define Secret resource for Aurora credentials
- [ ] Grant Lambda read access to secrets

#### **3.2 Lambda Functions**
- [ ] Convert GraphQL API to Lambda function
- [ ] Setup API Gateway with Lambda integration (GraphQL endpoint)
- [ ] Configure CORS for admin interface
- [ ] Environment variable management
- [ ] Auto-deploy documentation to S3 on build
- [ ] **Testing**: Add integration tests for Lambda + Aurora Data API
- [ ] Implement secure retrieval of secrets in Lambda (e.g., via environment variables from Secrets Manager)
- [ ] **Monitoring**: Configure CloudWatch Logs for Lambda functions
- [ ] **Monitoring**: Integrate Sentry DSN for error tracking in Lambda

#### **3.3 CDK Infrastructure (Infrastructure as Code)**
- [ ] **Core Infrastructure Stack** (`/infrastructure/lib/core-stack.ts`)
  - Aurora Serverless v2 cluster with auto-pause
  - VPC with public subnets only (no NAT Gateway)
  - Security groups for Lambda and Aurora
  - [ ] Configure AWS Secrets Manager for database credentials
  - [ ] Define Secret resource for Aurora credentials
  - [ ] Grant Lambda read access to secrets
- [ ] **API Stack** (`/infrastructure/lib/api-stack.ts`)
  - Lambda function for GraphQL endpoint
  - API Gateway with single /graphql route
  - IAM roles and policies
  - [ ] Implement secure retrieval of secrets in Lambda (e.g., via environment variables from Secrets Manager)
- [ ] **Frontend Stack** (`/infrastructure/lib/frontend-stack.ts`)
  - S3 bucket for admin interface
  - CloudFront distribution with custom domain
  - Route 53 hosted zone and records
- [ ] **Documentation Stack** (`/infrastructure/lib/docs-stack.ts`)
  - S3 bucket for documentation hosting
  - CloudFront distribution for docs.mtbwiki.com
  - Automated invalidation on updates
- [ ] **Environment Configuration** (`/infrastructure/config/`)
  - Beta environment configuration
  - Production environment configuration
  - Shared resource definitions
- [ ] **Monitoring Stack**: Define CloudWatch dashboards and alarms (basic metrics)
- [ ] **Database Stack**: Configure automated daily snapshots for Aurora (retention: 7 days)

**Deliverable**: Working API in AWS with Aurora backend and secure secret management

### **Phase 4: CI/CD Pipeline** ⏱️ *Week 5*
**Goal**: Automated deployments

#### **4.1 GitHub Actions Workflows (Infrastructure as Code)**
- [ ] **Infrastructure Deployment Pipeline** (`/.github/workflows/infrastructure-deploy.yml`)
  - CDK stack deployments
  - Environment provisioning and updates
  - Resource drift detection
  - Ensure Secrets Manager setup is part of this deployment
- [ ] **API Deployment Pipeline** (`/.github/workflows/api-deploy.yml`)
  - GraphQL Lambda deployment with CDK
  - Aurora Serverless v2 migrations (Prisma)
  - Environment-specific deployments (Beta/Prod)
  - Inject secrets securely into Lambda environment variables
- [ ] **Database Migration Pipeline** (`/.github/workflows/database-migrate.yml`)
  - Prisma migration validation
  - Enumeration data seeding
  - Database schema validation
  - Use Secrets Manager for DATABASE_URL for migrations/seeding
- [ ] **Admin Web Pipeline** (`/.github/workflows/admin-web-deploy.yml`)
  - Next.js build and optimization
  - S3 deployment with CloudFront invalidation
  - Environment-specific configurations
  - Ensure client-side API endpoints are correctly configured via build-time env vars (no secrets exposed)
- [ ] **Documentation Pipeline** (`/.github/workflows/docs-deploy.yml`)
  - TypeDoc generation from TypeScript code
  - GraphQL schema documentation generation
  - Prisma schema documentation generation
  - S3 deployment to docs.mtbwiki.com
- [ ] **Quality Assurance Pipeline** (`/.github/workflows/qa.yml`)
  - TypeScript compilation checks
  - ESLint and Prettier validation
  - GraphQL schema validation
  - Integration tests
- [ ] **Testing**: All pipelines run tests and enforce coverage thresholds (fail if below 70% for unit, 80% for integration)
- [ ] **Testing**: Contract tests for GraphQL API run on every PR
- [ ] **Monitoring**: Ensure Sentry DSN is securely injected into environments
- [ ] **Monitoring**: Configure CloudWatch alarms for deployment failures
- [ ] **Database Migration Pipeline**: Ensure automatic application of schema and data migrations
- [ ] **Database Migration Pipeline**: Implement rollback strategy for failed migrations

#### **4.2 Environment Strategy**
```
Beta Environment:
- Single Aurora cluster (shared)
- Separate Lambda functions
- Separate S3/CloudFront

Production Environment:  
- Dedicated Aurora cluster
- Separate Lambda functions
- Separate S3/CloudFront
```

**Deliverable**: Push-to-deploy pipeline

### **Phase 5: Admin Interface** ⏱️ *Week 6-7*
**Goal**: Full-featured content management

#### **5.1 Core Admin Features**
- [ ] Environment switcher (Beta/Prod)
- [ ] GraphQL client integration (Apollo Client)
- [ ] Systems management with hyperlinked navigation
- [ ] Routes management with trail connections
- [ ] Trails management with character tags
- [ ] Discovery algorithm testing interface (GraphQL playground integration)
- [ ] Auto-generated API documentation viewer
- [ ] **Testing**: Add e2e tests for admin workflows (CRUD, navigation, i18n)

#### **5.2 Advanced Features**
- [ ] Bulk import/export
- [ ] Regional difficulty calibration tools
- [ ] Content quality scoring
- [ ] User management (future)

**Deliverable**: Complete admin interface

### **Phase 6: Production Readiness** ⏱️ *Week 8*
**Goal**: Launch-ready system

#### **6.1 Monitoring & Observability**
- [ ] **Monitoring**: Implement comprehensive CloudWatch dashboards for all services
- [ ] **Monitoring**: Set up critical alarms (e.g., high error rates, low database connections)
- [ ] **Monitoring**: Integrate Sentry for full error visibility across environments
- [ ] **Logging**: Centralized log management strategy (CloudWatch Logs insights)

#### **6.2 Security & Performance**
- [ ] API rate limiting
- [ ] Input validation and sanitization
- [ ] Database query optimization
- [ ] CloudFront caching strategy

#### **6.3 Documentation & Context Tracking**
- [ ] **API Documentation**: Auto-generated GraphQL API documentation
- [ ] **Code Documentation**: Auto-generated TypeScript code documentation (TypeDoc)
- [ ] **Database Schema Documentation**: Auto-generated database schema documentation (Prisma docs)
- [ ] **Admin User Guide**: Comprehensive guide for using the admin interface
- [ ] **Deployment Runbook**: Operational guide for deployments and troubleshooting
- [ ] **Cost Optimization Guide**: Documentation on maintaining cost efficiency
- [ ] **Context Tracking Automation**: Git hooks for progress updates
- [ ] **Schema Versioning Docs**: Generate and deploy documentation for schema versioning policies
- [ ] **Contributor Getting Started Guide**: Comprehensive guide for new developers and content editors
- [ ] **Content Contribution Guide**: Document how to add/edit systems, routes, trails, and enumerations

#### **6.4 Final Review Checkpoint**
- [ ] **Overall Project Review**:
  - All tests (unit, integration, e2e, contract) passing
  - Documentation completeness and accuracy (auto-generated docs)
  - Infrastructure as Code consistency across environments
  - Security audit results reviewed
  - Performance benchmarks met
  - Cost projections re-validated
  - User/contributor guides reviewed for clarity
  - Data integrity checks on production data (read-only for Gamma)

**Deliverable**: Production-ready MTB Wiki

## 📊 **Cost Breakdown (Ultra-Optimized)**

### **Year 1 (with AWS Free Tier)**
```
Aurora Serverless v2:     $5-15/month (auto-pause)
Lambda:                   $0/month (free tier)
API Gateway:              $0/month (free tier)
S3:                       $1/month
CloudFront:               $1/month
Route 53:                 $0.50/month
GitHub Actions:           $0/month (free tier)
Total:                    $7.50-17.50/month
```

### **Year 2+ (post free tier)**
```
Aurora Serverless v2:     $15-25/month
Lambda:                   $2/month
API Gateway:              $3/month
S3:                       $1/month
CloudFront:               $1/month
Route 53:                 $0.50/month
Total:                    $22.50-32.50/month
```

## 🎯 **Success Criteria**

### **Technical**
- [ ] Sub-200ms API response times
- [ ] 99.9% uptime
- [ ] Auto-scaling to handle traffic spikes
- [ ] Secure admin interface
- [ ] Mobile-responsive design

### **Functional**
- [ ] Discovery algorithm finds relevant trails
- [ ] Regional difficulty calibration works
- [ ] Admin interface enables easy content management
- [ ] Seasonal recommendations are accurate

### **Business**
- [ ] Hosting costs under $35/month
- [ ] Easy to maintain and extend
- [ ] Ready for content creators to use
- [ ] Scalable architecture for growth

## 🔄 **Progress Tracking**

### **Current Status**: ✅ Planning Complete
- [x] Architecture decisions finalized
- [x] Cost optimization complete  
- [x] Technology stack selected
- [x] Implementation plan created

### **Next Steps**
1. Initialize repository structure
2. Setup local development environment
3. Begin Phase 1 implementation

## 📝 **Decision Log**

### **Database: Aurora Serverless v2 vs DynamoDB**
**Decision**: Aurora Serverless v2
**Rationale**: 
- Perfect fit for relational data structure
- Complex discovery queries work naturally with SQL
- Faster development using existing TypeScript models
- Auto-pause feature saves costs during development
- Minimal cost difference vs DynamoDB

### **Architecture: Ultra-Low-Cost vs Standard**
**Decision**: Ultra-Low-Cost ($17/month vs $123/month)
**Changes**:
- Lambda in public subnets (no NAT Gateway: -$45/month)
- S3 + CloudFront instead of Vercel (-$17/month)
- Aurora Serverless v2 with auto-pause (-$40/month)

### **Environments: 2 vs 4**
**Decision**: 2 environments (Beta/Prod)
**Rationale**: 4 environments were over-engineered for MVP

## 🚀 **Ready to Begin**
All architectural decisions are complete. Ready to start Phase 1 implementation when you give the go-ahead! 

## **Testing Coverage Goals**
- **Unit tests**: 70%+ coverage for all packages
- **Integration tests**: 80%+ coverage for API and DB
- **Contract tests**: 100% of GraphQL schema types and queries
- **E2E tests**: All main user flows (CRUD, discovery, navigation)
- **Fail CI if coverage drops below thresholds**

## **CI/CD Note**
- All tests (unit, integration, e2e, contract) must run automatically on push and deploy via GitHub Actions. 