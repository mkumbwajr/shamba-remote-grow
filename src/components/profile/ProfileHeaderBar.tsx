
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut } from 'lucide-react'; // Added LogOut for sign out button
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProfileHeaderBarProps {
  onSignOut?: () => Promise<void>; // Added onSignOut prop
}

const ProfileHeaderBar: React.FC<ProfileHeaderBarProps> = ({ onSignOut }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-white shadow-md">
      <Button variant="ghost" onClick={() => navigate('/')} className="text-green-700 hover:text-green-800">
        <ArrowLeft className="mr-2 h-5 w-5" />
        {t('backToDashboard') as string}
      </Button>
      {onSignOut && (
        <Button variant="outline" onClick={onSignOut} className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50">
          <LogOut className="mr-2 h-5 w-5" />
          {t('signOut') as string}
        </Button>
      )}
    </div>
  );
};
export default ProfileHeaderBar;
