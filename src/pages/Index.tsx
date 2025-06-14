
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart, DollarSign, HardHat, Home, Info, LogOut, MapPinned, Settings, ShoppingCart, Tractor, Users, Wheat, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import MarketIntelligenceChart from '@/components/dashboard/MarketIntelligenceChart';

interface UserProfileData {
  full_name?: string | null;
  // Add other fields if needed for display
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [showMarketChart, setShowMarketChart] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

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
    { name: t('dashboard') as string, icon: Home, path: '/' },
    { name: t('crops') as string, icon: Wheat, path: '/crop-matcher' },
    { name: t('marketplace') as string, icon: ShoppingCart, path: '/marketplace' },
    { name: t('land') as string, icon: MapPinned, path: '/land-rental' },
    { name: t('workers') as string, icon: Users, path: '/workers' },
  ];

  const quickStats = [
    { title: t('activeFarms') as string, value: '5', icon: Tractor, change: '+2 this month' },
    { title: t('totalInvestment') as string, value: '$12,500', icon: DollarSign, change: '+5%' },
    { title: t('workersHired') as string, value: '23', icon: HardHat, change: '+3 new' },
    { title: t('nextHarvest') as string, value: `30 ${t('days') as string}`, icon: BarChart, change: 'Maize' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6 space-y-6 fixed h-full">
        <div className="text-center mb-8">
          <img src="/placeholder.svg" alt="Bwana Shamba Logo" className="w-11 h-11 mx-auto mb-2" />
          <h1 className="text-xl font-semibold">{t('remoteFarmingPlatform') as string}</h1>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start text-md hover:bg-green-600 py-3"
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
            {t('profile') as string}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-md hover:bg-red-500 hover:text-white py-3"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {t('signOut') as string}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {t('welcomeBack') as string}, {userProfile?.full_name || 'Farmer'}!
            </h2>
            <p className="text-gray-600">{t('operations') as string}</p>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
          </Avatar>
        </header>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => (
            <Card key={stat.title} className="shadow-lg hover:shadow-xl transition-shadow">
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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-lg">
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

          <Card className="shadow-lg">
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
          <section className="mb-8">
            <MarketIntelligenceChart />
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
