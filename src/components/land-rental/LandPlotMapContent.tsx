
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from 'lucide-react';
import GoogleMapComponent from './GoogleMapComponent';
import LandPlotHeader from './LandPlotHeader';
import LandPlotDetails from './LandPlotDetails';
import ApiKeyPrompt from './ApiKeyPrompt';
import LandPlotNotFound from './LandPlotNotFound';

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
    return <LandPlotNotFound />;
  }

  if (showApiKeyInput) {
    return (
      <ApiKeyPrompt
        apiKey={apiKey}
        setApiKey={setApiKey}
        onSubmit={handleApiKeySubmit}
      />
    );
  }

  return (
    <div className="space-y-6">
      <LandPlotHeader plot={plot} />

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
        <LandPlotDetails plot={plot} />
      </div>
    </div>
  );
};

export default LandPlotMapContent;
