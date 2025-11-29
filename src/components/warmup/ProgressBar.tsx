import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  current: number;
  target: number;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  target, 
  className = '', 
  showText = true,
  size = 'md'
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {showText && (
        <div className={`flex justify-between items-center ${textSizeClasses[size]} text-muted-foreground`}>
          <span>Progress</span>
          <span className="font-medium text-foreground">
            {current}/{target}
          </span>
        </div>
      )}
      <Progress 
        value={percentage} 
        className={heightClasses[size]}
      />
      {showText && (
        <div className={`text-right ${textSizeClasses[size]} text-muted-foreground`}>
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};