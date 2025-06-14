
import React from 'react';
import { Tractor, BarChart, DollarSign } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { useLanguage } from '@/contexts/LanguageContext';
import FarmCard from './FarmCard';
import FarmsEmptyState from './FarmsEmptyState';

interface FarmsPageSectionsProps {
  newFarms: Tables<'farms'>[];
  oldFarms: Tables<'farms'>[];
  historicalFarms: Tables<'farms'>[];
}

const FarmsPageSections: React.FC<FarmsPageSectionsProps> = ({
  newFarms,
  oldFarms,
  historicalFarms
}) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* New Farms Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Tractor className="h-5 w-5 mr-2 text-green-500" />
          {t('newFarms') as string} ({t('last30Days') as string})
        </h3>
        {newFarms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newFarms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        ) : (
          <FarmsEmptyState message={t('noNewFarms') as string} />
        )}
      </section>

      {/* Active Farms Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-blue-500" />
          {t('activeFarmsSection') as string}
        </h3>
        {oldFarms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oldFarms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        ) : (
          <FarmsEmptyState message={t('noActiveFarms') as string} />
        )}
      </section>

      {/* Historical Farms Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-purple-500" />
          {t('farmHistory') as string}
        </h3>
        {historicalFarms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historicalFarms.map((farm) => (
              <FarmCard key={farm.id} farm={farm} />
            ))}
          </div>
        ) : (
          <FarmsEmptyState message={t('noHistoricalFarms') as string} />
        )}
      </section>
    </div>
  );
};

export default FarmsPageSections;
