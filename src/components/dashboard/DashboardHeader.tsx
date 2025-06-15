
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserProfileData {
  full_name?: string | null;
}

interface DashboardHeaderProps {
  userProfile: UserProfileData | null;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userProfile }) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1 flex justify-between items-center min-w-0">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
            {String(t('welcomeBack'))}, {userProfile?.full_name || 'Farmer'}!
          </h2>
        </div>
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 ml-2">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback className="text-xs sm:text-sm">{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
