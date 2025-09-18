import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNavigation, { NavTab } from "@/components/BottomNavigation";
import ScanPage from "@/pages/ScanPage";
import ProductsPage from "@/pages/ProductsPage";
import RoutinePage from "@/pages/RoutinePage";
import DevicesPage from "@/pages/DevicesPage";
import ProfilePage from "@/pages/ProfilePage";
import SimilarProductsPage from "@/pages/SimilarProductsPage";

function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('scan');
  const [location, navigate] = useLocation();

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(savedTheme);
  }, []);

  // Sync activeTab with current route
  useEffect(() => {
    if (location === '/' || location === '/scan') {
      setActiveTab('scan');
    } else if (location === '/products') {
      setActiveTab('products');
    } else if (location === '/routine') {
      setActiveTab('routine');
    } else if (location === '/devices') {
      setActiveTab('devices');
    } else if (location === '/profile') {
      setActiveTab('profile');
    }
  }, [location]);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    navigate(`/${tab === 'scan' ? '' : tab}`);
  };

  const renderRouter = () => {
    return (
      <Switch>
        <Route path="/" component={ScanPage} />
        <Route path="/scan" component={ScanPage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/routine" component={RoutinePage} />
        <Route path="/devices" component={DevicesPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/similar-products">
          {() => <SimilarProductsPage />}
        </Route>
        <Route path="/similar-products/:productType">
          {(params) => <SimilarProductsPage productType={params.productType} />}
        </Route>
        <Route component={ScanPage} />
      </Switch>
    );
  };

  // Check if we're on a page that should hide bottom navigation
  const shouldShowBottomNav = !location.includes('/similar-products');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <main className="relative">
            {renderRouter()}
          </main>
          {shouldShowBottomNav && (
            <BottomNavigation 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          )}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
