export interface Opener {
  id: string;
  name: string;
  status: 'draft' | 'active';
  language: string;
  tone: 'calm' | 'confident' | 'playful' | 'formal';
  tags: string[];
  createdBy: string;
  updatedAt: Date;
  campaignUsageCount: number;
  variants: OpenerVariant[];
  reviews: Review[];
}

export interface OpenerVariant {
  id: string;
  openerId: string;
  name: string;
  body: string;
  variables: string[];
  hasSpintax: boolean;
  riskScore: number;
  version: number;
  enabled: boolean;
  createdAt: Date;
}

export interface Template {
  id: string;
  name: string;
  category: 'cold_intro' | 'warm_followup' | 'event_based' | 'referral_nudge';
  body: string;
  variables: string[];
  language: string;
  tone: string;
  description: string;
}

export interface Review {
  id: string;
  openerId: string;
  reviewerId: string;
  reviewerName: string;
  decision: 'approved' | 'rejected' | 'needs_changes';
  notes: string;
  decidedAt: Date;
}

export interface ABTest {
  id: string;
  name: string;
  campaignId: string;
  campaignName: string;
  openerVariantIds: string[];
  split: number[];
  startedAt: Date;
  endedAt?: Date;
  status: 'draft' | 'running' | 'completed' | 'paused';
  winnerVariantId?: string;
}

export interface Metric {
  id: string;
  openerVariantId: string;
  date: Date;
  sent: number;
  seen: number;
  opened: number;
  replied: number;
  positiveReplied: number;
  blocked: number;
}

export interface Comment {
  id: string;
  openerId: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: Date;
  isResolved: boolean;
}