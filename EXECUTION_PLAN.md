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
1. [Monorepo] Create monorepo structure with workspaces
2. [Local Env] Setup Docker Compose (PostgreSQL + Redis)
3. [DB Schema] Initialize Prisma with normalized schema and enumerations
4. [Shared] Create shared TypeScript types package
5. [API] **Define initial GraphQL schema and data model**
6. [Testing] Set up Jest for unit tests in all packages
7. [Testing] Add initial integration test for local stack (API + DB)
8. [Testing] Add code coverage reporting (target: 70%+ for all packages)
9. [Dev Experience] Add a single command for local dev setup (`npm run dev:all`)
10. [Dev Experience] Document how to run and test each service locally in README
11. [Monitoring] Integrate basic logging (e.g., Winston/Pino) in API and admin-web
12. [Monitoring] Set up local error tracking (e.g., Sentry SDK for local errors)

**Deliverable**: `npm run dev` starts full local stack with GraphQL playground and tests passing

### **Phase 2: Parallel API & Admin Interface Development** ⏱️ *Weeks 2-3*
**Goal**: Develop GraphQL API and Admin Interface in parallel, with iterative feedback

#### **2.1 GraphQL API Development**
1. [DB Schema] Implement normalized Prisma schema with enumeration tables
2. [DB Migrations] Create database migrations for all tables and foreign keys
3. [Data Seed] Seed enumeration tables (countries, regions, difficulty ratings, character tags, etc.)
4. [Data Seed] Add sample data for 3-5 trail systems using normalized model
5. [API Logic] Implement regional difficulty calibration with proper foreign keys
6. [API Logic] Implement GraphQL API (Apollo Server) for all core entities
7. [API] Expose CRUD and discovery queries/mutations
8. [Docs] Auto-generate GraphQL schema documentation
9. [Testing] Add contract tests for GraphQL schema (using GraphQL Codegen or similar)
10. [Testing] Add integration tests for API endpoints (target: 80%+ coverage)
11. [Testing] Add e2e tests for discovery queries
12. [i18n] Add `language_code` field (e.g., `en-US`, `fr-CA`) to all user-facing content tables (System, Route, Trail, Guide)
13. [i18n] Ensure GraphQL queries can filter content by `language_code`

#### **2.2 Admin Interface Development**
1. [Frontend] Scaffold Next.js admin interface with Apollo Client
2. [Frontend] Implement environment switcher (Beta/Prod)
3. [Frontend] Build CRUD interfaces for all data models (using GraphQL API)
4. [Frontend] Implement navigation with hyperlinks between records
5. [Frontend] Add data validation and error handling
6. [i18n] Add i18n support from the start (Next.js i18n routing)
7. [i18n] Add language field to all user-facing content tables
8. [Testing] Add unit tests for all components (target: 70%+ coverage)
9. [Testing] Add integration tests for GraphQL queries/mutations
10. [Testing] Add e2e tests for main user flows (CRUD, navigation)
11. [i18n] Implement Next.js i18n routing and configuration
12. [i18n] Add language switcher to admin UI
13. [i18n] Ensure CRUD operations handle `language_code` for content entries

#### **2.3 Iterative Feedback Loop**
- [ ] [Workflow] Weekly review checkpoint: Sync API and admin UI progress
- [ ] [Workflow] Review test coverage and contract test results
- [ ] [Workflow] Adjust GraphQL schema and admin UI based on feedback
- [ ] [Workflow] Ensure type safety and codegen are up-to-date
- [ ] [Review] **Review Checklist**:
  - API schema consistency
  - Admin UI functionality
  - Data integrity (sample data)
  - Unit test pass/coverage
  - Integration test pass/coverage

#### **2.4 Data Migration & Versioning**
1. [Data Versioning] Implement a versioning mechanism for enumeration seed data
2. [DB Migrations] Create and maintain migration scripts for schema changes and enum updates
3. [Data Versioning] Document data schema versioning policy (how to bump, how to migrate)
4. [Data Versioning] Define process for analyzing impact of schema changes on existing data
5. [Data Versioning] Add `schema_version` field to major content tables (System, Route, Trail, Guide)
6. [Data Versioning] Document schema versioning policy (how to bump versions, backward compatibility, etc.)

#### **2.5 Data Purity & External Sourcing**
1. [Data Model] **Remove Transient Data**: Ensure `Update` and other transient data models are fully removed from the codebase.
2. [Data Model] **Durable Data Focus**: Verify that all remaining data models (System, Route, Trail, Guide) store only long-lived, durable content.
3. [External Data] **Trail Status Sourcing**: Implement linking mechanisms to external sources (e.g., Trailforks) for real-time trail status and transient information.
4. [Data Model] **Avoid Local Storage of Transient Data**: Confirm no local storage or caching of real-time weather/trail status data.

**Deliverable**: Working API and admin interface, both consuming the same schema and data model, with feedback-driven improvements and passing tests

### **Phase 3: AWS Infrastructure** ⏱️ *Week 4*
**Goal**: Production-ready AWS infrastructure

#### **3.1 Aurora Serverless v2 Setup**
1. [DB Infra] Aurora Serverless v2 cluster (PostgreSQL)
2. [DB Config] Configure auto-pause (5 minutes)
3. [DB Access] Setup Data API for Lambda access
4. [DB Migrations] Database migrations in AWS
5. [Testing] Add integration tests for DB migrations and seed data
6. [Secrets] Configure AWS Secrets Manager for database credentials
7. [Secrets] Define Secret resource for Aurora credentials
8. [Secrets] Grant Lambda read access to secrets

#### **3.2 Lambda Functions**
1. [API Infra] Convert GraphQL API to Lambda function
2. [API Infra] Setup API Gateway with Lambda integration (GraphQL endpoint)
3. [API Config] Configure CORS for admin interface
4. [API Config] Environment variable management
5. [Docs] Auto-deploy documentation to S3 on build
6. [Testing] Add integration tests for Lambda + Aurora Data API
7. [Secrets] Implement secure retrieval of secrets in Lambda (e.g., via environment variables from Secrets Manager)
8. [Monitoring] Configure CloudWatch Logs for Lambda functions
9. [Monitoring] Integrate Sentry DSN for error tracking in Lambda

#### **3.3 CDK Infrastructure (Infrastructure as Code)**
1. [Infra] **Core Infrastructure Stack** (`/infrastructure/lib/core-stack.ts`)
  - Aurora Serverless v2 cluster with auto-pause
  - VPC with public subnets only (no NAT Gateway)
  - Security groups for Lambda and Aurora
  - [ ] [Secrets] Configure AWS Secrets Manager for database credentials
  - [ ] [Secrets] Define Secret resource for Aurora credentials
  - [ ] [Secrets] Grant Lambda read access to secrets
2. [Infra] **API Stack** (`/infrastructure/lib/api-stack.ts`)
  - Lambda function for GraphQL endpoint
  - API Gateway with single /graphql route
  - IAM roles and policies
  - [ ] [Secrets] Implement secure retrieval of secrets in Lambda (e.g., via environment variables from Secrets Manager)
3. [Infra] **Frontend Stack** (`/infrastructure/lib/frontend-stack.ts`)
  - S3 bucket for admin interface
  - CloudFront distribution with custom domain
  - Route 53 hosted zone and records
4. [Infra] **Documentation Stack** (`/infrastructure/lib/docs-stack.ts`)
  - S3 bucket for documentation hosting
  - CloudFront distribution for docs.mtbwiki.com
  - Automated invalidation on updates
5. [Infra] **Environment Configuration** (`/infrastructure/config/`)
  - Beta environment configuration
  - Production environment configuration
  - Shared resource definitions
6. [Monitoring] **Monitoring Stack**: Define CloudWatch dashboards and alarms (basic metrics)
7. [Backup] **Database Stack**: Configure automated daily snapshots for Aurora (retention: 7 days)
8. [Backup] **Frontend Stack**: Configure S3 bucket versioning and lifecycle policies for admin interface
9. [Backup] **Documentation Stack**: Configure S3 bucket versioning and lifecycle policies for docs hosting

**Deliverable**: Working API in AWS with Aurora backend and secure secret management

### **Phase 4: CI/CD Pipeline** ⏱️ *Week 5*
**Goal**: Automated deployments

#### **4.1 GitHub Actions Workflows (Infrastructure as Code)**
1. [CI/CD] **Infrastructure Deployment Pipeline** (`/.github/workflows/infrastructure-deploy.yml`)
  - CDK stack deployments
  - Environment provisioning and updates
  - Resource drift detection
  - [ ] [Secrets] Ensure Secrets Manager setup is part of this deployment
2. [CI/CD] **API Deployment Pipeline** (`/.github/workflows/api-deploy.yml`)
  - GraphQL Lambda deployment with CDK
  - Aurora Serverless v2 migrations (Prisma)
  - Environment-specific deployments (Beta/Prod)
  - [ ] [Secrets] Inject secrets securely into Lambda environment variables
3. [CI/CD] **Database Migration Pipeline** (`/.github/workflows/database-migrate.yml`)
  - Prisma migration validation
  - Enumeration data seeding
  - Database schema validation
  - [ ] [Secrets] Use Secrets Manager for DATABASE_URL for migrations/seeding
4. [CI/CD] **Admin Web Pipeline** (`/.github/workflows/admin-web-deploy.yml`)
  - Next.js build and optimization
  - S3 deployment with CloudFront invalidation
  - Environment-specific configurations
  - [ ] [Secrets] Ensure client-side API endpoints are correctly configured via build-time env vars (no secrets exposed)
5. [CI/CD] **Documentation Pipeline** (`/.github/workflows/docs-deploy.yml`)
  - TypeDoc generation from TypeScript code
  - GraphQL schema documentation generation
  - Prisma schema documentation generation
  - S3 deployment to docs.mtbwiki.com
6. [CI/CD] **Quality Assurance Pipeline** (`/.github/workflows/qa.yml`)
  - TypeScript compilation checks
  - ESLint and Prettier validation
  - GraphQL schema validation
  - Integration tests
7. [Testing] All pipelines run tests and enforce coverage thresholds (fail if below 70% for unit, 80% for integration)
8. [Testing] Contract tests for GraphQL API run on every PR
9. [Monitoring] Ensure Sentry DSN is securely injected into environments
10. [Monitoring] Configure CloudWatch alarms for deployment failures
11. [DB Migrations] **Database Migration Pipeline**: Ensure automatic application of schema and data migrations
12. [DB Migrations] **Database Migration Pipeline**: Implement rollback strategy for failed migrations

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
1. [Frontend] Environment switcher (Beta/Prod)
2. [Frontend] GraphQL client integration (Apollo Client)
3. [Frontend] Systems management with hyperlinked navigation
4. [Frontend] Routes management with trail connections
5. [Frontend] Trails management with character tags
6. [Frontend] Discovery algorithm testing interface (GraphQL playground integration)
7. [Frontend] Auto-generated API documentation viewer
8. [Testing] Add e2e tests for admin workflows (CRUD, navigation, i18n)

#### **5.2 Advanced Features**
1. [Frontend] Bulk import/export
2. [Frontend] Regional difficulty calibration tools
3. [Frontend] Content quality scoring
4. [Auth] User management (future)

**Deliverable**: Complete admin interface

### **Phase 6: Production Readiness** ⏱️ *Week 8*
**Goal**: Launch-ready system

#### **6.1 Monitoring & Observability**
1. [Monitoring] Implement comprehensive CloudWatch dashboards for all services
2. [Monitoring] Set up critical alarms (e.g., high error rates, low database connections)
3. [Monitoring] Integrate Sentry for full error visibility across environments
4. [Logging] Centralized log management strategy (CloudWatch Logs insights)

#### **6.2 Security & Performance**
1. [Security] API rate limiting
2. [Security] Input validation and sanitization
3. [Performance] Database query optimization
4. [Performance] CloudFront caching strategy

#### **6.3 Documentation & Context Tracking**
1. [Docs] **API Documentation**: Auto-generated GraphQL API documentation
2. [Docs] **Code Documentation**: Auto-generated TypeScript code documentation (TypeDoc)
3. [Docs] **Database Schema Documentation**: Auto-generated database schema documentation (Prisma docs)
4. [Docs] **Admin User Guide**: Comprehensive guide for using the admin interface
5. [Docs] **Deployment Runbook**: Operational guide for deployments and troubleshooting
6. [Docs] **Cost Optimization Guide**: Documentation on maintaining cost efficiency
7. [Docs] **Context Tracking Automation**: Git hooks for progress updates
8. [Docs] **Schema Versioning Documentation**: Generate and deploy documentation for schema versioning policies and migration procedures.
9. [Docs] **Contributor Getting Started Guide**: Comprehensive guide for new developers and content editors
10. [Docs] **Content Contribution Guide**: Document how to add/edit systems, routes, trails, and enumerations
11. [Docs] **Backup & Recovery Documentation**: Document automated backup procedures (Aurora snapshots, S3 versioning) and manual recovery steps.
12. [Docs] **Internationalization Documentation**: Document how to add new languages, manage translations, and create multi-language content.
13. [Docs] **External Data Sourcing Documentation**: Document how to reference external sources like Trailforks for real-time data.

#### **6.4 Final Review Checkpoint**
1. [Review] **Overall Project Review**:
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
1. [Performance] Sub-200ms API response times
2. [Reliability] 99.9% uptime
3. [Scalability] Auto-scaling to handle traffic spikes
4. [Security] Secure admin interface
5. [Frontend] Mobile-responsive design

### **Functional**
1. [Core] Discovery algorithm finds relevant trails
2. [Core] Regional difficulty calibration works
3. [Admin] Admin interface enables easy content management
4. [Core] Seasonal recommendations are accurate

### **Business**
1. [Cost] Hosting costs under $35/month
2. [Maintainability] Easy to maintain and extend
3. [Usability] Ready for content creators to use
4. [Growth] Scalable architecture for growth

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