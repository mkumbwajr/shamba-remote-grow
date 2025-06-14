
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface ApiKeyPromptProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onSubmit: () => void;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ apiKey, setApiKey, onSubmit }) => {
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
          <Button onClick={onSubmit} className="w-full">
            Continue to Map
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Your API key will be stored locally in your browser for convenience.
        </p>
      </CardContent>
    </Card>
  );
};

export default ApiKeyPrompt;
