
import React from 'react';
import { useFarms } from '@/hooks/useFarms';
import { useFarmsUserProfile } from '@/hooks/useFarmsUserProfile';
import AppLayout from '@/components/layout/AppLayout';
import FarmsPageHeader from './FarmsPageHeader';
import FarmsPageSections from './FarmsPageSections';
import FarmsPageLoading from './FarmsPageLoading';

interface FarmsPageProps {
  onBack: () => void;
}

const FarmsPage = ({ onBack }: FarmsPageProps) => {
  const { data: farms, isLoading } = useFarms();
  const userProfile = useFarmsUserProfile();

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const activeFarms = farms?.filter(farm => farm.status === 'active') || [];
  const newFarms = activeFarms.filter(farm => 
    farm.created_at && new Date(farm.created_at) > thirtyDaysAgo
  );
  const oldFarms = activeFarms.filter(farm => 
    farm.created_at && new Date(farm.created_at) <= thirtyDaysAgo
  );
  const historicalFarms = farms?.filter(farm => 
    farm.status === 'completed' || farm.status === 'inactive'
  ) || [];

  if (isLoading) {
    return <FarmsPageLoading userProfile={userProfile} />;
  }

  return (
    <AppLayout userProfile={userProfile}>
      <FarmsPageHeader userProfile={userProfile} />
      
      {/* Main content */}
      <main className="flex-1 p-6">
        <FarmsPageSections
          newFarms={newFarms}
          oldFarms={oldFarms}
          historicalFarms={historicalFarms}
        />
      </main>
    </AppLayout>
  );
};

export default FarmsPage;
