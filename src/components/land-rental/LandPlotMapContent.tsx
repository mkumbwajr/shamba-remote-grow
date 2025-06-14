
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from 'lucide-react';
import GoogleMapComponent from './GoogleMapComponent';
import LandPlotHeader from './LandPlotHeader';
import LandPlotDetails from './LandPlotDetails';
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
