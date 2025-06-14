
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Star, Ruler, DollarSign, Calendar, Droplets, Thermometer, Mountain, Image, Navigation } from 'lucide-react';
import GoogleMapComponent from './GoogleMapComponent';

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

interface LandPlotMapContentProps {
  plotId?: string;
}

const LandPlotMapContent: React.FC<LandPlotMapContentProps> = ({ plotId }) => {
  const [plot, setPlot] = useState<LandPlot | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  // Mock data - in a real app, this would come from your database
  const landPlots: LandPlot[] = [
    {
      id: 1,
      title: 'Kilimanjaro Valley Premium Plot',
      location: 'Kilimanjaro Region',
      size: 5,
      pricePerAcre: 120,
      duration: '1 year',
      soilType: 'Volcanic Loam',
      waterAccess: 'River nearby',
      elevation: '1,200m',
      rainfall: '800-1200mm',
      temperature: '18-26°C',
      rating: 4.9,
      owner: 'Mount Kilimanjaro Farms',
      features: ['Irrigation ready', 'Fertile soil', 'Road access', 'Storage facility'],
      suitableCrops: ['Coffee', 'Maize', 'Beans', 'Bananas'],
      image: '🏔️',
      available: true,
      coordinates: { lat: -3.0674, lng: 37.3556 },
      address: 'Kilimanjaro Valley, Moshi, Tanzania'
    },
    {
      id: 2,
      title: 'Arusha Plains Agricultural Land',
      location: 'Arusha Region',
      size: 10,
      pricePerAcre: 85,
      duration: '2 years',
      soilType: 'Clay Loam',
      waterAccess: 'Borehole',
      elevation: '1,400m',
      rainfall: '600-1000mm',
      temperature: '16-28°C',
      rating: 4.7,
      owner: 'Serengeti Agro Estate',
      features: ['Organic certified', 'Fenced', 'Equipment shed', 'Labor housing'],
      suitableCrops: ['Maize', 'Tomatoes', 'Onions', 'Wheat'],
      image: '🌾',
      available: true,
      coordinates: { lat: -3.3869, lng: 36.6830 },
      address: 'Arusha Plains, Arusha, Tanzania'
    },
    {
      id: 3,
      title: 'Mbeya Highlands Coffee Estate',
      location: 'Mbeya Region',
      size: 8,
      pricePerAcre: 200,
      duration: '3 years',
      soilType: 'Red Clay',
      waterAccess: 'Spring water',
      elevation: '1,800m',
      rainfall: '1200-1800mm',
      temperature: '12-24°C',
      rating: 4.8,
      owner: 'Highland Coffee Cooperative',
      features: ['Coffee trees planted', 'Processing facility', 'Expert support', 'Export connections'],
      suitableCrops: ['Coffee', 'Beans', 'Irish Potatoes'],
      image: '☕',
      available: true,
      coordinates: { lat: -8.9094, lng: 33.4608 },
      address: 'Mbeya Highlands, Mbeya, Tanzania'
    }
  ];

  useEffect(() => {
    if (plotId) {
      const foundPlot = landPlots.find(p => p.id === parseInt(plotId));
      setPlot(foundPlot || null);
    }
  }, [plotId]);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
      localStorage.setItem('googleMapsApiKey', apiKey);
    }
  };

  useEffect(() => {
    const savedApiKey = localStorage.getItem('googleMapsApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setShowApiKeyInput(false);
    }
  }, []);

  if (!plot) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Land Plot Not Found</h3>
        <p className="text-gray-600">The requested land plot could not be found.</p>
      </div>
    );
  }

  if (showApiKeyInput) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Google Maps API Key Required
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            To display the map and location features, please enter your Google Maps API key.
            You can get one from the Google Cloud Console.
          </p>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your Google Maps API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button onClick={handleApiKeySubmit} className="w-full">
              Continue to Map
            </Button>
          </div>
          <p className="text-xs text-gray-500">
            Your API key will be stored locally in your browser for convenience.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Plot Header */}
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

      {/* Map and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Satellite View & Location Features
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[500px] p-0">
              <GoogleMapComponent
                coordinates={plot.coordinates!}
                title={plot.title}
                address={plot.address!}
                apiKey={apiKey}
              />
            </CardContent>
          </Card>
        </div>

        {/* Details Section */}
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
      </div>
    </div>
  );
};

export default LandPlotMapContent;
