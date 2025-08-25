import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Plus, MessageSquare, CheckCircle, Clock, MoreHorizontal, Edit, Copy, Archive, TrendingUp } from 'lucide-react';
import { useOpeners } from '@/contexts/OpenersContext';
import { useNavigate } from 'react-router-dom';
export default function OpenersHome() {
  const navigate = useNavigate();
  const {
    openers,
    currentUser
  } = useOpeners();

  // Calculate summary metrics
  const totalOpeners = openers.length;
  const activeCount = openers.filter(o => o.status === 'active').length;

  const filteredOpeners = openers;
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-green-500/20 text-green-400 border-green-500/30',
          icon: CheckCircle
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
  return <div className="p-8 space-y-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Openers</h1>
          <p className="text-muted-foreground text-lg">Create, organize, and track your outreach opener messages.</p>
        </div>
        <Button onClick={() => navigate('/openers/new')} className="gap-2 bg-primary hover:bg-primary/90 shadow-glow px-6 py-3 text-base">
          <Plus className="h-5 w-5" />
          New Opener
        </Button>
      </div>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <MessageSquare className="h-5 w-5 text-primary" />
              Total Openers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-2">{totalOpeners}</div>
            <p className="text-sm text-muted-foreground">All openers created</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-2">{activeCount}</div>
            <p className="text-sm text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-primary" />
              Avg Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">72%</div>
            <p className="text-sm text-muted-foreground">Across all openers</p>
          </CardContent>
        </Card>
      </div>

      {/* Best Performing Openers Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Top Performers</h2>
            <p className="text-muted-foreground text-lg">Your best performing openers this month</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-semibold">
                #1
              </Badge>
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-white">Follow-up Master</CardTitle>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-primary">89%</div>
                <span className="text-sm text-muted-foreground">response rate</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/80 leading-relaxed">
                "Hi [Name], I noticed you work at [Company] and thought you might be interested in..."
              </p>
              <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                <span>156 sent</span>
                <span>139 responses</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs font-semibold">
                #2
              </Badge>
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-white">Quick Connect</CardTitle>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-green-400">76%</div>
                <span className="text-sm text-muted-foreground">response rate</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/80 leading-relaxed">
                "Quick question about [Topic] - I saw your post about [Reference]..."
              </p>
              <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                <span>203 sent</span>
                <span>154 responses</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs font-semibold">
                #3
              </Badge>
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-white">Industry Insight</CardTitle>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-blue-400">68%</div>
                <span className="text-sm text-muted-foreground">response rate</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/80 leading-relaxed">
                "Hi [Name], I've been following trends in [Industry] and thought..."
              </p>
              <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                <span>98 sent</span>
                <span>67 responses</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* All Openers Section */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">All Openers</h2>
          <p className="text-muted-foreground text-lg">Manage and organize your opener library</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpeners.map(opener => {
          const statusConfig = getStatusConfig(opener.status);
          const StatusIcon = statusConfig.icon;
          const previewText = opener.variants[0]?.body.slice(0, 80) + '...' || 'No variants';
          return <Card key={opener.id} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-xl text-white truncate mb-3">
                        {opener.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs border ${statusConfig.color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {opener.status.replace('_', ' ')}
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

                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                    <div>
                      <span className="text-muted-foreground">Language:</span>
                      <span className="text-white ml-1">{opener.language.toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Variants:</span>
                      <span className="text-white ml-1">{opener.variants.length}</span>
                    </div>
                  </div>

                    <div className="text-xs text-muted-foreground">
                      Updated {opener.updatedAt.toLocaleDateString()}
                    </div>

                </CardContent>
              </Card>;
        })}
        </div>
      </div>

      {filteredOpeners.length === 0 && (
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h3 className="text-xl font-medium text-white mb-3">No openers found</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Create your first opener to get started.
            </p>
            <Button onClick={() => navigate('/openers/new')} className="gap-2 px-6 py-3 text-base">
              <Plus className="h-5 w-5" />
              New Opener
            </Button>
          </CardContent>
        </Card>
      )}
    </div>;
}