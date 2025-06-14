
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';
import { LandPlot } from './landPlotData';
import { calculateTotalPrice, formatTshAmount } from '@/utils/currency';

interface LandPlotHeaderProps {
  plot: LandPlot;
}

const LandPlotHeader: React.FC<LandPlotHeaderProps> = ({ plot }) => {
  const basePrice = plot.pricePerAcre * plot.size * 2800;
  const totalPrice = calculateTotalPrice(basePrice);
  const totalPricePerAcre = calculateTotalPrice(plot.pricePerAcre * 2800);

  return (
    <Card className="bg-white border-forest-200">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0 min-w-0">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="text-2xl sm:text-3xl flex-shrink-0">{plot.image}</div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-forest-800 text-base sm:text-lg lg:text-xl truncate">{plot.title}</CardTitle>
              <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                <MapPin className="h-3 w-3 text-forest-600 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-forest-600 truncate">{plot.location}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-forest-600">{plot.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-center sm:text-right flex-shrink-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-forest-800 truncate">
              {formatTshAmount(totalPrice)}/year
            </div>
            <div className="text-xs sm:text-sm text-forest-600 truncate">
              {formatTshAmount(totalPricePerAcre)}/acre (incl. VAT)
            </div>
            <div className="text-xs text-gray-500 truncate">
              Base: {formatTshAmount(basePrice)}/year
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LandPlotHeader;
