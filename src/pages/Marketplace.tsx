
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import Marketplace from '@/components/Marketplace';
import { 
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
import LanguageToggle from '@/components/LanguageToggle';

interface UserProfileData {
  full_name?: string | null;
}

const MarketplacePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
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
    { name: String(t('dashboard')), icon: Home, path: '/' },
    { name: String(t('crops')), icon: Wheat, path: '/crop-matcher' },
    { name: 'Investment', icon: DollarSign, path: '/investment' },
    { name: String(t('marketplace')), icon: ShoppingCart, path: '/marketplace', active: true },
    { name: String(t('land')), icon: MapPinned, path: '/land-rental' },
    { name: String(t('workers')), icon: Users, path: '/workers' },
  ];

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
            <h2 className="text-3xl font-bold text-gray-800">
              {t('marketplace') as string}
            </h2>
            <p className="text-gray-600">Seeds, tools, and services for your farming needs</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
          </Avatar>
        </header>

        <Marketplace />
      </main>
    </div>
  );
};

export default MarketplacePage;
