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
├── infrastructure/          # CDK stacks
├── .github/workflows/       # GitHub Actions (includes doc generation)
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
└── .github/
    └── hooks/              # Git hooks for context tracking
```

#### **1.2 Core Setup Tasks**
- [ ] Create monorepo structure with workspaces
- [ ] Setup Docker Compose (PostgreSQL + Redis)
- [ ] Initialize Prisma with PostgreSQL schema
- [ ] Create shared TypeScript types package
- [ ] Setup GraphQL API with Apollo Server (not Express REST)
- [ ] Configure auto-documentation generation (TypeDoc + GraphQL schema docs)
- [ ] Basic Next.js admin interface with GraphQL client
- [ ] Context tracking integration (docs generation in CI/CD)

**Deliverable**: `npm run dev` starts full local stack with GraphQL playground

### **Phase 2: Core Features & Data Model** ⏱️ *Week 2-3*
**Goal**: Working discovery algorithm with seed data

#### **2.1 Database Schema Implementation**
- [ ] Implement normalized Prisma schema with enumeration tables
- [ ] Create database migrations for all tables and foreign keys
- [ ] Seed enumeration tables (countries, regions, difficulty ratings, character tags, etc.)
- [ ] Add sample data for 3-5 trail systems using normalized model
- [ ] Implement regional difficulty calibration with proper foreign keys

#### **2.2 Discovery Algorithm**
- [ ] Core discovery endpoint with SQL-based scoring
- [ ] Regional difficulty translation logic
- [ ] Seasonal filtering
- [ ] Style matching (technical, flow, XC)

#### **2.3 GraphQL API Implementation**
- [ ] Systems CRUD mutations and queries
- [ ] Routes CRUD mutations and queries  
- [ ] Trails CRUD mutations and queries
- [ ] Discovery search query with complex filtering
- [ ] Regional calibration queries
- [ ] Auto-generated GraphQL schema documentation
- [ ] TypeScript types generated from GraphQL schema

**Deliverable**: Working GraphQL discovery API with seed data and auto-docs

### **Phase 3: AWS Infrastructure** ⏱️ *Week 4*
**Goal**: Production-ready AWS infrastructure

#### **3.1 Aurora Serverless v2 Setup**
- [ ] Aurora Serverless v2 cluster (PostgreSQL)
- [ ] Configure auto-pause (5 minutes)
- [ ] Setup Data API for Lambda access
- [ ] Database migrations in AWS

#### **3.2 Lambda Functions**
- [ ] Convert GraphQL API to Lambda function
- [ ] Setup API Gateway with Lambda integration (GraphQL endpoint)
- [ ] Configure CORS for admin interface
- [ ] Environment variable management
- [ ] Auto-deploy documentation to S3 on build

#### **3.3 CDK Infrastructure**
```typescript
// Ultra-low-cost stack:
- Aurora Serverless v2 (auto-pause)
- Lambda functions (public subnets) - GraphQL endpoint
- API Gateway (single /graphql endpoint)
- S3 + CloudFront (admin interface)
- S3 + CloudFront (documentation hosting)
- No NAT Gateway, No VPC endpoints
```

**Deliverable**: Working API in AWS with Aurora backend

### **Phase 4: CI/CD Pipeline** ⏱️ *Week 5*
**Goal**: Automated deployments

#### **4.1 GitHub Actions Workflows**
- [ ] GraphQL API deployment (Lambda + Aurora migrations)
- [ ] Admin web deployment (S3 + CloudFront)
- [ ] Documentation generation and deployment (TypeDoc + GraphQL docs)
- [ ] Context tracking (commit docs/, PROGRESS_LOG.md updates)
- [ ] Environment management (Beta/Prod)
- [ ] Database migration automation

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

#### **5.2 Advanced Features**
- [ ] Bulk import/export
- [ ] Regional difficulty calibration tools
- [ ] Content quality scoring
- [ ] User management (future)

**Deliverable**: Complete admin interface

### **Phase 6: Production Readiness** ⏱️ *Week 8*
**Goal**: Launch-ready system

#### **6.1 Monitoring & Observability**
- [ ] CloudWatch dashboards
- [ ] Error tracking and alerting
- [ ] Performance monitoring
- [ ] Cost monitoring

#### **6.2 Security & Performance**
- [ ] API rate limiting
- [ ] Input validation and sanitization
- [ ] Database query optimization
- [ ] CloudFront caching strategy

#### **6.3 Documentation & Context Tracking**
- [ ] Auto-generated GraphQL API documentation
- [ ] Auto-generated TypeScript code documentation (TypeDoc)
- [ ] Auto-generated database schema documentation (Prisma docs)
- [ ] Admin user guide
- [ ] Deployment runbook
- [ ] Cost optimization guide
- [ ] Context tracking automation (git hooks for progress updates)

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