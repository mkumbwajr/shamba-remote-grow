
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

interface NearbyPlacesInfoProps {
  nearbyPlaces: any[];
}

const NearbyPlacesInfo: React.FC<NearbyPlacesInfoProps> = ({ nearbyPlaces }) => {
  if (nearbyPlaces.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-4 right-4 w-64">
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardContent className="p-3">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Nearby Places
          </h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {nearbyPlaces.slice(0, 5).map((place, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="truncate flex-1">{place.name}</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  {place.types[0].replace(/_/g, ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NearbyPlacesInfo;
