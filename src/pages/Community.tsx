
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import AppLayout from '@/components/layout/AppLayout';
import { SidebarTrigger } from '@/components/ui/sidebar';
import PostCreator from '@/components/community/PostCreator';
import PostFeed from '@/components/community/PostFeed';

interface UserProfileData {
  full_name?: string | null;
}

const CommunityPage = () => {
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

  return (
    <AppLayout userProfile={userProfile}>
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 shadow-sm">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('community') as string}</h2>
            <p className="text-gray-500 text-sm">{t('connectWithFarmers') as string}</p>
          </div>
          <Avatar className="h-9 w-9 ring-2 ring-gray-100">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-blue-500 text-white font-semibold">
              {userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 min-h-screen">
        <div className="max-w-2xl mx-auto py-4 px-4">
          <PostCreator userProfile={userProfile} />
          <PostFeed />
        </div>
      </main>
    </AppLayout>
  );
};

export default CommunityPage;
