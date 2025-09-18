import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  HelpCircle, 
  ChevronRight,
  Scan,
  Package,
  Calendar,
  Target
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function ProfilePage() {
  // //todo: remove mock functionality - replace with real user data
  const mockUserData = {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    skinType: 'Combination',
    primaryConcerns: ['Acne', 'Dark Spots', 'Fine Lines'],
    joinDate: 'March 2024',
    productsScanned: 12,
    routinesCreated: 2,
    streak: 7
  };

  const menuItems = [
    {
      icon: User,
      label: 'Personal Information',
      description: 'Update your profile details',
      action: () => console.log('Personal info clicked')
    },
    {
      icon: Shield,
      label: 'Skin Profile',
      description: 'Update skin type and concerns',
      action: () => console.log('Skin profile clicked')
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Routine reminders and updates',
      action: () => console.log('Notifications clicked')
    },
    {
      icon: Settings,
      label: 'App Settings',
      description: 'Preferences and privacy',
      action: () => console.log('Settings clicked')
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'FAQs and contact support',
      action: () => console.log('Help clicked')
    }
  ];

  return (
    <div className="space-y-6 p-4 pb-20" data-testid="profile-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Profile</h1>
        <ThemeToggle />
      </div>

      {/* User Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold">
                {mockUserData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold" data-testid="text-user-name">
                {mockUserData.name}
              </h2>
              <p className="text-sm text-muted-foreground" data-testid="text-user-email">
                {mockUserData.email}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {mockUserData.skinType} Skin
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Member since {mockUserData.joinDate}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Scan className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold" data-testid="text-products-scanned">
              {mockUserData.productsScanned}
            </div>
            <div className="text-xs text-muted-foreground">Products Scanned</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold" data-testid="text-routine-streak">
              {mockUserData.streak}
            </div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Skin Concerns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Primary Skin Concerns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockUserData.primaryConcerns.map((concern, index) => (
              <Badge key={index} variant="outline" className="text-sm">
                <Target className="h-3 w-3 mr-1" />
                {concern}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card 
              key={index} 
              className="hover-elevate cursor-pointer transition-all duration-200"
              onClick={item.action}
              data-testid={`menu-item-${index}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* App Version */}
      <div className="text-center text-xs text-muted-foreground pt-4">
        SkinWise v1.0.0
      </div>
    </div>
  );
}