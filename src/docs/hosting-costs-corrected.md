# MTB Wiki - Corrected Hosting Cost Analysis

## 🆓 AWS Free Tier Impact

### What's Covered by Free Tier (First 12 months)
```typescript
// Compute
Lambda: 1M free requests/month + 400,000 GB-seconds
API Gateway: 1M free requests/month (first 12 months only)

// Database  
RDS: 750 hours/month of db.t2.micro or db.t3.micro
RDS Storage: 20GB SSD storage
RDS Backup: 20GB backup storage

// Networking
Data Transfer: 15GB outbound/month
CloudWatch: 10 custom metrics, 5GB log ingestion

// Other
Route53: First hosted zone free
Certificate Manager: Free SSL certificates
```

### What's NOT Free Tier Eligible
```typescript
// Fixed Costs (Always Pay)
NAT Gateway: $45/month (biggest fixed cost!)
Elastic IPs: $3.65/month each (if not attached to running instance)
Route53 queries: $0.40 per million (after first million)

// Upgrades Beyond Free Tier
RDS db.t3.small: $30/month (free tier only covers micro)
Additional storage: $0.10/GB/month beyond 20GB
```

## 🖥️ What is Vercel and Why Pay?

### Vercel Explained
```typescript
// Vercel is a hosting platform for frontend applications
// Specializes in Next.js, React, and static sites

// What it provides:
- Global CDN (fast loading worldwide)
- Automatic deployments from GitHub
- Serverless functions
- Custom domains with SSL
- Preview deployments for each PR
- Analytics and monitoring
```

### Vercel Cost Breakdown
```typescript
// Free Tier (Hobby)
- 100GB bandwidth/month
- Unlimited personal projects
- 1 team member
- Community support

// Pro Tier ($20/month)
- 1TB bandwidth/month  
- Team collaboration
- Password protection
- Analytics
- Priority support
- Custom domains
```

### Vercel Alternatives
```typescript
// Option 1: Vercel Free Tier
Cost: $0/month
Limitations: No team features, limited bandwidth

// Option 2: Netlify (similar to Vercel)
Free: 100GB bandwidth, 300 build minutes
Pro: $19/month

// Option 3: AWS S3 + CloudFront
Cost: ~$5-10/month
More setup complexity, but cheaper

// Option 4: Self-host on AWS EC2
Cost: ~$10/month (t3.micro)
Much more management overhead
```

## 💰 Corrected Cost Analysis

### Year 1 (With Free Tier)

#### Months 1-12 (Free Tier Active)
```typescript
// AWS Costs
NAT Gateway: $45/month (FIXED - not free tier eligible)
Elastic IPs (2): $7/month (FIXED)
Route53 hosted zone: $0.50/month (FIXED)
Secrets Manager: $2/month (FIXED)

// Free Tier Covered (Beta Environment)
RDS db.t3.micro: $0/month (free tier)
RDS Storage (20GB): $0/month (free tier)
Lambda: $0/month (under 1M requests)
API Gateway: $0/month (first 12 months)
CloudWatch: $0/month (under limits)

// Production Environment (Exceeds Free Tier)
RDS db.t3.small: $30/month (FIXED)
RDS Storage (100GB): $8/month (VARIABLE: $0.10/GB beyond 20GB free)
Lambda (moderate usage): $10/month (VARIABLE)
API Gateway (5M requests): $15/month (VARIABLE)
CloudWatch: $5/month (VARIABLE)

AWS Subtotal: $122.50/month

// External Services
Vercel: $0/month (use free tier initially)
Domain: $1/month (FIXED)
GitHub Actions: $0/month (free for public repos)

Total Year 1: $123.50/month
```

#### Months 13+ (No More Free Tier)
```typescript
// Add back free tier costs
Beta RDS db.t3.micro: +$15/month
Beta RDS Storage: +$2/month  
Beta Lambda: +$3/month
Beta API Gateway: +$3/month
Beta CloudWatch: +$3/month

Total Post-Free-Tier: $149.50/month
```

### Production Scale (No Free Tier)
```typescript
// When you need Vercel Pro features
Vercel Pro: +$20/month

Total with Vercel Pro: $169.50/month
```

## 📊 Fixed vs Variable Cost Breakdown

### Fixed Costs (Pay Regardless of Usage)
```typescript
// AWS Fixed Costs
NAT Gateway: $45/month
Elastic IPs: $7/month
Route53 hosted zone: $0.50/month
Secrets Manager: $2/month
RDS instances (even if idle): $45/month (both environments)

AWS Fixed Subtotal: $99.50/month

// External Fixed Costs
Domain registration: $1/month
Vercel Pro (if needed): $20/month

Total Fixed: $120.50/month (71% of total cost!)
```

### Variable Costs (Pay-As-You-Go)
```typescript
// Scales with usage
Lambda invocations: $0.0000002 per request
API Gateway: $3.50 per million requests
RDS Storage: $0.10/GB/month
Data Transfer: $0.09/GB
CloudWatch: $0.50/GB logs ingested

Current Variable: ~$49/month (29% of total cost)
```

## 💡 Cost Optimization Strategies

### Reduce Fixed Costs
```typescript
// Biggest Impact: Remove NAT Gateway
Savings: -$45/month (but Lambda can't reach RDS privately)

// Alternative: Use RDS Proxy + Public subnets
RDS Proxy: $1.50/month per connection
Net savings: ~$43/month

// Use single Elastic IP
Savings: -$3.65/month

// Optimized Fixed Costs: $52.85/month (down from $99.50)
```

### Development-Friendly Setup
```typescript
// Year 1 Optimized Costs
Fixed costs (optimized): $52.85/month
Variable costs (low usage): $20/month
Vercel free tier: $0/month

Total Development Cost: $72.85/month
```

### Alternative Architecture (Lower Fixed Costs)
```typescript
// Use AWS Lambda + RDS Proxy instead of VPC
Benefits:
- No NAT Gateway needed (-$45/month)
- No Elastic IPs needed (-$7/month)
- Simpler networking

Trade-offs:
- Less network isolation
- RDS Proxy costs $1.50/month per connection
- Slightly higher latency

New Total: ~$75/month (vs $123.50/month)
```

## 🎯 Recommendations by Phase

### Phase 1-2: Development (Months 1-6)
```typescript
Use Free Tiers Maximally:
- AWS Free Tier: $52.85/month (just fixed networking costs)
- Vercel Free: $0/month
- GitHub Actions Free: $0/month

Total: $52.85/month
```

### Phase 3-4: Beta Testing (Months 7-12)
```typescript
Add Production Environment:
- Keep free tier for beta
- Add production RDS: +$45/month
- Stay on Vercel free: $0/month

Total: $97.85/month
```

### Phase 5+: Production (Months 13+)
```typescript
Post-Free-Tier:
- Full AWS costs: $149.50/month
- Upgrade to Vercel Pro: +$20/month

Total: $169.50/month
```

## 🔍 Why the High Fixed Component?

### The NAT Gateway Problem
```typescript
// NAT Gateway is the biggest fixed cost at $45/month
// It's needed for Lambda to access RDS in private subnets

// Why it's expensive:
- AWS charges $0.045/hour (24/7) = $32.40/month
- Plus $0.045 per GB processed = ~$12/month additional
- Total: ~$45/month regardless of usage
```

### Database Fixed Costs
```typescript
// RDS instances run 24/7 even if unused
db.t3.micro: $15.33/month (720 hours × $0.0213/hour)
db.t3.small: $30.66/month (720 hours × $0.0426/hour)

// This is different from Lambda which only charges per execution
```

## 💰 Final Recommendation

### Start Minimal (Year 1)
```typescript
Months 1-12: $72.85/month (optimized architecture)
- Use RDS Proxy instead of NAT Gateway
- Leverage AWS free tier fully
- Use Vercel free tier
- Public GitHub repo (free Actions)

Year 1 Total: $874
```

### Scale When Needed
```typescript
Months 13+: $125/month
- Post free tier costs
- Still using optimized architecture
- Upgrade to Vercel Pro when team grows

Much more reasonable than the original $206/month estimate!
``` 