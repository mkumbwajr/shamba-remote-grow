
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import MarketIntelligenceChart from '@/components/dashboard/MarketIntelligenceChart';
import { useFarms } from '@/hooks/useFarms';
import { useHiredWorkers } from '@/hooks/useHiredWorkers';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { QuickStatsSection } from '@/components/dashboard/QuickStatsSection';
import { FarmUpdatesCard } from '@/components/dashboard/FarmUpdatesCard';
import { MarketIntelligenceCard } from '@/components/dashboard/MarketIntelligenceCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface UserProfileData {
  full_name?: string | null;
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [showMarketChart, setShowMarketChart] = useState(false);
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

  const handleActiveFarmsClick = () => {
    navigate('/farms');
  };

  const handleWorkersHiredClick = () => {
    navigate('/hired-workers');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar userProfile={userProfile} />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {String(t('dashboard'))}
                </h2>
                <p className="text-gray-600 text-sm">Welcome back to your farming dashboard</p>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6">
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
