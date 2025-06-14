
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Satellite, Camera, Navigation } from 'lucide-react';

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
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('satellite');

  useEffect(() => {
    if (!window.google && apiKey) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = () => {
        setMapLoaded(true);
      };
      
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
        delete window.initMap;
      };
    } else if (window.google) {
      setMapLoaded(true);
    }
  }, [apiKey]);

  useEffect(() => {
    if (mapLoaded && mapRef.current && window.google && coordinates) {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 15,
        mapTypeId: mapType,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      // Add marker for the land plot
      const marker = new window.google.maps.Marker({
        position: coordinates,
        map: newMap,
        title: title,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#059669" stroke="white" stroke-width="2"/>
              <path d="M16 10l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="white"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${title}</h3>
            <p style="margin: 0; font-size: 12px; color: #666;">${address}</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #059669;">Available for rent</p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(newMap, marker);
      });

      // Search for nearby places
      const service = new window.google.maps.places.PlacesService(newMap);
      const request = {
        location: coordinates,
        radius: 5000,
        type: ['hospital', 'school', 'bank', 'gas_station', 'store', 'restaurant']
      };

      service.nearbySearch(request, (results: any[], status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setNearbyPlaces(results.slice(0, 10));
          
          // Add markers for nearby places
          results.slice(0, 5).forEach((place: any) => {
            const placeMarker = new window.google.maps.Marker({
              position: place.geometry.location,
              map: newMap,
              title: place.name,
              icon: {
                url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="#3B82F6" stroke="white" stroke-width="1"/>
                    <circle cx="10" cy="10" r="3" fill="white"/>
                  </svg>
                `)}`,
                scaledSize: new window.google.maps.Size(20, 20),
              },
            });

            const placeInfoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 6px;">
                  <h4 style="margin: 0 0 4px 0; font-size: 12px;">${place.name}</h4>
                  <p style="margin: 0; font-size: 10px; color: #666;">${place.types[0].replace(/_/g, ' ')}</p>
                  ${place.rating ? `<p style="margin: 2px 0 0 0; font-size: 10px;">⭐ ${place.rating}</p>` : ''}
                </div>
              `,
            });

            placeMarker.addListener('click', () => {
              placeInfoWindow.open(newMap, placeMarker);
            });
          });
        }
      });

      setMap(newMap);
    }
  }, [mapLoaded, coordinates, title, address, mapType]);

  const handleMapTypeChange = (type: 'roadmap' | 'satellite' | 'hybrid' | 'terrain') => {
    setMapType(type);
    if (map) {
      map.setMapTypeId(type);
    }
  };

  if (!mapLoaded) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative">
      <div ref={mapRef} className="h-full w-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="bg-white rounded-lg shadow-lg p-2 space-y-1">
          <button
            onClick={() => handleMapTypeChange('satellite')}
            className={`w-full px-3 py-1 text-xs rounded ${mapType === 'satellite' ? 'bg-forest-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <Satellite className="inline h-3 w-3 mr-1" />
            Satellite
          </button>
          <button
            onClick={() => handleMapTypeChange('hybrid')}
            className={`w-full px-3 py-1 text-xs rounded ${mapType === 'hybrid' ? 'bg-forest-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <Navigation className="inline h-3 w-3 mr-1" />
            Hybrid
          </button>
          <button
            onClick={() => handleMapTypeChange('terrain')}
            className={`w-full px-3 py-1 text-xs rounded ${mapType === 'terrain' ? 'bg-forest-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <MapPin className="inline h-3 w-3 mr-1" />
            Terrain
          </button>
        </div>
      </div>

      {/* Nearby Places Info */}
      {nearbyPlaces.length > 0 && (
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
      )}
    </div>
  );
};

export default GoogleMapComponent;
