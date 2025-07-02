// User-Generated Content Models with Quality Control

/**
 * System or Route Guide - In-depth content from experienced locals
 */
export interface Guide {
  id: string;
  type: 'system_overview' | 'route_breakdown' | 'skill_progression' | 'seasonal_guide' | 'visitor_primer';
  system_id: string;
  route_ids?: string[];
  
  title: string;
  summary: string; // Quick overview of what this guide covers
  
  // Content sections for structured guides
  sections: {
    heading: string;
    content: string; // Markdown
    media_refs?: string[]; // IDs of associated media
  }[];
  
  // Key information pulled out for easy scanning
  key_points: string[];
  skill_level_target?: 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
  
  // Author and credibility
  author: {
    user_id: string;
    display_name: string;
    local_credibility: LocalCredibility;
  };
  
  // Quality metrics
  quality_score: number; // Calculated from various factors
  peer_reviews: Review[];
  editorial_status: 'draft' | 'pending_review' | 'published' | 'featured';
  
  // Versioning - Wikipedia style
  version_history: {
    version: number;
    edited_by: string;
    edit_summary: string;
    timestamp: Date;
  }[];
  
  created_at: Date;
  updated_at: Date;
  last_verified: Date; // When was this last confirmed accurate?
}

/**
 * Media content - photos and videos with context
 */
export interface Media {
  id: string;
  type: 'photo' | 'video';
  
  // What this media shows
  subject: {
    type: 'trail_feature' | 'viewpoint' | 'technique_demo' | 'conditions' | 'overview';
    system_id: string;
    trail_id?: string;
    route_id?: string;
    specific_location?: string; // "Rock garden at km 3.2"
  };
  
  // Media details
  url: string; // YouTube URL for videos, hosted image URL for photos
  thumbnail_url?: string;
  title: string;
  caption: string;
  
  // Context that makes this valuable
  showcase_notes?: string; // "Shows the correct line through the crux"
  conditions_when_taken?: string; // "Dry conditions, October"
  
  // Quality and relevance
  quality_indicators: {
    resolution_ok: boolean;
    well_lit: boolean;
    shows_intended_subject: boolean;
    recent: boolean; // Taken within last 2 years
  };
  
  // Attribution
  contributor: {
    user_id: string;
    display_name: string;
  };
  
  // Curation
  curation_score: number; // Based on votes, views, and moderator input
  featured: boolean; // Hand-picked by moderators
  votes: {
    helpful: number;
    not_helpful: number;
  };
  
  created_at: Date;
}

/**
 * Local Credibility - How we verify someone knows what they're talking about
 */
export interface LocalCredibility {
  user_id: string;
  system_id: string;
  
  // Credibility indicators
  indicators: {
    claimed_local: boolean; // Self-identified as local
    verified_local: boolean; // Verified by other locals or moderators
    years_riding_here?: number;
    contributions_count: number; // Guides, routes, updates for this system
    contribution_quality_avg: number; // Average quality score
  };
  
  // Expertise areas
  expertise_tags: string[]; // ["technical_trails", "xc_routes", "seasonal_conditions"]
  
  // Verification
  verified_by?: {
    user_id: string;
    verification_note: string;
    date: Date;
  }[];
  
  // Reputation
  reputation_score: number; // Calculated from various factors
  trusted_contributor: boolean; // Can make edits without review
}

/**
 * Content Review System - Peer review for quality
 */
export interface Review {
  id: string;
  content_type: 'guide' | 'route' | 'media' | 'trail_info';
  content_id: string;
  
  reviewer: {
    user_id: string;
    display_name: string;
    credibility?: LocalCredibility; // For the relevant system
  };
  
  // Review details
  accuracy_rating: 1 | 2 | 3 | 4 | 5;
  completeness_rating: 1 | 2 | 3 | 4 | 5;
  clarity_rating: 1 | 2 | 3 | 4 | 5;
  
  // Specific feedback
  feedback: {
    what_works: string[];
    needs_improvement: string[];
    factual_corrections?: string[]; // Specific errors found
  };
  
  // Verification
  personally_verified: boolean; // "I've ridden this and can confirm"
  last_ridden_date?: Date;
  
  created_at: Date;
}

/**
 * Contribution Rewards System
 */
export interface ContributorRewards {
  user_id: string;
  
  // Contribution metrics
  total_contributions: number;
  quality_contributions: number; // Above threshold quality score
  featured_contributions: number;
  
  // Recognition levels
  recognition_level: 'contributor' | 'trusted_contributor' | 'expert' | 'ambassador';
  
  // Specific achievements
  achievements: {
    type: 'first_guide' | 'system_expert' | 'video_creator' | 'fact_checker' | 'trail_photographer';
    system_id?: string;
    earned_date: Date;
    details: string;
  }[];
  
  // Perks earned
  perks: {
    type: 'early_access' | 'direct_edit' | 'moderator_tools' | 'verified_badge';
    active: boolean;
  }[];
}

/**
 * Content Moderation Queue
 */
export interface ModerationItem {
  id: string;
  content_type: 'guide' | 'route' | 'media' | 'edit';
  content_id: string;
  
  // Why it's in moderation
  reason: 'new_content' | 'flagged' | 'major_edit' | 'dispute';
  
  // Current state
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'needs_revision';
  
  // Review process
  assigned_moderator?: string;
  moderator_notes?: string;
  community_votes?: {
    approve: number;
    reject: number;
    needs_work: number;
  };
  
  // Resolution
  resolution?: {
    action: 'approved' | 'rejected' | 'revised';
    reason: string;
    resolved_by: string;
    resolved_at: Date;
  };
  
  created_at: Date;
}

/**
 * Fact Checking System
 */
export interface FactCheck {
  id: string;
  content_type: 'guide' | 'route' | 'trail_info';
  content_id: string;
  
  // What's being checked
  claim: string; // The specific claim being verified
  claim_location: string; // Where in the content this appears
  
  // Verification
  checker: {
    user_id: string;
    local_credibility?: LocalCredibility;
  };
  
  verification_method: 'personal_experience' | 'local_knowledge' | 'official_source' | 'community_consensus';
  verification_details: string;
  
  // Result
  result: 'verified' | 'incorrect' | 'partially_correct' | 'outdated' | 'cannot_verify';
  correct_information?: string; // If incorrect or outdated
  
  evidence?: {
    type: 'photo' | 'official_link' | 'personal_testimony';
    details: string;
  };
  
  created_at: Date;
}

/**
 * Seasonal Content Updates
 */
export interface SeasonalUpdate {
  id: string;
  system_id: string;
  
  update_type: 'conditions' | 'trail_changes' | 'new_features' | 'closures' | 'events';
  
  title: string;
  summary: string;
  detailed_update: string; // Markdown
  
  // Temporal relevance
  relevant_from: Date;
  relevant_until?: Date;
  
  // Impact
  affects: {
    trails?: string[]; // Trail IDs
    routes?: string[]; // Route IDs
    areas?: string[]; // General areas like "North Shore trails"
  };
  
  severity: 'info' | 'important' | 'critical';
  
  // Verification
  reported_by: string;
  verified_by: string[]; // Multiple confirmations increase trust
  verification_count: number;
  
  media_evidence?: string[]; // Media IDs showing current conditions
  
  created_at: Date;
  last_confirmed: Date;
}

/**
 * Content Quality Scoring System
 */
export interface QualityMetrics {
  content_id: string;
  content_type: string;
  
  // Automated metrics
  completeness_score: number; // Based on required fields filled
  freshness_score: number; // How recently updated/verified
  media_quality_score: number; // Quality of associated media
  
  // Community metrics
  peer_review_score: number; // Average from reviews
  community_votes_score: number; // Helpful vs not helpful
  fact_check_score: number; // Verified claims vs disputed
  
  // Authority metrics
  author_credibility_score: number; // Based on author's local credibility
  moderator_boost?: number; // Additional score from moderator review
  
  // Overall
  total_quality_score: number; // Weighted combination
  quality_tier: 'needs_work' | 'good' | 'excellent' | 'featured';
  
  last_calculated: Date;
}

/**
 * Community Guidelines and Standards
 */
export interface ContentStandards {
  // Minimum requirements for each content type
  guide_requirements: {
    min_sections: number;
    required_sections: string[]; // ["Overview", "Key Trails", "Local Tips"]
    min_word_count: number;
    requires_media: boolean;
    requires_local_verification: boolean;
  };
  
  photo_requirements: {
    min_resolution: string; // "1920x1080"
    max_age_years: number; // Photos older than X years need re-verification
    must_show_clear_subject: boolean;
    requires_caption: boolean;
  };
  
  video_requirements: {
    max_length_minutes: number;
    must_be_relevant: boolean;
    no_promotional_content: boolean;
    requires_context: boolean;
  };
  
  // Quality thresholds
  auto_approve_threshold: number; // Quality score for automatic approval
  feature_threshold: number; // Quality score for featuring
  trust_threshold: number; // Contributions needed for trusted status
} 