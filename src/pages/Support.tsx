
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4 text-green-600 hover:text-green-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToDashboard') as string}
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('supportHelpCenter') as string}</h1>
            <p className="text-gray-600">{t('getHelpForFarming') as string}</p>
          </div>

          <Tabs defaultValue="support" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-1/2">
              <TabsTrigger value="support">{t('support') as string}</TabsTrigger>
              <TabsTrigger value="help">{t('helpCenter') as string}</TabsTrigger>
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
