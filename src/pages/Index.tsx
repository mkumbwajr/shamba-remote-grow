import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BarChart, DollarSign, HardHat, Home, Info, LogOut, MapPinned, Settings, ShoppingCart, Tractor, Users, Wheat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

interface UserProfileData { // Renamed to avoid conflict if Profile type is imported elsewhere
  full_name?: string | null;
  // Add other fields if needed for display
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Using `as any` to bypass TS error due to un-typed client.
        // This assumes 'profiles' table and 'full_name' column exist.
        const { data: profileData, error } = await (supabase.from('profiles') as any)
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error.message);
          // Potentially navigate to auth or show error
        } else if (profileData) {
          setUserProfile(profileData as UserProfileData); // Cast to expected type
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
    { name: t('dashboard'), icon: Home, path: '/' },
    { name: t('crops'), icon: Wheat, path: '/crop-matcher' },
    { name: t('marketplace'), icon: ShoppingCart, path: '/marketplace' },
    { name: t('land'), icon: MapPinned, path: '/land-rental' },
    { name: t('workers'), icon: Users, path: '/workers' },
  ];

  const quickStats = [
    { title: t('activeFarms'), value: '5', icon: Tractor, change: '+2 this month' },
    { title: t('totalInvestment'), value: '$12,500', icon: DollarSign, change: '+5%' },
    { title: t('workersHired'), value: '23', icon: HardHat, change: '+3 new' },
    { title: t('nextHarvest'), value: `30 ${t('days')}`, icon: BarChart, change: 'Maize' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6 space-y-6 fixed h-full">
        <div className="text-center mb-8">
          <img src="/placeholder.svg" alt="Bwana Shamba Logo" className="w-11 h-11 mx-auto mb-2" /> {/* Adjusted size for better fit */}
          <h1 className="text-xl font-semibold">{t('remoteFarmingPlatform')}</h1> {/* Adjusted size */}
        </div>
        <nav className="space-y-1"> {/* Reduced space for more items */}
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start text-md hover:bg-green-600 py-3" /* Adjusted size */
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-3 h-5 w-5" /> {/* Adjusted size */}
              {item.name}
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 space-y-1"> {/* Adjusted spacing */}
          <div className="mb-2"> {/* Add margin below language toggle for better separation */}
            <LanguageToggle />
          </div>
           <Button
            variant="ghost"
            className="w-full justify-start text-md hover:bg-green-600 py-3" /* Adjusted size */
            onClick={() => navigate('/profile')}
          >
            <Settings className="mr-3 h-5 w-5" /> {/* Adjusted size */}
            {t('profile')}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-md hover:bg-red-500 hover:text-white py-3" /* Adjusted size */
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" /> {/* Adjusted size */}
            {t('signOut')}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {t('welcomeBack')}, {userProfile?.full_name || 'Farmer'}!
            </h2>
            <p className="text-gray-600">{t('operations')}</p>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" /> {/* Placeholder, consider dynamic source */}
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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">{t('farmUpdates')}</CardTitle>
              <CardDescription>{t('realTimeProgress')}</CardDescription>
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
              <CardTitle className="text-xl text-gray-800">{t('marketIntelligence')}</CardTitle>
              <CardDescription>{t('currentCropPrices')}</CardDescription>
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
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
