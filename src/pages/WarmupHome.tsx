import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Users, TrendingUp, MessageSquare, Grid3X3, List } from 'lucide-react';
import { useWarmup } from '@/contexts/WarmupContext';
import { AccountRow } from '@/components/warmup/AccountRow';
import { BulkActionsBar } from '@/components/warmup/BulkActionsBar';
import { SafetyChip } from '@/components/warmup/SafetyChip';
import { useNavigate } from 'react-router-dom';

export default function WarmupHome() {
  const navigate = useNavigate();
  const { 
    accounts, 
    selectedAccounts, 
    setSelectedAccounts, 
    dailyProgress, 
    safetyStatus, 
    templates,
    applyTemplate 
  } = useWarmup();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Calculate summary metrics
  const totalActions = Object.values(dailyProgress).reduce(
    (sum, progress) => sum + Object.values(progress).reduce((s, v) => s + v, 0), 
    0
  );
  
  const totalTargets = accounts.length * 300; // Assuming 300 as average daily target
  const completionPercent = Math.round((totalActions / totalTargets) * 100);
  
  const safetyLevels = Object.values(safetyStatus);
  const safeCount = safetyLevels.filter(s => s.level === 'safe').length;
  const cautionCount = safetyLevels.filter(s => s.level === 'caution').length;
  const riskCount = safetyLevels.filter(s => s.level === 'risk').length;
  
  const overallSafety = riskCount > 0 ? 'risk' : cautionCount > 0 ? 'caution' : 'safe';

  // Filter accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
    const matchesTag = tagFilter === 'all' || account.tags.includes(tagFilter);
    
    return matchesSearch && matchesStatus && matchesTag;
  });

  // Get unique tags for filter
  const allTags = [...new Set(accounts.flatMap(account => account.tags))];

  const handleAccountSelect = (accountId: string, selected: boolean) => {
    if (selected) {
      setSelectedAccounts([...selectedAccounts, accountId]);
    } else {
      setSelectedAccounts(selectedAccounts.filter(id => id !== accountId));
    }
  };

  const handleSelectAll = () => {
    if (selectedAccounts.length === filteredAccounts.length) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts(filteredAccounts.map(account => account.id));
    }
  };

  const mockProxyPools = [
    { id: 'pool1', name: 'US West Pool' },
    { id: 'pool2', name: 'EU Pool' },
    { id: 'pool3', name: 'Asia Pool' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Warmup</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage Instagram account warmup automation with safe pacing.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button
            variant="outline"
            onClick={() => navigate('/warmup/templates')}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </Button>
        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Warmup Profile</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Users className="h-5 w-5 text-primary" />
              Total Actions Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalActions.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Across {accounts.length} accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-primary" />
              Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{completionPercent}%</div>
            <p className="text-sm text-muted-foreground">Daily targets progress</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <MessageSquare className="h-5 w-5 text-primary" />
              DMs Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {Object.values(dailyProgress).reduce((sum, progress) => sum + (progress.dmOpens + progress.dmReplies), 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white">Active Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {accounts.filter(a => a.status === 'connected').length}
            </div>
            <p className="text-sm text-muted-foreground">
              of {accounts.length} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
            <Input 
              placeholder="Search accounts or tags..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50 border-border" 
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-muted/50 border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="connected">Connected</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="cooling_down">Cooling Down</SelectItem>
              <SelectItem value="requires_attention">Needs Attention</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-32 bg-muted/50 border-border">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectAll}
            className="whitespace-nowrap"
          >
            {selectedAccounts.length === filteredAccounts.length ? 'Deselect All' : 'Select All'}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        {filteredAccounts.length === 0 ? (
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No accounts found matching your filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredAccounts.map(account => (
            <AccountRow
              key={account.id}
              account={account}
              progress={dailyProgress[account.id] || {
                scrolls: 0, likes: 0, follows: 0, comments: 0,
                storyViews: 0, dmOpens: 0, dmReplies: 0, saves: 0, profileVisits: 0
              }}
              safetyStatus={safetyStatus[account.id] || { level: 'safe', message: 'No data' }}
              isSelected={selectedAccounts.includes(account.id)}
              onSelect={(selected) => handleAccountSelect(account.id, selected)}
              onClick={() => navigate(`/warmup/account/${account.id}`)}
            />
          ))
        )}
      </div>

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedCount={selectedAccounts.length}
        onClearSelection={() => setSelectedAccounts([])}
        onStart={() => console.log('Start selected accounts')}
        onPause={() => console.log('Pause selected accounts')}
        onEditTargets={() => console.log('Edit targets for selected accounts')}
        onApplyTemplate={(templateId) => applyTemplate(templateId, selectedAccounts)}
        onAssignProxy={(proxyPool) => console.log('Assign proxy pool:', proxyPool)}
        onAssignTimeWindow={() => console.log('Assign time window')}
        onResetToday={() => console.log('Reset today for selected accounts')}
        templates={templates}
        proxyPools={mockProxyPools}
      />
    </div>
  );
}