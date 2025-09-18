import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type SafetyLevel = 'safe' | 'moderate' | 'avoid';

interface SafetyIndicatorProps {
  level: SafetyLevel;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const safetyConfig = {
  safe: {
    label: 'Safe',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    icon: CheckCircle,
    description: 'Generally safe for most skin types'
  },
  moderate: {
    label: 'Moderate',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
    icon: AlertTriangle,
    description: 'May cause sensitivity in some individuals'
  },
  avoid: {
    label: 'Avoid',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    icon: XCircle,
    description: 'High risk of irritation or sensitivity'
  }
};

export default function SafetyIndicator({ 
  level, 
  score, 
  size = 'md', 
  showText = true 
}: SafetyIndicatorProps) {
  const config = safetyConfig[level];
  const Icon = config.icon;
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className="flex items-center gap-2" data-testid={`safety-indicator-${level}`}>
      <Badge 
        variant="secondary" 
        className={`${config.color} flex items-center gap-1 ${size === 'sm' ? 'text-xs px-2 py-1' : ''}`}
      >
        <Icon className={iconSizes[size]} />
        {showText && (
          <span>
            {config.label}
            {score && ` (${score}/10)`}
          </span>
        )}
      </Badge>
    </div>
  );
}