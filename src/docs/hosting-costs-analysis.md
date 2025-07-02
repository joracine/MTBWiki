# MTB Wiki - Complete Hosting Cost Analysis

## 💰 Monthly Hosting Costs Breakdown

### AWS Infrastructure

#### Beta Environment
```typescript
// Compute & API
Lambda (low usage):           $5/month
API Gateway (1M requests):    $3/month
CloudWatch Logs:              $3/month

// Database
RDS PostgreSQL db.t3.micro:   $15/month
RDS Storage (20GB):           $2/month
RDS Backup Storage:           $1/month

// Networking
Data Transfer (minimal):      $2/month

Beta Subtotal:                $31/month
```

#### Production Environment
```typescript
// Compute & API
Lambda (moderate usage):      $15/month
API Gateway (5M requests):    $15/month
CloudWatch Logs:              $8/month

// Database
RDS PostgreSQL db.t3.small:   $30/month
RDS Storage (100GB):          $10/month
RDS Backup Storage:           $5/month

// Networking
Data Transfer (moderate):     $10/month

Production Subtotal:          $93/month
```

#### Shared AWS Resources
```typescript
// Networking
VPC NAT Gateway:              $45/month
Elastic IPs (2):              $7/month

// DNS & Security
Route53 Hosted Zone:          $0.50/month
Route53 Queries (1M):         $0.40/month
Secrets Manager (2 secrets):  $2/month
Certificate Manager:          $0/month (free)

// Monitoring & Alerts
CloudWatch Dashboards:        $3/month
CloudWatch Alarms:            $2/month
SNS Notifications:            $1/month

Shared Subtotal:              $61/month
```

### External Services

#### Admin Web Interface
```typescript
Vercel Pro Plan:              $20/month
- Unlimited deployments
- Custom domains
- Analytics
- Team collaboration
- 100GB bandwidth

Alternative (Netlify Pro):    $19/month
```

#### Development & Operations
```typescript
GitHub Actions:               $0/month (free for public repos)
                             $4/month (if private repo, 3000 minutes)

Sentry Error Tracking:        $0/month (free tier: 5K errors)
                             $26/month (team plan if needed)

Domain Registration:          $12/year ($1/month)
```

## 📊 Total Monthly Costs

### Minimal Configuration (Public Repo)
```typescript
AWS Beta Environment:         $31/month
AWS Production Environment:   $93/month
AWS Shared Resources:         $61/month
Vercel Admin Interface:       $20/month
Domain:                       $1/month
GitHub Actions:               $0/month
Sentry:                       $0/month

Total:                        $206/month
```

### Professional Configuration (Private Repo + Monitoring)
```typescript
AWS Infrastructure:           $185/month
Vercel Pro:                   $20/month
Domain:                       $1/month
GitHub Actions (private):     $4/month
Sentry Team Plan:             $26/month

Total:                        $236/month
```

## 📈 Cost Scaling Analysis

### Traffic-Based Scaling
```typescript
// Current estimates assume:
Beta: 1M API requests/month
Prod: 5M API requests/month

// If traffic grows 10x:
API Gateway costs: +$120/month
Lambda costs: +$100/month
Data Transfer: +$50/month
RDS may need upgrade: +$50/month

High Traffic Total: ~$556/month
```

### User Growth Scaling
```typescript
// 1,000 active users
Current config sufficient: $206/month

// 10,000 active users
Upgrade RDS to db.t3.medium: +$60/month
Add Redis caching: +$15/month
Total: ~$281/month

// 100,000 active users
Upgrade to Aurora Serverless: +$200/month
Add CDN (CloudFront): +$50/month
Load balancer: +$25/month
Total: ~$556/month
```

## 💡 Cost Optimization Strategies

### Immediate Savings
```typescript
// Use single NAT Gateway instead of 2 AZs
NAT Gateway savings: -$45/month (but reduces availability)

// Use db.t4g.micro (ARM-based)
Database savings: -$5/month

// Optimize Lambda memory allocation
Lambda savings: -$5-10/month

Potential savings: -$55/month
```

### Development Phase Savings
```typescript
// During development, use:
RDS db.t3.micro for both envs: -$15/month
Smaller storage allocations: -$8/month
Minimal CloudWatch retention: -$5/month

Development Total: ~$178/month
```

### Alternative Architectures
```typescript
// Option 1: Serverless-First
Replace RDS with DynamoDB: -$40/month
Add DynamoDB costs: +$10/month
Net savings: -$30/month

// Option 2: Container-based
Use ECS Fargate instead of Lambda: Similar costs
Better for complex business logic

// Option 3: Edge-first
Use Cloudflare Workers: -$100/month
Limited to simpler use cases
```

## 🎯 Cost Comparison with Alternatives

### SaaS Alternatives
```typescript
// If using existing platforms:
Strapi Cloud (CMS): $99/month
Hasura Cloud: $99/month
Supabase Pro: $25/month
Firebase Blaze: ~$100/month

Our solution: $206/month
- More control and customization
- No vendor lock-in
- Full ownership of data
```

### Self-Hosted Alternatives
```typescript
// VPS-based hosting
DigitalOcean Droplets: $40/month
Database hosting: $15/month
CDN: $10/month
Monitoring: $20/month
Total: $85/month

Trade-offs:
- Much more manual management
- Less scalability
- More operational overhead
```

## 📅 Cost Timeline Projection

### Year 1 (MVP Phase)
```typescript
Months 1-3 (Development): $178/month
Months 4-6 (Beta Testing): $206/month
Months 7-12 (Production): $206/month

Year 1 Average: $197/month
Year 1 Total: $2,364
```

### Year 2 (Growth Phase)
```typescript
Assuming 5x traffic growth:
Average: $350/month
Year 2 Total: $4,200
```

### Year 3 (Scale Phase)
```typescript
Assuming 20x traffic growth:
Average: $600/month
Year 3 Total: $7,200
```

## 🚨 Cost Alerts & Monitoring

### Recommended Billing Alerts
```typescript
// Set CloudWatch billing alarms
Development phase: $200/month
Production phase: $300/month
Growth phase: $500/month

// Monitor key cost drivers
- RDS instance hours
- Lambda invocations
- API Gateway requests
- Data transfer costs
```

### Cost Optimization Tools
```typescript
// AWS Cost Explorer
- Monthly cost analysis
- Service-level breakdown
- Usage patterns

// AWS Trusted Advisor
- Cost optimization recommendations
- Resource utilization insights

// Third-party tools
- CloudHealth
- CloudCheckr
```

## 💰 Summary

**Current Plan Total: $206/month**

This includes:
- ✅ Complete AWS infrastructure (Beta + Prod)
- ✅ Admin web interface (Vercel)
- ✅ Domain and SSL certificates
- ✅ Basic monitoring and error tracking
- ✅ CI/CD pipeline

**Cost per user (assuming 1,000 active users): $0.21/month**

This is very reasonable for a custom-built platform with full control and no vendor lock-in. The architecture is designed to scale efficiently as usage grows. 