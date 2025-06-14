
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Info, BarChart, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarketIntelligenceCardProps {
  showMarketChart: boolean;
  onToggleChart: () => void;
}

export const MarketIntelligenceCard: React.FC<MarketIntelligenceCardProps> = ({
  showMarketChart,
  onToggleChart,
}) => {
  const { t } = useLanguage();

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">{String(t('marketIntelligence'))}</CardTitle>
        <CardDescription>{String(t('currentCropPrices'))}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-3 flex-shrink-0"/>
              <p className="text-sm">Maize prices up 5% this week due to increased demand.</p>
          </div>
          <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-red-500 mr-3 flex-shrink-0"/>
              <p className="text-sm">Bean prices slightly down 2% due to seasonal oversupply.</p>
          </div>
           <div className="flex items-center">
              <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0"/>
              <p className="text-sm">Report: Coffee futures trending upwards for next quarter.</p>
          </div>
          <div className="flex items-center">
              <BarChart className="h-5 w-5 text-purple-500 mr-3 flex-shrink-0"/>
              <p className="text-sm">Rice export demand increased by 8% in East Africa.</p>
          </div>
          <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0"/>
              <p className="text-sm">Tea prices stable, good harvest season expected.</p>
          </div>
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onToggleChart}
              className="w-full"
            >
              {showMarketChart ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Hide Chart
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-2" />
                  See More - Global Prices
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
