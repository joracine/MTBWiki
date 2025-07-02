// Refined Core Models - Focus on MVP and Practical Implementation

/**
 * Simplified difficulty rating that's intuitive to users
 */
export interface DifficultyProfile {
  // Overall rating in regional context
  overall_rating: 'green' | 'blue' | 'black' | 'double_black';
  regional_context: 'softer_than_typical' | 'typical' | 'harder_than_typical';
  
  // Key characteristics (0-3 scale for simplicity)
  technical_climbing: 0 | 1 | 2 | 3; // How technical are the climbs?
  technical_descending: 0 | 1 | 2 | 3; // How technical are the descents?
  flow_features: 0 | 1 | 2 | 3; // Jumps, berms, built features
  fitness_demand: 0 | 1 | 2 | 3; // Physical difficulty
  
  // Quick descriptor for character
  character_tags: string[]; // ["rooty", "rocky", "flowy", "steep", "exposed"]
  
  // Comparison to help calibrate expectations
  comparable_to?: string; // "Like Porcupine Rim but with more exposure"
}

/**
 * Core System model - focused on discovery and character
 */
export interface System {
  id: string;
  name: string;
  region: string; // "Pacific Northwest", "Southwest Desert"
  
  // Location
  location: {
    country: string;
    state_province: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  
  // The essence - what makes this place special
  tagline: string; // "Technical PNW playground" or "Desert slickrock paradise"
  description: string; // 2-3 paragraphs
  known_for: string[]; // ["Granite slabs", "Old growth forest", "Epic views"]
  
  // Practical info
  size: 'local_gem' | 'weekend_trip' | 'destination' | 'world_class';
  trail_count: string; // "50+", "100-200" - approximate is fine
  vertical_range_m: { min: number; max: number };
  
  // When to visit
  best_months: string[];
  avoid_months: string[];
  
  // Regional character
  difficulty_style: {
    calibration: 'easy' | 'standard' | 'hard' | 'very_hard';
    typical_features: string[]; // ["roots", "rocks", "exposure", "flow"]
    climbing_style: 'sustained' | 'punchy' | 'mixed' | 'lift_assisted';
  };
  
  // Discovery helpers
  good_for: string[]; // ["beginners", "tech_lovers", "fitness_training", "scenic_rides"]
  not_ideal_for: string[]; // ["first_timers", "wet_conditions", "crowds"]
  
  // Local knowledge
  insider_tips: string[];
  common_mistakes: string[];
  hidden_gems: string[];
  
  // References
  external_links: {
    trailforks?: string;
    official_site?: string;
    local_org?: string;
  };
  
  created_at: Date;
  updated_at: Date;
}

/**
 * Route - curated trail combinations with clear purpose
 */
export interface Route {
  id: string;
  system_id: string;
  
  // Identity
  name: string;
  tagline: string; // "Classic flow introduction" or "Epic technical challenge"
  purpose: string; // Why ride this specific combination?
  
  // Characteristics
  difficulty: DifficultyProfile;
  distance_km: string; // "15-18" - ranges are fine
  time_estimate: string; // "2-3 hours"
  type: 'loop' | 'out_back' | 'point_to_point' | 'shuttle' | 'lift_laps';
  
  // The experience
  highlights: string[]; // What makes this route special
  trail_sequence: {
    trail_name: string;
    purpose: string; // "Warm-up climb" or "Main technical descent"
    notes?: string; // Specific tips for this section
  }[];
  
  // Practical considerations
  best_conditions: string; // "Dry", "Tacky after rain", "Any conditions"
  avoid_when: string[]; // ["Wet", "Crowded weekends", "Too hot"]
  
  // Who should ride this
  ideal_for: string[];
  not_recommended_for: string[];
  
  // Local intel
  pro_tips: string[];
  watch_out_for: string[];
  
  created_at: Date;
  updated_at: Date;
}

/**
 * Trail - minimal info, focused on what's unique
 */
export interface Trail {
  id: string;
  system_id: string;
  name: string;
  
  // Basic character
  difficulty: DifficultyProfile;
  length_km?: number; // Optional - not always needed
  direction: 'both' | 'up_preferred' | 'down_only' | 'one_way';
  
  // What makes it special
  personality: string; // "Relentless tech fest" or "Flowy cruise"
  signature_features: string[]; // ["The rock garden", "Big air jump line"]
  
  // Practical notes
  local_name?: string; // What locals call it
  pairs_well_with: string[]; // Other trail names
  condition_notes?: string; // "Avoid when wet" or "Better with some dust"
  
  // Reference
  trailforks_id?: string;
  
  created_at: Date;
  updated_at: Date;
}

/**
 * Simplified discovery - focus on the most important filters
 */
export interface DiscoveryRequest {
  // Where
  location?: {
    near?: { lat: number; lng: number; radius_km: number };
    regions?: string[];
    specific_systems?: string[];
  };
  
  // When
  travel_month?: string;
  flexible_timing?: boolean;
  
  // What kind of riding
  preferences?: {
    technical_level?: 'learning' | 'comfortable' | 'challenging' | 'expert';
    fitness_level?: 'casual' | 'fit' | 'very_fit' | 'athlete';
    riding_style?: ('xc' | 'trail' | 'enduro' | 'dh' | 'flow')[];
    must_have?: string[]; // ["beginner_options", "lift_access", "camping"]
    avoid?: string[]; // ["crowds", "exposure", "wet_conditions"]
  };
  
  // Trip context
  trip_length?: number; // Days available
  group_type?: 'solo' | 'couple' | 'friends' | 'family' | 'mixed_skills';
}

/**
 * Discovery response - actionable recommendations
 */
export interface DiscoveryResult {
  system: System;
  match_score: number; // 0-100
  
  // Why this system fits
  match_reasons: string[];
  potential_concerns: string[];
  
  // Specific recommendations
  suggested_routes: {
    route: Route;
    why_suggested: string;
    day_recommendation?: number; // Which day of trip
  }[];
  
  // Practical advice
  trip_planning: {
    recommended_days: number;
    best_base_location?: string;
    key_logistics: string[];
  };
  
  // Insider knowledge
  local_advice: string;
  timing_notes?: string;
}

/**
 * User preferences - build over time to improve recommendations
 */
export interface UserPreferences {
  user_id: string;
  
  // Riding background
  years_riding: number;
  home_region?: string;
  favorite_systems: string[]; // System IDs they've loved
  
  // Preferences learned from behavior
  preferred_difficulty: DifficultyProfile;
  style_preferences: {
    technical_climbing: number; // 0-1 how much they enjoy it
    technical_descending: number;
    flow_features: number;
    fitness_challenges: number;
  };
  
  // Practical preferences
  trip_style: 'sampling' | 'deep_dive' | 'progression' | 'social';
  group_dynamic: 'solo' | 'partner' | 'group' | 'varies';
  
  // Learned dislikes
  avoid_features: string[];
  avoid_conditions: string[];
  
  updated_at: Date;
}

/**
 * Simple content for guides and tips
 */
export interface Guide {
  id: string;
  type: 'system_overview' | 'route_guide' | 'skills_progression' | 'seasonal_tips';
  system_id: string;
  route_id?: string;
  
  title: string;
  summary: string;
  content: string; // Markdown
  
  // Quick reference
  key_takeaways: string[];
  target_audience: 'beginners' | 'intermediates' | 'advanced' | 'all';
  
  // Attribution
  author_id: string;
  author_credibility: number; // 0-100
  
  // Quality
  peer_reviews: number;
  avg_rating: number;
  helpful_votes: number;
  
  created_at: Date;
  updated_at: Date;
  last_verified: Date;
} 