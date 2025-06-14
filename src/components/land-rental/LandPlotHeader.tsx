
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
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{plot.image}</div>
            <div>
              <CardTitle className="text-forest-800">{plot.title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className="h-3 w-3 text-forest-600" />
                <span className="text-sm text-forest-600">{plot.location}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-forest-600">{plot.rating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-forest-800">
              {formatTshAmount(totalPrice)}/year
            </div>
            <div className="text-sm text-forest-600">
              {formatTshAmount(totalPricePerAcre)}/acre (incl. VAT)
            </div>
            <div className="text-xs text-gray-500">
              Base: {formatTshAmount(basePrice)}/year
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LandPlotHeader;
