
import React from 'react';
import { Tractor } from 'lucide-react';
import { useFarms } from '@/hooks/useFarms';
import { supabase } from '@/integrations/supabase/client';
import { AppSidebar } from '@/components/layout/AppSidebar';
import FarmsPageHeader from './FarmsPageHeader';
import FarmsPageSections from './FarmsPageSections';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';

interface FarmsPageProps {
  onBack: () => void;
}

interface UserProfileData {
  full_name?: string | null;
}

const FarmsPage = ({ onBack }: FarmsPageProps) => {
  const { data: farms, isLoading } = useFarms();
  const [userProfile, setUserProfile] = React.useState<UserProfileData | null>(null);

  React.useEffect(() => {
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
      }
    };
    fetchUserProfile();
  }, []);

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
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AppSidebar userProfile={userProfile} />
          <SidebarInset className="flex-1">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <Tractor className="h-12 w-12 text-green-500 mx-auto mb-4 animate-pulse" />
                <p className="text-lg text-gray-600">Loading farms...</p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar userProfile={userProfile} />
        <SidebarInset className="flex-1">
          <FarmsPageHeader userProfile={userProfile} />
          
          {/* Main content */}
          <main className="flex-1 p-6">
            <FarmsPageSections
              newFarms={newFarms}
              oldFarms={oldFarms}
              historicalFarms={historicalFarms}
            />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default FarmsPage;
