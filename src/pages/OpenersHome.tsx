import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, Search, Filter, MessageSquare, CheckCircle, Clock, XCircle, MoreHorizontal, Edit, Copy, Archive, Grid3X3, List } from 'lucide-react';
import { useOpeners } from '@/contexts/OpenersContext';
import { useNavigate } from 'react-router-dom';
export default function OpenersHome() {
  const navigate = useNavigate();
  const {
    openers,
    currentUser
  } = useOpeners();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [toneFilter, setToneFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Calculate summary metrics
  const totalOpeners = openers.length;
  const approvedCount = openers.filter(o => o.status === 'approved').length;
  const inReviewCount = openers.filter(o => o.status === 'in_review').length;
  const rejectedCount = openers.filter(o => o.status === 'rejected').length;

  // Filter openers
  const filteredOpeners = openers.filter(opener => {
    const matchesSearch = opener.name.toLowerCase().includes(searchTerm.toLowerCase()) || opener.variants.some(v => v.body.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || opener.status === statusFilter;
    const matchesLanguage = languageFilter === 'all' || opener.language === languageFilter;
    const matchesTone = toneFilter === 'all' || opener.tone === toneFilter;
    return matchesSearch && matchesStatus && matchesLanguage && matchesTone;
  });
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: CheckCircle
        };
      case 'in_review':
        return {
          color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          icon: Clock
        };
      case 'rejected':
        return {
          color: 'bg-red-500/20 text-red-400 border-red-500/30',
          icon: XCircle
        };
      default:
        return {
          color: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
          icon: Clock
        };
    }
  };
  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'calm':
        return 'bg-blue-500/20 text-blue-400';
      case 'confident':
        return 'bg-purple-500/20 text-purple-400';
      case 'playful':
        return 'bg-pink-500/20 text-pink-400';
      case 'formal':
        return 'bg-indigo-500/20 text-indigo-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  return <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Openers</h1>
          <p className="text-muted-foreground">Create, organize, and A/B test opener messages for your campaigns.</p>
        </div>
        <Button onClick={() => navigate('/openers/new')} className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
          <Plus className="h-4 w-4" />
          New Opener
        </Button>
      </div>

      {/* Campaign Selector */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-white mb-2 block">Campaign Context</label>
              <Select defaultValue="all">
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder="Select campaign to filter openers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="fitness-q1">Fitness Influencers Q1</SelectItem>
                  <SelectItem value="tech-startups">Tech Startups</SelectItem>
                  <SelectItem value="ecommerce">E-commerce Brands</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{totalOpeners}</div>
            <p className="text-sm text-muted-foreground">Active openers</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{approvedCount}</div>
            <p className="text-sm text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-yellow-400" />
              In Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{inReviewCount}</div>
            <p className="text-sm text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <XCircle className="h-5 w-5 text-red-400" />
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{rejectedCount}</div>
            <p className="text-sm text-muted-foreground">Need revision</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
            <Input placeholder="Search openers..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-muted/50 border-border" />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-muted/50 border-border">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>

          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-32 bg-muted/50 border-border">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>

          <Select value={toneFilter} onValueChange={setToneFilter}>
            <SelectTrigger className="w-32 bg-muted/50 border-border">
              <SelectValue placeholder="Tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tones</SelectItem>
              <SelectItem value="calm">Calm</SelectItem>
              <SelectItem value="confident">Confident</SelectItem>
              <SelectItem value="playful">Playful</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Opener List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpeners.map(opener => {
        const statusConfig = getStatusConfig(opener.status);
        const StatusIcon = statusConfig.icon;
        const previewText = opener.variants[0]?.body.slice(0, 80) + '...' || 'No variants';
        return <Card key={opener.id} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg text-white truncate">
                      {opener.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-xs border ${statusConfig.color}`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {opener.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={`text-xs ${getToneColor(opener.tone)}`}>
                        {opener.tone}
                      </Badge>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => navigate(`/openers/edit/${opener.id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Preview</div>
                  <p className="text-sm text-white leading-relaxed">
                    {previewText.replace(/\{([^}]+)\}/g, '[$1]')}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">Language:</span>
                    <span className="text-white ml-1">{opener.language.toUpperCase()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Variants:</span>
                    <span className="text-white ml-1">{opener.variants.length}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Used in {opener.campaignUsageCount} campaigns
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated {opener.updatedAt.toLocaleDateString()}
                  </div>
                </div>

              </CardContent>
            </Card>;
      })}
      </div>

      {filteredOpeners.length === 0 && <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No openers found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' || languageFilter !== 'all' || toneFilter !== 'all' ? 'No openers match your current filters.' : 'Create your first opener to get started.'}
            </p>
            <Button onClick={() => navigate('/openers/new')} className="gap-2">
              <Plus className="h-4 w-4" />
              New Opener
            </Button>
          </CardContent>
        </Card>}
    </div>;
}