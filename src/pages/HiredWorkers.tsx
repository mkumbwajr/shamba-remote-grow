
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HiredWorkersContent from '@/components/workers/HiredWorkersContent';
import AppLayout from '@/components/layout/AppLayout';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface UserProfileData {
  full_name?: string | null;
}

interface HiredWorkersPageProps {
  onOpenChat?: (workerId: string) => void;
}

const HiredWorkersPage = ({ onOpenChat }: HiredWorkersPageProps) => {
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const navigate = useNavigate();

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

  return (
    <AppLayout userProfile={userProfile}>
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Hired Workers</h2>
            <p className="text-gray-600 text-sm">Manage your hired farm workers</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <HiredWorkersContent onOpenChat={onOpenChat} />
      </main>
    </AppLayout>
  );
};

export default HiredWorkersPage;
