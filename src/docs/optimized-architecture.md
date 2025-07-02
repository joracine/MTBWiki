# MTB Wiki - Ultra-Low-Cost Architecture

## 🎯 Cost Optimization Strategy

### Replace Expensive Fixed Costs
```typescript
// ELIMINATE these expensive fixed costs:
NAT Gateway: $45/month → $0 (remove VPC complexity)
Vercel Pro: $20/month → S3 + CloudFront ~$3/month
RDS instances: $45/month → Serverless alternatives

Total Fixed Cost Reduction: ~$107/month!
```

## 🏗️ Optimized Architecture

### 1. **Frontend: S3 + CloudFront (Instead of Vercel)**

```typescript
// S3 Static Website Hosting
S3 Bucket (website): $0.023/GB storage + $0.0004/1000 requests
Estimated: ~$2/month for admin interface

// CloudFront CDN
CloudFront: $0.085/GB for first 10TB + $0.0075/10,000 requests
Estimated: ~$1/month for low traffic

// Route53 for custom domain
Custom domain: $0.50/month

Total Frontend: ~$3.50/month (vs $20 Vercel Pro)
```

#### Deployment Pipeline
```typescript
// GitHub Actions → S3 → CloudFront
name: Deploy Admin Interface
on:
  push:
    branches: [main]
    paths: ['packages/admin-web/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Build Next.js app
        run: npm run build && npm run export
      
      - name: Deploy to S3
        run: aws s3 sync ./out s3://mtbwiki-admin --delete
      
      - name: Invalidate CloudFront
        run: aws cloudfront create-invalidation --distribution-id $DIST_ID --paths "/*"
```

### 2. **Database: Eliminate Fixed RDS Costs**

#### Option A: Aurora Serverless v2 (Recommended)
```typescript
// Aurora Serverless v2 - Pay per use
Minimum: 0.5 ACU (Aurora Capacity Units)
Cost: $0.12 per ACU-hour
Idle cost: 0.5 ACU × 24h × 30d × $0.12 = $43.20/month

// BUT: Auto-pauses after 5 minutes of inactivity!
Idle (paused): $0/month
Active usage: $0.12/ACU-hour only when processing requests

Estimated cost: $5-15/month (vs $45/month fixed RDS)
```

#### Option B: DynamoDB (Most Cost Effective)
```typescript
// DynamoDB - True serverless
On-demand pricing:
- $1.25 per million read requests
- $1.25 per million write requests  
- $0.25/GB storage

Estimated cost: $2-8/month for low-medium usage
```

#### Option C: PlanetScale (External Serverless MySQL)
```typescript
// PlanetScale - Serverless MySQL
Free tier: 5GB storage, 1 billion row reads/month
Paid: $39/month for production features

Good middle ground between cost and PostgreSQL compatibility
```

### 3. **API: Remove VPC/NAT Gateway Complexity**

```typescript
// Lambda in public subnets (no VPC)
Benefits:
- No NAT Gateway needed ($45/month savings!)
- Faster cold starts
- Simpler networking
- Direct internet access

Database Connection Options:
1. Aurora Serverless Data API (HTTP-based, no connections)
2. Connection pooling with PgBouncer on Lambda
3. RDS Proxy (if keeping RDS) - $1.50/month vs $45 NAT Gateway
```

## 💰 Ultra-Low-Cost Architecture Comparison

### Current Architecture (Fixed Costs)
```typescript
NAT Gateway: $45/month
RDS instances: $45/month  
Vercel Pro: $20/month
Other fixed: $10/month
Total Fixed: $120/month

Variable: $30-50/month
Total: $150-170/month
```

### Optimized Architecture (Mostly Variable)
```typescript
// Fixed Costs
Route53 hosted zone: $0.50/month
CloudFront distribution: $0/month (pay per use)
Domain: $1/month
Total Fixed: $1.50/month

// Variable Costs  
S3 + CloudFront: $3/month
Aurora Serverless (paused when idle): $5-15/month
Lambda: $3-10/month
API Gateway: $3-15/month
DynamoDB (if used): $2-8/month

Total: $17-52/month (vs $150-170/month!)
Savings: $98-118/month (70-85% reduction)
```

## 🔧 Implementation Details

### Database Migration Strategy

#### Option 1: Aurora Serverless v2
```typescript
// CDK Configuration
const cluster = new rds.ServerlessCluster(this, 'Database', {
  engine: rds.DatabaseClusterEngine.auroraPostgres({
    version: rds.AuroraPostgresEngineVersion.VER_14_6,
  }),
  scaling: {
    autoPause: Duration.minutes(5), // Pause when idle
    minCapacity: rds.AuroraCapacityUnit.ACU_0_5,
    maxCapacity: rds.AuroraCapacityUnit.ACU_2,
  },
  enableDataApi: true, // HTTP-based queries (no connection pooling needed)
});
```

#### Option 2: DynamoDB with Single-Table Design
```typescript
// Convert relational model to DynamoDB
interface DynamoDBRecord {
  PK: string;    // Partition Key: "SYSTEM#123" | "ROUTE#456" | "TRAIL#789"
  SK: string;    // Sort Key: "METADATA" | "ROUTE#456" | "TRAIL#789"
  Type: string;  // "System" | "Route" | "Trail"
  GSI1PK: string; // For queries by region, difficulty, etc.
  GSI1SK: string;
  data: any;     // The actual record data
}

// Example queries
- Get System: PK="SYSTEM#123", SK="METADATA"
- Get Routes for System: PK="SYSTEM#123", SK begins_with "ROUTE#"
- Get Trails by Region: GSI1PK="REGION#PNW", GSI1SK begins_with "TRAIL#"
```

### Lambda Database Connection

#### With Aurora Serverless Data API
```typescript
// No connection management needed!
import { RDSDataService } from '@aws-sdk/client-rds-data';

const rdsData = new RDSDataService({});

export const handler = async (event) => {
  const result = await rdsData.executeStatement({
    resourceArn: process.env.CLUSTER_ARN,
    secretArn: process.env.SECRET_ARN,
    database: 'mtbwiki',
    sql: 'SELECT * FROM systems WHERE region = :region',
    parameters: [{ name: 'region', value: { stringValue: 'PNW' } }]
  });
  
  return result.records;
};
```

#### With DynamoDB
```typescript
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';

const dynamodb = new DynamoDBClient({});

export const handler = async (event) => {
  const result = await dynamodb.send(new QueryCommand({
    TableName: 'MTBWiki',
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: {
      ':pk': { S: 'SYSTEM#123' }
    }
  }));
  
  return result.Items;
};
```

### S3 + CloudFront Setup

```typescript
// CDK Configuration
const websiteBucket = new s3.Bucket(this, 'AdminWebsite', {
  bucketName: 'mtbwiki-admin',
  websiteIndexDocument: 'index.html',
  websiteErrorDocument: 'error.html',
  publicReadAccess: true,
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
});

const distribution = new cloudfront.CloudFrontWebDistribution(this, 'AdminCDN', {
  originConfigs: [{
    s3OriginSource: {
      s3BucketSource: websiteBucket,
    },
    behaviors: [{
      isDefaultBehavior: true,
      compress: true,
      allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
    }],
  }],
  defaultRootObject: 'index.html',
  errorConfigurations: [{
    errorCode: 404,
    responseCode: 200,
    responsePagePath: '/index.html', // SPA routing
  }],
});
```

## 🎯 Recommended Implementation Path

### Phase 1: Migrate Frontend
```typescript
1. Build Next.js app with static export
2. Setup S3 bucket + CloudFront
3. Configure GitHub Actions deployment
4. Test admin interface works

Immediate savings: $17/month (Vercel → S3+CF)
```

### Phase 2: Eliminate NAT Gateway
```typescript
1. Move Lambda to public subnets
2. Use Aurora Serverless Data API OR
3. Implement connection pooling in Lambda

Immediate savings: $45/month (NAT Gateway elimination)
```

### Phase 3: Database Optimization
```typescript
Option A: Migrate to Aurora Serverless v2
- Keep PostgreSQL compatibility
- Auto-pause when idle
- Savings: $30-40/month

Option B: Migrate to DynamoDB
- Redesign data model
- True serverless scaling
- Savings: $37-43/month
```

## 💡 Final Cost Comparison

```typescript
// Current Plan
Year 1 (with free tier): $123/month
Year 2+: $170/month

// Ultra-Optimized Plan
Year 1 (with free tier): $17/month
Year 2+: $35/month

Total Savings: $106-135/month (80-85% reduction!)
```

This architecture is **much more startup-friendly** while maintaining scalability. The costs scale naturally with usage rather than having high fixed components.

Ready to implement this optimized approach? 