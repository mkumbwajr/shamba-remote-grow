
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFarms } from '@/hooks/useFarms';
import FarmCard from './FarmCard';
import { Tables } from '@/integrations/supabase/types';

interface FarmsPageProps {
  onBack: () => void;
}

const FarmsPage: React.FC<FarmsPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const { data: farms = [], isLoading, error } = useFarms();

  const categorizedFarms = {
    new: farms.filter(farm => {
      const createdDate = new Date(farm.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return farm.status === 'active' && createdDate > thirtyDaysAgo;
    }),
    active: farms.filter(farm => {
      const createdDate = new Date(farm.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return farm.status === 'active' && createdDate <= thirtyDaysAgo;
    }),
    historical: farms.filter(farm => farm.status === 'completed' || farm.status === 'inactive')
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">{t('loading') as string || 'Loading...'}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">{t('errorLoadingFarms') as string || 'Error loading farms'}</div>
      </div>
    );
  }

  const renderFarmGrid = (farmList: Tables<'farms'>[]) => {
    if (farmList.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          {t('noFarmsFound') as string || 'No farms found in this category'}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmList.map(farm => (
          <FarmCard key={farm.id} farm={farm} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('myFarms') as string || 'My Farms'}
              </h1>
              <p className="text-gray-600 mt-1">
                {t('manageFarms') as string || 'Manage and track your farming operations'}
              </p>
            </div>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            {t('addNewFarm') as string || 'Add New Farm'}
          </Button>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="new" className="text-center">
              {t('newFarms') as string || 'New Farms'} ({categorizedFarms.new.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-center">
              {t('activeFarms') as string || 'Active Farms'} ({categorizedFarms.active.length})
            </TabsTrigger>
            <TabsTrigger value="historical" className="text-center">
              {t('historicalFarms') as string || 'Historical'} ({categorizedFarms.historical.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {t('newFarms') as string || 'New Farms'} ({t('last30Days') as string || 'Last 30 Days'})
              </h2>
              {renderFarmGrid(categorizedFarms.new)}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {t('activeFarms') as string || 'Active Farms'}
              </h2>
              {renderFarmGrid(categorizedFarms.active)}
            </div>
          </TabsContent>

          <TabsContent value="historical" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {t('completedInactiveFarms') as string || 'Completed & Inactive Farms'}
              </h2>
              {renderFarmGrid(categorizedFarms.historical)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmsPage;
