
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, LogOut, MapPinned, Settings, ShoppingCart, Users, Wheat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import LandRental from '@/components/LandRental';

interface UserProfileData {
  full_name?: string | null;
}

const LandRentalPage = () => {
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
    { name: t('dashboard') as string, icon: Home, path: '/' },
    { name: t('crops') as string, icon: Wheat, path: '/crop-matcher' },
    { name: t('marketplace') as string, icon: ShoppingCart, path: '/marketplace' },
    { name: t('land') as string, icon: MapPinned, path: '/land-rental' },
    { name: t('workers') as string, icon: Users, path: '/workers' },
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
              className={`w-full justify-start text-md hover:bg-green-600 py-3 ${
                item.path === '/land-rental' ? 'bg-green-600' : ''
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
              {t('land') as string}
            </h2>
            <p className="text-gray-600">Find and rent agricultural land</p>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
          </Avatar>
        </header>

        <LandRental />
      </main>
    </div>
  );
};

export default LandRentalPage;
