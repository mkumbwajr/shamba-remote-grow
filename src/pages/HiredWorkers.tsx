
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { AppSidebar } from '@/components/layout/AppSidebar';
import HiredWorkersContent from '@/components/workers/HiredWorkersContent';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface UserProfileData {
  full_name?: string | null;
}

const HiredWorkersPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

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
                <h2 className="text-2xl font-bold text-gray-800">My Hired Workers</h2>
                <p className="text-gray-600 text-sm">Manage your hired farm workers</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => navigate('/workers')}
                >
                  Find More Workers
                </Button>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6">
            <HiredWorkersContent />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default HiredWorkersPage;
