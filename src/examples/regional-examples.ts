import { System, Route, Trail, RegionalComparison } from '../types/models-v2';

// Example: Squamish (PNW) - Hard regional rating, tech descents
export const squamishSystem: System = {
  id: 'sys_squamish',
  name: 'Squamish Trail Network',
  region: 'Pacific Northwest',
  location: {
    country: 'Canada',
    state_province: 'British Columbia',
    nearest_city: 'Squamish',
    coordinates: { lat: 49.7016, lng: -123.1558 }
  },
  
  character_summary: 'Ancient rainforest meets granite slabs. Squamish delivers world-class technical descents through mossy forests where a "blue" trail would be double-black anywhere else. Big sustained climbs lead to rowdy, rooty descents.',
  what_its_known_for: [
    'Granite rock slabs',
    'Wet root lattices', 
    'Old-growth forest atmosphere',
    'Technical difficulty that humbles everyone'
  ],
  
  regional_context: {
    difficulty_calibration: 'very_hard',
    typical_trail_character: 'Steep, rooty, rocky technical descents with exposure',
    common_features: ['granite slabs', 'root lattices', 'rock rolls', 'wooden features'],
    elevation_profile: 'sustained_climbs',
    weather_impact: 'Rideable in wet but becomes extremely challenging - roots like ice'
  },
  
  size_scope: 'vacation_worthy',
  trail_count_approx: '200+',
  elevation_range_m: { low: 50, high: 1500 },
  
  prime_season: ['June', 'July', 'August', 'September'],
  avoid_season: ['November-March (snow up high, very wet down low)'],
  
  hidden_gems: [
    'The Diamond Head area has easier trails perfect for building skills',
    'Early morning rides often have perfect tacky conditions',
    'Quest University trails are less crowded but equally good'
  ],
  
  local_beta: [
    'What locals call "blue" will shock riders from other regions',
    'Brakes heat up fast - consider larger rotors',
    'Knee pads are basically mandatory here'
  ],
  
  common_mistakes: [
    'Jumping straight onto Half Nelson thinking it\'s a normal blue',
    'Not bringing enough brake pads',
    'Underestimating the physical demands of the climbs'
  ],
  
  trailforks_region: 'https://www.trailforks.com/region/squamish/',
  key_resources: [
    { name: 'SORCA (trail association)', url: 'https://sorca.ca/' },
    { name: 'Tantalus Bike Shop', url: 'https://tantalusbike.com/' }
  ],
  
  created_at: new Date(),
  updated_at: new Date()
};

// Example: St. George, Utah - Punchy technical climbing
export const stGeorgeSystem: System = {
  id: 'sys_stgeorge',
  name: 'St. George Trail System',
  region: 'Southwest Desert',
  location: {
    country: 'USA',
    state_province: 'Utah',
    nearest_city: 'St. George',
    coordinates: { lat: 37.0965, lng: -113.5684 }
  },
  
  character_summary: 'Red rock desert riding where every climb is a technical puzzle. Short, punchy climbs over ledges and through boulder fields define the experience. What goes up must come down - usually over the same technical features.',
  what_its_known_for: [
    'Punchy technical climbing',
    'Slickrock and sandstone',
    'Year-round riding',
    'Ledgy, chunky terrain'
  ],
  
  regional_context: {
    difficulty_calibration: 'standard',
    typical_trail_character: 'Rocky, ledgy climbs and descents with exposure',
    common_features: ['sandstone ledges', 'loose decomposed granite', 'cryptobiotic soil', 'wash crossings'],
    elevation_profile: 'punchy_rollers',
    weather_impact: 'Avoid after rain - cryptobiotic soil damage and extremely slippery rock'
  },
  
  size_scope: 'vacation_worthy',
  trail_count_approx: '100+',
  elevation_range_m: { low: 800, high: 1400 },
  
  prime_season: ['October', 'November', 'February', 'March', 'April'],
  avoid_season: ['June-August (100°F+ temps)', 'December-January (can be cold/snowy)'],
  
  hidden_gems: [
    'Bearclaw Poppy trails are the best introduction to the area',
    'Hurricane Cliffs area stays cooler in shoulder season',
    'Santa Clara River Reserve has the most variety'
  ],
  
  local_beta: [
    'Start rides by 7am in shoulder season to beat heat',
    'Lower tire pressure helps with traction on slickrock',
    'Many trails are bidirectional but have preferred directions'
  ],
  
  common_mistakes: [
    'Not bringing enough water - desert dehydration is real',
    'Riding Zen Trail as your first ride (it\'s harder than it looks)',
    'Missing the early morning golden hour light'
  ],
  
  trailforks_region: 'https://www.trailforks.com/region/st-george/',
  key_resources: [
    { name: 'Red Rock Bicycle Co', url: 'https://redrockbicycle.com/' },
    { name: 'DMBTA (trail association)', url: 'https://www.dmbta.org/' }
  ],
  
  created_at: new Date(),
  updated_at: new Date()
};

// Example Route showing PNW technical descending
export const halfNelsonRoute: Route = {
  id: 'route_half_nelson_classic',
  system_id: 'sys_squamish',
  name: 'Half Nelson Classic',
  tagline: 'The PNW technical descent that defines Squamish',
  
  description: 'This isn\'t just a trail, it\'s a rite of passage. The climb up Word of Mouth builds anticipation (and leg burn) before dropping into Half Nelson - a relentless technical descent that will redefine your understanding of what a "blue" trail can be.',
  
  experience_notes: [
    'The climb is a grind but saves the best for last',
    'First-timers often walk multiple sections - that\'s normal',
    'Gets significantly harder when wet but locals still send it'
  ],
  
  difficulty: {
    xc_technical: {
      rating: 2,
      notes: 'Climb is mostly smooth with a few rocky sections'
    },
    descent_technical: {
      rating: 4,
      notes: 'Continuous roots, rocks, and tight trees - this is Squamish "blue"'
    },
    flow_jump: {
      rating: 1,
      notes: 'Not a flow trail - pure natural technical'
    },
    fitness_demands: {
      rating: 'moderate',
      vertical_gain_m: 400,
      sustained_climbing_km: 5
    },
    regional_rating: 'blue',
    comparable_to: 'Like a black diamond at most bike parks'
  },
  
  best_for: ['technical_progression', 'classic_must_do'],
  not_great_for: ['beginners', 'flow_seekers', 'tired_legs'],
  
  distance_approx_km: '12-14',
  time_estimate: '2-3 hours',
  route_type: 'loop',
  
  key_trails: [
    {
      name: 'Word of Mouth',
      why_included: 'The standard climbing route - steady and scenic',
      local_tips: 'Pace yourself, it\'s longer than it seems'
    },
    {
      name: 'Half Nelson',
      why_included: 'THE classic Squamish descent',
      local_tips: 'Commit to the lines - hesitation makes it harder'
    }
  ],
  
  condition_sensitivity: 'weather_dependent',
  sweet_spot_conditions: 'Tacky dirt after 1-2 dry days',
  
  created_at: new Date(),
  updated_at: new Date()
};

// Example Route showing Utah technical climbing
export const zenTrailRoute: Route = {
  id: 'route_zen_experience',
  system_id: 'sys_stgeorge',
  name: 'Zen Trail Experience',
  tagline: 'Technical climbing meditation in the desert',
  
  description: 'Zen Trail embodies St. George riding - seemingly impossible climbs that require perfect line choice, momentum, and a bit of trials skills. What looks unrideable becomes possible with practice and determination.',
  
  experience_notes: [
    'Don\'t be discouraged by early hike-a-bikes',
    'Watch locals for line choice through technical sections',
    'The views from the mesa top make the effort worthwhile'
  ],
  
  difficulty: {
    xc_technical: {
      rating: 5,
      notes: 'Repeated technical moves over ledges and through boulder gardens'
    },
    descent_technical: {
      rating: 4,
      notes: 'Same features going down - exposure adds to difficulty'
    },
    flow_jump: {
      rating: 0,
      notes: 'Zero flow - all natural technical challenges'
    },
    fitness_demands: {
      rating: 'high',
      vertical_gain_m: 300,
      sustained_climbing_km: 2
    },
    regional_rating: 'black',
    comparable_to: 'Trials riding meets cross-country'
  },
  
  best_for: ['technical_challenge', 'skill_building'],
  not_great_for: ['first_ride_in_area', 'flow_seekers', 'groups_with_varied_abilities'],
  
  distance_approx_km: '8-10',
  time_estimate: '2-3 hours',
  route_type: 'loop',
  
  key_trails: [
    {
      name: 'Zen Trail',
      why_included: 'The main event - technical climbing at its finest',
      local_tips: 'Lower tire pressure to 18-20 PSI for better grip'
    },
    {
      name: 'Bearclaw Poppy',
      why_included: 'A more reasonable descent option',
      local_tips: 'Still technical but more forgiving than descending Zen'
    }
  ],
  
  condition_sensitivity: 'very_sensitive',
  sweet_spot_conditions: 'Bone dry - any moisture makes rock treacherous',
  
  created_at: new Date(),
  updated_at: new Date()
};

// Regional Comparison Example
export const pnwVsSouthwestComparison: RegionalComparison = {
  id: 'comp_pnw_vs_southwest',
  title: 'PNW vs Southwest: Understanding the Differences',
  regions_compared: ['Pacific Northwest', 'Southwest Desert'],
  
  key_differences: [
    {
      category: 'Trail Difficulty Ratings',
      comparison: 'PNW rates trails much harder. A Squamish "blue" would be black or double-black in most other regions. Southwest tends to rate more accurately to global standards.'
    },
    {
      category: 'Climbing Style',
      comparison: 'PNW features long, sustained climbs on relatively smooth trails. Southwest has short, punchy, highly technical climbs requiring trials-like skills.'
    },
    {
      category: 'Descending Character',
      comparison: 'PNW descents are steep, rooty, and often wet with natural features. Southwest descents are rocky, ledgy, with exposure but typically dry.'
    },
    {
      category: 'Weather Impact',
      comparison: 'PNW trails are designed to handle rain but become very challenging. Southwest trails become dangerous when wet and should be avoided after rain.'
    },
    {
      category: 'Seasonal Riding',
      comparison: 'PNW prime season is summer/early fall. Southwest prime season is fall/winter/spring, avoiding extreme summer heat.'
    }
  ],
  
  translation_guide: [
    {
      feature: 'Squamish Blue Trail',
      equivalent: 'Black Diamond in Sedona',
      explanation: 'The technical difficulty and exposure on PNW blues exceeds most black ratings elsewhere'
    },
    {
      feature: 'Utah technical climb rating',
      equivalent: 'Add 1-2 levels for PNW',
      explanation: 'A rideable technical climb in Utah might be hike-a-bike in the PNW due to wet roots'
    },
    {
      feature: 'Southwest "chunky"',
      equivalent: 'PNW "rooty"',
      explanation: 'Different obstacles but similar technical demands - rocks vs roots'
    }
  ]
}; 