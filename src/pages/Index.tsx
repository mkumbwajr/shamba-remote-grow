
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BarChart, DollarSign, HardHat, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import MarketIntelligenceChart from '@/components/dashboard/MarketIntelligenceChart';
import FarmsPage from '@/components/farms/FarmsPage';
import { useFarms } from '@/hooks/useFarms';
import { useHiredWorkers } from '@/hooks/useHiredWorkers';
import { AppSidebar } from '@/components/layout/AppSidebar';
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

  const quickStats = [
    { 
      title: t('activeFarms') as string, 
      value: activeFarmsCount.toString(), 
      icon: BarChart, 
      change: `${activeFarmsCount > 0 ? '+' : ''}${activeFarmsCount} active`,
      onClick: handleActiveFarmsClick,
      clickable: true
    },
    { title: t('totalInvestment') as string, value: '$12,500', icon: DollarSign, change: '+5%' },
    { 
      title: t('workersHired') as string, 
      value: activeWorkersCount.toString(), 
      icon: HardHat, 
      change: `${activeWorkersCount > 0 ? '+' : ''}${activeWorkersCount} active`,
      onClick: handleWorkersHiredClick,
      clickable: true
    },
    { title: t('nextHarvest') as string, value: `30 ${t('days') as string}`, icon: BarChart, change: 'Maize' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar userProfile={userProfile} />
        <SidebarInset className="flex-1">
          {/* Header with sidebar trigger */}
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {t('welcomeBack') as string}, {userProfile?.full_name || 'Farmer'}!
                </h2>
                <p className="text-gray-600 text-sm">{t('operations') as string}</p>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 space-y-6">
            {/* Quick Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickStats.map((stat) => (
                <Card 
                  key={stat.title} 
                  className={`shadow-sm hover:shadow-md transition-shadow ${stat.clickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                  onClick={stat.onClick}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    <stat.icon className="h-5 w-5 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Farm Updates & Market Intelligence */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{t('farmUpdates') as string}</CardTitle>
                  <CardDescription>{t('realTimeProgress') as string}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0"/>
                      <p className="text-sm">Maize field 2: Irrigation completed. Soil moisture optimal.</p>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0"/>
                      <p className="text-sm">Tomato crop: Pest scouting scheduled for tomorrow. Early signs of blight detected on 3 plants.</p>
                    </div>
                     <div className="flex items-center">
                      <Info className="h-5 w-5 text-green-500 mr-3 flex-shrink-0"/>
                      <p className="text-sm">New worker, John Doe, started today. Assigned to Farm Plot A.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{t('marketIntelligence') as string}</CardTitle>
                  <CardDescription>{t('currentCropPrices') as string}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-green-500 mr-3 flex-shrink-0"/>
                        <p className="text-sm">Maize prices up 5% this week due to increased demand.</p>
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-red-500 mr-3 flex-shrink-0"/>
                        <p className="text-sm">Bean prices slightly down 2% due to seasonal oversupply.</p>
                    </div>
                     <div className="flex items-center">
                        <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0"/>
                        <p className="text-sm">Report: Coffee futures trending upwards for next quarter.</p>
                    </div>
                    <div className="flex items-center">
                        <BarChart className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0"/>
                        <p className="text-sm">Rice export demand increased by 8% in East Africa.</p>
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0"/>
                        <p className="text-sm">Tea prices stable, good harvest season expected.</p>
                    </div>
                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setShowMarketChart(!showMarketChart)}
                        className="w-full"
                      >
                        {showMarketChart ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-2" />
                            Hide Chart
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-2" />
                            See More - Global Prices
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Market Intelligence Chart */}
            {showMarketChart && (
              <section>
                <MarketIntelligenceChart />
              </section>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
