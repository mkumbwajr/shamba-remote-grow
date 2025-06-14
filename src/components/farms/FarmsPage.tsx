import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Plus, BarChart, DollarSign, HardHat, Home, LogOut, MapPinned, Settings, ShoppingCart, Tractor, Users, Wheat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFarms } from '@/hooks/useFarms';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import LanguageToggle from '@/components/LanguageToggle';
import FarmCard from './FarmCard';

interface FarmsPageProps {
  onBack: () => void;
}

const FarmsPage = ({ onBack }: FarmsPageProps) => {
  const { t } = useLanguage();
  const { data: farms, isLoading } = useFarms();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const menuItems = [
    { name: t('dashboard') as string, icon: Home, path: '/', onClick: onBack },
    { name: t('crops') as string, icon: Wheat, path: '/crop-matcher' },
    { name: t('marketplace') as string, icon: ShoppingCart, path: '/marketplace' },
    { name: t('land') as string, icon: MapPinned, path: '/land-rental' },
    { name: t('workers') as string, icon: Users, path: '/workers' },
  ];

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const activeFarms = farms?.filter(farm => farm.status === 'active') || [];
  const newFarms = activeFarms.filter(farm => 
    farm.created_at && new Date(farm.created_at) > thirtyDaysAgo
  );
  const oldFarms = activeFarms.filter(farm => 
    farm.created_at && new Date(farm.created_at) <= thirtyDaysAgo
  );
  const historicalFarms = farms?.filter(farm => 
    farm.status === 'completed' || farm.status === 'inactive'
  ) || [];

  if (isLoading) {
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
                onClick={item.onClick || (() => navigate(item.path))}
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
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Tractor className="h-12 w-12 text-green-500 mx-auto mb-4 animate-pulse" />
              <p className="text-lg text-gray-600">Loading farms...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              onClick={item.onClick || (() => navigate(item.path))}
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
            <h2 className="text-3xl font-bold text-gray-800">My Farms</h2>
            <p className="text-gray-600">Manage your farming operations</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => navigate('/land-rental')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Farm
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="space-y-8">
          {/* New Farms Section */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Tractor className="h-5 w-5 mr-2 text-green-500" />
              New Farms (Last 30 days)
            </h3>
            {newFarms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newFarms.map((farm) => (
                  <FarmCard key={farm.id} farm={farm} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No new farms created in the last 30 days</p>
              </Card>
            )}
          </section>

          {/* Active Farms Section */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-blue-500" />
              Active Farms
            </h3>
            {oldFarms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {oldFarms.map((farm) => (
                  <FarmCard key={farm.id} farm={farm} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No active farms found</p>
              </Card>
            )}
          </section>

          {/* Historical Farms Section */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-purple-500" />
              Farm History
            </h3>
            {historicalFarms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {historicalFarms.map((farm) => (
                  <FarmCard key={farm.id} farm={farm} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500">No historical farms found</p>
              </Card>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default FarmsPage;
