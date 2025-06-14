
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useProfileData } from '@/hooks/useProfileData';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SupportSection from '@/components/support/SupportSection';
import HelpCenterSection from '@/components/support/HelpCenterSection';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Support = () => {
  const { profile } = useProfileData();
  const { t } = useLanguage();
  const navigate = useNavigate();

  console.log('Support page loading, profile:', profile);

  return (
    <AppLayout userProfile={profile}>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-3 sm:mb-4 text-green-600 hover:text-green-700 p-2 sm:p-3"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">{t('backToDashboard') as string}</span>
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t('supportHelpCenter') as string}</h1>
            <p className="text-sm sm:text-base text-gray-600">{t('getHelpForFarming') as string}</p>
          </div>

          <Tabs defaultValue="support" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto sm:mx-0 sm:max-w-lg">
              <TabsTrigger value="support" className="text-sm sm:text-base px-3 sm:px-4">{t('support') as string}</TabsTrigger>
              <TabsTrigger value="help" className="text-sm sm:text-base px-3 sm:px-4">{t('helpCenter') as string}</TabsTrigger>
            </TabsList>

            <TabsContent value="support">
              <SupportSection />
            </TabsContent>

            <TabsContent value="help">
              <HelpCenterSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default Support;
