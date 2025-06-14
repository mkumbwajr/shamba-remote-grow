
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const FarmUpdatesCard: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">{String(t('farmUpdates'))}</CardTitle>
        <CardDescription>{String(t('realTimeProgress'))}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0"/>
            <p className="text-sm">Maize field 2: Irrigation completed. Soil moisture optimal.</p>
          </div>
          <div className="flex items-center">
            <Info className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0"/>
            <p className="text-sm">Tomato crop: Pest scouting scheduled for tomorrow. Early signs of blight detected on 3 plants.</p>
          </div>
           <div className="flex items-center">
            <Info className="h-5 w-5 text-green-500 mr-3 flex-shrink-0"/>
            <p className="text-sm">New worker, John Doe, started today. Assigned to Farm Plot A.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
