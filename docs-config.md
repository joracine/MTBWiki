# MTB Wiki - Documentation & Context Tracking Configuration

## 🎯 **Documentation Strategy**

### **Auto-Generated Documentation**
All documentation is generated from source code to ensure it stays up-to-date and accurate.

```yaml
Documentation Pipeline:
  Source Code → TypeDoc → docs/generated/code/
  GraphQL Schema → GraphQL Docs → docs/generated/api/  
  Prisma Schema → Prisma Docs → docs/generated/database/
  Context Files → Git Tracking → docs/context/
  All Generated Docs → S3 + CloudFront → Public Access
```

## 📋 **Documentation Types & Tools**

### **1. GraphQL API Documentation**
**Tool**: `@graphql-tools/schema` + `graphql-doc-generator`
**Source**: `packages/api/src/schema/`
**Output**: `docs/generated/api/`

```typescript
// Auto-generates from GraphQL schema:
type System {
  id: ID!
  name: String!
  region: String!
  routes: [Route!]!
  difficulty_calibration: RegionalCalibration!
}

type Query {
  """
  Discover trails based on user preferences and regional calibration
  """
  discover(preferences: UserPreferences!): DiscoveryResult!
}
```

**Generated Documentation Includes**:
- Complete schema reference
- Query examples with variables
- Mutation examples
- Type definitions with descriptions
- Interactive GraphQL playground

### **2. TypeScript Code Documentation**
**Tool**: `TypeDoc`
**Source**: All TypeScript files in `packages/`
**Output**: `docs/generated/code/`

```typescript
/**
 * Represents a trail system with regional difficulty calibration
 * @example
 * ```typescript
 * const squamish: System = {
 *   id: "squamish",
 *   name: "Squamish",
 *   region: "pacific-northwest",
 *   difficulty_calibration: { /* ... */ }
 * }
 * ```
 */
interface System {
  /** Unique identifier for the system */
  id: string;
  /** Display name of the trail system */
  name: string;
  // ... more properties
}
```

**Generated Documentation Includes**:
- Interface and type definitions
- Function signatures and examples
- Class documentation
- Module organization
- Cross-references between types

### **3. Database Schema Documentation**
**Tool**: `prisma-docs-generator`
**Source**: `packages/database/prisma/schema.prisma`
**Output**: `docs/generated/database/`

```prisma
/// Trail system with regional difficulty calibration
model System {
  id                    String   @id
  name                  String
  region                String
  /// Relationships
  routes                Route[]
  /// Regional difficulty calibration data
  difficulty_calibration Json
  
  @@map("systems")
}
```

**Generated Documentation Includes**:
- Database schema visualization
- Table relationships (ERD)
- Field descriptions and constraints
- Migration history
- Seed data examples

### **4. Context & Decision Tracking**
**Tool**: Git hooks + Custom scripts
**Source**: `PROGRESS_LOG.md`, `EXECUTION_PLAN.md`, session notes
**Output**: `docs/context/`

**Automatically Tracked**:
- Session summaries
- Architectural decisions
- Implementation progress
- Cost optimizations
- Technology choices

## 🔧 **Implementation Details**

### **Package.json Scripts**
```json
{
  "scripts": {
    "docs:generate": "npm run docs:graphql && npm run docs:code && npm run docs:database",
    "docs:graphql": "graphql-doc-generator --schema packages/api/src/schema --output docs/generated/api",
    "docs:code": "typedoc --out docs/generated/code packages/*/src",
    "docs:database": "prisma-docs-generator --schema packages/database/prisma/schema.prisma --output docs/generated/database",
    "docs:serve": "serve docs/generated",
    "docs:deploy": "aws s3 sync docs/generated s3://mtb-wiki-docs --delete"
  }
}
```

### **GitHub Actions Integration**
```yaml
# .github/workflows/docs.yml
name: Generate and Deploy Documentation
on:
  push:
    branches: [main, beta]
  pull_request:
    branches: [main]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Generate GraphQL schema
        run: npm run build:schema
        
      - name: Generate all documentation
        run: npm run docs:generate
        
      - name: Deploy to S3 (if main branch)
        if: github.ref == 'refs/heads/main'
        run: npm run docs:deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### **Git Hooks for Context Tracking**
```bash
# .github/hooks/post-commit
#!/bin/bash
# Auto-update progress log on commits

COMMIT_MSG=$(git log -1 --pretty=%B)
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Append to progress log
echo "### Commit: $DATE" >> PROGRESS_LOG.md
echo "**Message**: $COMMIT_MSG" >> PROGRESS_LOG.md
echo "" >> PROGRESS_LOG.md

# Stage the updated progress log
git add PROGRESS_LOG.md
```

## 🌐 **Documentation Hosting**

### **S3 + CloudFront Setup**
```typescript
// infrastructure/docs-stack.ts
export class DocsStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    // S3 bucket for documentation
    const docsBucket = new s3.Bucket(this, 'DocsBucket', {
      bucketName: 'mtb-wiki-docs',
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
    });

    // CloudFront distribution
    new cloudfront.Distribution(this, 'DocsDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(docsBucket),
      },
      domainNames: ['docs.mtbwiki.com'],
    });
  }
}
```

### **Documentation URLs**
```
Production:
- https://docs.mtbwiki.com/api/          # GraphQL API docs
- https://docs.mtbwiki.com/code/         # TypeScript code docs  
- https://docs.mtbwiki.com/database/     # Database schema docs
- https://docs.mtbwiki.com/context/      # Project context & decisions

Beta:
- https://beta-docs.mtbwiki.com/         # Same structure for beta
```

## 🔄 **Context Tracking Workflow**

### **Session Management**
```typescript
// Each development session:
1. Update PROGRESS_LOG.md with session goals
2. Make implementation changes
3. Git commit triggers documentation regeneration
4. Session summary automatically added to context
5. Architectural decisions tracked in decision log
```

### **Automated Context Updates**
```bash
# On every commit:
1. Extract commit message and changes
2. Update PROGRESS_LOG.md with timestamp
3. Regenerate documentation if schema changes
4. Deploy updated docs to S3
5. Maintain continuity between sessions
```

### **Decision Tracking**
```markdown
# Automatic decision log format:
## Decision: [Topic] - [Date]
**Context**: What led to this decision
**Options Considered**: List of alternatives
**Decision Made**: Final choice
**Rationale**: Why this was chosen
**Impact**: Cost, complexity, timeline effects
```

## 🎯 **GraphQL Integration with Admin Interface**

### **Apollo Client Setup**
```typescript
// packages/admin-web/src/lib/apollo.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
  },
});
```

### **Code Generation from GraphQL**
```json
// codegen.yml
overwrite: true
schema: "http://localhost:4000/graphql"
documents: "packages/admin-web/src/**/*.graphql"
generates:
  packages/shared/src/generated/graphql.ts:
    plugins:
      - "typescript"
      - "typescript-operations"
      - "typescript-react-apollo"
```

### **Admin Interface GraphQL Integration**
```typescript
// Auto-generated hooks from GraphQL queries
const { data, loading, error } = useDiscoverTrailsQuery({
  variables: {
    preferences: {
      region: 'pacific-northwest',
      style: 'technical',
      fitness_level: 7
    }
  }
});

// Type-safe, auto-completing, always up-to-date
```

## 📊 **Documentation Metrics**

### **Tracking Documentation Quality**
```typescript
// Automated checks:
- Schema coverage: 100% (all types documented)
- Code coverage: >80% (functions have JSDoc)
- Context tracking: All sessions logged
- Decision coverage: All major choices documented
- Link validity: All internal links work
```

### **Documentation Deployment Stats**
```yaml
# GitHub Actions reports:
- Documentation build time
- Generated file sizes
- S3 deployment success
- CloudFront cache invalidation
- Documentation accessibility scores
```

## 🚀 **Benefits of This Approach**

### **Always Up-to-Date**
- Documentation generated from source code
- Impossible for docs to be out of sync
- Schema changes automatically reflected

### **Developer Experience**
- GraphQL playground integrated in admin interface
- Type-safe queries with auto-completion
- Comprehensive examples and usage patterns

### **Project Continuity**
- Complete session history preserved
- Architectural decisions tracked
- Easy to resume development after breaks
- New contributors can understand project evolution

### **Cost Effective**
- Documentation hosting: ~$1/month (S3 + CloudFront)
- Automated generation: $0 (GitHub Actions free tier)
- Maintenance overhead: Minimal (automated)

## 🎯 **Ready for Implementation**

This documentation strategy ensures:
1. ✅ **Auto-generated docs** from all source code
2. ✅ **GraphQL API integration** throughout
3. ✅ **Context tracking** in git
4. ✅ **Seamless admin interface** with GraphQL
5. ✅ **Cost-effective hosting** with S3 + CloudFront
6. ✅ **Developer-friendly** with type safety and auto-completion

All documentation will be generated automatically as part of the build process and deployed alongside the application infrastructure. 