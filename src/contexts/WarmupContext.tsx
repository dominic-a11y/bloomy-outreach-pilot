import React, { createContext, useContext, useState, useEffect } from 'react';
import { Account, WarmupProfile, Template, ActionLog, DailyProgress, SafetyStatus } from '@/types/warmup';

interface WarmupContextType {
  accounts: Account[];
  profiles: WarmupProfile[];
  templates: Template[];
  logs: ActionLog[];
  selectedAccounts: string[];
  dailyProgress: Record<string, DailyProgress>;
  safetyStatus: Record<string, SafetyStatus>;
  
  // Actions
  setSelectedAccounts: (ids: string[]) => void;
  addAccount: (account: Omit<Account, 'id' | 'createdAt'>) => Promise<void>;
  updateAccount: (id: string, updates: Partial<Account>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  
  createProfile: (profile: Omit<WarmupProfile, 'id'>) => Promise<void>;
  updateProfile: (id: string, updates: Partial<WarmupProfile>) => Promise<void>;
  
  createTemplate: (template: Omit<Template, 'id' | 'createdAt'>) => Promise<void>;
  applyTemplate: (templateId: string, accountIds: string[]) => Promise<void>;
  
  refreshData: () => Promise<void>;
}

const WarmupContext = createContext<WarmupContextType | undefined>(undefined);

// Mock data
const mockAccounts: Account[] = [
  {
    id: '1',
    handle: '@fitnessguru',
    avatarUrl: '/placeholder.svg',
    status: 'connected',
    timezone: 'America/New_York',
    proxyId: 'proxy1',
    tags: ['fitness', 'health'],
    tier: 'warm',
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    lastActionAt: new Date()
  },
  {
    id: '2', 
    handle: '@techstartup',
    avatarUrl: '/placeholder.svg',
    status: 'paused',
    timezone: 'America/Los_Angeles',
    tags: ['tech', 'startup'],
    tier: 'new',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    handle: '@foodblogger',
    avatarUrl: '/placeholder.svg', 
    status: 'cooling_down',
    timezone: 'Europe/London',
    proxyId: 'proxy2',
    tags: ['food', 'lifestyle'],
    tier: 'trusted',
    notes: 'High engagement account',
    createdAt: new Date('2024-01-10'),
    lastActionAt: new Date(Date.now() - 30 * 60 * 1000)
  }
];

const mockTemplates: Template[] = [
  {
    id: 'template1',
    name: 'Conservative Growth',
    description: 'Safe growth for new accounts',
    targets: {
      scrolls: 200,
      likes: 30,
      follows: 10,
      comments: 5,
      storyViews: 25,
      dmOpens: 8,
      dmReplies: 3,
      saves: 15,
      profileVisits: 40
    },
    schedule: {
      monday: { startTime: '09:00', endTime: '17:00', enabled: true },
      tuesday: { startTime: '09:00', endTime: '17:00', enabled: true },
      wednesday: { startTime: '09:00', endTime: '17:00', enabled: true },
      thursday: { startTime: '09:00', endTime: '17:00', enabled: true },
      friday: { startTime: '09:00', endTime: '15:00', enabled: true },
      saturday: { startTime: '10:00', endTime: '14:00', enabled: true },
      sunday: { startTime: '10:00', endTime: '14:00', enabled: false }
    },
    pacing: {
      cooldownMin: 120,
      cooldownMax: 300,
      jitterPercent: 20,
      microRestFrequency: 10,
      microRestDuration: 30,
      sleepStartTime: '23:00',
      sleepEndTime: '07:00'
    },
    humanizationProfile: {
      scrollLengthMin: 3,
      scrollLengthMax: 15,
      likeToScrollRatio: 0.15,
      commentLengthMin: 10,
      commentLengthMax: 50,
      followLikelihood: 0.25,
      dmReplyDelayMin: 300,
      dmReplyDelayMax: 1800,
      storyViewBatchSize: 5,
      storyViewInterval: 180
    },
    enabledCategories: ['scrolls', 'likes', 'follows', 'storyViews', 'saves'],
    accountTier: 'new',
    createdAt: new Date('2024-01-01')
  }
];

export const WarmupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [profiles, setProfiles] = useState<WarmupProfile[]>([]);
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [logs, setLogs] = useState<ActionLog[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [dailyProgress, setDailyProgress] = useState<Record<string, DailyProgress>>({});
  const [safetyStatus, setSafetyStatus] = useState<Record<string, SafetyStatus>>({});

  useEffect(() => {
    // Initialize daily progress and safety status
    const progress: Record<string, DailyProgress> = {};
    const safety: Record<string, SafetyStatus> = {};
    
    accounts.forEach(account => {
      progress[account.id] = {
        scrolls: Math.floor(Math.random() * 150),
        likes: Math.floor(Math.random() * 25),
        follows: Math.floor(Math.random() * 8),
        comments: Math.floor(Math.random() * 4),
        storyViews: Math.floor(Math.random() * 20),
        dmOpens: Math.floor(Math.random() * 6),
        dmReplies: Math.floor(Math.random() * 3),
        saves: Math.floor(Math.random() * 12),
        profileVisits: Math.floor(Math.random() * 30)
      };
      
      const totalActions = Object.values(progress[account.id]).reduce((sum, val) => sum + val, 0);
      const completionPercent = totalActions / 300 * 100; // Assuming 300 is typical daily target
      
      if (completionPercent < 50) {
        safety[account.id] = { level: 'safe', message: 'Operating within safe limits' };
      } else if (completionPercent < 80) {
        safety[account.id] = { level: 'caution', message: 'Approaching daily limits', nextActionIn: Math.floor(Math.random() * 3600) };
      } else {
        safety[account.id] = { level: 'risk', message: 'Near daily limits - consider pausing', nextActionIn: Math.floor(Math.random() * 7200) + 3600 };
      }
    });
    
    setDailyProgress(progress);
    setSafetyStatus(safety);
  }, [accounts]);

  const addAccount = async (accountData: Omit<Account, 'id' | 'createdAt'>) => {
    const newAccount: Account = {
      ...accountData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const updateAccount = async (id: string, updates: Partial<Account>) => {
    setAccounts(prev => prev.map(account => 
      account.id === id ? { ...account, ...updates } : account
    ));
  };

  const deleteAccount = async (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
    setSelectedAccounts(prev => prev.filter(accountId => accountId !== id));
  };

  const createProfile = async (profileData: Omit<WarmupProfile, 'id'>) => {
    const newProfile: WarmupProfile = {
      ...profileData,
      id: Date.now().toString()
    };
    setProfiles(prev => [...prev, newProfile]);
  };

  const updateProfile = async (id: string, updates: Partial<WarmupProfile>) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === id ? { ...profile, ...updates } : profile
    ));
  };

  const createTemplate = async (templateData: Omit<Template, 'id' | 'createdAt'>) => {
    const newTemplate: Template = {
      ...templateData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const applyTemplate = async (templateId: string, accountIds: string[]) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    for (const accountId of accountIds) {
      const existingProfile = profiles.find(p => p.accountId === accountId);
      if (existingProfile) {
        await updateProfile(existingProfile.id, {
          targets: template.targets,
          schedule: template.schedule,
          pacing: template.pacing,
          humanizationProfile: template.humanizationProfile,
          enabledCategories: template.enabledCategories
        });
      } else {
        await createProfile({
          accountId,
          targets: template.targets,
          schedule: template.schedule,
          pacing: template.pacing,
          humanizationProfile: template.humanizationProfile,
          enabledCategories: template.enabledCategories,
          isActive: true
        });
      }
    }
  };

  const refreshData = async () => {
    // In a real app, this would fetch fresh data from the API
    console.log('Refreshing warmup data...');
  };

  const value: WarmupContextType = {
    accounts,
    profiles,
    templates,
    logs,
    selectedAccounts,
    dailyProgress,
    safetyStatus,
    setSelectedAccounts,
    addAccount,
    updateAccount,
    deleteAccount,
    createProfile,
    updateProfile,
    createTemplate,
    applyTemplate,
    refreshData
  };

  return (
    <WarmupContext.Provider value={value}>
      {children}
    </WarmupContext.Provider>
  );
};

export const useWarmup = () => {
  const context = useContext(WarmupContext);
  if (context === undefined) {
    throw new Error('useWarmup must be used within a WarmupProvider');
  }
  return context;
};