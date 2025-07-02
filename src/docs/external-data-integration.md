# Trailforks Integration Possibilities

## Official API Status

Trailforks does have an official API, but it requires:
- Valid `app_id` and `app_secret` 
- Application approval from Trailforks
- Compliance with their terms of service

## What Data Could Be Accessed

Based on the PyForks library (unofficial Python wrapper), the API likely provides access to:

### Basic Trail Data
- Trail names and IDs
- Basic statistics (length, elevation, difficulty)
- GPS coordinates
- Trail status/conditions
- Region hierarchies

### What's Likely NOT Available
- User-specific ride data
- Personal statistics
- Private/unpublished trails
- Detailed GPS tracks (may be limited)

## Integration Strategies for MTB Wiki

### 1. **Reference Linking (Simplest)**
```typescript
interface Trail {
  // ... our data
  trailforks_id?: string; // Just store the ID
  trailforks_uri?: string; // Direct link to Trailforks page
}
```
- ✅ No API needed
- ✅ Respects Trailforks' data
- ✅ Easy to implement
- ❌ No automatic data sync

### 2. **Basic Data Import (With API)**
```typescript
// One-time import to bootstrap your data
async function importTrailforksBasics(regionId: string) {
  const tfData = await trailforksAPI.getRegion(regionId);
  
  // Import only what we need
  return {
    trail_count_approx: tfData.trails.length,
    elevation_range: tfData.elevation_stats,
    // Don't duplicate their core data
  };
}
```
- ✅ Helps bootstrap new regions
- ✅ Keeps data minimal
- ⚠️ Requires API access
- ❌ Potential ToS issues

### 3. **User Account Linking**
```typescript
interface UserProfile {
  trailforks_username?: string;
  // Could potentially verify they've ridden certain trails
  // But this data is likely not available via API
}
```
- ⚠️ Unlikely to get user-specific data
- ❌ Privacy concerns
- ❌ Probably outside API scope

### 4. **Hybrid Approach (Recommended)**
```typescript
interface System {
  // Our unique data
  regional_context: RegionalContext;
  hidden_gems: string[];
  local_beta: string[];
  
  // Reference to Trailforks
  trailforks_region?: string; // Just the URL/ID
  
  // Cached basic stats (updated occasionally)
  stats_from_tf?: {
    trail_count: number;
    last_updated: Date;
    // Only non-competitive data
  };
}
```

## Legal and Ethical Considerations

### Respect Trailforks' Business Model
- They monetize through ads and Trailforks Pro
- Don't replicate their core features
- Always attribute data sources

### Terms of Service Compliance
- API usage must follow their ToS
- Can't scrape if API access is denied
- Must respect rate limits

### Community Relations
- Position as complementary, not competitive
- Consider reaching out to Trailforks team
- Highlight how you drive traffic TO them

## Recommended Implementation Path

### Phase 1: Manual References
- Just store Trailforks IDs/URLs
- Link out to their pages
- No API needed

### Phase 2: Community Verification
- Users can confirm "this is trail X on Trailforks"
- Build mapping organically
- Still no API needed

### Phase 3: Optional API Integration
- IF you get API access
- Only import minimal data
- Focus on your unique value adds

## Alternative Data Sources

### OpenStreetMap
- Fully open data
- Good trail geometry
- Less MTB-specific metadata

### Strava Heatmaps
- Shows popular routes
- No API needed for viewing
- Good for discovering unmarked trails

### Local Trail Associations
- Often happy to share data
- More accurate local info
- Building relationships helps

## Code Example: Simple Integration

```typescript
// Simple Trailforks reference system
interface TrailforksReference {
  type: 'trail' | 'region' | 'route';
  id: string;
  url: string;
  last_verified?: Date;
}

// In your models
interface System {
  // ... your unique data
  
  external_refs: {
    trailforks?: TrailforksReference;
    mtb_project?: string;
    strava?: string;
    local_association?: string;
  };
}

// Helper to generate Trailforks URLs
function getTrailforksUrl(type: string, id: string): string {
  const baseUrl = 'https://www.trailforks.com';
  switch(type) {
    case 'region':
      return `${baseUrl}/region/${id}`;
    case 'trail':
      return `${baseUrl}/trails/${id}`;
    default:
      return baseUrl;
  }
}
```

## Conclusion

While Trailforks API integration is technically possible, the most practical approach is to:

1. **Start with simple URL references**
2. **Focus on your unique value** (local knowledge, curation, regional context)
3. **Drive traffic TO Trailforks** rather than away from it
4. **Consider API integration later** if it adds real value

Remember: Your strength is in the commentary, local knowledge, and curation that Trailforks doesn't provide. The integration should enhance that, not try to replicate what they already do well. 