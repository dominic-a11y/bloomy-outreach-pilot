import React, { createContext, useContext, useState } from 'react';
import { Opener, OpenerVariant, Template, Review, ABTest, Metric, Comment } from '@/types/openers';

interface OpenersContextType {
  openers: Opener[];
  templates: Template[];
  abTests: ABTest[];
  metrics: Record<string, Metric[]>;
  comments: Record<string, Comment[]>;
  currentUser: { id: string; name: string; role: 'admin' | 'editor' | 'reviewer' };
  safeMode: boolean;
  
  // Opener actions
  createOpener: (opener: Omit<Opener, 'id' | 'updatedAt'>) => Promise<string>;
  updateOpener: (id: string, updates: Partial<Opener>) => Promise<void>;
  deleteOpener: (id: string) => Promise<void>;
  
  // Variant actions
  createVariant: (openerId: string, variant: Omit<OpenerVariant, 'id' | 'openerId' | 'createdAt'>) => Promise<void>;
  updateVariant: (variantId: string, updates: Partial<OpenerVariant>) => Promise<void>;
  deleteVariant: (variantId: string) => Promise<void>;
  
  // Review actions
  submitForReview: (openerId: string) => Promise<void>;
  approveOpener: (openerId: string, notes?: string) => Promise<void>;
  rejectOpener: (openerId: string, notes: string) => Promise<void>;
  
  // Testing actions
  createABTest: (test: Omit<ABTest, 'id'>) => Promise<string>;
  startABTest: (testId: string) => Promise<void>;
  endABTest: (testId: string, winnerVariantId?: string) => Promise<void>;
  
  // Comments
  addComment: (openerId: string, message: string) => Promise<void>;
  resolveComment: (commentId: string) => Promise<void>;
  
  // Settings
  setSafeMode: (enabled: boolean) => void;
}

const OpenersContext = createContext<OpenersContextType | undefined>(undefined);

// Mock data
const mockOpeners: Opener[] = [
  {
    id: '1',
    name: 'Fitness Brand Cold Intro',
    status: 'approved',
    language: 'en',
    tone: 'confident',
    tags: ['cold_reachout', 'fitness', 'compliance_safe'],
    createdBy: 'user1',
    updatedAt: new Date('2024-01-15'),
    campaignUsageCount: 3,
    variants: [
      {
        id: 'v1',
        openerId: '1',
        name: 'Direct approach',
        body: "Hey {first_name}! 👋 Love your recent post about {recent_post}. I help {niche} brands like yours grow their Instagram presence. Mind if I share a quick strategy?",
        variables: ['first_name', 'recent_post', 'niche'],
        hasSpintax: false,
        riskScore: 2,
        version: 1,
        enabled: true,
        createdAt: new Date('2024-01-15')
      },
      {
        id: 'v2',
        openerId: '1',
        name: 'Question hook',
        body: "Hi {first_name}! Quick question - are you looking to {scale|grow|boost} your {niche} brand on Instagram? I've got a strategy that's working really well for similar accounts 🚀",
        variables: ['first_name', 'niche'],
        hasSpintax: true,
        riskScore: 3,
        version: 1,
        enabled: true,
        createdAt: new Date('2024-01-15')
      }
    ],
    reviews: []
  },
  {
    id: '2',
    name: 'Tech Startup Re-engagement',
    status: 'in_review',
    language: 'en',
    tone: 'playful',
    tags: ['re_engagement', 'tech', 'startup'],
    createdBy: 'user2',
    updatedAt: new Date('2024-01-20'),
    campaignUsageCount: 0,
    variants: [
      {
        id: 'v3',
        openerId: '2',
        name: 'FOMO approach',
        body: "Hey {first_name}! 🔥 Just launched something that {niche} founders are going crazy for. Want a sneak peek before it goes public?",
        variables: ['first_name', 'niche'],
        hasSpintax: false,
        riskScore: 4,
        version: 1,
        enabled: true,
        createdAt: new Date('2024-01-20')
      }
    ],
    reviews: [
      {
        id: 'r1',
        openerId: '2',
        reviewerId: 'reviewer1',
        reviewerName: 'Sarah Johnson',
        decision: 'needs_changes',
        notes: 'The FOMO approach might be too aggressive. Consider softening the language.',
        decidedAt: new Date('2024-01-21')
      }
    ]
  }
];

const mockTemplates: Template[] = [
  {
    id: 't1',
    name: 'Cold Introduction',
    category: 'cold_intro',
    body: "Hi {first_name}! I came across your {niche} content and was impressed by {recent_post}. I'd love to share a quick tip that could help you grow your audience.",
    variables: ['first_name', 'niche', 'recent_post'],
    language: 'en',
    tone: 'calm',
    description: 'A gentle introduction for cold outreach'
  },
  {
    id: 't2',
    name: 'Warm Follow-up',
    category: 'warm_followup',
    body: "Hey {first_name}! Following up on our conversation about {topic}. I've got that strategy I mentioned - want me to share it?",
    variables: ['first_name', 'topic'],
    language: 'en',
    tone: 'confident',
    description: 'Perfect for following up with engaged prospects'
  }
];

const mockABTests: ABTest[] = [
  {
    id: 'ab1',
    name: 'Fitness Opener Test',
    campaignId: 'camp1',
    campaignName: 'Fitness Influencers Q1',
    openerVariantIds: ['v1', 'v2'],
    split: [50, 50],
    startedAt: new Date('2024-01-15'),
    status: 'running'
  }
];

export const OpenersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openers, setOpeners] = useState<Opener[]>(mockOpeners);
  const [templates] = useState<Template[]>(mockTemplates);
  const [abTests, setABTests] = useState<ABTest[]>(mockABTests);
  const [metrics] = useState<Record<string, Metric[]>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [safeMode, setSafeMode] = useState(true);
  
  const currentUser = { id: 'user1', name: 'John Doe', role: 'admin' as const };

  const createOpener = async (openerData: Omit<Opener, 'id' | 'updatedAt'>) => {
    const newOpener: Opener = {
      ...openerData,
      id: Date.now().toString(),
      updatedAt: new Date()
    };
    setOpeners(prev => [...prev, newOpener]);
    return newOpener.id;
  };

  const updateOpener = async (id: string, updates: Partial<Opener>) => {
    setOpeners(prev => prev.map(opener => 
      opener.id === id ? { ...opener, ...updates, updatedAt: new Date() } : opener
    ));
  };

  const deleteOpener = async (id: string) => {
    setOpeners(prev => prev.filter(opener => opener.id !== id));
  };

  const createVariant = async (openerId: string, variantData: Omit<OpenerVariant, 'id' | 'openerId' | 'createdAt'>) => {
    const newVariant: OpenerVariant = {
      ...variantData,
      id: Date.now().toString(),
      openerId,
      createdAt: new Date()
    };
    
    setOpeners(prev => prev.map(opener => 
      opener.id === openerId 
        ? { ...opener, variants: [...opener.variants, newVariant], updatedAt: new Date() }
        : opener
    ));
  };

  const updateVariant = async (variantId: string, updates: Partial<OpenerVariant>) => {
    setOpeners(prev => prev.map(opener => ({
      ...opener,
      variants: opener.variants.map(variant =>
        variant.id === variantId ? { ...variant, ...updates } : variant
      ),
      updatedAt: new Date()
    })));
  };

  const deleteVariant = async (variantId: string) => {
    setOpeners(prev => prev.map(opener => ({
      ...opener,
      variants: opener.variants.filter(variant => variant.id !== variantId),
      updatedAt: new Date()
    })));
  };

  const submitForReview = async (openerId: string) => {
    await updateOpener(openerId, { status: 'in_review' });
  };

  const approveOpener = async (openerId: string, notes = '') => {
    await updateOpener(openerId, { status: 'approved' });
    
    if (notes) {
      const review: Review = {
        id: Date.now().toString(),
        openerId,
        reviewerId: currentUser.id,
        reviewerName: currentUser.name,
        decision: 'approved',
        notes,
        decidedAt: new Date()
      };
      
      setOpeners(prev => prev.map(opener => 
        opener.id === openerId 
          ? { ...opener, reviews: [...opener.reviews, review] }
          : opener
      ));
    }
  };

  const rejectOpener = async (openerId: string, notes: string) => {
    await updateOpener(openerId, { status: 'rejected' });
    
    const review: Review = {
      id: Date.now().toString(),
      openerId,
      reviewerId: currentUser.id,
      reviewerName: currentUser.name,
      decision: 'rejected',
      notes,
      decidedAt: new Date()
    };
    
    setOpeners(prev => prev.map(opener => 
      opener.id === openerId 
        ? { ...opener, reviews: [...opener.reviews, review] }
        : opener
    ));
  };

  const createABTest = async (testData: Omit<ABTest, 'id'>) => {
    const newTest: ABTest = {
      ...testData,
      id: Date.now().toString()
    };
    setABTests(prev => [...prev, newTest]);
    return newTest.id;
  };

  const startABTest = async (testId: string) => {
    setABTests(prev => prev.map(test => 
      test.id === testId ? { ...test, status: 'running' as const } : test
    ));
  };

  const endABTest = async (testId: string, winnerVariantId?: string) => {
    setABTests(prev => prev.map(test => 
      test.id === testId 
        ? { ...test, status: 'completed' as const, endedAt: new Date(), winnerVariantId }
        : test
    ));
  };

  const addComment = async (openerId: string, message: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      openerId,
      userId: currentUser.id,
      userName: currentUser.name,
      message,
      createdAt: new Date(),
      isResolved: false
    };
    
    setComments(prev => ({
      ...prev,
      [openerId]: [...(prev[openerId] || []), newComment]
    }));
  };

  const resolveComment = async (commentId: string) => {
    setComments(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(openerId => {
        updated[openerId] = updated[openerId].map(comment =>
          comment.id === commentId ? { ...comment, isResolved: true } : comment
        );
      });
      return updated;
    });
  };

  const value: OpenersContextType = {
    openers,
    templates,
    abTests,
    metrics,
    comments,
    currentUser,
    safeMode,
    createOpener,
    updateOpener,
    deleteOpener,
    createVariant,
    updateVariant,
    deleteVariant,
    submitForReview,
    approveOpener,
    rejectOpener,
    createABTest,
    startABTest,
    endABTest,
    addComment,
    resolveComment,
    setSafeMode
  };

  return (
    <OpenersContext.Provider value={value}>
      {children}
    </OpenersContext.Provider>
  );
};

export const useOpeners = () => {
  const context = useContext(OpenersContext);
  if (context === undefined) {
    throw new Error('useOpeners must be used within an OpenersProvider');
  }
  return context;
};