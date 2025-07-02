import { System, Route, Trail } from '../types/models';

// Example: Whistler Bike Park
export const whistlerSystem: System = {
  id: 'sys_whistler_bike_park',
  name: 'Whistler Bike Park',
  location: {
    country: 'Canada',
    state_province: 'British Columbia',
    city: 'Whistler',
    coordinates: {
      lat: 50.1163,
      lng: -122.9574
    }
  },
  description: 'The world\'s premier lift-accessed mountain bike park with over 80 trails and 1,500m of vertical.',
  overview: 'Whistler Bike Park is the gold standard for lift-accessed mountain biking, offering everything from beginner-friendly green trails to world-cup downhill tracks.',
  
  characteristics: {
    size: 'massive',
    elevation_gain: 1500,
    trail_count: 80,
    season: {
      typical_open: 'May',
      typical_close: 'October',
      best_months: ['July', 'August', 'September']
    },
    facilities: ['bike_shop', 'rentals', 'lessons', 'lift_access', 'lodging', 'restaurants'],
    access_fee: true,
    parking: 'Large paid lots at base. Arrive early on weekends or park in town and ride up.'
  },
  
  riding_styles: {
    cross_country: 1, // Not really an XC destination
    trail: 4,
    enduro: 5,
    downhill: 5,
    jump_flow: 5
  },
  
  beginner_friendly: 4,
  intermediate_options: 5,
  advanced_terrain: 5,
  
  hidden_gems: [
    'Top of the World trail offers alpine riding unlike anywhere else in the park',
    'Early season has amazing conditions with fewer crowds',
    'The skills centers are free and perfect for warming up'
  ],
  
  local_tips: [
    'Download the Whistler app for real-time trail status',
    'Ride Garbanzo zone in the afternoon when Fitzsimmons side gets busy',
    'Book lessons early in your trip to maximize improvement'
  ],
  
  avoid: [
    'Don\'t jump into black trails on day 1 - the park is more challenging than most',
    'Avoid weekends in July/August if possible',
    'Don\'t forget arm pump is real - pace yourself'
  ],
  
  links: {
    official_website: 'https://www.whistlerblackcomb.com/explore-the-resort/activities/bike-park',
    trailforks: 'https://www.trailforks.com/region/whistler-mountain-bike-park/',
    instagram: '@whistlerbikepark'
  },
  
  created_at: new Date(),
  updated_at: new Date()
};

// Example Route: Classic Whistler Flow
export const classicFlowRoute: Route = {
  id: 'route_classic_flow',
  system_id: 'sys_whistler_bike_park',
  name: 'Classic Whistler Flow',
  tagline: 'The perfect introduction to world-class bike park flow',
  description: 'This route combines Whistler\'s most iconic flow trails for an unforgettable descent. Perfect for intermediate riders looking to experience what makes Whistler special.',
  
  distance_km: 12,
  elevation_gain_m: 100, // Minor climbing between lifts
  estimated_time_hours: 3,
  difficulty: 'blue',
  type: 'lift_assisted',
  
  highlights: [
    'Endless berms and rollers',
    'Multiple jump lines (all with ride-arounds)',
    'Stunning mountain views',
    'Variety of trail characters'
  ],
  
  best_for: ['flow_seeking', 'skill_building', 'scenic_ride'],
  
  trail_sequence: [
    { trail_id: 'trail_ez_does_it', notes: 'Warm up on this gentle green' },
    { trail_id: 'trail_b_line', notes: 'Start getting into the flow' },
    { trail_id: 'trail_crank_it_up', notes: 'Time to start jumping (or rolling)' },
    { trail_id: 'trail_blue_velvet', notes: 'The quintessential Whistler flow trail' },
    { trail_id: 'trail_ninja_cougar', notes: 'Technical option if you want variety' }
  ],
  
  conditions: {
    best_season: ['July', 'August', 'September'],
    avoid_when: ['wet', 'opening_week'],
    time_of_day: 'Morning for shortest lift lines'
  },
  
  rider_type: ['flow_seeker', 'intermediate_progression'],
  fitness_required: 'low',
  technical_skills: 'intermediate',
  
  local_rating: 4.8,
  visitor_rating: 4.9,
  must_do: true,
  
  created_at: new Date(),
  updated_at: new Date()
};

// Example Trail: Blue Velvet
export const blueVelvetTrail: Trail = {
  id: 'trail_blue_velvet',
  system_id: 'sys_whistler_bike_park',
  name: 'Blue Velvet',
  description: 'The crown jewel of Whistler\'s flow trails. Machine-built perfection with endless berms, rollers, and optional jumps.',
  
  length_km: 3.2,
  elevation_change_m: -380,
  avg_grade_percent: -12,
  max_grade_percent: -18,
  
  difficulty: 'blue',
  direction: 'downhill_only',
  trail_type: 'singletrack',
  
  character_tags: ['smooth', 'flowy', 'bermy', 'jumpy', 'fast'],
  feature_tags: ['berms', 'jumps', 'tables', 'rollers'],
  
  signature_features: [
    'The "Blue Velvet" hip jump at the top',
    'The mega-berm halfway down',
    'Final jump line into the village'
  ],
  
  local_name: 'Blue V',
  
  maintenance_status: 'well_maintained',
  last_maintenance: new Date('2024-06-15'),
  
  trailforks_id: '12345',
  strava_segment_id: '67890',
  
  created_at: new Date(),
  updated_at: new Date()
};

// Example: Sedona as a discovery destination
export const sedonaSystem: System = {
  id: 'sys_sedona',
  name: 'Sedona Trail System',
  location: {
    country: 'USA',
    state_province: 'Arizona',
    city: 'Sedona',
    coordinates: {
      lat: 34.8697,
      lng: -111.7610
    }
  },
  description: 'Red rock paradise offering unique high-desert riding with stunning scenery and technical challenges.',
  overview: 'Sedona combines breathtaking red rock scenery with challenging technical terrain, making it a bucket-list destination for mountain bikers seeking both beauty and adventure.',
  
  characteristics: {
    size: 'large',
    elevation_gain: 800,
    trail_count: 200,
    season: {
      typical_open: 'Year-round',
      typical_close: 'Never',
      best_months: ['October', 'November', 'March', 'April']
    },
    facilities: ['bike_shop', 'rentals', 'guides', 'camping', 'lodging'],
    access_fee: false,
    parking: 'Multiple trailheads, some require Red Rock Pass ($5/day)'
  },
  
  riding_styles: {
    cross_country: 5,
    trail: 5,
    enduro: 3,
    downhill: 1,
    jump_flow: 2
  },
  
  beginner_friendly: 3,
  intermediate_options: 5,
  advanced_terrain: 5,
  
  hidden_gems: [
    'The Hogs trails offer Sedona tech without the crowds',
    'Sunset rides paint the rocks in incredible colors',
    'Link rides with swimming holes in Oak Creek'
  ],
  
  local_tips: [
    'Start early to beat heat and crowds',
    'Tubeless is essential - lots of thorns',
    'Don\'t miss the views from Highline trail',
    'Check VVCC website for trail conditions'
  ],
  
  avoid: [
    'Riding in summer midday heat (100°F+)',
    'Underestimating water needs',
    'Wet conditions make rock extremely slippery'
  ],
  
  links: {
    official_website: 'https://www.visitsedona.com/mountain-biking',
    trailforks: 'https://www.trailforks.com/region/sedona/',
    instagram: '@sedonamtb'
  },
  
  created_at: new Date(),
  updated_at: new Date()
}; 