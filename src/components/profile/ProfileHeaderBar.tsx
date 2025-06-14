
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileHeaderBarProps {
  onSignOut?: () => Promise<void>;
}

const ProfileHeaderBar: React.FC<ProfileHeaderBarProps> = ({ onSignOut }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-between mb-4 sm:mb-6 p-3 sm:p-4 bg-white shadow-md">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')} 
        className="text-green-700 hover:text-green-800 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
      >
        <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-5 sm:w-5" />
        <span className="truncate">{t('backToDashboard') as string}</span>
      </Button>
      {onSignOut && (
        <Button 
          variant="outline" 
          onClick={onSignOut} 
          className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
        >
          <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">{t('signOut') as string}</span>
          <span className="sm:hidden">Sign Out</span>
        </Button>
      )}
    </div>
  );
};

export default ProfileHeaderBar;
