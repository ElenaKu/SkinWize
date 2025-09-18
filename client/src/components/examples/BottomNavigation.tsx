import { useState } from 'react';
import BottomNavigation, { NavTab } from '../BottomNavigation';

export default function BottomNavigationExample() {
  const [activeTab, setActiveTab] = useState<NavTab>('scan');

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    console.log('Tab changed to:', tab);
  };

  return (
    <div className="h-32 relative">
      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}