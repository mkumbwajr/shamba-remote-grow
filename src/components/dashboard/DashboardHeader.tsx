
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
      <div className="flex-1 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {String(t('welcomeBack'))}, {userProfile?.full_name || 'Farmer'}!
          </h2>
          <p className="text-gray-600 text-sm">{String(t('operations'))}</p>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-avatar.jpg" />
          <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
