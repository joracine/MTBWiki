/**
 * Seed data for enumeration tables
 * This data will be inserted into the database during initial setup
 */

import {
  Country, StateProvince, Region, DifficultyRating, RegionalCalibration,
  CharacterTag, SystemSize, TrailDirection, RouteType, RidingStyle,
  SkillLevel, FitnessLevel, Month, Condition, ContentType, Severity, UpdateType
} from '../types/normalized-models';

export const COUNTRIES: Country[] = [
  { id: 'usa', name: 'United States', code: 'US' },
  { id: 'canada', name: 'Canada', code: 'CA' },
  { id: 'uk', name: 'United Kingdom', code: 'GB' },
  { id: 'france', name: 'France', code: 'FR' },
  { id: 'switzerland', name: 'Switzerland', code: 'CH' },
  { id: 'austria', name: 'Austria', code: 'AT' },
  { id: 'australia', name: 'Australia', code: 'AU' },
  { id: 'new-zealand', name: 'New Zealand', code: 'NZ' },
  { id: 'chile', name: 'Chile', code: 'CL' },
];

export const STATE_PROVINCES: StateProvince[] = [
  // USA States
  { id: 'california', country_id: 'usa', name: 'California', code: 'CA' },
  { id: 'washington', country_id: 'usa', name: 'Washington', code: 'WA' },
  { id: 'oregon', country_id: 'usa', name: 'Oregon', code: 'OR' },
  { id: 'colorado', country_id: 'usa', name: 'Colorado', code: 'CO' },
  { id: 'utah', country_id: 'usa', name: 'Utah', code: 'UT' },
  { id: 'arizona', country_id: 'usa', name: 'Arizona', code: 'AZ' },
  { id: 'north-carolina', country_id: 'usa', name: 'North Carolina', code: 'NC' },
  { id: 'vermont', country_id: 'usa', name: 'Vermont', code: 'VT' },
  { id: 'montana', country_id: 'usa', name: 'Montana', code: 'MT' },
  { id: 'idaho', country_id: 'usa', name: 'Idaho', code: 'ID' },
  
  // Canadian Provinces
  { id: 'british-columbia', country_id: 'canada', name: 'British Columbia', code: 'BC' },
  { id: 'alberta', country_id: 'canada', name: 'Alberta', code: 'AB' },
  { id: 'quebec', country_id: 'canada', name: 'Quebec', code: 'QC' },
  { id: 'ontario', country_id: 'canada', name: 'Ontario', code: 'ON' },
];

export const REGIONS: Region[] = [
  {
    id: 'pacific-northwest',
    name: 'Pacific Northwest',
    description: 'Wet climate, technical terrain, old growth forests',
    typical_features: ['roots', 'rocks', 'steep', 'wet', 'technical'],
    climate_type: 'temperate_rainforest'
  },
  {
    id: 'southwest-desert',
    name: 'Southwest Desert',
    description: 'Dry climate, slickrock, exposure, big views',
    typical_features: ['slickrock', 'exposure', 'dry', 'scenic', 'technical'],
    climate_type: 'desert'
  },
  {
    id: 'rocky-mountains',
    name: 'Rocky Mountains',
    description: 'High altitude, alpine terrain, seasonal access',
    typical_features: ['alpine', 'rocks', 'exposure', 'seasonal', 'scenic'],
    climate_type: 'alpine'
  },
  {
    id: 'appalachian',
    name: 'Appalachian',
    description: 'Eastern mountains, hardwood forests, technical climbing',
    typical_features: ['roots', 'rocks', 'steep', 'humid', 'technical'],
    climate_type: 'temperate_deciduous'
  },
  {
    id: 'california-coastal',
    name: 'California Coastal',
    description: 'Mediterranean climate, diverse terrain, year-round riding',
    typical_features: ['diverse', 'dry_summers', 'fire_roads', 'singletrack'],
    climate_type: 'mediterranean'
  },
];

export const DIFFICULTY_RATINGS: DifficultyRating[] = [
  {
    id: 'green',
    name: 'green',
    display_name: 'Green Circle',
    numeric_value: 1,
    description: 'Beginner friendly, wide trails, gentle grades'
  },
  {
    id: 'blue',
    name: 'blue',
    display_name: 'Blue Square',
    numeric_value: 2,
    description: 'Intermediate, some technical features, moderate grades'
  },
  {
    id: 'black',
    name: 'black',
    display_name: 'Black Diamond',
    numeric_value: 3,
    description: 'Advanced, technical features, steep grades'
  },
  {
    id: 'double-black',
    name: 'double_black',
    display_name: 'Double Black Diamond',
    numeric_value: 4,
    description: 'Expert only, very technical, severe consequences'
  },
];

export const REGIONAL_CALIBRATIONS: RegionalCalibration[] = [
  {
    id: 'softer',
    name: 'softer_than_typical',
    display_name: 'Softer than Typical',
    adjustment_factor: -0.5,
    description: 'Easier than the rating suggests for this region'
  },
  {
    id: 'typical',
    name: 'typical',
    display_name: 'Typical',
    adjustment_factor: 0,
    description: 'Standard difficulty for the rating'
  },
  {
    id: 'harder',
    name: 'harder_than_typical',
    display_name: 'Harder than Typical',
    adjustment_factor: 0.5,
    description: 'More difficult than the rating suggests for this region'
  },
];

export const CHARACTER_TAGS: CharacterTag[] = [
  // Surface characteristics
  { id: 'rooty', name: 'rooty', category: 'surface', description: 'Lots of tree roots', icon: '🌳' },
  { id: 'rocky', name: 'rocky', category: 'surface', description: 'Rock gardens and stone features', icon: '🪨' },
  { id: 'loamy', name: 'loamy', category: 'surface', description: 'Soft, grippy dirt', icon: '🏔️' },
  { id: 'sandy', name: 'sandy', category: 'surface', description: 'Sand and loose dirt', icon: '🏖️' },
  { id: 'slickrock', name: 'slickrock', category: 'surface', description: 'Smooth sandstone', icon: '🏜️' },
  
  // Terrain characteristics
  { id: 'steep', name: 'steep', category: 'terrain', description: 'Significant grades', icon: '⛰️' },
  { id: 'rolling', name: 'rolling', category: 'terrain', description: 'Gentle ups and downs', icon: '🌊' },
  { id: 'flat', name: 'flat', category: 'terrain', description: 'Minimal elevation change', icon: '➡️' },
  { id: 'switchbacks', name: 'switchbacks', category: 'terrain', description: 'Tight turns on climbs/descents', icon: '🔄' },
  
  // Features
  { id: 'flowy', name: 'flowy', category: 'features', description: 'Smooth, continuous riding', icon: '🌊' },
  { id: 'technical', name: 'technical', category: 'features', description: 'Requires advanced bike handling', icon: '⚙️' },
  { id: 'jumps', name: 'jumps', category: 'features', description: 'Built jump features', icon: '🚀' },
  { id: 'drops', name: 'drops', category: 'features', description: 'Vertical drop features', icon: '⬇️' },
  { id: 'berms', name: 'berms', category: 'features', description: 'Banked turns', icon: '🏁' },
  { id: 'wooden-features', name: 'wooden_features', category: 'features', description: 'Bridges, skinnies, etc.', icon: '🌉' },
  
  // Exposure
  { id: 'exposed', name: 'exposed', category: 'exposure', description: 'Significant fall consequences', icon: '⚠️' },
  { id: 'sheltered', name: 'sheltered', category: 'exposure', description: 'Protected from weather/falls', icon: '🏠' },
  
  // Scenery
  { id: 'scenic', name: 'scenic', category: 'scenery', description: 'Outstanding views', icon: '🏞️' },
  { id: 'forest', name: 'forest', category: 'scenery', description: 'Dense tree cover', icon: '🌲' },
  { id: 'desert', name: 'desert', category: 'scenery', description: 'Arid landscape', icon: '🌵' },
  { id: 'alpine', name: 'alpine', category: 'scenery', description: 'High mountain environment', icon: '🏔️' },
];

export const SYSTEM_SIZES: SystemSize[] = [
  {
    id: 'local-gem',
    name: 'local_gem',
    display_name: 'Local Gem',
    typical_trail_count: { min: 5, max: 20 },
    typical_days_needed: { min: 1, max: 1 },
    description: 'Small local network, half-day to full-day riding'
  },
  {
    id: 'weekend-trip',
    name: 'weekend_trip',
    display_name: 'Weekend Trip',
    typical_trail_count: { min: 15, max: 50 },
    typical_days_needed: { min: 2, max: 3 },
    description: 'Worth a weekend trip, multiple days of riding'
  },
  {
    id: 'destination',
    name: 'destination',
    display_name: 'Destination',
    typical_trail_count: { min: 40, max: 150 },
    typical_days_needed: { min: 4, max: 7 },
    description: 'Major destination, week-long trips possible'
  },
  {
    id: 'world-class',
    name: 'world_class',
    display_name: 'World Class',
    typical_trail_count: { min: 100, max: 500 },
    typical_days_needed: { min: 7, max: 14 },
    description: 'World-renowned, multiple weeks of riding'
  },
];

export const TRAIL_DIRECTIONS: TrailDirection[] = [
  {
    id: 'both',
    name: 'both',
    display_name: 'Both Directions',
    description: 'Can be ridden up or down comfortably'
  },
  {
    id: 'up-preferred',
    name: 'up_preferred',
    display_name: 'Up Preferred',
    description: 'Better as a climb, but can be descended'
  },
  {
    id: 'down-only',
    name: 'down_only',
    display_name: 'Down Only',
    description: 'Designed for descending only'
  },
  {
    id: 'one-way',
    name: 'one_way',
    display_name: 'One Way',
    description: 'Traffic flows in one direction only'
  },
];

export const ROUTE_TYPES: RouteType[] = [
  {
    id: 'loop',
    name: 'loop',
    display_name: 'Loop',
    description: 'Returns to starting point',
    typical_logistics: ['Single parking area', 'No shuttle needed']
  },
  {
    id: 'out-back',
    name: 'out_back',
    display_name: 'Out and Back',
    description: 'Ride out, turn around, ride back',
    typical_logistics: ['Single parking area', 'Retrace route']
  },
  {
    id: 'point-to-point',
    name: 'point_to_point',
    display_name: 'Point to Point',
    description: 'Start and end at different locations',
    typical_logistics: ['Two vehicles or shuttle', 'Different start/end']
  },
  {
    id: 'shuttle',
    name: 'shuttle',
    display_name: 'Shuttle',
    description: 'Vehicle shuttle to top, ride down',
    typical_logistics: ['Shuttle service or second vehicle', 'Mostly descending']
  },
  {
    id: 'lift-laps',
    name: 'lift_laps',
    display_name: 'Lift Laps',
    description: 'Use chairlift for uphill',
    typical_logistics: ['Bike park with lift', 'Day pass required']
  },
];

export const RIDING_STYLES: RidingStyle[] = [
  {
    id: 'xc',
    name: 'xc',
    display_name: 'Cross Country',
    description: 'Emphasis on climbing and endurance',
    typical_features: ['climbing', 'endurance', 'efficiency']
  },
  {
    id: 'trail',
    name: 'trail',
    display_name: 'Trail',
    description: 'Balanced climbing and descending',
    typical_features: ['balanced', 'versatile', 'moderate_technical']
  },
  {
    id: 'enduro',
    name: 'enduro',
    display_name: 'Enduro',
    description: 'Emphasis on technical descending',
    typical_features: ['descending', 'technical', 'aggressive']
  },
  {
    id: 'dh',
    name: 'dh',
    display_name: 'Downhill',
    description: 'Pure descending, lift or shuttle access',
    typical_features: ['descending_only', 'very_technical', 'speed']
  },
  {
    id: 'flow',
    name: 'flow',
    display_name: 'Flow',
    description: 'Smooth, continuous riding with rhythm',
    typical_features: ['smooth', 'berms', 'jumps', 'rhythm']
  },
];

export const SKILL_LEVELS: SkillLevel[] = [
  {
    id: 'learning',
    name: 'learning',
    display_name: 'Learning',
    numeric_value: 1,
    description: 'New to mountain biking or building basic skills',
    typical_experience: 'Less than 1 year, green trails comfortable'
  },
  {
    id: 'comfortable',
    name: 'comfortable',
    display_name: 'Comfortable',
    numeric_value: 2,
    description: 'Solid fundamentals, ready for new challenges',
    typical_experience: '1-3 years, blue trails comfortable'
  },
  {
    id: 'challenging',
    name: 'challenging',
    display_name: 'Challenging',
    numeric_value: 3,
    description: 'Advanced skills, seeking technical challenges',
    typical_experience: '3+ years, black trails comfortable'
  },
  {
    id: 'expert',
    name: 'expert',
    display_name: 'Expert',
    numeric_value: 4,
    description: 'Exceptional skills, riding the most difficult terrain',
    typical_experience: '5+ years, double black comfortable'
  },
];

export const FITNESS_LEVELS: FitnessLevel[] = [
  {
    id: 'casual',
    name: 'casual',
    display_name: 'Casual',
    numeric_value: 1,
    description: 'Recreational fitness, prefer shorter rides',
    typical_distance_km: { min: 5, max: 15 }
  },
  {
    id: 'fit',
    name: 'fit',
    display_name: 'Fit',
    numeric_value: 2,
    description: 'Good cardiovascular fitness, moderate distances',
    typical_distance_km: { min: 15, max: 30 }
  },
  {
    id: 'very-fit',
    name: 'very_fit',
    display_name: 'Very Fit',
    numeric_value: 3,
    description: 'High fitness level, long rides comfortable',
    typical_distance_km: { min: 25, max: 50 }
  },
  {
    id: 'athlete',
    name: 'athlete',
    display_name: 'Athlete',
    numeric_value: 4,
    description: 'Exceptional fitness, ultra-distance capable',
    typical_distance_km: { min: 40, max: 100 }
  },
];

export const MONTHS: Month[] = [
  { id: 'january', name: 'january', display_name: 'January', numeric_value: 1, season: 'winter' },
  { id: 'february', name: 'february', display_name: 'February', numeric_value: 2, season: 'winter' },
  { id: 'march', name: 'march', display_name: 'March', numeric_value: 3, season: 'spring' },
  { id: 'april', name: 'april', display_name: 'April', numeric_value: 4, season: 'spring' },
  { id: 'may', name: 'may', display_name: 'May', numeric_value: 5, season: 'spring' },
  { id: 'june', name: 'june', display_name: 'June', numeric_value: 6, season: 'summer' },
  { id: 'july', name: 'july', display_name: 'July', numeric_value: 7, season: 'summer' },
  { id: 'august', name: 'august', display_name: 'August', numeric_value: 8, season: 'summer' },
  { id: 'september', name: 'september', display_name: 'September', numeric_value: 9, season: 'fall' },
  { id: 'october', name: 'october', display_name: 'October', numeric_value: 10, season: 'fall' },
  { id: 'november', name: 'november', display_name: 'November', numeric_value: 11, season: 'fall' },
  { id: 'december', name: 'december', display_name: 'December', numeric_value: 12, season: 'winter' },
];

export const CONDITIONS: Condition[] = [
  // Weather conditions
  { id: 'dry', name: 'dry', category: 'weather', is_positive: true, description: 'Dry conditions, good traction' },
  { id: 'wet', name: 'wet', category: 'weather', is_positive: false, description: 'Wet conditions, slippery' },
  { id: 'muddy', name: 'muddy', category: 'weather', is_positive: false, description: 'Muddy trails, poor traction' },
  { id: 'icy', name: 'icy', category: 'weather', is_positive: false, description: 'Ice on trails, dangerous' },
  { id: 'snowy', name: 'snowy', category: 'weather', is_positive: false, description: 'Snow covered trails' },
  
  // Trail surface conditions
  { id: 'tacky', name: 'tacky', category: 'trail_surface', is_positive: true, description: 'Perfect grip, slightly moist' },
  { id: 'dusty', name: 'dusty', category: 'trail_surface', is_positive: false, description: 'Dusty, loose surface' },
  { id: 'hardpack', name: 'hardpack', category: 'trail_surface', is_positive: true, description: 'Firm, fast surface' },
  { id: 'loose', name: 'loose', category: 'trail_surface', is_positive: false, description: 'Loose surface, poor traction' },
  
  // Seasonal conditions
  { id: 'spring-conditions', name: 'spring_conditions', category: 'seasonal', is_positive: true, description: 'Fresh spring conditions' },
  { id: 'summer-heat', name: 'summer_heat', category: 'seasonal', is_positive: false, description: 'Hot summer conditions' },
  { id: 'fall-colors', name: 'fall_colors', category: 'seasonal', is_positive: true, description: 'Beautiful fall foliage' },
  { id: 'winter-closure', name: 'winter_closure', category: 'seasonal', is_positive: false, description: 'Closed for winter' },
];

export const CONTENT_TYPES: ContentType[] = [
  {
    id: 'system-overview',
    name: 'system_overview',
    display_name: 'System Overview',
    description: 'General information about a trail system',
    typical_length: '500-1000 words'
  },
  {
    id: 'route-guide',
    name: 'route_guide',
    display_name: 'Route Guide',
    description: 'Detailed guide for a specific route',
    typical_length: '300-800 words'
  },
  {
    id: 'skills-progression',
    name: 'skills_progression',
    display_name: 'Skills Progression',
    description: 'How to progress skills at this location',
    typical_length: '400-600 words'
  },
  {
    id: 'seasonal-tips',
    name: 'seasonal_tips',
    display_name: 'Seasonal Tips',
    description: 'Best practices for different seasons',
    typical_length: '200-400 words'
  },
];

export const SEVERITIES: Severity[] = [
  {
    id: 'info',
    name: 'info',
    display_name: 'Info',
    numeric_value: 1,
    color_code: '#3B82F6',
    description: 'General information, nice to know'
  },
  {
    id: 'important',
    name: 'important',
    display_name: 'Important',
    numeric_value: 2,
    color_code: '#F59E0B',
    description: 'Important information, affects trip planning'
  },
  {
    id: 'critical',
    name: 'critical',
    display_name: 'Critical',
    numeric_value: 3,
    color_code: '#EF4444',
    description: 'Critical information, safety or access concerns'
  },
];

export const UPDATE_TYPES: UpdateType[] = [
  {
    id: 'conditions',
    name: 'conditions',
    display_name: 'Trail Conditions',
    category: 'trail_status',
    description: 'Current trail conditions and surface quality'
  },
  {
    id: 'closures',
    name: 'closures',
    display_name: 'Closures',
    category: 'access',
    description: 'Trail or area closures'
  },
  {
    id: 'new-trails',
    name: 'new_trails',
    display_name: 'New Trails',
    category: 'infrastructure',
    description: 'New trail openings or construction'
  },
  {
    id: 'events',
    name: 'events',
    display_name: 'Events',
    category: 'community',
    description: 'Races, group rides, or other events'
  },
  {
    id: 'access-changes',
    name: 'access_changes',
    display_name: 'Access Changes',
    category: 'access',
    description: 'Changes to parking, permits, or access rules'
  },
];

// Export all seed data as a single object for easy importing
export const ENUMERATION_SEED_DATA = {
  countries: COUNTRIES,
  stateProvinces: STATE_PROVINCES,
  regions: REGIONS,
  difficultyRatings: DIFFICULTY_RATINGS,
  regionalCalibrations: REGIONAL_CALIBRATIONS,
  characterTags: CHARACTER_TAGS,
  systemSizes: SYSTEM_SIZES,
  trailDirections: TRAIL_DIRECTIONS,
  routeTypes: ROUTE_TYPES,
  ridingStyles: RIDING_STYLES,
  skillLevels: SKILL_LEVELS,
  fitnessLevels: FITNESS_LEVELS,
  months: MONTHS,
  conditions: CONDITIONS,
  contentTypes: CONTENT_TYPES,
  severities: SEVERITIES,
  updateTypes: UPDATE_TYPES,
}; 