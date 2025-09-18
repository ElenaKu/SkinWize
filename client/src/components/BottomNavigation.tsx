import { Camera, Package, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type NavTab = 'scan' | 'products' | 'routine' | 'profile';

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems = [
  { id: 'scan' as const, label: 'Scan', icon: Camera },
  { id: 'products' as const, label: 'Products', icon: Package },
  { id: 'routine' as const, label: 'Routine', icon: Calendar },
  { id: 'profile' as const, label: 'Profile', icon: User },
];

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
      <div className="grid grid-cols-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`h-16 flex-col gap-1 rounded-none ${
                isActive 
                  ? 'text-primary bg-primary/5' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => onTabChange(item.id)}
              data-testid={`nav-tab-${item.id}`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-xs ${isActive ? 'text-primary font-medium' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}