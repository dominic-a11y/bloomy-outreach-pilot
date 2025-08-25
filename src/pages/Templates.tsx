import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Copy, 
  Edit, 
  Trash2, 
  FileText,
  ArrowLeft,
  Users,
  Clock,
  Settings
} from 'lucide-react';
import { useWarmup } from '@/contexts/WarmupContext';
import { useNavigate } from 'react-router-dom';

export default function Templates() {
  const navigate = useNavigate();
  const { templates, createTemplate } = useWarmup();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredTemplates = templates.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'new': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'warm': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'trusted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleCreateTemplate = () => {
    // This would open a detailed template creation form
    // For now, we'll create a basic template
    const newTemplate = {
      name: 'New Template',
      description: 'Custom warmup template',
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
      accountTier: 'new' as const
    };

    createTemplate(newTemplate);
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/warmup')}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Warmup
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Warmup Templates</h1>
            <p className="text-muted-foreground">Create and manage reusable warmup configurations.</p>
          </div>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-glow">
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-white">Template Name</label>
                <Input className="mt-1" placeholder="Enter template name..." />
              </div>
              <div>
                <label className="text-sm font-medium text-white">Description</label>
                <Input className="mt-1" placeholder="Describe this template..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/60" />
          <Input 
            placeholder="Search templates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-muted/50 border-border" 
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => {
          const totalTargets = Object.values(template.targets).reduce((sum, val) => sum + val, 0);
          const enabledDays = Object.values(template.schedule).filter(day => day.enabled).length;
          
          return (
            <Card key={template.id} className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg text-white truncate">
                        {template.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Template
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Clone Template
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Template
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs border ${getTierColor(template.accountTier)}`}>
                    {template.accountTier} accounts
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {template.enabledCategories.length} actions
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>Daily Actions</span>
                    </div>
                    <div className="font-medium text-white">{totalTargets}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Active Days</span>
                    </div>
                    <div className="font-medium text-white">{enabledDays}/7</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground">Enabled Actions</div>
                  <div className="flex flex-wrap gap-1">
                    {template.enabledCategories.slice(0, 3).map(category => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                    {template.enabledCategories.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.enabledCategories.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <Settings className="h-3 w-3" />
                    Configure
                  </Button>
                  <Button size="sm" className="flex-1">
                    Apply Template
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Created {template.createdAt.toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'No templates match your search.' : 'Create your first warmup template to get started.'}
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}