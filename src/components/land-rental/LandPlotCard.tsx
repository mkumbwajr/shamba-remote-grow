
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign, Ruler, Droplets, Star, Map } from 'lucide-react';

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
}

interface LandPlotCardProps {
  plot: LandPlot;
  onShowMap: (plotId: number) => void;
}

const LandPlotCard: React.FC<LandPlotCardProps> = ({ plot, onShowMap }) => {
  return (
    <Card className={`bg-white border-forest-200 hover:shadow-lg transition-shadow ${!plot.available ? 'opacity-75' : ''}`}>
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
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-forest-600">{plot.rating}</span>
            </div>
            {!plot.available && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Rented
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Ruler className="h-4 w-4 text-crop-600" />
              <span className="text-sm text-forest-600">Size</span>
            </div>
            <p className="font-medium text-forest-800">{plot.size} acres</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-crop-600" />
              <span className="text-sm text-forest-600">Price/acre</span>
            </div>
            <p className="font-medium text-forest-800">TSh {(plot.pricePerAcre * 2800).toLocaleString()}/year</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-crop-600" />
              <span className="text-sm text-forest-600">Duration</span>
            </div>
            <p className="font-medium text-forest-800">{plot.duration}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-crop-600" />
              <span className="text-sm text-forest-600">Water</span>
            </div>
            <p className="font-medium text-forest-800">{plot.waterAccess}</p>
          </div>
        </div>

        {/* Environmental Info */}
        <div className="bg-crop-50 border border-crop-200 rounded-lg p-3">
          <h4 className="font-medium text-crop-800 mb-2">Land Characteristics</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-crop-600">Soil Type:</span>
              <span className="text-crop-800 ml-1">{plot.soilType}</span>
            </div>
            <div>
              <span className="text-crop-600">Elevation:</span>
              <span className="text-crop-800 ml-1">{plot.elevation}</span>
            </div>
            <div>
              <span className="text-crop-600">Rainfall:</span>
              <span className="text-crop-800 ml-1">{plot.rainfall}</span>
            </div>
            <div>
              <span className="text-crop-600">Temperature:</span>
              <span className="text-crop-800 ml-1">{plot.temperature}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-medium text-forest-800 mb-2">Features</h4>
          <div className="flex flex-wrap gap-1">
            {plot.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="bg-earth-50 border-earth-300 text-earth-700 text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Suitable Crops */}
        <div>
          <h4 className="font-medium text-forest-800 mb-2">Suitable Crops</h4>
          <div className="flex flex-wrap gap-1">
            {plot.suitableCrops.map((crop, index) => (
              <Badge key={index} variant="outline" className="bg-forest-50 border-forest-300 text-forest-700 text-xs">
                {crop}
              </Badge>
            ))}
          </div>
        </div>

        {/* Owner and Total */}
        <div className="border-t border-forest-100 pt-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-forest-600">Owner: {plot.owner}</span>
            <span className="text-lg font-bold text-forest-800">
              Total: TSh {((plot.pricePerAcre * plot.size) * 2800).toLocaleString()}/year
            </span>
          </div>

          <div className="flex space-x-2">
            <Button
              className="flex-1 bg-forest-600 hover:bg-forest-700"
              disabled={!plot.available}
            >
              {plot.available ? 'Rent This Land' : 'Currently Rented'}
            </Button>
            <Button 
              variant="outline" 
              className="border-forest-200"
              onClick={() => onShowMap(plot.id)}
            >
              <Map className="h-4 w-4 mr-1" />
              Show Map
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandPlotCard;
