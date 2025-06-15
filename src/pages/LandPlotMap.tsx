
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AppSidebar } from '@/components/layout/AppSidebar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import LandPlotMapContent from '@/components/land-rental/LandPlotMapContent';

interface UserProfileData {
  full_name?: string | null;
}

const LandPlotMapPage = () => {
  const { plotId } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
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

  const handleGoBack = () => {
    navigate('/land-rental');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar userProfile={userProfile} />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-white px-3 sm:px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 flex justify-between items-center">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGoBack}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                >
                  <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Back to Land Rental</span>
                  <span className="xs:hidden">Back</span>
                </Button>
                <div className="hidden sm:block">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-800">Land Plot Map</h2>
                  <p className="text-xs sm:text-sm text-gray-600">Detailed location view with satellite imagery</p>
                </div>
              </div>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-xs sm:text-sm">{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Mobile header for smaller screens */}
          <div className="sm:hidden px-3 py-2 border-b bg-white">
            <h2 className="text-lg font-bold text-gray-800">Land Plot Map</h2>
            <p className="text-xs text-gray-600">Detailed location view</p>
          </div>

          {/* Main content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6">
            <LandPlotMapContent plotId={plotId} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default LandPlotMapPage;
