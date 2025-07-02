// Simplified MTB Wiki Models - Focus on Commentary & Regional Context

/**
 * Regional difficulty calibration - how this region rates trails
 */
export interface RegionalContext {
  difficulty_calibration: 'very_soft' | 'soft' | 'standard' | 'hard' | 'very_hard';
  typical_trail_character: string; // "Rooty and rocky tech" or "Smooth and flowy"
  common_features: string[]; // ["granite slabs", "root lattices", "moon dust", "hero dirt"]
  elevation_profile: 'punchy_rollers' | 'sustained_climbs' | 'lift_assisted' | 'mixed';
  weather_impact: string; // "Rides great in wet" or "Avoid when wet - becomes ice"
}

/**
 * Nuanced difficulty ratings - what Trailforks lacks
 */
export interface DifficultyRatings {
  // Technical climbing difficulty (think NV/UT punch-ups)
  xc_technical: {
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    notes: string; // "Frequent punch-ups over boulders"
  };
  
  // Natural technical descending (PNW roots/rocks)
  descent_technical: {
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    notes: string; // "Wet roots and off-camber rock rolls"
  };
  
  // Flow/jump/built features difficulty
  flow_jump: {
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    notes: string; // "Large gap jumps, no ride-arounds"
  };
  
  // Physical demands
  fitness_demands: {
    rating: 'low' | 'moderate' | 'high' | 'extreme';
    vertical_gain_m: number;
    sustained_climbing_km?: number;
  };
  
  // Overall rating in regional context
  regional_rating: 'green' | 'blue' | 'black' | 'double_black';
  comparable_to?: string; // "Like Porcupine Rim's technical sections"
}

/**
 * Simplified System - focus on what makes it unique
 */
export interface System {
  id: string;
  name: string;
  region: string; // "Pacific Northwest", "Southwest Desert", etc.
  location: {
    country: string;
    state_province: string;
    nearest_city: string;
    coordinates: { lat: number; lng: number };
  };
  
  // The personality of this system
  character_summary: string; // 2-3 sentences capturing the essence
  what_its_known_for: string[]; // ["Granite slabs", "Old-growth forest", "High alpine"]
  
  // Regional context
  regional_context: RegionalContext;
  
  // Quick stats (not duplicating Trailforks detail)
  size_scope: 'local_spot' | 'weekend_destination' | 'vacation_worthy' | 'world_class';
  trail_count_approx: string; // "50+", "100-200", etc.
  elevation_range_m: { low: number; high: number };
  
  // When to visit
  prime_season: string[]; // ["May", "June", "September"]
  avoid_season: string[]; // ["July-August (too hot)", "December-March (snow)"]
  
  // Discovery value-adds
  hidden_gems: string[]; // Things not obvious on Trailforks
  local_beta: string[]; // "North-facing trails stay cooler", "Afternoon winds help with climbs"
  common_mistakes: string[]; // "Don't start at main parking - it's a zoo"
  
  // Links out
  trailforks_region?: string;
  key_resources: { name: string; url: string }[]; // Local clubs, shops, etc.
  
  created_at: Date;
  updated_at: Date;
}

/**
 * Simplified Route - curated experiences with commentary
 */
export interface Route {
  id: string;
  system_id: string;
  name: string;
  tagline: string; // One-liner like "The perfect intro to PNW tech"
  
  // The story of this route
  description: string; // Why ride this specific combination?
  experience_notes: string[]; // ["Start early for hero dirt", "Save energy for final descent"]
  
  // Difficulty in context
  difficulty: DifficultyRatings;
  best_for: string[]; // ["technical_progression", "all_day_epic", "quick_rip"]
  not_great_for: string[]; // ["beginners", "rain_days", "tired_legs"]
  
  // Basic stats (not duplicating GPS data)
  distance_approx_km: string; // "25-30"
  time_estimate: string; // "3-4 hours"
  route_type: 'loop' | 'out_back' | 'point_to_point' | 'lift_laps';
  
  // The route itself (simplified)
  key_trails: {
    name: string;
    why_included: string; // "Best technical descent in the system"
    local_tips?: string; // "Take the left line through the rock garden"
  }[];
  
  // Conditions matter
  condition_sensitivity: 'bombproof' | 'weather_dependent' | 'very_sensitive';
  sweet_spot_conditions: string; // "2-3 days after rain"
  
  created_at: Date;
  updated_at: Date;
}

/**
 * Simplified Trail - only what adds value beyond Trailforks
 */
export interface Trail {
  id: string;
  system_id: string;
  name: string;
  
  // The commentary that matters
  local_take: string; // "Locals love this for evening laps"
  personality: string; // "Relentless tech fest" or "Smooth sailing with surprise features"
  
  // Difficulty breakdown
  difficulty: DifficultyRatings;
  signature_challenges: string[]; // ["The waterfall roll", "Endless baby heads"]
  
  // What Trailforks doesn't tell you
  beta: string[]; // ["Right line is easier on first rock face", "Momentum is key"]
  conditions_notes: string; // "Unrideable when wet" or "Better with some moisture"
  traffic_notes: string; // "Zoo on weekends" or "Hidden gem - always empty"
  
  // Quick reference
  direction_preference?: 'both_ways' | 'definitely_down' | 'definitely_up' | 'locals_go_up';
  pairs_well_with: string[]; // Other trail names
  
  trailforks_uri?: string; // Direct link to Trailforks page
}

/**
 * Comparison tool - help riders understand different regions
 */
export interface RegionalComparison {
  id: string;
  title: string; // "PNW vs Southwest: Understanding the Differences"
  regions_compared: string[];
  
  key_differences: {
    category: string; // "Technical Difficulty", "Climbing Style", "Trail Surface"
    comparison: string; // Explanation of differences
  }[];
  
  translation_guide: {
    feature: string; // "Black diamond in Sedona"
    equivalent: string; // "Blue in Squamish"
    explanation: string;
  }[];
}

/**
 * Seasonal intel - time-sensitive local knowledge
 */
export interface SeasonalIntel {
  id: string;
  system_id: string;
  date_relevant: Date;
  
  intel_type: 'conditions' | 'closures' | 'events' | 'construction' | 'wildlife';
  headline: string;
  details: string;
  
  affects_routes?: string[]; // Route IDs affected
  severity: 'fyi' | 'plan_around' | 'avoid';
  
  source: string; // "Local rider report" or "Official notice"
  verified: boolean;
}

/**
 * Discovery query - simplified
 */
export interface DiscoveryQuery {
  // Where and when
  location?: {
    near?: { lat: number; lng: number; max_distance_km: number };
    regions?: string[]; // ["Pacific Northwest", "Southwest"]
  };
  dates?: {
    month: string;
    flexible: boolean;
  };
  
  // What kind of riding
  riding_preferences?: {
    xc_technical?: boolean;
    descent_technical?: boolean;
    flow_jump?: boolean;
    big_mountain?: boolean;
    all_day_epics?: boolean;
  };
  
  // Rider context
  fitness_level?: 'weekend_warrior' | 'fit' | 'very_fit' | 'race_fit';
  technical_comfort?: 'learning' | 'comfortable' | 'confident' | 'expert';
  
  // Trip context
  trip_style?: 'sampling' | 'progression_focused' | 'adventure' | 'social';
  group_dynamic?: 'solo' | 'similar_abilities' | 'mixed_abilities';
}

/**
 * Simple recommendation
 */
export interface Recommendation {
  system: System;
  why_recommended: string[]; // ["Matches your technical preferences", "Perfect for October"]
  suggested_routes: {
    route: Route;
    why_this_route: string;
  }[];
  insider_tip: string; // One key piece of advice for this visitor
  comparable_to?: string; // "If you like Moab, you'll love this"
} 