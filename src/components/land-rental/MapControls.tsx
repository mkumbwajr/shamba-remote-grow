
import React from 'react';
import { Satellite, Navigation, MapPin } from 'lucide-react';

interface MapControlsProps {
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  onMapTypeChange: (type: 'roadmap' | 'satellite' | 'hybrid' | 'terrain') => void;
}

const MapControls: React.FC<MapControlsProps> = ({ mapType, onMapTypeChange }) => {
  return (
    <div className="absolute top-4 left-4 space-y-2">
      <div className="bg-white rounded-lg shadow-lg p-2 space-y-1">
        <button
          onClick={() => onMapTypeChange('satellite')}
          className={`w-full px-3 py-1 text-xs rounded ${mapType === 'satellite' ? 'bg-forest-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <Satellite className="inline h-3 w-3 mr-1" />
          Satellite
        </button>
        <button
          onClick={() => onMapTypeChange('hybrid')}
          className={`w-full px-3 py-1 text-xs rounded ${mapType === 'hybrid' ? 'bg-forest-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <Navigation className="inline h-3 w-3 mr-1" />
          Hybrid
        </button>
        <button
          onClick={() => onMapTypeChange('terrain')}
          className={`w-full px-3 py-1 text-xs rounded ${mapType === 'terrain' ? 'bg-forest-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          <MapPin className="inline h-3 w-3 mr-1" />
          Terrain
        </button>
      </div>
    </div>
  );
};

export default MapControls;
