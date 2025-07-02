/**
 * Normalized Data Models for MTB Wiki
 * Using proper enumerations with foreign keys instead of free text
 */

// ENUMERATION TABLES - These become database tables with foreign key relationships

export interface Country {
  id: string;
  name: string;
  code: string; // ISO code
}

export interface StateProvince {
  id: string;
  country_id: string;
  name: string;
  code: string;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  typical_features: string[];
  climate_type: string;
}

export interface DifficultyRating {
  id: string;
  name: string; // "green", "blue", "black", "double_black"
  display_name: string; // "Green Circle", "Blue Square", etc.
  numeric_value: number; // 1, 2, 3, 4 for sorting
  description: string;
}

export interface RegionalCalibration {
  id: string;
  name: string; // "softer_than_typical", "typical", "harder_than_typical"
  display_name: string;
  adjustment_factor: number; // -0.5, 0, +0.5
  description: string;
}

export interface CharacterTag {
  id: string;
  name: string; // "rooty", "rocky", "flowy", "steep", "exposed"
  category: string; // "surface", "terrain", "features", "exposure"
  description: string;
  icon?: string;
}

export interface SystemSize {
  id: string;
  name: string; // "local_gem", "weekend_trip", "destination", "world_class"
  display_name: string;
  typical_trail_count: { min: number; max: number };
  typical_days_needed: { min: number; max: number };
  description: string;
}

export interface TrailDirection {
  id: string;
  name: string; // "both", "up_preferred", "down_only", "one_way"
  display_name: string;
  description: string;
}

export interface RouteType {
  id: string;
  name: string; // "loop", "out_back", "point_to_point", "shuttle", "lift_laps"
  display_name: string;
  description: string;
  typical_logistics: string[];
}

export interface RidingStyle {
  id: string;
  name: string; // "xc", "trail", "enduro", "dh", "flow"
  display_name: string; // "Cross Country", "Trail", etc.
  description: string;
  typical_features: string[];
}

export interface SkillLevel {
  id: string;
  name: string; // "learning", "comfortable", "challenging", "expert"
  display_name: string;
  numeric_value: number; // 1-4 for ordering
  description: string;
  typical_experience: string;
}

export interface FitnessLevel {
  id: string;
  name: string; // "casual", "fit", "very_fit", "athlete"
  display_name: string;
  numeric_value: number; // 1-4 for ordering
  description: string;
  typical_distance_km: { min: number; max: number };
}

export interface Month {
  id: string;
  name: string; // "january", "february", etc.
  display_name: string;
  numeric_value: number; // 1-12
  season: string; // "winter", "spring", "summer", "fall"
}

export interface Condition {
  id: string;
  name: string; // "dry", "wet", "dusty", "tacky", "icy", "muddy"
  category: string; // "weather", "trail_surface", "seasonal"
  is_positive: boolean; // true for good conditions, false for bad
  description: string;
}

export interface ContentType {
  id: string;
  name: string; // "system_overview", "route_guide", "skills_progression"
  display_name: string;
  description: string;
  typical_length: string;
}

export interface Severity {
  id: string;
  name: string; // "info", "important", "critical"
  display_name: string;
  numeric_value: number; // 1-3 for ordering
  color_code: string; // For UI
  description: string;
}

export interface UpdateType {
  id: string;
  name: string; // "conditions", "closures", "new_trails", "events"
  display_name: string;
  category: string;
  description: string;
}

// MAIN ENTITY MODELS - Now using foreign keys to enumerations

export interface DifficultyProfile {
  id: string;
  
  // Foreign keys to enumerations
  overall_rating_id: string; // -> DifficultyRating
  regional_calibration_id: string; // -> RegionalCalibration
  
  // Numeric scales (0-3)
  technical_climbing: number;
  technical_descending: number;
  flow_features: number;
  fitness_demand: number;
  
  // Comparison text (free text is OK here as it's descriptive)
  comparable_to?: string;
  
  // Many-to-many relationship with character tags
  character_tag_ids: string[]; // -> CharacterTag[]
}

export interface System {
  id: string;
  name: string;
  
  // Foreign keys for location
  region_id: string; // -> Region
  country_id: string; // -> Country
  state_province_id: string; // -> StateProvince
  city: string; // Free text OK - too many cities to enumerate
  coordinates: { lat: number; lng: number };
  
  // Descriptive content (free text OK)
  tagline: string;
  description: string;
  
  // Foreign keys for characteristics
  size_id: string; // -> SystemSize
  
  // Numeric data
  trail_count_estimate: number;
  vertical_range_m: { min: number; max: number };
  
  // Many-to-many relationships
  best_month_ids: string[]; // -> Month[]
  avoid_month_ids: string[]; // -> Month[]
  known_for_tag_ids: string[]; // -> CharacterTag[]
  good_for_skill_ids: string[]; // -> SkillLevel[]
  good_for_style_ids: string[]; // -> RidingStyle[]
  
  // Regional difficulty characteristics
  difficulty_calibration_id: string; // -> RegionalCalibration
  typical_feature_tag_ids: string[]; // -> CharacterTag[]
  climbing_style: string; // Could be enum but limited usage
  
  // Free text for local knowledge (appropriate as free text)
  insider_tips: string[];
  common_mistakes: string[];
  hidden_gems: string[];
  
  // External references
  external_links: {
    trailforks?: string;
    official_site?: string;
    local_org?: string;
  };
  
  created_at: Date;
  updated_at: Date;
}

export interface Route {
  id: string;
  system_id: string; // -> System
  
  // Identity
  name: string;
  tagline: string;
  purpose: string; // Free text - too varied to enumerate
  
  // Foreign keys
  difficulty_profile_id: string; // -> DifficultyProfile
  route_type_id: string; // -> RouteType
  
  // Measurements
  distance_km_min: number;
  distance_km_max: number;
  time_estimate_hours_min: number;
  time_estimate_hours_max: number;
  
  // Trail sequence (junction table)
  trail_sequence: RouteTrail[];
  
  // Many-to-many relationships
  best_condition_ids: string[]; // -> Condition[]
  avoid_condition_ids: string[]; // -> Condition[]
  ideal_for_skill_ids: string[]; // -> SkillLevel[]
  ideal_for_style_ids: string[]; // -> RidingStyle[]
  not_recommended_skill_ids: string[]; // -> SkillLevel[]
  
  // Free text for specific advice (appropriate)
  highlights: string[];
  pro_tips: string[];
  watch_out_for: string[];
  
  created_at: Date;
  updated_at: Date;
}

// Junction table for route-trail relationships
export interface RouteTrail {
  id: string;
  route_id: string; // -> Route
  trail_id: string; // -> Trail
  sequence_order: number;
  purpose: string; // "Warm-up climb", "Main descent" - free text OK
  notes?: string;
}

export interface Trail {
  id: string;
  system_id: string; // -> System
  name: string;
  
  // Foreign keys
  difficulty_profile_id: string; // -> DifficultyProfile
  direction_id: string; // -> TrailDirection
  
  // Measurements
  length_km?: number;
  
  // Descriptive (free text appropriate for personality)
  personality: string;
  signature_features: string[];
  local_name?: string;
  condition_notes?: string;
  
  // Many-to-many relationships
  pairs_well_with_trail_ids: string[]; // -> Trail[]
  
  // External reference
  trailforks_id?: string;
  
  created_at: Date;
  updated_at: Date;
}

export interface DiscoveryRequest {
  // Location
  location?: {
    near?: { lat: number; lng: number; radius_km: number };
    region_ids?: string[]; // -> Region[]
    system_ids?: string[]; // -> System[]
  };
  
  // Timing
  travel_month_id?: string; // -> Month
  flexible_timing?: boolean;
  
  // Preferences using foreign keys
  preferences?: {
    skill_level_id?: string; // -> SkillLevel
    fitness_level_id?: string; // -> FitnessLevel
    riding_style_ids?: string[]; // -> RidingStyle[]
    must_have_tag_ids?: string[]; // -> CharacterTag[]
    avoid_tag_ids?: string[]; // -> CharacterTag[]
  };
  
  // Trip context
  trip_length_days?: number;
  group_type: string; // Could be enum but limited usage
}

export interface DiscoveryResult {
  system: System;
  match_score: number;
  
  // Reasons (free text appropriate)
  match_reasons: string[];
  potential_concerns: string[];
  
  // Suggested routes
  suggested_routes: {
    route: Route;
    why_suggested: string;
    day_recommendation?: number;
  }[];
  
  // Trip planning (free text appropriate)
  trip_planning: {
    recommended_days: number;
    best_base_location?: string;
    key_logistics: string[];
  };
  
  local_advice: string;
  timing_notes?: string;
}

export interface UserPreferences {
  user_id: string;
  
  // Background
  years_riding: number;
  home_region_id?: string; // -> Region
  favorite_system_ids: string[]; // -> System[]
  
  // Learned preferences using foreign keys
  preferred_difficulty_profile_id: string; // -> DifficultyProfile
  preferred_skill_level_id: string; // -> SkillLevel
  preferred_fitness_level_id: string; // -> FitnessLevel
  preferred_style_ids: string[]; // -> RidingStyle[]
  
  // Numeric preferences (0-1 scale)
  style_preferences: {
    technical_climbing: number;
    technical_descending: number;
    flow_features: number;
    fitness_challenges: number;
  };
  
  // Trip preferences
  trip_style: string; // Could be enum
  group_dynamic: string; // Could be enum
  
  // Learned dislikes
  avoid_feature_tag_ids: string[]; // -> CharacterTag[]
  avoid_condition_ids: string[]; // -> Condition[]
  
  updated_at: Date;
}

export interface Guide {
  id: string;
  content_type_id: string; // -> ContentType
  system_id: string; // -> System
  route_id?: string; // -> Route
  
  title: string;
  summary: string;
  content: string; // Markdown
  
  // Quick reference
  key_takeaways: string[];
  target_skill_level_id: string; // -> SkillLevel
  
  // Attribution
  author_id: string;
  author_credibility: number;
  
  // Quality metrics
  peer_reviews: number;
  avg_rating: number;
  helpful_votes: number;
  
  created_at: Date;
  updated_at: Date;
  last_verified: Date;
}

export interface Update {
  id: string;
  system_id: string; // -> System
  
  // Foreign keys
  update_type_id: string; // -> UpdateType
  severity_id: string; // -> Severity
  
  title: string;
  summary: string;
  details?: string;
  
  // Relationships
  affected_route_ids?: string[]; // -> Route[]
  valid_until?: Date;
  
  // Verification
  reported_by: string;
  verified: boolean;
  verification_count: number;
  
  created_at: Date;
}

// JUNCTION TABLES for many-to-many relationships

export interface SystemCharacterTag {
  system_id: string;
  character_tag_id: string;
}

export interface SystemMonth {
  system_id: string;
  month_id: string;
  relationship_type: 'best' | 'avoid';
}

export interface RouteCondition {
  route_id: string;
  condition_id: string;
  relationship_type: 'best' | 'avoid';
}

export interface RouteSkillLevel {
  route_id: string;
  skill_level_id: string;
  relationship_type: 'ideal' | 'not_recommended';
}

export interface UserPreferenceStyle {
  user_id: string;
  riding_style_id: string;
  preference_strength: number; // 0-1
}

/**
 * SEED DATA TYPES - For populating enumeration tables
 */

export interface EnumerationSeedData {
  countries: Country[];
  stateProvinces: StateProvince[];
  regions: Region[];
  difficultyRatings: DifficultyRating[];
  regionalCalibrations: RegionalCalibration[];
  characterTags: CharacterTag[];
  systemSizes: SystemSize[];
  trailDirections: TrailDirection[];
  routeTypes: RouteType[];
  ridingStyles: RidingStyle[];
  skillLevels: SkillLevel[];
  fitnessLevels: FitnessLevel[];
  months: Month[];
  conditions: Condition[];
  contentTypes: ContentType[];
  severities: Severity[];
  updateTypes: UpdateType[];
} 