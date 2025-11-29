import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Settings, 
  CheckCircle2, 
  ScrollText, 
  Heart, 
  UserPlus, 
  MessageCircle, 
  Eye, 
  MessageSquare,
  Bookmark,
  User,
  Clock,
  Download
} from 'lucide-react';
import { useWarmup } from '@/contexts/WarmupContext';
import { SafetyChip } from '@/components/warmup/SafetyChip';
import { ProgressBar } from '@/components/warmup/ProgressBar';

export default function AccountWarmupDetail() {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  const { accounts, dailyProgress, safetyStatus } = useWarmup();
  
  const account = accounts.find(a => a.id === accountId);
  const progress = dailyProgress[accountId || ''];
  const safety = safetyStatus[accountId || ''];

  const [targets, setTargets] = useState({
    scrolls: 200,
    likes: 30,
    follows: 10,
    comments: 5,
    storyViews: 25,
    dmOpens: 8,
    dmReplies: 3,
    saves: 15,
    profileVisits: 40
  });

  const [enabledCategories, setEnabledCategories] = useState({
    scrolls: true,
    likes: true,
    follows: true,
    comments: true,
    storyViews: true,
    dmOpens: true,
    dmReplies: false,
    saves: true,
    profileVisits: true
  });

  if (!account || !progress || !safety) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-muted-foreground">Account not found</p>
          <Button onClick={() => navigate('/warmup')} className="mt-4">
            Back to Warmup
          </Button>
        </div>
      </div>
    );
  }

  const actionCategories = [
    { key: 'scrolls', name: 'Scrolls', icon: ScrollText, color: 'text-blue-400' },
    { key: 'likes', name: 'Likes', icon: Heart, color: 'text-red-400' },
    { key: 'follows', name: 'Follows', icon: UserPlus, color: 'text-green-400' },
    { key: 'comments', name: 'Comments', icon: MessageCircle, color: 'text-purple-400' },
    { key: 'storyViews', name: 'Story Views', icon: Eye, color: 'text-orange-400' },
    { key: 'dmOpens', name: 'DM Opens', icon: MessageSquare, color: 'text-cyan-400' },
    { key: 'dmReplies', name: 'DM Replies', icon: MessageSquare, color: 'text-pink-400' },
    { key: 'saves', name: 'Saves', icon: Bookmark, color: 'text-yellow-400' },
    { key: 'profileVisits', name: 'Profile Visits', icon: User, color: 'text-indigo-400' }
  ];

  const totalCurrent = Object.values(progress).reduce((sum, val) => sum + val, 0);
  const totalTarget = Object.values(targets).reduce((sum, val) => sum + val, 0);
  const completionPercent = Math.round((totalCurrent / totalTarget) * 100);

  const getActionSafety = (current: number, target: number) => {
    const percent = (current / target) * 100;
    if (percent >= 100) return 'completed';
    if (percent >= 80) return 'caution';
    return 'safe';
  };

  const formatNextAction = () => {
    if (!safety.nextActionIn) return 'Ready now';
    const hours = Math.floor(safety.nextActionIn / 3600);
    const minutes = Math.floor((safety.nextActionIn % 3600) / 60);
    const seconds = safety.nextActionIn % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/warmup')}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Warmup Home
        </Button>
        <span className="text-muted-foreground">/</span>
        <span className="text-white">{account.handle}</span>
      </div>

      {/* Account Header */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={account.avatarUrl} alt={account.handle} />
                <AvatarFallback>{account.handle.slice(1, 3).toUpperCase()}</AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">{account.handle}</h1>
                  {account.isVerified && (
                    <CheckCircle2 className="h-5 w-5 text-blue-400" />
                  )}
                </div>
                
                <div className="flex items-center gap-3 mt-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {account.tier} account
                  </Badge>
                  <Badge variant="secondary">
                    {account.timezone}
                  </Badge>
                  {account.proxyId && (
                    <Badge variant="outline">
                      Proxy: {account.proxyId}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <Button className="gap-2">
              <Settings className="h-4 w-4" />
              Account Settings
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Daily Overview */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl text-white">Daily Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Actions Today</p>
              <p className="text-3xl font-bold text-white">{totalCurrent}</p>
              <p className="text-xs text-muted-foreground">of {totalTarget} target</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Completion</p>
              <p className="text-3xl font-bold text-white">{completionPercent}%</p>
              <ProgressBar 
                current={totalCurrent} 
                target={totalTarget} 
                showText={false}
                size="sm"
              />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Safety Status</p>
              <div className="mt-2">
                <SafetyChip status={safety} size="lg" />
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Next Action In</p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-xl font-bold text-white">
                  {formatNextAction()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actionCategories.map(category => {
          const Icon = category.icon;
          const current = progress[category.key as keyof typeof progress] || 0;
          const target = targets[category.key as keyof typeof targets];
          const isEnabled = enabledCategories[category.key as keyof typeof enabledCategories];
          const actionSafety = getActionSafety(current, target);
          
          return (
            <Card key={category.key} className="bg-gradient-card border-border shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <CardTitle className="text-lg text-white">{category.name}</CardTitle>
                  </div>
                  <Switch 
                    checked={isEnabled}
                    onCheckedChange={(checked) => 
                      setEnabledCategories(prev => ({ ...prev, [category.key]: checked }))
                    }
                  />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Target</p>
                    <Input
                      type="number"
                      value={target}
                      onChange={(e) => setTargets(prev => ({ 
                        ...prev, 
                        [category.key]: parseInt(e.target.value) || 0 
                      }))}
                      className="w-20 h-8 text-white bg-muted/50 border-border mt-1"
                      min="0"
                      disabled={!isEnabled}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="text-2xl font-bold text-white">{current}</p>
                  </div>
                </div>

                <ProgressBar 
                  current={current} 
                  target={target}
                  size="sm"
                />

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <SafetyChip 
                    status={{ 
                      level: actionSafety === 'completed' ? 'safe' : actionSafety,
                      message: actionSafety === 'completed' ? 'Target reached' : `${actionSafety} level`
                    }} 
                    size="sm" 
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    disabled={!isEnabled}
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Humanization
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Schedule and Pacing */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl text-white">Schedule & Pacing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Time Windows</h3>
              <div className="space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white w-20">{day}</span>
                    <div className="flex items-center gap-2">
                      <Input className="w-20 h-8 text-xs" defaultValue="09:00" />
                      <span className="text-muted-foreground">to</span>
                      <Input className="w-20 h-8 text-xs" defaultValue="17:00" />
                      <Switch defaultChecked={day !== 'Sunday'} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Pacing Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">Cooldown Range (seconds)</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input className="flex-1 h-8" defaultValue="120" />
                    <span className="text-muted-foreground">to</span>
                    <Input className="flex-1 h-8" defaultValue="300" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white">Random Jitter (%)</label>
                  <Input className="w-20 h-8 mt-1" defaultValue="20" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white">Micro Rest (every N actions)</label>
                  <Input className="w-20 h-8 mt-1" defaultValue="10" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white">Sleep Block</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input className="flex-1 h-8" defaultValue="23:00" />
                    <span className="text-muted-foreground">to</span>
                    <Input className="flex-1 h-8" defaultValue="07:00" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs and Analytics */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">Activity Log</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '14:32', action: 'Like', target: '@user123', result: 'Success' },
              { time: '14:28', action: 'Scroll', target: 'Feed', result: 'Success' },
              { time: '14:25', action: 'Follow', target: '@newuser', result: 'Success' },
              { time: '14:20', action: 'Story View', target: '@friend', result: 'Success' },
              { time: '14:15', action: 'Comment', target: '@post456', result: 'Failed - Rate Limited' }
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground font-mono">{log.time}</span>
                  <span className="text-sm font-medium text-white">{log.action}</span>
                  <span className="text-sm text-muted-foreground">{log.target}</span>
                </div>
                <Badge 
                  className={log.result.includes('Failed') 
                    ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                    : 'bg-green-500/20 text-green-400 border-green-500/30'
                  }
                >
                  {log.result}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}