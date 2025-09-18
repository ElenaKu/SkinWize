import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNavigation, { NavTab } from "@/components/BottomNavigation";
import ScanPage from "@/pages/ScanPage";
import ProductsPage from "@/pages/ProductsPage";
import RoutinePage from "@/pages/RoutinePage";
import ProfilePage from "@/pages/ProfilePage";

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('scan');

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(savedTheme);
  }, []);

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'scan':
        return <ScanPage />;
      case 'products':
        return <ProductsPage />;
      case 'routine':
        return <RoutinePage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <ScanPage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <main className="relative">
            {renderCurrentPage()}
          </main>
          <BottomNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
