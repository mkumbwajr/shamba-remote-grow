
import React, { useState } from 'react';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import MapControls from './MapControls';
import NearbyPlacesInfo from './NearbyPlacesInfo';
import MapLoadingSpinner from './MapLoadingSpinner';

interface GoogleMapComponentProps {
  coordinates: { lat: number; lng: number };
  title: string;
  address: string;
  apiKey: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ coordinates, title, address, apiKey }) => {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('satellite');
  
  const { mapRef, mapLoaded, nearbyPlaces, changeMapType } = useGoogleMaps({
    coordinates,
    title,
    address,
    apiKey,
    mapType
  });

  const handleMapTypeChange = (type: 'roadmap' | 'satellite' | 'hybrid' | 'terrain') => {
    setMapType(type);
    changeMapType(type);
  };

  if (!mapLoaded) {
    return <MapLoadingSpinner />;
  }

  return (
    <div className="h-full relative">
      <div ref={mapRef} className="h-full w-full" />
      
      <MapControls 
        mapType={mapType}
        onMapTypeChange={handleMapTypeChange}
      />

      <NearbyPlacesInfo nearbyPlaces={nearbyPlaces} />
    </div>
  );
};

export default GoogleMapComponent;
