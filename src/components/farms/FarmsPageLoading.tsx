
import React from 'react';
import { Tractor } from 'lucide-react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';

interface UserProfileData {
  full_name?: string | null;
}

interface FarmsPageLoadingProps {
  userProfile: UserProfileData | null;
}

const FarmsPageLoading: React.FC<FarmsPageLoadingProps> = ({ userProfile }) => {
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
};

export default FarmsPageLoading;
