# MTB Wiki - Concept & Vision

## The Problem We're Solving

While Trailforks and MTB Project excel at mapping trails, there's a gap in the market for **discovery and curation**. When you visit a new area, you need more than just a map - you need local knowledge, curated routes, and insights about what makes each system special.

## Core Concept

MTB Wiki is a **discovery platform** for mountain bikers that answers questions like:
- "I have 3 days in Colorado, where should I ride?"
- "What are the must-do routes at Whistler for an intermediate rider?"
- "I love technical riding - which systems should be on my bucket list?"
- "What's the local's secret at this trail system?"

## Key Differentiators

### 1. **Systems-First Approach**
Instead of focusing on individual trails, we organize by trail systems/bike parks. Each system has:
- Overall character ratings (XC vs DH vs Flow, etc.)
- Seasonal information
- Hidden gems and local tips
- Things to avoid

### 2. **Curated Routes**
Pre-planned combinations of trails that create specific experiences:
- "The Classic Flow Experience"
- "Technical Challenge Loop"
- "Scenic All-Day Epic"
- "Quick After-Work Lap"

Each route includes:
- Exact trail sequence
- Time estimates
- What makes it special
- Best conditions

### 3. **Discovery Engine**
Help riders find their perfect destination based on:
- Travel dates and location
- Riding style preferences
- Skill and fitness level
- Group composition
- Available time

### 4. **Local Knowledge**
Capture the information that only locals know:
- "Park at the second lot to avoid crowds"
- "This trail is way better in reverse"
- "Hit this section in the afternoon when it's dry"
- "The burrito truck on Thursdays is legendary"

## Data Structure Highlights

### Systems
- Comprehensive overview of entire riding areas
- Ratings for different riding styles
- Facilities and amenities
- Best times to visit

### Routes
- Curated trail combinations
- Specific experiences (flow, tech, scenic, etc.)
- Detailed notes for each section
- Conditions and timing advice

### Trails
- Basic info (we're not trying to replace Trailforks)
- Character and feature tags
- Signature features
- Local names and tips

## Use Cases

### Planning a Trip
"I'm visiting Sedona for 4 days in October. I'm an intermediate rider who loves technical challenges but my partner prefers flow trails. What should we ride?"

**Wiki provides:**
- System overview with October conditions
- 2-3 routes perfect for mixed abilities
- Daily itinerary suggestions
- Local tips for accommodations and food

### Discovering New Systems
"I love the tech at Squamish. Where else should I ride?"

**Wiki provides:**
- Systems with similar technical ratings
- Comparison of rock types and features
- Best seasons for each location
- Hidden gems at each system

### Local Exploration
"I live near Bend but feel like I'm riding the same trails. What am I missing?"

**Wiki provides:**
- Lesser-known routes
- Seasonal variations
- Different ways to link familiar trails
- New zones to explore

## Future Features

### Phase 1 (Current Focus)
- Core data structure
- Basic CRUD operations
- Simple discovery queries
- Admin interface for data entry

### Phase 2
- User accounts and contributions
- Verification system for local contributors
- Photo uploads
- GPX route files

### Phase 3
- Mobile app
- Integration with Strava/Trailforks
- Weather integration
- Community features

### Phase 4
- AI-powered recommendations
- Trip planning tools
- Gear recommendations
- Local guide connections

## Technical Approach

- **TypeScript** for type safety
- **SQLite** for simple data storage initially
- **Express** for API
- **React** for future frontend
- **Zod** for validation

## Success Metrics

- Quality over quantity of systems
- Depth of local knowledge captured
- Usefulness of route curation
- Discovery success rate

## Not Competing With

- **Trailforks**: We're not mapping trails or GPS tracking
- **MTB Project**: We're not crowd-sourcing trail conditions
- **Strava**: We're not about performance tracking

## Complementing Existing Tools

- Link to Trailforks for detailed maps
- Reference Strava segments for timing
- Connect to local bike shops and guides
- Integrate weather and conditions from other sources

## The Vision

Become the go-to resource for mountain bikers who want to discover new places to ride and make the most of their time when they get there. Think of it as the "Lonely Planet for Mountain Bikers" - focused on experiences, local knowledge, and helping riders find their perfect adventure. 