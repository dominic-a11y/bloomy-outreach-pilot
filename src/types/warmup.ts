export interface Account {
  id: string;
  handle: string;
  avatarUrl: string;
  status: 'connected' | 'requires_attention' | 'paused' | 'cooling_down' | 'action_blocked' | 'rate_limited';
  timezone: string;
  proxyId?: string;
  tags: string[];
  tier: 'new' | 'warm' | 'trusted';
  isVerified?: boolean;
  notes?: string;
  createdAt: Date;
  lastActionAt?: Date;
}

export interface WarmupProfile {
  id: string;
  accountId: string;
  targets: {
    scrolls: number;
    likes: number;
    follows: number;
    comments: number;
    storyViews: number;
    dmOpens: number;
    dmReplies: number;
    saves: number;
    profileVisits: number;
  };
  schedule: {
    [key: string]: { // 'monday', 'tuesday', etc.
      startTime: string; // '09:00'
      endTime: string; // '17:00'
      enabled: boolean;
    };
  };
  pacing: {
    cooldownMin: number;
    cooldownMax: number;
    jitterPercent: number;
    microRestFrequency: number;
    microRestDuration: number;
    sleepStartTime: string;
    sleepEndTime: string;
  };
  humanizationProfile: {
    scrollLengthMin: number;
    scrollLengthMax: number;
    likeToScrollRatio: number;
    commentLengthMin: number;
    commentLengthMax: number;
    followLikelihood: number;
    dmReplyDelayMin: number;
    dmReplyDelayMax: number;
    storyViewBatchSize: number;
    storyViewInterval: number;
  };
  enabledCategories: string[];
  isActive: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  targets: WarmupProfile['targets'];
  schedule: WarmupProfile['schedule'];
  pacing: WarmupProfile['pacing'];
  humanizationProfile: WarmupProfile['humanizationProfile'];
  enabledCategories: string[];
  accountTier: 'new' | 'warm' | 'trusted';
  createdAt: Date;
}

export interface ActionLog {
  id: string;
  accountId: string;
  timestamp: Date;
  type: 'scroll' | 'like' | 'follow' | 'comment' | 'story_view' | 'dm_open' | 'dm_reply' | 'save' | 'profile_visit';
  targetRef?: string;
  outcome: 'success' | 'failed' | 'rate_limited' | 'blocked';
  errorCode?: string;
  errorMessage?: string;
}

export interface Proxy {
  id: string;
  name: string;
  host: string;
  port: number;
  isHealthy: boolean;
  location: string;
}

export interface DailyProgress {
  scrolls: number;
  likes: number;
  follows: number;
  comments: number;
  storyViews: number;
  dmOpens: number;
  dmReplies: number;
  saves: number;
  profileVisits: number;
}

export interface SafetyStatus {
  level: 'safe' | 'caution' | 'risk';
  message: string;
  nextActionIn?: number; // seconds
}