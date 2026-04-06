export type SubscriptionTier = 'free' | 'starter' | 'growth' | 'agency';

export interface Profile {
  id: string;
  full_name: string;
  subscription_tier: SubscriptionTier;
  onboarding_completed: boolean;
  referral_code?: string;
}

export interface Product {
  id: string;
  user_id: string;
  name: string;
  description: string;
  audience: string;
  price: string;
  platform: string;
  product_url: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export type ContentStatus = 'draft' | 'approved' | 'scheduled' | 'posted';

export interface ContentPiece {
  id: string;
  product_id: string;
  type: string; // e.g., 'Reddit Post', 'LinkedIn Carousel'
  title: string;
  body: string;
  platform: string;
  framework: string; // e.g., 'PAS', 'BAB'
  aida_stage: 'awareness' | 'interest' | 'desire' | 'action';
  status: ContentStatus;
  performance_score?: number;
  clicks?: number;
  conversions?: number;
  scheduled_for?: string;
  posted_at?: string;
}

export interface AgentStatus {
  name: string;
  status: 'idle' | 'running' | 'queued';
  last_run?: string;
  progress?: number;
  message?: string;
}
