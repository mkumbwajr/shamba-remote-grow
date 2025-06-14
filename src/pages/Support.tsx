
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useProfileData } from '@/hooks/useProfileData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SupportSection from '@/components/support/SupportSection';
import HelpCenterSection from '@/components/support/HelpCenterSection';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Support = () => {
  const { profile } = useProfileData();
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
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Support & Help Center</h1>
            <p className="text-gray-600">Get the help you need for your farming journey</p>
          </div>

          <Tabs defaultValue="support" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-1/2">
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="help">Help Center</TabsTrigger>
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
