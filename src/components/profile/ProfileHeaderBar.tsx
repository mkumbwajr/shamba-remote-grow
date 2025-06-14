
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ProfileHeaderBar = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between mb-6">
      <Button variant="ghost" onClick={() => navigate('/')} className="text-green-700 hover:text-green-800">
        <ArrowLeft className="mr-2 h-5 w-5" />
        {t('backToDashboard') as string}
      </Button>
    </div>
  );
};
export default ProfileHeaderBar;
