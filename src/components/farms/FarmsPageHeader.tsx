
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface UserProfileData {
  full_name?: string | null;
}

interface FarmsPageHeaderProps {
  userProfile: UserProfileData | null;
}

const FarmsPageHeader: React.FC<FarmsPageHeaderProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1 flex justify-between items-center min-w-0">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{t('myFarms') as string}</h2>
          <p className="text-gray-600 text-xs sm:text-sm truncate">{t('manageFarmOperations') as string}</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2"
            onClick={() => navigate('/land-rental')}
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">{t('addNewFarm') as string}</span>
            <span className="sm:hidden">Add</span>
          </Button>
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-xs sm:text-sm">{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default FarmsPageHeader;
