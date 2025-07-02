# 🚵‍♂️ MTB Wiki - Mountain Bike Trail Discovery Platform

*A TypeScript-based wiki focused on helping mountain bikers discover the right trails when traveling or exploring new systems.*

## 🎯 **Project Vision**

MTB Wiki is **not** trying to compete with Trailforks. Instead, we focus on **discovery and curation** - helping riders find the right trails based on their style, fitness, and preferences when exploring new areas.

### **Key Innovation: Regional Difficulty Calibration**
Different regions have vastly different difficulty standards. A "blue" trail in the Pacific Northwest might be a "black" elsewhere. Our 3-axis difficulty system + regional calibration helps riders understand what they're getting into.

## 🏗️ **Architecture Overview**

**Ultra-Low-Cost Serverless Architecture**: $17/month (Year 1), $35/month (Year 2+)

- **Database**: Aurora Serverless v2 (PostgreSQL) - Perfect for complex discovery queries
- **API**: GraphQL via Lambda + API Gateway (public subnets, no VPC costs)
- **Frontend**: Next.js + Apollo Client → S3 + CloudFront (static hosting)
- **Documentation**: Auto-generated from source code and schema
- **CI/CD**: GitHub Actions with integrated documentation pipeline
- **Local Dev**: Docker Compose + Prisma + GraphQL

## 🚀 **Getting Started**

### **For Continuing Development**
1. Read `EXECUTION_PLAN.md` for the complete implementation roadmap
2. Check `PROGRESS_LOG.md` for current status and session history
3. Review `src/docs/` for architecture decisions and context

### **Development Workflow**
- **Admin interface and GraphQL API are developed in parallel** after the initial schema is defined.
- **Iterative feedback**: Weekly review checkpoints ensure the API and admin UI evolve together, with schema/codegen updates as needed.
- **Type safety and codegen**: Always up-to-date between API and UI.

### **For New Contributors**
1. Understand the core concept in `src/docs/concept.md`
2. Review the data models in `src/types/`
3. Check out example data in `src/examples/`

## 📋 **Implementation Status**

### **✅ Complete**
- Architecture planning and cost optimization
- TypeScript data models and examples
- Database technology decision (Aurora vs DynamoDB)
- Ultra-low-cost infrastructure design
- 6-phase implementation plan

### **🔄 Current Phase: Ready for Phase 1**
**Goal**: Local development environment setup
**Timeline**: Week 1 of 8-week plan

### **📅 Next Steps**
1. Initialize git repository
2. Create monorepo structure with workspaces
3. Setup Docker Compose for local development
4. Implement Prisma schema and migrations

## 🎯 **Core Features**

### **Discovery Algorithm**
Help riders find trails that match their:
- **Style**: Technical, Flow, XC, Jumps
- **Fitness Level**: Climbing difficulty and distance
- **Experience**: Regional difficulty calibration
- **Timing**: Seasonal conditions and crowds

### **3-Axis Difficulty System**
1. **XC Technical Climbing**: Sustained climbing difficulty
2. **Descent Technical**: Technical features and exposure
3. **Flow/Jump Difficulty**: Jump lines and flow features

### **Regional Context**
- Local knowledge and tips
- Difficulty calibration between regions
- Seasonal recommendations
- Crowd patterns and timing

## 📁 **Repository Structure**

```
MTBWiki/
├── packages/
│   ├── api/                 # GraphQL Lambda functions
│   ├── database/            # Prisma schema & migrations  
│   ├── admin-web/           # Next.js admin interface (Apollo Client)
│   └── shared/              # TypeScript types (generated from GraphQL)
├── infrastructure/          # CDK stacks
├── .github/workflows/       # GitHub Actions (with doc generation)
├── tests/                   # Integration tests
├── docs/                    # Documentation
│   ├── generated/           # Auto-generated docs (TypeDoc, GraphQL, Prisma)
│   ├── architecture/        # Manual architecture docs
│   └── context/            # Session context and decisions
├── src/                     # Current planning files (will be migrated)
│   ├── docs/               # Architecture documentation
│   ├── types/              # TypeScript models  
│   └── examples/           # Sample data
├── EXECUTION_PLAN.md        # Complete implementation roadmap (tracked in git)
├── PROGRESS_LOG.md          # Session history and progress tracking (tracked in git)
└── README.md               # This file
```

## 💡 **Key Decisions Made**

### **Database: Aurora Serverless v2**
- Perfect fit for relational data structure
- Complex discovery queries work naturally with SQL
- Auto-pause feature saves costs during development
- Faster development using existing TypeScript models

### **Ultra-Low-Cost Architecture**
- **87% cost reduction**: $570/month → $17/month
- Lambda in public subnets (no NAT Gateway)
- S3 + CloudFront instead of Vercel
- Aurora auto-pause when idle

### **Focus on Discovery, Not Competition**
- Complement Trailforks, don't compete
- Emphasize local knowledge and regional context
- Curated routes for specific experiences
- Regional difficulty calibration as key differentiator

## 📊 **Cost Breakdown**

### **Year 1 (with AWS Free Tier)**
- Aurora Serverless v2: $5-15/month (auto-pause)
- Lambda: $0/month (free tier)
- API Gateway: $0/month (free tier)
- S3 + CloudFront: $2/month
- **Total: $7-17/month**

### **Year 2+ (post free tier)**
- Aurora Serverless v2: $15-25/month
- Lambda + API Gateway: $5/month
- S3 + CloudFront: $2/month
- **Total: $22-32/month**

## 🔄 **Development Workflow**

1. **Planning Sessions**: Update `PROGRESS_LOG.md` with accomplishments and decisions
2. **Implementation**: Follow phases in `EXECUTION_PLAN.md`
3. **Context Tracking**: Keep architecture docs updated in `src/docs/`
4. **Version Control**: Track all context and planning files in git

## 📚 **Documentation**

- `EXECUTION_PLAN.md` - Complete 6-phase implementation roadmap
- `PROGRESS_LOG.md` - Session history and progress tracking
- `src/docs/concept.md` - Core project concept and innovation
- `src/docs/database-comparison.md` - Aurora vs DynamoDB analysis
- `src/docs/optimized-architecture.md` - Cost optimization decisions

## 🎯 **Ready to Build**

All architectural decisions are complete and the execution plan is detailed. The project is ready for implementation - just follow the phases in `EXECUTION_PLAN.md` and track progress in `PROGRESS_LOG.md`.

**Let's build something that helps mountain bikers discover amazing trails! 🚵‍♂️**

### **Testing Workflow**
- **Unit tests**: All packages must have 70%+ coverage (Jest)
- **Integration tests**: API and DB must have 80%+ coverage
- **Contract tests**: 100% of GraphQL schema types and queries (using GraphQL Codegen or similar)
- **E2E tests**: All main user flows (CRUD, discovery, navigation)
- **CI/CD**: All pipelines enforce coverage thresholds and run contract tests on every PR 

### **Local Development Setup**
- Run all services with a single command:
  ```bash
  npm run dev:all
  ```
- To run/test individual services:
  - API: `npm run dev --workspace=packages/api` and `npm run test --workspace=packages/api`
  - Admin Web: `npm run dev --workspace=packages/admin-web` and `npm run test --workspace=packages/admin-web`
  - Database: `npm run dev --workspace=packages/database` and `npm run test --workspace=packages/database`
- All tests (unit, integration, e2e, contract) run automatically on push and deploy via CI/CD (GitHub Actions). 