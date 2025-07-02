# MTB Wiki - Infrastructure as Code Configuration

All infrastructure, CI/CD pipelines, and build processes are defined as code for maximum reproducibility, version control, and team collaboration.

## CDK Infrastructure Stacks

### Core Infrastructure Stack
```typescript
// /infrastructure/lib/core-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';

export class CoreStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly cluster: rds.ServerlessCluster;

  constructor(scope: Construct, id: string, props: CoreStackProps) {
    super(scope, id, props);

    // VPC with public subnets only (no NAT Gateway for cost optimization)
    this.vpc = new ec2.Vpc(this, 'MTBWikiVPC', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    // Aurora Serverless v2 cluster with auto-pause
    this.cluster = new rds.ServerlessCluster(this, 'MTBWikiDB', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_14_9,
      }),
      vpc: this.vpc,
      scaling: {
        autoPause: cdk.Duration.minutes(5), // Auto-pause for cost savings
        minCapacity: rds.AuroraCapacityUnit.ACU_0_5,
        maxCapacity: rds.AuroraCapacityUnit.ACU_16,
      },
      enableDataApi: true, // For Lambda access without VPC
      defaultDatabaseName: 'mtbwiki',
      removalPolicy: props.environment === 'prod' 
        ? cdk.RemovalPolicy.RETAIN 
        : cdk.RemovalPolicy.DESTROY,
    });
  }
}
```

## GitHub Actions Pipelines

### Infrastructure Deployment
```yaml
# /.github/workflows/infrastructure-deploy.yml
name: Deploy Infrastructure

on:
  push:
    branches: [main]
    paths: ['infrastructure/**']
  pull_request:
    branches: [main]
    paths: ['infrastructure/**']

jobs:
  deploy-infrastructure:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [beta, prod]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd infrastructure
          npm ci
          
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2
          
      - name: CDK Diff (PR only)
        if: github.event_name == 'pull_request'
        run: |
          cd infrastructure
          npx cdk diff --context environment=${{ matrix.environment }}
          
      - name: CDK Deploy
        if: github.ref == 'refs/heads/main'
        run: |
          cd infrastructure
          npx cdk deploy --all --require-approval never --context environment=${{ matrix.environment }}
```

### Database Migration Pipeline
```yaml
# /.github/workflows/database-migrate.yml
name: Database Migration

on:
  push:
    branches: [main]
    paths: ['packages/database/**']

jobs:
  migrate-database:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [beta, prod]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Validate Prisma schema
        run: |
          cd packages/database
          npx prisma validate
          
      - name: Generate Prisma client
        run: |
          cd packages/database
          npx prisma generate
          
      - name: Run migrations
        run: |
          cd packages/database
          npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets[format('DATABASE_URL_{0}', matrix.environment)] }}
          
      - name: Seed enumeration data
        if: matrix.environment == 'beta'
        run: |
          cd packages/database
          npx prisma db seed
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL_BETA }}
```

## Environment Configuration

### Beta Environment
```typescript
// /infrastructure/config/beta.ts
import { EnvironmentConfig } from './types';

export const betaConfig: EnvironmentConfig = {
  environment: 'beta',
  region: 'us-west-2',
  
  // Database configuration
  database: {
    autoPauseMinutes: 5,
    minCapacity: 0.5,
    maxCapacity: 4,
    removalPolicy: 'DESTROY',
  },
  
  // API configuration
  api: {
    memorySize: 512,
    timeout: 30,
    logLevel: 'DEBUG',
  },
  
  // Frontend configuration
  frontend: {
    domainName: 'beta-admin.mtbwiki.com',
    certificateArn: process.env.BETA_CERTIFICATE_ARN,
  },
  
  // Documentation configuration
  docs: {
    domainName: 'beta-docs.mtbwiki.com',
    bucketName: 'mtbwiki-docs-beta',
  },
};
```

## Build Configuration

### Root Package.json
```json
{
  "name": "mtb-wiki",
  "private": true,
  "workspaces": [
    "packages/*",
    "infrastructure"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "build:api": "npm run build --workspace=packages/api",
    "build:admin-web": "npm run build --workspace=packages/admin-web",
    "build:shared": "npm run build --workspace=packages/shared",
    
    "test": "npm run test --workspaces",
    "test:api": "npm run test --workspace=packages/api",
    "test:integration": "npm run test:integration --workspace=tests",
    
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    
    "docs:generate": "npm run docs:code && npm run docs:graphql && npm run docs:database",
    "docs:code": "typedoc --out docs/generated/code packages/*/src",
    "docs:graphql": "graphql-doc-generator --schema packages/api/src/schema --output docs/generated/api",
    "docs:database": "prisma-docs-generator --schema packages/database/prisma/schema.prisma --output docs/generated/database",
    "docs:deploy": "aws s3 sync docs/generated s3://mtbwiki-docs-prod --delete",
    
    "validate:graphql": "npm run validate:graphql --workspace=packages/api",
    "validate:prisma": "npm run validate --workspace=packages/database",
    
    "infrastructure:deploy": "npm run deploy --workspace=infrastructure",
    "infrastructure:diff": "npm run diff --workspace=infrastructure"
  }
}
```

## Benefits

- **Version Control**: All infrastructure changes tracked in git
- **Reproducibility**: Identical environments across Beta/Production  
- **Automation**: Automatic deployments on code changes
- **Cost Optimization**: Environment-specific resource sizing
- **Security**: IAM roles and policies defined as code
- **Disaster Recovery**: Infrastructure can be recreated from code

Everything is code. Everything is versioned. Everything is reproducible. 