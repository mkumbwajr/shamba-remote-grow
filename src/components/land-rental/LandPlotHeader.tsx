
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star } from 'lucide-react';

interface LandPlot {
  id: number;
  title: string;
  location: string;
  size: number;
  pricePerAcre: number;
  duration: string;
  soilType: string;
  waterAccess: string;
  elevation: string;
  rainfall: string;
  temperature: string;
  rating: number;
  owner: string;
  features: string[];
  suitableCrops: string[];
  image: string;
  available: boolean;
  coordinates?: { lat: number; lng: number };
  address?: string;
}

interface LandPlotHeaderProps {
  plot: LandPlot;
}

const LandPlotHeader: React.FC<LandPlotHeaderProps> = ({ plot }) => {
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
              TSh {(plot.pricePerAcre * plot.size * 2800).toLocaleString()}/year
            </div>
            <div className="text-sm text-forest-600">
              TSh {(plot.pricePerAcre * 2800).toLocaleString()}/acre
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LandPlotHeader;
