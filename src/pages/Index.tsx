
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import MarketIntelligenceChart from '@/components/dashboard/MarketIntelligenceChart';
import FarmsPage from '@/components/farms/FarmsPage';
import { useFarms } from '@/hooks/useFarms';
import { useHiredWorkers } from '@/hooks/useHiredWorkers';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { QuickStatsSection } from '@/components/dashboard/QuickStatsSection';
import { FarmUpdatesCard } from '@/components/dashboard/FarmUpdatesCard';
import { MarketIntelligenceCard } from '@/components/dashboard/MarketIntelligenceCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Home, 
  MapPinned, 
  Settings, 
  ShoppingCart, 
  Tractor, 
  Users, 
  Wheat, 
  LogOut,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

interface UserProfileData {
  full_name?: string | null;
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [showMarketChart, setShowMarketChart] = useState(false);
  const [showFarms, setShowFarms] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Fetch real data using hooks
  const { data: farms = [] } = useFarms();
  const { data: hiredWorkers = [] } = useHiredWorkers();

  // Calculate active farms count
  const activeFarmsCount = farms.filter(farm => farm.status === 'active').length;
  
  // Calculate active hired workers count
  const activeWorkersCount = hiredWorkers.filter(worker => worker.status === 'active').length;

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profileData, error } = await (supabase.from('profiles') as any)
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error.message);
        } else if (profileData) {
          setUserProfile(profileData as UserProfileData);
        }
      } else {
        navigate('/auth');
      }
    };
    fetchUserProfile();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const menuItems = [
    { name: String(t('dashboard')), icon: Home, path: '/', active: true },
    { name: String(t('crops')), icon: Wheat, path: '/crop-matcher' },
    { name: 'Investment', icon: DollarSign, path: '/investment' },
    { name: String(t('marketplace')), icon: ShoppingCart, path: '/marketplace' },
    { name: String(t('land')), icon: MapPinned, path: '/land-rental' },
    { name: String(t('workers')), icon: Users, path: '/workers' },
  ];

  const handleActiveFarmsClick = () => {
    setShowFarms(true);
  };

  const handleWorkersHiredClick = () => {
    navigate('/hired-workers');
  };

  const handleBackToDashboard = () => {
    setShowFarms(false);
  };

  // If showing farms page, render it instead of dashboard
  if (showFarms) {
    return <FarmsPage onBack={handleBackToDashboard} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6 space-y-6 fixed h-full">
        <div className="text-center mb-8">
          <div className="w-11 h-11 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Tractor className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-semibold">{String(t('remoteFarmingPlatform'))}</h1>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={`w-full justify-start text-md py-3 ${
                item.active 
                  ? 'bg-green-600 text-white' 
                  : 'hover:bg-green-600'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 space-y-1">
          <div className="mb-2">
            <LanguageToggle />
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-md hover:bg-green-600 py-3"
            onClick={() => navigate('/profile')}
          >
            <Settings className="mr-3 h-5 w-5" />
            {String(t('profile'))}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-md hover:bg-red-500 hover:text-white py-3"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {String(t('signOut'))}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{String(t('dashboard'))}</h2>
            <p className="text-gray-600">Welcome back to your farming dashboard</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
          </Avatar>
        </header>

        <div className="space-y-6">
          <QuickStatsSection
            activeFarmsCount={activeFarmsCount}
            activeWorkersCount={activeWorkersCount}
            onActiveFarmsClick={handleActiveFarmsClick}
            onWorkersHiredClick={handleWorkersHiredClick}
          />

          {/* Farm Updates & Market Intelligence */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <FarmUpdatesCard />
            <MarketIntelligenceCard
              showMarketChart={showMarketChart}
              onToggleChart={() => setShowMarketChart(!showMarketChart)}
            />
          </section>

          {/* Market Intelligence Chart */}
          {showMarketChart && (
            <section>
              <MarketIntelligenceChart />
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
