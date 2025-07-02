// Core entities for the MTB Wiki

/**
 * A System represents a mountain biking area/park/network
 * Examples: Whistler Bike Park, Kingdom Trails, Moab
 */
export interface System {
  id: string;
  name: string;
  location: {
    country: string;
    state_province: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  overview: string; // What makes this system special
  
  // Key characteristics for discovery
  characteristics: {
    size: 'small' | 'medium' | 'large' | 'massive'; // Based on total trail length
    elevation_gain: number; // Total vert in meters
    trail_count: number;
    season: {
      typical_open: string; // e.g., "May"
      typical_close: string; // e.g., "October"
      best_months: string[]; // e.g., ["July", "August", "September"]
    };
    facilities: string[]; // ["bike_shop", "rentals", "lessons", "lift_access", "camping", "lodging"]
    access_fee: boolean;
    parking: string; // Description of parking situation
  };
  
  // What type of riding is this system known for
  riding_styles: {
    cross_country: number; // 0-5 rating of how good it is for XC
    trail: number; // 0-5 for trail/all-mountain
    enduro: number; // 0-5 for enduro
    downhill: number; // 0-5 for DH
    jump_flow: number; // 0-5 for flow trails and jumps
  };
  
  // Rider level recommendations
  beginner_friendly: number; // 0-5 how good for beginners
  intermediate_options: number; // 0-5 variety for intermediates
  advanced_terrain: number; // 0-5 quality of advanced terrain
  
  // Discovery features
  hidden_gems: string[]; // Lesser known aspects worth highlighting
  local_tips: string[]; // Insider knowledge
  avoid: string[]; // Common mistakes or things to avoid
  
  // Links and references
  links: {
    official_website?: string;
    trailforks?: string;
    mtb_project?: string;
    instagram?: string;
  };
  
  created_at: Date;
  updated_at: Date;
}

/**
 * A Route is a curated combination of trails that creates a specific experience
 * This is key for discovery - helping riders find the right adventure
 */
export interface Route {
  id: string;
  system_id: string;
  name: string;
  tagline: string; // Quick description like "Epic all-day adventure" or "Quick lunch lap"
  description: string;
  
  // Route characteristics
  distance_km: number;
  elevation_gain_m: number;
  estimated_time_hours: number;
  difficulty: 'green' | 'blue' | 'black' | 'double_black';
  type: 'loop' | 'point_to_point' | 'out_and_back' | 'lift_assisted';
  
  // What makes this route special
  highlights: string[]; // ["Stunning views", "Technical rock gardens", "Flow for days"]
  best_for: string[]; // ["fitness_challenge", "scenic_ride", "technical_skills", "flow_seeking"]
  
  // Detailed trail sequence
  trail_sequence: {
    trail_id: string;
    direction?: 'normal' | 'reverse'; // Some trails can be ridden both ways
    notes?: string; // Specific notes for this section
  }[];
  
  // Conditions and timing
  conditions: {
    best_season: string[];
    avoid_when: string[]; // ["wet", "crowded_weekends", "hunting_season"]
    time_of_day: string; // "Morning for shade" or "Afternoon for dry conditions"
  };
  
  // Discovery metadata
  rider_type: string[]; // ["enduro_enthusiast", "xc_fitness", "technical_rider", "flow_seeker"]
  fitness_required: 'low' | 'moderate' | 'high' | 'very_high';
  technical_skills: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  
  // User-generated content
  local_rating: number; // 1-5 stars from locals
  visitor_rating: number; // 1-5 stars from visitors
  must_do: boolean; // Is this a "must do" route at this system?
  
  created_at: Date;
  updated_at: Date;
}

/**
 * Individual trail information
 * Less detailed than Trailforks since that's not our focus
 */
export interface Trail {
  id: string;
  system_id: string;
  name: string;
  description: string;
  
  // Basic stats
  length_km: number;
  elevation_change_m: number; // Positive for climbs, negative for descents
  avg_grade_percent: number;
  max_grade_percent: number;
  
  // Classification
  difficulty: 'green' | 'blue' | 'black' | 'double_black';
  direction: 'both' | 'downhill_only' | 'uphill_preferred' | 'one_way';
  trail_type: 'singletrack' | 'doubletrack' | 'fire_road' | 'paved';
  
  // Character tags for discovery
  character_tags: string[]; // ["rocky", "rooty", "smooth", "flowy", "technical", "steep", "exposure"]
  feature_tags: string[]; // ["jumps", "drops", "berms", "rock_gardens", "skinnies", "gap_jumps"]
  
  // What this trail is known for
  signature_features: string[]; // ["The whale tail jump", "Vista point at km 3"]
  local_name?: string; // What locals actually call it
  
  // Maintenance and status
  maintenance_status: 'well_maintained' | 'moderate' | 'primitive' | 'unmaintained';
  last_maintenance?: Date;
  
  // Integration with other systems
  trailforks_id?: string;
  strava_segment_id?: string;
  
  created_at: Date;
  updated_at: Date;
}

/**
 * User contributions and discovery aids
 */
export interface RiderProfile {
  // What kind of rider are you?
  style_preferences: {
    cross_country: number; // 0-5
    trail_allmountain: number; // 0-5
    enduro: number; // 0-5
    downhill: number; // 0-5
    jump_flow: number; // 0-5
  };
  
  skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  fitness_level: 'low' | 'moderate' | 'high' | 'very_high';
  
  // Preferences for discovery
  prefers: string[]; // ["technical_challenges", "scenic_views", "flow_trails", "jumps", "long_climbs"]
  avoids: string[]; // ["exposure", "hike_a_bike", "crowds", "lift_lines"]
}

/**
 * Discovery features - help riders find what they're looking for
 */
export interface DiscoveryQuery {
  location?: {
    near_coordinates?: { lat: number; lng: number; radius_km: number };
    country?: string;
    state_province?: string;
  };
  
  trip_parameters?: {
    days_available: number;
    fitness_level: 'low' | 'moderate' | 'high' | 'very_high';
    skill_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    group_type: 'solo' | 'couple' | 'friends' | 'family' | 'mixed_abilities';
  };
  
  looking_for?: {
    riding_styles: string[]; // ["enduro", "xc", "flow"]
    must_have: string[]; // ["lift_access", "camping", "beginner_options"]
    nice_to_have: string[]; // ["bike_shop", "brewery_nearby", "swimming"]
  };
  
  season?: {
    month: string;
    flexible: boolean;
  };
}

/**
 * Recommendations engine output
 */
export interface SystemRecommendation {
  system: System;
  match_score: number; // 0-100
  match_reasons: string[]; // ["Perfect for your skill level", "Great enduro trails", "Available in October"]
  suggested_routes: Route[]; // Top 3-5 routes for this visitor
  insider_tips: string[]; // Specific tips for this visitor profile
  estimated_days_needed: number; // To ride the suggested routes
}

/**
 * Content that helps with discovery
 */
export interface GuideArticle {
  id: string;
  title: string;
  type: 'system_guide' | 'route_beta' | 'seasonal_update' | 'gear_tips' | 'local_scene';
  system_id?: string;
  route_ids?: string[];
  
  content: string; // Markdown
  key_takeaways: string[]; // Bullet points for quick scanning
  
  author: string;
  local_contributor: boolean; // Is this from a local rider?
  
  created_at: Date;
  updated_at: Date;
}

/**
 * Seasonal conditions and updates
 */
export interface ConditionUpdate {
  id: string;
  system_id: string;
  trail_ids?: string[]; // Specific trails affected, if applicable
  
  condition_type: 'trail_status' | 'weather_impact' | 'seasonal_closure' | 'maintenance' | 'event';
  severity: 'info' | 'caution' | 'warning' | 'closure';
  
  title: string;
  description: string;
  
  effective_date: Date;
  expiry_date?: Date;
  
  created_at: Date;
  created_by: string; // Who reported this
  verified: boolean; // Has this been verified by a local contributor?
} 