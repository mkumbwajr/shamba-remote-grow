
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
      <div className="flex-1 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{t('myFarms') as string}</h2>
          <p className="text-gray-600 text-sm">{t('manageFarmOperations') as string}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => navigate('/land-rental')}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('addNewFarm') as string}
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback>{userProfile?.full_name ? userProfile.full_name.charAt(0).toUpperCase() : 'F'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default FarmsPageHeader;
