
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ruler, Calendar, Droplets, Mountain } from 'lucide-react';

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

interface LandPlotDetailsProps {
  plot: LandPlot;
}

const LandPlotDetails: React.FC<LandPlotDetailsProps> = ({ plot }) => {
  return (
    <div className="space-y-4">
      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Key Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Ruler className="h-4 w-4 text-crop-600" />
              <span className="text-sm">Size</span>
            </div>
            <span className="font-medium">{plot.size} acres</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-crop-600" />
              <span className="text-sm">Duration</span>
            </div>
            <span className="font-medium">{plot.duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-crop-600" />
              <span className="text-sm">Water</span>
            </div>
            <span className="font-medium">{plot.waterAccess}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mountain className="h-4 w-4 text-crop-600" />
              <span className="text-sm">Elevation</span>
            </div>
            <span className="font-medium">{plot.elevation}</span>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Environmental Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="text-sm text-gray-600">Soil Type:</span>
            <span className="text-sm font-medium ml-2">{plot.soilType}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Rainfall:</span>
            <span className="text-sm font-medium ml-2">{plot.rainfall}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Temperature:</span>
            <span className="text-sm font-medium ml-2">{plot.temperature}</span>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {plot.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-earth-50 border-earth-300 text-earth-700 text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suitable Crops */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Suitable Crops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {plot.suitableCrops.map((crop, index) => (
              <Badge key={index} variant="outline" className="bg-forest-50 border-forest-300 text-forest-700 text-xs">
                {crop}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full bg-forest-600 hover:bg-forest-700">
          Rent This Land
        </Button>
        <Button variant="outline" className="w-full border-forest-200">
          Contact Owner
        </Button>
      </div>
    </div>
  );
};

export default LandPlotDetails;
