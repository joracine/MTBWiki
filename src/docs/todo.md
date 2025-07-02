# MTB Wiki - TODO & Future Features

## 🏆 Trust Algorithm Development

### Local Verification Methods
- **Geographic Verification**: Cross-reference claimed local areas with activity data from Strava/Garmin
- **Ride Frequency Analysis**: Users who consistently ride in claimed local areas over months/years
- **Local Knowledge Testing**: Quiz on local trail names, conditions, seasonal patterns
- **Photo Verification**: Require photos from claimed local areas with metadata verification
- **Local Business Verification**: Partnerships with local bike shops to verify customers
- **Trail Association Membership**: Integration with local trail organizations
- **Event Participation**: Verification through local race/event participation
- **Social Proof**: Mutual verification by other verified locals

### Multi-Platform Data Integration
- **Strava Integration**: 
  - Activity location patterns
  - Segment leaderboards (locals often on local segments)
  - Kudos patterns from other locals
  - Club memberships (local MTB clubs)
- **Garmin Connect**: 
  - Activity consistency
  - Training patterns
  - Device usage patterns
- **Apple Health/Google Fit**: 
  - General activity levels
  - Consistency indicators
- **Komoot**: Route planning patterns
- **AllTrails**: Review patterns and local knowledge
- **Instagram/Social**: Geotagged posts from claimed areas

### Trust Score Calculation Ideas
```typescript
interface TrustFactors {
  // Geographic consistency (40% weight)
  location_consistency: number; // Activities match claimed local areas
  area_expertise_depth: number; // Deep knowledge of specific systems
  
  // Community validation (30% weight)
  peer_vouches: number; // Other verified locals vouch for them
  contribution_quality: number; // Peer review scores
  fact_check_accuracy: number; // Claims verified by others
  
  // Platform verification (20% weight)
  verified_accounts: number; // Strava, Garmin, etc.
  account_longevity: number; // Established accounts vs new
  cross_platform_consistency: number; // Same person across platforms
  
  // Behavioral indicators (10% weight)
  response_to_feedback: number; // How they handle corrections
  edit_quality: number; // Constructive vs destructive edits
  seasonal_knowledge: number; // Understanding of seasonal changes
}
```

### Advanced Verification Techniques
- **Ride Pattern Analysis**: Locals have different riding patterns than tourists
- **Weather Correlation**: Local knowledge of how conditions affect trails
- **Time-of-Day Patterns**: Locals know best times to ride different trails
- **Route Optimization**: Locals know efficient ways to link trails
- **Hazard Awareness**: Knowledge of specific dangerous sections/conditions
- **Access Knowledge**: Parking, permits, seasonal closures
- **Cultural Knowledge**: Local riding etiquette, unwritten rules

## 👥 Contributor Data Model

### User Profile System
```typescript
interface ContributorProfile {
  // Basic info
  user_id: string;
  display_name: string;
  bio: string;
  location: string;
  
  // Riding profile
  riding_since: Date;
  preferred_styles: string[];
  bike_types: string[];
  
  // Local areas of expertise
  local_systems: {
    system_id: string;
    claimed_local: boolean;
    verified_local: boolean;
    years_riding_here: number;
    expertise_level: 'novice' | 'intermediate' | 'expert' | 'authority';
  }[];
  
  // Contribution history
  guides_authored: number;
  routes_created: number;
  reviews_given: number;
  media_contributed: number;
  
  // Trust metrics
  trust_score: number;
  verification_level: 'unverified' | 'basic' | 'verified' | 'trusted' | 'expert';
  
  // External connections
  connected_accounts: ConnectedAccount[];
}
```

### Contribution Tracking
- **Quality Metrics**: Track accuracy of contributions over time
- **Specialization Areas**: What types of content they're best at
- **Improvement Tracking**: How their contributions get better
- **Mentorship**: Experienced contributors helping newcomers
- **Recognition System**: Badges, levels, special privileges

## 🔐 Authentication & Account Linking

### OAuth Integration Priority List
1. **Strava** (highest priority)
   - Rich activity data
   - Location patterns
   - Social connections
   - Segment participation
   
2. **Garmin Connect**
   - Device data authenticity
   - Training consistency
   - Route history
   
3. **Trailforks**
   - Profile verification
   - Contribution history reference
   - Local area claims
   
4. **Apple Health/Google Fit**
   - General activity validation
   - Consistency metrics
   
5. **Komoot**
   - Route planning patterns
   - Local knowledge indicators

### Authentication Architecture
```typescript
interface AuthenticationSystem {
  // Primary account
  mtb_wiki_account: {
    user_id: string;
    email: string;
    password_hash: string;
    created_at: Date;
  };
  
  // Linked accounts
  oauth_connections: {
    provider: 'strava' | 'garmin' | 'trailforks' | 'apple' | 'google';
    external_id: string;
    access_token: string; // Encrypted
    refresh_token: string; // Encrypted
    scope: string[];
    connected_at: Date;
    last_sync: Date;
    sync_enabled: boolean;
  }[];
  
  // Verification status
  verification: {
    email_verified: boolean;
    phone_verified: boolean;
    identity_verified: boolean; // Through external accounts
  };
}
```

### Data Sync Strategy
- **Activity Import**: Sync recent activities to verify location claims
- **Privacy Controls**: Users control what data is imported/visible
- **Data Retention**: Clear policies on how long external data is kept
- **Consent Management**: Granular permissions for different data types

## 🎯 Core Data Model Improvements

### System Model Enhancements
- **Difficulty Calibration Matrix**: More nuanced regional comparisons
- **Seasonal Variation Tracking**: How systems change throughout the year
- **Crowd Level Indicators**: Peak times, busy seasons
- **Access Complexity**: Permits, fees, restrictions

### Route Model Improvements
- **Dynamic Difficulty**: Routes that change based on conditions
- **Alternative Variations**: Different ways to ride the same basic route
- **Skill Progression Tracking**: Routes that build on each other
- **Group Ride Optimization**: Routes good for different group dynamics

### Trail Model Refinements
- **Micro-Conditions**: How small sections ride differently
- **Maintenance Dependencies**: Trails that need more/less maintenance
- **Usage Patterns**: When different trails get ridden most
- **Interconnection Quality**: How well trails link together

## 🚀 Implementation Phases

### Phase 1: Foundation (Current)
- ✅ Core data models
- ✅ Basic content types
- ⏳ Simple trust system
- ⏳ Manual verification

### Phase 2: Authentication & Linking
- OAuth integration with Strava
- Basic activity import
- Cross-platform verification
- Enhanced trust scoring

### Phase 3: Advanced Trust
- Multi-platform data correlation
- Behavioral pattern analysis
- Community vouching system
- Local business partnerships

### Phase 4: Intelligence
- AI-powered content quality assessment
- Automated local verification hints
- Predictive content recommendations
- Advanced fraud detection

## 📊 Analytics & Insights

### Trust Score Analytics
- Track trust score accuracy over time
- Identify patterns in high-quality contributors
- Detect gaming attempts
- Optimize algorithm weights

### Content Quality Metrics
- Correlation between trust scores and content quality
- Most effective verification methods
- Regional differences in contribution patterns
- Seasonal variations in content accuracy

### Platform Integration Effectiveness
- Which connected accounts provide best verification signals
- Data quality from different sources
- User privacy concerns and opt-out rates
- ROI of different integration efforts

## 🔒 Privacy & Security Considerations

### Data Protection
- Minimal data collection principles
- Clear consent for each data type
- Regular data purging policies
- User control over data sharing

### Trust Score Transparency
- Users can see their trust score breakdown
- Clear explanation of factors
- Appeal process for disputed scores
- Regular algorithm audits

### External Data Handling
- Encrypted storage of OAuth tokens
- Secure API communication
- Rate limiting and abuse prevention
- Compliance with platform ToS 