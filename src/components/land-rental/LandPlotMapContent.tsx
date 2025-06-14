
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from 'lucide-react';
import GoogleMapComponent from './GoogleMapComponent';
import LandPlotHeader from './LandPlotHeader';
import LandPlotDetails from './LandPlotDetails';
import FarmPicturesGallery from './FarmPicturesGallery';
import ApiKeyPrompt from './ApiKeyPrompt';
import LandPlotNotFound from './LandPlotNotFound';
import { landPlots, LandPlot } from './landPlotData';

interface LandPlotMapContentProps {
  plotId?: string;
}

const LandPlotMapContent: React.FC<LandPlotMapContentProps> = ({ plotId }) => {
  const [plot, setPlot] = useState<LandPlot | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

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
    <div className="space-y-4 sm:space-y-6">
      <LandPlotHeader plot={plot} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Map Section */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          <Card className="h-[400px] sm:h-[500px] lg:h-[600px]">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
                Satellite View & Location Features
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[320px] sm:h-[420px] lg:h-[500px] p-0">
              <GoogleMapComponent
                coordinates={plot.coordinates!}
                title={plot.title}
                address={plot.address!}
                apiKey={apiKey}
              />
            </CardContent>
          </Card>
          
          {/* Farm Pictures Gallery */}
          <div className="block xl:hidden">
            <FarmPicturesGallery />
          </div>
        </div>

        {/* Details Section */}
        <div className="xl:col-span-1 space-y-4 sm:space-y-6">
          <LandPlotDetails plot={plot} />
          <div className="hidden xl:block">
            <FarmPicturesGallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandPlotMapContent;
