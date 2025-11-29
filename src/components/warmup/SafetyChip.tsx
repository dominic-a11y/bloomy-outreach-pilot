import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { SafetyStatus } from '@/types/warmup';

interface SafetyChipProps {
  status: SafetyStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const SafetyChip: React.FC<SafetyChipProps> = ({ status, size = 'md' }) => {
  const getConfig = () => {
    switch (status.level) {
      case 'safe':
        return {
          icon: CheckCircle,
          className: 'bg-green-500/20 text-green-400 border-green-500/30',
          text: 'Safe'
        };
      case 'caution':
        return {
          icon: AlertTriangle,
          className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
          text: 'Caution'
        };
      case 'risk':
        return {
          icon: Shield,
          className: 'bg-red-500/20 text-red-400 border-red-500/30',
          text: 'Risk'
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4', 
    lg: 'h-5 w-5'
  };

  return (
    <Badge className={`${config.className} ${sizeClasses[size]} border inline-flex items-center gap-1`}>
      <Icon className={iconSizes[size]} />
      <span className="font-medium">{config.text}</span>
    </Badge>
  );
};