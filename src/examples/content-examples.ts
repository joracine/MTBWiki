import { Guide, Media, LocalCredibility, Review, SeasonalUpdate } from '../types/content-models';

// Example: Local credibility for guide author
export const squamishLocalSarah: LocalCredibility = {
  user_id: 'user_123',
  system_id: 'sys_squamish',
  
  indicators: {
    claimed_local: true,
    verified_local: true,
    years_riding_here: 12,
    contributions_count: 47,
    contribution_quality_avg: 91
  },
  
  expertise_tags: ['technical_trails', 'beginner_progression', 'seasonal_conditions'],
  
  verified_by: [
    {
      user_id: 'user_admin_1',
      verification_note: 'Confirmed local - works at Tantalus Bike Shop',
      date: new Date('2023-05-20')
    },
    {
      user_id: 'user_456',
      verification_note: 'Ride with Sarah regularly, definitely knows her stuff',
      date: new Date('2023-06-15')
    }
  ],
  
  reputation_score: 95,
  trusted_contributor: true
};

// Example: Peer review of the guide
export const squamishGuideReview: Review = {
  id: 'review_001',
  content_type: 'guide',
  content_id: 'guide_squamish_first_timer',
  
  reviewer: {
    user_id: 'user_789',
    display_name: 'Mike Thompson',
    credibility: {
      user_id: 'user_789',
      system_id: 'sys_squamish',
      indicators: {
        claimed_local: false,
        verified_local: false,
        years_riding_here: 3,
        contributions_count: 12,
        contribution_quality_avg: 88
      },
      expertise_tags: ['technical_trails'],
      reputation_score: 75,
      trusted_contributor: false
    }
  },
  
  accuracy_rating: 5,
  completeness_rating: 5,
  clarity_rating: 5,
  
  feedback: {
    what_works: [
      'Perfect progression advice - wish I had this my first visit',
      'The gear recommendations are spot on',
      'Love the honesty about trail ratings'
    ],
    needs_improvement: [
      'Could mention parking strategies for busy weekends'
    ],
    factual_corrections: []
  },
  
  personally_verified: true,
  last_ridden_date: new Date('2024-09-15'),
  
  created_at: new Date('2024-04-05')
};

// Example: High-quality system guide by a verified local
export const squamishVisitorGuide: Guide = {
  id: 'guide_squamish_first_timer',
  type: 'visitor_primer',
  system_id: 'sys_squamish',
  
  title: 'First Timer\'s Guide to Squamish: How to Survive and Thrive',
  summary: 'Everything you need to know before pointing your bike down a Squamish trail, from a local who\'s watched countless visitors learn the hard way.',
  
  sections: [
    {
      heading: 'Understanding Squamish Ratings',
      content: `If there's one thing you need to know, it's this: Squamish ratings are different. That blue trail you're eyeing? It would be a black or double-black anywhere else. 
      
The infamous Half Nelson is rated blue, but features continuous roots, rocks, tight trees, and steep rolls that have humbled world-cup riders. Start with green trails like Meadow of the Grizzly to calibrate your expectations.`,
      media_refs: ['media_half_nelson_reality_check']
    },
    {
      heading: 'The Gear You Actually Need',
      content: `Beyond the obvious (full-face for most trails, knee pads are mandatory):
- Bigger brake rotors (203mm minimum) - the descents are long and steep
- Fresh brake pads - you'll burn through them faster than expected  
- Tire inserts or tough casings - the rocks are sharp
- Clear glasses - for the inevitable face-full of ferns`,
      media_refs: ['media_typical_squamish_roots']
    },
    {
      heading: 'Trail Progression for Your First Week',
      content: `Day 1-2: Start in the Diamond Head area. Jacks Trail and Meadow of the Grizzly will give you a taste without destroying your confidence.

Day 3-4: Ready for "Squamish Blue"? Try Pseudo Tsuga - it's challenging but more forgiving than Half Nelson.

Day 5+: Now you might be ready for the classics like Half Nelson, Angry Midget, or Rupert.`,
      media_refs: ['media_progression_map']
    },
    {
      heading: 'Local Secrets',
      content: `- Early morning rides (before 9am) often have perfect tacky conditions
- The Mamquam FSR climb is boring but opens up amazing high-alpine riding
- Don't skip Alice Lake trails - less techy but incredible flow
- The Exit trails near the gondola are worth the pedal`,
    },
    {
      heading: 'Common Mistakes to Avoid',
      content: `1. Starting with Half Nelson because "it's just a blue"
2. Not bringing enough food/water for the long climbs
3. Riding when trails are too wet (damages trails and is dangerous)
4. Underestimating the physical demands - pace yourself!`
    }
  ],
  
  key_points: [
    'Squamish blues = blacks elsewhere',
    'Knee pads and good brakes essential',
    'Start easier than you think',
    'Respect wet conditions'
  ],
  
  skill_level_target: 'intermediate',
  
  author: {
    user_id: 'user_123',
    display_name: 'Sarah Chen',
    local_credibility: squamishLocalSarah
  },
  
  quality_score: 94,
  peer_reviews: [squamishGuideReview],
  editorial_status: 'featured',
  
  version_history: [
    {
      version: 1,
      edited_by: 'Sarah Chen',
      edit_summary: 'Initial guide creation',
      timestamp: new Date('2024-03-15')
    },
    {
      version: 2,
      edited_by: 'Sarah Chen',
      edit_summary: 'Added gear section based on feedback',
      timestamp: new Date('2024-04-02')
    }
  ],
  
  created_at: new Date('2024-03-15'),
  updated_at: new Date('2024-04-02'),
  last_verified: new Date('2024-10-01')
};

// Example: High-quality media with context
export const halfNelsonRealityCheck: Media = {
  id: 'media_half_nelson_reality_check',
  type: 'video',
  
  subject: {
    type: 'trail_feature',
    system_id: 'sys_squamish',
    trail_id: 'trail_half_nelson',
    specific_location: 'The root lattice section at approximately 1km'
  },
  
  url: 'https://youtube.com/watch?v=example123',
  thumbnail_url: 'https://img.youtube.com/vi/example123/maxresdefault.jpg',
  title: 'Half Nelson\'s "Blue" Rating in Action',
  caption: 'This is what a Squamish blue trail actually looks like. Note the continuous technical features with no rest.',
  
  showcase_notes: 'Pause at 0:45 to see the least obvious line through the roots - stay left then cut right after the stump',
  conditions_when_taken: 'Typical summer conditions - dry but roots still slick',
  
  quality_indicators: {
    resolution_ok: true,
    well_lit: true,
    shows_intended_subject: true,
    recent: true
  },
  
  contributor: {
    user_id: 'user_123',
    display_name: 'Sarah Chen'
  },
  
  curation_score: 92,
  featured: true,
  votes: {
    helpful: 234,
    not_helpful: 3
  },
  
  created_at: new Date('2024-07-20')
};

// Example: Seasonal update with verification
export const squamishFallUpdate: SeasonalUpdate = {
  id: 'update_squamish_fall_2024',
  system_id: 'sys_squamish',
  
  update_type: 'conditions',
  
  title: 'Fall 2024 Conditions Update: Wet Season Has Arrived',
  summary: 'Annual fall rains have started. Many trails are rideable but use caution. Some closures in effect.',
  
  detailed_update: `The wet season has officially begun as of October 15th. Here's what you need to know:

**Currently Riding Well in Wet:**
- Alice Lake network (drains well)
- Most Garibaldi Highlands trails
- Lower elevation trails in Diamond Head

**Use Extreme Caution:**
- Half Nelson - roots are ice-slick when wet
- Angry Midget - multiple exposure sections
- Any north-facing trails (stay wet longer)

**Temporarily Closed:**
- Credit Line - erosion concerns
- Some alpine trails due to snow above 1200m

Remember: Riding wet trails causes damage. If you're leaving ruts, it's too wet!`,
  
  relevant_from: new Date('2024-10-15'),
  relevant_until: new Date('2025-04-01'),
  
  affects: {
    trails: ['trail_half_nelson', 'trail_angry_midget', 'trail_credit_line'],
    areas: ['Alpine trails above 1200m', 'North-facing slopes']
  },
  
  severity: 'important',
  
  reported_by: 'user_123',
  verified_by: ['user_456', 'user_789', 'user_admin_1'],
  verification_count: 3,
  
  media_evidence: ['media_wet_conditions_2024'],
  
  created_at: new Date('2024-10-15'),
  last_confirmed: new Date('2024-10-18')
};

// Example: YouTube video guide with rewards
export const routeBreakdownVideo: Media = {
  id: 'media_route_breakdown_zen',
  type: 'video',
  
  subject: {
    type: 'technique_demo',
    system_id: 'sys_stgeorge',
    route_id: 'route_zen_experience',
    specific_location: 'Multiple crux moves throughout'
  },
  
  url: 'https://youtube.com/watch?v=zentrail456',
  thumbnail_url: 'https://img.youtube.com/vi/zentrail456/maxresdefault.jpg',
  title: 'Zen Trail Line Choice Breakdown - How to Clean the Crux Moves',
  caption: 'Local rider breaks down the key moves that make Zen Trail rideable. Game-changing beta for technical climbing.',
  
  showcase_notes: 'Pay attention to wheel placement at 2:30, 4:15, and 7:45 - these are the moves most people miss',
  conditions_when_taken: 'Perfect conditions - bone dry after 5 days without rain',
  
  quality_indicators: {
    resolution_ok: true,
    well_lit: true,
    shows_intended_subject: true,
    recent: true
  },
  
  contributor: {
    user_id: 'user_999',
    display_name: 'Jordan Martinez'
  },
  
  curation_score: 96,
  featured: true,
  votes: {
    helpful: 567,
    not_helpful: 12
  },
  
  created_at: new Date('2024-09-10')
}; 