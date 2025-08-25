import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Account, DailyProgress, SafetyStatus } from '@/types/warmup';
import { SafetyChip } from './SafetyChip';
import { ProgressBar } from './ProgressBar';

interface AccountRowProps {
  account: Account;
  progress: DailyProgress;
  safetyStatus: SafetyStatus;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  onClick: () => void;
}

export const AccountRow: React.FC<AccountRowProps> = ({
  account,
  progress,
  safetyStatus,
  isSelected,
  onSelect,
  onClick
}) => {
  const totalActions = Object.values(progress).reduce((sum, val) => sum + val, 0);
  const targetActions = 300; // This would come from the warmup profile
  
  const getStatusConfig = () => {
    switch (account.status) {
      case 'connected':
        return { color: 'bg-green-500/20 text-green-400 border-green-500/30', text: 'Connected' };
      case 'paused':
        return { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', text: 'Paused' };
      case 'cooling_down':
        return { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', text: 'Cooling Down' };
      case 'requires_attention':
        return { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', text: 'Needs Attention' };
      case 'action_blocked':
        return { color: 'bg-red-500/20 text-red-400 border-red-500/30', text: 'Blocked' };
      case 'rate_limited':
        return { color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', text: 'Rate Limited' };
    }
  };

  const statusConfig = getStatusConfig();
  
  const formatNextAction = () => {
    if (!safetyStatus.nextActionIn) return 'Ready';
    const minutes = Math.floor(safetyStatus.nextActionIn / 60);
    const seconds = safetyStatus.nextActionIn % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            onClick={(e) => e.stopPropagation()}
          />
          
          <div className="flex items-center gap-3 flex-1" onClick={onClick}>
            <Avatar className="h-12 w-12">
              <AvatarImage src={account.avatarUrl} alt={account.handle} />
              <AvatarFallback>{account.handle.slice(1, 3).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-white truncate">{account.handle}</h3>
                {account.isVerified && (
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                {account.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="text-right">
              <Badge className={`${statusConfig.color} text-xs border`}>
                {statusConfig.text}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">
                {account.timezone}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div>
            <div className="text-xs text-muted-foreground">Today's Actions</div>
            <div className="text-lg font-bold text-white">{totalActions}</div>
          </div>
          
          <div>
            <ProgressBar 
              current={totalActions} 
              target={targetActions} 
              showText={false}
              size="sm"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((totalActions / targetActions) * 100)}% complete
            </div>
          </div>
          
          <div>
            <SafetyChip status={safetyStatus} size="sm" />
          </div>
          
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Next: {formatNextAction()}</span>
            </div>
            {account.notes && (
              <div className="flex items-center justify-end gap-1 mt-1">
                <AlertCircle className="h-3 w-3 text-yellow-400" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};