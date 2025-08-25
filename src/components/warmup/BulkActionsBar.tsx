import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, Edit, File, Wifi, Clock, RotateCcw, X } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onStart: () => void;
  onPause: () => void;
  onEditTargets: () => void;
  onApplyTemplate: (templateId: string) => void;
  onAssignProxy: (proxyPool: string) => void;
  onAssignTimeWindow: () => void;
  onResetToday: () => void;
  templates: Array<{ id: string; name: string; }>;
  proxyPools: Array<{ id: string; name: string; }>;
}

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  onClearSelection,
  onStart,
  onPause,
  onEditTargets,
  onApplyTemplate,
  onAssignProxy,
  onAssignTimeWindow,
  onResetToday,
  templates,
  proxyPools
}) => {
  if (selectedCount === 0) return null;

  return (
    <Card className="bg-gradient-card border-border shadow-card sticky bottom-4 z-10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white">
              {selectedCount} account{selectedCount > 1 ? 's' : ''} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onStart}
              className="gap-1"
            >
              <Play className="h-3 w-3" />
              Start
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onPause}
              className="gap-1"
            >
              <Pause className="h-3 w-3" />
              Pause
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onEditTargets}
              className="gap-1"
            >
              <Edit className="h-3 w-3" />
              Edit Targets
            </Button>
            
            <Select onValueChange={onApplyTemplate}>
              <SelectTrigger className="w-40 h-8">
                <div className="flex items-center gap-1">
                  <File className="h-3 w-3" />
                  <SelectValue placeholder="Apply Template" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {templates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select onValueChange={onAssignProxy}>
              <SelectTrigger className="w-36 h-8">
                <div className="flex items-center gap-1">
                  <Wifi className="h-3 w-3" />
                  <SelectValue placeholder="Assign Proxy" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {proxyPools.map(pool => (
                  <SelectItem key={pool.id} value={pool.id}>
                    {pool.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onAssignTimeWindow}
              className="gap-1"
            >
              <Clock className="h-3 w-3" />
              Time Window
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onResetToday}
              className="gap-1"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Today
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};